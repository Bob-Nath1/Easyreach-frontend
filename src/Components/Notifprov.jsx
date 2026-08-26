
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
    <div className="min-h-screen bg-gray-100 flex justify-center">
      {/* PHONE FRAME */}
      <div className="relative w-full max-w-[428px] min-h-[926px] bg-[#F9FAFB] overflow-hidden rounded-[35px]">

        {/* ================= STATUS BAR ================= */}
        <div className="absolute top-0 left-0 z-20 flex h-[62px] w-full items-center justify-between bg-white px-4 pt-[2px]">

          {/* Time */}
          <div className="flex h-[22px] w-[121px] items-center justify-center">
            <span className="text-[17px] font-semibold text-black">
              9:41
            </span>
          </div>

          {/* Status Icons */}
          <div className="flex w-[121px] items-center justify-end gap-[7px]">

            {/* Cellular */}
            <div className="flex h-[13px] items-end gap-[2px]">
              <span className="h-[5px] w-[3px] rounded-sm bg-black" />
              <span className="h-[7px] w-[3px] rounded-sm bg-black" />
              <span className="h-[10px] w-[3px] rounded-sm bg-black" />
              <span className="h-[13px] w-[3px] rounded-sm bg-black" />
            </div>

            {/* WiFi */}
            <div className="relative h-[13px] w-[18px]">
              <div className="absolute left-0 top-0 h-[9px] w-[18px] rounded-t-full border-t-[3px] border-black" />
              <div className="absolute left-[4px] top-[4px] h-[6px] w-[10px] rounded-t-full border-t-[3px] border-black" />
              <div className="absolute bottom-0 left-[7px] h-[3px] w-[3px] rounded-full bg-black" />
            </div>

            {/* Battery */}
            <div className="relative h-[13px] w-[27px]">
              <div className="h-[13px] w-[25px] rounded-[4px] border border-black/40 p-[2px]">
                <div className="h-full w-full rounded-[2px] bg-black" />
              </div>

              <div className="absolute right-0 top-[4px] h-[5px] w-[2px] rounded-r bg-black/40" />
            </div>

          </div>
        </div>


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


        {/* ================= PAGE CONTENT ================= */}
        <div className="absolute left-1/2 top-[134px] w-[380px] -translate-x-1/2">

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
        <div className="absolute bottom-0 left-1/2 flex h-6 w-[412px] -translate-x-1/2 items-center justify-center bg-white">

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

