import React from "react";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="relative w-[428px] h-[926px] mx-auto bg-white rounded-[35px] overflow-hidden">

      
      </div>


      {/* =========================
          TOP LOGO
      ========================= */}
      <div
  className="
    absolute
    top-[50%]
    left-[50%]
    -translate-x-1/2
    -translate-y-1/2
    w-[225px]
    h-[63px]
    flex
    items-center
    justify-center
    gap-[2px]
  "
>
  {/* Logo mark */}
  <div className="relative w-[42px] h-[50px] rotate-[25deg]">
    <img
      src="/EasyReach.png"
      alt="EasyReach"
      className="w-[77px] h-[37px] mt-17 ml-42 object-contain"
    />
  </div>

  {/* EasyReach text */}
  <span className="font-bold text-[23px] leading-[45px] text-[#1F2937] whitespace-nowrap">
    Easy<span className="text-[#008000]">each</span>
  </span>
</div>


      {/* =========================
          BACK ARROW
      ========================= */}
      <button
        onClick={() => navigate(-1)}
        className="absolute left-6 top-[70px] w-6 h-6 flex items-center justify-center text-[#1F2937] text-2xl"
      >
        ←
      </button>


      {/* =========================
          GREEN BOTTOM PANEL
      ========================= */}
      <div
        className="absolute left-0 bottom-0 w-[428px] h-[627px]
        bg-gradient-to-br from-[#008000] to-[#00C48C]
        rounded-tl-[45px] rounded-tr-[45px]"
      >

        {/* Welcome Back */}
        <h1 className="absolute top-[120px] left-1/2 -translate-x-1/2 text-white text-[24px] leading-[29px] font-bold whitespace-nowrap">
          Welcome Back
        </h1>


        {/* =========================
            SIGN IN BUTTON
        ========================= */}
        <button
          onClick={() => navigate("/signin")}
          className="absolute top-[229px] left-1/2 -translate-x-1/2
          w-[380px] h-[52px]
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
          className="absolute top-[313px] left-1/2 -translate-x-1/2
          w-[380px] h-[52px]
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

            <span className="w-[82px] text-center text-white font-semibold text-[14px] leading-[21px]">
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
          <div className="flex items-center gap-1 w-[180px] h-[15px]">

            <span className="text-white text-[12px] leading-[15px] font-normal whitespace-nowrap">
              Don’t have an account?
            </span>

            <button
              onClick={() => navigate("/signup")}
              className="text-white text-[12px] leading-[15px] font-semibold"
            >
              Sign up
            </button>

          </div>

        </div>

      </div>


      {/* =========================
          IPHONE HOME INDICATOR
      ========================= */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[412px] h-6 flex items-center justify-center">
        <div className="w-[108px] h-1 bg-[#FFFDFD] rounded-xl"></div>
      </div>

    </div>
  );
}

export default Welcome;