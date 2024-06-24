use candid::{CandidType, Principal};
use ic_cdk::api::management_canister::main::raw_rand;
use ic_cdk::{init, query, update};
use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};
use std::collections::{HashSet, VecDeque};

use crate::state_handler::{init_file_contents, mutate_state, read_state, State, STATE};

#[derive(Debug, Serialize, Deserialize, CandidType)]
pub struct PaginatedProfiles {
    pub total_profiles: usize,
    pub profiles: Vec<UserProfileCreationInfo>,
}

// Define the Notification struct
#[derive(Debug, Serialize, Clone, Deserialize, CandidType)]
pub struct Notification {
    pub sender_id: String,
    pub receiver_id: String,
    pub notification_type: NotificationType,
}

#[derive(Debug, Serialize, Clone, Deserialize, CandidType)]
pub enum NotificationType {
    Like,
    // Add other notification types as needed
}

#[derive(Default, Clone, Deserialize, CandidType, Debug, Serialize)]
pub struct UserInputParams {
    pub gender: Option<String>,
    pub email: Option<String>,
    pub name: Option<String>,
    pub mobile_number: Option<String>,
    pub dob: Option<String>,
    pub gender_pronouns: Option<String>,
    pub religion: Option<String>,
    pub height: Option<String>,
    pub zodiac: Option<String>,
    pub diet: Option<String>,
    pub occupation: Option<String>,
    pub looking_for: Option<String>,
    pub smoking: Option<String>,
    pub drinking: Option<String>,
    pub hobbies: Option<Vec<String>>,
    pub sports: Option<Vec<String>>,
    pub art_and_culture: Option<Vec<String>>,
    pub pets: Option<String>,
    pub general_habits: Option<Vec<String>>,
    pub outdoor_activities: Option<Vec<String>>,
    pub travel: Option<Vec<String>>,
    pub movies: Option<Vec<String>>,
    pub interests_in: Option<String>,
    pub age: Option<u64>,
    pub location: Option<String>,
    pub min_preferred_age: Option<u64>,
    pub max_preferred_age: Option<u64>,
    pub preferred_gender: Option<String>,
    pub preferred_location: Option<String>,
    pub introduction: Option<String>,
    pub images: Option<Vec<String>>,
}

#[derive(Clone, Deserialize, CandidType, Debug, Serialize)]
pub struct UserProfileCreationInfo {
    pub user_id: String,
    pub created_at: u64,
    pub creator_principal: Principal,
    pub params: UserProfileParams,
    pub notifications: VecDeque<Notification>,
    pub matched_profiles: Vec<String>,
    pub status: bool,
}

#[derive(Default, Clone, Deserialize, CandidType, Debug, Serialize)]
pub struct UserProfileParams {
    pub user_id: Option<String>,
    pub gender: Option<String>,
    pub email: Option<String>,
    pub name: Option<String>,
    pub mobile_number: Option<String>,
    pub dob: Option<String>,
    pub gender_pronouns: Option<String>,
    pub religion: Option<String>,
    pub height: Option<String>,
    pub zodiac: Option<String>,
    pub diet: Option<String>,
    pub occupation: Option<String>,
    pub looking_for: Option<String>,
    pub smoking: Option<String>,
    pub drinking: Option<String>,
    pub hobbies: Option<Vec<String>>,
    pub sports: Option<Vec<String>>,
    pub art_and_culture: Option<Vec<String>>,
    pub pets: Option<String>,
    pub general_habits: Option<Vec<String>>,
    pub outdoor_activities: Option<Vec<String>>,
    pub travel: Option<Vec<String>>,
    pub movies: Option<Vec<String>>,
    pub interests_in: Option<String>,
    pub age: Option<u64>,
    pub location: Option<String>,
    pub min_preferred_age: Option<u64>,
    pub max_preferred_age: Option<u64>,
    pub preferred_gender: Option<String>,
    pub preferred_location: Option<String>,
    pub introduction: Option<String>,
    pub images: Option<Vec<String>>,
    pub likes: Option<HashSet<String>>,
    pub matches: Option<Vec<String>>,
    pub notifications: Option<VecDeque<Notification>>,
    pub matched_profiles: Option<Vec<String>>,
    pub leftswipes: Option<HashSet<String>>,
    pub rightswipes: Option<HashSet<String>>,
}

