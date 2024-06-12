// import React, { useState, useEffect } from "react";
// import Form1 from "./Form1";
// import ImageContainer from "./ImageContainer";
// import Form2 from "./Form2";
// import Form3 from "./Form3";
// import Form4 from "./Form4";
// import Form5 from "./Form5";
// import Form6 from "./Form6";


// const CreateAccount1 = () => {
//   const [index, setIndex] = useState(0); 
//   const [formData, setFormData] = useState({});
//   const updateFormData = (newData) => {
//     setFormData(prev => ({ ...prev, ...newData }));
//   };
//   const backHandler = () => {
//     if(index>0){
//       setIndex(index-1);
//     }
//   }

//   return (
//     <div className="flex w-full h-screen overflow-hidden md:flex-row font-viga">
//       {/* Image container for larger screens */}
//       <ImageContainer />

//       {/* Form container */}
//       <div className="w-full md:w-1/2 flex flex-col items-center justify-start px-4 md:px-12 z-10 overflow-y-auto">
//         <div className="w-full my-10">

//           <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white md:text-black text-center ">
//             <div className="flex items-center">
//               <svg className="flex-shrink-0 ml-5 cursor-pointer" onClick={backHandler} width="20" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M5.28501 0.285909L0.285013 5.28591C0.193973 5.38101 0.122608 5.49316 0.0750132 5.61591C-0.0250048 5.85937 -0.0250048 6.13245 0.0750133 6.37591C0.122608 6.49866 0.193973 6.6108 0.285013 6.70591L5.28501 11.7059C5.37825 11.7991 5.48894 11.8731 5.61076 11.9236C5.73259 11.974 5.86315 12 5.99501 12C6.26132 12 6.51671 11.8942 6.70501 11.7059C6.89332 11.5176 6.9991 11.2622 6.9991 10.9959C6.9991 10.7296 6.89332 10.4742 6.70501 10.2859L3.40501 6.99591L10.995 6.99591C11.2602 6.99591 11.5146 6.89055 11.7021 6.70301C11.8897 6.51548 11.995 6.26112 11.995 5.99591C11.995 5.73069 11.8897 5.47634 11.7021 5.2888C11.5146 5.10126 11.2602 4.99591 10.995 4.99591L3.40501 4.99591L6.70501 1.70591C6.79874 1.61294 6.87314 1.50234 6.9239 1.38049C6.97467 1.25863 7.00081 1.12792 7.00081 0.995908C7.00081 0.863897 6.97467 0.733191 6.9239 0.611332C6.87314 0.489472 6.79874 0.378873 6.70501 0.285909C6.61205 0.192181 6.50145 0.117785 6.37959 0.0670163C6.25773 0.0162475 6.12703 -0.00988987 5.99501 -0.00988986C5.863 -0.00988986 5.7323 0.0162475 5.61044 0.0670164C5.48858 0.117785 5.37798 0.192181 5.28501 0.285909Z" fill="black" id="svg-path" />
//               </svg>

//               <span className="flex-grow text-center md:text-2xl text-xl">Allow Us to Know You</span>
//             </div>
//             <style jsx>{`@media (max-width: 768px) {#svg-path {fill: yellow;}}`}</style>

//           </h2>

//           <div className="border-t-2 border-solid md:border-black border-white w-[90% ] mt-4 mb-4 md:ml-6"></div>

//           {index ===0 &&
//           <Form1 index={index} setIndex={setIndex} updateFormData={updateFormData} AllformData={formData} />
//           }
//           {index ===1 &&
//           <Form2 index={index} setIndex={setIndex} updateFormData={updateFormData} AllformData={formData} />
//           }
//            {index ===2 &&
//           <Form3 index={index} setIndex={setIndex} updateFormData={updateFormData} AllformData={formData} />
//           }
//            {index ===3 &&
//           <Form4 index={index} setIndex={setIndex} updateFormData={updateFormData} AllformData={formData} />
//           }
//           {index ===4 &&
//           <Form5 index={index} setIndex={setIndex} updateFormData={updateFormData} AllformData={formData} />
//           }
//           {index ===5 &&
//           <Form6 AllformData={formData} updateFormData={updateFormData} />
//           }
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateAccount1;


import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Form1 from './Form1';
import ImageContainer from './ImageContainer';
import Form2 from './Form2';
import Form3 from './Form3';
import Form4 from './Form4';
import Form5 from './Form5';
import Form6 from './Form6';

