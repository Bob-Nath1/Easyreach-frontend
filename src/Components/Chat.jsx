import React from "react";
import { useNavigate } from "react-router-dom";

function Chat() {
  const navigate = useNavigate();
  const goToBoarding = () => {
    navigate("/frontpage");
  };
  const goToBoard = () => {
    navigate("/boarding");
  };

  return (
    <div className="relative w-full sm:max-w-[640px] 
    md:max-w-[768px]
    lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px] h-[926px]
    
    md:h-[1026px] lg:h-[1226px] mx-auto bg-white rounded-[35px] overflow-hidden">

      {/* Top Navigation */}
      <div className="absolute  top-[62px] left-0 w-full">

        {/* Back Button */}
        <button
          onClick={goToBoarding}
          className="absolute left-[24px] top-0 w-[24px] h-[24px] flex items-center justify-center"
        >
          <span className="text-[28px] leading-none text-[#1F2937] ">
            ‹
          </span>
        </button>

        {/* Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-[2px]">

          <img
            src="/EasyReach.png"
            alt="EasyReach"
            className="w-[27px] h-[32px] md:w-[39px] md:h-[42px] lg:w-[49px] lg:h-[72px] object-contain"
          />


          

           <span className="text-lg font-bold text-[#1F2937] md:text-2xl lg:text-3xl ">
            EasyReach
          </span>

        </div>

        {/* Skip */}
        <button
          onClick={goToBoard}
          className="absolute right-[24px] top-0 flex items-center gap-[3px] text-[14px] font-bold text-[#008000]"
        >
          <span className="text-xs mt-1 md:text-sm lg:text-xl">Skip</span>

          <span className="text-2xl leading-none 2xl:text-4xl">
            ›
          </span>
        </button>

      </div>


      {/* Progress Indicators */}
      {/* Progress Indicators */}
      <div className="absolute top-25 left-[24px] flex items-center gap-[2px] sm:gap-[4px] lg:top-30">

        <div className="w-[20px] sm:w-[40px] h-[2px] sm:h-[4px] bg-[#008000] rounded-full"></div>

        <div className="w-[10px] sm:w-[20px] h-[4px] sm:h-[2px] bg-[#A1A1A1] rounded-full"></div>

        <div className="w-[10px] sm:w-[20px] h-[4px] sm:h-[2px] bg-[#A1A1A1] rounded-full"></div>

      </div>


      {/* Heading */}
      <h1 className="absolute mt-25 left-1/2 -translate-x-1/2 w-full text-center font-medium text-sm md:text-xl lg:text-2xl lg:mt-30 2xl:text-3xl leading-[29px] text-[#1F2937]">
  Connect & Chat Easily
</h1>


      {/* Description */}
      <p className="absolute mt-35 left-1/2 -translate-x-1/2 w-[380px] max-w-[calc(100%-40px)] text-sm text-center sm:text-sm md:text-base leading-[28px] font-medium text-[#1F2937] lg:text-xl lg:mt-40">
  Message or call verified service providers{" "}
  <br className="sm:hidden" />
  directly within the app.
</p>


      {/* Main Image */}
      <div className="absolute mt-49 left-1/2 -translate-x-1/2 w-[280px] md:w-99 lg:w-149 lg:h-149 lg:mt-55 h-[380px] md:h-119 overflow-hidden rounded-[24px]">

  <img
    src="/Chat.png"
    alt="Connect and chat"
    className="w-full h-full object-cover"
  />

</div>


      {/* Next Button */}
      <button
  onClick={() => navigate("/boarding")}
  className="absolute top-[754px] left-1/2 -translate-x-1/2 w-[280px] h-[52px] flex items-center justify-center bg-[#008000] rounded-full lg:mt-55"
>
  <span className="text-sm lg:text-lg leading-[28px] font-semibold text-white">
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


