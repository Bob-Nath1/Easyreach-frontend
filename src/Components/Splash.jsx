import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/Splash.css";

function Splash() {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/frontpage");
}, 18000); // 18 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="w-screen h-screen bg-white flex justify-center items-center">
      <div className="flex items-center">
        <img
          src="/EasyReach.png"
          alt="Easy Reach Logo"
          className="w-16 ml-64 animate-logo"
        />
        <h1 className="font-bold text-[20.93px] text-black opacity-0 animate-text">
          Easy<span className="text-green-600">Reach</span>
        </h1>
      </div>
    </div>
  );
}
export default Splash;