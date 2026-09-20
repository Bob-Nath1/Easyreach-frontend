
import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function OTP() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(45);

  const inputRefs = useRef([]);

  // =========================
  // BACK TO SIGN UP
  // =========================
  const goBack = () => {
    navigate(-1);
  };

  // =========================
  // OTP INPUT
  // =========================
  const handleChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);

    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // =========================
  // BACKSPACE
  // =========================
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // =========================
  // RESEND TIMER
  // =========================
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // =========================
  // RESEND OTP
  // =========================
  const handleResend = () => {
    if (timeLeft > 0) return;

    setOtp(["", "", "", "", "", ""]);
    setTimeLeft(45);

    inputRefs.current[0]?.focus();

    console.log("OTP resent");
  };

// =========================
// VERIFY OTP
// =========================
const handleVerify = (e) => {
  e.preventDefault();

  const code = otp.join("");

  if (code.length !== 6) {
    alert("Please enter the 6-digit verification code.");
    return;
  }

  console.log("OTP:", code);

  // OTP is valid, go to Location page
  navigate("/location");
};


  return (
    <div
  className="
    relative
    w-full
    sm:w-[640px]
    md:w-[768px]
    lg:w-[1024px]
    xl:w-[1280px]
    2xl:w-[1536px]
    h-[926px]
    md:h-[1026px]
    lg:h-[1200px]
    xl:h-[1200px]
    2xl:h-[1200px]
    bg-white
    rounded-[35px]
    overflow-hidden
    mx-auto
  "
>


      {/* =========================
          HEADER
      ========================== */}
      <div className="absolute top-[70px] left-0 w-full h-[30px]">

        <button
          type="button"
          onClick={goBack}
          className="absolute left-6 top-0 w-6 h-6 flex items-center justify-center text-[#1F2937]"
          aria-label="Go back"
        >
          <ArrowLeft size={24} strokeWidth={2} />
        </button>

<h1 className="absolute left-1/2 -translate-x-1/2 text-[20px] leading-[24px] font-bold text-[#1F2937]">
  Verify Phone
</h1>      
</div>

      {/* =========================
          OTP CONTENT
      ========================== */}

      {/* Icon */}
      <div className="absolute top-[180px] left-1/2 -translate-x-1/2 w-[90px] h-[90px] rounded-full bg-gradient-to-br from-[#00C48C] to-[#008000] flex items-center justify-center">

        <div className="w-[48px] h-[48px] rounded-[12px] border-[3px] border-white flex items-center justify-center">

          <div className="w-[8px] h-[8px] bg-white rounded-full" />

        </div>

      </div>

      {/* Title */}
      <h2 className="absolute top-[337px] left-1/2 -translate-x-1/2 w-full text-center text-[24px] leading-[29px] font-bold text-[#1F2937]">
        Enter Verification Code
      </h2>

      {/* Description */}
      <p className="absolute top-[379px] left-1/2 -translate-x-1/2 text-[16px] leading-[19px] text-[#6B7280]">
        We sent a 6-digit code to
      </p>

      {/* Phone */}
      <p className="absolute top-[410px] left-1/2 -translate-x-1/2 text-[18px] leading-[22px] font-bold text-[#10B981]">
        +234 803 456 7890
      </p>

      {/* Edit number */}
      <button
        type="button"
        onClick={goBack}
        className="absolute top-[453px] left-1/2 -translate-x-1/2 text-[14px] leading-[17px] font-bold text-[#10B981]"
      >
        Edit number
      </button>

      {/* =========================
          OTP INPUTS
      ========================== */}
      <div className="absolute top-[488px] left-6 right-6 flex items-center gap-2">

        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="
  flex-1
  min-w-0
  h-[64px]
  border-[1.6px]
  border-[#E5E7EB]
  rounded-none
  bg-white
  text-center
  text-[24px]
  font-bold
  text-[#1F2937]
  outline-none
  focus:border-[#10B981]
  focus:ring-1
  focus:ring-[#10B981]
"
            aria-label={`OTP digit ${index + 1}`}
          />
        ))}

      </div>

      {/* =========================
          RESEND
      ========================== */}
      <div className="absolute top-[580px] left-1/2 -translate-x-1/2 flex items-center gap-1">

        <span className="text-[14px] leading-[17px] text-[#6B7280]">
          Resend code in
        </span>

        {timeLeft > 0 ? (
          <span className="text-[16px] leading-[19px] font-bold text-[#10B981]">
            0:{String(timeLeft).padStart(2, "0")}
          </span>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            className="text-[14px] font-bold text-[#10B981]"
          >
            Resend
          </button>
        )}

      </div>

      {/* =========================
          VERIFY BUTTON
      ========================== */}
      <button
  type="button"
  onClick={handleVerify}
  className="
    absolute
    top-[800px]
    left-1/2
    -translate-x-1/2
    w-[calc(100%-48px)]
    sm:w-[592px]
    md:w-[720px]
    lg:w-[976px]
    xl:w-[1232px]
    2xl:w-[1488px]
    h-[52px]
    bg-[#008000]
    hover:bg-[#006b00]
    transition-colors
    rounded-full
    flex
    items-center
    justify-center
    text-white
    text-[14px]
    leading-[28px]
    font-semibold
  "
>
  Verify
</button>
      {/* =========================
          SUPPORT
      ========================== */}
      <div className="absolute top-[865px] left-1/2 -translate-x-1/2 flex items-center gap-[5px] whitespace-nowrap">

        <span className="text-[14px] leading-[17px] text-[#6B7280]">
          Didn't receive code?
        </span>

        <button
          type="button"
          className="text-[14px] leading-[17px] italic font-bold text-[#10B981]"
        >
          Contact support
        </button>

      </div>

      {/* =========================
          BOTTOM HOME INDICATOR
      ========================== */}
      <div className="absolute bottom-0 left-0 w-full h-[24px] bg-white flex items-center justify-center">
        <div className="w-[108px] h-[4px] bg-[#1F2937] rounded-full" />
      </div>

    </div>
  );
}

export default OTP;


