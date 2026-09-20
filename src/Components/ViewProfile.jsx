import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Share2,
  MapPin,
  Star,
  BriefcaseBusiness,
  Award,
  BadgeCheck,
  Clock3,
  MessageCircle,
  Phone,
  Navigation,
  ClipboardList,
  ChevronRight,
  Wrench,
} from "lucide-react";

function ViewProfile() {
  const navigate = useNavigate();

  const services = [
    {
      name: "General Checkup",
      price: "₦3,000",
    },
    {
      name: "Engine Diagnostics",
      price: "₦5,000 - ₦8,000",
    },
    {
      name: "Brake Repair",
      price: "₦4,000 - ₦12,000",
    },
    {
      name: "AC System Service",
      price: "₦6,000 - ₦15,000",
    },
    {
      name: "Oil Change",
      price: "₦8,000 - ₦20,000",
    },
  ];

  const workingHours = [
    ["Monday", "8:00 AM - 6:00 PM"],
    ["Tuesday (Today)", "8:00 AM - 6:00 PM"],
    ["Wednesday", "8:00 AM - 6:00 PM"],
    ["Thursday", "8:00 AM - 6:00 PM"],
    ["Friday", "8:00 AM - 6:00 PM"],
    ["Saturday", "9:00 AM - 3:00 PM"],
    ["Sunday", "Closed"],
  ];

  const reviews = [
    {
      name: "Olu Adebayo",
      date: "2 days ago",
      text: "Excellent service! Fixed my car's engine issue quickly and professionally. Very transparent about pricing and kept me updated throughout.",
    },
    {
      name: "Chioma Nwosu",
      date: "5 days ago",
      text: "Great work on my brake system! The team was professional and the pricing was fair. Highly recommend.",
    },
    {
      name: "Bayo Kazeem",
      date: "1 week ago",
      text: "Best mechanic in the area! Fast service, honest pricing, and quality work. My AC is working perfectly now.",
    },
  ];

  return (
   <div className="min-h-screen w-full bg-gray-100 flex justify-center">
  <div
    className="
      relative
      w-full
      sm:w-[640px]
      md:w-[768px]
      lg:w-[1024px]
      xl:w-[1280px]
      2xl:w-[1536px]
      h-[926px]
      md:h-[1026px]
      lg:h-[1200px]
      xl:h-[1200px]
      2xl:h-[1200px]
      overflow-hidden
      rounded-[35px]
      bg-white
      shadow-xl
      mx-auto
    "
  >

                {/* ================= SCROLLABLE CONTENT ================= */}
       <div
  className="
    absolute
    top-[61px]
    left-0
    right-0
    bottom-[24px]
    overflow-y-auto
    scrollbar-hide
  "
>

          {/* ================= COVER / HERO ================= */}
          <section className="relative w-full">

            {/* Cover image */}
            <div className="relative h-[151px] w-full overflow-hidden bg-gradient-to-br from-green-700 to-emerald-400">
              <div className="absolute inset-0 bg-gradient-to-br from-green-900/50 via-green-700/20 to-emerald-400/30" />

              {/* Decorative workshop background */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute left-8 top-8 w-28 h-20 border-2 border-white rounded-lg" />
                <div className="absolute right-12 top-10 w-20 h-16 border-2 border-white rounded-lg" />
                <div className="absolute left-40 top-20 w-32 h-3 bg-white rounded" />
              </div>

              {/* Back button */}
              <button
                onClick={() => navigate(-1)}
                className="absolute left-6 top-8 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow"
              >
                <ArrowLeft size={24} color="#1F2937" />
              </button>

              {/* Share button */}
              <button
                className="absolute right-6 top-8 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow"
              >
                <Share2 size={21} color="#000" />
              </button>
            </div>

            {/* Provider information */}
            <div className="flex flex-col items-center -mt-[35px] relative z-10">

              {/* Profile picture */}
              <div className="w-[100px] h-[100px] rounded-full bg-white p-1 shadow-md">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center">
                  <span className="text-4xl">👨🏾‍🔧</span>
                </div>
              </div>

              {/* Name */}
              <div className="mt-3 flex items-center gap-2">
                <h1 className="text-[24px] leading-[29px] font-bold text-gray-800">
                  Timi Motors
                </h1>

                <span className="w-6 h-6 rounded-full bg-green-700 flex items-center justify-center">
                  <BadgeCheck size={17} color="white" />
                </span>
              </div>

              <p className="mt-1 text-[16px] text-gray-500">
                Auto Repair Specialist
              </p>

              {/* Rating and distance */}
              <div className="mt-4 flex items-center justify-center gap-8">

                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={15}
                        fill="#FCD34D"
                        color="#FCD34D"
                      />
                    ))}
                  </div>

                  <span className="text-[18px] italic font-bold text-gray-800">
                    4.8
                  </span>

                  <span className="text-[14px] text-gray-500">
                    (124 reviews)
                  </span>
                </div>

                <div className="flex items-center gap-1 text-green-700">
                  <MapPin size={15} />
                  <span className="text-[14px] italic font-bold">
                    1.2 km away
                  </span>
                </div>
              </div>

              {/* Availability */}
              <div className="mt-4 flex items-center gap-2 bg-emerald-100 px-4 py-3 rounded-full">
                <span className="w-2 h-2 rounded-full bg-green-700" />
                <span className="text-[14px] italic font-bold text-green-700">
                  Available Now
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-2 bg-gray-50 mt-6" />

            {/* ================= STATS ================= */}
            <div className="px-4 py-5 flex flex-wrap justify-center gap-4">

              <StatCard
                icon={<BriefcaseBusiness size={19} color="#008000" />}
                value="156"
                label="Jobs"
              />

              <StatCard
                icon={<Award size={19} color="#008000" />}
                value="5 Years"
                label="Experience"
              />

              <StatCard
                icon={<Star size={19} color="#008000" />}
                value="95%"
                label="Rating"
              />

              <StatCard
                icon={<Clock3 size={19} color="#008000" />}
                value="<1hr"
                label="Response"
              />

            </div>

            {/* ================= CONTACT BUTTONS ================= */}
            <div className="h-2 bg-gray-50" />

            <div className="flex items-center justify-center gap-4 py-5">

              <button
                className="h-[50px] w-[124px] rounded-[15px] bg-[#00C48C] flex items-center justify-center gap-2 text-white"
                onClick={() => {
                  window.open(
                    "https://wa.me/",
                    "_blank"
                  );
                }}
              >
                <MessageCircle size={18} />
                <span className="text-[15px] italic font-bold">
                  WhatsApp
                </span>
              </button>

              <button
                className="h-[50px] w-[101px] rounded-[15px] bg-[#008000] flex items-center justify-center gap-2 text-white"
                onClick={() => {
                  window.location.href = "tel:";
                }}
              >
                <Phone size={18} />
                <span className="text-[15px] italic font-bold">
                  Call
                </span>
              </button>

              <button
                onClick={() => navigate("/message")}
                className="h-[50px] w-[124px] rounded-[15px] border border-[#008000] bg-white flex items-center justify-center gap-2 text-[#008000]"
              >
                <MessageCircle size={18} />
                <span className="text-[15px] italic font-bold">
                  Message
                </span>
              </button>

            </div>

            <div className="h-2 bg-gray-50" />

            {/* ================= ABOUT ================= */}
            <section className="px-6 py-5">

              <div className="flex justify-between items-center mb-5">
                <h2 className="text-[16px] font-bold text-gray-800">
                  About
                </h2>

                <button className="text-[14px] italic font-bold text-green-700">
                  Read more
                </button>
              </div>

              <p className="text-[15px] leading-5 text-gray-600">
                Professional auto repair service with over 5 years
                of experience. Specialized in engine diagnostics,
                brake systems, and AC repair. We provide quality
                service with genuine parts and offer warranty on
                all repairs.
              </p>

              {/* Skills */}
              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  "Engine Repair",
                  "Brake Systems",
                  "AC Repair",
                  "Diagnostics",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-3 rounded-full bg-emerald-100 text-green-700 text-xs italic font-bold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* ================= WORKING HOURS ================= */}
            <div className="px-6 pb-5">
              <div className="bg-gray-50 rounded-[15px] p-4">

                <h2 className="text-[14px] font-bold text-gray-800 mb-6">
                  Working Hours
                </h2>

                <div className="flex justify-between">

                  <div className="flex flex-col gap-6">
                    {workingHours.map(([day], index) => (
                      <span
                        key={day}
                        className={`text-[14px] ${
                          index === 1
                            ? "text-green-700 italic font-bold"
                            : "text-gray-500"
                        }`}
                      >
                        {day}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col gap-6 text-right">
                    {workingHours.map(([day, hours]) => (
                      <span
                        key={day}
                        className="text-[14px] text-gray-800"
                      >
                        {hours}
                      </span>
                    ))}
                  </div>

                </div>
              </div>
            </div>

            <div className="h-2 bg-gray-50" />

            {/* ================= SERVICES ================= */}
            <section className="px-6 py-5">

              <h2 className="text-[18px] font-bold text-gray-800 mb-4">
                Services & Pricing
              </h2>

              <div className="flex flex-col gap-4">

                {services.map((service) => (
                  <div
                    key={service.name}
                    className="relative min-h-[84px] rounded-[15px] bg-gray-50 p-4 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-[14px] italic font-bold text-gray-800">
                        {service.name}
                      </p>

                      <p className="mt-2 text-[16px] italic font-bold text-green-700">
                        {service.price}
                      </p>
                    </div>

                    <button className="flex items-center gap-1 text-green-700 text-[12px] italic font-bold">
                      <span>Request</span>
                      <ChevronRight size={13} />
                    </button>
                  </div>
                ))}

              </div>
            </section>

            <div className="h-2 bg-gray-50" />

            {/* ================= CUSTOMER REVIEWS ================= */}
            <section className="px-6 py-5">

              <h2 className="text-[16px] italic font-bold text-gray-800 mb-4">
                Customer Reviews
              </h2>

              <div className="flex flex-col gap-4">

                {reviews.map((review) => (
                  <div
                    key={review.name}
                    className="bg-gray-50 rounded-[15px] p-4"
                  >

                    <div className="flex items-center gap-4">

                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center">
                        <span className="text-xl">
                          👤
                        </span>
                      </div>

                      <div>
                        <p className="text-[14px] font-bold text-gray-800">
                          {review.name}
                        </p>

                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={12}
                                fill="#FCD34D"
                                color="#FCD34D"
                              />
                            ))}
                          </div>

                          <span className="text-[12px] text-gray-400">
                            {review.date}
                          </span>
                        </div>
                      </div>

                    </div>

                    <p className="mt-5 text-[14px] leading-5 text-gray-600">
                      {review.text}
                    </p>

                  </div>
                ))}

              </div>

              <button className="mt-5 flex items-center gap-2 text-green-700 italic font-bold text-[15px]">
                View all 124 reviews
                <ChevronRight size={15} />
              </button>

            </section>

            <div className="h-2 bg-gray-50" />

            {/* ================= WORK GALLERY ================= */}
            <section className="px-6 py-5">

              <h2 className="text-[18px] font-bold text-gray-800 mb-4">
                Work Gallery
              </h2>

              <div className="grid grid-cols-2 gap-4">

                <div className="h-[150px] rounded-xl bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center overflow-hidden">
                  <Wrench size={55} color="white" />
                </div>

                <div className="h-[150px] rounded-xl bg-gradient-to-br from-green-600 to-emerald-300 flex items-center justify-center overflow-hidden">
                  <span className="text-white text-5xl">🚗</span>
                </div>

              </div>

            </section>

            <div className="h-2 bg-gray-50" />

            {/* ================= LOCATION ================= */}
            <section className="px-6 py-5">

              <h2 className="text-[18px] font-bold text-gray-800 mb-5">
                Location
              </h2>

              {/* Map placeholder */}
              <div className="relative h-[200px] rounded-[15px] overflow-hidden bg-gradient-to-br from-emerald-400 via-green-600 to-green-800">

                {/* Fake map roads */}
                <div className="absolute left-[-20px] top-[90px] w-[450px] h-[30px] bg-white/30 rotate-[15deg]" />
                <div className="absolute left-[150px] top-[-30px] w-[25px] h-[280px] bg-white/20 rotate-[20deg]" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center">
                    <MapPin
                      size={26}
                      fill="#008000"
                      color="#008000"
                    />
                  </div>
                </div>

              </div>

              <div className="mt-4 flex gap-4">

                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <MapPin size={20} color="#008000" />
                </div>

                <div>
                  <p className="text-[14px] italic font-bold text-gray-800">
                    Tunde Motors Workshop
                  </p>

                  <p className="mt-1 text-[14px] leading-5 text-gray-500">
                    15 Obafemi Awolowo Way, Ikeja GRA,
                    Lagos, Nigeria
                  </p>
                </div>

              </div>

              <button className="mt-5 w-full h-[50px] rounded-[15px] border-[1.5px] border-green-700 flex items-center justify-center gap-2 text-green-700">
                <Navigation size={17} />
                <span className="text-[15px] italic font-bold">
                  Get Directions
                </span>
              </button>

            </section>

            {/* Bottom spacing */}
            <div className="h-8" />

          </section>
        </div>

        {/* ================= IPHONE HOME INDICATOR ================= */}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-white z-50 flex justify-center items-center">
          <div className="w-[108px] h-1 bg-black rounded-full" />
        </div>

      </div>
    </div>
  );
}


/* ================= STAT CARD ================= */

function StatCard({ icon, value, label }) {
  return (
   <div
  className="
    w-full
    h-[132px]
    bg-gray-50
    rounded-[15px]
    flex
    flex-col
    items-center
    justify-center
    gap-4
  "
>

      <div className="w-10 h-10 rounded-[15px] bg-emerald-100 flex items-center justify-center">
        {icon}
      </div>

      <div className="text-center">
        <p className="text-[20px] leading-6 italic font-bold text-gray-800">
          {value}
        </p>

        <p className="mt-1 text-[13px] text-gray-500">
          {label}
        </p>
      </div>

    </div>
  );
}

export default ViewProfile;