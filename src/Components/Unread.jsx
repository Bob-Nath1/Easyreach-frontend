import React from "react";
import {
  ArrowLeft,
  MoreVertical,
  UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Unread() {
const navigate = useNavigate();

  const messages = [
    {
      name: "Timi Motors",
      type: "Auto Repair Specialist",
      message: "I can come to your location in 30 min",
      time: "5m ago",
      unread: false,
      online: true,
      avatar: "TM",
    },
    {
      name: "Sarah Ahmed",
      type: "Service Request",
      message: "Thank you! When can you start the",
      time: "12m ago",
      unread: "1",
      online: true,
      avatar: "SA",
    },
    {
      name: "Adex Garage",
      type: "Auto Repair",
      message: "Your car is ready for pickup. Total c",
      time: "1h ago",
      unread: "1",
      online: false,
      avatar: "AG",
    },
    {
      name: "Ade Kitchen",
      type: "Food Delivery",
      message: "Your order is ready for pickup! Sho",
      time: "1h ago",
      unread: "1",
      online: true,
      avatar: "AK",
    },
    {
      name: "ChiChi Plumbing",
      type: "Plumbing",
      message: "I’ll be there tomorrow morning by",
      time: "2h ago",
      unread: "1",
      online: true,
      avatar: "CP",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-100 flex justify-center">
      {/* Mobile screen */}
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
    bg-white
    text-gray-900
  "
>
        

        {/* ================= HEADER ================= */}
        <div className="absolute top-[64px] left-6 right-6 h-10 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="w-6 h-6 flex items-center justify-center"
            >
              <ArrowLeft
                size={24}
                strokeWidth={2}
                className="text-gray-800"
              />
            </button>

            <h1 className="text-[20px] leading-6 font-bold text-gray-800">
              Messages
            </h1>
          </div>

          <button
            type="button"
            className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center"
          >
            <MoreVertical
              size={18}
              strokeWidth={2.2}
              className="text-gray-700"
            />
          </button>
        </div>

        {/* ================= TOP TABS ================= */}
        <div className="absolute left-6 right-6 top-[117px] flex h-[49px] border border-gray-200 bg-white">
          {/* All */}
          <button
            type="button"
            onClick={() => navigate("/message")}
            className="w-1/3 h-full flex items-center justify-center px-4"
          >
            <span className="text-[14px] font-semibold text-[#008000]">
              All
            </span>
          </button>

          {/* Unread */}
          <button
            type="button"
            className="relative w-1/3 h-full flex items-center justify-center px-4"
          >
            <span className="text-[14px] font-semibold text-gray-500">
              Unread
            </span>

            <span
  className="
    absolute
    right-[12px]
    top-[12px]
    flex
    h-[18px]
    w-[18px]
    items-center
    justify-center
    rounded-full
    bg-[#008000]
    text-[11px]
    font-bold
    italic
    text-white
  "
>
  5
</span>
          </button>

          {/* Archived */}
          <button
            type="button"
            onClick={() => navigate("/archive")}
            className="w-1/3 h-full flex items-center justify-center px-4"
          >
            <span className="text-[14px] font-semibold text-gray-500">
              Archived
            </span>
          </button>
        </div>

        {/* ================= FILTERS ================= */}
        <div className="absolute left-6 right-6 top-[165px] h-[69px] border border-gray-200 bg-white">
          <div className="h-full px-6 flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {/* All */}
            <button
              type="button"
              className="
                shrink-0
                h-[37px]
                w-[50px]
                rounded-full
                bg-[#D1FAE5]
                border
                border-[#008000]
                flex
                items-center
                justify-center
              "
            >
              <span className="text-[14px] font-semibold text-[#008000]">
                All
              </span>
            </button>

            {/* Service */}
            <button
              type="button"
              className="
                shrink-0
                h-[37px]
                w-[97px]
                rounded-full
                bg-gray-100
                border
                border-gray-100
                flex
                items-center
                justify-center
              "
            >
              <span className="text-[14px] font-semibold text-gray-500">
                Service
              </span>
            </button>

            {/* Repair */}
            <button
              type="button"
              className="
                shrink-0
                h-[37px]
                w-[142px]
                rounded-full
                bg-gray-100
                border
                border-gray-100
                flex
                items-center
                justify-center
              "
            >
              <span className="text-[14px] font-semibold text-gray-500">
                Auto Repair
              </span>
            </button>

            {/* Delivery */}
            <button
              type="button"
              className="
                shrink-0
                h-[36px]
                w-[91px]
                rounded-full
                bg-gray-100
                border
                border-gray-100
                flex
                items-center
                justify-center
              "
            >
              <span className="text-[13px] font-semibold text-gray-500">
                Delivery
              </span>
            </button>
          </div>
        </div>

        {/* ================= MESSAGE LIST ================= */}
        {/*
          IMPORTANT:
          This section is NOT absolutely positioned.

          Using normal flow here means the page can naturally
          become taller than 926px and the browser can scroll
          all the way to the bottom.
        */}
       <div
  className="
    absolute
    left-0
    right-0
    top-[258px]
    bottom-[24px]
    overflow-y-auto
    px-6
    pb-[60px]
    scrollbar-hide
  "
>
          <div className="flex flex-col gap-1">
            {messages.map((message, index) => (
              <button
                key={index}
                type="button"
                className="
                  w-full
                  min-h-[94px]
                  bg-[#F0FDF4]
                  rounded-lg
                  px-4
                  py-4
                  flex
                  items-center
                  gap-[31px]
                  text-left
                  mb-0
                "
              >
                {/* Left section */}
                <div className="flex items-center gap-[10px] min-w-0 flex-1">
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <div
                      className="
                        w-[50px]
                        h-[50px]
                        rounded-full
                        bg-white
                        border
                        border-gray-100
                        flex
                        items-center
                        justify-center
                        overflow-hidden
                      "
                    >
                      <span className="text-[13px] font-bold text-gray-500">
                        {message.avatar}
                      </span>
                    </div>

                    {/* Online indicator */}
                    <span
                      className={`
                        absolute
                        right-[-1px]
                        bottom-[-1px]
                        w-[14px]
                        h-[14px]
                        rounded-full
                        border-[1.6px]
                        border-white
                        ${
                          message.online
                            ? "bg-[#008000]"
                            : "bg-[#9CA3AF]"
                        }
                      `}
                    />
                  </div>

                  {/* Message details */}
                  <div className="min-w-0 flex flex-col gap-1">
                    <span className="w-full text-[14px] leading-[17px] font-semibold text-black truncate">
                      {message.name}
                    </span>

                    <span className="w-full text-[12px] leading-[15px] font-normal text-black truncate">
                      {message.type}
                    </span>

                    <span className="w-full text-[12px] leading-[15px] font-semibold italic text-black truncate">
                      {message.message}
                    </span>
                  </div>
                </div>

                {/* Right section */}
                <div className="w-[44px] shrink-0 self-stretch flex flex-col items-end justify-between py-0">
                  <span className="text-[12px] leading-[15px] font-semibold italic text-black whitespace-nowrap">
                    {message.time}
                  </span>

                  {message.unread && (
                    <span className="w-5 h-5 rounded-full bg-[#008000] text-white flex items-center justify-center text-[11px] leading-[13px] font-bold italic">
                      {message.unread}
                    </span>
                  )}

                  {!message.unread && (
                    <span className="w-5 h-5 rounded-full bg-[#008000]" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ================= BOTTOM HOME INDICATOR ================= */}
     <div
  className="
    absolute
    bottom-0
    left-0
    z-50
    flex
    h-6
    w-full
    items-center
    justify-center
    bg-white
  "
>
  <div className="h-1 w-[108px] rounded-full bg-gray-800" />
</div>
      </div>
    </div>
  );
}

export default Unread;