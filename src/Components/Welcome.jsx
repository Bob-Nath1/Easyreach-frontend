import React from "react";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="relative w-[428px] h-[926px] mx-auto bg-white rounded-[35px] overflow-hidden">

      {/* =========================
          STATUS BAR
      ========================= */}
      <div className="absolute top-0 left-0 w-full h-[62px] flex items-center justify-between px-4">

        {/* Time */}
        <div className="w-[121px] h-[22px] flex items-center justify-center pt-[2px]">
          <span className="text-[17px] font-semibold text-black text-center">
            9:41
          </span>
        </div>

        {/* Phone status icons */}
        <div className="w-[121px] h-[22px] flex items-center justify-end gap-[7px] pt-[1px]">

          {/* Cellular */}
          <div className="flex items-end gap-[2px] w-[19px] h-[13px]">
            <span className="w-[3px] h-[5px] bg-black rounded-sm"></span>
            <span className="w-[3px] h-[7px] bg-black rounded-sm"></span>
            <span className="w-[3px] h-[9px] bg-black rounded-sm"></span>
            <span className="w-[3px] h-[12px] bg-black rounded-sm"></span>
          </div>

          {/* WiFi */}
          <div className="relative w-[17px] h-[13px]">
            <div className="absolute top-0 left-0 w-[17px] h-[8px] border-t-[3px] border-black rounded-full"></div>
            <div className="absolute top-[4px] left-[4px] w-[9px] h-[5px] border-t-[3px] border-black rounded-full"></div>
            <div className="absolute bottom-0 left-[7px] w-[3px] h-[3px] bg-black rounded-full"></div>
          </div>

          {/* Battery */}
          <div className="relative w-[27px] h-[13px]">
            <div className="absolute left-0 top-[2px] w-[25px] h-[10px] border border-black/40 rounded-[4px]">
              <div className="absolute left-[2px] top-[2px] w-[21px] h-[6px] bg-black rounded-[2px]"></div>
            </div>

            <div className="absolute right-0 top-[5px] w-[2px] h-[4px] bg-black/40 rounded-r"></div>
          </div>

        </div>
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