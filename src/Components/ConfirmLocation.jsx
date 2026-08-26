import React, { useState } from "react";
import { ArrowLeft, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ConfirmLocation() {
  const navigate = useNavigate();

  const [radius, setRadius] = useState("2 km");

 const handleSaveLocation = () => {
  console.log("Location saved");
  navigate("/location-set");
};

  const handleChangeLocation = () => {
navigate("/enter-location");
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center overflow-hidden">

      {/* =====================================================
          DEVICE FRAME
          Figma design: 428 × 926
      ====================================================== */}
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
        <div className="absolute inset-0 overflow-y-auto">


        {/* =================================================
            STATUS BAR
        ================================================== */}
        <div className="absolute left-0 top-0 z-30 flex h-[62px] w-full items-center justify-between px-4">

          {/* Time */}
          <div className="flex h-[22px] w-[121px] items-center justify-center pt-[2px]">
            <span className="text-center text-[17px] font-semibold leading-[22px] text-black">
              9:41
            </span>
          </div>

          {/* Network / WiFi / Battery */}
          <div className="flex h-[22px] w-[121px] items-center justify-end gap-[7px]">

            {/* Cellular */}
            <div className="flex h-[13px] w-[19px] items-end gap-[2px]">
              <span className="h-[5px] w-[2px] rounded-sm bg-black" />
              <span className="h-[7px] w-[2px] rounded-sm bg-black" />
              <span className="h-[10px] w-[2px] rounded-sm bg-black" />
              <span className="h-[13px] w-[2px] rounded-sm bg-black" />
            </div>

            {/* WiFi */}
            <div className="relative h-[13px] w-[18px]">
              <div className="absolute left-0 top-0 h-[8px] w-[18px] rounded-t-full border-t-[3px] border-black" />
              <div className="absolute left-[4px] top-[4px] h-[6px] w-[10px] rounded-t-full border-t-[3px] border-black" />
              <div className="absolute bottom-0 left-[7px] h-[3px] w-[3px] rounded-full bg-black" />
            </div>

            {/* Battery */}
            <div className="relative h-[13px] w-[27px]">
              <div className="h-[13px] w-[25px] rounded-[4px] border border-black opacity-40" />

              <div className="absolute left-[3px] top-[3px] h-[7px] w-[20px] rounded-[2px] bg-black" />

              <div className="absolute right-[-2px] top-[4px] h-[5px] w-[2px] rounded-r bg-black opacity-40" />
            </div>

          </div>
        </div>


        {/* =================================================
            HEADER
        ================================================== */}
        <div className="absolute left-[24px] top-[70px] z-20 flex h-[49px] w-[257px] items-start gap-6">

          {/* Back button */}
          <button
            type="button"
            onClick={handleChangeLocation}
            className="flex h-[24px] w-[24px] shrink-0 items-center justify-center"
          >
            <ArrowLeft
              size={24}
              strokeWidth={2}
              className="text-[#1F2937]"
            />
          </button>

          {/* Header text */}
          <div className="flex h-[49px] w-[209px] flex-col gap-2">

            <h1 className="h-[24px] w-[209px] text-[20px] font-bold leading-[24px] text-[#1F2937]">
              Confirm Location
            </h1>

            <p className="h-[17px] w-[209px] text-[14px] font-medium leading-[17px] text-[#1F2937]">
              Adjust pin if needed
            </p>

          </div>
        </div>


        {/* =================================================
            MAP
            Figma: 380 × 380
            left: 24px
            top: 143px
        ================================================== */}
        <div
          className="
            absolute
            left-[24px]
            top-[143px]
            h-[380px]
            w-[380px]
            overflow-hidden
          "
        >

          {/* Map image */}
          <img
            src="/basemap.png"
            alt="Location map"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Center map marker */}
          <div
            className="
              absolute
              left-1/2
              top-1/2
              -translate-x-1/2
              -translate-y-1/2
            "
          >
            <MapPin
              size={22}
              fill="#3EC3FF"
              stroke="#1DAEEF"
              strokeWidth={1.5}
            />
          </div>

        </div>


        {/* {/* =================================================
    YOUR LOCATION
================================================== */}
<div className="absolute left-[24px] top-[547px] z-10">
  <p className="text-[14px] font-bold leading-[17px] text-[#374151]">
    Your Location
  </p>
</div>


{/* =================================================
    LOCATION DISPLAY
================================================== */}
<div
  className="
    absolute
    left-[24px]
    top-[572px]
    z-10
    box-border
    flex
    h-[44px]
    w-[380px]
    items-center
    gap-4
    rounded-[15px]
    border-[1.5px]
    border-[#E5E7EB]
    bg-white
    px-4
  "
>
  <MapPin
    size={24}
    strokeWidth={2}
    className="shrink-0 text-[#9CA3AF]"
  />

  <span className="text-[16px] font-normal leading-[19px] text-[#1F2937]">
    Ikeja, Lagos
  </span>
</div>


{/* =================================================
    SEARCH RADIUS
================================================== */}
<div className="absolute left-[24px] top-[640px] z-10">
  <p className="text-[14px] font-bold leading-[17px] text-[#374151]">
    Search Radius
  </p>
</div>


{/* =================================================
    RADIUS OPTIONS
================================================== */}
<div
  className="
    absolute
    left-[24px]
    top-[669px]
    z-10
    flex
    h-[44px]
    w-[379px]
    gap-[13px]
  "
>
  {["1 km", "2 km", "5 km", "10 km"].map((item) => (
    <button
      key={item}
      type="button"
      onClick={() => setRadius(item)}
      className={`
        box-border
        flex
        h-[44px]
        w-[85px]
        items-center
        justify-center
        rounded-[10px]
        border-[1.5px]
        px-[10px]
        py-[10px]
        font-['Arial']
        text-[14px]
        font-bold
        leading-[16px]
        ${
          radius === item
            ? "border-[#008000] bg-[#008000] text-white"
            : "border-[#E5E7EB] bg-white text-[#6B7280]"
        }
      `}
    >
      {item}
    </button>
  ))}
</div>

        {/* =================================================
            BOTTOM ACTION AREA
        ================================================== */}
        <div
          className="
            absolute
            top-[731px]
            bottom-0
            left-0
            h-[155px]
            w-full
            bg-white
          "
        >

          {/* Save Location */}
          <button
            type="button"
            onClick={handleSaveLocation}
            className="
              absolute
              left-[24px]
              top-[31px]
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
              transition
              hover:bg-[#006B00]
              active:scale-[0.98]
            "
          >
            Save Location
          </button>


          {/* Change Location */}
          <button
            type="button"
            onClick={handleChangeLocation}
            className="
              absolute
              left-[24px]
              top-[97px]
              h-[28px]
              w-[380px]
              text-center
              text-[14px]
              font-semibold
              leading-[28px]
              text-[#1F2937]
              transition
              hover:text-[#008000]
            "
          >
            Change Location
          </button>


          {/* =================================================
              HOME INDICATOR
          ================================================== */}
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
    </div>
  );
}

export default ConfirmLocation;