#[derive(Clone, Deserialize, CandidType, Debug, Serialize)]
pub struct Pagination {
    pub page: usize,
    pub size: usize,
}

#[derive(Debug, Serialize, Clone, Deserialize, CandidType)]
pub struct Message {
    pub id: String,
    pub sender_id: String,
    pub receiver_id: String,
    pub content: String,
    pub timestamp: u64,
}


#[init]
fn init() {
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        state.user_profiles = init_file_contents();
    });
}

impl State {
    pub fn create_account(&mut self, user_id: String, params: UserProfileCreationInfo) -> Result<String, String> {
        // Validation
        if params.params.name.is_none() || params.params.name.as_ref().unwrap().trim().is_empty() {
            return Err("Name is required".to_string());
        }
        if params.params.email.is_none() || params.params.email.as_ref().unwrap().trim().is_empty() {
            return Err("Email is required".to_string());
        }
        if params.params.age.is_none() {
            return Err("Age is required".to_string());
        }
        if params.params.min_preferred_age.is_none() {
            return Err("Minimum preferred age is required".to_string());
        }
        if params.params.max_preferred_age.is_none() {
            return Err("Maximum preferred age is required".to_string());
        }
        if params.params.location.is_none() || params.params.location.as_ref().unwrap().trim().is_empty() {
            return Err("Location is required".to_string());
        }
        if params.params.preferred_location.is_none() || params.params.preferred_location.as_ref().unwrap().trim().is_empty() {
            return Err("Preferred location is required".to_string());
        }
        if params.params.gender.is_none() || params.params.gender.as_ref().unwrap().trim().is_empty() {
            return Err("Gender is required".to_string());
        }
        if params.params.preferred_gender.is_none() || params.params.preferred_gender.as_ref().unwrap().trim().is_empty() {
            return Err("Preferred gender is required".to_string());
        }

        ic_cdk::println!("Creating profile with user_id: {}", user_id);
        if self.user_profiles.insert(user_id.clone(), params).is_some() {
            Err(format!("User profile with id {} already exists", user_id))
        } else {
            ic_cdk::println!("Profiles after insertion: {:?}", self.user_profiles.iter().map(|(k, _)| k.clone()).collect::<Vec<_>>());
            Ok(format!("User profile created with id: {}", user_id))
        }
    }

    pub fn update_account(&mut self, user_id: String, new_params: UserProfileParams) -> Result<String, String> {
        match self.user_profiles.get(&user_id) {
            Some(mut profile) => {
                if !profile.status {
                    return Err("Account is inactive".to_string());
                }
                profile.params.merge(new_params);
                self.user_profiles.remove(&user_id);
                self.user_profiles.insert(user_id.clone(), profile);
                ic_cdk::println!("Updated profile with user_id: {}", user_id);
                Ok(format!("User profile updated with id: {}", user_id))
            },
            None => Err("Profile not found".to_string()),
        }
    }
    

    pub fn delete_account(&mut self, user_id: String) -> Result<String, String> {
        match self.user_profiles.get(&user_id) {
            Some(profile) => {
                if !profile.status {
                    return Err("Account is inactive".to_string());
                }
            },
            None => return Err("Profile not found".to_string()),
        }
        self.user_profiles.remove(&user_id).ok_or("Profile not found".to_string())?;
        ic_cdk::println!("Deleted profile with user_id: {}", user_id);
        Ok(format!("User profile deleted with id: {}", user_id))
    }
    

    pub fn get_account(&self, user_id: String) -> Result<UserProfileCreationInfo, String> {
        match self.user_profiles.get(&user_id) {
            Some(profile) => {
                if !profile.status {
                    return Err("Account is inactive".to_string());
                }
                ic_cdk::println!("Retrieved profile with user_id: {}", user_id);
                Ok(profile.clone())
            },
            None => Err("Profile not found".to_string()),
        }
    }
    

