import React from "react";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full sm:w-[640px] md:w-[768px] lg:w-[1024px] lg:h-[1200px] xl:w-[1280px] xl:h-[1200px] 2xl:w-[1536px] 2xl:h-[1200px] 2xl:mt-84 h-[926px] mx-auto bg-white rounded-[35px] overflow-hidden">

      {/* =========================
          STATUS BAR
      ========================= */}
      <div className="absolute top-0 left-0 w-full md:w-[768px] h-[62px] flex items-center justify-between px-4">

       

        {/* Phone status icons */}
        <div className="w-[121px] h-[22px] flex items-center justify-end gap-[7px] pt-[1px]">
         

        </div>
      </div>


      {/* =========================
          TOP LOGO
      ========================= */}
      <div
  className="
    absolute
    top-1/2
    left-1/2
    -translate-x-1/2
    -translate-y-1/2
    w-[225px]
    h-[63px]
    flex
    items-center
    justify-center
    gap-[2px]
    -mt-78 
    -ml-1 sm:ml-4  
    2xl:-mt-118 2xl:gap-2
  "
>
  {/* Logo mark */}
  <div className="ml-17 relative w-[42px] h-[50px] 2xl:mt-3">
    <img
      src="/EasyReach.png"
      alt="EasyReach"
      className="w-[40px] h-[37px] xl:w-[53px] xl:w-[53px] 2xl:w-[53px] 2xl:h-[55px] mt-2 2xl:-mt-1 ml-2 object-contain"
    />
  </div>

  {/* EasyReach text */}
  <span className="font-bold text-[23px] leading-[45px] text-[#1F2937] whitespace-nowrap lg:text-3xl xl:text-4xl 2xl:text-4xl">
    Easy<span className="text-[#008000]">Reach</span>
  </span>
</div>


      {/* =========================
          BACK ARROW
      ========================= */}
      <button
        onClick={() => navigate(-1)}
        className=" absolute left-6 top-[70px] w-6 h-6 flex items-center justify-center text-[#1F2937] text-2xl"
      >
        ←
      </button>


      {/* =========================
          GREEN BOTTOM PANEL
      ========================= */}
      <div
        className="absolute left-0 bottom-0  w-full sm:w-[640px] md:w-[768px] h-[627px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1536px] 2xl:-[1536px]
        bg-gradient-to-br from-[#008000] to-[#00C48C]
        rounded-tl-[45px] rounded-tr-[45px] ml-6"
      >

        {/* Welcome Back */}
        <h1 className="absolute top-[120px] left-1/2 -translate-x-1/2 text-white text-md leading-[29px] font-bold whitespace-nowrap lg:text-2xl  xl:text-3xl 2xl:text-3xl">
          Welcome Back
        </h1>


        {/* =========================
            SIGN IN BUTTON
        ========================= */}
        <button
          onClick={() => navigate("/signin")}
          className="absolute top-[229px] left-1/2 -translate-x-1/2
          w-[180px] h-[32px] md:w-[700px] md:h-[37px] lg:w-[900px] lg:h-[40px]  lg:text-2xl xl:w-[1000px] xl:h-[44px] xl:text-2xl 2xl:w-[1000px] 2xl:h-[44px] 2xl:text-2xl
          flex items-center justify-center
          border-2 border-white
          rounded-full
          text-white text-[14px] leading-7 font-semibold"
        >
          Sign in
        </button>


        {/* =========================
            SIGN UP BUTTON
        ========================= */}
        <button
          onClick={() => navigate("/path")}
          className="absolute top-[280px] left-1/2 -translate-x-1/2
          w-[180px] h-[32px] md:w-[700px] md:h-[37px] lg:w-[900px] lg:h-[40px] lg:text-2xl xl:w-[1000px] xl:h-[44px] xl:text-2xl 2xl:w-[1000px] 2xl:h-[44px] 2xl:text-2xl
          flex items-center justify-center
          bg-white
          rounded-full
          text-[#1F2937] text-[14px] leading-7 font-semibold"
        >
          Sign up
        </button>


        {/* =========================
            SOCIAL LOGIN
        ========================= */}
        <div className="absolute top-[441px] left-1/2 -translate-x-1/2 w-[210px] flex flex-col items-center gap-6">

          {/* Sign in with */}
          <div className="w-[210px] h-[21px] flex items-center gap-1">

            <div className="w-[60px] h-px bg-white"></div>

            <span className="w-[82px] text-center text-white font-semibold text-[14px] leading-[21px] lg:text-lg lg:w-[120px] xl:text-lg xl:w-[120px] 2xl:text-lg 2xl:w-[120px]">
              Sign in with
            </span>

            <div className="w-[60px] h-px bg-white"></div>

          </div>


          {/* Social icons */}
          <div className="flex items-center gap-4">

            {/* Facebook */}
            <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <img
            src="/Facebook.png"
            alt="EasyReach"
            className="w-[27px] h-[32px] object-contain"
          />

            </button>


            {/* Google */}
            <button
            onClick={() => navigate("/google")} className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
 <img
            src="/Google.png"
            alt="EasyReach"
            className="w-[27px] h-[32px] object-contain"
          />

            </button>


            {/* Apple */}
            <button
          onClick={() => navigate("/apple")}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <img
            src="/Apple.png"
            alt="Apple"
            className="w-[27px] h-[32px] object-contain"
          />

            </button>

          </div>


          {/* Don't have an account */}
          <div className="flex items-center gap-1 w-[180px] h-[15px] lg:mr-18 2xl:w-[280px] ">

            <span className="text-white text-[12px] leading-[15px] font-normal whitespace-nowrap lg:text-xl xl:text-xl 2xl:text-xl">
              Don’t have an account?
            </span>

            <button
              onClick={() => navigate("/signup")}
              className="text-white text-[12px] leading-[15px] font-semibold lg:text-xl  xl:text-lg 2xl:text-xl"
            >
              Sign up
            </button>

          </div>

        </div>

      </div>


      {/* =========================
          IPHONE HOME INDICATOR
      ========================= */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[412px] h-6 flex items-center ml-7 sm:ml-7  xl:ml-4 justify-center">
        <div className="w-[108px] h-1 bg-[#FFFDFD] rounded-xl"></div>
      </div>

    </div>
  );
}

export default Welcome;