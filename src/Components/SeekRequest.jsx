import React from "react";
import {
  ArrowLeft,
  MoreVertical,
  MapPin,
  Star,
  Clock3,
  CalendarDays,
  Timer,
  Wallet,
  Wrench,
  MessageCircle,
  User,
  CheckCircle,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function SeekRequest() {
  const navigate = useNavigate();
  const providers = [
    {
      name: "Timi Motors",
      rating: "4.8",
      reviews: "124 reviews",
      distance: "1.2 km away",
      reply: "Replied in 15 mins",
      quote: "₦18,000",
      parts: "₦8,000",
      labor: "₦10,000",
      availability: "Available: Today at 3:00 PM",
      duration: "Duration: 1-2 hours",
      message:
        "Hi! I can help you with your engine repair. I have 10+ years experience and all necessary tools. I can start today at 3pm and have you back on the road by 5pm...",
    },
    {
      name: "Adebayo Auto Care",
      rating: "4.9",
      reviews: "245 reviews",
      distance: "2.8 km away",
      reply: "Replied in 32 mins",
      quote: "₦22,000",
      parts: "₦12,000",
      labor: "₦8,000",
      transport: "₦2,000",
      availability: "Available: Tomorrow at 9:00 AM",
      duration: "Duration: 2-3 hours",
      message:
        "Good day! I specialize in engine diagnostics and repairs. I offer premium service with genuine parts and 6-month warranty on all work. Can start tomorrow morning...",
    },
    {
      name: "Lagos Auto Experts",
      rating: "4.7",
      reviews: "89 reviews",
      distance: "3.4 km away",
      reply: "Replied in 45 mins",
      quote: "₦20,000",
      parts: "₦9,000",
      labor: "₦9,000",
      transport: "₦2,000",
      availability: "Available: Today at 5:00 PM",
      duration: "Duration: 1-2 hours",
      message:
        "I can handle the engine repair professionally. I have the necessary tools and experience to diagnose the problem and get your vehicle running properly.",
    },
  ];

  const handleBack = () => {
    window.history.back();
  };

 const handleProfile = (provider) => {
  navigate("/viewprofile", {
    state: { provider },
  });
};

  const handleMessage = (provider) => {
    navigate("/chatspace")
    console.log("Message provider:", provider.name);
  };

  const handleAccept = (provider) => {
    navigate("/confirmbooking")

    console.log("Accepted quote from:", provider.name);
    console.log("Quote:", provider.quote);
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center overflow-hidden">
      
      {/* ================= DEVICE FRAME ================= */}
      <div
        className="
          relative
          h-[1000px]
          w-[428px]
          max-h-screen
          max-w-full
          overflow-hidden
          rounded-[35px]
          bg-[#F9FAFB]
        "
      >
    

        {/* ================= STATUS BAR ================= */}
        <div className="absolute left-0 top-0 z-50 flex h-[62px] w-full items-center justify-between bg-white px-4">

          <div className="flex h-[22px] w-[121px] items-center justify-center">
            <span className="text-[17px] font-semibold leading-[22px] text-black">
              9:41
            </span>
          </div>

          <div className="flex h-[22px] w-[121px] items-center justify-end gap-[7px]">

            {/* Cellular */}
            <div className="flex h-[13px] w-[19px] items-end gap-[2px]">
              <span className="h-[5px] w-[2px] rounded-sm bg-black" />
              <span className="h-[7px] w-[2px] rounded-sm bg-black" />
              <span className="h-[10px] w-[2px] rounded-sm bg-black" />
              <span className="h-[13px] w-[2px] rounded-sm bg-black" />
            </div>

            {/* WiFi */}
            <div className="relative h-[13px] w-[18px]">
              <div className="absolute left-0 top-0 h-[8px] w-[18px] rounded-t-full border-t-[3px] border-black" />
              <div className="absolute left-[4px] top-[4px] h-[6px] w-[10px] rounded-t-full border-t-[3px] border-black" />
              <div className="absolute bottom-0 left-[7px] h-[3px] w-[3px] rounded-full bg-black" />
            </div>

            {/* Battery */}
            <div className="relative h-[13px] w-[27px]">
              <div className="h-[13px] w-[25px] rounded-[4px] border border-black opacity-40" />
              <div className="absolute left-[3px] top-[3px] h-[7px] w-[20px] rounded-[2px] bg-black" />
              <div className="absolute right-[-2px] top-[4px] h-[5px] w-[2px] rounded-r bg-black opacity-40" />
            </div>

          </div>
        </div>


        {/* ================= TOP HEADER ================= */}
        <div
          className="
            absolute
            left-0
            top-[62px]
            z-40
            flex
            h-[56px]
            w-full
            items-center
            justify-between
            border-b
            border-[#E5E7EB]
            bg-white
0            px-6
          "
        >

          <div className="flex items-center gap-6">

            <button
              type="button"
              onClick={handleBack}
              className="flex h-6 w-6 items-center justify-center"
            >
              <ArrowLeft
                size={24}
                strokeWidth={2}
                className="text-[#1F2937]"
              />
            </button>

            <h1 className="text-[20px] font-bold leading-6 text-[#1F2937]">
              Request Details
            </h1>

          </div>

          <button
            type="button"
            className="flex h-6 w-6 items-center justify-center"
          >
            <MoreVertical
              size={20}
              className="text-black"
            />
          </button>

        </div>


        {/* =================================================
            SCROLLABLE CONTENT
        ================================================= */}
        <div
  className="
    absolute
    left-0
    top-[118px]
    bottom-0
    w-full
    overflow-y-auto
    overflow-x-hidden
    pb-[40px]
    scrollbar-hide
  "
>

          {/* ================= GREEN RESPONSE HEADER ================= */}
          <div className="flex h-[80px] w-full items-center gap-3 bg-[#008000] px-6">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10">
              <CheckCircle
                size={24}
                className="text-white"
              />
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-[16px] font-bold italic leading-[19px] text-white">
                3 Providers Responded!
              </h2>

              <p className="text-[14px] font-medium leading-[17px] text-white">
                Review their quotes and choose the best one
              </p>
            </div>

          </div>


          {/* ================= REQUEST SUMMARY ================= */}
          <div className="mx-auto mt-4 w-[380px] rounded-[24px] bg-white p-6">

            <div className="flex flex-col gap-4">

              <h2 className="text-[16px] font-bold italic leading-[19px] text-[#1F2937]">
                Need urgent car engine repair service
              </h2>


              {/* Category + urgency */}
              <div className="flex flex-wrap items-center gap-4">

                <div className="flex items-center gap-2">
                  <Wrench
                    size={14}
                    className="text-[#008000]"
                  />

                  <span className="text-[12px] text-[#6B7280]">
                    Category:
                  </span>

                  <span className="rounded-full bg-[#DBEAFE] px-[11px] py-[6px] text-[11px] font-bold italic text-[#1E40AF]">
                    Auto Repair
                  </span>
                </div>

              </div>


              <div className="flex flex-wrap items-center gap-4">

                <div className="flex items-center gap-2">
                  <Clock3
                    size={14}
                    className="text-[#008000]"
                  />

                  <span className="text-[12px] text-[#6B7280]">
                    Urgency:
                  </span>

                  <span className="rounded-full bg-[#FEF3C7] px-[11px] py-[6px] text-[11px] font-bold italic text-[#92400E]">
                    Urgent - Today
                  </span>
                </div>

              </div>


              <div className="flex items-center gap-2">
                <Wallet
                  size={14}
                  className="text-[#008000]"
                />

                <span className="text-[12px] text-[#6B7280]">
                  Budget: ₦15,000 - ₦25,000
                </span>
              </div>


              <div className="flex items-center gap-2">
                <MapPin
                  size={14}
                  className="text-[#008000]"
                />

                <span className="text-[12px] text-[#6B7280]">
                  Allen Avenue, Ikeja (1.2km radius)
                </span>
              </div>


              <div className="flex items-center gap-2">
                <Clock3
                  size={14}
                  className="text-[#008000]"
                />

                <span className="text-[12px] text-[#6B7280]">
                  Posted 3 hours ago
                </span>
              </div>

            </div>

          </div>


          {/* ================= PROVIDER RESPONSES ================= */}
          <div className="mx-auto mt-6 w-[380px]">

            <h2 className="mb-4 text-[16px] font-bold leading-[19px] text-black">
              Provider Responses (3)
            </h2>


            {/* ================= PROVIDER CARDS ================= */}
            <div className="flex flex-col gap-4">

              {providers.map((provider) => (

                <div
                  key={provider.name}
                  className="
                    w-full
                    rounded-none
                    bg-white
                    p-4
                  "
                >

                  {/* Provider Header */}
                  <div className="flex items-center gap-3">

                    {/* Profile image placeholder */}
                    <div className="relative flex h-[50px] w-[50px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#F3F4F6]">
                      <User
                        size={26}
                        className="text-[#9CA3AF]"
                      />

                      <span className="absolute bottom-0 right-0 h-[14px] w-[14px] rounded-full border-[1.6px] border-white bg-[#008000]" />
                    </div>


                    <div className="flex flex-1 flex-col gap-2">

                      <div className="flex items-center gap-2">

                        <span className="text-[16px] font-bold italic leading-[19px] text-[#1F2937]">
                          {provider.name}
                        </span>

                        <CheckCircle
                          size={16}
                          fill="#3B82F6"
                          className="text-white"
                        />

                      </div>

                      <span className="text-[12px] leading-[15px] text-[#6B7280]">
                        {provider.rating} ★ ({provider.reviews}) •{" "}
                        {provider.distance}
                      </span>

                      <span className="flex items-center gap-1 text-[12px] font-bold italic leading-[15px] text-[#008000]">
                        <Clock3 size={12} />
                        {provider.reply}
                      </span>

                    </div>

                  </div>


                  {/* ================= QUOTE BOX ================= */}
                  <div className="mt-4 rounded-[15px] border-2 border-[#008000] bg-[#F0FDF4] px-4 py-6">

                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-1">

                        <span className="text-[12px] font-bold italic text-[#008000]">
                          Quote
                        </span>

                      </div>

                      <span className="text-[28px] font-bold italic leading-[34px] text-[#008000]">
                        {provider.quote}
                      </span>

                    </div>


                    <div className="mt-4 flex items-center justify-between text-[12px] text-[#6B7280]">
                      <span>Parts & Materials</span>
                      <span>{provider.parts}</span>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[12px] text-[#6B7280]">
                      <span>Labor</span>
                      <span>{provider.labor}</span>
                    </div>

                    {provider.transport && (
                      <div className="mt-2 flex items-center justify-between text-[12px] text-[#6B7280]">
                        <span>Transport</span>
                        <span>{provider.transport}</span>
                      </div>
                    )}

                  </div>


                  {/* ================= AVAILABILITY ================= */}
                  <div className="mt-4 rounded-[15px] bg-white p-4">

                    <div className="flex items-center gap-4">

                      <CalendarDays
                        size={16}
                        className="shrink-0 text-[#008000]"
                      />

                      <span className="text-[14px] font-bold italic text-[#1F2937]">
                        {provider.availability}
                      </span>

                    </div>

                    <div className="mt-4 flex items-center gap-4">

                      <Timer
                        size={16}
                        className="shrink-0 text-[#008000]"
                      />

                      <span className="text-[14px] font-bold italic text-[#1F2937]">
                        {provider.duration}
                      </span>

                    </div>

                  </div>


                  {/* ================= PROVIDER MESSAGE ================= */}
                  <div className="mt-4 rounded-[15px] bg-[#F9FAFB] p-4">

                    <p className="text-[14px] leading-[22px] text-[#6B7280]">
                      {provider.message}
                    </p>

                    <button
                      type="button"
                      className="mt-3 flex items-center gap-1 text-[12px] font-bold italic text-[#008000]"
                    >
                      Read full message
                      <ChevronRight size={14} />
                    </button>

                  </div>


                  {/* ================= ACTION BUTTONS ================= */}
                  <div className="mt-4 flex gap-2">

                    <button
                    onClick 
                      type="button"
                      onClick={() => handleProfile(provider)}
                      className="
                        flex
                        h-[49px]
                        flex-1
                        items-center
                        justify-center
                        gap-2
                        rounded-[15px]
                        border-[1.5px]
                        border-[#008000]
                        bg-white
                        text-[14px]
                        font-bold
                        text-[#008000]
                      "
                    >
                      <User size={15} />
                      Profile
                    </button>


                    <button
                      type="button"
                      onClick={() => handleMessage(provider)}
                      className="
                        flex
                        h-[49px]
                        flex-1
                        items-center
                        justify-center
                        gap-2
                        rounded-[15px]
                        border-[1.5px]
                        border-[#008000]
                        bg-white
                        text-[14px]
                        font-bold
                        text-[#008000]
                      "
                    >
                      <MessageCircle size={15} />
                      Message
                    </button>

                  </div>


                  {/* ================= ACCEPT QUOTE ================= */}
                  <button
                    type="button"
                    onClick={() => handleAccept(provider)}
                    className="
                      mt-2
                      flex
                      h-[48px]
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-[15px]
                      bg-[#008000]
                      text-[14px]
                      font-bold
                      text-white
                      transition
                      hover:bg-[#006B00]
                      active:scale-[0.98]
                    "
                  >
                    <CheckCircle size={16} />
                    Accept Quote
                  </button>

                </div>

              ))}

            </div>

          </div>

        </div>


        {/* ================= HOME INDICATOR ================= */}
        <div className="absolute left-1/2 z-50 h-[24px] w-[412px] -translate-x-1/2 mt-">

          


        </div>

      </div>

    </div>
    
  );
}

export default SeekRequest;