import React from "react";
import { Bell, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Notification() {
 const navigate = useNavigate();

  const handleEnableNotification = () => {
   
    console.log("Enable notification clicked");

    // Add navigation here later if needed
    navigate("/profile");
  };

  const handleNotNow = () => {
    console.log("Not now clicked");

    // Add navigation here later if needed
    navigate("/profile");
  };

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center">

      {/* =====================================================
          DEVICE FRAME
          Figma size: 428 × 926
      ====================================================== */}
      <div
        className="
          relative
          w-[428px]
          h-[926px]
          max-w-full
          max-h-screen
          overflow-hidden
          rounded-[35px]
          bg-white
        "
      >
         <div className="absolute inset-0 overflow-y-auto">

        {/* =====================================================
            STATUS BAR
        ====================================================== */}
        <div className="absolute left-0 top-0 flex h-[62px] w-full items-center justify-between px-4">

          {/* Time */}
          <div className="flex h-[22px] w-[121px] items-center justify-center pt-[2px]">
            <span className="text-[17px] font-semibold leading-[22px] text-black">
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


        {/* =====================================================
            NOTIFICATION ICON
        ====================================================== */}
        <div
          className="
            absolute
            left-1/2
            top-[122px]
            flex
            h-[60px]
            w-[60px]
            -translate-x-1/2
            items-center
            justify-center
          "
        >
          <img
          src="/bell.png"
          alt="Easy Reach Logo"
          className="w-8 ml-5"
        />
        </div>


        {/* =====================================================
            TITLE + DESCRIPTION
        ====================================================== */}
        <div
          className="
            absolute
            left-[28px]
            top-[273px]
            flex
            w-[380px]
            flex-col
            items-center
            gap-[16px]
          "
        >

          <h1
            className="
              w-[380px]
              text-center
              text-[24px]
              font-bold
              leading-[12px]
              text-[#1F2937]
            "
          >
            Stay Updated
          </h1>

          <p
            className="
              w-[328px]
              text-center
              text-[16px]
              font-normal
              leading-[27px]
              text-[#6B7280]
            "
          >
            Get notified when you receive messages, booking requests, and
            important updates. You can customize this later.
          </p>

        </div>


        {/* =====================================================
            NOTIFICATION BENEFITS
        ====================================================== */}
        <div
          className="
            absolute
            left-[32px]
            top-[431px]
            flex
            w-[380px]
            flex-col
            gap-[16px]
          "
        >

          {/* ================= ITEM 1 ================= */}
          <div
            className="
              flex
              h-[56px]
              w-[380px]
              items-center
              gap-[16px]
              rounded-[10px]
              bg-[#F0FDF4]
              p-[16px]
            "
          >

            <div
              className="
                flex
                h-[24px]
                w-[24px]
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#008000]
              "
            >
              <Check
                size={15}
                strokeWidth={3}
                className="text-white"
              />
            </div>

            <span
              className="
                text-[14px]
                font-normal
                leading-[17px]
                text-[#374151]
              "
            >
              New job requests and opportunities
            </span>

          </div>


          {/* ================= ITEM 2 ================= */}
          <div
            className="
              flex
              h-[56px]
              w-[380px]
              items-center
              gap-[16px]
              rounded-[10px]
              bg-[#F0FDF4]
              p-[16px]
            "
          >

            <div
              className="
                flex
                h-[24px]
                w-[24px]
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#008000]
              "
            >
              <Check
                size={15}
                strokeWidth={3}
                className="text-white"
              />
            </div>

            <span
              className="
                text-[14px]
                font-normal
                leading-[17px]
                text-[#374151]
              "
            >
              Messages from customers/providers
            </span>

          </div>


          {/* ================= ITEM 3 ================= */}
          <div
            className="
              flex
              h-[56px]
              w-[380px]
              items-center
              gap-[16px]
              rounded-[10px]
              bg-[#F0FDF4]
              p-[16px]
            "
          >

            <div
              className="
                flex
                h-[24px]
                w-[24px]
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#008000]
              "
            >
              <Check
                size={15}
                strokeWidth={3}
                className="text-white"
              />
            </div>

            <span
              className="
                text-[14px]
                font-normal
                leading-[17px]
                text-[#374151]
              "
            >
              Booking reminders and updates
            </span>

          </div>

        </div>


        {/* =====================================================
            BOTTOM BUTTON SECTION
        ====================================================== */}
        <div
          className="
            absolute
            left-[24px]
            top-[787px]
            flex
            h-[96px]
            w-[380px]
            flex-col
            items-center
            gap-[16px]
          "
        >

          {/* Enable Notification */}
          <button
            type="button"
            onClick={handleEnableNotification}
            className="
              box-border
              flex
              h-[52px]
              w-[380px]
              items-center
              justify-center
              gap-[10px]
              rounded-[99px]
              border-2
              border-[#008000]
              bg-[#008000]
              px-[10px]
              py-[12px]
              transition
              hover:bg-[#006B00]
              active:scale-[0.98]
            "
          >

            <Bell
              size={20}
              strokeWidth={2}
              className="text-white"
            />

            <span
              className="
                text-[14px]
                font-semibold
                leading-[28px]
                text-white
              "
            >
              Enable Notification
            </span>

          </button>


          {/* Not Now */}
          <button
            type="button"
            onClick={handleNotNow}
            className="
              h-[28px]
              w-[380px]
              text-center
              text-[14px]
              font-semibold
              italic
              leading-[28px]
              text-[#6B7280]
              underline
            "
          >
            Not Now
          </button>

        </div>


        {/* =====================================================
            HOME INDICATOR
        ====================================================== */}
        <div
          className="
            absolute
            bottom-0
            left-1/2
            h-[24px]
            w-[412px]
            -translate-x-1/2
          "
        >
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

export default Notification;