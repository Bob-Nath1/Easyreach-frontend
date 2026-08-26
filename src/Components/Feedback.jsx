import React, { useState } from "react";
import {
  ArrowLeft,
  Star,
  CalendarDays,
  User,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Feedback() {
  const navigate = useNavigate();

  const [rating, setRating] = useState(2);

  const [aspectRatings, setAspectRatings] = useState({
    "Quality of Work": 2,
    Professionalism: 1,
    Communication: 3,
    Punctuality: 1,
    "Value for Money": 0,
  });

  const aspects = [
    {
      name: "Quality of Work",
      rating: 2,
    },
    {
      name: "Professionalism",
      rating: 1,
    },
    {
      name: "Communication",
      rating: 3,
    },
    {
      name: "Punctuality",
      rating: 1,
    },
    {
      name: "Value for Money",
      rating: 0,
    },
  ];

  const handleAspectRating = (name, value) => {
    setAspectRatings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="relative mx-auto h-[926px] w-[428px] overflow-hidden rounded-[35px] bg-[#F9FAFB] font-['Inter',sans-serif]">

      {/* ================= STATUS BAR ================= */}
      <div className="absolute left-0 top-0 flex h-[62px] w-full items-center justify-between px-4">
        {/* Time */}
        <span className="pt-[2px] text-[17px] font-semibold text-black">
          9:41
        </span>

        {/* Status Icons */}
        <div className="flex items-center gap-[7px]">

          {/* Cellular */}
          <div className="flex h-[13px] w-[19px] items-end gap-[2px]">
            <span className="h-[5px] w-[3px] rounded-sm bg-black" />
            <span className="h-[7px] w-[3px] rounded-sm bg-black" />
            <span className="h-[10px] w-[3px] rounded-sm bg-black" />
            <span className="h-[13px] w-[3px] rounded-sm bg-black" />
          </div>

          {/* WiFi */}
          <div className="text-[15px] font-bold text-black">
            ◔
          </div>

          {/* Battery */}
          <div className="relative h-[13px] w-[27px] rounded-[4px] border border-black/40">
            <div className="absolute inset-[2px] rounded-[2px] bg-black" />
            <div className="absolute -right-[3px] top-[4px] h-[5px] w-[2px] rounded-r bg-black/50" />
          </div>
        </div>
      </div>

      {/* ================= BACK BUTTON ================= */}
      <button
        onClick={() => navigate(-1)}
        className="absolute left-6 top-[70px] flex h-8 w-8 items-center justify-center rounded-full bg-[#F3F4F6]"
      >
        <ArrowLeft
          size={17}
          strokeWidth={2.5}
          className="text-black"
        />
      </button>

      {/* ================= MAIN CONTENT ================= */}
      <div className="absolute left-6 top-[74px] flex h-[606px] w-[380px] flex-col items-center gap-[33px] overflow-y-auto pb-4 scrollbar-hide">

        {/* ================= PROVIDER INFORMATION ================= */}
        <div className="flex w-[336.69px] flex-col items-center gap-6">

          {/* Provider */}
          <div className="flex w-[188px] flex-col items-center gap-10">

            {/* Title */}
            <h1 className="w-[188px] text-center text-[18px] font-bold leading-[22px] text-[#1F2937]">
              Rate Your Experience
            </h1>

            {/* Provider details */}
            <div className="flex w-[188px] flex-col items-center gap-6">

              {/* Avatar */}
              <div className="flex h-[100px] w-[100px] items-center justify-center overflow-hidden rounded-full bg-white shadow-sm">
                <div className="flex h-full w-full items-center justify-center bg-[#D1FAE5] text-[32px] font-bold text-[#008000]">
                  T
                </div>
              </div>

              {/* Details */}
              <div className="flex w-[188px] flex-col items-center gap-2">

                <h2 className="w-full text-center text-[20px] font-bold leading-6 text-[#1F2937]">
                  Timi Motors
                </h2>

                <p className="w-full text-center text-[14px] leading-[17px] text-[#6B7280]">
                  Auto Repair - Engine Check
                </p>

                <p className="w-full text-center text-[12px] leading-[15px] text-[#9CA3AF]">
                  January 16, 2025
                </p>

              </div>
            </div>
          </div>

          {/* ================= OVERALL RATING ================= */}
          <div className="flex w-[336.69px] flex-col items-center gap-6">

            <h2 className="w-full text-center text-[18px] font-bold italic leading-[22px] text-[#1F2937]">
              How was your experience?
            </h2>

            {/* Main Stars */}
            <div className="flex items-center justify-center gap-5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="transition-transform active:scale-90"
                >
                  <Star
                    size={51}
                    strokeWidth={0}
                    fill={
                      star <= rating
                        ? "#008000"
                        : "#E5E7EB"
                    }
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ================= ASPECT RATINGS ================= */}
        <div className="flex w-[380px] flex-col items-center gap-6">

          <h2 className="w-full text-center text-[14px] font-bold leading-[17px] text-[#1F2937]">
            Rate these aspects
          </h2>

          <div className="flex w-full flex-col gap-3">

            {aspects.map((aspect) => (
              <div
                key={aspect.name}
                className="flex w-full items-center justify-between"
              >

                {/* Aspect name */}
                <span className="text-[14px] leading-[17px] text-[#1F2937]">
                  {aspect.name}
                </span>

                {/* Small Stars */}
                <div className="flex items-center gap-[9px]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() =>
                        handleAspectRating(
                          aspect.name,
                          star
                        )
                      }
                      className="transition-transform active:scale-90"
                    >
                      <Star
                        size={22}
                        strokeWidth={0}
                        fill={
                          star <=
                          aspectRatings[aspect.name]
                            ? "#008000"
                            : "#E5E7EB"
                        }
                      />
                    </button>
                  ))}
                </div>

              </div>
            ))}

          </div>
        </div>
      </div>

      {/* ================= DONE BUTTON ================= */}
      <button
        onClick={() => navigate("/dashboard")}
        className="absolute bottom-16 left-6 flex h-[52px] w-[380px] items-center justify-center rounded-full border-2 border-[#008000] bg-[#008000] px-[10px] py-3 text-[14px] font-semibold leading-7 text-white transition active:scale-[0.98]"
      >
        Done
      </button>

      {/* ================= IPHONE HOME INDICATOR ================= */}
      <div className="absolute bottom-0 left-1/2 h-6 w-[412px] -translate-x-1/2">
        <div className="absolute left-1/2 top-1/2 h-1 w-[108px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1F2937]" />
      </div>

    </div>
  );
}

export default Feedback;