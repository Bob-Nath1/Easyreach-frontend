import React from "react";
import { useNavigate } from "react-router-dom";

function FrontPage() {
  const navigate = useNavigate();

  const goToChat = () => {
    navigate("/chat");
  };

  return (
    <div className="relative w-full sm:max-w-[640px] 
    md:max-w-[768px]
    lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px] h-[926px]
    
    md:h-[1026px] lg:h-[1226px] mx-auto bg-white rounded-[35px] overflow-hidden">

      {/* Top Navigation */}
      <div className="absolute top-[62px]  right-[24px] flex items-center justify-between xl:ml-40 2xl:ml-90">

        {/* Logo */}
        <div className="flex items-center gap-[2px] mr-44 sm:ml-52 md:ml-68 lg:ml-99">

          {/* Logo image */}
          <img
            src="/EasyReach.png"
            alt="EasyReach"
            className="w-[27px] md:w-[39px] h-[32px] md:h-[42px] lg:h-[72px]  lg:w-[49px] object-contain "
          />

          {/* Logo name */}
          <span className="text-lg font-bold text-[#1F2937] md:text-2xl lg:text-3xl">
            EasyReach
          </span>

        </div>

        {/* Skip */}
           <button
          onClick={goToChat}
          className="flex items-center gap-[3px] text-sm md:text-lg md:-ml-4 font-bold text-[#008000]"
        >
          <span>Skip</span>

          <span className="text-[16px] leading-none">
            ›
          </span>
        </button>

      </div>


      {/* Progress Indicators */}
      <div className="absolute top-19 left-[24px] flex items-center gap-[4px] ">

        <div className="w-[40px] h-[4px] bg-[#008000] rounded-full"></div>

        <div className="w-[20px] h-[4px] bg-[#A1A1A1] rounded-full"></div>

        <div className="w-[20px] h-[4px] bg-[#A1A1A1] rounded-full"></div>

      </div>


      {/* Heading */}
      <h1 className="absolute mt-23 ml-69 font-medium sm:left-[224px] sm:-mt-11 sm:font-medium text-sm md:text-xl md:ml-14 lg:ml-50 lg:text-2xl lg:-mt-4  xl:ml-90 2xl:ml-133 2xl:font-normal 2xl:text-3xl leading-[29px] font-bold text-[#1F2937]">
        Find Services Near You
      </h1>


      {/* Description */}
     <p className="absolute mt-30 font-normal ml-40 text-center sm:ml-19 w-[380px] text-sm sm:text-sm sm:-mt-14 leading-[18px]
     md:ml-40 md:text-base
     font-medium text-[#1F2937] lg:ml-79 lg:text-xl lg:-mt-1 xl:ml-123 2xl:ml-170"> Discover skilled professionals <br className="sm:hidden" /> closest to your location in seconds. </p>


      {/* Main Image */}
      <div className="absolute ml-52 mt-49 sm:left-[164px] w-[280px] md:w-99 lg:w-149 lg:h-149 lg:ml-13 h-[380px] md:h-119 md:left-[180px] xl:ml-54 overflow-hidden rounded-[24px] 2xl:ml-97">

        <img
          src="/Nearby.png"
          alt="Services near you"
          className="w-full md:w-99  lg:w-149  h-full  object-cover"
        />

      </div>


      {/* Next Button */}
          <button
        onClick={goToChat}
        className="absolute top-[754px] ml-52 sm:left-[164px] w-[280px] h-[52px] md:mt-34 md:ml-17 lg:mt-74 lg:ml-52  xl:ml-103 flex items-center  justify-center bg-[#008000] rounded-full 2xl:ml-144"
      >
        <span className="text-sm lg:text-lg leading-[28px] font-semibold text-white">
          Next
        </span>
      </button>



      {/* Bottom Navigation / iPhone Handle */}
      <div className="absolute bottom-0 ml-9 w-full h-[24px] flex items-center justify-center xl:ml-30">

        <div className="w-[108px] h-[4px] bg-[#1D1B20] rounded-[12px]"></div>

      </div>

    </div>
  );
}

export default FrontPage;