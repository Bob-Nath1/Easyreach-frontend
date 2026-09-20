import React from "react";
import { useNavigate } from "react-router-dom";

function Boarding() {
  const navigate = useNavigate();
  const goToWelcome = () => {
    navigate("/welcome");
  };

  return (
    <div className="relative w-full  sm:max-w-[640px] 
    md:max-w-[768px]
    lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px] h-[926px]
    
    md:h-[1026px] lg:h-[1226px] mx-auto bg-white rounded-[35px] overflow-hidden">

      {/* Top navigation */}
      <div className="absolute top-[62px] left-0 w-full">

        {/* Back arrow */}
        <button
          onClick={goToWelcome}
          className="absolute left-[24px] top-0 w-[24px] h-[24px] flex items-center justify-center"
        >
          <span className="text-[28px] leading-none text-[#1F2937]">
            ←
          </span>
        </button>

        {/* Logo + Skip */}
        <div className="ml-auto flex items-center gap-[75px]">

          {/* Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-[2px]">

          <img
            src="/EasyReach.png"
            alt="EasyReach"
            className="w-[27px] h-[32px] md:w-[39px] md:h-[42px] lg:w-[49px] lg:h-[72px] object-contain"
          />

            <span className="text-lg font-bold text-[#1F2937] md:text-2xl lg:text-3xl">
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
      <div className="absolute left-6 top-[100px] flex items-center gap-1">
        <div className="w-[20px] sm:w-[40px] h-[2px] sm:h-[4px] bg-[#008000] rounded-full"></div>
        <div className="w-[10px] sm:w-[20px] h-[4px] sm:h-[2px] bg-[#008000] rounded-full"></div>
        <div className="w-[10px] sm:w-[20px] h-[4px] sm:h-[2px] bg-[#008000] rounded-full"></div>
      </div>


      {/* Heading */}
      <h1 className="absolute mt-22 left-1/2 -translate-x-1/2 w-full text-center font-medium text-sm sm:text-lg md:text-xl lg:text-2xl lg:mt-25 2xl:text-3xl leading-[29px] text-[#1F2937]">
        Get Help Fast
      </h1>


      {/* Description */}
      <p className="absolute mt-30 left-1/2 -translate-x-1/2 w-[380px] max-w-[calc(100%-40px)] text-sm sm:text-sm text-center md:text-base leading-[18px] font-medium text-[#1F2937] lg:text-xl lg:mt-35 lg:leading-[22px] xl:leading-[27px]">
        From mechanics to tailors, EasyReach brings trusted services right to you.
      </p>


      {/* Main image */}
      <div className="absolute mt-54 left-1/2 -translate-x-1/2 w-[280px] md:w-99 lg:w-149 lg:h-149 h-[380px] md:h-119 overflow-hidden rounded-[24px]">
        <img
          src="/boarding.png"
          alt="EasyReach services"
          className="w-full md:w-99  lg:w-149  h-full  object-cover"
        />
      </div>


      {/* Get Started button */}
      <button
        onClick={goToWelcome}
        className="absolute top-[754px] left-1/2 -translate-x-1/2 w-[280px] h-[52px] flex items-center justify-center bg-[#008000] rounded-full text-white top-[880px]"
      >
        Get Started
      </button>


      {/* iPhone home indicator */}
      <div className="absolute bottom-0 left-0 w-full h-[24px] flex items-center justify-center">
        <div className="w-[108px] h-1 bg-[#1D1B20] rounded-xl"></div>
      </div>

    </div>
  );
}

export default Boarding;