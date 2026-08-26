import React from "react";
import { ArrowLeft, UserCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Google() {
    const navigate = useNavigate();
  const accounts = [
    {
      name: "Abidoye Israel",
      email: "timilehinabidoye@gmail.com",
    },
    {
      name: "Bigflex",
      email: "bigflex02@gmail.com",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center">
      <div className="relative w-full max-w-[428px] h-[926px] bg-white rounded-[35px] overflow-hidden">
        
        {/* ================= STATUS BAR ================= */}
        <div className="absolute top-0 left-0 w-full h-[62px] flex items-center justify-between px-4">
          <span className="text-[17px] font-semibold text-black">
            9:41
          </span>

          <div className="flex items-center gap-2">
            {/* Cellular */}
            <div className="flex items-end gap-[2px]">
              <span className="w-[3px] h-[5px] bg-black rounded-sm" />
              <span className="w-[3px] h-[7px] bg-black rounded-sm" />
              <span className="w-[3px] h-[9px] bg-black rounded-sm" />
              <span className="w-[3px] h-[11px] bg-black rounded-sm" />
            </div>

            {/* Wifi */}
            <div className="text-black text-sm">◔</div>

            {/* Battery */}
            <div className="relative w-[27px] h-[13px] border border-black/40 rounded-[4px]">
              <div className="absolute left-[2px] top-[2px] bottom-[2px] w-[20px] bg-black rounded-[2px]" />
              <div className="absolute -right-[3px] top-[4px] w-[2px] h-[5px] bg-black/40 rounded-r" />
            </div>
          </div>
        </div>

        {/* ================= EASYREACH LOGO ================= */}
        <div className="absolute top-[112px] left-1/2 -translate-x-1/2 flex items-center gap-1">
            

          <div className="relative w-[42px] h-[50px]">


            <img
              src="/EasyReach.png"
              alt="EasyReach"
              className="w-27 h-27 -mt-7 ml-2 object-contain"
            />
          </div>

          <span className="text-[35px] leading-[45px] font-bold text-gray-800">
            EasyReach
          </span>
        </div>

        {/* ================= GREEN BOTTOM AREA ================= */}
        <div className="absolute bottom-0  left-0 w-full h-[627px] rounded-t-[45px] bg-gradient-to-br from-[#00C48C] to-[#008000]" />

        {/* ================= GOOGLE CARD ================= */}
        <div className="absolute left-[23px] top-119 w-[380px] h-[395px] bg-white rounded-none">
          
          {/* Google Header */}
          <div className="relative h-[49px] border-b border-black/10">
            <div className="absolute left-6 top-[18px] flex items-center gap-3">
              {/* Google G */}
              <div className="text-[22px] font-bold">
                <span className="text-[#4285F4]">
                    <img
              src="/Google.png"
              alt="Google"
              className="w-[27px] h-[32px] object-contain"
            />
                </span>
              </div>

              <span className="text-sm font-semibold text-black/50">
                Sign in with Google
              </span>
            </div>
<img
              src="/Vector.png"
              alt="Close"
              className="w-[12px] h-[32px] object-contain ml-89"
            />
          </div>

          {/* Card Content */}
          <div className="px-6 pt-3">

            <h2 className="text-sm font-semibold text-[#444]">
              Sign in to EasyReach App
            </h2>

            <p className="mt-3 text-sm leading-5 font-medium text-black/50">
              By continuing, Google will share your name, email address,
              and profile picture with EasyReach App. See EasyReach App’s
              Privacy Policy and Terms of Service.
            </p>

            <p className="mt-4 text-sm leading-[17px] font-medium text-black/50">
              You can manage Sign in with Google in your
            </p>

            <p className="mt-2 text-sm font-semibold text-[#008000]">
              Google Account
            </p>

            {/* Accounts */}
            <div className="mt-5 flex flex-col gap-4">
              {accounts.map((account) => (
                <div
                  key={account.email}
                  className="flex items-center gap-1"
                >
                  <UserCircle2
                    size={24}
                    className="text-[#008000] shrink-0"
                    fill="#008000"
                    strokeWidth={1.5}
                  />

                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-[#444]">
                      {account.name}
                    </span>

                    <span className="text-xs text-black/50">
                      {account.email}
                    </span>
                  </div>
                </div>
              ))}

              {/* Continue Button */}
              <button
               onClick={() => navigate("/googlesign")}
              className="w-full h-8 rounded-lg bg-[#008000] flex items-center justify-center gap-1 text-white">

                <span className="text-[10px] font-medium">
                  Continue as
                </span>

                <span className="text-[10px] font-semibold">
                  .....
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* ================= WELCOME BACK ================= */}
        <h1 className="absolute top-[675px] left-1/2 -translate-x-1/2 text-[24px] leading-[29px] font-bold text-white whitespace-nowrap">
          Welcome Back
        </h1>

        {/* ================= BACK BUTTON ================= */}
        <button
         onClick={() => navigate("/welcome")}
        className="absolute top-20 left-6">
          <ArrowLeft size={24} className="text-gray-800" />
        </button>

        {/* ================= BOTTOM HOME INDICATOR ================= */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[108px] h-6 flex items-center justify-center">
          <div className="w-[108px] h-1 rounded-full bg-white" />
        </div>
      </div>
    </div>
  );
}

export default Google;