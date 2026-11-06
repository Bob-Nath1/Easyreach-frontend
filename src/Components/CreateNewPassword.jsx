
import { useState, useEffect } from "react";
import { ArrowLeft, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const CreateNewPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;
  const resetToken = location.state?.resetToken;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Prevent direct access without a verified reset token
  useEffect(() => {
    if (!email || !resetToken) {
      navigate("/resetpassword", { replace: true });
    }
  }, [email, resetToken, navigate]);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError("");

    if (!password || !confirmPassword) {
      setError("Please enter and confirm your new password.");
      return;
    }

    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[^A-Za-z0-9]/.test(password)
    ) {
      setError(
        "Password must contain at least 8 characters, an uppercase letter, a number, and a special character."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            resetToken,
            newPassword: password,
            confirmNewPassword: confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to change your password.");
      }

      navigate("/signin", {
        replace: true,
        state: {
          message: "Your password has been changed successfully. Please sign in.",
        },
      });
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!email || !resetToken) return null;

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="mx-auto min-h-screen w-full max-w-[428px] rounded-[35px] bg-white">
        <div className="relative min-h-screen overflow-y-auto px-6 pb-10">

          {/* ================= STATUS BAR ================= */}
          <div className="flex h-[62px] items-center justify-between pt-3 text-black">
            <div className="w-[121px] text-center">
              <span className="text-[17px] font-semibold">
                9:41
              </span>
            </div>

            <div className="flex w-[121px] items-center justify-end gap-[7px]">
              <div className="flex h-[13px] items-end gap-[2px]">
                <span className="h-[5px] w-[3px] rounded-sm bg-black" />
                <span className="h-[7px] w-[3px] rounded-sm bg-black" />
                <span className="h-[9px] w-[3px] rounded-sm bg-black" />
                <span className="h-[12px] w-[3px] rounded-sm bg-black" />
              </div>

              <div className="text-[15px]">◔</div>

              <div className="relative h-[13px] w-[27px] rounded-[4px] border border-black/40">
                <div className="absolute left-[2px] top-[2px] h-[7px] w-[20px] rounded-[2px] bg-black" />
                <div className="absolute right-[-3px] top-[4px] h-[5px] w-[2px] rounded-r bg-black/40" />
              </div>
            </div>
          </div>

          {/* ================= HEADER ================= */}
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

          {/* ================= DESCRIPTION ================= */}
          <div className="mt-4">
            <p className="text-left text-[14px] leading-6 text-[#6B7280]">
              Resetting password for
            </p>

            <p className="text-left text-[14px] font-semibold leading-6 text-[#008000]">
              {email}
            </p>
          </div>

          {/* ================= PROGRESS ================= */}
          <div className="mt-6 flex gap-4">
            <div className="h-1 flex-1 rounded-full bg-[#008000]" />
            <div className="h-1 flex-1 rounded-full bg-[#008000]" />
          </div>

          {/* ================= PASSWORD FORM ================= */}
          <form onSubmit={handleChangePassword}>

            {/* PASSWORD */}
            <div className="mt-8">
              <label
                htmlFor="new-password"
                className="block text-[14px] font-bold leading-[17px] text-[#008000]"
              >
                Password
              </label>

              <div className="relative mt-2 h-[35px]">
                <Lock
                  size={18}
                  className="absolute left-1 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                />

                <input
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter your password"
                  className="h-[35px] w-full border-b border-[#9CA3AF] bg-transparent pl-[30px] pr-[35px] text-[12px] font-bold text-[#1F2937] outline-none placeholder:text-[#9CA3AF]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="mt-6">
              <label
                htmlFor="confirm-password"
                className="block text-[14px] font-bold leading-[17px] text-[#008000]"
              >
                Confirm Password
              </label>

              <div className="relative mt-2 h-[35px]">
                <Lock
                  size={18}
                  className="absolute left-1 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                />

                <input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Confirm your password"
                  className="h-[35px] w-full border-b border-[#9CA3AF] bg-transparent pl-[30px] pr-[35px] text-[12px] font-bold text-[#1F2937] outline-none placeholder:text-[#9CA3AF]"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <p className="mt-4 text-[12px] leading-5 text-red-600">
                {error}
              </p>
            )}

            {/* PASSWORD REQUIREMENTS */}
            <p className="mt-4 text-[12px] leading-5 text-[#6B7280]">
              Use at least 8 characters, including an uppercase letter,
              a number, and a special character.
            </p>

            {/* CHANGE PASSWORD */}
            <button
              type="submit"
              disabled={loading}
              className="mt-8 flex h-[52px] w-full items-center justify-center rounded-full border-2 border-[#008000] bg-[#008000] px-[10px] text-[14px] font-semibold leading-7 text-white transition hover:bg-green-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Changing Password..." : "Change Password"}
            </button>
          </form>

          <div className="h-10" />
        </div>
      </div>
    </div>
  );
};

export default CreateNewPassword;