// Define Yup schema for the entire form
const schema = yup.object({
  usergender:yup.string().required('Gender is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  username: yup.string().required('Username is required'),
  mobile: yup.string().matches(/^\d{10}$/, 'Invalid mobile number').required('Mobile number is required'),
  dob: yup.date().required('Date of birth is required'),
  genderPronouns: yup.string().required('Gender pronouns are required'),
  selectedReligion: yup.string().required('A religion selection is required'),
  selectedLifePathNumber: yup.number().positive('Life-path number must be greater than 0').integer('Life-path number must be an integer').required('Life-path number is required'),
  selectedZodiac: yup.string().required('Zodiac sign is required'),
  selectedFooding: yup.string().required('Fooding preference is required'),
  selectedWhatYouDo: yup.string().required('Occupation is required'),
  selectedLookingFor: yup.string().required('Relationship preference is required'),
  selectedsmoking: yup.string().required("Smoking preference is required"),
  selecteddrink: yup.string().required("Drinking preference is required"),
  selectedhobbies: yup.array().of(yup.string()).min(2, "At least 2 hobby must be selected"),
  selectedsports: yup.array().of(yup.string()).min(2, "At least 2 sports must be selected"),
  selectedArt: yup.array().of(yup.string()).min(2, 'Select up to 2 arts only'),
  selectedPets: yup.string().required('Pet selection is required'),
  selectedHabits: yup.array().of(yup.string()).min(2, 'Select up to 2 habits only'),
  selectedActivities: yup.array().of(yup.string()).min(2, 'Select up to 2 activities only'),
  selectedMovies: yup.array().of(yup.string()).min(2, 'Select up to 2 movies only'),
  selectedTravel: yup.array().of(yup.string()).min(2, 'Select up to 2 travel options only'),
}).required();


const CreateAccount1 = () => {
  const formFields = {
    0: ['usergender','email', 'username', 'mobile', 'dob'],
    1: ['genderPronouns', 'selectedReligion', 'selectedLifePathNumber', 'selectedZodiac', 'selectedFooding', 'selectedWhatYouDo', 'selectedLookingFor'],
    2: ['selectedsmoking', 'selecteddrink', 'selectedhobbies', 'selectedsports'],
    3: ['selectedArt','selectedPets','selectedHabits','selectedActivities','selectedMovies','selectedTravel'],
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "all"
  });
  const { handleSubmit } = methods;
  const [index, setIndex] = React.useState(0);

  const onSubmit = data => {
    console.log("Final Form Data", data);
    // Perform final submission tasks (e.g., sending data to an API)
  };

  const handleNext = async () => {
    const isValid = await methods.trigger(formFields[index]); 
    if (isValid) {
      setIndex(index + 1);
    }
  };
  const handleBack = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const onErrorHandler = (val) => {
    console.log("error", val);
  }
  return (
    <FormProvider {...methods}>
      <div className="flex w-full h-screen overflow-hidden md:flex-row font-viga">
      {/* Image container for larger screens */}
      <ImageContainer />

      {/* Form container */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-start px-4 md:px-12 z-10 overflow-y-auto">
        <div className="w-full my-10">

          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white md:text-black text-center ">
            <div className="flex items-center">
              <svg className="flex-shrink-0 ml-5 cursor-pointer" onClick={handleBack} width="20" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.28501 0.285909L0.285013 5.28591C0.193973 5.38101 0.122608 5.49316 0.0750132 5.61591C-0.0250048 5.85937 -0.0250048 6.13245 0.0750133 6.37591C0.122608 6.49866 0.193973 6.6108 0.285013 6.70591L5.28501 11.7059C5.37825 11.7991 5.48894 11.8731 5.61076 11.9236C5.73259 11.974 5.86315 12 5.99501 12C6.26132 12 6.51671 11.8942 6.70501 11.7059C6.89332 11.5176 6.9991 11.2622 6.9991 10.9959C6.9991 10.7296 6.89332 10.4742 6.70501 10.2859L3.40501 6.99591L10.995 6.99591C11.2602 6.99591 11.5146 6.89055 11.7021 6.70301C11.8897 6.51548 11.995 6.26112 11.995 5.99591C11.995 5.73069 11.8897 5.47634 11.7021 5.2888C11.5146 5.10126 11.2602 4.99591 10.995 4.99591L3.40501 4.99591L6.70501 1.70591C6.79874 1.61294 6.87314 1.50234 6.9239 1.38049C6.97467 1.25863 7.00081 1.12792 7.00081 0.995908C7.00081 0.863897 6.97467 0.733191 6.9239 0.611332C6.87314 0.489472 6.79874 0.378873 6.70501 0.285909C6.61205 0.192181 6.50145 0.117785 6.37959 0.0670163C6.25773 0.0162475 6.12703 -0.00988987 5.99501 -0.00988986C5.863 -0.00988986 5.7323 0.0162475 5.61044 0.0670164C5.48858 0.117785 5.37798 0.192181 5.28501 0.285909Z" fill="black" id="svg-path" />
              </svg>

              <span className="flex-grow text-center md:text-2xl text-xl">Allow Us to Know You</span>
            </div>
            <style jsx>{`@media (max-width: 768px) {#svg-path {fill: yellow;}}`}</style>

          </h2>

          <div className="border-t-2 border-solid md:border-black border-white w-[90% ] mt-4 mb-4 md:ml-6"></div>
            <form onSubmit={handleSubmit(onSubmit,onErrorHandler) }>
              {index === 0 && <Form1 />}
              {index === 1 && <Form2 />}
              {index === 2 && <Form3 />}
              {index === 3 && <Form4 />}
              {index === 4 && <Form5 />}
              {index === 5 && <Form6 />}
              
              <div className="flex justify-between">
                <button type="button" className='className="bg-yellow-500 font-semibold py-2 px-6 rounded-full hover:bg-yellow-600 text-white md:text-black md:hover:text-black"' onClick={handleBack} disabled={index === 0}>Back</button>
                {index === 3 ? (
                  <button type="submit" className='className="bg-yellow-500 font-semibold py-2 px-6 rounded-full hover:bg-yellow-600 text-white md:text-black md:hover:text-black"'>Submit</button>
                ) : (
                  <button type="button" className="bg-yellow-500 font-semibold py-2 px-6 rounded-full hover:bg-yellow-600 text-white md:text-black md:hover:text-black" onClick={handleNext}>Next</button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default CreateAccount1;
