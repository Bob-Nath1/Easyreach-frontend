
import React, { useState } from "react";
import {
  ArrowLeft,
  MoreVertical,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Message() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("All");

  const messages = [
    {
      name: "Timi Motors",
      service: "Auto Repair Specialist",
      message: "I can come to your location in 30 min",
      time: "5m ago",
      unread: 5,
      online: true,
    },
    {
      name: "Sarah Ahmed",
      service: "Service Request",
      message: "Thank you! When can you start the",
      time: "12m ago",
      unread: 1,
      online: true,
    },
    {
      name: "Adex Garage",
      service: "Auto Repair",
      message: "Your car is ready for pickup. Total c",
      time: "1h ago",
      unread: 1,
      online: false,
    },
    {
      name: "Ade Kitchen",
      service: "Food Delivery",
      message: "Your order is ready for pickup! Sho",
      time: "1h ago",
      unread: 1,
      online: false,
    },
    {
      name: "ChiChi Plumbing",
      service: "Plumbing",
      message: "I’ll be there tomorrow morning by",
      time: "2h ago",
      unread: 1,
      online: true,
    },
  ];

  const archivedMessages = [
    {
      name: "FastFood Delivery",
      service: "Food Delivery",
      message: "Your order has been delivered. Tha",
      time: "3h ago",
    },
    {
      name: "Michael’s Workshop",
      service: "IT Services",
      message: "Great I’ll bring my laptop repair tools",
      time: "Yesterday",
    },
    {
      name: "Emma’s Tailoring",
      service: "Tailoring Services",
      message: "Your cloth is ready",
      time: "Yesterday",
    },
    {
      name: "DevTech Solutions",
      service: "IT Services",
      message: "Perfect! See you on Monday",
      time: "Yesterday",
    },
    {
      name: "Sparkle Clean",
      service: "Cleaning Services",
      message: "Thank you for choosing us!",
      time: "2 days ago",
    },
    {
      name: "Bella Fashion",
      service: "Tailoring",
      message: "Thanks! I’ll bring the fabric tomorrow",
      time: "Jan 15",
    },
  ];

  const filters = ["All", "Service Requests", "Active", "Completed"];

  return (
    <div className="relative mx-auto h-[926px] w-[428px] overflow-hidden rounded-[35px] bg-white font-[Inter,sans-serif]">

      {/* ================= STATUS BAR ================= */}
      <div className="absolute left-0 top-0 flex h-[62px] w-full items-center justify-between px-4">
        <span className="pt-[2px] text-center text-[17px] font-semibold text-black">
          9:41
        </span>

        <div className="flex items-center gap-[7px]">
          {/* Cellular */}
          <div className="flex h-[13px] w-[19px] items-end gap-[2px]">
            <span className="h-[5px] w-[3px] rounded-sm bg-black" />
            <span className="h-[7px] w-[3px] rounded-sm bg-black" />
            <span className="h-[10px] w-[3px] rounded-sm bg-black" />
            <span className="h-[13px] w-[3px] rounded-sm bg-black" />
          </div>

          {/* WiFi */}
          <div className="text-[14px] font-bold text-black">
            ◔
          </div>

          {/* Battery */}
          <div className="relative h-[13px] w-[27px] rounded-[4px] border border-black/40">
            <div className="absolute inset-[2px] rounded-[2px] bg-black" />
            <div className="absolute -right-[3px] top-[4px] h-[5px] w-[2px] rounded-r bg-black/50" />
          </div>
        </div>
      </div>

      {/* ================= HEADER ================= */}
      <div className="absolute left-6 right-6 top-[64px] flex h-10 items-center justify-between">
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex h-6 w-6 items-center justify-center"
          >
            <ArrowLeft size={24} strokeWidth={2} className="text-gray-800" />
          </button>

          <h1 className="text-[20px] font-bold leading-6 text-gray-800">
            Messages
          </h1>
        </div>

        <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50">
          <MoreVertical size={18} className="text-gray-700" />
        </button>
      </div>

{/* ================= TOP TABS ================= */}
<div className="absolute left-1/2 top-[117px] flex h-[49px] w-[430px] -translate-x-1/2 border border-gray-200 bg-white">

  {["All", "Unread", "Archived"].map((tab) => (
    <button
      key={tab}
      onClick={() => {
        if (tab === "Unread") {
          navigate("/unread");
        } else if (tab === "Archived") {
          navigate("/archive");
        } else {
          setActiveTab("All");
        }
      }}
      className="relative flex h-full w-1/3 flex-col items-center justify-center"
    >
      <span
        className={`text-center text-[14px] font-semibold ${
          activeTab === tab
            ? "text-[#008000]"
            : "text-gray-500"
        }`}
      >
        {tab}
      </span>

      {/* Unread badge */}
      {tab === "Unread" && (
        <span className="absolute right-[32px] top-[12px] flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#008000] text-[11px] font-bold italic text-white">
          5
        </span>
      )}
    </button>
  ))}

</div>

      {/* ================= FILTERS ================= */}
      <div className="absolute left-1/2 top-[165px] h-[69px] w-[430px] -translate-x-1/2 border border-gray-200 bg-white">
        <div className="flex h-full items-center gap-2 overflow-x-auto px-6 scrollbar-hide">

          {filters.map((filter, index) => (
            <button
              key={filter}
              className={`h-[37px] shrink-0 rounded-full px-4 text-[14px] font-semibold ${
                index === 0
                  ? "border border-[#008000] bg-emerald-100 text-[#008000]"
                  : "border border-gray-100 bg-gray-100 text-gray-500"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* ================= MESSAGE LIST ================= */}
      <div className="absolute left-6 top-[258px] h-[628px] w-[380px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300">

        {/* Active Messages */}
        <div className="flex flex-col gap-1">

          {messages.map((item, index) => (
            <button
              key={index}
              className="flex min-h-[94px] w-full items-center gap-[31px] rounded-lg bg-green-50 p-4 text-left"
            >
              {/* Left content */}
              <div className="flex min-w-0 flex-1 items-center gap-[10px]">

                {/* Avatar */}
                <div className="relative h-[50px] w-[50px] shrink-0 overflow-hidden rounded-full bg-white">
                  <div className="flex h-full w-full items-center justify-center bg-gray-200 text-lg font-bold text-gray-500">
                    {item.name.charAt(0)}
                  </div>

                  {/* Online status */}
                  <span
                    className={`absolute bottom-0 right-0 h-[14px] w-[14px] rounded-full border-[1.6px] border-white ${
                      item.online
                        ? "bg-[#008000]"
                        : "bg-gray-400"
                    }`}
                  />
                </div>

                {/* Text */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-semibold leading-[17px] text-black">
                    {item.name}
                  </p>

                  <p className="truncate text-[12px] leading-[15px] text-black">
                    {item.service}
                  </p>

                  <p className="truncate text-[12px] font-semibold italic leading-[15px] text-black">
                    {item.message}
                  </p>
                </div>
              </div>

              {/* Right */}
              <div className="flex w-[44px] shrink-0 flex-col items-end gap-[27px]">
                <span className="whitespace-nowrap text-[12px] font-semibold italic text-black">
                  {item.time}
                </span>

                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#008000] text-[11px] font-bold italic text-white">
                  {item.unread}
                </span>
              </div>
            </button>
          ))}

          {/* ================= ARCHIVED TITLE ================= */}
          <h2 className="mt-3 w-full text-[14px] font-bold leading-[17px] text-black">
            Archived
          </h2>

          {/* ================= ARCHIVED MESSAGES ================= */}
          {archivedMessages.map((item, index) => (
            <button
             onClick={() => navigate("/archive")}
              key={index}
              className="flex min-h-[87px] w-full items-center gap-[31px] rounded-lg bg-gray-50 p-4 text-left"
            >
              {/* Left content */}
              <div className="flex min-w-0 flex-1 items-center gap-[10px]">

                {/* Avatar */}
                <div className="relative h-[50px] w-[50px] shrink-0 overflow-hidden rounded-full bg-white">
                  <div className="flex h-full w-full items-center justify-center bg-gray-200 text-lg font-bold text-gray-500">
                    {item.name.charAt(0)}
                  </div>

                  <span className="absolute bottom-0 right-0 h-[14px] w-[14px] rounded-full border-[1.6px] border-white bg-gray-400" />
                </div>

                {/* Text */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-semibold leading-[17px] text-gray-800">
                    {item.name}
                  </p>

                  <p className="truncate text-[12px] leading-[15px] text-gray-500">
                    {item.service}
                  </p>

                  <p className="truncate text-[12px] font-semibold italic leading-[15px] text-gray-500">
                    {item.message}
                  </p>
                </div>
              </div>

              {/* Right */}
              <div className="flex w-[50px] shrink-0 flex-col items-end gap-[27px]">
                <span className="whitespace-nowrap text-[12px] font-semibold italic text-gray-400">
                  {item.time}
                </span>

                <Check
                  size={12}
                  strokeWidth={3}
                  className="text-[#008000]"
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ================= BOTTOM IPHONE HANDLE ================= */}
      <div className="absolute bottom-0 left-1/2 h-6 w-[412px] -translate-x-1/2">
        <div className="absolute left-1/2 top-1/2 h-1 w-[108px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-800" />
      </div>

    </div>
  );
}

export default Message;
