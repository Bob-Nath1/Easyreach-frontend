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
    lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px] min-h-screen md:min-h-[926px] mx-auto bg-white rounded-[35px] overflow-hidden">

      {/* Logo - centered */}

 {/* Back Button */}
        <button
          onClick={goToBoarding}
          className="absolute left-[24px] top-0 w-[24px] h-[24px] flex items-center justify-center"
        >
          <span className="text-[28px] leading-none text-[#1F2937] ">
            ‹
          </span>
        </button>

<div className="absolute mt-15 left-1/2 -translate-x-1/2 flex items-center gap-[2px]">

  <img
    src="/EasyReach.png"
    alt="EasyReach"
    className="w-[27px] h-[32px] md:w-[39px] md:h-[42px] lg:w-[49px] lg:h-[62px] object-contain"
  />

  <span className="text-lg font-bold text-[#1F2937] md:text-2xl lg:text-2xl">
    EasyReach
  </span>

</div>

{/* Skip - right */}
<button
  onClick={goToBoard}
  className="absolute top-[67px] right-[24px] flex items-center gap-[3px] text-xs sm:text-base md:text-lg font-bold text-[#008000]"
>
  <span>Skip</span>
  <span className="text-[16px] leading-none">
    ›
  </span>
</button>

      {/* Progress Indicators */}
      <div className="absolute top-19 left-[24px] flex items-center gap-[2px] sm:gap-[4px]">


        <div className="w-[10px] sm:w-[20px] h-[4px] sm:h-[2px] bg-[#A1A1A1] rounded-full"></div>

                <div className="w-[20px] sm:w-[40px] h-[2px] sm:h-[4px] bg-[#008000] rounded-full"></div>

        <div className="w-[10px] sm:w-[20px] h-[4px] sm:h-[2px] bg-[#A1A1A1] rounded-full"></div>

      </div>

      {/* Heading */}
         <h1 className="absolute left-1/2
  -translate-x-1/2 mt-23 font-medium text-sm md:text-xl lg:text-xl md:mt-25 lg:mt-30 2xl:font-normal 2xl:text-3xl leading-[29px] font-bold text-[#1F2937]">
  Connect & Chat Easily
</h1>


      {/* Description */}
      <p className="absolute left-1/2
  -translate-x-1/2 mt-30 font-normal text-center w-[90%] text-sm leading-[18px] md:text-base md:mt-35 lg:mt-38
     font-medium text-[#1F2937] lg:text-lg">
  Message or call verified service providers{" "}
  <br className="sm:hidden" />
  directly within the app.
</p>


      {/* Main Image */}
      <div className="absolute left-1/2 -translate-x-1/2 mt-49  w-[280px] md:w-99 lg:w-149 lg:h-149 h-[380px] md:h-119 overflow-hidden rounded-[24px] 2xl:mt-74">

  <img
    src="/Chat.png"
    alt="Connect and chat"
    className="w-full h-full object-cover"
  />

</div>


      {/* Next Button */}
      <button
        onClick={() => navigate("/boarding")}
        className="absolute top-[624px] left-1/2 -translate-x-1/2 w-[280px] h-[52px] md:mt-14 lg:mt-54  flex items-center  justify-center bg-[#008000] rounded-full"
      >
  <span className="text-sm lg:text-lg leading-[28px] font-semibold text-white">
    Next
  </span>
</button>

    </div>
  );
}

export default Chat;


