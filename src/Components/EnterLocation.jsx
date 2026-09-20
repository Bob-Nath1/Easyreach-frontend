import React, { useState } from "react";
import {
  ArrowLeft,
  LocateFixed,
  MapPin,
  Info,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function EnterLocation() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("Ikeja, Lagos");

  const locations = [
    {
      name: "Ikeja, Lagos",
      state: "Lagos State, Nigeria",
    },
    {
      name: "Victoria Island, Lagos",
      state: "Lagos State, Nigeria",
    },
    {
      name: "Lekki, Lagos",
      state: "Lagos State, Nigeria",
    },
  ];

  const handleConfirm = () => {
  navigate("/confirm-location");
};

  return (
    <div className="min-h-screen w-full overflow-hidden bg-white flex items-center justify-center">

      {/* =====================================================
          RESPONSIVE DEVICE FRAME
          Original Figma size = 428 × 926
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

        


        {/* ================= HEADER ================= */}

        <div className="absolute left-[24px] top-[70px] flex h-[49px] w-[257px] items-start gap-6">

          <button
            type="button"
            className="flex h-6 w-6 shrink-0 items-center justify-center"
            onClick={() => window.history.back()}
          >
            <ArrowLeft
              size={24}
              strokeWidth={2}
              className="text-[#1F2937]"
            />
          </button>

          <div className="flex w-[209px] flex-col gap-2">

            <h1 className="text-[20px] font-bold leading-6 text-[#1F2937]">
              Enter Your Location
            </h1>

            <p className="text-[14px] font-medium leading-[17px] text-[#1F2937]">
              Help us find providers near you
            </p>

          </div>
        </div>


        {/* =================================================
            MAIN CONTENT
        ================================================== */}

<div
  className="
    absolute
    left-1/2
    -translate-x-1/2
    top-[135px]
    bottom-[133px]
    w-[calc(100%-48px)]
    overflow-y-auto
    pb-[30px]
  "
>



          {/* ================= LOCATION SEARCH ================= */}

         <div className="flex w-full flex-col gap-[16px]">

            {/* Use Current Location */}

            <button
  type="button"
  onClick={() => {
    setSelectedLocation("Current Location");
  }}
  className="
    flex
    h-[48px]
    w-full
    shrink-0
    rounded-[15px]
    items-center
    justify-center
    gap-2
    border-[1.6px]
    border-[#008000]
    bg-[#F0FDF4]
  "
>
                 <img
          src="/mapicon.png"
          alt="Services near you"
          className="w-4 h-4 object-cover"
        />

              <span className="font-['Arial'] text-[15px] font-bold leading-[17px]  text-[#008000]">
                Use Current Location
              </span>

            </button>


            {/* Search Location */}

            <div className="flex h-[73px] w-full flex-col gap-2 ">

              <label
                htmlFor="location"
                className="text-[14px]  font-bold leading-[17px] text-[#374151]"
              >
                Search Location
              </label>

              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter a location"
                className="
                  box-border
                  h-[48px]
                 w-full
                  border-[1.6px]
                  border-[#E5E7EB]
                  bg-white
                  rounded-[15px]
                  px-4
                  text-[14px]
                  text-[#1F2937]
                  outline-none
                  placeholder:text-[#9CA3AF]
                  focus:border-[#008000]
                "
              />

            </div>

          </div>


          {/* ================= INFORMATION BOX ================= */}

          <div className="mt-[22px] flex h-[95px] w-full">

            {/* Blue line */}

            <div className="h-[95px] w-[4px] shrink-0 bg-[#3B82F6]" />

            {/* Information */}

            <div className="flex h-[92px] flex-1 items-start gap-4 rounded-[15px] bg-[#DBEAFE] p-4">

              <Info
                size={21}
                strokeWidth={2.5}
                className="mt-0.5 shrink-0 text-[#3B82F6]"
              />

              <p className="w-[280px] text-[14px] font-normal leading-5 text-[#1E40AF]">
                Type your location above to see it on the map. You can adjust
                the pin to your exact location.
              </p>

            </div>

          </div>


          {/* ================= MAP ================= */}

          <div className="mt-[22px]">

            <div className="relative h-[229px] w-full overflow-hidden border border-[#008000] bg-[#E5E7EB]">

              {/* Map background */}

              <div className="absolute inset-0 bg-[#EEF2F0]">

                {/* Roads */}
   <img
          src="/map.png"
          alt="Services near you"
          className="w-full h-full object-cover"
        />
               

              </div>


              {/* Map Pin */}

          

            </div>


            {/* ================= LOCATION LIST ================= */}

            <div className="mt-[16px] flex w-full flex-col gap-2 pb-[30px]">
  {locations.map((item) => (
    <button
      key={item.name}
      type="button"
      onClick={() => setSelectedLocation(item.name)}
      className={`
        box-border
        flex
        h-[64px]
        w-full
        shrink-0
        items-center
        gap-4
        rounded-[15px]
        border-[1.5px]
        px-4
        text-left
        transition
        ${
          selectedLocation === item.name
            ? "border-[#008000] bg-[#F0FDF4]"
            : "border-[#E5E7EB] bg-white"
        }
      `}
    >
      <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[10px] bg-[#F9FAFB]">
        <MapPin
          size={24}
          strokeWidth={2}
          className="text-[#10B981]"
        />
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-[15px] font-bold italic leading-[18px] text-[#1F2937]">
          {item.name}
        </span>

        <span className="text-[13px] font-normal leading-4 text-[#6B7280]">
          {item.state}
        </span>
      </div>
    </button>
  ))}
</div>
          </div>

        </div>


        {/* =================================================
            BOTTOM CONFIRM SECTION
        ================================================== */}

       <div className="absolute bottom-0 left-0 h-[133px] w-full bg-white">

          <button
  type="button"
  onClick={handleConfirm}
  className="
    absolute
    left-1/2
    top-4
    flex
    h-[52px]
    w-[calc(100%-48px)]
    sm:w-[592px]
    md:w-[720px]
    lg:w-[976px]
    xl:w-[1232px]
    2xl:w-[1488px]
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
    leading-7
    text-white
    transition
    hover:bg-[#006B00]
    active:scale-[0.98]
  "
>
  Confirm Location
</button>


          {/* Home Indicator */}

          <div className="absolute bottom-0 left-0 h-6 w-full">

            <div className="absolute left-1/2 top-1/2 h-1 w-[108px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-[#1F2937]" />

          </div>

        </div>

      </div>

    </div>
  );
}

export default EnterLocation;