import React from "react";
import { useNavigate } from "react-router-dom";

function Chat() {
  const navigate = useNavigate();
  const goToBoarding = () => {
    navigate("/boarding");
  };

  return (
    <div className="relative w-full max-w-[428px] h-[926px] mx-auto bg-white rounded-[35px] overflow-hidden">

      {/* Top Navigation */}
      <div className="absolute top-[62px] left-[24px] right-[24px] flex items-center justify-between">

        {/* Back Button */}
        <button
          onClick={goToBoarding}
          className="w-[24px] h-[24px] flex items-center justify-center"
        >
          <span className="text-[28px] leading-none text-[#1F2937]">
            ‹
          </span>
        </button>

        {/* Logo */}
        <div className="flex items-center gap-[2px]">

          <img
            src="/EasyReach.png"
            alt="EasyReach"
            className="w-[27px] h-[32px] object-contain"
          />

          <span className="text-[22px] font-bold text-[#1F2937]">
            EasyReach
          </span>

        </div>

        {/* Skip */}
        <button
          onClick={goToBoarding}
          className="flex items-center gap-[3px] text-[14px] font-bold text-[#008000]"
        >
          <span>Skip</span>

          <span className="text-[16px] leading-none">
            ›
          </span>
        </button>

      </div>


      {/* Progress Indicators */}
      <div className="absolute top-[126px] left-[24px] flex items-center gap-[4px]">

        <div className="w-[40px] h-[4px] bg-[#008000] rounded-full"></div>

        <div className="w-[20px] h-[4px] bg-[#008000] rounded-full"></div>

        <div className="w-[20px] h-[4px] bg-[#A1A1A1] rounded-full"></div>

      </div>


      {/* Heading */}
      <h1 className="absolute top-[154px] left-[24px] text-[24px] leading-[29px] font-bold text-[#1F2937]">
        Connect & Chat Easily
      </h1>


      {/* Description */}
      <p className="absolute top-[194px] left-[24px] w-[380px] text-[14px] leading-[28px] font-medium text-[#1F2937]">
        Message or call verified service providers directly
        within the app.
      </p>


      {/* Main Image */}
      <div className="absolute top-[296px] left-[24px] w-[380px] h-[380px] overflow-hidden rounded-[24px]">

        <img
          src="/Chat.png"
          alt="Connect and chat"
          className="w-full h-full object-cover"
        />

      </div>


      {/* Next Button */}
      <button
        onClick={() => navigate("/boarding")}
        className="absolute top-[754px] left-[24px] w-[380px] h-[52px] flex items-center justify-center bg-[#008000] rounded-full hover:bg-green-700 transition"
      >
        <span className="text-[14px] leading-[28px] font-semibold text-white">
          Next
        </span>
      </button>


      {/* Bottom iPhone Handle */}
      <div className="absolute bottom-0 left-0 w-full h-[24px] flex items-center justify-center">

        <div className="w-[108px] h-[4px] bg-[#1D1B20] rounded-[12px]"></div>

      </div>

    </div>
  );
}

export default Chat;


