import React from "react";
import { MapPin, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";


function LocationSet() {
const navigate = useNavigate();

  const handleStartExploring = () => {
    console.log("Start exploring");
    navigate("/notification");
  };

  const handleChangeLocation = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center overflow-hidden">

      <div
        className="
          relative
          w-[428px]
          h-[926px]
          max-w-[100vw]
          max-h-[100vh]
          overflow-hidden
          rounded-[35px]
          bg-white
        "
      >

        {/* ================= STATUS BAR ================= */}
        <div className="absolute left-0 top-0 z-30 flex h-[62px] w-full items-center justify-between px-4">

          <div className="flex h-[22px] w-[121px] items-center justify-center pt-[2px]">
            <span className="text-center text-[17px] font-semibold leading-[22px] text-black">
              9:41
            </span>
          </div>

          <div className="flex h-[22px] w-[121px] items-center justify-end gap-[7px]">

            <div className="flex h-[13px] w-[19px] items-end gap-[2px]">
              <span className="h-[5px] w-[2px] bg-black" />
              <span className="h-[7px] w-[2px] bg-black" />
              <span className="h-[10px] w-[2px] bg-black" />
              <span className="h-[13px] w-[2px] bg-black" />
            </div>

            <div className="relative h-[13px] w-[18px]">
              <div className="absolute left-0 top-0 h-[8px] w-[18px] rounded-t-full border-t-[3px] border-black" />
              <div className="absolute left-[4px] top-[4px] h-[6px] w-[10px] rounded-t-full border-t-[3px] border-black" />
              <div className="absolute bottom-0 left-[7px] h-[3px] w-[3px] rounded-full bg-black" />
            </div>

            <div className="relative h-[13px] w-[27px]">
              <div className="h-[13px] w-[25px] rounded-[4px] border border-black opacity-40" />
              <div className="absolute left-[3px] top-[3px] h-[7px] w-[20px] rounded-[2px] bg-black" />
              <div className="absolute right-[-2px] top-[4px] h-[5px] w-[2px] rounded-r bg-black opacity-40" />
            </div>

          </div>
        </div>


        {/* ================= LOCATION SET MESSAGE ================= */}

        <div
          className="
            absolute
            left-[24px]
            top-[320px]
            flex
            w-[380px]
            flex-col
            items-center
            gap-[16px]
          "
        >

          <h1 className="w-full text-center text-[24px] font-bold leading-[29px] text-[#1F2937]">
            Location Set!
          </h1>

          <p className="w-full text-center text-[16px] font-normal leading-[25px] text-[#6B7280]">
            We’ll now show you service providers near your location
          </p>

        </div>


        {/* ================= LOCATION SUMMARY ================= */}

        <div
          className="
            absolute
            left-[24px]
            top-[440px]
            flex
            h-[118px]
            w-[380px]
            flex-col
            gap-2
            rounded-[15px]
            bg-[#F0FDF4]
            p-4
          "
        >

          {/* Location */}
          <div className="flex h-[27px] w-full items-center gap-[10px]">

            <MapPin
              size={20}
              strokeWidth={2}
              className="text-[#008000]"
            />

            <span className="text-[14px] font-bold italic leading-[17px] text-[#008000]">
              Ikeja, Lagos
            </span>

          </div>


          {/* Radius */}
          <div className="flex h-[27px] items-center gap-[8px]">

            <div className="h-[20px] w-[20px]" />

            <span className="text-[14px] font-bold leading-[17px] text-[#1F2937]">
              Searching within 5 km
            </span>

          </div>


          {/* Providers */}
          <div className="flex h-[17px] items-center gap-[8px]">

            <CheckCircle
              size={20}
              strokeWidth={2}
              className="text-[#008000]"
            />

            <span className="text-[14px] font-bold leading-[17px] text-[#008000]">
              156 providers nearby
            </span>

          </div>

        </div>


        {/* ================= BOTTOM ACTION AREA ================= */}

        <div
          className="
            absolute
            bottom-0
            left-0
            h-[189px]
            w-full
            bg-white
          "
        >

          {/* Start Exploring */}

          <button
            type="button"
            onClick={handleStartExploring}
            className="
              absolute
              left-[24px]
              top-0
              flex
              h-[52px]
              w-[380px]
              items-center
              justify-center
              rounded-[99px]
              border-2
              border-[#008000]
              bg-[#008000]
              px-[10px]
              py-3
              text-[14px]
              font-semibold
              leading-[28px]
              text-white
            "
          >
            Start Exploring
          </button>


          {/* Change Location */}

          <button
            type="button"
            onClick={handleChangeLocation}
            className="
              absolute
              left-[24px]
              top-[68px]
              h-[28px]
              w-[380px]
              text-center
              text-[14px]
              font-semibold
              leading-[28px]
              text-[#1F2937]
            "
          >
            Change Location
          </button>


          {/* Home Indicator */}

          <div className="absolute bottom-0 left-1/2 h-[24px] w-[412px] -translate-x-1/2">

            <div
              className="
                absolute
                left-1/2
                top-1/2
                h-[4px]
                w-[108px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-[12px]
                bg-[#1F2937]
              "
            />

          </div>

        </div>

      </div>
    </div>
  );
}

export default LocationSet;