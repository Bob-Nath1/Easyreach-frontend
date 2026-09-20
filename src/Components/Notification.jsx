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
         <div className="absolute inset-0 overflow-hidden">

       
  <div className="relative h-full w-full -translate-y-[123px]">


        {/* =====================================================
            NOTIFICATION ICON
        ====================================================== */}
        <div
          className="
            absolute
            left-1/2
            top-[200px]
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
          className="w-8"
        />
        </div>


        {/* =====================================================
            TITLE + DESCRIPTION
        ====================================================== */}
      <div
  className="
    absolute
    left-1/2
    -translate-x-1/2
    top-[273px]
    flex
    w-[calc(100%-48px)]
    max-w-[380px]
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
    left-1/2
    -translate-x-1/2
    top-[431px]
    flex
    w-[calc(100%-48px)]
    max-w-[380px]
    flex-col
    gap-[16px]
  "
>

          {/* ================= ITEM 1 ================= */}
          <div
            className="
              flex
              h-[56px]
              w-full
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
              w-full
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
              w-full
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
    left-1/2
    -translate-x-1/2
    top-[787px]
    flex
    h-[96px]
    w-[calc(100%-48px)]
    max-w-[380px]
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
              w-full
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
</div>

        {/* =====================================================
            HOME INDICATOR
        ====================================================== */}
        <div
  className="
    absolute
    bottom-0
    left-0
    h-[24px]
    w-full
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