import React from "react";
import { MapPin, ShieldCheck, Navigation, Target, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Location() {
  const navigate = useNavigate();

  // =========================
  // ALLOW LOCATIO
  // =========================
const handleAllowLocation = () => {
  if (!navigator.geolocation) {
    alert("Location is not supported by your browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log("Latitude:", position.coords.latitude);
      console.log("Longitude:", position.coords.longitude);

      // Move to Enter Location page
      navigate("/enter-location");
    },
    (error) => {
      console.log("Location error:", error);

      if (error.code === error.PERMISSION_DENIED) {
        alert("Location permission was denied.");
      } else {
        alert("Unable to get your location.");
      }
    }
  );
};

  // =========================
  // ENTER LOCATION MANUALLY
  // =========================
  const handleManualLocation = () => {
    console.log("Enter location manually");

    // Change this route when you create the manual location page.
    // navigate("/manual-location");
  };

  // =========================
  // SKIP
  // =========================
  const handleSkip = () => {
    console.log("Location skipped");

    // Change this route to whatever comes next.
    // navigate("/home");
  };

  return (
    <div className="relative w-[428px] h-[926px] bg-white rounded-[35px] overflow-hidden mx-auto">

      {/* =========================
          STATUS BAR
      ========================== */}
      <div className="absolute top-0 left-0 w-full h-[62px] px-4 flex items-center justify-between">

        {/* Time */}
        <span className="w-[37px] text-center text-[17px] leading-[22px] font-semibold text-black">
          9:41
        </span>

        {/* Status icons */}
        <div className="flex items-center justify-end gap-[7px]">

          {/* Cellular */}
          <div className="flex items-end gap-[2px] h-[14px]">
            <span className="w-[3px] h-[5px] bg-black rounded-sm" />
            <span className="w-[3px] h-[8px] bg-black rounded-sm" />
            <span className="w-[3px] h-[11px] bg-black rounded-sm" />
            <span className="w-[3px] h-[14px] bg-black rounded-sm" />
          </div>

          {/* WiFi */}
          <div className="text-black text-[15px] leading-none">
            ◔
          </div>

          {/* Battery */}
          <div className="relative w-[27px] h-[13px]">

            <div className="absolute left-0 top-[1px] w-[25px] h-[12px] border border-black/40 rounded-[4px]" />

            <div className="absolute left-[2px] top-[3px] w-[21px] h-[8px] bg-black rounded-[2px]" />

            <div className="absolute right-[-2px] top-[4px] w-[2px] h-[5px] bg-black/40 rounded-r" />

          </div>
        </div>
      </div>


      {/* =========================
          LOCATION ICON
      ========================== */}
      <div className="absolute top-[125px] left-1/2 -translate-x-1/2 w-[167px] h-[167px]">

        {/* Outer light green circle */}
        <div className="absolute inset-0 rounded-full bg-[rgba(0,128,0,0.05)]" />

        {/* Ring 1 */}
        <div className="absolute inset-[10%] rounded-full border-[1.336px] border-[#008000]" />

        {/* Ring 2 */}
        <div className="absolute inset-[20%] rounded-full border-[1.336px] border-[#008000]" />

        {/* Ring 3 */}
        <div className="absolute inset-[30%] rounded-full border-[1.336px] border-[#008000]" />

        {/* Location pin */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img
          src="/Location.png"
          alt="Connect and chat"
          className="w-full h-full object-cover"
        />
        </div>

      </div>


      {/* =========================
          TITLE
      ========================== */}
      <h1 className="absolute top-[315px] left-1/2 -translate-x-1/2 w-[188px] text-center text-[24px] leading-[29px] font-bold text-[#1F2937]">
        Enable Location
      </h1>


      {/* =========================
          DESCRIPTION
      ========================== */}
      <p className="absolute top-[360px] left-1/2 -translate-x-1/2 w-[380px] text-center text-[16px] leading-[25px] font-normal text-[#6B7280]">
        Help us find service providers near you. Your location is only used
        to match you with nearby services.
      </p>


      {/* =========================
          PRIVACY NOTE
      ========================== */}
      <div className="absolute top-[443px] left-1/2 -translate-x-1/2 w-[337px] h-[68px] bg-[#F0FDF4] rounded-[8px] px-4 flex items-start gap-4">

        {/* Shield icon */}
        <ShieldCheck
          size={21}
          className="mt-[3px] shrink-0 text-[#008000]"
          strokeWidth={2}
        />

        {/* Privacy text */}
        <p className="text-[13px] leading-[16px] font-normal text-[#008000] pt-[1px]">
          Your privacy is protected. Location is never
          <br />
          shared without your permission.
        </p>

      </div>


      {/* =========================
          BENEFITS
      ========================== */}
      <div className="absolute top-[535px] left-[46px] w-[272px] flex flex-col gap-4">

        {/* Benefit 1 */}
        <div className="flex items-center gap-2 h-[40px]">

          <div className="w-[40px] h-[40px] shrink-0 rounded-[10px] bg-gradient-to-br from-[#00C48C] to-[#008000] flex items-center justify-center">
            <img
          src="/Find.png"
          alt="Connect and chat"
          className="w-5 h-5 object-cover"
        />
          </div>

          <span className="text-[15px] leading-[18px] font-normal text-[#374151] whitespace-nowrap">
            Find nearest providers instantly
          </span>

        </div>


        {/* Benefit 2 */}
        <div className="flex items-center gap-2 h-[40px]">

          <div className="w-[40px] h-[40px] shrink-0 rounded-[10px] bg-gradient-to-br from-[#00C48C] to-[#008000] flex items-center justify-center">
              <img
          src="/distance.png"
          alt="Connect and chat"
          className="w-5 h-2 object-cover"
        />
          </div>

          <span className="text-[15px] leading-[18px] font-normal text-[#374151] whitespace-nowrap">
            Accurate distance estimates
          </span>

        </div>


        {/* Benefit 3 */}
        <div className="flex items-center gap-2 h-[40px]">

          <div className="w-[40px] h-[40px] shrink-0 rounded-[10px] bg-gradient-to-br from-[#00C48C] to-[#008000] flex items-center justify-center">
             <img
          src="/matching.png"
          alt="Connect and chat"
          className="w-4 h-4 object-cover"
        />
          </div>

          <span className="text-[15px] leading-[18px] font-normal text-[#374151] whitespace-nowrap">
            Better service matching
          </span>

        </div>

      </div>


      {/* =========================
          BUTTONS
      ========================== */}
      <div className="absolute top-[719px] left-[24px] w-[380px] flex flex-col gap-4">

        {/* Allow Location */}
        <button
          type="button"
          onClick={handleAllowLocation}
          className="
            w-[380px]
            h-[52px]
            rounded-full
            bg-[#008000]
            border-2
            border-[#008000]
            flex
            items-center
            justify-center
            gap-[10px]
            px-[10px]
            py-3
            hover:bg-[#006b00]
            transition-colors
          "
        >
            <img
          src="/address.png"
          alt="Connect and chat"
          className="w-3 h-4"
        />

          <span className="text-[14px] leading-[28px] font-semibold text-white">
            Allow Location Access
          </span>
        </button>


        {/* Enter Manually */}
        <button
          type="button"
          onClick={handleManualLocation}
          className="
            w-[380px]
            h-[52px]
            rounded-full
            bg-white
            border
            border-[#008000]
            flex
            items-center
            justify-center
            gap-[10px]
            px-[10px]
            py-3
            hover:bg-[#F0FDF4]
            transition-colors
          "
        >
             <img
          src="/writing.png"
          alt="Connect and chat"
          className="w-4 h-4"
        />

          <span className="text-[14px] leading-[28px] font-semibold text-[#008000]">
            Enter Location Manually
          </span>
        </button>

      </div>


      {/* =========================
          SKIP FOR NOW
      ========================== */}
      <button
        type="button"
        onClick={handleSkip}
        className="
          absolute
          top-[863px]
          left-1/2
          -translate-x-1/2
          text-[14px]
          leading-[17px]
          font-normal
          text-[#1F2937]
          hover:text-[#008000]
          transition-colors
        "
      >
        Skip for Now
      </button>


      {/* =========================
          BOTTOM HOME INDICATOR
      ========================== */}
      <div className="absolute bottom-0 left-0 w-full h-[24px] bg-white flex items-center justify-center">

        <div className="w-[108px] h-[4px] bg-[#1F2937] rounded-full" />

      </div>

    </div>
  );
}

export default Location;