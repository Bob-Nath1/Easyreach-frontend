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
    font-['Inter']
  "
>


      {/* ================= HEADER ================= */}
     <div className="absolute left-0 right-0 top-[62px] flex h-[56px] w-full items-center justify-between border border-[#E5E7EB] bg-white px-[24px]">

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
   <div className="absolute left-6 right-6 top-[134px] flex h-[90px] w-auto items-center rounded-[15px] bg-[#F0FDF4] px-[16px] py-[10px]">

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
      <div className="absolute left-6 right-6 top-[279px] w-auto">
        <NotificationRow
          label="New Messages"
          settingKey="messages"
        />
      </div>

      {/* Divider */}
      <div className="absolute left-6 right-6 top-[351px] border-t border-[#E5E7EB]" />

      {/* ================= REQUESTS ================= */}

      <div className="absolute left-[24px] top-[367px]">
        <span className="font-['Inter'] text-[12px] font-bold leading-[15px] text-[#6B7280]">
          REQUESTS & BOOKINGS
        </span>
      </div>

      {/* Provider Responses */}
     <div className="absolute left-6 right-6 top-[398px] w-auto">
        <NotificationRow
          label="Provider Responses"
          settingKey="responses"
        />
      </div>

      {/* Booking Confirmations */}
      <div className="absolute left-6 right-6 top-[462px] w-auto">
        <NotificationRow
          label="Booking Confirmations"
          settingKey="confirmations"
        />
      </div>

      {/* Booking Reminders */}
      <div className="absolute left-6 right-6 top-[526px] w-auto">
        <NotificationRow
          label="Booking Reminders"
          settingKey="reminders"
        />
      </div>

      {/* Divider */}
      <div className="absolute left-6 right-6 top-[598px] border-t border-[#E5E7EB]" />

      {/* ================= PROMOTIONS ================= */}

      <div className="absolute left-[24px] top-[615px]">
        <span className="font-['Inter'] text-[12px] font-bold leading-[15px] text-[#6B7280]">
          PROMOTIONS
        </span>
      </div>

      {/* Special Offers */}
      <div className="absolute left-6 right-6 top-[645px] w-auto">
        <NotificationRow
          label="Special Offers & Deals"
          settingKey="offers"
        />
      </div>

      {/* App Updates */}
      <div className="absolute left-6 right-6 top-[709px] w-auto">
        <NotificationRow
          label="App Updates & Tips"
          settingKey="updates"
        />
      </div>

      {/* ================= HOME INDICATOR ================= */}
     <div className="absolute bottom-0 left-0 z-50 flex h-6 w-full items-center justify-center bg-[#F9FAFB]">
  <div className="h-1 w-[108px] rounded-full bg-[#1F2937]" />
</div>

    </div>
  );
};

export default NotifA;