import React from "react";
import friendshipImage from "../../assets/Images/ExploreImages/friendships.png";
import datingImage from "../../assets/Images/ExploreImages/dating.png";
import marriageImage from "../../assets/Images/ExploreImages/marriage.png";
import networkingImage from "../../assets/Images/ExploreImages/networking.png";

const Explore = () => {
  return (
    <>
      <div className="bg-white flex flex-col items-center w-full mt-20">
        <h2 className="text-center text-black text-4xl font-bold font-num mb-2">
          Explore Us
        </h2>
        <p className="font-custom text-center text-black text-lg font-light max-w-4xl mx-auto mb-5">
          Join Ddate To Explore The Opportunities
        </p>
        <div className="relative flex justify-center items-center w-full">
          <p className="border-t mx-32 border-black w-full md:w-3/4 lg:w-2/3"></p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="18"
            viewBox="0 0 20 19"
            fill="none"
            className="absolute text-red-700"
          >
            <path
              d="M10 18.35L8.55 17.03C3.4 12.36 0 9.27 0 5.5C0 2.41 2.42 0 5.5 0C7.24 0 8.91 0.81 10 2.08C11.09 0.81 12.76 0 14.5 0C17.58 0 20 2.41 20 5.5C20 9.27 16.6 12.36 11.45 17.03L10 18.35Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <div className="flex flex-col items-center justify-center my-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 w-full px-6">
            {/* Friendships */}
            <div className="flex items-center text-start sm:space-x-6 mt-8 mb-16 relative">
              <div className="w-44 h-44 bg-yellow-400 rounded-full relative">
                <img
                  className="absolute z-10 top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-2/6 w-full h-full object-contain"
                  src={friendshipImage}
                  alt="friendship"
                />
              </div>

              <div className="ml-6 sm:ml-0">
                <p className="text-2xl text-black mb-2 font-bold">
                  Friendships
                </p>
                <p className="text-black text-sm font-light max-w-xs">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua
                </p>
              </div>
            </div>

            {/* Dating */}
            <div className="flex items-center text-start sm:space-x-6 mt-8 mb-16">
              <div className="w-44 h-44 bg-custom-orange rounded-full relative">
                <img
                  className="absolute z-10 top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-2/6 w-full h-full object-contain"
                  src={datingImage}
                  alt="dating"
                />
              </div>
              <div>
                <p className="text-2xl text-black mb-2 font-bold">Dating</p>
                <p className="text-black text-sm font-light max-w-xs">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua
                </p>
              </div>
            </div>

            {/* Marriage */}
            <div className="flex items-center text-start sm:space-x-6 mb-20">
              <div className="w-44 h-44 bg-custom-red rounded-full relative">
                <img
                  className="absolute z-10 top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-2/6 w-full h-full object-contain"
                  src={marriageImage}
                  alt="marriage"
                />
              </div>
              <div>
                <p className="text-2xl text-black mb-2 font-bold">Marriage</p>
                <p className="text-black text-sm font-light max-w-xs">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua
                </p>
              </div>
            </div>

            {/* Networking */}
            <div className="flex items-center text-start sm:space-x-6 mb-20">
              <div className="w-44 h-44 bg-custom-purple rounded-full relative">
                <img
                  className="absolute z-10 top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-2/6 w-full h-full object-contain"
                  src={networkingImage}
                  alt="networking"
                />
              </div>
              <div>
                <p className="text-2xl text-black mb-2 font-bold">Networking</p>
                <p className="text-black text-sm font-light max-w-xs">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Explore;
