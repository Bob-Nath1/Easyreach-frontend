import React, { useState } from "react";
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

  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [deletePassword, setDeletePassword] = useState("");
const [deleteError, setDeleteError] = useState("");
const [deleting, setDeleting] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("profile");
  localStorage.removeItem("providerProfile");

  navigate("/signin", { replace: true });
};

const handleDeleteAccount = () => {
  setDeletePassword("");
  setDeleteError("");
  setShowDeleteModal(true);
};

const confirmDeleteAccount = async () => {
  if (!deletePassword.trim()) {
    setDeleteError("Please enter your current password.");
    return;
  }

  const token = localStorage.getItem("token");

  if (!token) {
    setDeleteError("Your session has expired. Please sign in again.");
    return;
  }

  try {
    setDeleting(true);
    setDeleteError("");

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/users/delete-account`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          password: deletePassword,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setDeleteError(data.message || "Unable to delete your account.");
      return;
    }

    if (!data.cloudinaryCleanupComplete) {
      console.warn("Account deleted, but some Cloudinary files may remain.");
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("profile");
    localStorage.removeItem("providerProfile");

    navigate("/signin", { replace: true });
  } catch (error) {
    console.error("Account deletion error:", error);
    setDeleteError("Network error. Please try again.");
  } finally {
    setDeleting(false);
  }
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
    DELETE ACCOUNT MODAL
========================== */}
{showDeleteModal && (
  <div className="absolute inset-0 z-[60] flex items-center justify-center bg-black/50 px-5">

    <div className="w-full max-w-[380px] rounded-[24px] bg-white p-6 shadow-xl">

      <div className="mb-4 flex justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
          <TriangleAlert size={27} className="text-red-500" />
        </div>
      </div>

      <h2 className="text-center text-[19px] font-bold text-gray-900">
        Delete Account?
      </h2>

      <p className="mt-3 text-center text-[13px] leading-5 text-gray-500">
        This action is permanent. Your account and associated data
        will be deleted and cannot be recovered.
      </p>

      <div className="mt-5">
        <label className="mb-2 block text-[13px] font-semibold text-gray-700">
          Enter your current password
        </label>

        <input
          type="password"
          value={deletePassword}
          onChange={(e) => setDeletePassword(e.target.value)}
          placeholder="Enter your password"
          disabled={deleting}
          className="h-12 w-full rounded-xl border border-gray-200 px-4 text-[14px] outline-none focus:border-[#008000]"
        />
      </div>

      {deleteError && (
        <p className="mt-3 text-center text-[12px] text-red-500">
          {deleteError}
        </p>
      )}

      <div className="mt-6 flex gap-3">

        <button
          type="button"
          disabled={deleting}
          onClick={() => setShowDeleteModal(false)}
          className="h-12 flex-1 rounded-xl border border-gray-200 text-[13px] font-semibold text-gray-700 disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="button"
          disabled={deleting}
          onClick={confirmDeleteAccount}
          className="h-12 flex-1 rounded-xl bg-red-500 text-[13px] font-semibold text-white disabled:opacity-50"
        >
          {deleting ? "Deleting..." : "Delete Account"}
        </button>

      </div>
    </div>
  </div>
)}

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