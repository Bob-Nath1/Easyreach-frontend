import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  User,
  Settings,
  ChevronRight,
  MapPin,
  Clock,
  Check,
  X,
  Eye,
  Wrench,
  Tag,
  CalendarDays,
  Share2,
  Zap,
  Star,
  BriefcaseBusiness,
  TrendingUp,
  Home,
  ClipboardList,
  MessageCircle,
} from "lucide-react";

function DashboardProv() {
  const navigate = useNavigate();

  const [available, setAvailable] = useState(true);

  const requests = [
    {
      name: "John Daniels",
      service: "Auto Repairs - Engine Check",
      distance: "800m away",
      time: "5 mins ago",
      date: "Today, 2:30 PM",
      duration: "Estimated 1-2 hours",
      urgent: true,
    },
    {
      name: "Aisha Mohammed",
      service: "Auto Repairs - AC Repair",
      distance: "1.2 km away",
      time: "12 mins ago",
      date: "Tomorrow, 10:00 AM",
      duration: "Estimated 2-3 hours",
      urgent: false,
    },
    {
      name: "Bola Okafor",
      service: "Auto Repairs - Brake Service",
      distance: "800m away",
      time: "5 mins ago",
      date: "Today, 2:30 PM",
      duration: "Estimated 1-2 hours",
      urgent: false,
    },
  ];

  const handleAccept = (request) => {
    console.log("Accepted:", request);
    navigate("/book-keeping?role=provider");
  };

  const handleDecline = (request) => {
    console.log("Declined:", request);
  };

  const handleViewDetails = (request) => {
    console.log("Viewing:", request);
  };

  return (
   <div className="relative mx-auto min-h-screen w-full max-w-[428px] bg-[#F9FAFB] font-['Inter',sans-serif]">

      {/* =====================================================
          STATUS BAR
      ====================================================== */}
      <div className="absolute left-0 top-0 z-50 flex h-[62px] w-full items-center justify-between px-4 pt-[21px]">

        {/* Time */}
        <span className="w-[121px] text-center text-[17px] font-semibold leading-[22px] text-black">
          9:41
        </span>

        {/* Status icons */}
        <div className="flex w-[121px] items-center justify-end gap-[7px]">

          {/* Cellular */}
          <div className="flex h-[13px] items-end gap-[2px]">
            <span className="h-[4px] w-[3px] rounded-sm bg-black" />
            <span className="h-[7px] w-[3px] rounded-sm bg-black" />
            <span className="h-[10px] w-[3px] rounded-sm bg-black" />
            <span className="h-[13px] w-[3px] rounded-sm bg-black" />
          </div>

          {/* Wifi */}
          <div className="relative h-[13px] w-[18px]">
            <div className="absolute left-0 top-0 h-[9px] w-[18px] rounded-t-full border-t-[3px] border-black" />
            <div className="absolute left-[4px] top-[4px] h-[6px] w-[10px] rounded-t-full border-t-[3px] border-black" />
            <div className="absolute bottom-0 left-[7px] h-[3px] w-[3px] rounded-full bg-black" />
          </div>

          {/* Battery */}
          <div className="relative h-[13px] w-[27px]">
            <div className="absolute left-0 top-0 h-[13px] w-[25px] rounded-[4px] border border-black/40 p-[2px]">
              <div className="h-full w-full rounded-[2px] bg-black" />
            </div>

            <div className="absolute right-0 top-[4px] h-[5px] w-[2px] rounded-r bg-black/40" />
          </div>
        </div>
      </div>


      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <div className="flex w-full flex-col items-center gap-6 pt-[62px] pb-[150px]">


        {/* =====================================================
            HEADER
        ====================================================== */}
        <div className="flex h-[104px] w-full flex-col">

          {/* Logo + icons */}
          <div className="flex h-[44px] w-full items-center justify-between px-6">

            {/* EasyReach */}
            <button
              type="button"
              onClick={() => navigate("/dashboard-provider")}
              className="flex items-center gap-[2px]"
            >
              <div className="relative h-[25px] w-[21px] rotate-[25deg]">

                <img
            src="/EasyReach.png"
            alt="EasyReach"
            className=" h-7 -mt-1 object-contain"
          />
          

              </div>

              <span className="font-['Rajdhani'] text-[17px] font-bold leading-[22px] text-[#1F2937]">
                EasyReach
              </span>
            </button>


            {/* Notification + profile */}
            <div className="flex items-center gap-4">

              <button
                type="button"
                onClick={() => navigate("/notifprov")}
                className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#F9FAFB]"
              >
                <Bell size={20} className="text-[#6B7280]" />

                <span className="absolute right-[7px] top-[7px] flex h-4 w-4 items-center justify-center rounded-full border border-white bg-[#EF4444] text-[10px] font-bold text-white">
                  3
                </span>
              </button>
              {/* Settings */}
  <button
    type="button"
    onClick={() => navigate("/settingsprov")}
    className="flex h-12 w-11 -mt-1 items-center justify-center rounded-full bg-[#F9FAFB]"
  >
    <Settings size={20} className="text-[#6B7280]" />
  </button>

            </div>
          </div>


          {/* Availability */}
          <div className="flex h-[60px] w-full items-center justify-between bg-[#D1FAE5] px-6">

            <span className="text-[14px] font-bold italic text-[#008000]">
              Available
            </span>

            <button
              type="button"
              onClick={() => setAvailable(!available)}
              className={`relative h-7 w-12 rounded-full transition ${
                available ? "bg-[#008000]" : "bg-[#9CA3AF]"
              }`}
            >
              <span
                className={`absolute top-[3px] h-[22px] w-[22px] rounded-full bg-white shadow transition ${
                  available ? "right-[3px]" : "left-[3px]"
                }`}
              />
            </button>

          </div>
        </div>


        {/* =====================================================
            GREETING
        ====================================================== */}
        <div className="flex w-full flex-col gap-2 bg-white px-6 py-3">

          <p className="text-[20px] font-bold leading-6 text-[#1F2937]">
            Good morning, Timi
          </p>

          <p className="text-[14px] leading-[17px] text-[#6B7280]">
            Thursday, January 16, 2026
          </p>

        </div>


        {/* =====================================================
            EARNINGS CARD
        ====================================================== */}
        <div className="w-[380px] rounded-[24px] bg-[#008000] p-6">

          <div className="flex flex-col gap-6">

            <div>
              <p className="text-[14px] text-white">
                Today's Earnings
              </p>

              <p className="mt-2 text-[36px] font-bold leading-[44px] text-white">
                ₦45,000
              </p>

              <div className="mt-2 flex items-center gap-1 text-[#D1FAE5]">
                <TrendingUp size={14} />
                <span className="text-[12px]">
                  +23% this week
                </span>
              </div>
            </div>


            {/* Earnings graph */}
            <div className="flex h-8 items-end gap-1 overflow-hidden">

              {[35, 50, 25, 65, 45, 75, 60, 85, 45, 70, 90, 60].map(
                (height, index) => (
                  <div
                    key={index}
                    className="w-6 rounded-t-sm bg-white/30"
                    style={{ height: `${height}%` }}
                  />
                )
              )}

            </div>


            <button
              type="button"
              onClick={() => navigate("/earnings")}
              className="flex items-center gap-1 text-[13px] font-bold text-white"
            >
              View Analytics
              <ChevronRight size={14} />
            </button>

          </div>
        </div>


        {/* =====================================================
            STAT CARDS
        ====================================================== */}
        <div className="flex w-[380px] gap-[13px]">

          {/* Active */}
          <div className="flex h-[144px] w-[118px] flex-col items-center rounded-[15px] bg-gradient-to-br from-[#F59E0B] to-[#D97706] px-6 py-4">

            <Zap size={32} className="text-white" />

            <span className="mt-2 text-[28px] font-bold italic leading-[34px] text-white">
              3
            </span>

            <span className="mt-1 text-center text-[12px] leading-[15px] text-white">
              Active Requests
            </span>

          </div>


          {/* Completed */}
          <div className="flex h-[144px] w-[118px] flex-col items-center rounded-[15px] bg-gradient-to-br from-[#10B981] to-[#059669] px-6 py-4">

            <Check size={32} className="text-white" />

            <span className="mt-2 text-[28px] font-bold italic leading-[34px] text-white">
              12
            </span>

            <span className="mt-1 text-center text-[12px] leading-[15px] text-white">
              Completed Today
            </span>

          </div>


          {/* Rating */}
          <div className="flex h-[144px] w-[118px] flex-col items-center rounded-[15px] bg-gradient-to-br from-[#3B82F6] to-[#1E40AF] px-6 py-4">

            <Star size={32} className="fill-white text-white" />

            <span className="mt-2 text-[28px] font-bold italic leading-[34px] text-white">
              4.9
            </span>

            <span className="mt-1 text-center text-[12px] text-white">
              Your Rating
            </span>

          </div>

        </div>


        {/* =====================================================
            URGENT ALERT
        ====================================================== */}
        <div className="flex h-[56px] w-[380px] items-center justify-between rounded-lg bg-[#EF4444] px-4">

          <div className="flex items-center gap-3">

            <Bell size={24} className="text-white" />

            <p className="text-[14px] font-bold leading-5 text-white">
              2 URGENT requests need your response!
            </p>

          </div>

          <button
            type="button"
            onClick={() => navigate("/requests")}
            className="rounded-lg bg-white px-4 py-2 text-[12px] font-bold text-[#EF4444]"
          >
            View Now
          </button>

        </div>


        {/* =====================================================
            NEW REQUESTS
        ====================================================== */}
        <section className="flex w-[380px] flex-col gap-4">

          <div className="flex items-center justify-between">

            <h2 className="text-[16px] font-bold text-[#1F2937]">
              New Requests Near You
            </h2>

            <button
              type="button"
              onClick={() => navigate("/requests")}
              className="flex items-center gap-1 text-[12px] font-bold italic text-[#008000]"
            >
              View All
              <ChevronRight size={14} />
            </button>

          </div>


          <div className="flex flex-col gap-3">

            {requests.map((request, index) => (

              <div
                key={index}
                className="relative box-border min-h-[260px] w-full rounded-[15px] border-[1.5px] border-[#008000] bg-white p-4"
              >

                {/* Provider */}
                <div className="flex items-center gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100 shadow">
                    <User size={22} className="text-[#6B7280]" />
                  </div>

                  <div>
                    <h3 className="text-[16px] font-bold text-[#1F2937]">
                      {request.name}
                    </h3>

                    <p className="text-[12px] text-[#6B7280]">
                      {request.service}
                    </p>
                  </div>

                  {request.urgent && (
                    <span className="ml-auto rounded-lg bg-[#F59E0B] px-2.5 py-1.5 text-[10px] font-bold italic text-white">
                      URGENT
                    </span>
                  )}

                </div>


                {/* Location/time */}
                <div className="mt-4 flex items-center gap-4">

                  <div className="flex items-center gap-1">
                    <MapPin size={14} className="text-[#008000]" />

                    <span className="text-[12px] text-[#008000]">
                      {request.distance}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Clock size={14} className="text-[#6B7280]" />

                    <span className="text-[12px] text-[#6B7280]">
                      {request.time}
                    </span>
                  </div>

                </div>


                <div className="my-4 border-t border-[#1F2937]/20" />


                {/* Date */}
                <p className="text-[14px] font-bold italic text-[#1F2937]">
                  {request.date}
                </p>

                <p className="mt-2 text-[12px] text-[#6B7280]">
                  {request.duration}
                </p>


                {/* Buttons */}
                <div className="mt-5 flex gap-3">

                  <button
                    type="button"
                    onClick={() => handleDecline(request)}
                    className="flex h-[42px] flex-1 items-center justify-center gap-1 rounded-lg border border-[#D1D5DB] text-[13px] font-bold italic text-[#6B7280]"
                  >
                    <X size={14} />
                    Decline
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAccept(request)}
                    className="flex h-[42px] flex-1 items-center justify-center gap-1 rounded-lg bg-[#008000] text-[13px] font-bold italic text-white"
                  >
                    <Check size={14} />
                    Accept
                  </button>

                </div>


                {/* Full details */}

              </div>

            ))}

          </div>
        </section>


        {/* =====================================================
            QUICK ACTIONS
        ====================================================== */}
        <section className="flex w-[380px] flex-col gap-4">

          <h2 className="text-[16px] font-bold text-[#1F2937]">
            Quick Actions
          </h2>

          <div className="grid grid-cols-2 gap-4">

            <QuickAction
              icon={<Wrench size={21} />}
              title="Update Services"
              onClick={() => navigate("/services")}
            />

            <QuickAction
              icon={<Tag size={21} />}
              title="Manage Pricing"
              onClick={() => navigate("/pricing")}
            />

            <QuickAction
              icon={<CalendarDays size={21} />}
              title="View Calendar"
              onClick={() => navigate("/calendar")}
            />

            <QuickAction
              icon={<Share2 size={21} />}
              title="Share Profile"
              onClick={() => navigate("/profile-provider")}
            />

          </div>

        </section>


        {/* =====================================================
            THIS WEEK'S PERFORMANCE
        ====================================================== */}
        <section className="flex w-[380px] flex-col gap-4">

          <h2 className="text-[16px] font-bold text-[#1F2937]">
            This Week’s Performance
          </h2>

          <div className="grid grid-cols-2 gap-3">

            <Performance
              icon={<Clock size={24} />}
              value="< 30 min"
              label="Response Time"
            />

            <Performance
              icon={<Check size={24} />}
              value="85%"
              label="Acceptance Rate"
            />

            <Performance
              icon={<BriefcaseBusiness size={24} />}
              value="47"
              label="Jobs Completed"
            />

            <Performance
              icon={<Star size={22} className="fill-[#FBBF24]" />}
              value="98%"
              label="Satisfaction"
              yellow
            />

          </div>

        </section>


        {/* =====================================================
            RECENT ACTIVITY
        ====================================================== */}
        <section className="flex w-[380px] flex-col gap-4">

          <div className="flex items-center justify-between">

            <h2 className="text-[16px] font-bold italic text-[#1F2937]">
              Recent Activity
            </h2>

            <button
              type="button"
              className="flex items-center gap-1 text-[14px] text-[#008000]"
            >
              View All
              <ChevronRight size={14} />
            </button>

          </div>


          <div className="flex w-full bg-white p-4">

            {/* Timeline */}
            <div className="relative mr-4 w-3">

              <div className="absolute left-[5px] top-1 h-[210px] w-[2px] bg-[#E5E7EB]" />

              <div className="relative z-10 flex flex-col gap-[44px]">

                <span className="h-3 w-3 rounded-full border-2 border-white bg-[#008000]" />

                <span className="h-3 w-3 rounded-full border-2 border-white bg-[#FBBF24]" />

                <span className="h-3 w-3 rounded-full border-2 border-white bg-[#3B82F6]" />

                <span className="h-3 w-3 rounded-full border-2 border-white bg-[#008000]" />

              </div>

            </div>


            {/* Activity text */}
            <div className="flex flex-col gap-4">

              <Activity
                text="Completed job with Sarah K."
                time="2 hours ago"
              />

              <Activity
                text="Received 5★ review"
                time="3 hours ago"
              />

              <Activity
                text="New booking request accepted"
                time="5 hours ago"
              />

              <Activity
                text="Earned ₦8,500"
                time="Yesterday"
              />

            </div>

          </div>

        </section>


        {/* =====================================================
            PRO TIP
        ====================================================== */}
        <div className="flex min-h-[130px] w-[380px] flex-col gap-2 rounded-[15px] bg-[#DBEAFE] p-4">

          <div className="flex flex-col gap-1">

            <span className="text-xl">
              💡
            </span>

            <h3 className="text-[15px] font-bold text-[#1E40AF]">
              Pro Tip
            </h3>

          </div>

          <p className="text-[13px] leading-[18px] text-[#1E40AF]">
            Providers who respond within 30 minutes get 3x more bookings
          </p>

        </div>


        {/* Bottom spacing */}
        <div className="h-8" />

      </div>

      {/* =====================================================
    BOTTOM NAVIGATION
===================================================== */}
<div className="fixed bottom-0 left-1/2 z-40 flex h-[70px] w-full max-w-[428px] -translate-x-1/2 items-center justify-center bg-white">

  <div className="flex w-full items-center justify-center gap-[36px] px-4 py-3">

    {/* HOME */}
    <button
      type="button"
      onClick={() => navigate("/dashboardprov")}
      className="flex h-[46px] w-[32px] flex-col items-center gap-3"
    >
      <Home
        size={24}
        className="text-[#008000]"
        fill="#008000"
      />

      <span className="text-[11px] font-bold leading-[13px] text-[#008000]">
        Home
      </span>
    </button>


    {/* REQUESTS */}
    <button
      type="button"
      onClick={() => navigate("/servicereq")}
      className="relative flex h-[46px] w-[51px] flex-col items-center gap-2"
    >
      <div className="relative">
        <ClipboardList
          size={24}
          className="text-[#9CA3AF]"
        />

        {/* Notification Badge */}
        <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#EF4444] text-[10px] font-bold italic text-white">
          3
        </span>
      </div>

      <span className="text-[11px] font-bold leading-[13px] text-[#9CA3AF]">
        Requests
      </span>
    </button>


    {/* MESSAGES */}
    <button
      type="button"
      onClick={() => navigate("/message")}
      className="relative flex h-[46px] w-[56px] flex-col items-center gap-2"
    >
      <div className="relative">
        <MessageCircle
          size={24}
          className="text-[#9CA3AF]"
        />

        {/* Notification Badge */}
        <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#EF4444] text-[10px] font-bold italic text-white">
          2
        </span>
      </div>

      <span className="text-[11px] font-bold leading-[13px] text-[#9CA3AF]">
        Messages
      </span>
    </button>


    {/* PROFILE */}
    <button
      type="button"
      onClick={() => navigate("/profile")}
      className="flex h-[46px] w-[35px] flex-col items-center gap-[9px]"
    >
      <User
        size={24}
        className="text-[#9CA3AF]"
      />

      <span className="text-[11px] font-bold leading-[13px] text-[#9CA3AF]">
        Profile
      </span>
    </button>

  </div>
</div>


      {/* =====================================================
          HOME INDICATOR
      ====================================================== */}
      <div className="fixed bottom-0 left-1/2 z-50 flex h-6 w-[412px] -translate-x-1/2 items-center justify-center pointer-events-none">
        <div className="h-1 w-[108px] rounded-xl bg-[#1F2937]" />
      </div>

    </div>
  );
}


