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
    "Road reviews & ratings",
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div
        className="
          relative
          w-full max-w-[428px]
          min-h-[926px]
          bg-white
          rounded-[35px]
          overflow-hidden
        "
      >
        {/* ================= STATUS BAR ================= */}
        <div className="absolute top-0 left-0 w-full h-[62px] px-4 flex items-center justify-between">
          {/* Time */}
          <div className="text-black text-[17px] font-semibold">
            9:41
          </div>

          {/* Status icons */}
          <div className="flex items-center gap-2 text-black">
            {/* Cellular */}
            <div className="flex items-end gap-[2px] h-[14px]">
              <span className="w-[3px] h-[5px] bg-black rounded-sm" />
              <span className="w-[3px] h-[8px] bg-black rounded-sm" />
              <span className="w-[3px] h-[11px] bg-black rounded-sm" />
              <span className="w-[3px] h-[14px] bg-black rounded-sm" />
            </div>

            {/* WiFi */}
            <div className="text-[16px] leading-none">⌁</div>

            {/* Battery */}
            <div className="relative w-[27px] h-[13px] border border-black rounded-[4px]">
              <div className="absolute left-[2px] top-[2px] bottom-[2px] w-[19px] bg-black rounded-[2px]" />
              <div className="absolute -right-[3px] top-[4px] w-[2px] h-[5px] bg-black rounded-r" />
            </div>
          </div>
        </div>

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

          <p className="mt-[16px] text-[14px] leading-[17px] font-medium text-gray-500">
            How would you like to use EasyReach?
          </p>
        </div>

        {/* ================= MAIN CONTENT ================= */}
        <div className="absolute top-[180px] left-1/2 -translate-x-1/2 w-[380px] space-y-6 pb-10">

          {/* ================= SERVICE SEEKER ================= */}
          <button
           onClick={() => handleRoleSelect("seeker")}
            className="
              w-full
              h-[296px]
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

              <h2 className="text-[18px] leading-7 font-bold text-gray-800">
                Service Seeker
              </h2>

              <p className="text-[14px] leading-6 font-medium text-gray-500">
                Find and connect with trusted service providers near you
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

                  <span className="text-[14px] leading-[17px] font-medium text-gray-700">
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
              h-[296px]
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

              <h2 className="text-[18px] leading-7 font-bold text-gray-800">
                Service Provider
              </h2>

              <p className="text-[14px] leading-6 font-medium text-gray-500">
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

                  <span className="text-[14px] leading-[17px] font-medium text-gray-700">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </button>
        </div>

        {/* ================= BOTTOM NAVIGATION ================= */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[412px] h-6 bg-white">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[108px] h-1 bg-gray-800 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export default Path;


