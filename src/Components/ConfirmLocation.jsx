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
    overflow-hidden
    rounded-[35px]
    bg-white
    mx-auto
  "
>
        <div className="absolute inset-0 overflow-y-auto">


  


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
    left-1/2
    top-[143px]
    -translate-x-1/2
    h-[380px]
    w-[calc(100%-48px)]
    max-w-[380px]
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
<div className="absolute left-1/2 top-[547px] z-10 w-[calc(100%-48px)] max-w-[380px] -translate-x-1/2">
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
    left-1/2
    top-[572px]
    z-10
    box-border
    flex
    h-[44px]
    w-[calc(100%-48px)]
    max-w-[380px]
    -translate-x-1/2
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
<div className="absolute left-1/2 top-[640px] z-10 w-[calc(100%-48px)] max-w-[380px] -translate-x-1/2">
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
    left-1/2
    top-[669px]
    z-10
    flex
    h-[44px]
    w-[calc(100%-48px)]
    max-w-[379px]
    -translate-x-1/2
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
    left-1/2
    top-[31px]
    flex
    h-[52px]
    w-[calc(100%-48px)]
    -translate-x-1/2
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
    left-1/2
    top-[97px]
    h-[28px]
    w-[calc(100%-48px)]
    -translate-x-1/2
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
          <div className="absolute bottom-0 left-0 h-[24px] w-full">

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