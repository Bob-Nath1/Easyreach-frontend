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
          w-full
          max-w-[428px]
          min-h-screen
          bg-white
          rounded-[35px]
          overflow-x-hidden
          text-gray-900
        "
      >
        {/* ================= STATUS BAR ================= */}
        <div className="absolute top-0 left-0 w-full h-[62px] px-4 flex items-center justify-between">
          {/* Time */}
          <div className="w-[121px] flex items-center justify-start pt-0.5">
            <span className="text-[17px] font-semibold leading-[22px]">
              9:41
            </span>
          </div>

          {/* Status icons */}
          <div className="w-[121px] flex items-center justify-end gap-[7px]">
            {/* Cellular */}
            <div className="flex items-end gap-[2px] h-[13px]">
              <span className="w-[3px] h-[5px] bg-black rounded-sm" />
              <span className="w-[3px] h-[7px] bg-black rounded-sm" />
              <span className="w-[3px] h-[10px] bg-black rounded-sm" />
              <span className="w-[3px] h-[12px] bg-black rounded-sm" />
            </div>

            {/* Wifi */}
            <div className="text-black text-[15px]">⌁</div>

            {/* Battery */}
            <div className="relative w-[27px] h-[13px] border border-black/40 rounded-[4px]">
              <div className="absolute left-[2px] top-[2px] bottom-[2px] w-[20px] bg-black rounded-[2px]" />
              <div className="absolute right-[-3px] top-[4px] w-[2px] h-[5px] bg-black/40 rounded-r" />
            </div>
          </div>
        </div>

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
        <div className="absolute top-[117px] left-1/2 -translate-x-1/2 w-[430px] max-w-[100vw] h-[49px] bg-white border border-gray-200 flex">
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
                w-[18px]
                h-[18px]
                rounded-full
                bg-[#008000]
                text-white
                text-[11px]
                font-bold
                italic
                flex
                items-center
                justify-center
                top-[12px]
                left-[calc(50%+45px)]
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
        <div className="absolute top-[165px] left-1/2 -translate-x-1/2 w-[430px] max-w-[100vw] h-[69px] bg-white border border-gray-200">
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
        <div className="pt-[258px] px-6 pb-[60px]">
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
            w-full
            h-6
            flex
            items-center
            justify-center
            pb-2
          "
        >
          <div className="w-[108px] h-1 bg-gray-800 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default Unread;