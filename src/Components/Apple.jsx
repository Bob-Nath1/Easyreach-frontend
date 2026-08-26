import React from "react";
import { ArrowLeft, Apple as AppleIcon, ScanFace } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Apple() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleAppleSignIn = () => {
    // Add your Apple authentication logic here
    console.log("Signing in with Apple");
  };

  return (
    <div className="relative mx-auto h-[926px] w-[428px] overflow-hidden rounded-[35px] bg-white font-[Inter,sans-serif]">

      {/* =====================================================
          STATUS BAR
      ====================================================== */}
      <div className="absolute left-0 top-0 flex h-[62px] w-full items-center justify-between px-4 pt-[21px]">

        {/* Time */}
        <div className="flex h-[22px] items-center pt-[2px]">
          <span className="text-center text-[17px] font-semibold leading-[22px] text-black">
            9:41
          </span>
        </div>

        {/* Status Icons */}
        <div className="flex items-center gap-[7px] pt-[1px]">

          {/* Cellular */}
          <div className="flex h-[13px] w-[19px] items-end gap-[2px]">
            <span className="h-[4px] w-[3px] rounded-sm bg-black" />
            <span className="h-[7px] w-[3px] rounded-sm bg-black" />
            <span className="h-[10px] w-[3px] rounded-sm bg-black" />
            <span className="h-[13px] w-[3px] rounded-sm bg-black" />
          </div>

          {/* WiFi */}
          <div className="relative h-[13px] w-[18px]">
            <div className="absolute left-0 top-0 h-[10px] w-[18px] rounded-t-full border-t-[3px] border-black" />
            <div className="absolute left-[4px] top-[4px] h-[7px] w-[10px] rounded-t-full border-t-[3px] border-black" />
            <div className="absolute bottom-0 left-[7px] h-[3px] w-[3px] rounded-full bg-black" />
          </div>

          {/* Battery */}
          <div className="relative h-[13px] w-[27px]">
            <div className="absolute left-0 top-0 h-[13px] w-[25px] rounded-[4px] border border-black/40 p-[2px]">
              <div className="h-full w-full rounded-[2px] bg-black" />
            </div>

            <div className="absolute right-0 top-[4px] h-[5px] w-[2px] rounded-r-sm bg-black/40" />
          </div>
        </div>
      </div>


      {/* =====================================================
          EASYREACH LOGO
      ====================================================== */}
      <div className="absolute left-1/2 top-[136px] flex -translate-x-1/2 items-center gap-[2px]">

        {/* Logo */}
        <div className="relative h-[50px] w-[42px] rotate-[25deg]">

          
          <img
            src="/EasyReach.png"
            alt="EasyReach"
            className="w-47 h-37 ml-1 -mt-13 object-contain"
          />
        </div>

        {/* EasyReach */}
        <span className="font-['Rajdhani'] text-[35px] font-bold leading-[45px] text-[#1F2937]">
          EasyReach
        </span>
      </div>


      {/* =====================================================
          GREEN BACKGROUND SECTION
      ====================================================== */}
      <div className="absolute bottom-0 left-0 h-[627px] w-full rounded-t-[45px] bg-[linear-gradient(329.4deg,#00C48C_19.75%,#008000_79.61%)]">

        {/* Welcome Back */}
        <h1 className="absolute left-1/2 top-[120px] -translate-x-1/2 text-[24px] font-bold leading-[29px] text-white">
          Welcome Back
        </h1>

          <button
                 onClick={() => navigate("/welcome")}
                className="absolute -top-49 left-6 z-20">
                  <ArrowLeft size={24} className="text-gray-800" />
                </button>


        {/* Sign In */}
        <button
          onClick={() => navigate("/signin")}
          className="absolute left-1/2 top-[229px] flex h-[52px] w-[380px] -translate-x-1/2 items-center justify-center rounded-[99px] border-2 border-white px-[10px] py-3 text-[14px] font-semibold leading-7 text-white transition active:scale-[0.98]"
        >
          Sign in
        </button>


        {/* Sign Up */}
        <button
          onClick={() => navigate("/signup")}
          className="absolute left-1/2 top-[313px] flex h-[52px] w-[380px] -translate-x-1/2 items-center justify-center rounded-[99px] bg-white px-[10px] py-3 text-[14px] font-semibold leading-7 text-[#1F2937] transition active:scale-[0.98]"
        >
          Sign up
        </button>
      </div>


      {/* =====================================================
          DARK OVERLAY
      ====================================================== */}
      <div className="absolute inset-0 bg-[#1F2937]/50" />


      {/* =====================================================
          APPLE ID POPUP
      ====================================================== */}
      <div className="absolute bottom-0 left-0 h-[367px] w-full bg-white">

        {/* Top Line */}
        <div className="absolute left-6 top-[60px] h-px w-[380px] bg-[#1F2937]/50" />


        {/* Apple ID */}
        <div className="absolute left-6 top-[22px] flex items-center gap-2">


          <span className="text-[18px] font-bold leading-[22px] text-[#1F2937]">
            Apple ID
          </span>
        </div>


        {/* Cancel */}
        <button
          onClick={handleCancel}
          className="absolute right-6 top-[24px] text-[16px] font-bold leading-[19px] text-[#1F2937]"
        >
          Cancel
        </button>


        {/* EasyReach Logo */}
        <div className="absolute left-1/2 top-[87px] -translate-x-1/2">

          <div className="relative h-[41px] w-[35px] rotate-[25deg]">

          <img
            src="/EasyReach.png"
            alt="EasyReach"
            className="w-47 h-47 ml-9 -mt-19 object-contain"
          />
            
          </div>
        </div>


        {/* Confirmation Text */}
        <p className="absolute left-1/2 top-[153px] w-[316px] -translate-x-1/2 text-center text-[16px] font-semibold leading-[19px] text-[#1F2937]">
          Do you want to sign in to EasyReach App with your Apple ID
        </p>


        {/* Face ID */}
        <button
          onClick={handleAppleSignIn}
          className="absolute left-1/2 top-[270px] flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <div className="flex h-[70px] w-[70px] items-center justify-center">
            <ScanFace
              size={70}
              strokeWidth={1.8}
              className="text-[#1F2937]"
            />
          </div>

          <span className="text-[14px] font-semibold leading-[17px] text-[#1F2937]">
            Face ID
          </span>
        </button>
      </div>


      {/* =====================================================
          IPHONE HOME INDICATOR
      ====================================================== */}
      <div className="absolute bottom-0 left-1/2 flex h-6 w-[412px] -translate-x-1/2 items-center justify-center">
        <div className="h-1 w-[108px] rounded-xl bg-[#1F2937]" />
      </div>

    </div>
  );
}

export default Apple;