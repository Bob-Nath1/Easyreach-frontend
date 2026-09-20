import React from "react";
import { ArrowLeft, MoreVertical, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Archived() {
  const navigate = useNavigate();

  const filters = [
    "All",
    "Service Requests",
    "Active",
    "Completed",
  ];

  const archivedMessages = [
    {
      name: "John’s Carpentry",
      service: "Carpentry",
      message: "Project completed successfully",
      time: "Jan 15",
      online: true,
    },
  ];

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
    bg-white
    font-[Inter,sans-serif]
  "
>

      
      {/* ================= HEADER ================= */}
      <div className="absolute left-6 right-6 top-[64px] flex h-10 items-center justify-between">

        <div className="flex items-center gap-6">

          <button
          onClick={() => navigate("/dashboard")}
            className="flex h-6 w-6 items-center justify-center"
          >
            <ArrowLeft
              size={24}
              strokeWidth={2}
              className="text-gray-800"
            />
          </button>

          <h1 className="text-[20px] font-bold leading-6 text-gray-800">
            Messages
          </h1>

        </div>

        <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50">
          <MoreVertical
            size={18}
            className="text-gray-700"
          />
        </button>

      </div>

      {/* ================= TOP TABS ================= */}
      <div className="absolute left-6 right-6 top-[117px] flex h-[49px] border border-gray-200 bg-white">

        {/* ALL */}
        <button
          onClick={() => navigate("/message")}
          className="flex h-full w-1/3 flex-col items-center justify-center"
        >
          <span className="text-center text-[14px] font-semibold text-gray-500">
            All
          </span>
        </button>

        {/* UNREAD */}
        <button
          onClick={() => navigate("/unread")}
          className="relative flex h-full w-1/3 flex-col items-center justify-center"
        >
          <span className="text-center text-[14px] font-semibold text-gray-500">
            Unread
          </span>

          {/* Unread badge */}
         <span className="absolute right-[12px] top-[12px] flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#008000] text-[11px] font-bold italic text-white">
  5
</span>
        </button>

        {/* ARCHIVED - ACTIVE */}
        <button
          onClick={() => navigate("/messages/archived")}
          className="flex h-full w-1/3 flex-col items-center justify-center"
        >
          <span className="text-center text-[14px] font-semibold text-[#008000]">
            Archived
          </span>
        </button>

      </div>

      {/* ================= FILTERS ================= */}
     <div className="absolute left-6 right-6 top-[165px] h-[69px] border border-gray-200 bg-white">

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

      {/* ================= ARCHIVED MESSAGE LIST ================= */}
     <div
  className="
    absolute
    left-6
    right-6
    top-[258px]
    bottom-[24px]
    overflow-y-auto
    pr-1
    scrollbar-thin
    scrollbar-thumb-gray-300
  "
>

        <div className="flex flex-col gap-1">

          {archivedMessages.map((item, index) => (
            <button
              key={index}
              className="flex min-h-[87px] w-full items-center gap-[31px] rounded-lg bg-gray-50 p-4 text-left"
            >

              {/* LEFT CONTENT */}
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

                {/* TEXT */}
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

              {/* RIGHT CONTENT */}
              <div className="flex w-[44px] shrink-0 flex-col items-end gap-[27px]">

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
      <div className="absolute bottom-0 left-0 z-50 h-6 w-full">

        <div className="absolute left-1/2 top-1/2 h-1 w-[108px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-800" />

      </div>

    </div>
  );
}

export default Archived;