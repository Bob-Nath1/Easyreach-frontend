import React, { useState } from "react";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  ChevronDown,
  UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function SignUpPro() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const goToPath = () => {
    navigate("/path");
  };

  const goToOTP = () => {
  navigate("/otp");
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* iPhone-sized container */}
      <div className="relative w-[428px] h-[926px] overflow-hidden rounded-[35px] bg-gradient-to-br from-[#00C48C] to-[#008000]">

        {/* ================= STATUS BAR ================= */}
        <div className="absolute top-0 left-0 w-full h-[62px] px-4 flex items-center justify-between text-white">
          <span className="text-[17px] font-semibold pl-2">
            7:41
          </span>

          <div className="flex items-center gap-2 pr-2">
            {/* Cellular */}
            <div className="flex items-end gap-[2px] h-4">
              <span className="w-[3px] h-[6px] bg-white rounded-sm" />
              <span className="w-[3px] h-[9px] bg-white rounded-sm" />
              <span className="w-[3px] h-[12px] bg-white rounded-sm" />
              <span className="w-[3px] h-[15px] bg-white rounded-sm" />
            </div>

            {/* WiFi */}
            <div className="text-white text-sm">
              ◔
            </div>

            {/* Battery */}
            <div className="relative w-[27px] h-[13px] border border-white/50 rounded-[4px]">
              <div className="absolute left-[2px] top-[2px] h-[7px] w-[20px] bg-white rounded-[2px]" />
              <div className="absolute -right-[3px] top-[4px] w-[2px] h-[5px] bg-white/50 rounded-r" />
            </div>
          </div>
        </div>

        {/* ================= HEADER ================= */}
        <div className="absolute top-[62px] left-0 w-full h-[70px] flex items-center justify-center">
          <button
  type="button"
  onClick={goToPath}
  className="absolute left-6 top-2 text-white"
>
  <ArrowLeft size={24} strokeWidth={2} />
