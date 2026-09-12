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
    <div className="relative mx-auto h-[926px] w-[280px] overflow-hidden rounded-[35px] bg-gradient-to-br from-[#00C48C] via-[#00A878] to-[#008000]">

      {/* ================= STATUS BAR ================= */}
      <div className="absolute left-0 top-0 flex h-[62px] w-full items-center justify-between px-4 pt-[21px] pb-[19px]">

        {/* Status icons */}
        <div className="flex h-[22px] w-[121px] items-center justify-end gap-[7px]">

          {/* Cellular signal */}
          <div className="flex h-[13px] items-end gap-[2px]">

          </div>

          {/* WiFi */}
          <div className="relative h-[13px] w-[18px]">
          </div>

          {/* Battery */}
          <div className="relative h-[13px] w-[27px]">

          </div>
        </div>
      </div>

      {/* ================= SIGNING IN CONTENT ================= */}
      <div className="absolute left-1/2 top-[369px] flex h-[173px] w-[187px] -translate-x-1/2 flex-col items-center gap-[23px]">

        {/* Title + Spinner */}
        <div className="flex h-[128px] w-[187px] flex-col items-center gap-8">

          {/* Title */}
          <h1 className="w-full text-center font-sans text-md font-bold leading-[29px] text-white">
            Signing you in...
          </h1>

          {/* Loading spinner */}
          <div className="relative h-[67px] w-[67px]">

            {/* Outer spinner */}
            <div className="absolute inset-0 animate-spin rounded-full border-[6px] border-white/20 border-t-white" />
          </div>
        </div>

        {/* Please wait */}
        <p className="w-full text-center font-sans text-sm font-semibold leading-[22px] text-white">
          Please wait.
        </p>
      </div>
    </div>
  );
};

export default Signingin;