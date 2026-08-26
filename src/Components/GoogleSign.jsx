import React from "react";
import { ArrowLeft, UserCircle, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function GoogleSign() {
  const navigate = useNavigate();

  return (
    <div className="relative mx-auto h-[926px] w-[428px] overflow-hidden rounded-[35px] bg-white font-[Inter,sans-serif]">

      {/* ================= STATUS BAR ================= */}
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

          {/* Wifi */}
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

      {/* ================= BACK BUTTON ================= */}
      <button
        onClick={() => navigate(-1)}
        className="absolute left-6 top-[70px] z-10 flex h-6 w-6 items-center justify-center"
      >
        <ArrowLeft
          size={24}
          strokeWidth={2}
          className="text-[#1F2937]"
        />
      </button>

      {/* ================= EASYREACH LOGO ================= */}
      <div className="absolute left-1/2 top-[277px] flex -translate-x-1/2 items-center gap-[2px]">

        {/* Logo mark */}
        <div className="relative h-[50px] w-[42px] rotate-[25deg]">
         <img
              src="/EasyReach.png"
              alt="EasyReach"
              className="w-27 h-27 -mt-7 ml-2 object-contain"
            />

        </div>

        {/* EasyReach text */}
        <span className="whitespace-nowrap text-[35px] font-bold leading-[45px] text-[#1F2937]">
          EasyReach
        </span>
      </div>

      {/* ================= GREEN BOTTOM SECTION ================= */}
      <div className="absolute bottom-0 left-0 h-[627px] w-[428px] rounded-t-[45px] bg-gradient-to-br from-[#008000] to-[#00C48C]">

        {/* Welcome Back */}
        <h1 className="absolute left-1/2 top-[120px] -translate-x-1/2 text-[24px] font-bold leading-[29px] text-white">
          Welcome Back
        </h1>

        {/* SIGN IN */}
        <button
          onClick={() => navigate("/signin")}
          className="absolute left-1/2 top-[229px] flex h-[52px] w-[380px] -translate-x-1/2 items-center justify-center rounded-full border-2 border-white px-[10px] py-3 text-[14px] font-semibold leading-7 text-white transition active:scale-[0.98]"
        >
          Sign in
        </button>

        {/* SIGN UP */}
        <button
          onClick={() => navigate("/signup")}
          className="absolute left-1/2 top-[313px] flex h-[52px] w-[380px] -translate-x-1/2 items-center justify-center rounded-full bg-white px-[10px] py-3 text-[14px] font-semibold leading-7 text-[#1F2937] transition active:scale-[0.98]"
        >
          Sign up
        </button>
      </div>

      {/* =====================================================
          GOOGLE SIGN-IN OVERLAY
          ===================================================== */}

      {/* Dark overlay */}
      <div className="absolute inset-0 z-20 bg-[#1F2937]/50" />

      {/* Google account popup */}
      <div className="absolute bottom-[56px] left-1/2 z-30 h-[107px] w-[380px] -translate-x-1/2 bg-white">

        {/* Google header */}
        <div className="absolute left-0 top-[14px] flex w-full flex-col items-center gap-2">

          <div className="flex h-[24px] w-[332px] items-center justify-between">

            {/* Google icon + signing text */}
            <div className="flex items-center gap-2">

              {/* Google G */}
              <div className="relative h-[24px] w-[24px] text-[21px] font-bold">
                <span className="absolute left-0 top-0 text-[#4285F4]">
                  G
                </span>
              </div>

              <span className="text-[14px] font-semibold text-black/50">
                Signing you in
              </span>
            </div>

            {/* Small arrow */}
            <div className="flex h-4 w-4 items-center justify-center">
              <ChevronRight
                size={16}
                strokeWidth={1.5}
                className="text-[#1F2937]"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-[380px] bg-black/10">
            <div className="h-[2px] w-[63px] bg-[#008000]" />
          </div>
        </div>

        {/* Google account */}
        <button
          onClick={() => navigate("/home")}
          className="absolute bottom-0 left-0 flex h-[46px] w-full items-center px-6 transition hover:bg-gray-50 active:bg-gray-100"
        >

          {/* User icon */}
          <UserCircle
            size={24}
            strokeWidth={2}
            className="mr-1 text-[#008000]"
          />

          {/* Account details */}
          <div className="flex flex-col items-start">

            <span className="text-[12px] font-semibold leading-[15px] text-[#444444]">
              Bigflex
            </span>

            <span className="text-[12px] font-normal leading-[15px] text-black/50">
              bigflex02@gmail.com
            </span>

          </div>
        </button>
      </div>

      {/* ================= HOME INDICATOR ================= */}
      <div className="absolute bottom-0 left-1/2 z-40 flex h-6 w-[412px] -translate-x-1/2 items-center justify-center">
        <div className="h-1 w-[108px] rounded-xl bg-[#FFFDFD]" />
      </div>

    </div>
  );
}

export default GoogleSign;