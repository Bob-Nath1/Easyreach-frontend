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

{/* Logo - centered */}
<div className="absolute mt-15 left-1/2 -translate-x-1/2 flex items-center gap-[2px]">

  <img
    src="/EasyReach.png"
    alt="EasyReach"
    className="w-[27px] h-[32px] md:w-[39px] md:h-[42px] lg:w-[49px] lg:h-[72px] object-contain"
  />

  <span className="text-lg font-bold text-[#1F2937] md:text-2xl lg:text-3xl">
    EasyReach
  </span>

</div>

{/* Skip - right */}
<button
  onClick={goToChat}
  className="absolute top-[67px] right-[24px] flex items-center gap-[3px] text-xs sm:text-base md:text-lg font-bold text-[#008000]"
>
  <span>Skip</span>
  <span className="text-[16px] leading-none">
    ›
  </span>
</button>

      {/* Progress Indicators */}
      <div className="absolute top-19 left-[24px] flex items-center gap-[2px] sm:gap-[4px]">

        <div className="w-[20px] sm:w-[40px] h-[2px] sm:h-[4px] bg-[#008000] rounded-full"></div>

        <div className="w-[10px] sm:w-[20px] h-[4px] sm:h-[2px] bg-[#A1A1A1] rounded-full"></div>

        <div className="w-[10px] sm:w-[20px] h-[4px] sm:h-[2px] bg-[#A1A1A1] rounded-full"></div>

      </div>


      {/* Heading */}
      <h1 className="absolute left-1/2
  -translate-x-1/2 mt-23 font-medium text-sm md:text-xl lg:text-2xl md:mt-25 lg:mt-30 2xl:font-normal 2xl:text-3xl leading-[29px] font-bold text-[#1F2937]">
        Find Services Near You
      </h1>


      {/* Description */}
     <p className="absolute left-1/2
  -translate-x-1/2 mt-30 font-normal text-center w-[90%] text-sm leading-[18px] md:text-base md:mt-35 lg:mt-40
     font-medium text-[#1F2937] lg:text-xl"> Discover skilled professionals <br className="sm:hidden" /> closest to your location in seconds. </p>


      {/* Main Image */}
      <div className="absolute left-1/2 -translate-x-1/2 mt-49  w-[280px] md:w-99 lg:w-149 lg:h-149 h-[380px] md:h-119 overflow-hidden rounded-[24px] 2xl:mt-74">

        <img
          src="/Nearby.png"
          alt="Services near you"
          className="block w-full mx-auto md:w-99  lg:w-149  h-auto  object-contain"
        />

      </div>


      {/* Next Button */}
          <button
        onClick={goToChat}
        className="absolute top-[754px] left-1/2 -translate-x-1/2 w-[280px] h-[52px] md:mt-34 lg:mt-74  flex items-center  justify-center bg-[#008000] rounded-full"
      >
        <span className="text-sm lg:text-lg leading-[28px] font-semibold text-white">
          Next
        </span>
      </button>



      {/* Bottom Navigation / iPhone Handle */}
      <div className="absolute left-1/2
    -translate-x-1/2 bottom-0 w-full h-[24px] flex items-center justify-center">

        <div className="w-[108px] h-[4px] bg-[#1D1B20] rounded-[12px]"></div>

      </div>

    </div>
  );
}

export default FrontPage;