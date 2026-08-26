import {
  ArrowLeft,
  User,
  MapPin,
  CreditCard,
  Bell,
  ShieldCheck,
  Languages,
  Banknote,
  Ruler,
  Sun,
  CircleHelp,
  Headphones,
  TriangleAlert,
  FileText,
  LockKeyhole,
  Info,
  LogOut,
  Trash2,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";


function SettingsProv() {
const navigate = useNavigate();

  const accountSettings = [
    { title: "Personal Information", icon: User },
    { title: "Location Settings", icon: MapPin },
    { title: "Payment Methods", icon: CreditCard },
    { title: "Notifications", icon: Bell },
    { title: "Privacy & Security", icon: ShieldCheck },
  ];

  const preferences = [
    {
      title: "Language",
      value: "English",
      icon: Languages,
    },
    {
      title: "Currency",
      value: "₦ NGN",
      icon: Banknote,
    },
    {
      title: "Distance Units",
      value: "Kilometers",
      icon: Ruler,
    },
    {
      title: "Theme",
      value: "Light",
      icon: Sun,
    },
  ];

  const supportSettings = [
    { title: "Help Center", icon: CircleHelp },
    { title: "Contact Support", icon: Headphones },
    { title: "Report a Problem", icon: TriangleAlert },
    { title: "Terms of Service", icon: FileText },
    { title: "Privacy Policy", icon: LockKeyhole },
    { title: "About EasyReach", icon: Info },
  ];

  return (
    <div className="relative min-h-screen w-full max-w-[428px] overflow-hidden rounded-[35px] bg-[#F9FAFB] font-sans">
      
      {/* Header */}
      <div className="absolute left-0 top-0 z-10 h-[110px] w-full bg-[#F9FAFB]">
        
        {/* Header content */}
        <div className="flex items-center gap-6 px-6 pt-[70px]">
          <button
           onClick={() => navigate("/dashboardprov")}
            type="button"
            className="flex h-6 w-6 items-center justify-center"
          >
            <ArrowLeft size={24} strokeWidth={2} className="text-[#1F2937]" />
          </button>

          <h1 className="text-[20px] font-bold leading-6 text-[#1F2937]">
            Settings
          </h1>
        </div>
      </div>

      {/* Scrollable Content */}
      <main className="mt-[110px] h-[calc(100vh-110px)] overflow-y-auto pb-10">
        
        {/* ACCOUNT */}
        <section className="mb-4">
          <div className="px-6">
            <h2 className="mb-4 text-[12px] font-bold leading-[15px] text-[#6B7280]">
              ACCOUNT
            </h2>

            <div className="overflow-hidden rounded-[24px] bg-white">
              {accountSettings.map((item, index) => (
                <SettingsRow
                  key={item.title}
                  title={item.title}
                  Icon={item.icon}
                  showBorder={index !== accountSettings.length - 1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* PREFERENCES */}
        <section className="mb-4">
          <div className="px-6">
            <h2 className="mb-4 text-[12px] font-bold leading-[15px] text-[#6B7280]">
              PREFERENCES
            </h2>

            <div className="overflow-hidden rounded-[24px] bg-white">
              {preferences.map((item, index) => (
                <SettingsRow
                  key={item.title}
                  title={item.title}
                  value={item.value}
                  Icon={item.icon}
                  showBorder={index !== preferences.length - 1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* SUPPORT & LEGAL */}
        <section className="mb-4">
          <div className="px-6">
            <h2 className="mb-4 text-[12px] font-bold leading-[15px] text-[#6B7280]">
              SUPPORT & LEGAL
            </h2>

            <div className="overflow-hidden rounded-[24px] bg-white">
              {supportSettings.map((item, index) => (
                <SettingsRow
                  key={item.title}
                  title={item.title}
                  Icon={item.icon}
                  showBorder={index !== supportSettings.length - 1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* DANGER ZONE */}
        <section className="mb-6">
          <div className="px-6">
            <h2 className="mb-4 text-[12px] font-bold leading-[15px] text-[#6B7280]">
              DANGER ZONE
            </h2>

            <div className="overflow-hidden rounded-[24px] bg-white">
              
              {/* Logout */}
              <SettingsRow
                title="Log Out"
                Icon={LogOut}
                titleClass="font-bold text-[#008000]"
                showBorder
              />

              {/* Delete Account */}
              <SettingsRow
                title="Delete Account"
                Icon={Trash2}
                iconBoxClass="bg-[#FEE2E2]"
                iconClass="text-[#FF0000]"
                titleClass="font-bold text-[#FF0000]"
              />
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="flex justify-center pb-8">
          <p className="text-[12px] leading-[15px] text-[#94A3B8]">
            EasyReach v1.2.5 • © 2025
          </p>
        </div>
      </main>
    </div>
  );
}


/* =========================
   REUSABLE SETTINGS ROW
========================= */

function SettingsRow({
  title,
  value,
  Icon,
  showBorder = false,
  titleClass = "",
  iconBoxClass = "bg-[#F0FDF4]",
  iconClass = "text-[#008000]",
}) {
  return (
    <div>
      <button
        type="button"
        className="flex h-[72px] w-full items-center px-4 pt-4 text-left"
      >
        {/* Icon + Title */}
        <div className="flex flex-1 items-center gap-3">
          
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconBoxClass}`}
          >
            <Icon size={19} className={iconClass} />
          </div>

          <span
            className={`text-[14px] leading-[17px] text-[#1F2937] ${titleClass}`}
          >
            {title}
          </span>
        </div>

        {/* Value */}
        {value && (
          <span className="mr-3 text-right text-[12px] leading-[15px] text-[#9CA3AF]">
            {value}
          </span>
        )}

        {/* Arrow */}
        <ChevronRight
          size={20}
          className="shrink-0 text-[#9CA3AF]"
        />
      </button>

      {showBorder && (
        <div className="border-b-[0.8px] border-[#F3F4F6]" />
      )}
    </div>
  );
}

export default SettingsProv;