import React from "react";
import {
  ArrowLeft,
  SlidersHorizontal,
  MapPin,
  Star,
  ChevronDown,
  MessageCircle,
  Heart,
  BadgeCheck,
  Zap,
  Wrench,
  Navigation,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const providers = [
  {
    name: "Timi Motors",
    description: "Auto Repair Specialist",
    rating: "4.8",
    reviews: "124 reviews",
    distance: "1km away",
    price: "₦10,000 - ₦20,000",
  },
  {
    name: "DrivePro Garage",
    description: "Engine overhaul & Transmission Experts",
    rating: "4.8",
    reviews: "120 reviews",
    distance: "1.2km away",
    price: "₦15,000 - ₦45,000",
  },
  {
    name: "SwiftFix Auto Hub",
    description: "Fast Vehicle Repairs & Maintenance Services",
    rating: "4.6",
    reviews: "98 reviews",
    distance: "2.5km away",
    price: "₦10,000 - ₦30,000",
  },
  {
    name: "MechaTune Motors",
    description: "Diagnostics, Electrical & Performance Tuning",
    rating: "4.9",
    reviews: "87 reviews",
    distance: "850m away",
    price: "₦20,000 - ₦55,000",
  },
];

const featuredProvider = {
  name: "Premium Motors",
  description: "Complete Auto Care & Diagnostics",
  rating: "4.9",
  reviews: "248 reviews",
  distance: "800m away",
  price: "₦20,000 - ₦70,000",
};

function ProviderCard({ provider }) {
  return (
    <div className="w-full rounded-[15px] bg-white p-4 shadow-sm">
      {/* Provider Information */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          {/* Profile */}
          <div className="relative flex h-[50px] w-[50px] shrink-0 items-center justify-center overflow-hidden rounded-[15px] bg-gray-100">
            <div className="flex h-full w-full items-center justify-center bg-gray-200 text-lg font-bold text-gray-500">
              {provider.name.charAt(0)}
            </div>

            <span className="absolute bottom-0 right-0 h-[14px] w-[14px] rounded-full border-[1.6px] border-white bg-[#008000]" />
          </div>

          {/* Name / Description */}
          <div className="min-w-0">
            <h3 className="truncate text-[16px] font-bold leading-[19px] text-[#1F2937]">
              {provider.name}
            </h3>

            <p className="mt-1 text-[12px] italic leading-[15px] text-[#6B7280]">
              {provider.description}
            </p>

            <div className="mt-2 flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star
                  size={12}
                  fill="#FBBF24"
                  className="text-[#FBBF24]"
                />

                <span className="text-[12px] font-bold italic text-[#1F2937]">
                  {provider.rating}
                </span>
              </div>

              <span className="text-[12px] text-[#6B7280]">
                ({provider.reviews})
              </span>

              <BadgeCheck
                size={18}
                fill="#10B981"
                className="text-white"
              />
            </div>
          </div>
        </div>

        {/* Favorite */}
        <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50">
          <Heart size={17} className="text-gray-500" />
        </button>
      </div>

      {/* Distance */}
      <div className="mt-4 flex items-center gap-[5px]">
        <MapPin size={12} className="text-[#008000]" fill="#008000" />

        <span className="text-[12px] font-bold italic text-[#008000]">
          {provider.distance}
        </span>
      </div>

      {/* Price */}
      <p className="mt-4 text-[16px] font-bold leading-[19px] text-[#008000]">
        {provider.price}
      </p>

      {/* Buttons */}
      <div className="mt-5 flex items-center gap-2">
        <button
          className="flex h-12 w-[126px] items-center justify-center rounded-lg border-[1.5px] border-[#008000] bg-white text-[12px] font-bold italic text-[#008000]"
          onClick={() => console.log("View Profile", provider.name)}
        >
          View Profile
        </button>

        <button
          className="flex h-12 w-[153px] items-center justify-center rounded-lg border-[1.5px] border-[#008000] bg-[#008000] text-[12px] font-bold italic text-white"
          onClick={() => console.log("Contact", provider.name)}
        >
          Contact Now
        </button>

        <button className="flex h-12 w-12 items-center justify-center rounded-[15px] bg-[#F3F4F6]">
          <MessageCircle size={20} className="text-[#6B7280]" />
        </button>
      </div>
    </div>
  );
}

function FeaturedProviderCard() {
  return (
    <div className="relative w-full rounded-[15px] bg-white p-4 shadow-sm">
      {/* Provider */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="relative flex h-[50px] w-[50px] shrink-0 items-center justify-center overflow-hidden rounded-[15px] bg-gray-200">
            <span className="text-lg font-bold text-gray-500">P</span>

            <span className="absolute bottom-0 right-0 h-[14px] w-[14px] rounded-full border-[1.6px] border-white bg-[#008000]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-[16px] font-bold leading-[19px] text-[#1F2937]">
                {featuredProvider.name}
              </h3>

              <span className="rounded bg-[#FEF3C7] px-2 py-[2px] text-[10px] font-bold italic text-[#D97706]">
                FEATURED
              </span>
            </div>

            <p className="mt-1 text-[12px] italic leading-[15px] text-[#6B7280]">
              {featuredProvider.description}
            </p>

            <div className="mt-2 flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star
                  size={12}
                  fill="#FBBF24"
                  className="text-[#FBBF24]"
                />

                <span className="text-[12px] font-bold italic">
                  {featuredProvider.rating}
                </span>
              </div>

              <span className="text-[12px] text-[#6B7280]">
                ({featuredProvider.reviews})
              </span>

              <BadgeCheck
                size={18}
                fill="#10B981"
                className="text-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-[#FEF3C7] px-2.5 py-1 text-[11px] font-bold italic text-[#D97706]">
          Popular Choice
        </span>

        <span className="rounded-full bg-[#DBEAFE] px-2.5 py-1 text-[11px] font-bold italic text-[#2563EB]">
          Quick Response
        </span>

        <span className="rounded-full bg-[#D8FFE4] px-2.5 py-1 text-[11px] font-bold italic text-[#008000]">
          Engine Repair
        </span>
      </div>

      <div className="mt-2 flex gap-2">
        <span className="rounded-full bg-[#F0FDF4] px-2.5 py-1 text-[11px] font-bold italic text-[#008000]">
          AC Systems
        </span>

        <span className="rounded-full bg-[#F0FDF4] px-2.5 py-1 text-[11px] font-bold italic text-[#008000]">
          Diagnostics
        </span>
      </div>

      {/* Distance */}
      <div className="mt-4 flex items-center gap-[5px]">
        <MapPin size={12} fill="#008000" className="text-[#008000]" />

        <span className="text-[12px] font-bold italic text-[#008000]">
          {featuredProvider.distance}
        </span>
      </div>

      {/* Price */}
      <p className="mt-3 text-[16px] font-bold text-[#008000]">
        {featuredProvider.price}
      </p>

      {/* Buttons */}
      <div className="mt-4 flex items-center gap-2">
        <button className="flex h-12 w-[126px] items-center justify-center rounded-lg border-[1.5px] border-[#008000] bg-white text-[12px] font-bold italic text-[#008000]">
          View Profile
        </button>

        <button className="flex h-12 w-[153px] items-center justify-center rounded-lg border-[1.5px] border-[#008000] bg-[#008000] text-[12px] font-bold italic text-white">
          Contact Now
        </button>

        <button className="flex h-12 w-12 items-center justify-center rounded-[15px] bg-[#F3F4F6]">
          <MessageCircle size={20} className="text-[#6B7280]" />
        </button>
      </div>
    </div>
  );
}

export default function Provider() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto h-[926px] w-[428px] overflow-hidden rounded-[35px] bg-white font-['Inter']">
      {/* ================= STATUS BAR ================= */}
      <div className="absolute left-0 top-0 flex h-[62px] w-[428px] items-center justify-between px-4 pt-1">
        <span className="w-[121px] text-center text-[17px] font-semibold">
          9:41
        </span>

        <div className="flex w-[121px] items-center justify-end gap-2">
          <div className="flex items-end gap-[2px]">
            <span className="h-[5px] w-[3px] rounded-sm bg-black" />
            <span className="h-[7px] w-[3px] rounded-sm bg-black" />
            <span className="h-[9px] w-[3px] rounded-sm bg-black" />
            <span className="h-[11px] w-[3px] rounded-sm bg-black" />
          </div>

          <div className="text-sm">⌁</div>

          <div className="relative h-[13px] w-[27px] rounded-[4px] border border-black/40">
            <div className="absolute inset-[2px] rounded-[2px] bg-black" />
            <div className="absolute -right-[3px] top-[4px] h-[5px] w-[2px] rounded-r bg-black/40" />
          </div>
        </div>
      </div>

      {/* ================= HEADER ================= */}
      <div className="absolute left-6 right-6 top-[66px] flex h-9 items-center">
        <button
          onClick={() => navigate(-1)}
          className="mr-6 flex h-6 w-6 items-center justify-center"
        >
          <ArrowLeft size={24} strokeWidth={2} />
        </button>

        <h1 className="text-[20px] font-bold leading-6 text-[#1F2937]">
          Auto & Mechanic
        </h1>

        <div className="ml-auto flex gap-2">
          <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F9FAFB]">
            <SlidersHorizontal size={18} className="text-[#374151]" />
          </button>

          <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F9FAFB]">
            <ChevronDown size={18} className="text-[#374151]" />
          </button>
        </div>
      </div>

      {/* ================= SCROLLABLE CONTENT ================= */}
      <div className="absolute left-0 top-[110px] h-[776px] w-full overflow-y-auto pb-10 scrollbar-hide">
        {/* ================= HERO ================= */}
        <section className="flex flex-col">
          <div className="h-[229px] bg-[#008000] px-6 pt-8 text-white">
            {/* Icon */}
            <div className="flex h-16 w-16 items-center justify-center rounded-[15px] bg-white/20">
              <Wrench size={32} />
            </div>

            <h2 className="mt-8 text-[24px] font-bold leading-[29px]">
              Auto & Mechanic Services
            </h2>

            <p className="mt-3 max-w-[380px] text-[14px] leading-6">
              Find expert auto mechanics and repair services near you. From
              diagnostics to complete repairs.
            </p>
          </div>

          {/* ================= STATISTICS ================= */}
          <div className="flex items-center justify-center px-6 py-4">
            <div className="flex w-full max-w-[314px] items-center justify-between">
              <div className="flex w-[90px] flex-col items-center">
                <strong className="text-[16px] font-bold italic text-[#008000]">
                  42
                </strong>
                <span className="text-[10px] text-[#6B7280]">
                  Providers Nearby
                </span>
              </div>

              <div className="h-[42px] w-px bg-[#E5E7EB]" />

              <div className="flex w-[67px] flex-col items-center">
                <strong className="text-[16px] font-bold italic text-[#008000]">
                  ~1 hr
                </strong>
                <span className="text-[10px] text-[#6B7280]">
                  Avg Response
                </span>
              </div>

              <div className="h-[42px] w-px bg-[#E5E7EB]" />

              <div className="flex w-[51px] flex-col items-center">
                <strong className="text-[16px] font-bold italic text-[#008000]">
                  4.7 ★
                </strong>
                <span className="text-[10px] text-[#6B7280]">
                  Avg Rating
                </span>
              </div>
            </div>
          </div>

          <div className="mx-6 h-px bg-[#E5E7EB]" />

          {/* ================= FILTERS ================= */}
          <div className="mt-4 flex gap-2 overflow-x-auto px-6 scrollbar-hide">
            <button className="flex h-9 shrink-0 items-center gap-2 rounded-full border-[1.5px] border-[#E5E7EB] bg-[#F9FAFB] px-4">
              <Navigation size={13} className="text-[#6B7280]" />
              <span className="text-[13px] font-bold italic text-[#6B7280]">
                Within 5km
              </span>
            </button>

            <button className="flex h-9 shrink-0 items-center gap-2 rounded-full border-[1.5px] border-[#E5E7EB] bg-[#F9FAFB] px-4">
              <Star size={12} className="text-[#6B7280]" />
              <span className="text-[13px] font-bold italic text-[#6B7280]">
                4+ Stars
              </span>
            </button>

            <button className="flex h-9 shrink-0 items-center gap-2 rounded-full border-[1.5px] border-[#E5E7EB] bg-[#F9FAFB] px-4">
              <span className="text-[13px] font-bold italic text-[#6B7280]">
                ₦
              </span>
              <span className="text-[13px] font-bold italic text-[#6B7280]">
                Price Range
              </span>
            </button>
          </div>

          {/* ================= RESULTS COUNT ================= */}
          <div className="px-6 pt-5">
            <div className="flex items-center gap-1">
              <span className="text-[14px] text-[#6B7280]">Showing</span>

              <span className="text-[14px] font-bold text-[#1F2937]">
                42 results
              </span>
            </div>
          </div>

          {/* ================= FEATURED ================= */}
          <div className="mt-6 bg-[#FEF3C7] px-6 py-6">
            <div className="mb-4 flex items-center gap-2">
              <Zap size={16} className="text-[#F59E0B]" fill="#F59E0B" />

              <h2 className="text-[16px] font-bold italic text-[#1F2937]">
                Featured Auto Mechanics
              </h2>

              <span className="rounded bg-[#F59E0B] px-2 py-[2px] text-[10px] font-bold italic text-white">
                SPONSORED
              </span>
            </div>

            <FeaturedProviderCard />
          </div>

          {/* ================= PROVIDERS ================= */}
          <div className="space-y-4 bg-gray-50 px-6 py-6">
            {providers.map((provider) => (
              <ProviderCard
                key={provider.name}
                provider={provider}
              />
            ))}
          </div>
        </section>
      </div>

      {/* ================= BOTTOM HOME INDICATOR ================= */}
      <div className="absolute bottom-0 left-0 flex h-6 w-full items-center justify-center bg-white">
        <div className="h-1 w-[108px] rounded-xl bg-black" />
      </div>
    </div>
  );
}