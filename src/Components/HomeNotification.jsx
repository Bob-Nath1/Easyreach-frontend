import React, { useState } from "react";
import {
  ArrowLeft,
  MoreVertical,
  MessageCircle,
  Users,
  CalendarClock,
  Bell,
  AlertCircle,
  Tag,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function HomeNotification() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("All");
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Messages", "Bookings", "Offers", "Requests"];

  const notifications = {
    today: [
      {
        type: "message",
        title: "3 new messages from Timi Motors",
        time: "5m ago",
        description: 'Latest: "I can come by 2 PM to check your car"',
        action: "Reply",
        unread: true,
      },
      {
        type: "providers",
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
        type: "providers",
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
    ],

    yesterday: [
      {
        type: "request",
        title: "Your request has been posted",
        time: "Yesterday, 4:30 PM",
        description: "12 providers in your area have been notified",
        unread: false,
      },
      {
        type: "offer",
        title: "Special offer: 20% off Plumbing",
        time: "Yesterday, 10:00 AM",
        description:
          "Book a plumber this week and save 20%. Limited time!",
        unread: false,
      },
    ],

    week: [
      {
        type: "review",
        title: "Rate your experience with Timi Motors",
        time: "Jan 15",
        description: "Help others by sharing your feedback",
        action: "Write Review",
        unread: false,
      },
    ],
  };

  const getIcon = (type) => {
    switch (type) {
      case "message":
        return <MessageCircle size={20} />;

      case "providers":
        return <Users size={20} />;

      case "booking":
        return <CalendarClock size={20} />;

      case "confirmed":
        return <Bell size={20} />;

      case "request":
        return <Bell size={20} />;

      case "offer":
        return <Tag size={20} />;

      case "review":
        return <AlertCircle size={20} />;

      default:
        return <Bell size={20} />;
    }
  };

  const getIconStyle = (type) => {
    switch (type) {
      case "message":
        return "bg-emerald-100 text-green-700";

      case "providers":
        return "bg-amber-500 text-white";

      case "booking":
        return "bg-blue-500 text-white";

      case "confirmed":
        return "bg-green-100 text-green-700";

      case "request":
        return "bg-green-100 text-green-700";

      case "offer":
        return "bg-yellow-400 text-white";

      case "review":
        return "bg-red-500 text-white";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const NotificationCard = ({ item }) => {
    return (
      <div
        className={`w-full rounded-lg bg-white px-3.5 py-2 flex items-start gap-3 ${
          !item.unread ? "opacity-60" : ""
        }`}
      >
        {/* Icon area */}
        <div className="flex items-start gap-1 shrink-0">
          {item.unread && (
            <span className="mt-2 h-2 w-2 rounded-full bg-[#008000]" />
          )}

          <div
            className={`h-10 w-10 rounded-full flex items-center justify-center ${getIconStyle(
              item.type
            )}`}
          >
            {getIcon(item.type)}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p
              className={`text-sm leading-[17px] ${
                item.unread
                  ? "font-bold italic text-[#008000]"
                  : "font-normal text-gray-600"
              }`}
            >
              {item.title}
            </p>

            <span className="text-[10px] text-gray-400 whitespace-nowrap">
              {item.time}
            </span>
          </div>

          <p className="mt-2 text-xs leading-4 text-gray-500">
            {item.description}
          </p>

          {item.extra && (
            <p className="mt-1 text-xs leading-4 font-bold italic text-[#008000]">
              {item.extra}
            </p>
          )}

          {item.action && (
            <button
              onClick={() => {
                if (item.action === "View Booking") {
                  navigate("/booking");
                }
              }}
              className="mt-2 flex items-center gap-1 text-xs font-bold italic text-[#008000]"
            >
              {item.action}
              <ChevronRight size={13} />
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center">
      <div className="relative w-[428px] h-[926px] overflow-hidden rounded-[35px] bg-[#F9FAFB] shadow-xl">
        
        {/* ================= STATUS BAR ================= */}
        <div className="absolute top-0 left-0 right-0 h-[62px] flex items-center justify-between px-4 bg-white">
          <span className="text-[17px] font-semibold text-black">
            9:41
          </span>

          <div className="flex items-center gap-2 text-black">
            {/* Signal */}
            <div className="flex items-end gap-[2px] h-4">
              <span className="w-[3px] h-1 bg-black rounded-sm" />
              <span className="w-[3px] h-2 bg-black rounded-sm" />
              <span className="w-[3px] h-3 bg-black rounded-sm" />
              <span className="w-[3px] h-4 bg-black rounded-sm" />
            </div>

            {/* Wifi */}
            <div className="text-sm">◔</div>

            {/* Battery */}
            <div className="relative w-[27px] h-[13px] border border-black/40 rounded-[4px]">
              <div className="absolute left-[2px] top-[2px] bottom-[2px] w-[20px] bg-black rounded-[2px]" />
              <div className="absolute -right-[3px] top-[4px] w-[2px] h-[5px] bg-black/40 rounded-r" />
            </div>
          </div>
        </div>

        {/* ================= HEADER ================= */}
        <div className="absolute top-[62px] left-0 right-0 h-[56px] bg-white border border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate(-1)}
              className="hover:bg-gray-100 rounded-full p-1"
            >
              <ArrowLeft size={24} />
            </button>

            <h1 className="text-xl font-bold text-gray-800">
              Notifications
            </h1>
          </div>

          <button className="p-1">
            <MoreVertical size={20} />
          </button>
        </div>

        {/* ================= TABS ================= */}
        <div className="absolute top-[117px] left-0 right-0 h-[49px] bg-white border border-gray-200 flex">
          {["All", "Unread", "Mentions"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative flex-1 text-sm font-semibold ${
                activeTab === tab
                  ? "text-[#008000]"
                  : "text-gray-500"
              }`}
            >
              {tab}

              {tab === "Unread" && (
                <span className="absolute top-2 left-1/2 ml-[15px] flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#008000] text-[11px] font-bold italic text-white">
                  5
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Green underline */}
        <div
          className={`absolute top-[165px] h-[2px] bg-[#008000] transition-all ${
            activeTab === "All"
              ? "left-6 w-[126px]"
              : activeTab === "Unread"
              ? "left-[151px] w-[126px]"
              : "left-[277px] w-[126px]"
          }`}
        />

        {/* ================= FILTERS ================= */}
        <div className="absolute top-[166px] left-0 right-0 h-[68px] bg-white border border-gray-200 flex items-center gap-2 px-6 overflow-x-auto scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold border ${
                activeFilter === filter
                  ? "bg-emerald-100 border-[#008000] text-[#008000]"
                  : "bg-gray-100 border-gray-100 text-gray-500"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* ================= TODAY ================= */}
        <div className="absolute top-[234px] left-0 right-0 h-[35px] flex items-center px-6 bg-white border border-gray-200">
          <span className="text-xs font-bold italic text-gray-500">
            TODAY
          </span>
        </div>

        {/* ================= NOTIFICATION LIST ================= */}
        <div className="absolute top-[284px] left-6 right-6 bottom-8 overflow-y-auto pr-1 scrollbar-hide">
          
          {/* Today */}
          <div className="space-y-3">
            {notifications.today.map((item, index) => (
              <NotificationCard
                key={`today-${index}`}
                item={item}
              />
            ))}
          </div>

          {/* Yesterday */}
          <div className="mt-4">
            <p className="mb-3 text-xs font-bold italic text-gray-500">
              YESTERDAY
            </p>

            <div className="space-y-3">
              {notifications.yesterday.map((item, index) => (
                <NotificationCard
                  key={`yesterday-${index}`}
                  item={item}
                />
              ))}
            </div>
          </div>

          {/* This Week */}
          <div className="mt-4">
            <p className="mb-3 text-xs font-bold italic text-gray-500">
              THIS WEEK
            </p>

            <div className="space-y-3">
              {notifications.week.map((item, index) => (
                <NotificationCard
                  key={`week-${index}`}
                  item={item}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ================= HOME INDICATOR ================= */}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-transparent flex justify-center items-center">
          <div className="w-[108px] h-1 rounded-full bg-black" />
        </div>
      </div>
    </div>
  );
}

export default HomeNotification;