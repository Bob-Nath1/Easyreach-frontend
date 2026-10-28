import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Pencil,
  MapPin,
  Mail,
  Phone,
  CheckCircle,
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


const [savedProfile] = useState(() => {
  try {
    return JSON.parse(localStorage.getItem("profile") || "null");
  } catch {
    return null;
  }
});


const [user, setUser] = useState(null);
const [loadingUser, setLoadingUser] = useState(true);
const [providerProfile, setProviderProfile] = useState(null);
const [loadingProviderProfile, setLoadingProviderProfile] = useState(true);
const [providerProfileError, setProviderProfileError] = useState("");
const [profileError, setProfileError] = useState("");



const [profileImageFailed, setProfileImageFailed] = useState(false);useEffect(() => {
  setProfileImageFailed(false);
}, [user?.profileImage]);



useEffect(() => {
  let cancelled = false;

  const fetchProfiles = async () => {
    try {
      setLoadingUser(true);
      setLoadingProviderProfile(true);
      setProfileError("");
      setProviderProfileError("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please log in to view your profile.");
      }

      // 1. Fetch the account profile.
      const userResponse = await fetch(
        "http://localhost:5000/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userData = await userResponse.json();

      if (!userResponse.ok) {
        throw new Error(
          userData.message || "Unable to load your profile."
        );
      }

      if (cancelled) return;

     const account = userData.user || {};

const updatedAccount = {
  ...account,
  serviceCategory: account.serviceCategory || "",
  occupation: account.occupation || "",
};

setUser(updatedAccount);
localStorage.setItem("user", JSON.stringify(updatedAccount));

      // 2. Only providers need a business profile.
      if (account?.role !== "provider") {
        setProviderProfile(null);
        localStorage.removeItem("providerProfile");
        setLoadingProviderProfile(false);
        return;
      }

      // Use cached business information while fetching fresh data.
      const cachedProfile = JSON.parse(
        localStorage.getItem("providerProfile") || "null"
      );

      if (!cancelled && cachedProfile) {
        setProviderProfile(cachedProfile);
      }

      // 3. Fetch the provider's business profile separately.
      try {
        const providerResponse = await fetch(
          "http://localhost:5000/api/users/provider-profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const providerData = await providerResponse.json();

        if (!providerResponse.ok) {
          throw new Error(
            providerData.message ||
              "Unable to load your business profile."
          );
        }

        if (cancelled) return;

        const profile = providerData.profile || null;

        setProviderProfile(profile);

        localStorage.setItem(
          "providerProfile",
          JSON.stringify(profile)
        );

        // Refresh account information if returned by this endpoint.
        if (providerData.user) {
          const updatedAccount = {
            ...account,
            ...providerData.user,
          };

          setUser(updatedAccount);

          localStorage.setItem(
            "user",
            JSON.stringify(updatedAccount)
          );
        }
      } catch (error) {
        if (!cancelled) {
          console.error(
            "Fetch business profile error:",
            error
          );

          setProviderProfileError(
            error.message ||
              "Unable to load your business profile."
          );
        }
      }
    } catch (error) {
      if (!cancelled) {
        console.error("Fetch account profile error:", error);

        setProfileError(
          error.message || "Unable to load your profile."
        );
      }
    } finally {
      if (!cancelled) {
        setLoadingUser(false);
        setLoadingProviderProfile(false);
      }
    }
  };

  fetchProfiles();

  return () => {
    cancelled = true;
  };
}, []);


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

  const formatLocation = (location) => {
  if (!location) return "Not added yet";

  if (typeof location === "string") {
    return location;
  }

  if (typeof location === "object") {
    return (
      location.address ||
      [
        location.city,
        location.state,
        location.country,
      ]
        .filter(Boolean)
        .join(", ") ||
      "Not added yet"
    );
  }

  return "Not added yet";
};


  return (
    <div className="min-h-screen w-full bg-gray-200 flex items-center justify-center">

            {/* PUT THE ERROR HERE */}
      {profileError && (
        <p className="text-sm text-red-600">
          {profileError}
        </p>
      )}
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
  {(savedProfile?.photo || user?.profileImage) &&
  !profileImageFailed ? (
    <img
      src={savedProfile?.photo || user?.profileImage}
      alt={user?.fullName || "Profile"}
      className="h-full w-full object-cover"
      onError={() => setProfileImageFailed(true)}
    />
  ) : (
    <img
      src="/profile.jpg"
      alt="Default profile"
      className="h-full w-full object-cover"
    />
  )}
</div>


          {/* Name */}
<p
  className="
    absolute
    left-1/2
    top-[188px]
    -translate-x-1/2
    whitespace-nowrap
    text-[20px]
    font-bold
    leading-6
    text-white
  "
>
  {loadingUser
    ? "..."
    : user?.fullName || "User"}
</p>

{/* Username */}
<p
  className="
    absolute
    left-1/2
    top-[213px]
    -translate-x-1/2
    whitespace-nowrap
    text-[12px]
    leading-[15px]
    text-white/80
  "
>
  {loadingUser
    ? "..."
    : user?.username
      ? `@${user.username}`
      : ""}
</p>

            {/* Email */}
            <p
              className="
                absolute
                left-1/2
                top-[238px]
                -translate-x-1/2
                whitespace-nowrap
                text-[14px]
                leading-[17px]
                text-white
              "
            >
              {loadingUser
  ? "..."
  : user?.email || "No email"}
            </p>

            {/* Member + Edit */}
            <div
              className="
                absolute
                left-1/2
                top-[266px]
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
  Member since{" "}
  {loadingUser
    ? "..."
    : user?.createdAt
      ? new Date(user.createdAt).toLocaleDateString(
          "en-US",
          {
            month: "short",
            year: "numeric",
          }
        )
      : "N/A"}
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
<section className="mx-6 mt-4 rounded-[24px] bg-white p-4">
  <div className="flex flex-col gap-4">
    {/* Email */}
    <div className="flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F3F4F6]">
          <Mail size={17} className="text-[#6B7280]" />
        </div>

        <div className="min-w-0">
          <p className="text-[12px] text-[#9CA3AF]">Email</p>
          <p className="break-all text-[14px] text-[#1F2937]">
            {loadingUser ? "..." : user?.email || "No email"}
          </p>
        </div>
      </div>

      <span className="shrink-0 rounded-full bg-[#D1FAE5] px-3 py-2 text-[12px] font-bold text-[#008000]">
        <CheckCircle size={13} className="mr-1 inline" />
        Verified
      </span>
    </div>

    {/* Phone */}
    <div className="flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F3F4F6]">
          <Phone size={17} className="text-[#6B7280]" />
        </div>

        <div className="min-w-0">
          <p className="text-[12px] text-[#9CA3AF]">Phone</p>
          <p className="break-words text-[14px] text-[#1F2937]">
            {loadingUser ? "..." : user?.phone || "No phone number"}
          </p>
        </div>
      </div>

      <span className="shrink-0 text-[12px] text-red-500">
        Verify
      </span>
    </div>

    {/* City */}
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F3F4F6]">
        <MapPin size={17} className="text-[#6B7280]" />
      </div>

      <div className="min-w-0">
        <p className="text-[12px] text-[#9CA3AF]">City</p>
        <p className="break-words text-[14px] text-[#1F2937]">
          {loadingUser ? "..." : user?.city || "No city added"}
        </p>
      </div>
    </div>
  </div>
</section>


          
{/* ================= PROVIDER BUSINESS PROFILE ================= */}
{user?.role === "provider" && (
  <section className="mx-6 mt-4 rounded-[24px] bg-white p-4">
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="text-[16px] font-bold text-[#1F2937]">
        Business Profile
      </h2>

      <button
        type="button"
        onClick={() => navigate("/providerprofile")}
        className="flex shrink-0 items-center gap-1 text-[12px] font-semibold text-[#008000]"
      >
        Edit
        <Pencil size={13} />
      </button>
    </div>

    {loadingProviderProfile ? (
      <p className="text-[13px] text-[#6B7280]">
        Loading business details...
      </p>
    ) : providerProfileError && !providerProfile ? (
      <p className="text-[13px] text-red-600">
        {providerProfileError}
      </p>
    ) : (
      <div className="flex flex-col gap-4">
        {/* Business name */}
        <div>
          <p className="text-[12px] text-[#9CA3AF]">
            Business Name
          </p>
          <p className="mt-1 break-words text-[14px] font-semibold text-[#1F2937]">
            {providerProfile?.businessName || "Not added yet"}
          </p>
        </div>

      
{/* Service Category */}
<div>
  <p className="text-[12px] text-[#9CA3AF]">
    Service Category
  </p>

  <div className="mt-2 flex flex-wrap gap-2">
    {user?.serviceCategory ? (
      <span className="rounded-full bg-[#F0FDF4] px-3 py-1.5 text-[12px] font-semibold text-[#008000]">
        {user.serviceCategory}
      </span>
    ) : (
      <span className="text-[13px] text-[#6B7280]">
        No service category added
      </span>
    )}
  </div>
</div>

{/* Occupation */}
<div className="flex items-start gap-3">
  <User
    size={18}
    className="mt-1 shrink-0 text-[#008000]"
  />

  <div className="min-w-0">
    <p className="text-[12px] text-[#9CA3AF]">
      Occupation
    </p>

    <p className="mt-1 break-words text-[14px] font-semibold text-[#1F2937]">
      {user?.occupation || "Not added yet"}
    </p>
  </div>
</div>

        {/* Business location */}
        <div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-[#008000]" />
            <p className="text-[12px] text-[#9CA3AF]">
              Business Location
            </p>
          </div>

          <p className="mt-1 break-words text-[14px] text-[#1F2937]">
  {formatLocation(providerProfile?.serviceArea)}
</p>
      
        </div>

        {/* Experience */}
        <div>
          <p className="text-[12px] text-[#9CA3AF]">
            Years of Experience
          </p>

          <p className="mt-1 text-[14px] text-[#1F2937]">
            {providerProfile?.yearsOfExperience != null
              ? `${providerProfile.yearsOfExperience} ${
                  Number(providerProfile.yearsOfExperience) === 1
                    ? "year"
                    : "years"
                }`
              : "Not specified"}
          </p>
        </div>

        {/* Business description */}
        <div>
          <p className="text-[12px] text-[#9CA3AF]">
            About Your Business
          </p>

          <p className="mt-1 whitespace-pre-wrap break-words text-[14px] leading-6 text-[#4B5563]">
            {providerProfile?.about ||
              "No business description added yet."}
          </p>
        </div>
      </div>
    )}
  </section>
)}

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