    pub fn get_all_accounts(&self, pagination: Pagination) -> Result<PaginatedProfiles, String> {
        let all_profiles: Vec<UserProfileCreationInfo> = self.user_profiles.iter()
            .filter_map(|(_, profile)| {
                if profile.status {
                    Some(profile.clone())
                } else {
                    None
                }
            })
            .collect();
    
        let total_profiles = all_profiles.len();
    
        let start = (pagination.page - 1) * pagination.size;
        if start >= total_profiles {
            return Err("Page number out of range".to_string());
        }
        let end = std::cmp::min(start + pagination.size, total_profiles);
    
        let paginated_profiles = all_profiles[start..end].to_vec();
    
        Ok(PaginatedProfiles {
            total_profiles,
            profiles: paginated_profiles,
        })
    }
    

    pub fn set_user_inactive(&mut self, user_id: String) -> Result<String, String> {
        if let Some(user_profile) = self.user_profiles.get(&user_id) {
            let mut updated_profile = user_profile.clone();
            updated_profile.status = false;
            self.user_profiles.insert(user_id.clone(), updated_profile);
            ic_cdk::println!("User ID {} has been made inactive.", user_id);
            Ok(format!("User ID {} has been made inactive.", user_id))
        } else {
            Err(format!("User ID '{}' not found", user_id))
        }
    }
    
}

impl From<UserInputParams> for UserProfileParams {
    fn from(input: UserInputParams) -> Self {
        UserProfileParams {
            gender: input.gender,
            email: input.email,
            name: input.name,
            mobile_number: input.mobile_number,
            dob: input.dob,
            gender_pronouns: input.gender_pronouns,
            religion: input.religion,
            height: input.height,
            zodiac: input.zodiac,
            diet: input.diet,
            occupation: input.occupation,
            looking_for: input.looking_for,
            smoking: input.smoking,
            drinking: input.drinking,
            hobbies: input.hobbies,
            sports: input.sports,
            art_and_culture: input.art_and_culture,
            pets: input.pets,
            general_habits: input.general_habits,
            outdoor_activities: input.outdoor_activities,
            travel: input.travel,
            movies: input.movies,
            interests_in: input.interests_in,
            age: input.age,
            location: input.location,
            min_preferred_age: input.min_preferred_age,
            max_preferred_age: input.max_preferred_age,
            preferred_gender: input.preferred_gender,
            preferred_location: input.preferred_location,
            introduction: input.introduction,
            images: input.images,
            likes: None,
            matches: None,
            notifications: None,
            matched_profiles: None,
            user_id: None,
            leftswipes: None,
            rightswipes: None,
        }
    }
}

