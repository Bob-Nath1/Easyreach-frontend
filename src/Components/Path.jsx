import React from "react";
import { useNavigate } from "react-router-dom";

function Path() {
const navigate = useNavigate();

  const handleRoleSelect = (role) => {
  // Save the user's selected role
  localStorage.setItem("userRole", role);

  // Go to the next page
  if (role === "seeker") {
    navigate("/signup");
  } else {
    navigate("/signuppro");
  }
};

  const features = [
    "Search nearby providers",
    "Post service requests",
    "Read reviews & ratings",
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
     <div
  className="
    relative
    w-full
    sm:w-[640px]
    md:w-[768px]
    lg:w-[1024px]
    xl:w-[1280px]
    2xl:w-[1536px]
    min-h-[926px]
    lg:min-h-[1200px]
    mx-auto
    bg-white
    rounded-[35px]
    overflow-hidden
  "
>

        {/* ================= BACK BUTTON ================= */}
        <button
          onClick={() => navigate(-1)}
          className="
            absolute
            left-6
            top-[70px]
            w-6
            h-6
            flex
            items-center
            justify-center
            text-gray-800
            hover:text-green-700
            transition
          "
          aria-label="Go back"
        >
          <span className="text-[28px] leading-none">‹</span>
        </button>

        {/* ================= HEADER ================= */}
        <div className="absolute top-[94px] left-0 w-full text-center">
          <h1 className="text-[24px] leading-[29px] font-bold text-gray-800">
            Choose Your Path
          </h1>

          <p className="mt-[16px] text-base leading-[17px] font-medium text-gray-500">
            How would you like to use EasyReach?
          </p>
        </div>

        {/* ================= MAIN CONTENT ================= */}
       <div className="absolute top-[180px] left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-[380px] space-y-6 pb-10">

          {/* ================= SERVICE SEEKER ================= */}
          <button
           onClick={() => handleRoleSelect("seeker")}
            className="
              w-full
              h-[396px]
              bg-white
              border-[3px]
              border-gray-200
              rounded-[15px]
              p-4 px-6
              text-left
              hover:border-green-600
              transition-all
              active:scale-[0.99]
            "
          >
            {/* Icon + title */}
            <div className="flex flex-col gap-2">
              <div className="w-20 h-20 bg-[#008000] rounded-[15px] flex items-center justify-center">
                {/* Simple user/search icon */}
                <div className="relative w-8 h-8">
                  <div className="absolute left-[8px] top-[2px] w-[12px] h-[12px] border-2 border-white rounded-full" />
                  <div className="absolute left-[3px] bottom-[1px] w-[22px] h-[11px] border-2 border-white border-b-0 rounded-t-full" />
                </div>
              </div>

              <h2 className="text-[18px] sm:text-xl leading-7 font-bold text-gray-800">
                Service Seeker
              </h2>

              <p className="text-base leading-6 font-medium text-gray-500">
                Find and connect with trusted service providers near you
              </p>
            </div>

            {/* Features */}
            <div className="mt-5 flex flex-col gap-2 ">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2"
                >
                  <span className="text-[#008000] text-[23px] leading-none">
                    ●
                  </span>

                  <span className="text-base leading-[17px] font-medium text-gray-700">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </button>

          {/* ================= SERVICE PROVIDER ================= */}
          <button
    
  onClick={() => handleRoleSelect("provider")}
            className="
              w-full
              h-[396px]
              bg-white
              border-[3px]
              border-gray-200
              rounded-[15px]
              p-4 px-6
              text-left
              hover:border-green-600
              transition-all
              active:scale-[0.99]
            "
          >
            {/* Icon + title */}
            <div className="flex flex-col gap-2">
              <div className="w-20 h-20 bg-[#008000] rounded-[15px] flex items-center justify-center">
                {/* Simple provider/store icon */}
                <div className="relative w-8 h-8">
                  <div className="absolute top-[2px] left-[2px] w-[28px] h-[11px] border-2 border-white rounded-sm" />
                  <div className="absolute bottom-[2px] left-[5px] w-[22px] h-[17px] border-2 border-white rounded-sm" />
                  <div className="absolute bottom-[6px] left-[13px] w-[6px] h-[10px] border-2 border-white rounded-sm" />
                </div>
              </div>

              <h2 className="text-xl leading-7 font-bold text-gray-800">
                Service Provider
              </h2>

              <p className="text-base leading-6 font-medium text-gray-500">
                Grow your business by connecting with customers who need
                your services
              </p>
            </div>

            {/* Features */}
            <div className="mt-5 flex flex-col gap-2">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2"
                >
                  <span className="text-[#008000] text-[23px] leading-none">
                    ●
                  </span>

                  <span className="text-base leading-[17px] font-medium text-gray-700">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </button>
        </div>

        {/* ================= BOTTOM NAVIGATION ================= */}
        <div className="absolute bottom-0 left-0 w-full h-6 bg-white flex items-center justify-center">
  <div className="w-[108px] h-1 bg-gray-800 rounded-xl" />
</div>
      </div>
    </div>
  );
}

export default Path;


