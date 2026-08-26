import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Info, ChevronDown } from "lucide-react";

const ResetPassword = () => {
  const navigate = useNavigate();

  return (
   <div className="max-h-screen bg-gray-200 flex justify-center">
  <div className="relative w-full max-w-[428px] h-screen bg-white rounded-[35px] overflow-y-auto overflow-x-hidden font-sans">

        {/* ================= STATUS BAR ================= */}
        <div className="absolute top-0 left-0 w-full h-[62px] flex items-center justify-between px-4 pt-[21px] pb-[19px] z-20">
          
          {/* Time */}
          <div className="flex items-center justify-center w-[121px]">
            <span className="text-[17px] font-semibold leading-[22px] text-black">
              9:41
            </span>
          </div>

          {/* Network / Wifi / Battery */}
          <div className="flex items-center justify-end gap-[7px] w-[121px]">

            {/* Cellular */}
            <div className="flex items-end gap-[2px] h-[13px]">
              <span className="w-[3px] h-[5px] bg-black rounded-sm" />
              <span className="w-[3px] h-[7px] bg-black rounded-sm" />
              <span className="w-[3px] h-[9px] bg-black rounded-sm" />
              <span className="w-[3px] h-[12px] bg-black rounded-sm" />
            </div>

            {/* Wifi */}
            <div className="relative w-[17px] h-[13px]">
              <span className="absolute left-0 top-0 w-[17px] h-[8px] border-t-[2px] border-black rounded-full" />
              <span className="absolute left-[3px] top-[3px] w-[11px] h-[6px] border-t-[2px] border-black rounded-full" />
              <span className="absolute left-[7px] top-[8px] w-[4px] h-[4px] bg-black rounded-full" />
            </div>

            {/* Battery */}
            <div className="relative w-[27px] h-[13px]">
              <div className="absolute left-0 top-0 w-[25px] h-[13px] border border-black/35 rounded-[4px]">
                <div className="absolute left-[2px] top-[2px] w-[21px] h-[9px] bg-black rounded-[2px]" />
              </div>

              <div className="absolute right-0 top-[4px] w-[2px] h-[5px] bg-black/40 rounded-r" />
            </div>
          </div>
        </div>

        {/* ================= HEADER ================= */}
        <div className="absolute left-6 top-[70px] flex items-start gap-6">

          {/* Back Button */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex h-6 w-6 items-center justify-center text-[#1F2937]"
          >
            <ArrowLeft size={24} strokeWidth={2} />
          </button>

          {/* Title */}
          <h1 className="w-[209px] text-[20px] font-bold leading-6 text-[#1F2937]">
            Reset Password
          </h1>
        </div>

        {/* ================= RESET PASSWORD ICON ================= */}
        <div className="absolute left-1/2 top-[183px] -translate-x-1/2 w-[160px] h-[160px]">

          {/* Outer Circle */}
          <div className="absolute inset-0 rounded-full bg-white" />

          {/* Light Green Circle */}
          <div className="absolute inset-[10px] rounded-full bg-[#F0FDF4]" />

          {/* Soft Green Circle */}
          <div className="absolute inset-[30px] rounded-full bg-[#10B981]/20" />

          {/* Main Reset Icon */}
          <div className="absolute left-[50px] top-[60px] w-[60px] h-[70px] bg-[#10B981] rounded-b-[18px] rounded-t-[8px]">

            {/* White Lock/Reset Detail */}
            <div className="absolute left-[18px] top-[13px] w-[24px] h-[24px] rounded-full border-[3px] border-white">
              <div className="absolute left-[7px] top-[5px] w-[6px] h-[10px] bg-white rounded-sm" />
            </div>

            {/* Bottom Highlight */}
            <div className="absolute left-[-5px] bottom-[-1px] w-[30px] h-[12px] border-[3px] border-[#10B981]/30 rounded-full rotate-[-15deg]" />
          </div>

          {/* Decorative Highlights */}
          <div className="absolute left-[45px] top-[35px] w-[30px] h-[13px] rounded-full bg-[#6EE7B7]/50 rotate-[-20deg]" />

          <div className="absolute right-[30px] top-[35px] w-[20px] h-[10px] rounded-full bg-[#6EE7B7]/50 rotate-[-20deg]" />
        </div>

        {/* ================= DESCRIPTION ================= */}
        <div className="absolute top-[362px] left-1/2 -translate-x-1/2 w-[310px] text-center">
          <p className="text-[16px] font-normal leading-6 text-[#6B7280]">
            Enter your email or phone number and we'll send you a verification
            code to reset your password
          </p>
        </div>

        {/* ================= EMAIL / PHONE ================= */}
        <div className="absolute top-[470px] left-1/2 -translate-x-1/2 w-[380px]">

          {/* Label */}
          <label className="block text-[14px] font-bold leading-[17px] text-[#008000]">
            Email or Phone
          </label>

          {/* Input */}
          <div className="relative mt-2 h-[35px] flex items-center">

            {/* Mail Icon */}
            <Mail
              size={20}
              strokeWidth={2}
              className="absolute left-1 top-[7px] text-[#9CA3AF]"
            />

            <input
              type="text"
              placeholder="Enter your email or phone number"
              className="w-full h-[35px] bg-transparent pl-8 pr-2 text-[12px] font-bold text-[#1F2937] placeholder:text-[#9CA3AF] outline-none border-b border-[#9CA3AF]"
            />
          </div>
        </div>

        {/* ================= INFO MESSAGE ================= */}
        <div className="absolute left-6 top-[538px] flex items-center gap-[6px]">

          <Info
            size={12}
            strokeWidth={2.5}
            className="text-[#6B7280]"
          />

          <span className="text-[12px] font-normal leading-[15px] text-[#6B7280]">
            We'll send a 6-digit verification code
          </span>
        </div>

        {/* ================= SEND RESET CODE ================= */}
        <button

        onClick={() => navigate("/entercode")}
          type="button"
          className="absolute left-6 top-[577px] flex h-[52px] w-[380px] items-center justify-center rounded-[99px] border-2 border-[#008000] bg-[#008000] px-[10px] py-3 text-[14px] font-semibold leading-7 text-white transition hover:bg-green-700 active:scale-[0.98]"
        >
          Send Reset Code
        </button>

        {/* ================= TRY ANOTHER WAY ================= */}
        <div className="absolute left-6 top-[689px] w-[380px]">

          {/* Heading */}
          <button
            type="button"
            className="flex w-full items-center justify-between"
          >
            <span className="text-[14px] font-bold italic leading-[17px] text-[#374151]">
              Try another way
            </span>

            <ChevronDown
              size={14}
              className="text-[#9CA3AF]"
            />
          </button>

          {/* Options */}
          <div className="mt-[14px]">

            {/* Security Question */}
            <button
              type="button"
              className="flex h-[29px] w-full items-center px-4 py-[6px] text-left"
            >
              <span className="text-[14px] font-medium leading-[17px] text-[#1F2937]">
                Security question
              </span>
            </button>

            {/* Contact Support */}
            <button
              type="button"
              className="flex h-[29px] w-full items-center px-4 py-[6px] text-left"
            >
              <span className="text-[14px] font-medium leading-[17px] text-[#1F2937]">
                Contact Support
              </span>
            </button>

          </div>

          {/* Divider */}
          <div className="mt-0 h-[1.5px] w-full bg-[#F3F4F6]" />

          {/* Sign In */}
          <div className="-mt- flex items-center gap-[5px]">
            <span className="text-[14px] font-normal leading-[17px] text-[#6B7280]">
              Remember your password?
            </span>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-[14px] font-bold italic leading-[17px] text-[#10B981]"
            >
              Sign in
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ResetPassword;
