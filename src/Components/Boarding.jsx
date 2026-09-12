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
      <div className="ml-44 absolute top-[62px] left-[24px] right-[24px]  flex items-center justify-between  2xl:ml-90">

        {/* Back arrow */}
        <button
          onClick={goToWelcome}
          className="-ml-44 w-[24px] h-[24px] flex items-center justify-center"
        >
          <span className=" text-[28px] xl:-mt-3 xl:text-7xl lg:text-5xl 2xl:text-7xl 2xl:-ml-174 leading-none text-[#1F2937]">
            ←
          </span>
        </button>

        {/* Logo + Skip */}
        <div className="ml-auto flex items-center gap-[75px]">

          {/* Logo */}
          <div className="mr-32 flex items-center gap-[2px] sm:mr-33 md:mr-40 lg:mr-70 xl:ml-29 xl:mr-102 2xl:mr-134 ">

          <img
            src="/EasyReach.png"
            alt="EasyReach"
            className="w-[27px] sm:-ml-4 md:w-[39px] h-[32px] md:h-[42px] lg:h-[72px]  lg:w-[49px] object-contain "
          />

            <span className="text-lg font-bold text-[#1F2937] md:text-2xl lg:text-3xl ">
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
      <div className="absolute left-6 top-[126px] flex items-center gap-1 lg:mt-7 xl:mt-11">
        <div className="w-10 h-1 bg-[#008000] rounded-full"></div>
        <div className="w-5 h-1 bg-[#008000] rounded-full"></div>
        <div className="w-5 h-1 bg-[#008000] rounded-full"></div>
      </div>


      {/* Heading */}
      <h1 className="absolute mt-22 ml-74 font-medium sm:ml-64 sm:font-medium sm:text-lg sm:-mt-11 text-sm md:text-xl md:ml-84 lg:ml-110 lg:text-2xl lg:-mt-4 md:ml-27 xl:ml-143 2xl:ml-173 2xl:font-normal 2xl:text-3xl leading-[29px] font-bold text-[#1F2937]">
        Get Help Fast
      </h1>


      {/* Description */}
      <p className="absolute mt-30 text-center ml-33 sm:left-[124px] w-[380px] text-sm sm:text-sm sm:-mt-14 sm:ml-4 sm:text-center md:ml-24 leading-[28px] font-medium text-[#1F2937] lg:ml-57 lg:text-xl lg:-mt-1 xl:ml-93 2xl:ml-124">
        From mechanics to tailors, EasyReach brings trusted services right to you.
      </p>


      {/* Main image */}
      <div className="absolute mt-54 ml-47 sm:ml-40 w-[280px] md:w-99 lg:w-149 lg:h-149 lg:ml-54 h-[380px] md:h-119 md:ml-47 xl:ml-90 overflow-hidden rounded-[24px] 2xl:ml-120">
        <img
          src="/boarding.png"
          alt="EasyReach services"
          className="w-full md:w-99  lg:w-149  h-full  object-cover"
        />
      </div>


      {/* Get Started button */}
      <button
        onClick={goToWelcome}
        className="absolute top-[754px] text-white ml-46 sm:left-[164px] w-[280px] h-[52px] sm:ml-5 md:mt-34 md:ml-24 lg:mt-74 lg:ml-57  xl:ml-93 flex items-center  justify-center bg-[#008000] rounded-full 2xl:ml-119"
      >
        Get Started
      </button>


      {/* iPhone home indicator */}
      <div className="absolute bottom-0 left-0 w-full h-[24px] flex items-center justify-center md:ml-4 lg:ml-5 xl:ml-9 2xl:ml-3">
        <div className="w-[108px] h-1 bg-[#1D1B20] rounded-xl"></div>
      </div>

    </div>
  );
}

export default Boarding;