/* ============================================================
   QUICK ACTION COMPONENT
============================================================ */
function QuickAction({ icon, title, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[109px] flex-col items-center justify-center gap-3 rounded-lg bg-white p-4 transition hover:bg-[#F9FAFB] active:scale-[0.98]"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D1FAE5] text-[#008000]">
        {icon}
      </div>

      <span className="text-[14px] font-bold text-[#1F2937]">
        {title}
      </span>
    </button>
  );
}


/* ============================================================
   PERFORMANCE COMPONENT
============================================================ */
function Performance({
  icon,
  value,
  label,
  yellow = false,
}) {
  return (
    <div className="flex h-[117px] flex-col items-center justify-center gap-2 bg-white p-4">

      <div className="flex h-6 items-center justify-center text-[#008000]">
        {icon}
      </div>

      <p
        className={`text-center text-[18px] font-bold ${
          yellow ? "text-[#FBBF24]" : "text-[#008000]"
        }`}
      >
        {value}
      </p>

      <p className="text-center text-[12px] text-[#6B7280]">
        {label}
      </p>

    </div>
  );
}


/* ============================================================
   ACTIVITY COMPONENT
============================================================ */
function Activity({ text, time }) {
  return (
    <div className="flex min-h-[40px] flex-col gap-1">

      <p className="text-[14px] text-[#4B5563]">
        {text}
      </p>

      <p className="text-[12px] text-[#9CA3AF]">
        {time}
      </p>

    </div>
  );
}


export default DashboardProv;