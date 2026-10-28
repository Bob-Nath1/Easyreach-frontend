import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [providerProfile, setProviderProfile] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingProviderProfile, setLoadingProviderProfile] =
    useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/signin", { replace: true });
        return;
      }

      try {
        const [userResponse, providerResponse] = await Promise.all([
          fetch("http://localhost:5000/api/users/profile", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),

          fetch("http://localhost:5000/api/providers/profile", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        const userData = await userResponse.json();
        const providerData = await providerResponse.json();

        if (!userResponse.ok) {
          console.error(
            "Failed to fetch user profile:",
            userData.message
          );
        } else {
          setUser(userData.user);
        }

        if (!providerResponse.ok) {
          console.error(
            "Failed to fetch provider profile:",
            providerData.message
          );
        } else {
          setProviderProfile(providerData.profile);
        }
      } catch (error) {
        console.error("Profile fetch error:", error);
      } finally {
        setLoadingUser(false);
        setLoadingProviderProfile(false);
      }
    };

    fetchProfiles();
  }, [navigate]);

  return (
    <div className="h-screen w-full bg-gray-50 overflow-hidden">
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
        {/* ================= ENTIRE PAGE SCROLL ================= */}
        <div
          className="
            absolute
            inset-0
            overflow-y-auto
            overflow-x-hidden
            scrollbar-hide
            pb-10
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
            <button
              type="button"
              onClick={() => navigate("/editprofile")}
              className="absolute top-[76px] h-[100px] w-[100px] overflow-hidden rounded-full border-[2.4px] border-dashed border-white"
            >
              <img
                src={user?.profileImage || "/profile.jpg"}
                alt={user?.fullName || "Profile"}
                className="h-full w-full object-cover"
              />
            </button>

            {/* Name */}
            <h1 className="absolute top-[176px] text-[24px] leading-[29px] font-bold text-white">
              {loadingUser
                ? "..."
                : user?.fullName || "Provider"}
            </h1>

            <p className="absolute top-[210px] text-sm text-white">
              {loadingUser ? "..." : user?.email || ""}
            </p>

            <p className="absolute top-[232px] text-xs font-medium text-white/90">
              {loadingUser
                ? "..."
                : user?.serviceCategory || "Service Provider"}
            </p>

            {/* Member + edit */}
            <div className="absolute top-[258px] flex items-center gap-4">
              <div className="px-2.5 py-[5px] rounded-full bg-white/20">
                <span className="text-xs text-white">
                  Member since{" "}
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          year: "numeric",
                        }
                      )
                    : "..."}
                </span>
              </div>

              <button
                onClick={() => navigate("/editprofile")}
                className="h-9 px-[15px] rounded-[15px] border-[1.5px] border-white flex items-center gap-2.5"
              >
                <Pencil size={14} className="text-white" />

                <span className="text-sm font-bold text-white">
                  Edit Profile
                </span>
              </button>
            </div>
          </section>

          {/* ================= CONTACT INFO ================= */}
          <section className="mx-6 -mt-[14px] relative z-10 bg-white rounded-[24px] p-4">
            <div className="flex flex-col gap-3">
              <InfoRow
                icon={Mail}
                label="Email"
                value={
                  loadingUser
                    ? "..."
                    : user?.email || "Not provided"
                }
                verified
              />

              <InfoRow
                icon={Phone}
                label="Phone"
                value={
                  loadingUser
                    ? "..."
                    : user?.phone || "Not provided"
                }
              />

              <div className="flex justify-end -mt-8">
                <button className="text-xs text-red-500">
                  Verify
                </button>
              </div>
            </div>
          </section>

          {/* ================= ABOUT HEADER ================= */}
          <div className="mx-6 mt-7">
            <SectionHeader title="About" onEdit={() => {}} />
          </div>

          {/* ================= ABOUT CARD ================= */}
          <section className="mx-6 mt-4 bg-white border border-gray-200 rounded-[15px] p-4">
            <p className="text-sm leading-[22px] text-slate-600">
              {loadingProviderProfile
                ? "Loading..."
                : providerProfile?.about ||
                  "No information provided yet."}
            </p>

            <div className="my-6 border-t border-gray-200" />

            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <span className="text-sm text-slate-500">
                  Years of Experience
                </span>

                <strong className="text-sm text-slate-900">
                  {loadingProviderProfile
                    ? "..."
                    : providerProfile?.yearsOfExperience
                    ? `${providerProfile.yearsOfExperience}+ years`
                    : "Not provided"}
                </strong>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-slate-500">
                  Completion Rate
                </span>

                <strong className="text-sm text-emerald-700">
                  {loadingProviderProfile
                    ? "..."
                    : providerProfile?.completionRate != null
                    ? `${providerProfile.completionRate}%`
                    : "Not provided"}
                </strong>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-slate-500">
                  Response Time
                </span>

                <strong className="text-sm text-emerald-700">
                  {loadingProviderProfile
                    ? "..."
                    : providerProfile?.responseTime ||
                      "Not provided"}
                </strong>
              </div>
            </div>

            <div className="my-6 border-t border-gray-200" />

            <div>
              <p className="text-sm text-slate-500 mb-3">
                Specializations
              </p>

              <div className="flex flex-wrap gap-2">
                {(providerProfile?.specializations || []).map(
                  (item) => (
                    <span
                      key={item}
                      className="px-3 py-2 rounded-full bg-emerald-100 text-[12px] leading-[15px] font-bold text-emerald-800"
                    >
                      {item}
                    </span>
                  )
                )}
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
              {Object.entries(
                providerProfile?.workingHours || {}
              ).map(([day, time], index, entries) => {
                const isClosed = time === "Closed";

                const today = new Date()
                  .toLocaleDateString("en-US", {
                    weekday: "long",
                  })
                  .toLowerCase();

                const isToday =
                  day.toLowerCase() === today;

                return (
                  <React.Fragment key={day}>
                    <div className="flex items-center justify-between py-2">
                      <span
                        className={`text-sm ${
                          isToday
                            ? "font-bold text-[#008000]"
                            : "text-slate-900"
                        }`}
                      >
                        {day.charAt(0).toUpperCase() +
                          day.slice(1)}
                      </span>

                      <span
                        className={`text-sm ${
                          isClosed
                            ? "text-slate-400"
                            : isToday
                            ? "font-bold text-[#008000]"
                            : "text-slate-500"
                        }`}
                      >
                        {time}
                      </span>
                    </div>

                    {index < entries.length - 1 && (
                      <div className="border-t border-gray-200" />
                    )}
                  </React.Fragment>
                );
              })}
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
                  {user?.searchRadius || "Not provided"}
                </strong>
              </div>

              <div className="border-t border-gray-200" />

              <div className="flex justify-between py-3">
                <span className="text-sm text-slate-500">
                  Specific Areas
                </span>

                <strong className="text-sm text-slate-900 text-right max-w-[60%]">
                  {providerProfile?.serviceArea?.length
                    ? providerProfile.serviceArea.join(", ")
                    : "Not provided"}
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
              {(providerProfile?.languages || []).map(
                (language) => (
                  <span
                    key={language}
                    className="px-3 py-2 rounded-full bg-emerald-100 text-xs font-bold text-emerald-800"
                  >
                    {language}
                  </span>
                )
              )}
            </div>
          </section>

          {/* ================= CERTIFICATIONS ================= */}
          <section className="mx-6 mt-4 mb-10 bg-white rounded-[15px] p-4">
            <h3 className="text-sm font-bold text-slate-900">
              Certifications & Licenses
            </h3>

            <div className="mt-6 flex flex-col gap-2">
              {(providerProfile?.certifications || []).map(
                (certification) => {
                  return (
                    <div
                      key={certification}
                      className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Award
                          size={17}
                          className="text-[#008000]"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-bold text-slate-900">
                          {certification}
                        </span>

                        <span className="text-xs text-blue-500">
                          ✓ Verified
                        </span>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </section>

          {/* ================= CUSTOMER REVIEWS ================= */}
          <section className="mx-6 mt-8 pb-170">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">
                Customer Reviews{" "}
                <span className="text-sm text-slate-500">
                  (142)
                </span>
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
    </div>
  );
}

export default PersonalInfo;