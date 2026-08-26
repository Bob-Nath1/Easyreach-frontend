import React, { useState } from "react";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Check,
  ChevronDown,
  UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!agreeTerms) {
      alert("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    console.log("Sign Up Data:", formData);

    // Connect your registration API here later

    
  };

  const goToOTP = () => {
  navigate("/otp");
};

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div
        className="
          relative
          w-[428px]
          min-h-[926px]
          overflow-hidden
          rounded-[35px]
          bg-gradient-to-br
          from-[#008000]
          to-[#00C48C]
        "
      >
        {/* =========================
            TOP STATUS BAR
        ========================== */}
        <div className="absolute top-0 left-0 w-full h-[62px] px-4 flex items-center justify-between text-white">
          {/* Time */}
          <div className="text-[17px] font-semibold">
            9:41
          </div>

          {/* Network indicators */}
          <div className="flex items-center gap-2">
            {/* Cellular */}
            <div className="flex items-end gap-[2px]">
              <span className="w-[3px] h-[5px] bg-white rounded-sm" />
              <span className="w-[3px] h-[8px] bg-white rounded-sm" />
              <span className="w-[3px] h-[11px] bg-white rounded-sm" />
              <span className="w-[3px] h-[13px] bg-white rounded-sm" />
            </div>

            {/* WiFi */}
            <span className="text-[15px]">◉</span>

            {/* Battery */}
            <div className="relative w-[27px] h-[13px] border border-white/40 rounded-[4px]">
              <div className="absolute left-[3px] top-[3px] bottom-[3px] right-[4px] bg-white rounded-[2px]" />
              <div className="absolute -right-[3px] top-[4px] w-[2px] h-[5px] bg-white/50 rounded-r" />
            </div>
          </div>
        </div>

        {/* =========================
            HEADER
        ========================== */}
        <div className="absolute top-[62px] left-0 w-full px-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-white hover:opacity-80 transition"
          >
            <ArrowLeft size={24} />
          </button>

          <h1 className="absolute left-1/2 -translate-x-1/2 text-white text-[18px] font-bold">
            Sign Up
          </h1>

          <div className="w-6" />
        </div>

        {/* =========================
            WHITE FORM CONTAINER
        ========================== */}
        <div
          className="
            absolute
            left-0
            bottom-0
            w-full
            h-[812px]
            bg-white
            rounded-t-[45px]
            overflow-y-auto
          "
        >
          <form
            onSubmit={handleSubmit}
            className="px-6 pt-[75px] pb-10"
          >
            {/* =========================
                SIGNING UP AS
            ========================== */}
            <div className="relative mb-6">
              <div
                className="
                  w-full
                  h-[59px]
                  rounded-md
                  bg-[#F0FDF4]
                  border-[1.6px]
                  border-[#059669]
                  flex
                  items-center
                  px-[18px]
                  justify-between
                "
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#059669] flex items-center justify-center">
                    <UserRound
                      size={18}
                      className="text-white"
                    />
                  </div>

                  <div>
                    <p className="text-[#008000] text-[12px] font-bold">
                      SIGNING UP AS
                    </p>

                    <p className="text-[#1F2937] text-[14px] font-bold">
                      Service Seeker
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="text-[#059669] italic text-[13px] font-bold"
                >
                  Change
                </button>
              </div>
            </div>

            {/* =========================
                FORM FIELDS
            ========================== */}
            <div className="space-y-[18px]">

              {/* FULL NAME */}
              <div>
                <label className="block text-[#008000] text-[14px] font-bold mb-2">
                  Full Name
                </label>

                <div className="relative border-b border-[#9CA3AF] h-[35px] flex items-center">
                  <User
                    size={20}
                    className="absolute left-1 text-[#9CA3AF]"
                  />

                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="
                      w-full
                      pl-8
                      pr-2
                      outline-none
                      bg-transparent
                      text-[12px]
                      font-bold
                      text-gray-700
                      placeholder:text-[#9CA3AF]
                    "
                    required
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-[#008000] text-[14px] font-bold mb-2">
                  Email Address
                </label>

                <div className="relative border-b border-[#9CA3AF] h-[35px] flex items-center">
                  <Mail
                    size={20}
                    className="absolute left-1 text-[#9CA3AF]"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@gmail.com"
                    className="
                      w-full
                      pl-8
                      pr-2
                      outline-none
                      bg-transparent
                      text-[12px]
                      font-bold
                      text-gray-700
                      placeholder:text-[#9CA3AF]
                    "
                    required
                  />
                </div>
              </div>

              {/* PHONE NUMBER */}
              <div>
                <label className="block text-[#008000] text-[14px] font-bold mb-2">
                  Phone Number
                </label>

                <div className="flex items-center gap-4">
                  {/* Country */}
                  <div className="flex items-center gap-2 w-[60px]">
                    <span className="text-[20px]">🇳🇬</span>

                    <span className="text-[12px] font-bold text-[#1F2937]">
                      +234
                    </span>
                  </div>

                  {/* Phone input */}
                  <div className="relative border-b border-[#9CA3AF] h-[35px] flex items-center flex-1">
                    <Phone
                      size={17}
                      className="absolute left-1 text-[#9CA3AF]"
                    />

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="705 085 2180"
                      className="
                        w-full
                        pl-8
                        outline-none
                        bg-transparent
                        text-[12px]
                        font-bold
                        text-gray-700
                        placeholder:text-[#9CA3AF]
                      "
                      required
                    />
                  </div>
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-[#008000] text-[14px] font-bold mb-2">
                  Password
                </label>

                <div className="relative border-b border-[#9CA3AF] h-[35px] flex items-center">
                  <Lock
                    size={18}
                    className="absolute left-1 text-[#9CA3AF]"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="
                      w-full
                      pl-8
                      pr-9
                      outline-none
                      bg-transparent
                      text-[12px]
                      font-bold
                      text-gray-700
                      placeholder:text-[#9CA3AF]
                    "
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-1 text-[#9CA3AF]"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* PASSWORD REQUIREMENTS */}
              <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-md p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[13px] font-bold text-[#374151]">
                    Password must contain
                  </p>

                  <ChevronDown
                    size={16}
                    className="text-[#9CA3AF]"
                  />
                </div>

                <div className="space-y-1">
                  <PasswordRequirement
                    text="At least 8 characters"
                  />

                  <PasswordRequirement
                    text="One uppercase letter"
                  />

                  <PasswordRequirement
                    text="One number"
                  />

                  <PasswordRequirement
                    text="One special character"
                  />
                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label className="block text-[#008000] text-[14px] font-bold mb-2">
                  Password
                </label>

                <div className="relative border-b border-[#9CA3AF] h-[35px] flex items-center">
                  <Lock
                    size={18}
                    className="absolute left-1 text-[#9CA3AF]"
                  />

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="
                      w-full
                      pl-8
                      pr-9
                      outline-none
                      bg-transparent
                      text-[12px]
                      font-bold
                      text-gray-700
                      placeholder:text-[#9CA3AF]
                    "
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    
                    className="absolute right-1 text-[#9CA3AF]"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* =========================
                TERMS
            ========================== */}
            <div className="flex items-start gap-2 mt-5">
              <button
                type="button"
                onClick={() =>
                  setAgreeTerms(!agreeTerms)
                }
                className={`
                  w-[15px]
                  h-[15px]
                  min-w-[15px]
                  border
                  border-[#1F2937]
                  flex
                  items-center
                  justify-center
                  mt-[1px]
                  ${agreeTerms ? "bg-[#008000]" : "bg-white"}
                `}
              >
                {agreeTerms && (
                  <Check
                    size={11}
                    className="text-white"
                  />
                )}
              </button>

              <p className="text-[12px] font-medium text-[#444444] leading-[15px]">
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

            {/* =========================
                CONTINUE BUTTON
            ========================== */}
            <button
            
  type="button"
  onClick={goToOTP}
  className="w-full h-[52px] bg-[#008000] hover:bg-[#006b00] transition-colors rounded-full flex items-center justify-center text-white text-[14px] font-semibold"
>
  Continue
</button>
            {/* =========================
                SIGN UP WITH
            ========================== */}
            <div className="mt-6">
              <div className="flex items-center justify-center gap-2">
                <div className="w-[60px] h-px bg-gray-300" />

                <span className="text-[14px] font-semibold text-[#1F2937]">
                  Sign up with
                </span>

                <div className="w-[60px] h-px bg-gray-300" />
              </div>

              {/* SOCIAL BUTTONS */}
              <div className="flex justify-center gap-4 mt-6">

                {/* Apple */}
                <button
                  type="button"
                  className="
                    w-8
                    h-8
                    rounded-full
                    bg-white
                    shadow-[0_-1px_1px_rgba(0,0,0,0.25),0_1px_1px_rgba(0,0,0,0.25)]
                    flex
                    items-center
                    justify-center
                  "
                >
                  <img
            src="/Apple.png"
            alt="EasyReach"
            className="w-[27px] h-[32px] object-contain"
          />
                </button>

                {/* Google */}
                <button
                  type="button"
                  className="
                    w-8
                    h-8
                    rounded-full
                    bg-white
                    shadow-[0_-1px_1px_rgba(0,0,0,0.25),0_1px_1px_rgba(0,0,0,0.25)]
                    flex
                    items-center
                    justify-center
                    font-bold
                  "
                >
                  <img
            src="/Google.png"
            alt="EasyReach"
            className="w-[27px] h-[32px] object-contain"
          />
                </button>

                {/* Facebook */}
                <button
                  type="button"
                  className="
                    w-8
                    h-8
                    rounded-full
                    bg-white
                    shadow-[0_-1px_1px_rgba(0,0,0,0.25),0_1px_1px_rgba(0,0,0,0.25)]
                    flex
                    items-center
                    justify-center
                  "
                >
                  <img
            src="/Facebook.png"
            alt="EasyReach"
            className="w-[27px] h-[32px] object-contain"
          />
                </button>
              </div>
            </div>

            {/* =========================
                LOGIN LINK
            ========================== */}
            <div className="mt-6 text-right">
              <p className="text-[12px] text-[#1F2937]">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/signin")}
                  className="font-semibold hover:text-[#008000]"
                >
                  Sign in
                </button>
              </p>
            </div>
          </form>
        </div>

        {/* =========================
            BOTTOM IPHONE HANDLE
        ========================== */}
        <div className="absolute bottom-0 left-0 w-full h-[24px] bg-white flex items-center justify-center">
          <div className="w-[108px] h-[4px] bg-[#1F2937] rounded-full" />
        </div>
      </div>
    </div>
  );
}

/* =========================
   PASSWORD REQUIREMENT
========================= */

function PasswordRequirement({ text }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-[14px] h-[14px] rounded-full border border-[#6B7280] flex items-center justify-center">
        <Check
          size={9}
          className="text-[#6B7280]"
        />
      </div>

      <span className="text-[12px] text-[#6B7280]">
        {text}
      </span>
    </div>
  );
}

export default SignUp;