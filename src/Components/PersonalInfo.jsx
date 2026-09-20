import React from "react";
import {
  Bell,
  Share2,
  Mail,
  Phone,
  BadgeCheck,
  Pencil,
  FileCheck,
  ShieldCheck,
  Award,
} from "lucide-react";

const workingHours = [
  { day: "Monday", time: "9:00 AM - 6:00 PM", active: true },
  { day: "Tuesday", time: "9:00 AM - 6:00 PM" },
  { day: "Wednesday", time: "9:00 AM - 6:00 PM" },
  { day: "Thursday", time: "9:00 AM - 6:00 PM" },
  { day: "Friday", time: "9:00 AM - 6:00 PM" },
  { day: "Saturday", time: "10:00 AM - 4:00 PM" },
  { day: "Sunday", time: "Closed", closed: true },
];

const specializations = [
  "Engine Repair",
  "Brake Systems",
  "AC Repair",
  "Diagnostics",
  "Electrical",
  "Oil Changes",
  "Suspension",
  "General Maintenance",
];

const certifications = [
  {
    title: "ASE Master Technician",
    status: "✓ Verified",
    icon: Award,
  },
  {
    title: "Business Insurance",
    status: "✓ Active until Dec 2025",
    icon: ShieldCheck,
  },
  {
    title: "Trade License",
    status: "✓ Valid",
    icon: FileCheck,
  },
];

const languages = ["English", "Yoruba", "Pidgin"];

const ratingBreakdown = [
  { stars: 5, percent: 78 },
  { stars: 4, percent: 18 },
  { stars: 3, percent: 3 },
  { stars: 2, percent: 1 },
  { stars: 1, percent: 0 },
];

const reviews = [
  {
    name: "John D.",
    verified: true,
    date: "2 weeks ago",
    rating: 5,
    comment:
      "Excellent service! Tunde diagnosed my engine problem quickly and fixed it same day. Very professional and fair pricing. Highly recommend!",
    service: "Engine Diagnostics",
  },
  {
    name: "Sarah W.",
    verified: false,
    date: "1 month ago",
    rating: 5,
    comment:
      "Best mechanic in Lagos! Fixed my brakes perfectly and explained everything clearly. Will definitely use again.",
    service: "Brake Repair",
  },
  {
    name: "Adebayo K.",
    verified: true,
    date: "2 months ago",
    rating: 5,
    comment:
      "Very reliable and honest. Good prices and quality work. My AC is ice cold now!",
    service: "AC Service",
  },
];

const Stars = ({ rating = 5 }) => (
  <div className="flex gap-[2px]">
    {[1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        className={`text-xs ${
          star <= rating ? "text-amber-500" : "text-slate-300"
        }`}
      >
        ★
      </span>
    ))}
  </div>
);

function SectionHeader({ title, onEdit }) {
  return (
    <div className="flex items-center justify-between w-full">
      <h2 className="text-[16px] leading-[19px] font-bold text-slate-900">
        {title}
      </h2>

      {onEdit && (
        <button
          onClick={onEdit}
          className="text-[14px] leading-[17px] font-bold text-emerald-700"
        >
          Edit →
        </button>
      )}
    </div>
  );
}

function InfoRow({ icon: Icon, label, value, verified }) {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
          <Icon size={17} className="text-gray-500" />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs leading-[15px] text-gray-400">
            {label}
          </span>

          <span className="text-sm leading-[17px] text-gray-800">
            {value}
          </span>
        </div>
      </div>

      {verified && (
        <div className="flex items-center gap-1 px-3 py-2.5 rounded-full bg-emerald-100">
          <BadgeCheck size={13} className="text-green-700" />

          <span className="text-xs font-bold italic text-green-700">
            Verified
          </span>
        </div>
      )}
    </div>
  );
}

