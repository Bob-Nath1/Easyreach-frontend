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
      <div className="absolute top-[62px] left-[24px] right-[24px] flex items-center justify-between  2xl:ml-90">

        {/* Back Button */}
        <button
          onClick={goToBoarding}
          className="w-[24px] h-[24px] flex items-center justify-center -ml-13"
        >
          <span className="text-[28px] xl:-mt-3 xl:text-7xl lg:text-5xl 2xl:text-7xl 2xl:-ml-174 leading-none text-[#1F2937] ">
            ‹
          </span>
        </button>

        {/* Logo */}
        <div className="flex ml-50 items-center gap-[2px] mr-44 sm:ml-10 md:ml-15 lg:ml-30 xl:ml-29 2xl:-ml-69">

          <img
            src="/EasyReach.png"
            alt="EasyReach"
            className="w-[27px] md:w-[39px] h-[32px] md:h-[42px] lg:h-[72px]  lg:w-[49px] object-contain "
          />


          

           <span className="text-lg font-bold text-[#1F2937] md:text-2xl lg:text-3xl ">
            EasyReach
          </span>

        </div>

        {/* Skip */}
        <button
          onClick={goToBoard}
          className="flex items-center gap-[3px] text-[14px] font-bold text-[#008000]"
        >
          <span className="-ml-9 -mt-1 text-xs md:text-sm 2xl:text-xl">Skip</span>

          <span className="-mt-2  text-2xl leading-none xl:-mt-44 2xl:text-4xl">
            ›
          </span>
        </button>

      </div>


      {/* Progress Indicators */}
      <div className="absolute mt-20 ml-7 w-[633px] flex items-center gap-[4px] lg:mt-4 xl:mt-7 2xl:mt-11">

        <div className="w-[40px] h-[4px] bg-[#008000] rounded-full"></div>

        <div className="w-[20px] h-[4px] bg-[#008000] rounded-full"></div>

        <div className="w-[20px] h-[4px] bg-[#A1A1A1] rounded-full"></div>

      </div>


      {/* Heading */}
      <h1 className="absolute mt-22 ml-64 font-medium sm:ml-60 sm:text-sm sm:-mt-11 text-sm md:text-xl md:ml-14 lg:ml-114 lg:-mt-4 md:ml-70 xl:ml-144 2xl:ml-163 2xl:font-normal 2xl:text-3xl leading-[29px] font-bold text-[#1F2937]">
        Connect & Chat Easily
      </h1>


      {/* Description */}
      <p className="absolute mt-30 ml-33 sm:left-[124px] w-[380px] text-sm text-center sm:text-sm sm:-mt-14 sm:ml-4 md:ml-24 md:text-base leading-[18px] font-medium text-[#1F2937] lg:ml-63 lg:text-xl lg:-mt-1 xl:ml-93 2xl:ml-124">
        Message or call verified service providers <br className="sm:hidden" /> directly
        within the app.
      </p>


      {/* Main Image */}
      <div className="absolute mt-49 ml-45 sm:ml-40 w-[280px] md:w-99 lg:w-149 lg:h-149 lg:ml-57 h-[380px] md:h-119 md:ml-47 xl:ml-88 overflow-hidden rounded-[24px] 2xl:ml-118">

        <img
          src="/Chat.png"
          alt="Connect and chat"
          className="w-full md:w-99  lg:w-149  h-full  object-cover"
        />

      </div>


      {/* Next Button */}
      <button
        onClick={() => navigate("/boarding")}
        className="absolute top-[754px] ml-44 sm:left-[164px] w-[280px] h-[52px] sm:ml-5 md:mt-34 md:ml-24 lg:mt-74 lg:ml-62  xl:ml-93 flex items-center  justify-center bg-[#008000] rounded-full 2xl:ml-119"
      >
        <span className="text-sm  lg:text-lg  leading-[28px] font-semibold text-white">
          Next
        </span>
      </button>


      {/* Bottom iPhone Handle */}
      <div className="absolute bottom-0 left-0 w-full h-[24px] flex items-center justify-center md:ml-4 lg:ml-9 xl:ml-7">

        <div className="w-[108px] h-[4px] bg-[#1D1B20] rounded-[12px]"></div>

      </div>

    </div>
  );
}

export default Chat;


