import React from "react";
import {
  ArrowLeft,
  ChevronRight,
  UserRound,
  MapPin,
  CreditCard,
  Bell,
  ShieldCheck,
  Languages,
  Banknote,
  Ruler,
  Sun,
  HelpCircle,
  Headphones,
  TriangleAlert,
  FileText,
  Shield,
  Info,
  LogOut,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function SettingsItem({
  icon: Icon,
  label,
  value,
  danger = false,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full h-[72px] flex flex-col items-start bg-white"
    >
      <div className="w-full h-[56px] flex items-center px-4 pt-4">
        <div className="w-full flex items-center justify-between">
          {/* Left side */}
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                danger ? "bg-red-100" : "bg-green-50"
              }`}
            >
              <Icon
                size={19}
                strokeWidth={2}
                className={danger ? "text-red-500" : "text-[#008000]"}
              />
            </div>

            <span
              className={`text-[14px] leading-[17px] ${
                danger
                  ? "font-bold text-red-500"
                  : "font-normal text-gray-800"
              }`}
            >
              {label}
            </span>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {value && (
              <span className="text-[12px] leading-[15px] text-gray-400">
                {value}
              </span>
            )}

            <ChevronRight
              size={20}
              strokeWidth={1.8}
              className="text-gray-400"
            />
          </div>
        </div>
      </div>

      <div className="w-full border-b-[0.8px] border-gray-100" />
    </button>
  );
}

function SectionTitle({ children }) {
  return (
    <div className="w-full h-[15px] px-6 flex items-center">
      <p className="text-[12px] leading-[15px] font-bold text-gray-500">
        {children}
      </p>
    </div>
  );
}

function Settings() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleLogout = () => {
    // Add your logout logic here
    navigate("/signin")
    console.log("Logging out...");
  };

  const handleDeleteAccount = () => {
    // Add your delete account logic here
    console.log("Delete account");
  };

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
  "
>
      
      {/* =========================
          HEADER
      ========================== */}
      <div className="absolute left-6 top-[70px] h-6 flex items-center gap-6">
        <button
          onClick={handleBack}
          className="w-6 h-6 flex items-center justify-center"
          aria-label="Go back"
        >
          <ArrowLeft
            size={24}
            strokeWidth={2}
            className="text-[#1F2937]"
          />
        </button>

        <h1 className="text-[20px] leading-6 font-bold text-[#1F2937]">
          Settings
        </h1>
      </div>

      {/* =========================
          SCROLLABLE CONTENT
      ========================== */}
   <div
  className="
    absolute
    left-0
    right-0
    top-[110px]
    bottom-[24px]
    w-full
    overflow-y-auto
    scrollbar-hide
  "
>
        <div className="w-full flex flex-col items-center gap-4 pb-8">
          {/* =========================
              ACCOUNT
          ========================== */}
          <SectionTitle>ACCOUNT</SectionTitle>

          <div className="w-[380px] bg-white rounded-[24px] overflow-hidden">
            <SettingsItem
              icon={UserRound}
              label="Personal Information"
              onClick={() => navigate("/personalinfo")}
            />

            <SettingsItem
              icon={MapPin}
              label="Location Settings"
              onClick={() => navigate("/enter-location")}
            />

            <SettingsItem
              icon={CreditCard}
              label="Payment Methods"
              onClick={() => navigate("/payment-methods")}
            />

            <SettingsItem
              icon={Bell}
              label="Notifications"
              onClick={() => navigate("/notifa")}
            />

            <SettingsItem
              icon={ShieldCheck}
              label="Privacy & Security"
              onClick={() => navigate("/privacy-security")}
            />
          </div>

          {/* =========================
              PREFERENCES
          ========================== */}
          <SectionTitle>PREFERENCES</SectionTitle>

        <div className="mx-6 w-auto bg-white rounded-[24px] overflow-hidden">
            <SettingsItem
              icon={Languages}
              label="Language"
              value="English"
              onClick={() => console.log("Language")}
            />

            <SettingsItem
              icon={Banknote}
              label="Currency"
              value="₦ NGN"
              onClick={() => console.log("Currency")}
            />

            <SettingsItem
              icon={Ruler}
              label="Distance Units"
              value="Kilometers"
              onClick={() => console.log("Distance Units")}
            />

            <SettingsItem
              icon={Sun}
              label="Theme"
              value="Light"
              onClick={() => navigate("/theme")}
            />
          </div>

          {/* =========================
              SUPPORT & LEGAL
          ========================== */}
          <SectionTitle>SUPPORT & LEGAL</SectionTitle>

          <div className="w-[380px] bg-white rounded-[24px] overflow-hidden">

            <SettingsItem
              icon={Headphones}
              label="Contact Support"
              onClick={() => navigate("/contactsupport")}
            />

    

            <SettingsItem
              icon={FileText}
              label="Terms of Service"
              onClick={() => console.log("Terms of Service")}
            />

            <SettingsItem
              icon={Shield}
              label="Privacy Policy"
              onClick={() => console.log("Privacy Policy")}
            />

            <SettingsItem
              icon={Info}
              label="About EasyReach"
              onClick={() => console.log("About EasyReach")}
            />
          </div>

          {/* =========================
              DANGER ZONE
          ========================== */}
          <SectionTitle>DANGER ZONE</SectionTitle>

          <div className="w-[380px] bg-white rounded-[24px] overflow-hidden">
            <SettingsItem
              icon={LogOut}
              label="Log Out"
              danger={false}
              onClick={handleLogout}
            />

            <SettingsItem
              icon={Trash2}
              label="Delete Account"
              danger={true}
              onClick={handleDeleteAccount}
            />
          </div>

          {/* =========================
              VERSION
          ========================== */}
          <p className="text-[12px] leading-[15px] text-[#94A3B8]">
            EasyReach v1.2.5 • © 2025
          </p>
        </div>
      </div>

      {/* =========================
          BOTTOM HOME INDICATOR
      ========================== */}
     <div className="absolute bottom-0 left-0 z-50 h-6 w-full flex items-center justify-center bg-[#F9FAFB]">
  <div className="h-1 w-[108px] rounded-full bg-black" />
</div>
    </div>
  );
}

export default Settings;