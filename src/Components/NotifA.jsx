import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotifA = () => {
  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    messages: true,
    requests: true,
    promotions: true,
    responses: true,
    confirmations: true,
    reminders: true,
    offers: true,
    updates: true,
  });

  const toggleSetting = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const resetSettings = () => {
    setSettings({
      messages: true,
      requests: true,
      promotions: true,
      responses: true,
      confirmations: true,
      reminders: true,
      offers: true,
      updates: true,
    });
  };

  const Toggle = ({ enabled, onClick }) => (
    <button
      onClick={onClick}
      type="button"
      aria-label="Toggle notification"
      className={`relative h-[28px] w-[48px] rounded-full transition-colors duration-200 ${
        enabled ? "bg-[#008000]" : "bg-[#D1D5DB]"
      }`}
    >
      <span
        className={`absolute top-[2px] h-[24px] w-[24px] rounded-full bg-white shadow-sm transition-all duration-200 ${
          enabled ? "left-[22px]" : "left-[2px]"
        }`}
      />
    </button>
  );

  const NotificationRow = ({ label, settingKey }) => (
    <div className="flex h-[56px] w-full items-center justify-between rounded-[8px] bg-white px-[16px]">
      <span className="font-['Inter'] text-[14px] font-normal leading-[17px] text-[#1F2937]">
        {label}
      </span>

      <Toggle
        enabled={settings[settingKey]}
        onClick={() => toggleSetting(settingKey)}
      />
    </div>
  );

  return (
    <div className="relative mx-auto h-[926px] w-[428px] overflow-hidden rounded-[35px] bg-[#F9FAFB] font-['Inter']">

      {/* ================= STATUS BAR ================= */}
      <div className="absolute left-0 top-0 flex h-[62px] w-full items-center justify-between px-[16px]">

        {/* Time */}
        <div className="flex h-[22px] w-[121px] items-center justify-start pt-[2px]">
          <span className="text-center font-['SF_Pro'] text-[17px] font-semibold leading-[22px] text-black">
            9:41
          </span>
        </div>

        {/* Network / Battery */}
        <div className="flex h-[22px] w-[121px] items-center justify-end gap-[7px]">

          {/* Cellular */}
          <div className="flex h-[13px] items-end gap-[2px]">
            <span className="h-[5px] w-[3px] rounded-sm bg-black" />
            <span className="h-[7px] w-[3px] rounded-sm bg-black" />
            <span className="h-[10px] w-[3px] rounded-sm bg-black" />
            <span className="h-[13px] w-[3px] rounded-sm bg-black" />
          </div>

          {/* Wifi */}
          <div className="relative h-[13px] w-[18px]">
            <div className="absolute left-[2px] top-[1px] h-[10px] w-[14px] rounded-t-full border-t-[3px] border-black" />
            <div className="absolute left-[5px] top-[5px] h-[7px] w-[8px] rounded-t-full border-t-[3px] border-black" />
            <div className="absolute bottom-0 left-[8px] h-[3px] w-[3px] rounded-full bg-black" />
          </div>

          {/* Battery */}
          <div className="relative h-[13px] w-[27px] rounded-[4px] border border-black/35">
            <div className="absolute left-[2px] top-[2px] h-[7px] w-[21px] rounded-[2px] bg-black" />
            <div className="absolute right-[-3px] top-[4px] h-[5px] w-[2px] rounded-r bg-black/40" />
          </div>
        </div>
      </div>

      {/* ================= HEADER ================= */}
      <div className="absolute left-1/2 top-[62px] flex h-[56px] w-[430px] -translate-x-1/2 items-center justify-between border border-[#E5E7EB] bg-white px-[24px]">

        <div className="flex items-center gap-[24px]">

          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            className="flex h-[24px] w-[24px] items-center justify-center"
          >
            <ArrowLeft
              size={24}
              strokeWidth={2}
              className="text-black"
            />
          </button>

          {/* Title */}
          <h1 className="font-['Inter'] text-[20px] font-bold leading-[24px] text-[#1F2937]">
            Notifications Settings
          </h1>
        </div>

        {/* Reset */}
        <button
          onClick={resetSettings}
          className="font-['Inter'] text-[14px] font-bold italic leading-[17px] text-[#008000]"
        >
          Reset
        </button>
      </div>

      {/* ================= PUSH NOTIFICATIONS ================= */}
      <div className="absolute left-1/2 top-[134px] flex h-[90px] w-[380px] -translate-x-1/2 items-center rounded-[15px] bg-[#F0FDF4] px-[16px] py-[10px]">

        <div className="flex w-full flex-col gap-[15px] pr-[65px]">
          <h2 className="font-['Inter'] text-[16px] font-bold italic leading-[19px] text-[#1F2937]">
            Push Notifications
          </h2>

          <p className="font-['Inter'] text-[12px] font-normal leading-[15px] text-[#6B7280]">
            Disable to stop all notifications except critical account alerts
          </p>
        </div>

        <div className="absolute right-[16px] top-[31px]">
          <Toggle
            enabled={settings.messages}
            onClick={() => toggleSetting("messages")}
          />
        </div>
      </div>

      {/* ================= SECTION LABEL ================= */}

      <div className="absolute left-[24px] top-[248px]">
        <span className="font-['Inter'] text-[12px] font-bold leading-[15px] text-[#6B7280]">
          MESSAGES
        </span>
      </div>

      {/* ================= NEW MESSAGES ================= */}
      <div className="absolute left-1/2 top-[279px] w-[380px] -translate-x-1/2">
        <NotificationRow
          label="New Messages"
          settingKey="messages"
        />
      </div>

      {/* Divider */}
      <div className="absolute left-1/2 top-[351px] w-[380px] -translate-x-1/2 border-t border-[#E5E7EB]" />

      {/* ================= REQUESTS ================= */}

      <div className="absolute left-[24px] top-[367px]">
        <span className="font-['Inter'] text-[12px] font-bold leading-[15px] text-[#6B7280]">
          REQUESTS & BOOKINGS
        </span>
      </div>

      {/* Provider Responses */}
      <div className="absolute left-1/2 top-[398px] w-[380px] -translate-x-1/2">
        <NotificationRow
          label="Provider Responses"
          settingKey="responses"
        />
      </div>

      {/* Booking Confirmations */}
      <div className="absolute left-1/2 top-[462px] w-[380px] -translate-x-1/2">
        <NotificationRow
          label="Booking Confirmations"
          settingKey="confirmations"
        />
      </div>

      {/* Booking Reminders */}
      <div className="absolute left-1/2 top-[526px] w-[380px] -translate-x-1/2">
        <NotificationRow
          label="Booking Reminders"
          settingKey="reminders"
        />
      </div>

      {/* Divider */}
      <div className="absolute left-1/2 top-[598px] w-[380px] -translate-x-1/2 border-t border-[#E5E7EB]" />

      {/* ================= PROMOTIONS ================= */}

      <div className="absolute left-[24px] top-[615px]">
        <span className="font-['Inter'] text-[12px] font-bold leading-[15px] text-[#6B7280]">
          PROMOTIONS
        </span>
      </div>

      {/* Special Offers */}
      <div className="absolute left-1/2 top-[645px] w-[380px] -translate-x-1/2">
        <NotificationRow
          label="Special Offers & Deals"
          settingKey="offers"
        />
      </div>

      {/* App Updates */}
      <div className="absolute left-1/2 top-[709px] w-[380px] -translate-x-1/2">
        <NotificationRow
          label="App Updates & Tips"
          settingKey="updates"
        />
      </div>

      {/* ================= HOME INDICATOR ================= */}
      <div className="absolute bottom-[7px] left-1/2 h-[4px] w-[108px] -translate-x-1/2 rounded-[12px] bg-[#1F2937]" />

    </div>
  );
};

export default NotifA;