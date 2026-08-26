import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signingin = () => {
  const navigate = useNavigate();

  // Optional: automatically continue after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      // Change this to wherever you want after signing in
      navigate("/dashboard");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative mx-auto h-[926px] w-[428px] overflow-hidden rounded-[35px] bg-gradient-to-br from-[#00C48C] via-[#00A878] to-[#008000]">

      {/* ================= STATUS BAR ================= */}
      <div className="absolute left-0 top-0 flex h-[62px] w-full items-center justify-between px-4 pt-[21px] pb-[19px]">

        {/* Time */}
        <div className="flex h-[22px] w-[121px] items-center">
          <span className="w-[37px] text-center font-sans text-[17px] font-semibold leading-[22px] text-white">
            9:41
          </span>
        </div>

        {/* Status icons */}
        <div className="flex h-[22px] w-[121px] items-center justify-end gap-[7px]">

          {/* Cellular signal */}
          <div className="flex h-[13px] items-end gap-[2px]">
            <span className="h-[5px] w-[3px] rounded-sm bg-white" />
            <span className="h-[8px] w-[3px] rounded-sm bg-white" />
            <span className="h-[10px] w-[3px] rounded-sm bg-white" />
            <span className="h-[12px] w-[3px] rounded-sm bg-white" />
          </div>

          {/* WiFi */}
          <div className="relative h-[13px] w-[18px]">
            <div className="absolute left-1/2 top-[1px] h-[11px] w-[16px] -translate-x-1/2 rounded-t-full border-[2px] border-white border-b-0" />

            <div className="absolute bottom-0 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-white" />
          </div>

          {/* Battery */}
          <div className="relative h-[13px] w-[27px]">

            {/* Battery border */}
            <div className="absolute left-0 top-0 h-[13px] w-[25px] rounded-[4.3px] border border-white opacity-35" />

            {/* Battery cap */}
            <div className="absolute right-0 top-[4px] h-[5px] w-[2px] rounded-r bg-white opacity-40" />

            {/* Battery capacity */}
            <div className="absolute left-[2px] top-[3px] h-[7px] w-[21px] rounded-[2.5px] bg-white" />
          </div>
        </div>
      </div>

      {/* ================= SIGNING IN CONTENT ================= */}
      <div className="absolute left-1/2 top-[369px] flex h-[173px] w-[187px] -translate-x-1/2 flex-col items-center gap-[23px]">

        {/* Title + Spinner */}
        <div className="flex h-[128px] w-[187px] flex-col items-center gap-8">

          {/* Title */}
          <h1 className="w-full text-center font-sans text-[24px] font-bold leading-[29px] text-white">
            Signing you in...
          </h1>

          {/* Loading spinner */}
          <div className="relative h-[67px] w-[67px]">

            {/* Outer spinner */}
            <div className="absolute inset-0 animate-spin rounded-full border-[6px] border-white/20 border-t-white" />
          </div>
        </div>

        {/* Please wait */}
        <p className="w-full text-center font-sans text-[17px] font-semibold leading-[22px] text-white">
          Please wait.
        </p>
      </div>
    </div>
  );
};

export default Signingin;