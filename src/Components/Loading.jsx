import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Loading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/signin");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white flex justify-center font-sans">
      {/* Mobile Container */}
      <div className="relative w-full max-w-[428px] min-h-screen bg-white rounded-[35px] overflow-hidden">

        {/* Status Bar */}
        <div className="absolute top-0 left-0 w-full h-[62px] flex items-center justify-between px-4">

          {/* Time */}
          <div className="flex items-center">
            <span className="text-[17px] font-semibold text-black">
              9:41
            </span>
          </div>

          {/* Phone Status Icons */}
          <div className="flex items-center gap-[7px]">

            {/* Cellular */}
            <div className="flex items-end gap-[2px] h-[13px]">
              <span className="w-[3px] h-[5px] bg-black rounded-sm" />
              <span className="w-[3px] h-[8px] bg-black rounded-sm" />
              <span className="w-[3px] h-[11px] bg-black rounded-sm" />
              <span className="w-[3px] h-[13px] bg-black rounded-sm" />
            </div>

            {/* Wifi */}
            <div className="relative w-[17px] h-[13px]">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[4px] h-[4px] bg-black rounded-full" />

              <div className="absolute bottom-[2px] left-1/2 -translate-x-1/2 w-[10px] h-[6px] border-t-[2px] border-black rounded-full" />

              <div className="absolute bottom-[4px] left-1/2 -translate-x-1/2 w-[16px] h-[9px] border-t-[2px] border-black rounded-full" />
            </div>

            {/* Battery */}
            <div className="relative w-[27px] h-[13px]">
              <div className="absolute left-0 top-0 w-[25px] h-[13px] border border-black/40 rounded-[4px]">
                <div className="absolute left-[2px] top-[2px] w-[21px] h-[9px] bg-black rounded-[2px]" />
              </div>

              <div className="absolute right-[-1px] top-[4px] w-[2px] h-[5px] bg-black/40 rounded-r" />
            </div>

          </div>
        </div>

        {/* Loading Circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[70px] h-[70px]">

            {/* Green circle */}
            <div className="absolute inset-0 rounded-full bg-[#008000]" />

            {/* Spinning ring */}
            <div className="absolute inset-0 rounded-full border-4 border-white/30 border-t-white animate-spin" />

          </div>
        </div>

      </div>
    </div>
  );
};

export default Loading;