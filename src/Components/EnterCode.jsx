import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const EnterCode = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(45);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");

  // Redirect if the user opens this page without an email
  useEffect(() => {
    if (!email) {
      navigate("/resetpassword", { replace: true });
    }
  }, [email, navigate]);

  // Countdown
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleCodeChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError("");

    if (value && index < 5) {
      document.getElementById(`code-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      document.getElementById(`code-${index - 1}`)?.focus();
    }
  };

  const handleVerify = async () => {
    const enteredCode = code.join("");

    if (enteredCode.length !== 6) {
      setError("Please enter the 6-digit verification code.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/verify-reset-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp: enteredCode,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid verification code.");
      }

      if (!data.resetToken) {
        throw new Error("Verification succeeded but no reset token was returned.");
      }

      navigate("/create-password", {
        state: {
          email,
          resetToken: data.resetToken,
        },
      });
    } catch (err) {
      setError(err.message || "Unable to verify your code.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (timeLeft > 0 || resending) return;

    try {
      setResending(true);
      setError("");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to resend the code.");
      }

      setCode(["", "", "", "", "", ""]);
      setTimeLeft(45);

      document.getElementById("code-0")?.focus();
    } catch (err) {
      setError(err.message || "Unable to resend the code.");
    } finally {
      setResending(false);
    }
  };

  if (!email) return null;

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="mx-auto min-h-screen w-full max-w-[428px] rounded-[35px] bg-white">
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

            <div className="mt-6 flex justify-between gap-2">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
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
              disabled={timeLeft > 0 || resending}
              className={`font-bold italic ${
                timeLeft > 0 || resending
                  ? "text-[#9CA3AF]"
                  : "text-[#008000]"
              }`}
            >
              {resending ? "Sending..." : "Resend"}
            </button>

            <span className="font-bold italic text-[#F59E0B]">
              ({`0:${String(timeLeft).padStart(2, "0")}`})
            </span>
          </div>

          {/* Error message */}
          {error && (
            <p className="mt-4 text-center text-[13px] text-red-600">
              {error}
            </p>
          )}

          {/* Verify button */}
          <button
            type="button"
            onClick={handleVerify}
            disabled={loading}
            className="mt-8 flex h-[52px] w-full items-center justify-center rounded-full border-2 border-[#008000] bg-[#008000] px-[10px] text-[14px] font-semibold text-white transition hover:bg-green-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Verify Code"}
          </button>

          {/* Extra information box */}
          <div className="mt-8 flex min-h-[49px] w-full items-center rounded-[15px] border-[1.5px] border-[#E5E7EB] bg-[#F9FAFB] px-4 py-2">
            <p className="text-[12px] leading-5 text-[#6B7280]">
              Your verification code expires after 5 minutes. Please use
              the most recently sent code.
            </p>
          </div>

          {/* Bottom spacing */}
          <div className="mt-8 flex flex-col items-center">
            <div className="flex w-full items-center justify-between">
              <span className="text-[14px] font-bold italic text-[#374151]">
                Try another way
              </span>

              <span className="text-[14px] text-[#9CA3AF]">
                ▼
              </span>
            </div>

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
