import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Pencil,
  MapPin,
  Mail,
  Phone,
  CheckCircle,
  ChevronRight,
  ClipboardList,
  CalendarDays,
  Heart,
  Star,
  Clock3,
  Search,
  Home,
  MessageCircle,
  User,
} from "lucide-react";

function RealProfile() {
const navigate= useNavigate();


  const activities = [
    {
      title: "My Requests",
      icon: ClipboardList,
      badge: "3",
    },
    {
      title: "Bookings & History",
      icon: CalendarDays,
    },
    {
      title: "Favourites",
      icon: Heart,
      badge: "5",
    },
    {
      title: "Reviews",
      icon: Star,
    },
    {
      title: "Recent Searches",
      icon: Clock3,
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-200 flex items-center justify-center">
      {/* ================= DEVICE FRAME ================= */}
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
         {/* =====================================================
            SCROLLABLE CONTENT
        ===================================================== */}
       <div
  className="
    absolute
    left-0
    right-0
    top-[62px]
    bottom-[99px]
    w-full
    overflow-y-auto
    overflow-x-hidden
    pb-[40px]
    scrollbar-hide
  "
>
          {/* ================= PROFILE HEADER ================= */}
          <section
            className="
              relative
              h-[318px]
              w-full
              bg-[#008000]
            "
          >
            {/* Top action buttons */}
            <div className="absolute right-6 top-4 flex items-center gap-4">
              {/* Notification */}
              <button
              onClick={() => navigate("/settings")}
                type="button"
                className="
                  relative
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  bg-white/40
                "
              >
                <img
                src="/setting.png"
                alt="setting"
                className="h-4 w-4 object-cover"
              />

                <span
                  className="
                    absolute
                    right-[-2px]
                    top-[-2px]
                    flex
                    h-4
                    w-4
                    items-center
                    justify-center
                    rounded-full
                    border-[1.5px]
                    border-[#008000]
                    bg-[#EF4444]
                    text-[10px]
                    font-bold
                    text-white
                  "
                >
                  3
                </span>
              </button>

              {/* Location */}
              <button
              onClick={() => navigate("/notificset")}
                type="button"
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  bg-white/40
                "
              >
                  <img
                src="/noti.png"
                alt="notification"
                className="h-4 w-4 object-cover"
              />
              </button>
            </div>

            {/* Profile picture */}
            <div
              className="
                absolute
                left-1/2
                top-[76px]
                flex
                h-[100px]
                w-[100px]
                -translate-x-1/2
                items-center
                justify-center
                overflow-hidden
                rounded-full
                border-[2.4px]
                border-dashed
                border-white
                bg-gray-200
              "
            >
              <img
                src="/profile.jpg"
                alt="Timi Abidoye"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Name */}
            <h1
              className="
                absolute
                left-1/2
                top-[190px]
                -translate-x-1/2
                whitespace-nowrap
                text-[24px]
                font-bold
                leading-[29px]
                text-white
              "
            >
              Timi Abidoye
            </h1>

            {/* Email */}
            <p
              className="
                absolute
                left-1/2
                top-[232px]
                -translate-x-1/2
                whitespace-nowrap
                text-[14px]
                leading-[17px]
                text-white
              "
            >
              timilehinabidoye@gmail.com
            </p>

            {/* Member + Edit */}
            <div
              className="
                absolute
                left-1/2
                top-[258px]
                flex
                -translate-x-1/2
                items-center
                gap-4
              "
            >
              {/* Member since */}
              <div
                className="
                  flex
                  h-[25px]
                  items-center
                  justify-center
                  rounded-full
                  bg-white/20
                  px-[10px]
                "
              >
                <span className="whitespace-nowrap text-[12px] text-white">
                  Member since Jan 2024
                </span>
              </div>

              {/* Edit Profile */}
              <button
              onClick={() => navigate("/editprofile")}
                type="button"
                className="
                  flex
                  h-[36px]
                  items-center
                  justify-center
                  gap-2
                  rounded-[15px]
                  border-[1.5px]
                  border-white
                  px-[15px]
                  text-[14px]
                  font-bold
                  text-white
                "
              >
                <Pencil size={14} />
                Edit Profile
              </button>
            </div>
          </section>

          {/* ================= CONTACT INFORMATION ================= */}
         <section className="mx-6 mt-4 w-auto rounded-[24px] bg-white p-4">
            <div className="flex flex-col gap-3">
              {/* Email row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-lg
                      bg-[#F3F4F6]
                    "
                  >
                    <Mail size={17} className="text-[#6B7280]" />
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-[12px] text-[#9CA3AF]">
                      Email
                    </span>

                    <span className="text-[14px] text-[#1F2937]">
                      timilehinabidoye@gmail.com
                    </span>
                  </div>
                </div>

                {/* Verified */}
                <div
                  className="
                    flex
                    h-[35px]
                    items-center
                    gap-1
                    rounded-full
                    bg-[#D1FAE5]
                    px-[10px]
                  "
                >
                  <CheckCircle size={13} className="text-[#008000]" />

                  <span className="text-[12px] font-bold italic text-[#008000]">
                    Verified
                  </span>
                </div>
              </div>

              {/* Phone row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-lg
                      bg-[#F3F4F6]
                    "
                  >
                    <Phone size={17} className="text-[#6B7280]" />
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-[12px] text-[#9CA3AF]">
                      Phone
                    </span>

                    <span className="text-[14px] text-[#1F2937]">
                      +234 7050852180
                    </span>
                  </div>
                </div>

                <span className="text-[12px] text-red-500">
                  Verify
                </span>
              </div>
            </div>
          </section>

          {/* ================= MY ACTIVITY ================= */}
          <div className="mt-4 px-6">
            <h2 className="text-[12px] font-bold text-[#6B7280]">
              MY ACTIVITY
            </h2>
          </div>

          {/* ================= ACTIVITY CARD ================= */}
          <section className="mx-6 mt-2 w-auto overflow-hidden rounded-[24px] bg-white">
            {activities.map((activity, index) => {
              const Icon = activity.icon;

              return (
                <React.Fragment key={activity.title}>
                  <button
                    type="button"
                    className="
                      flex
                      h-[72px]
                      w-full
                      items-center
                      justify-between
                      px-4
                      text-left
                    "
                  >
                    <div className="flex items-center gap-3">
                      {/* Icon background */}
                      <div
                        className="
                          flex
                          h-10
                          w-10
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          bg-[#F0FDF4]
                        "
                      >
                        <Icon
                          size={19}
                          className="text-[#008000]"
                        />
                      </div>

                      <span className="text-[14px] text-[#1F2937]">
                        {activity.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {activity.badge && (
                        <span
                          className="
                            flex
                            h-[19px]
                            min-w-[25px]
                            items-center
                            justify-center
                            rounded-full
                            bg-[#008000]
                            px-1
                            text-[11px]
                            font-bold
                            text-white
                          "
                        >
                          {activity.badge}
                        </span>
                      )}

                      <ChevronRight
                        size={20}
                        className="text-[#9CA3AF]"
                      />
                    </div>
                  </button>

                  {/* Divider */}
                  {index < activities.length - 1 && (
                    <div className="mx-4 h-px bg-[#F3F4F6]" />
                  )}
                </React.Fragment>
              );
            })}
          </section>
        </div>

        {/* =====================================================
            FIXED BOTTOM NAVIGATION
        ===================================================== */}
        <div
          className="
            absolute
            bottom-0
            left-0
            z-50
            h-[99px]
            w-full
            bg-white
          "
        >
          {/* Navigation */}
          <div
            className="
              absolute
              bottom-[29px]
              left-0
              flex
h-[70px]
w-full
items-center
justify-around
bg-white
px-4
            "
          >
            {/* HOME */}
            <button
              type="button"
              className="flex h-[46px] w-[32px] flex-col items-center gap-2"
            >
              <Home
                size={24}
                fill="#008000"
                className="text-[#008000]"
              />

              <span className="text-[11px] font-bold text-[#008000]">
                Home
              </span>
            </button>

            {/* REQUEST */}
            <button
            onClick={() => navigate("/seekrequest")}
              type="button"
              className="flex h-[46px] w-[49px] flex-col items-center gap-2"
            >
              <ClipboardList
                size={24}
                className="text-[#9CA3AF]"
              />

              <span className="text-[11px] font-bold text-[#9CA3AF]">
                Request
              </span>
            </button>

            {/* MESSAGES */}
            <button
            onClick={() => navigate("/message")}
              type="button"
              className="relative flex h-[46px] w-[56px] flex-col items-center gap-2"
            >
              <div className="relative">
                <MessageCircle
                  size={24}
                  className="text-[#9CA3AF]"
                />

                <span
                  className="
                    absolute
                    -right-2
                    -top-2
                    flex
                    h-[16px]
                    w-[16px]
                    items-center
                    justify-center
                    rounded-full
                    bg-[#EF4444]
                    text-[10px]
                    font-bold
                    text-white
                  "
                >
                  2
                </span>
              </div>

              <span className="text-[11px] font-bold text-[#9CA3AF]">
                Messages
              </span>
            </button>

            {/* PROFILE */}
            <button
              type="button"
              className="flex h-[46px] w-[35px] flex-col items-center gap-2"
            >
              <User
                size={24}
                fill="#008000"
                className="text-[#008000]"
              />

              <span className="text-[11px] font-bold text-[#008000]">
                Profile
              </span>
            </button>
          </div>

          {/* iPhone Home Indicator */}
          <div
            className="
              absolute
              bottom-2
              left-1/2
              h-[4px]
              w-[108px]
              -translate-x-1/2
              rounded-xl
              bg-[#1F2937]
            "
          />
        </div>
      </div>
    </div>
  );
}

export default RealProfile;