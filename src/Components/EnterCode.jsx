import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const EnterCode = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(45);

  // Get email/phone passed from ResetPassword page
  const email =
    location.state?.email || "timilehinabidoye@gmail.com";

  // Countdown
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleCodeChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move to next input
    if (value && index < 5) {
      document.getElementById(`code-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      document.getElementById(`code-${index - 1}`)?.focus();
    }
  };

  const handleVerify = () => {
    const enteredCode = code.join("");

    if (enteredCode.length !== 6) {
      alert("Please enter the 6-digit verification code.");
      return;
    }

    // Navigate to create new password
    navigate("/create-password");
  };

  const handleResend = () => {
    if (timeLeft > 0) return;

    setTimeLeft(45);
    setCode(["", "", "", "", "", ""]);

    alert("A new verification code has been sent.");
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Mobile screen */}
      <div className="mx-auto min-h-screen w-full max-w-[428px] rounded-[35px] bg-white">

        {/* Scrollable page */}
        <div className="relative min-h-screen overflow-y-auto px-6 pb-10">


          {/* Back + title */}
          <div className="mt-2 flex items-center gap-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex h-6 w-6 items-center justify-center"
            >
              <ArrowLeft
                size={24}
                strokeWidth={2}
                className="text-[#1F2937]"
              />
            </button>

            <h1 className="text-[20px] font-bold leading-6 text-[#1F2937]">
              Create New Password
            </h1>
          </div>

          {/* Description */}
          <div className="mt-4 text-center">
            <p className="text-[14px] leading-6 text-[#6B7280]">
              Enter the code we sent to
            </p>

            <p className="text-[14px] font-semibold leading-6 text-[#008000]">
              {email}
            </p>
          </div>

          {/* Progress indicator */}
          <div className="mt-6 flex gap-4">
            <div className="h-1 flex-1 rounded-full bg-[#008000]" />
            <div className="h-1 flex-1 rounded-full bg-[#E5E7EB]" />
          </div>

          {/* Enter verification code */}
          <div className="mt-8">
            <h2 className="text-[16px] font-bold leading-[19px] text-[#374151]">
              Enter Verification Code
            </h2>

            {/* Code inputs */}
            <div className="mt-6 flex justify-between gap-2">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) =>
                    handleCodeChange(e.target.value, index)
                  }
                  onKeyDown={(e) =>
                    handleKeyDown(e, index)
                  }
                  className="h-[49px] w-[49px] rounded-[15px] border-[1.5px] border-[#E5E7EB] bg-[#F9FAFB] text-center text-[18px] font-bold text-[#1F2937] outline-none focus:border-[#008000] focus:ring-1 focus:ring-[#008000]"
                />
              ))}
            </div>
          </div>

          {/* Resend */}
          <div className="mt-8 flex items-center justify-center gap-2 text-[14px]">
            <span className="text-[#6B7280]">
              Didn't receive code?
            </span>

            <button
              type="button"
              onClick={handleResend}
              disabled={timeLeft > 0}
              className={`font-bold italic ${
                timeLeft > 0
                  ? "text-[#9CA3AF]"
                  : "text-[#008000]"
              }`}
            >
              Resend
            </button>

            <span className="font-bold italic text-[#F59E0B]">
              ({`0:${String(timeLeft).padStart(2, "0")}`})
            </span>
          </div>

          {/* Verify button */}
          <button
            type="button"
            onClick={handleVerify}
            className="mt-8 flex h-[52px] w-full items-center justify-center rounded-full border-2 border-[#008000] bg-[#008000] px-[10px] text-[14px] font-semibold text-white transition hover:bg-green-700 active:scale-[0.98]"
          >
            Verify Code
          </button>

          {/* Extra information box */}
          <div className="mt-8 h-[49px] w-full rounded-[15px] border-[1.5px] border-[#E5E7EB] bg-[#F9FAFB]" />

          {/* Bottom spacing */}
          <div className="mt-8 flex flex-col items-center">

            {/* Try another way */}
            <div className="flex w-full items-center justify-between">
              <span className="text-[14px] font-bold italic text-[#374151]">
                Try another way
              </span>

              <span className="text-[14px] text-[#9CA3AF]">
                ▼
              </span>
            </div>

            {/* Options */}
            <div className="mt-4 w-full">
              <button
                type="button"
                className="flex h-[29px] w-full items-center px-4 py-1.5 text-left text-[14px] font-medium text-[#1F2937]"
              >
                Security question
              </button>

              <button
                type="button"
                className="flex h-[29px] w-full items-center px-4 py-1.5 text-left text-[14px] font-medium text-[#1F2937]"
              >
                Contact Support
              </button>

              <div className="mt-2 h-[1.5px] w-full bg-[#F3F4F6]" />
            </div>

            {/* Sign in */}
            <div className="mt-6 flex items-center gap-1 text-[14px]">
              <span className="text-[#6B7280]">
                Remember your password?
              </span>

              <button
                type="button"
                onClick={() => navigate("/signin")}
                className="font-bold italic text-[#10B981]"
              >
                Sign in
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EnterCode;