import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const goBack = () => {
    navigate("/welcome");
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    // Add your login API here later
    console.log({
      email,
      password,
      rememberMe,
    });
  };

  return (
    <div className="relative w-full h-[926px] mx-auto overflow-hidden rounded-[35px] bg-gradient-to-br from-[#008000] to-[#00C48C]">


      {/* ================= BACK BUTTON ================= */}
      <button
        onClick={goBack}
        className="absolute left-[24px] top-[70px] w-[24px] h-[24px] flex items-center justify-center text-white -mt-12"
      >
        <span className="text-[30px] leading-none">
          ‹
        </span>
      </button>


      {/* ================= TOP GREETING ================= */}
      <div className="absolute top-[178px] left-0 w-full text-center -mt-9">

        <h1 className="text-white text-md leading-[29px] font-bold">
          Hello
        </h1>

        <h2 className="mt-[16px] text-white text-md leading-[29px] font-bold">
          Sign in to continue
        </h2>

      </div>


      {/* ================= WHITE FORM CONTAINER ================= */}
      <div className="absolute left-0 bottom-0 w-full h-[601px] bg-white rounded-t-[45px]">

        <form onSubmit={handleSignIn}>

          {/* ================= EMAIL ================= */}
          <div className="absolute left-[24px] top-[64px] w-full">

            <label className="block text-[#008000] text-[14px] leading-[17px] font-bold mb-[8px]">
              Email or Phone
            </label>

            <div className="relative h-[35px]">

              {/* Mail icon */}
              <span className="absolute left-[4px] top-[8px] text-[#9CA3AF] text-[18px]">
                ✉
              </span>

              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email or phone number"
                className="w-full h-[35px] pl-[32px] pr-[10px] pb-[10px] text-[12px] font-bold text-[#1F2937] placeholder:text-[#9CA3AF] placeholder:font-bold border-b border-[#9CA3AF] outline-none bg-transparent"
              />

            </div>

          </div>


          {/* ================= PASSWORD ================= */}
          <div className="absolute left-[24px] top-[160px] w-full">

            <label className="block text-[#008000] text-[14px] leading-[17px] font-bold mb-[8px]">
              Password
            </label>

            <div className="relative h-[35px]">

              {/* Lock icon */}
              <span className="absolute left-[4px] top-[8px] text-[#9CA3AF] text-[17px]">
                🔒
              </span>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full h-[35px] pl-[30px] pr-[40px] pb-[10px] text-[12px] font-bold text-[#1F2937] placeholder:text-[#9CA3AF] placeholder:font-bold border-b border-[#9CA3AF] outline-none bg-transparent"
              />

            </div>

          </div>


          {/* ================= REMEMBER ME ================= */}
          <div className="absolute left-[24px] top-[232px] flex items-center gap-[8px]">

            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-[15px] h-[15px] accent-[#1F2937]"
            />

            <span className="text-[#444444] text-[12px] leading-[15px] font-medium">
              Remember me
            </span>

          </div>


          {/* ================= FORGOT PASSWORD ================= */}
          <button
            onClick={() => navigate("/resetpassword")}

            type="button"
            className="absolute right-[28px] top-[232px] text-[#008000] text-[12px] leading-[15px] font-medium"
          >
            Forgot Password?
          </button>


          {/* ================= SIGN IN BUTTON ================= */}
          <button
          onClick={() => navigate("/signingin")}
            type="submit"
            className="absolute ml-48 top-[287px] w-[270px] h-[52px] flex items-center justify-center bg-[#008000] hover:bg-green-700 transition rounded-full"
          >
            <span className="text-white text-[14px] leading-[28px] font-semibold">
              Sign in
            </span>
          </button>

        </form>


        {/* ================= SOCIAL LOGIN ================= */}
        <div className="absolute left-[109px] top-[405px] w-[210px] flex flex-col items-center">

          {/* Sign in with */}
          <div className="flex items-center gap-[4px] w-[210px] ml-57">

            <div className="w-[60px] border-t border-[#9CA3AF]"></div>

            <span className="w-[79px] text-center text-[#1F2937] text-[14px] leading-[17px] font-semibold">
              Sign in with
            </span>

            <div className="w-[60px] border-t border-[#9CA3AF]"></div>

          </div>


          {/* Social icons */}
          <div className="mt-[28px] flex items-center gap-[16px] ml-54">

            {/* Apple */}
            <button
              type="button"
              className="w-[32px] h-[32px] rounded-full bg-white shadow flex items-center justify-center"
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
              className="w-[32px] h-[32px] rounded-full bg-white shadow flex items-center justify-center"
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
              className="w-[32px] h-[32px] rounded-full bg-white shadow flex items-center justify-center"
            >
               <img
            src="/Facebook.png"
            alt="EasyReach"
            className="w-[27px] h-[32px] object-contain"
          />
            </button>

          </div>

        </div>


        {/* ================= SIGN UP ================= */}
        <div className="absolute right-[24px] top-[507px] flex flex-col items-end gap-[8px] ">

          <span className="text-[#1F2937] text-[12px] leading-[15px] font-normal">
            Don’t have an account?
          </span>

          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-[#1F2937] text-[12px] leading-[15px] font-semibold"
          >
            Sign up
          </button>

        </div>

      </div>


      {/* ================= HOME INDICATOR ================= */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[412px] h-[24px] flex items-center justify-center">

        <div className="w-[108px] h-[4px] bg-[#FFFDFD] rounded-[12px]"></div>

      </div>

    </div>
  );
}

export default SignIn;