</button>

          <h1 className="text-white text-[18px] font-bold">
            Sign Up
          </h1>
        </div>

        {/* ================= WHITE CONTENT ================= */}
        <div className="absolute left-0 bottom-0 w-full h-[812px] bg-white rounded-t-[45px]">

          {/* Signing up as banner */}
          <div className="absolute top-4 left-6 right-6 h-[59px] bg-[#F0FDF4] border-[1.6px] border-[#059669] rounded-md flex items-center px-[18px]">

            <div className="w-[33px] h-[32px] rounded-lg bg-[#059669] flex items-center justify-center">
              <UserRound size={19} color="white" />
            </div>

            <div className="ml-2">
              <p className="text-[#008000] text-[12px] font-bold leading-[15px]">
                SIGNING UP AS
              </p>

              <p className="text-[#1F2937] text-[14px] font-bold leading-[17px]">
                Service Provider
              </p>
            </div>

            <button
              type="button"
              className="ml-auto text-[#059669] text-[13px] italic font-bold"
            >
              Change
            </button>
          </div>

          {/* ================= FORM ================= */}
          <div className="absolute top-[91px] left-6 right-6 bottom-[20px] overflow-y-auto pr-1 scrollbar-hide">

            <form className="flex flex-col gap-6">

              {/* Full Name */}
              <div>
                <label className="block text-[#008000] text-[14px] font-bold mb-2">
                  Full Name
                </label>

                <div className="relative border-b border-[#9CA3AF] h-[35px]">
                  <User
                    size={20}
                    className="absolute left-1 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                  />

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full h-full pl-8 pr-2 text-[12px] font-bold text-gray-700 placeholder:text-[#9CA3AF] outline-none"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[#008000] text-[14px] font-bold mb-2">
                  Email Address
                </label>

                <div className="relative border-b border-[#9CA3AF] h-[35px]">
                  <Mail
                    size={20}
                    className="absolute left-1 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                  />

                  <input
                    type="email"
                    placeholder="your.email@gmail.com"
                    className="w-full h-full pl-8 pr-2 text-[12px] font-bold text-gray-700 placeholder:text-[#9CA3AF] outline-none"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[#008000] text-[14px] font-bold mb-2">
                  Phone Number
                </label>

                <div className="flex items-center gap-4">

                  {/* Country */}
                  <div className="flex items-center gap-2 w-[60px]">
                    <span className="text-[20px]">🇳🇬</span>

                    <span className="text-[#1F2937] text-[12px] font-bold">
                      +234
                    </span>
                  </div>

                  {/* Number */}
                  <div className="relative flex-1 border-b border-[#9CA3AF] h-[35px]">
                    <Phone
                      size={17}
                      className="absolute left-1 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                    />

                    <input
                      type="tel"
                      placeholder="705 085 2180"
                      className="w-full h-full pl-8 pr-2 text-[12px] font-bold text-gray-700 placeholder:text-[#9CA3AF] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[#008000] text-[14px] font-bold mb-2">
                  Password
                </label>

                <div className="relative border-b border-[#9CA3AF] h-[35px]">

                  <Lock
                    size={18}
                    className="absolute left-1 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full h-full pl-8 pr-10 text-[12px] font-bold text-gray-700 placeholder:text-[#9CA3AF] outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-1 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Password requirements */}
              <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-md p-4 -mt-3">

                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#374151] text-[13px] font-bold">
                    Password must contain
                  </span>

                  <ChevronDown
                    size={16}
                    className="text-[#9CA3AF]"
                  />
                </div>

                <div className="space-y-1">

                  <PasswordRequirement text="At least 8 characters" />

                  <PasswordRequirement text="One uppercase letter" />

                  <PasswordRequirement text="One number" />

                  <PasswordRequirement text="One special character" />

                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-[#008000] text-[14px] font-bold mb-2">
                  Password
                </label>

                <div className="relative border-b border-[#9CA3AF] h-[35px]">

                  <Lock
                    size={18}
                    className="absolute left-1 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                  />

                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full h-full pl-8 pr-10 text-[12px] font-bold text-gray-700 placeholder:text-[#9CA3AF] outline-none"
                  />

                  <Eye
                    size={18}
                    className="absolute right-1 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                  />
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2">

                <button
                  type="button"
                  onClick={() => setAccepted(!accepted)}
                  className={`w-[15px] h-[15px] flex-shrink-0 border border-[#1F2937] flex items-center justify-center ${
                    accepted ? "bg-[#008000]" : "bg-white"
                  }`}
                >
                  {accepted && (
                    <CheckCircle2
                      size={12}
                      className="text-white"
                    />
                  )}
                </button>

                <p className="text-[12px] leading-[15px] text-[#444444] font-medium">
                  I agree to the{" "}
                  <button
                    type="button"
                    className="text-[#008000] font-semibold"
                  >
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    className="text-[#008000] font-semibold"
                  >
                    Privacy Policy
                  </button>
                </p>

              </div>

              {/* Continue */}
             <button
  type="button"
  onClick={goToOTP}
  className="w-full h-[52px] bg-[#008000] hover:bg-[#006b00] transition-colors rounded-full flex items-center justify-center text-white text-[14px] font-semibold"
>
  Continue
</button>

              {/* Sign up with */}
              <div className="pt-2">

                <div className="flex items-center justify-center gap-4">
                  <div className="w-[60px] h-px bg-gray-300" />

                  <span className="text-[#1F2937] text-[14px] font-semibold">
                    Sign up with
                  </span>

                  <div className="w-[60px] h-px bg-gray-300" />
                </div>

                {/* Social icons */}
                <div className="flex justify-center items-center gap-4 mt-6">

                  {/* Facebook */}
                  <button
                    type="button"
                    className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center"
                  >
                    <span className="text-[#1877F2] text-lg font-bold">
                      f
                    </span>
                  </button>

                  {/* Google */}
                  <button
                    type="button"
                    className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center"
                  >
                    <span className="text-[17px] font-bold">
                      <span className="text-[#4285F4]">G</span>
                    </span>
                  </button>

                  {/* Apple */}
                  <button
                    type="button"
                    className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center"
                  >
                    <span className="text-black text-lg">
                      
                    </span>
                  </button>

                </div>
              </div>

              {/* Already have account */}
              <div className="text-right pb-6">

                <p className="text-[12px] text-[#1F2937]">
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="font-semibold text-[#008000]"
                  >
                    Sign in
                  </button>
                </p>

              </div>

            </form>
          </div>

          {/* ================= HOME INDICATOR ================= */}
          <div className="absolute bottom-0 left-0 w-full h-[24px] bg-white flex items-center justify-center">
            <div className="w-[108px] h-[4px] bg-[#1F2937] rounded-full" />
          </div>

        </div>
      </div>
    </div>
  );
}


/* Password requirement component */
function PasswordRequirement({ text }) {
  return (
    <div className="flex items-center gap-2">
      <CheckCircle2
        size={14}
        className="text-[#6B7280]"
      />

      <span className="text-[12px] text-[#6B7280]">
        {text}
      </span>
    </div>
  );
}

export default SignUpPro;