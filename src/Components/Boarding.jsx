import React from "react";
import { useNavigate } from "react-router-dom";

function Boarding() {
  const navigate = useNavigate();
  const goToWelcome = () => {
    navigate("/welcome");
  };

  return (
    <div className="relative w-[428px] h-[926px] mx-auto bg-white rounded-[35px] overflow-hidden">

      {/* Top navigation */}
      <div className="absolute left-6 top-[62px] w-[380px] h-[40px] flex items-center">

        {/* Back arrow */}
        <button
          onClick={goToWelcome}
          className="w-6 h-6 flex items-center justify-center"
        >
          <span className="text-[#1F2937] text-2xl leading-none">
            ←
          </span>
        </button>

        {/* Logo + Skip */}
        <div className="ml-auto flex items-center gap-[75px]">

          {/* Logo */}
          <div className="flex items-center gap-[1px]">
            <img
              src="/EasyReach.png"
              alt="EasyReach"
              className="w-[27px] h-[32px] object-contain"
            />

            <span className="font-bold text-[22px] leading-7 text-[#1F2937]">
              Easy<span className="text-[#008000]">Reach</span>
            </span>
          </div>

          {/* Skip - hidden according to Figma */}
          <button
            className="opacity-0 flex items-center gap-1 text-[#008000] font-bold text-[14px]"
          >
            Skip
          </button>

        </div>
      </div>


      {/* Progress indicators */}
      <div className="absolute left-6 top-[126px] flex items-center gap-1">
        <div className="w-10 h-1 bg-[#008000] rounded-full"></div>
        <div className="w-5 h-1 bg-[#008000] rounded-full"></div>
        <div className="w-5 h-1 bg-[#008000] rounded-full"></div>
      </div>


      {/* Heading */}
      <h1 className="absolute left-6 top-[154px] text-[24px] leading-[29px] font-bold text-[#1F2937]">
        Get Help Fast
      </h1>


      {/* Description */}
      <p className="absolute left-6 top-[194px] w-[380px] text-[14px] leading-7 font-medium text-[#1F2937]">
        From mechanics to tailors, EasyReach brings trusted services right to you.
      </p>


      {/* Main image */}
      <div className="absolute left-6 top-[296px] w-[380px] h-[380px] rounded-[24px] overflow-hidden">
        <img
          src="/boarding.png"
          alt="EasyReach services"
          className="w-full h-full object-cover"
        />
      </div>


      {/* Get Started button */}
      <button
        onClick={goToWelcome}
        className="absolute left-6 top-[754px] w-[380px] h-[52px] bg-[#008000] rounded-full flex items-center justify-center text-white font-semibold text-[14px] leading-7"
      >
        Get Started
      </button>


      {/* iPhone home indicator */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[412px] h-6 flex items-center justify-center">
        <div className="w-[108px] h-1 bg-[#1D1B20] rounded-xl"></div>
      </div>

    </div>
  );
}

export default Boarding;