impl UserProfileParams {
    pub fn merge(&mut self, other: UserProfileParams) {
        if let Some(gender) = other.gender {
            self.gender = Some(gender);
        }
        if let Some(email) = other.email {
            self.email = Some(email);
        }
        if let Some(name) = other.name {
            self.name = Some(name);
        }
        if let Some(mobile_number) = other.mobile_number {
            self.mobile_number = Some(mobile_number);
        }
        if let Some(dob) = other.dob {
            self.dob = Some(dob);
        }
        if let Some(gender_pronouns) = other.gender_pronouns {
            self.gender_pronouns = Some(gender_pronouns);
        }
        if let Some(religion) = other.religion {
            self.religion = Some(religion);
        }
        if let Some(height) = other.height {
            self.height = Some(height);
        }
        if let Some(zodiac) = other.zodiac {
            self.zodiac = Some(zodiac);
        }
        if let Some(diet) = other.diet {
            self.diet = Some(diet);
        }
        if let Some(occupation) = other.occupation {
            self.occupation = Some(occupation);
        }
        if let Some(looking_for) = other.looking_for {
            self.looking_for = Some(looking_for);
        }
        if let Some(smoking) = other.smoking {
            self.smoking = Some(smoking);
        }
        if let Some(drinking) = other.drinking {
            self.drinking = Some(drinking);
        }
        if let Some(hobbies) = other.hobbies {
            self.hobbies = Some(hobbies);
        }
        if let Some(sports) = other.sports {
            self.sports = Some(sports);
        }
        if let Some(art_and_culture) = other.art_and_culture {
            self.art_and_culture = Some(art_and_culture);
        }
        if let Some(pets) = other.pets {
            self.pets = Some(pets);
        }
        if let Some(general_habits) = other.general_habits {
            self.general_habits = Some(general_habits);
        }
        if let Some(outdoor_activities) = other.outdoor_activities {
            self.outdoor_activities = Some(outdoor_activities);
        }
        if let Some(travel) = other.travel {
            self.travel = Some(travel);
        }
        if let Some(movies) = other.movies {
            self.movies = Some(movies);
        }
        if let Some(interests_in) = other.interests_in {
            self.interests_in = Some(interests_in);
        }
        if let Some(age) = other.age {
            self.age = Some(age);
        }
        if let Some(location) = other.location {
            self.location = Some(location);
        }
        if let Some(min_preferred_age) = other.min_preferred_age {
            self.min_preferred_age = Some(min_preferred_age);
        }
        if let Some(max_preferred_age) = other.max_preferred_age {
            self.max_preferred_age = Some(max_preferred_age);
        }
        if let Some(preferred_gender) = other.preferred_gender {
            self.preferred_gender = Some(preferred_gender);
        }
        if let Some(preferred_location) = other.preferred_location {
            self.preferred_location = Some(preferred_location);
        }
        if let Some(introduction) = other.introduction {
            self.introduction = Some(introduction);
        }
        if let Some(images) = other.images {
            self.images = Some(images);
        }
        if let Some(likes) = other.likes {
            self.likes = Some(likes);
        }
        if let Some(matches) = other.matches {
            self.matches = Some(matches);
        }
        if let Some(notifications) = other.notifications {
            self.notifications = Some(notifications);
        }
        if let Some(matched_profiles) = other.matched_profiles {
            self.matched_profiles = Some(matched_profiles);
        }
    }
}

#[update]
pub async fn create_an_account(params: UserInputParams) -> Result<String, String> {
    let caller = ic_cdk::api::caller();

    let u_ids = raw_rand().await.map_err(|e| format!("Failed to generate random user ID: {:?}", e))?.0;
    let unique_user_id = format!("{:x}", Sha256::digest(&u_ids));

    let profile_info = UserProfileCreationInfo {
        user_id: unique_user_id.clone(),
        created_at: ic_cdk::api::time(),
        creator_principal: caller,
        params: params.into(), // Convert UserInputParams to UserProfileParams
        notifications: VecDeque::new(),
        matched_profiles: Vec::new(),
        status: true,
    };

    ic_cdk::println!("Creating account with user_id: {}", unique_user_id);
    mutate_state(|state| state.create_account(unique_user_id, profile_info))
}


#[update]
pub fn update_an_account(user_id: String, params: UserInputParams) -> Result<String, String> {
    ic_cdk::println!("Updating account with user_id: {}", user_id);
    let user_profile_params: UserProfileParams = params.into(); // Convert UserInputParams to UserProfileParams

    mutate_state(|state| state.update_account(user_id, user_profile_params))
}

#[update]
pub fn delete_an_account(user_id: String) -> Result<String, String> {
    ic_cdk::println!("Deleting account with user_id: {}", user_id);
    mutate_state(|state| state.delete_account(user_id))
}


#[query]
pub fn get_an_account(user_id: String) -> Result<UserProfileCreationInfo, String> {
    ic_cdk::println!("Retrieving account with user_id: {}", user_id);
    read_state(|state| state.get_account(user_id))
}

#[query]
pub fn get_all_accounts(pagination: Pagination) -> Result<PaginatedProfiles, String> {
    read_state(|state| state.get_all_accounts(pagination))
}



