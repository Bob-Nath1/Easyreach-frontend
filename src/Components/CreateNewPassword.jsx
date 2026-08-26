import { useState } from "react";
import { ArrowLeft, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateNewPassword = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangePassword = () => {
    if (!password || !confirmPassword) {
      alert("Please enter your new password.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    alert("Password changed successfully.");

    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Mobile Container */}
      <div className="mx-auto min-h-screen w-full max-w-[428px] rounded-[35px] bg-white">
        
        {/* Scrollable Content */}
        <div className="relative min-h-screen overflow-y-auto px-6 pb-10">

          {/* ================= STATUS BAR ================= */}
          <div className="flex h-[62px] items-center justify-between pt-3 text-black">
            
            {/* Time */}
            <div className="w-[121px] text-center">
              <span className="text-[17px] font-semibold">
                9:41
              </span>
            </div>

            {/* Status Icons */}
            <div className="flex w-[121px] items-center justify-end gap-[7px]">

              {/* Cellular */}
              <div className="flex h-[13px] items-end gap-[2px]">
                <span className="h-[5px] w-[3px] rounded-sm bg-black" />
                <span className="h-[7px] w-[3px] rounded-sm bg-black" />
                <span className="h-[9px] w-[3px] rounded-sm bg-black" />
                <span className="h-[12px] w-[3px] rounded-sm bg-black" />
              </div>

              {/* Wifi */}
              <div className="text-[15px]">
                ◔
              </div>

              {/* Battery */}
              <div className="relative h-[13px] w-[27px] rounded-[4px] border border-black/40">
                <div className="absolute left-[2px] top-[2px] h-[7px] w-[20px] rounded-[2px] bg-black" />

                <div className="absolute right-[-3px] top-[4px] h-[5px] w-[2px] rounded-r bg-black/40" />
              </div>

            </div>
          </div>


          {/* ================= HEADER ================= */}
          <div className="mt-2 flex items-center gap-6">

            {/* Back Button */}
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

            {/* Title */}
            <h1 className="text-[20px] font-bold leading-6 text-[#1F2937]">
              Create New Password
            </h1>

          </div>


          {/* ================= DESCRIPTION ================= */}
          <div className="mt-4">

            <p className="text-left text-[14px] leading-6 text-[#6B7280]">
              Enter the code we sent to
            </p>

            <p className="text-left text-[14px] font-semibold leading-6 text-[#008000]">
              timilehinabidoye@gmail.com
            </p>

          </div>


          {/* ================= PROGRESS ================= */}
          <div className="mt-6 flex gap-4">

            <div className="h-1 flex-1 rounded-full bg-[#008000]" />

            <div className="h-1 flex-1 rounded-full bg-[#008000]" />

          </div>


          {/* ================= PASSWORD ================= */}
          <div className="mt-8">

            {/* Label */}
            <label className="block text-[14px] font-bold leading-[17px] text-[#008000]">
              Password
            </label>

            {/* Input */}
            <div className="relative mt-2 h-[35px]">

              {/* Lock */}
              <Lock
                size={18}
                className="absolute left-1 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
              />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="h-[35px] w-full border-b border-[#9CA3AF] bg-transparent pl-[30px] pr-[35px] text-[12px] font-bold text-[#1F2937] outline-none placeholder:text-[#9CA3AF]"
              />

              {/* Eye */}
              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
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


          {/* ================= CONFIRM PASSWORD ================= */}
          <div className="mt-6">

            {/* Label */}
            <label className="block text-[14px] font-bold leading-[17px] text-[#008000]">
              Confirm Password
            </label>

            {/* Input */}
            <div className="relative mt-2 h-[35px]">

              {/* Lock */}
              <Lock
                size={18}
                className="absolute left-1 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
              />

              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="Enter your password"
                className="h-[35px] w-full border-b border-[#9CA3AF] bg-transparent pl-[30px] pr-[35px] text-[12px] font-bold text-[#1F2937] outline-none placeholder:text-[#9CA3AF]"
              />

              {/* Eye */}
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
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


          {/* ================= CHANGE PASSWORD ================= */}
          <button
            type="button"
            onClick={handleChangePassword}
            className="mt-12 flex h-[52px] w-full items-center justify-center rounded-full border-2 border-[#008000] bg-[#008000] px-[10px] text-[14px] font-semibold leading-7 text-white transition hover:bg-green-700 active:scale-[0.98]"
          >
            Change Password
          </button>


          {/* Extra bottom space for scrolling */}
          <div className="h-10" />

        </div>
      </div>
    </div>
  );
};

export default CreateNewPassword;