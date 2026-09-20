import React from "react";
import {
  ArrowLeft,
  Check,
  MessageCircle,
  Phone,
  MapPin,
  CalendarDays,
  Bell,
  ClipboardList,
  Navigation,
  MoreVertical,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

function BookKeeping() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const role = searchParams.get("role");

  const isProvider = role === "provider";

  return (
    <div className="min-h-screen w-full bg-gray-100 flex justify-center">
      {/* ================= MOBILE SCREEN ================= */}
      <div
  className="
    relative
    mx-auto
    h-[926px]
    w-full
    sm:w-[640px]
    md:w-[768px]
    lg:w-[1024px]
    xl:w-[1280px]
    2xl:w-[1536px]
    md:h-[1026px]
    lg:h-[1200px]
    xl:h-[1200px]
    2xl:h-[1200px]
    overflow-hidden
    rounded-[35px]
    bg-[#F9FAFB]
    font-[Inter,sans-serif]
  "
>

        {/* ================= HEADER ================= */}
        <div className="absolute top-[62px] left-0 w-full h-[36px] px-6 flex items-center justify-between">
          {/* Back */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="
              w-9
              h-9
              flex
              items-center
              justify-center
              rounded-full
              hover:bg-gray-100
              active:scale-95
              transition
            "
          >
            <ArrowLeft
              size={22}
              strokeWidth={2}
              className="text-gray-800"
            />
          </button>

          <h1 className="text-[18px] font-bold text-gray-800">
            Booking
          </h1>

          <button
            type="button"
            className="w-9 h-9 flex items-center justify-center"
          >
            <MoreVertical
              size={19}
              strokeWidth={2}
              className="text-gray-700"
            />
          </button>
        </div>

        {/* ================= SCROLLABLE CONTENT ================= */}
      <div
  className="
    absolute
    left-6
    right-6
    top-[98px]
    bottom-[24px]
    overflow-y-auto
    overflow-x-hidden
    scrollbar-hide
    pb-[40px]
  "
>
          <div className="flex flex-col items-start gap-[32px] w-full">
            {/* ================= CONFIRMATION SECTION ================= */}
            <div className="w-full flex flex-col gap-[24px]">
              {/* Heading */}
              <div className="w-full flex flex-col items-center gap-[24px]">
                <h2
                  className="
                    w-full
                    text-center
                    text-[24px]
                    leading-[29px]
                    font-bold
                    italic
                    text-[#1F2937]
                  "
                >
                  Booking Confirmed! 🎉
                </h2>

                <p
                  className="
                    w-full
                    text-[14px]
                    leading-[20px]
                    font-normal
                    text-[#6B7280]
                  "
                >
                  Your booking with Tunde Motors has been confirmed.
                  They will arrive at your location on time.
                </p>
              </div>

              {/* Booking ID */}
              <div
                className="
                  w-full
                  h-[53px]
                  bg-[#D1FAE5]
                  rounded-[15px]
                  px-4
                  flex
                  items-center
                  justify-between
                "
              >
                <span className="text-[14px] leading-[17px] font-bold italic text-[#008000]">
                  Booking ID: BK-2847
                </span>

                <ClipboardList
                  size={20}
                  strokeWidth={2.5}
                  className="text-[#008000]"
                />
              </div>
            </div>

            {/* ================= BOOKING TIMELINE ================= */}
            <div className="relative w-full h-[256px]">
              {/* Timeline line */}
              <div
                className="
                  absolute
                  left-[15px]
                  top-[11px]
                  w-[2px]
                  h-[222px]
                  bg-[#E5E7EB]
                "
              />

              {/* Timeline 1 */}
              <div className="absolute left-0 top-0 flex gap-[12px]">
                <div
                  className="
                    relative
                    z-10
                    w-[32px]
                    h-[32px]
                    rounded-full
                    bg-[#008000]
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Check
                    size={17}
                    strokeWidth={3}
                    className="text-white"
                  />
                </div>

                <div className="flex flex-col gap-[8px]">
                  <span className="text-[14px] leading-[17px] font-bold italic text-[#1F2937]">
                    Booking Confirmed
                  </span>

                  <span className="text-[12px] leading-[15px] text-[#6B7280]">
                    Just now
                  </span>
                </div>
              </div>

              {/* Timeline 2 */}
              <div className="absolute left-0 top-[72px] flex gap-[12px]">
                <div
                  className="
                    relative
                    z-10
                    w-[32px]
                    h-[32px]
                    rounded-full
                    bg-[#008000]/70
                    flex
                    items-center
                    justify-center
                  "
                >
                  <ClipboardList
                    size={17}
                    strokeWidth={2.5}
                    className="text-[#1F2937]"
                  />
                </div>

                <div className="flex flex-col gap-[8px]">
                  <span className="text-[14px] leading-[17px] font-bold italic text-[#1F2937]">
                    Provider Preparing
                  </span>

                  <span className="text-[12px] leading-[15px] text-[#6B7280]">
                    Timi is getting ready for your service
                  </span>
                </div>
              </div>

              {/* Timeline 3 */}
              <div className="absolute left-0 top-[144px] flex gap-[12px]">
                <div
                  className="
                    relative
                    z-10
                    w-[32px]
                    h-[32px]
                    rounded-full
                    bg-[#E5E7EB]
                    flex
                    items-center
                    justify-center
                  "
                >
                  <CalendarDays
                    size={17}
                    strokeWidth={2.5}
                    className="text-[#9CA3AF]"
                  />
                </div>

                <div className="flex flex-col gap-[8px]">
                  <span className="text-[14px] leading-[17px] font-bold italic text-[#1F2937]">
                    Service Scheduled
                  </span>

                  <span className="text-[12px] leading-[15px] text-[#6B7280]">
                    Today at 3:00 PM
                  </span>
                </div>
              </div>

              {/* Timeline 4 */}
              <div className="absolute left-0 top-[216px] flex gap-[12px]">
                <div
                  className="
                    relative
                    z-10
                    w-[32px]
                    h-[32px]
                    rounded-full
                    bg-[#E5E7EB]
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Check
                    size={17}
                    strokeWidth={2.5}
                    className="text-[#9CA3AF]"
                  />
                </div>

                <div className="flex flex-col gap-[8px]">
                  <span className="text-[14px] leading-[17px] font-bold italic text-[#1F2937]">
                    Service Completed
                  </span>

                  <span className="text-[12px] leading-[15px] text-[#6B7280]">
                    Estimated by 5:00 PM
                  </span>
                </div>
              </div>
            </div>

            {/* ================= ACTION BUTTONS ================= */}
            <div className="w-full flex flex-col gap-[12px]">
              {/* Row 1 */}
              <div className="w-full h-[120px] grid grid-cols-2 gap-[12px]">
  <button
    type="button"
    className="
      w-full
      h-[120px]
      bg-white
      rounded-[15px]
      p-4
      flex
      flex-col
      items-center
      gap-4
      active:scale-[0.98]
      transition
    "
  >
                  <div className="w-[48px] h-[48px] rounded-full bg-[#D1FAE5] flex items-center justify-center">
                    <ClipboardList
                      size={23}
                      strokeWidth={2.2}
                      className="text-[#008000]"
                    />
                  </div>

                  <span className="w-full text-center text-[14px] leading-[17px] font-bold italic text-[#1F2937]">
                    View Details
                  </span>
                </button>

                {/* Message Provider */}
                <button
                  type="button"
                  className="
                    w-[184px]
                    h-[120px]
                    bg-white
                    rounded-[15px]
                    p-4
                    flex
                    flex-col
                    items-center
                    gap-4
                    active:scale-[0.98]
                    transition
                  "
                >
                  <div className="w-[48px] h-[48px] rounded-full bg-[#D1FAE5] flex items-center justify-center">
                    <MessageCircle
                      size={23}
                      strokeWidth={2.2}
                      className="text-[#008000]"
                    />
                  </div>

                  <span className="w-full text-center text-[14px] leading-[17px] font-bold italic text-[#1F2937]">
  {isProvider ? "Message Seeker" : "Message Provider"}
</span>
                </button>
              </div>

              {/* Row 2 */}
              <div className="w-full h-[120px] grid grid-cols-2 gap-[12px]">
  <button
    type="button"
    className="
      w-full
      h-[120px]
      bg-white
      rounded-[15px]
      p-4
      flex
      flex-col
      items-center
      gap-4
      active:scale-[0.98]
      transition
    "
  >
                  <div className="w-[48px] h-[48px] rounded-full bg-[#D1FAE5] flex items-center justify-center">
                    <Phone
                      size={23}
                      strokeWidth={2.2}
                      className="text-[#008000]"
                    />
                  </div>

                  <span className="w-full text-center text-[14px] leading-[17px] font-bold italic text-[#1F2937]">
  {isProvider ? "Call Seeker" : "Call Provider"}
</span>
                </button>

                {/* Get Directions */}
                <button
                  type="button"
                  className="
                    w-[184px]
                    h-[120px]
                    bg-white
                    rounded-[15px]
                    p-4
                    flex
                    flex-col
                    items-center
                    gap-4
                    active:scale-[0.98]
                    transition
                  "
                >
                  <div className="w-[48px] h-[48px] rounded-full bg-[#D1FAE5] flex items-center justify-center">
                    <Navigation
                      size={23}
                      strokeWidth={2.2}
                      className="text-[#008000]"
                    />
                  </div>

                  <span className="w-full text-center text-[14px] leading-[17px] font-bold italic text-[#1F2937]">
                    Get Directions
                  </span>
                </button>
              </div>
            </div>

            {/* ================= DONE BUTTON ================= */}
            <button
              type="button"
              onClick={() => navigate("/feedback")}
              className="
                w-full
                h-[52px]
                rounded-full
                bg-[#008000]
                border-2
                border-[#008000]
                px-[10px]
                py-3
                flex
                items-center
                justify-center
                text-white
                active:scale-[0.98]
                transition
              "
            >
              <span className="text-[14px] leading-[28px] font-semibold">
                Done
              </span>
            </button>

            {/* ================= ADD TO CALENDAR ================= */}
            <button
              type="button"
              className="
                w-full
                flex
                items-center
                justify-center
                gap-[6px]
              "
            >
              <CalendarDays
                size={16}
                strokeWidth={2}
                className="text-[#6B7280]"
              />

              <span className="text-[14px] leading-[17px] font-bold italic text-[#6B7280]">
                Add to Calendar
              </span>
            </button>

            {/* ================= NOTIFICATION ================= */}
            <div
              className="
                w-full
                h-[72px]
                px-4
                flex
                items-center
                gap-2
              "
            >
              {/* Bell */}
              <div className="w-[40px] h-[40px] rounded-full bg-[#008000] flex items-center justify-center shrink-0">
                <Bell
                  size={20}
                  strokeWidth={2.2}
                  className="text-white"
                />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0 flex items-center gap-[12px]">
                <span className="text-[12px] leading-[15px] text-[#6B7280]">
                  We'll notify you when the provider is on the way
                </span>

                <button
                  type="button"
                  className="text-[12px] leading-[15px] font-bold italic text-[#008000] shrink-0"
                >
                  Manage
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= IPHONE HOME INDICATOR ================= */}
      <div
  className="
    absolute
    bottom-0
    left-0
    z-50
    h-[24px]
    w-full
    flex
    items-center
    justify-center
    bg-[#F9FAFB]
  "
>
          <div className="w-[108px] h-[4px] rounded-[12px] bg-[#1F2937]" />
        </div>
      </div>
    </div>
  );
}

export default BookKeeping;