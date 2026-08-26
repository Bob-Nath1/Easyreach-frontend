import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MoreVertical,
  MessageCircle,
  Wrench,
  CalendarCheck,
  Bell,
  AlertTriangle,
  ChevronRight,
  Wifi,
  BatteryFull,
} from "lucide-react";

function NotificSet() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("All");
  const [activeFilter, setActiveFilter] = useState("All");

  const tabs = ["All", "Unread", "Mentions"];

  const filters = [
    "All",
    "Messages",
    "Requests",
    "Bookings",
    "Offers",
  ];

  const notifications = [
    {
      type: "message",
      title: "3 new messages from Timi Motors",
      time: "5m ago",
      description: 'Latest: "I can come by 2 PM to check your car"',
      action: "Reply",
      unread: true,
    },
    {
      type: "repair",
      title: "3 providers responded to your request",
      time: "25m ago",
      description: "Auto Repair - Engine Check",
      extra: "Quotes from ₦16,000 - ₦22,000",
      unread: true,
    },
    {
      type: "booking",
      title: "Booking starting soon",
      time: "45m ago",
      description:
        "Your Auto Repair service with Tunde Motors starts in 1 hour at 3:00PM",
      action: "View Booking",
      unread: true,
    },
    {
      type: "repair",
      title: "3 providers responded to your request",
      time: "25m ago",
      description: "Auto Repair - Engine Check",
      extra: "Quotes from ₦16,000 - ₦22,000",
      unread: true,
    },
    {
      type: "confirmed",
      title: "Booking confirmed with Tunde Motors",
      time: "25m ago",
      description: "Jan 16, 3:00 PM - Auto Repair",
      unread: false,
    },
    {
      section: "YESTERDAY",
    },
    {
      type: "posted",
      title: "Your request has been posted",
      time: "Yesterday, 4:30 PM",
      description: "12 providers in your area have been notified",
      unread: false,
    },
    {
      type: "offer",
      title: "Special offer: 20% off Plumbing",
      time: "Yesterday, 10:00 AM",
      description: "Book a plumber this week and save 20%. Limited time!",
      unread: false,
    },
    {
      section: "THIS WEEK",
    },
    {
      type: "review",
      title: "Rate your experience with Timi Motors",
      time: "Jan 15",
      description: "Help others by sharing your feedback",
      action: "Write Review",
      unread: false,
    },
  ];

  const getIcon = (type) => {
    switch (type) {
      case "message":
        return <MessageCircle size={19} />;
      case "repair":
        return <Wrench size={19} />;
      case "booking":
        return <CalendarCheck size={19} />;
      case "confirmed":
        return <Bell size={19} />;
      case "posted":
        return <Bell size={19} />;
      case "offer":
        return <AlertTriangle size={19} />;
      case "review":
        return <Bell size={19} />;
      default:
        return <Bell size={19} />;
    }
  };

  const getIconStyle = (type) => {
    switch (type) {
      case "message":
        return "bg-emerald-100 text-[#008000]";
      case "repair":
        return "bg-amber-500 text-white";
      case "booking":
        return "bg-blue-500 text-white";
      case "confirmed":
        return "bg-[#008000] text-white opacity-80";
      case "posted":
        return "bg-[#008000] text-white opacity-60";
      case "offer":
        return "bg-red-500 text-white";
      case "review":
        return "bg-amber-400 text-white";
      default:
        return "bg-emerald-100 text-[#008000]";
    }
  };

  return (
    <div className="relative mx-auto h-[926px] w-[428px] overflow-hidden rounded-[35px] bg-[#F9FAFB] font-[Inter,Arial,sans-serif]">

      {/* ================= STATUS BAR ================= */}
      <div className="absolute left-0 top-0 flex h-[62px] w-full items-center justify-between bg-[#F9FAFB] px-4 pt-2">
        <div className="text-[17px] font-semibold text-black">
          9:41
        </div>

        <div className="flex items-center gap-[7px] text-black">
          <div className="h-3 w-5">
            <div className="flex h-full items-end gap-[2px]">
              <span className="h-[4px] w-[3px] rounded-sm bg-black" />
              <span className="h-[7px] w-[3px] rounded-sm bg-black" />
              <span className="h-[10px] w-[3px] rounded-sm bg-black" />
              <span className="h-[12px] w-[3px] rounded-sm bg-black" />
            </div>
          </div>

          <Wifi size={17} fill="black" />

          <div className="relative h-[13px] w-[27px] rounded-[4px] border border-black/40">
            <div className="absolute left-[2px] top-[2px] h-[7px] w-[20px] rounded-[2px] bg-black" />
            <div className="absolute -right-[3px] top-[4px] h-[5px] w-[2px] rounded-r bg-black/40" />
          </div>
        </div>
      </div>

      {/* ================= HEADER ================= */}
      <div className="absolute left-0 top-[62px] flex h-[56px] w-full items-center justify-between border border-[#E5E7EB] bg-white px-6">

        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex h-6 w-6 items-center justify-center"
          >
            <ArrowLeft size={24} strokeWidth={2} className="text-black" />
          </button>

          <h1 className="text-[20px] font-bold leading-6 text-[#1F2937]">
            Notifications
          </h1>
        </div>

        <button className="flex h-5 w-5 items-center justify-center">
          <MoreVertical size={20} className="text-black" />
        </button>
      </div>

      {/* ================= MAIN TABS ================= */}
      <div className="absolute left-1/2 top-[117px] flex h-[49px] w-[430px] -translate-x-1/2 border border-[#E5E7EB] bg-white">

        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="relative flex h-[49px] w-[143px] flex-col items-center justify-center"
          >
            <span
              className={`text-center text-[14px] font-semibold ${
                activeTab === tab
                  ? "text-[#008000]"
                  : "text-[#6B7280]"
              }`}
            >
              {tab}
            </span>

            {tab === "Unread" && (
              <span className="absolute right-[28px] top-[8px] flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#008000] text-[11px] font-bold italic text-white">
                5
              </span>
            )}

            {activeTab === tab && (
              <span className="absolute bottom-[-1px] left-1/2 h-[1.5px] w-[126px] -translate-x-1/2 bg-[#008000]" />
            )}
          </button>
        ))}
      </div>

      {/* ================= FILTERS ================= */}
      <div className="absolute left-1/2 top-[165px] flex h-[69px] w-[430px] -translate-x-1/2 items-center border border-[#E5E7EB] bg-white px-6">

        <div className="flex w-full items-center gap-2 overflow-x-auto scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`h-[37px] shrink-0 rounded-full px-4 text-[14px] font-semibold transition ${
                activeFilter === filter
                  ? "border border-[#008000] bg-[#D1FAE5] text-[#008000]"
                  : "border border-[#F3F4F6] bg-[#F3F4F6] text-[#6B7280]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* ================= TODAY ================= */}
      <div className="absolute left-1/2 top-[233px] flex h-[35px] w-[430px] -translate-x-1/2 items-center border border-[#E5E7EB] bg-white px-6">
        <span className="text-[12px] font-bold italic text-[#6B7280]">
          TODAY
        </span>
      </div>

      {/* ================= NOTIFICATION LIST ================= */}
      <div className="absolute left-6 top-[284px] h-[600px] w-[380px] overflow-y-auto pr-0 scrollbar-thin">

        {notifications.map((notification, index) => {
          if (notification.section) {
            return (
              <div
                key={index}
                className="mb-3 mt-1 h-[15px] text-[12px] font-bold italic text-[#6B7280]"
              >
                {notification.section}
              </div>
            );
          }

          return (
            <div
              key={index}
              className={`relative mb-3 flex w-[380px] gap-3 rounded-lg ${
                notification.unread
                  ? "bg-white px-2 py-2"
                  : "bg-[#FCFDFD] px-[14px] py-2"
              }`}
            >
              {/* UNREAD DOT */}
              {notification.unread && (
                <span className="absolute left-0 top-3 h-2 w-2 rounded-full bg-[#008000]" />
              )}

              {/* ICON */}
              <div className="flex w-[40px] shrink-0 items-start">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${getIconStyle(
                    notification.type
                  )}`}
                >
                  {getIcon(notification.type)}
                </div>
              </div>

              {/* CONTENT */}
              <div className="min-w-0 flex-1">

                {/* TITLE + TIME */}
                <div className="flex items-center justify-between gap-2">
                  <h3
                    className={`truncate text-[14px] leading-[17px] ${
                      notification.unread
                        ? "font-bold italic text-[#008000]"
                        : "font-normal text-[#4B5563]"
                    }`}
                  >
                    {notification.title}
                  </h3>

                  <span className="shrink-0 text-[10px] leading-3 text-[#9CA3AF]">
                    {notification.time}
                  </span>
                </div>

                {/* DESCRIPTION */}
                <p className="mt-2 text-[12px] leading-[15px] text-[#6B7280]">
                  {notification.description}
                </p>

                {/* EXTRA */}
                {notification.extra && (
                  <p className="mt-1 text-[12px] font-bold italic leading-[15px] text-[#008000]">
                    {notification.extra}
                  </p>
                )}

                {/* ACTION */}
                {notification.action && (
                  <button
                    className="mt-2 flex items-center gap-1 text-[12px] font-bold italic text-[#008000]"
                    onClick={() => {
                      if (notification.action === "View Booking") {
                        navigate("/dashboard");
                      }
                    }}
                  >
                    {notification.action === "Reply" ? (
                      <span className="rounded-lg bg-[#008000] px-4 py-1.5 font-normal italic text-white">
                        Reply
                      </span>
                    ) : (
                      <>
                        <span>{notification.action}</span>
                        <ChevronRight size={12} strokeWidth={3} />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= BOTTOM HOME INDICATOR ================= */}
      <div className="absolute bottom-0 left-1/2 h-6 w-[412px] -translate-x-1/2">
        <div className="absolute left-1/2 top-1/2 h-1 w-[108px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-black" />
      </div>
    </div>
  );
}

export default NotificSet;