function PersonalInfo() {
  return (
   <div className="min-h-screen w-full bg-gray-50">
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
        
        {/* ================= HEADER ================= */}
        <section className="relative h-[458px] flex flex-col items-center">
          
          {/* Green profile background */}
          <div className="absolute top-0 left-0 w-full h-[318px] bg-[#008000]" />

          {/* Top buttons */}
          <div className="absolute top-4 right-6 flex items-center gap-4">
            <button className="w-11 h-11 rounded-full bg-white/40 flex items-center justify-center">
              <Share2 size={20} className="text-white" />
            </button>

            <button className="relative w-11 h-11 rounded-full bg-white/40 flex items-center justify-center">
              <Bell size={21} className="text-white" />

              <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 rounded-full bg-red-500 border-2 border-[#008000]">
                <span className="text-[9px] italic font-bold text-white">
                  3
                </span>
              </span>
            </button>
          </div>

          {/* Profile image */}
          <div className="absolute top-[76px] w-[100px] h-[100px] rounded-full border-[2.4px] border-dashed border-white overflow-hidden">
            <img
              src="/profile.jpg"
              alt="Timi Abidoye"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Name */}
          <h1 className="absolute top-[176px] text-[24px] leading-[29px] font-bold text-white">
            Timi Abidoye
          </h1>

          {/* Email */}
          <p className="absolute top-[210px] text-sm text-white">
            timilehinabidoye@gmail.com
          </p>

          {/* Member + edit */}
          <div className="absolute top-[258px] flex items-center gap-4">
            <div className="px-2.5 py-[5px] rounded-full bg-white/20">
              <span className="text-xs text-white">
                Member since Jan 2024
              </span>
            </div>

            <button className="h-9 px-[15px] rounded-[15px] border-[1.5px] border-white flex items-center gap-2.5">
              <Pencil size={14} className="text-white" />

              <span className="text-sm font-bold text-white">
                Edit Profile
              </span>
            </button>
          </div>
        </section>

        {/* ================= CONTACT INFO ================= */}
        <div
  className="
    absolute
    left-0
    right-0
    top-[458px]
    bottom-0
    overflow-y-auto
    overflow-x-hidden
    scrollbar-hide
    pb-[40px]
  "
>
        <section className="mx-6 -mt-[14px] relative z-10 bg-white rounded-[24px] p-4">
          <div className="flex flex-col gap-3">
            <InfoRow
              icon={Mail}
              label="Email"
              value="timilehinabidoye@gmail.com"
              verified
            />

            <InfoRow
              icon={Phone}
              label="Phone"
              value="+234 7050852180"
            />

            <div className="flex justify-end -mt-8">
              <button className="text-xs text-red-500">
                Verify
              </button>
            </div>
          </div>
        </section>
        </div>

        {/* ================= ABOUT HEADER ================= */}
        <div className="mx-6 mt-7">
          <SectionHeader title="About" onEdit={() => {}} />
        </div>

        {/* ================= ABOUT CARD ================= */}
        <section className="mx-6 mt-4 bg-white border border-gray-200 rounded-[15px] p-4">
          <p className="text-sm leading-[22px] text-slate-600">
            Professional auto repair service with over 10 years of
            experience. We specialize in engine diagnostics, brake
            systems, AC repair, and general maintenance. All work comes
            with a 90-day guarantee. We use only genuine parts and
            modern diagnostic equipment to ensure your vehicle runs at
            peak performance.
          </p>

          <div className="my-6 border-t border-gray-200" />

          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <span className="text-sm text-slate-500">
                Years of Experience
              </span>

              <strong className="text-sm text-slate-900">
                10+ years
              </strong>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-slate-500">
                Completion Rate
              </span>

              <strong className="text-sm text-emerald-700">
                98%
              </strong>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-slate-500">
                Response Time
              </span>

              <strong className="text-sm text-emerald-700">
                &lt; 1 hour
              </strong>
            </div>
          </div>

          <div className="my-6 border-t border-gray-200" />

          <div>
            <p className="text-sm text-slate-500 mb-3">
              Specializations
            </p>

            <div className="flex flex-wrap gap-2">
              {specializations.map((item) => (
                <span
                  key={item}
                  className="px-3 py-2 rounded-full bg-emerald-100 text-[12px] leading-[15px] font-bold text-emerald-800"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ================= BUSINESS INFORMATION ================= */}
        <div className="mx-6 mt-8">
          <SectionHeader
            title="Business Information"
            onEdit={() => {}}
          />
        </div>

        {/* ================= WORKING HOURS ================= */}
        <section className="mx-6 mt-4 bg-white rounded-[15px] p-4">
          <h3 className="text-sm font-bold text-slate-900">
            Working Hours
          </h3>

          <div className="mt-6 flex flex-col">
            {workingHours.map((item, index) => (
              <React.Fragment key={item.day}>
                <div className="flex items-center justify-between py-2">
                  <span
                    className={`text-sm ${
                      item.active
                        ? "font-bold text-[#008000]"
                        : "text-slate-900"
                    }`}
                  >
                    {item.day}
                  </span>

                  <span
                    className={`text-sm ${
                      item.active
                        ? "font-bold text-[#008000]"
                        : item.closed
                        ? "text-slate-400"
                        : "text-slate-500"
                    }`}
                  >
                    {item.time}
                  </span>
                </div>

                {index < workingHours.length - 1 && (
                  <div className="border-t border-gray-200" />
                )}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* ================= SERVICE AREA ================= */}
        <section className="mx-6 mt-6 bg-white rounded-[15px] p-4">
          <h3 className="text-sm font-bold text-slate-900">
            Service Area
          </h3>

          <div className="mt-6">
            <div className="border-t border-gray-200" />

            <div className="flex justify-between py-3">
              <span className="text-sm text-slate-500">
                Service Radius
              </span>

              <strong className="text-sm text-slate-900">
                10 KM
              </strong>
            </div>

            <div className="border-t border-gray-200" />

            <div className="flex justify-between py-3">
              <span className="text-sm text-slate-500">
                Specific Areas
              </span>

              <strong className="text-sm text-slate-900">
                Ikeja, VI, Lekki
              </strong>
            </div>
          </div>
        </section>

        {/* ================= LANGUAGES ================= */}
        <section className="mx-6 mt-4 bg-white rounded-[15px] p-4">
          <h3 className="text-sm font-bold text-slate-900">
            Languages
          </h3>

         <div className="mt-6 flex flex-wrap gap-2">
  {languages.map((language) => (
              <span
                key={language}
                className="px-3 py-2 rounded-full bg-emerald-100 text-xs font-bold text-emerald-800"
              >
                {language}
              </span>
            ))}
          </div>
        </section>

        {/* ================= CERTIFICATIONS ================= */}
        <section className="mx-6 mt-4 mb-10 bg-white rounded-[15px] p-4">
          <h3 className="text-sm font-bold text-slate-900">
            Certifications & Licenses
          </h3>

          <div className="mt-6 flex flex-col gap-2">
            {certifications.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Icon
                      size={17}
                      className="text-[#008000]"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-slate-900">
                      {item.title}
                    </span>

                    <span className="text-xs text-blue-500">
                      {item.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
                {/* ================= CUSTOMER REVIEWS ================= */}
        <section className="mx-6 mt-8 mb-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              Customer Reviews{" "}
              <span className="text-sm text-slate-500">(142)</span>
            </h2>

            <button className="text-sm font-bold text-emerald-700">
              Edit →
            </button>
          </div>

          {/* Rating Breakdown */}
          <div className="rounded-2xl bg-white p-4">
            {ratingBreakdown.map(({ stars, percent }) => (
              <div
                key={stars}
                className="mb-2 flex items-center gap-2 last:mb-0"
              >
                <span className="w-5 text-xs text-amber-500">
                  {stars}
                </span>

                <Stars rating={stars} />

                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-amber-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>

                <span className="w-7 text-right text-xs font-bold text-slate-500">
                  {percent}%
                </span>
              </div>
            ))}
          </div>

          {/* Reviews */}
          <div className="mt-4 space-y-2">
            {reviews.map((review) => (
              <div
                key={review.name}
                className="rounded-2xl bg-slate-50 p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-2">
                    {/* Reviewer image */}
                    <div className="h-8 w-8 shrink-0 rounded-full bg-slate-200" />

                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-bold text-slate-900">
                          {review.name}
                        </span>

                        {review.verified && (
                          <span className="text-[10px] font-bold text-blue-500">
                            ✓ Verified
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-400">
                        {review.date}
                      </p>
                    </div>
                  </div>

                  <Stars rating={review.rating} />
                </div>

                <p className="mt-2 text-xs leading-5 text-slate-600">
                  {review.comment}
                </p>

                <span className="mt-2 inline-block rounded-lg bg-sky-100 px-2 py-1 text-[10px] font-bold text-sky-700">
                  {review.service}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default PersonalInfo;