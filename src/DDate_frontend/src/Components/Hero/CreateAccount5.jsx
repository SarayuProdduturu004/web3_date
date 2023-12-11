// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import createAccountImage from "../../../assets/Images/CreateAccount/createAccountImage.png";
// import { DDate_backend } from "../../../../declarations/DDate_backend/index";

// const CreateAccount5 = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     selectedintrests: "",
//     selectedpreferAge: "",
//     selectedLocation: "",
//     selectedPrefferedLocation: "",
//     selectedIntro: "",
//   });

//   const backpageHandler = () => {
//     navigate("/CreateAccount4");
//   };

//   useEffect(() => {
//     const savedData = localStorage.getItem("form5");
//     if (savedData) {
//       setFormData(JSON.parse(savedData));
//     }
//   }, []);

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "selectedpreferAge") {
//       let minAge, maxAge;

//       if (value === "above 30") {
//         // Set default values for "above 30" option
//         minAge = 30;
//         maxAge = 60;
//       } else {
//         // Split the selected age range into minimum and maximum values
//         [minAge, maxAge] = value.split("-").map(Number);
//       }

//       setFormData((prevData) => ({
//         ...prevData,
//         min_age: minAge,
//         max_age: maxAge,
//         selectedpreferAge: value,
//       }));
//     } else {
//       setFormData((prevData) => ({ ...prevData, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     localStorage.setItem("form5", JSON.stringify(formData));
//     console.log(formData);
//     navigate("/CreateAccount5");

//     const formKeys = ["form1", "form2", "form3", "form4", "form5"];
//     const userData = {};
//     const principal = localStorage.getItem("id");
//     console.log(principal);
//     formKeys.forEach((key) => {
//       userData[key] = localStorage.getItem(key);
//     });

//     const result = {};

//     for (const key in userData) {
//       if (userData.hasOwnProperty(key)) {
//         const formData = JSON.parse(userData[key]);

//         // Merge the parsed data into the result object
//         Object.assign(result, formData);
//       }
//     }
//     localStorage.setItem("result", JSON.stringify(result));

//     const objectSendToBackendFormat = {
//       id: principal,
//       gender: result.usergender,
//       email: result.email,
//       name: result.username,
//       mobile_number: result.mobile,
//       dob: result.dob,
//       gender_pronouns: result.genderPronouns,
//       religion: result.selectedReligion,
//       height: result.selectedHeight,
//       zodiac: result.selectedZodiac,
//       diet: result.selectedFooding,
//       occupation: result.selectedWhatYouDo,
//       looking_for: result.selectedlookingFor,
//       smoking: result.selectedsmoking,
//       drinking: result.selecteddrink,
//       hobbies: result.selectedhobbies,
//       sports: result.selectedsports,
//       art_and_culture: result.selectedArt,
//       pets: result.selectedPets,
//       general_habits: result.selectedHabbits,
//       outdoor_activities: result.selectedActivities,
//       travel: result.selectedTravel,
//       movies: result.selectedMovies,
//       interests_in: result.selectedintrests,
//       age: result.age,
//       location: result.selectedLocation,
//       min_preferred_age: result.min_age,
//       max_preferred_age: result.max_age,
//       preferred_gender: result.selectedintrests,
//       preferred_location: result.selectedPrefferedLocation,
//       introduction: result.selectedIntro,
//     };

//     console.log("objectSendToBackendFormat", objectSendToBackendFormat);

//     await DDate_backend.add_user_profile(objectSendToBackendFormat);
//   };

//   return (
//     <div className="flex w-full h-screen md:flex-row">
//       {/* Image container for larger screens */}
//       <div
//         className="w-full md:w-1/2 h-full absolute md:relative bg-cover bg-center z-0"
//         style={{ backgroundImage: `url(${createAccountImage})` }}
//       >
//         <div className="hidden md:flex md:flex-col md:justify-center md:text-center md:items-center md:absolute md:inset-0 px-8 py-12">
//           <div className="w-full max-w-xl mx-auto text-left">
//             <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
//               Create Your
//             </h1>
//             <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
//               account here
//             </h2>
//             <p className="text-white text-bold md:text-2xl">Welcome ..</p>
//             <p className="text-white font-light md:text-xl">
//               Complete Your Profile Here.
//             </p>
//             <p className="text-white font-extralight md:text-lg">
//               Tell us about yourself and let us help you finding the perfect
//               match
//             </p>
//             <p className="italic text-yellow-700 md:text-lg">Good Luck!</p>
//           </div>
//         </div>

//         {/* Image Overlay for smaller screens */}
//         <div className="w-full h-full bg-black opacity-50 md:opacity-0"></div>
//       </div>

//       {/* Form container */}
//       <div className="w-full md:w-1/2 flex flex-col items-center justify-start px-4 md:px-12 z-10 overflow-y-auto">
//         <div className="w-full max-w-md my-10">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white md:text-black text-center">
//             Allow us to know you
//           </h2>
//           <div className="border-t-2 border-dotted md:border-black border-white w-full mt-4 mb-4"></div>

//           <form
//             className="w-full max-w-lg rounded-lg p-6 shadow-md md:bg-transparent md:shadow-none"
//             onSubmit={handleSubmit}
//           >
//             {/* intrests Selection */}
//             <fieldset className="mb-2">
//               <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
//                 Your intrests in
//               </legend>
//               <div className="flex flex-wrap gap-2 md:gap-2 mb-4 py-2 px-2 rounded-3xl">
//                 {["Men", "Women", "All"].map((intrests) => (
//                   <label
//                     key={intrests}
//                     className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${
//                       formData.selectedintrests === intrests
//                         ? "bg-yellow-500 text-black"
//                         : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
//                     }`}
//                   >
//                     <input
//                       type="radio"
//                       name="selectedintrests"
//                       value={intrests}
//                       onChange={handleFormChange}
//                       style={{ display: "none" }}
//                     />
//                     {intrests}
//                   </label>
//                 ))}
//               </div>
//             </fieldset>

//             <fieldset className="mb-2">
//               <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
//                 Preffered age
//               </legend>
//               <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2 px-2 rounded-3xl">
//                 {["18-20", "20-25", "25-30", "above 30"].map((preferAge) => (
//                   <label
//                     key={preferAge}
//                     className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${
//                       formData.selectedpreferAge === preferAge
//                         ? "bg-yellow-500 text-black"
//                         : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
//                     }`}
//                   >
//                     <input
//                       type="radio"
//                       name="selectedpreferAge"
//                       value={preferAge}
//                       onChange={handleFormChange}
//                       style={{ display: "none" }}
//                     />
//                     {preferAge}
//                   </label>
//                 ))}
//               </div>
//             </fieldset>

//             <div className="flex flex-col md:flex-row md:space-x-4 mb-6">
//               <div className="flex-1 mb-4 md:mb-0">
//                 <label
//                   htmlFor="selectedLocation"
//                   className="block text-lg font-semibold mb-1 text-white md:text-black"
//                 >
//                   Location
//                 </label>
//                 <input
//                   type="text"
//                   id="selectedLocation"
//                   name="selectedLocation"
//                   placeholder="Your Location"
//                   value={formData.selectedLocation}
//                   onChange={handleFormChange}
//                   className="w-full px-4 py-2 rounded-full border border-white md:border-black bg-transparent text-white md:text-black focus:ring-yellow-500 focus:border-yellow-500"
//                 />
//               </div>

//               <div className="flex-1">
//                 <label
//                   htmlFor="selectedPrefferedLocation"
//                   className="block text-lg font-semibold mb-1 text-white md:text-black"
//                 >
//                   Preferred Location
//                 </label>
//                 <input
//                   type="text"
//                   id="selectedPrefferedLocation"
//                   name="selectedPrefferedLocation"
//                   placeholder="Your Preffered Location"
//                   value={formData.selectedPrefferedLocation}
//                   onChange={handleFormChange}
//                   className="w-full px-4 py-2 rounded-full border border-white md:border-black bg-transparent text-white md:text-black focus:ring-yellow-500 focus:border-yellow-500"
//                 />
//               </div>
//             </div>

//             <div className="flex flex-col md:flex-row md:space-x-4 mb-6">
//               <div className="flex-1 mb-4 md:mb-0">
//                 <label
//                   htmlFor="selectedIntro"
//                   className="block text-lg font-semibold mb-1 text-white md:text-black"
//                 >
//                   Introduce yourself
//                 </label>
//                 <textarea
//                   id="selectedIntro"
//                   name="selectedIntro"
//                   placeholder="Let us know something about you"
//                   value={formData.selectedIntro}
//                   onChange={handleFormChange}
//                   className="w-full px-4 py-2 rounded-lg border border-white md:border-black bg-transparent text-white md:text-black"
//                 />
//               </div>
//             </div>

//             {/* Form Buttons */}
//             <div className="flex justify-between mt-6">
//               <button
//                 type="button"
//                 className="bg-transparent text-white md:text-black font-semibold py-2 px-4 rounded hover:bg-gray-400 border border-white md:border-black"
//                 onClick={backpageHandler}
//               >
//                 Back
//               </button>
//               <button
//                 type="submit"
//                 className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded hover:bg-yellow-600"
//               >
//                 Save and Start
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateAccount5;




import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import createAccountImage from "../../../assets/Images/CreateAccount/createAccountImage.png";
import { DDate_backend } from "../../../../declarations/DDate_backend/index";
import { Principal } from '@dfinity/principal';

const CreateAccount5 = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    selectedintrests: "",
    selectedpreferAge: "",
    selectedLocation: "",
    selectedPrefferedLocation: "",
    selectedIntro: "",
  });

  const backpageHandler = () => {
    navigate("/CreateAccount4");
  };

  useEffect(() => {
    const savedData = localStorage.getItem("form5");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    if (name === "selectedpreferAge") {
      let minAge, maxAge;

      if (value === "above 30") {
        // Set default values for "above 30" option
        minAge = 30;
        maxAge = 60;
      } else {
        // Split the selected age range into minimum and maximum values
        [minAge, maxAge] = value.split("-").map(Number);
      }

      setFormData((prevData) => ({
        ...prevData,
        min_age: minAge,
        max_age: maxAge,
        selectedpreferAge: value,
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    localStorage.setItem("form5", JSON.stringify(formData));
    console.log(formData);
    navigate("/CreateAccount5");

    const formKeys = ["form1", "form2", "form3", "form4", "form5"];
    const userData = {};
    const principalString = localStorage.getItem("id");
    console.log(principalString);

    // Convert the principal string to a Principal object
    const principal = convertStringToPrincipal(principalString);

    if (principal) {
      formKeys.forEach((key) => {
        userData[key] = localStorage.getItem(key);
      });

      const result = {};

      for (const key in userData) {
        if (userData.hasOwnProperty(key)) {
          const formData = JSON.parse(userData[key]);
          Object.assign(result, formData);
        }
      }

      const objectSendToBackendFormat = {
        id: principal,
        gender: result.usergender,
        email: result.email,
        name: result.username,
        mobile_number: result.mobile,
        dob: result.dob,
        gender_pronouns: result.genderPronouns,
        religion: result.selectedReligion,
        height: result.selectedHeight,
        zodiac: result.selectedZodiac,
        diet: result.selectedFooding,
        occupation: result.selectedWhatYouDo,
        looking_for: result.selectedlookingFor,
        smoking: result.selectedsmoking,
        drinking: result.selecteddrink,
        hobbies: result.selectedhobbies,
        sports: result.selectedsports,
        art_and_culture: result.selectedArt,
        pets: result.selectedPets,
        general_habits: result.selectedHabbits,
        outdoor_activities: result.selectedActivities,
        travel: result.selectedTravel,
        movies: result.selectedMovies,
        interests_in: result.selectedintrests,
        age: result.age,
        location: result.selectedLocation,
        min_preferred_age: result.min_age,
        max_preferred_age: result.max_age,
        preferred_gender: result.selectedintrests,
        preferred_location: result.selectedPrefferedLocation,
        introduction: result.selectedIntro,
      };

      console.log("objectSendToBackendFormat", objectSendToBackendFormat);

      try {
        await DDate_backend.add_user_profile(objectSendToBackendFormat);
      } catch (error) {
        console.error("Error sending data to the backend:", error);
      }
    } else {
      console.error("Error converting principal string to Principal object.");
    }
  };

  function convertStringToPrincipal(principalString) {
    try {
      const principal = Principal.fromText(principalString);
      console.log("Converted Principal: ", principal.toText());
        return principal;
    } catch (error) {
        console.error("Error converting string to Principal: ", error);
        return null;
    }
}


  return (
    <div className="flex w-full h-screen md:flex-row">
      {/* Image container for larger screens */}
      <div
        className="w-full md:w-1/2 h-full absolute md:relative bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${createAccountImage})` }}
      >
        <div className="hidden md:flex md:flex-col md:justify-center md:text-center md:items-center md:absolute md:inset-0 px-8 py-12">
          <div className="w-full max-w-xl mx-auto text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Create Your
            </h1>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
              account here
            </h2>
            <p className="text-white text-bold md:text-2xl">Welcome ..</p>
            <p className="text-white font-light md:text-xl">
              Complete Your Profile Here.
            </p>
            <p className="text-white font-extralight md:text-lg">
              Tell us about yourself and let us help you finding the perfect
              match
            </p>
            <p className="italic text-yellow-700 md:text-lg">Good Luck!</p>
          </div>
        </div>

        {/* Image Overlay for smaller screens */}
        <div className="w-full h-full bg-black opacity-50 md:opacity-0"></div>
      </div>

      {/* Form container */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-start px-4 md:px-12 z-10 overflow-y-auto">
        <div className="w-full max-w-md my-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white md:text-black text-center">
            Allow us to know you
          </h2>
          <div className="border-t-2 border-dotted md:border-black border-white w-full mt-4 mb-4"></div>

          <form
            className="w-full max-w-lg rounded-lg p-6 shadow-md md:bg-transparent md:shadow-none"
            onSubmit={handleSubmit}
          >
            {/* intrests Selection */}
            <fieldset className="mb-2">
              <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
                Your intrests in
              </legend>
              <div className="flex flex-wrap gap-2 md:gap-2 mb-4 py-2 px-2 rounded-3xl">
                {["Men", "Women", "All"].map((intrests) => (
                  <label
                    key={intrests}
                    className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${
                      formData.selectedintrests === intrests
                        ? "bg-yellow-500 text-black"
                        : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                    }`}
                  >
                    <input
                      type="radio"
                      name="selectedintrests"
                      value={intrests}
                      onChange={handleFormChange}
                      style={{ display: "none" }}
                    />
                    {intrests}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="mb-2">
               <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
                 Preffered age
               </legend>
               <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2 px-2 rounded-3xl">
                 {["18-20", "20-25", "25-30", "above 30"].map((preferAge) => (
                  <label
                    key={preferAge}
                    className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${
                      formData.selectedpreferAge === preferAge
                        ? "bg-yellow-500 text-black"
                        : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                    }`}
                  >
                    <input
                      type="radio"
                      name="selectedpreferAge"
                      value={preferAge}
                      onChange={handleFormChange}
                      style={{ display: "none" }}
                    />
                    {preferAge}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="flex flex-col md:flex-row md:space-x-4 mb-6">
              <div className="flex-1 mb-4 md:mb-0">
                <label
                  htmlFor="selectedLocation"
                  className="block text-lg font-semibold mb-1 text-white md:text-black"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="selectedLocation"
                  name="selectedLocation"
                  placeholder="Your Location"
                  value={formData.selectedLocation}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 rounded-full border border-white md:border-black bg-transparent text-white md:text-black focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>

              <div className="flex-1">
                <label
                  htmlFor="selectedPrefferedLocation"
                  className="block text-lg font-semibold mb-1 text-white md:text-black"
                >
                  Preferred Location
                </label>
                <input
                  type="text"
                  id="selectedPrefferedLocation"
                  name="selectedPrefferedLocation"
                  placeholder="Your Preffered Location"
                  value={formData.selectedPrefferedLocation}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 rounded-full border border-white md:border-black bg-transparent text-white md:text-black focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4 mb-6">
              <div className="flex-1 mb-4 md:mb-0">
                <label
                  htmlFor="selectedIntro"
                  className="block text-lg font-semibold mb-1 text-white md:text-black"
                >
                  Introduce yourself
                </label>
                <textarea
                  id="selectedIntro"
                  name="selectedIntro"
                  placeholder="Let us know something about you"
                  value={formData.selectedIntro}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 rounded-lg border border-white md:border-black bg-transparent text-white md:text-black"
                />
              </div>
            </div>            
            {/* Form Buttons */}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                className="bg-transparent text-white md:text-black font-semibold py-2 px-4 rounded hover:bg-gray-400 border border-white md:border-black"
                onClick={backpageHandler}
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded hover:bg-yellow-600"
              >
                Save and Start
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount5;