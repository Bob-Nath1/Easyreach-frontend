
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Notifprov() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState({
    push: true,
    messages: true,
    providerResponses: true,
    bookingConfirmations: true,
    bookingReminders: true,
    specialOffers: true,
    appUpdates: true,
  });

  const toggleNotification = (name) => {
    setNotifications((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleReset = () => {
    setNotifications({
      push: true,
      messages: true,
      providerResponses: true,
      bookingConfirmations: true,
      bookingReminders: true,
      specialOffers: true,
      appUpdates: true,
    });
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex justify-center">
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
    "
  >

    

        {/* ================= HEADER ================= */}
        <div className="absolute top-[62px] left-0 flex h-[56px] w-full items-center justify-between border-b border-[#E5E7EB] bg-white px-6">

          <div className="flex items-center gap-6">

            {/* Back Button */}
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex h-6 w-6 items-center justify-center"
            >
              <ArrowLeft
                size={24}
                className="text-black"
              />
            </button>

            {/* Title */}
            <h1 className="text-[20px] font-bold leading-6 text-[#1F2937]">
              Notifications Settings
            </h1>

          </div>

          {/* Reset */}
          <button
            type="button"
            onClick={handleReset}
            className="text-[14px] font-bold italic text-[#008000]"
          >
            Reset
          </button>

        </div>


        <div
  className="
    absolute
    left-6
    right-6
    top-[134px]
    bottom-[24px]
    w-auto
    overflow-y-auto
    overflow-x-hidden
    pb-6
    scrollbar-hide
  "
>

          {/* ================= PUSH NOTIFICATIONS ================= */}
          <div className="relative flex h-[90px] items-center justify-between rounded-[15px] bg-[#F0FDF4] px-4">

            <div className="flex flex-col gap-[15px]">

              <h2 className="text-[16px] font-bold italic text-[#1F2937]">
                Push Notifications
              </h2>

              <p className="text-[12px] text-[#6B7280]">
                Disable to stop all notifications except critical account alerts
              </p>

            </div>

            <Toggle
              enabled={notifications.push}
              onClick={() => toggleNotification("push")}
            />

          </div>


          {/* ================= MESSAGES ================= */}
          <div className="mt-[39px]">

            <p className="mb-[12px] text-[12px] font-bold text-[#6B7280]">
              MESSAGES
            </p>

            <NotificationRow
              title="New Messages"
              enabled={notifications.messages}
              onClick={() => toggleNotification("messages")}
              disabled={!notifications.push}
            />

          </div>


          {/* ================= DIVIDER ================= */}
          <div className="my-[16px] h-px w-full bg-[#E5E7EB]" />


          {/* ================= REQUESTS & BOOKINGS ================= */}
          <div>

            <p className="mb-[12px] text-[12px] font-bold text-[#6B7280]">
              REQUESTS & BOOKINGS
            </p>

            <div className="flex flex-col gap-2">

              <NotificationRow
                title="Provider Responses"
                enabled={notifications.providerResponses}
                onClick={() => toggleNotification("providerResponses")}
                disabled={!notifications.push}
              />

              <NotificationRow
                title="Booking Confirmations"
                enabled={notifications.bookingConfirmations}
                onClick={() => toggleNotification("bookingConfirmations")}
                disabled={!notifications.push}
              />

              <NotificationRow
                title="Booking Reminders"
                enabled={notifications.bookingReminders}
                onClick={() => toggleNotification("bookingReminders")}
                disabled={!notifications.push}
              />

            </div>

          </div>


          {/* ================= DIVIDER ================= */}
          <div className="my-[16px] h-px w-full bg-[#E5E7EB]" />


          {/* ================= PROMOTIONS ================= */}
          <div>

            <p className="mb-[12px] text-[12px] font-bold text-[#6B7280]">
              PROMOTIONS
            </p>

            <div className="flex flex-col gap-2">

              <NotificationRow
                title="Special Offers & Deals"
                enabled={notifications.specialOffers}
                onClick={() => toggleNotification("specialOffers")}
                disabled={!notifications.push}
              />

              <NotificationRow
                title="App Updates & Tips"
                enabled={notifications.appUpdates}
                onClick={() => toggleNotification("appUpdates")}
                disabled={!notifications.push}
              />

            </div>

          </div>

        </div>


        {/* ================= HOME INDICATOR ================= */}
       <div className="absolute bottom-0 left-0 z-50 flex h-6 w-full items-center justify-center bg-white">

          <div className="h-1 w-[108px] rounded-xl bg-[#1F2937]" />

        </div>

      </div>
    </div>
  );
}


/* =====================================================
   NOTIFICATION ROW COMPONENT
===================================================== */

function NotificationRow({
  title,
  enabled,
  onClick,
  disabled = false,
}) {
  return (
    <div
      className={`flex h-[56px] w-full items-center justify-between rounded-lg bg-white px-4 transition ${
        disabled ? "opacity-50" : ""
      }`}
    >

      <span className="text-[14px] text-[#1F2937]">
        {title}
      </span>

      <Toggle
        enabled={enabled}
        onClick={onClick}
        disabled={disabled}
      />

    </div>
  );
}


/* =====================================================
   TOGGLE COMPONENT
===================================================== */

function Toggle({
  enabled,
  onClick,
  disabled = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`relative h-[28px] w-[48px] rounded-full transition-all duration-300 ${
        enabled
          ? "bg-[#008000]"
          : "bg-[#D1D5DB]"
      } ${
        disabled
          ? "cursor-not-allowed"
          : "cursor-pointer"
      }`}
    >

      <span
        className={`absolute top-[2px] h-[24px] w-[24px] rounded-full bg-white shadow-md transition-all duration-300 ${
          enabled
            ? "left-[22px]"
            : "left-[2px]"
        }`}
      />

    </button>
  );
}


export default Notifprov;

