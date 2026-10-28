import React, { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
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
  ChevronRight,
  Wrench,
  ImagePlus,
} from "lucide-react";

function ViewProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const provider = location.state?.provider || null;

  const providerId =
    provider?.id ||
    searchParams.get("provider");

  const [providerProfile, setProviderProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    const fetchProviderProfile = async () => {
      if (!providerId) {
        setLoadingProfile(false);
        return;
      }

      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://localhost:5000/api/providers/${providerId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch provider profile"
          );
        }

        setProviderProfile(data.provider);
      } catch (error) {
        console.error("Fetch provider profile error:", error);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProviderProfile();
  }, [providerId]);

  const displayProvider = providerProfile || provider;

  const displayName =
    displayProvider?.fullName ||
    displayProvider?.full_name ||
    "Provider";

  const displayCategory =
    displayProvider?.serviceCategory ||
    displayProvider?.service_category ||
    "Service Provider";

  const displayImage =
    displayProvider?.profileImage ||
    displayProvider?.profile_image ||
    null;

  const displayAddress =
    displayProvider?.realAddress ||
    displayProvider?.real_address ||
    displayProvider?.city ||
    "Location unavailable";

  const latitude = Number(displayProvider?.latitude);
  const longitude = Number(displayProvider?.longitude);

  const hasCoordinates =
    Number.isFinite(latitude) &&
    Number.isFinite(longitude);

  const services = Array.isArray(displayProvider?.services)
    ? displayProvider.services
    : [];

  const gallery = Array.isArray(displayProvider?.gallery)
    ? displayProvider.gallery
    : [];

  const specializations = Array.isArray(
    displayProvider?.specializations
  )
    ? displayProvider.specializations
    : [];

  const workingHours =
    displayProvider?.workingHours &&
    typeof displayProvider.workingHours === "object"
      ? displayProvider.workingHours
      : {};

  const handleRequestService = (service) => {
    if (!providerId) {
      alert("This provider profile is not connected to a provider account.");
      return;
    }

    navigate("/confirmbooking", {
      state: {
        provider: displayProvider,
        service: {
          name:
            service?.name ||
            service?.title ||
            displayCategory,
          price:
            service?.price !== undefined &&
            service?.price !== null
              ? service.price
              : null,
        },
      },
    });
  };

  const handleDirections = () => {
    if (!hasCoordinates) {
      alert("This provider has not added a valid location yet.");
      return;
    }

    const destination = `${latitude},${longitude}`;

    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
        destination
      )}`,
      "_blank"
    );
  };

  const handleCall = () => {
    const phone =
      displayProvider?.phone ||
      displayProvider?.phoneNumber;

    if (!phone) {
      alert("This provider has not added a phone number.");
      return;
    }

    window.location.href = `tel:${phone}`;
  };

  const handleWhatsApp = () => {
    const phone =
      displayProvider?.phone ||
      displayProvider?.phoneNumber;

    if (!phone) {
      alert("This provider has not added a phone number.");
      return;
    }

    const cleanPhone = String(phone).replace(/\D/g, "");

    window.open(
      `https://wa.me/${cleanPhone}`,
      "_blank"
    );
  };

  const handleShareProfile = async () => {
  if (!providerId) {
    alert("This provider profile cannot be shared right now.");
    return;
  }

  const shareUrl = `${window.location.origin}/viewprofile?provider=${providerId}`;

  const shareData = {
    title: `${displayName} - EasyReach`,
    text: `Check out ${displayName}'s profile on EasyReach.`,
    url: shareUrl,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    await navigator.clipboard.writeText(shareUrl);

    alert("Profile link copied to clipboard.");
  } catch (error) {
    // User cancelling the native share dialog is not an error.
    if (error?.name === "AbortError") {
      return;
    }

    console.error("Share profile error:", error);

    try {
      await navigator.clipboard.writeText(shareUrl);
      alert("Profile link copied to clipboard.");
    } catch (clipboardError) {
      console.error(
        "Copy profile link error:",
        clipboardError
      );

      alert("Unable to share or copy the profile link.");
    }
  }
};

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

            {/* Cover */}
            <div className="relative h-[151px] w-full overflow-hidden bg-gradient-to-br from-green-700 to-emerald-400">
              <div className="absolute inset-0 bg-gradient-to-br from-green-900/50 via-green-700/20 to-emerald-400/30" />

              <button
                onClick={() => navigate(-1)}
                type="button"
                className="
                  absolute
                  left-6
                  top-8
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  shadow
                "
              >
                <ArrowLeft size={24} color="#1F2937" />
              </button>
<button
  type="button"
  onClick={handleShareProfile}
  aria-label={`Share ${displayName}'s profile`}
  className="
    absolute
    right-6
    top-8
    flex
    h-10
    w-10
    items-center
    justify-center
    rounded-full
    bg-white
    shadow
  "
>
  <Share2 size={21} color="#000" />
</button>
            </div>

            {/* Provider information */}
            <div className="relative z-10 -mt-[35px] flex flex-col items-center">

              {/* Profile image */}
              <div className="h-[100px] w-[100px] rounded-full bg-white p-1 shadow-md">
                <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-gray-300 to-gray-500">
                  {displayImage ? (
                    <img
                      src={displayImage}
                      alt={displayName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl">
                      👨🏾‍🔧
                    </span>
                  )}
                </div>
              </div>

              {/* Name */}
              <div className="mt-3 flex items-center gap-2">
                <h1 className="text-[24px] leading-[29px] font-bold text-gray-800">
                  {displayName}
                </h1>

                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-700">
                  <BadgeCheck size={17} color="white" />
                </span>
              </div>

              <p className="mt-1 text-[16px] text-gray-500">
                {displayCategory}
              </p>

              {/* Distance */}
              <div className="mt-4 flex items-center gap-2">
                <MapPin
                  size={15}
                  className="text-green-700"
                />

                <span className="text-[14px] italic font-bold text-green-700">
                  {provider?.distance_meters !== undefined
                    ? Number(provider.distance_meters) < 1000
                      ? `${Math.round(
                          Number(provider.distance_meters)
                        )}m away`
                      : `${(
                          Number(provider.distance_meters) / 1000
                        ).toFixed(1)} km away`
                    : "Distance unavailable"}
                </span>
              </div>

              {/* Availability */}
              <div className="mt-4 flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-3">
                <span className="h-2 w-2 rounded-full bg-green-700" />

                <span className="text-[14px] italic font-bold text-green-700">
                  Available
                </span>
              </div>
            </div>

            <div className="mt-6 h-2 bg-gray-50" />

            {/* ================= STATS ================= */}
            <div className="grid grid-cols-2 gap-3 px-4 py-5 md:grid-cols-4">

              <StatCard
                icon={
                  <BriefcaseBusiness
                    size={19}
                    color="#008000"
                  />
                }
                value={
                  displayProvider?.yearsOfExperience
                    ? `${displayProvider.yearsOfExperience} Years`
                    : "—"
                }
                label="Experience"
              />

              <StatCard
                icon={
                  <Award
                    size={19}
                    color="#008000"
                  />
                }
                value={
                  displayProvider?.completionRate !== null &&
                  displayProvider?.completionRate !== undefined
                    ? `${displayProvider.completionRate}%`
                    : "—"
                }
                label="Completion"
              />

              <StatCard
                icon={
                  <Star
                    size={19}
                    color="#008000"
                  />
                }
                value="—"
                label="Rating"
              />

              <StatCard
                icon={
                  <Clock3
                    size={19}
                    color="#008000"
                  />
                }
                value={
                  displayProvider?.responseTime || "—"
                }
                label="Response"
              />
            </div>

            {/* ================= CONTACT BUTTONS ================= */}
            <div className="h-2 bg-gray-50" />

            <div className="flex flex-wrap items-center justify-center gap-3 px-4 py-5">

              <button
                type="button"
                onClick={handleWhatsApp}
                className="
                  flex
                  h-[50px]
                  w-[124px]
                  items-center
                  justify-center
                  gap-2
                  rounded-[15px]
                  bg-[#00C48C]
                  text-white
                "
              >
                <MessageCircle size={18} />

                <span className="text-[15px] italic font-bold">
                  WhatsApp
                </span>
              </button>

              <button
                type="button"
                onClick={handleCall}
                className="
                  flex
                  h-[50px]
                  w-[101px]
                  items-center
                  justify-center
                  gap-2
                  rounded-[15px]
                  bg-[#008000]
                  text-white
                "
              >
                <Phone size={18} />

                <span className="text-[15px] italic font-bold">
                  Call
                </span>
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate("/message", {
                    state: {
                      provider: displayProvider,
                    },
                  })
                }
                className="
                  flex
                  h-[50px]
                  w-[124px]
                  items-center
                  justify-center
                  gap-2
                  rounded-[15px]
                  border
                  border-[#008000]
                  bg-white
                  text-[#008000]
                "
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

              <h2 className="mb-4 text-[16px] font-bold text-gray-800">
                About
              </h2>

              <p className="text-[15px] leading-5 text-gray-600">
                {displayProvider?.about ||
                  "This provider has not added an about description yet."}
              </p>

              {/* Specializations */}
              {specializations.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {specializations.map((skill) => (
                    <span
                      key={skill}
                      className="
                        rounded-full
                        bg-emerald-100
                        px-4
                        py-3
                        text-xs
                        font-bold
                        italic
                        text-green-700
                      "
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </section>

            {/* ================= WORKING HOURS ================= */}
            <div className="px-6 pb-5">
              <div className="rounded-[15px] bg-gray-50 p-4">

                <h2 className="mb-6 text-[14px] font-bold text-gray-800">
                  Working Hours
                </h2>

                <div className="flex flex-col gap-5">
                  {Object.keys(workingHours).length > 0 ? (
                    Object.entries(workingHours).map(
                      ([day, hours]) => (
                        <div
                          key={day}
                          className="flex items-center justify-between gap-4"
                        >
                          <span className="text-[14px] capitalize text-gray-500">
                            {day}
                          </span>

                          <span className="text-right text-[14px] text-gray-800">
                            {hours}
                          </span>
                        </div>
                      )
                    )
                  ) : (
                    <p className="text-[14px] text-gray-500">
                      Working hours not provided.
                    </p>
                  )}
                </div>

              </div>
            </div>

            <div className="h-2 bg-gray-50" />

            {/* ================= SERVICES ================= */}
            <section className="px-6 py-5">

              <h2 className="mb-4 text-[18px] font-bold text-gray-800">
                Services & Pricing
              </h2>

              {services.length === 0 ? (
                <div className="rounded-[15px] bg-gray-50 p-5">
                  <p className="text-[14px] text-gray-500">
                    This provider has not added any services or pricing yet.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">

                  {services.map((service, index) => (
                    <div
                      key={`${service.name}-${index}`}
                      className="
                        flex
                        min-h-[84px]
                        items-center
                        justify-between
                        gap-4
                        rounded-[15px]
                        bg-gray-50
                        p-4
                      "
                    >
                      <div className="min-w-0">
                        <p className="text-[15px] font-bold text-gray-800">
                          {service.name}
                        </p>

                        {service.description && (
                          <p className="mt-1 text-[13px] leading-5 text-gray-500">
                            {service.description}
                          </p>
                        )}

                        <p className="mt-2 text-[16px] font-bold italic text-green-700">
                          ₦
                          {Number(service.price || 0).toLocaleString()}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          handleRequestService(service)
                        }
                        className="
                          flex
                          shrink-0
                          items-center
                          gap-1
                          text-[12px]
                          font-bold
                          italic
                          text-green-700
                        "
                      >
                        <span>Request</span>
                        <ChevronRight size={13} />
                      </button>
                    </div>
                  ))}

                </div>
              )}
            </section>

            <div className="h-2 bg-gray-50" />

            {/* ================= WORK GALLERY ================= */}
            <section className="px-6 py-5">

              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-[18px] font-bold text-gray-800">
                  Work Gallery
                </h2>

                {gallery.length > 0 && (
                  <span className="text-[12px] text-gray-500">
                    {gallery.length} photo
                    {gallery.length !== 1 ? "s" : ""}
                  </span>
                )}
              </div>

              {gallery.length === 0 ? (
                <div className="flex min-h-[150px] flex-col items-center justify-center rounded-[15px] bg-gray-50 px-5 text-center">
                  <ImagePlus
                    size={32}
                    className="mb-3 text-gray-400"
                  />

                  <p className="text-[14px] font-semibold text-gray-600">
                    No work photos yet
                  </p>

                  <p className="mt-1 text-[12px] text-gray-400">
                    The provider can add photos of their work,
                    business or products.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">

                  {gallery.map((image, index) => (
                    <div
                      key={`${image}-${index}`}
                      className="
                        h-[150px]
                        overflow-hidden
                        rounded-[15px]
                        bg-gray-100
                      "
                    >
                      <img
                        src={image}
                        alt={`${displayName} work ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}

                </div>
              )}
            </section>

            <div className="h-2 bg-gray-50" />

            {/* ================= LOCATION ================= */}
            <section className="px-6 py-5">

              <h2 className="mb-5 text-[18px] font-bold text-gray-800">
                Location
              </h2>

              {/* Real map */}
              {hasCoordinates ? (
                <div className="overflow-hidden rounded-[15px] border border-gray-200">

                  <iframe
                    title={`${displayName} location`}
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${(
                      longitude - 0.01
                    ).toFixed(6)}%2C${(
                      latitude - 0.01
                    ).toFixed(6)}%2C${(
                      longitude + 0.01
                    ).toFixed(6)}%2C${(
                      latitude + 0.01
                    ).toFixed(6)}&layer=mapnik&marker=${latitude}%2C${longitude}`}
                    className="h-[220px] w-full border-0"
                    loading="lazy"
                  />

                </div>
              ) : (
                <div className="flex h-[200px] items-center justify-center rounded-[15px] bg-gray-100">
                  <div className="text-center">
                    <MapPin
                      size={32}
                      className="mx-auto mb-2 text-gray-400"
                    />

                    <p className="text-[14px] text-gray-500">
                      Provider location not available
                    </p>
                  </div>
                </div>
              )}

              {/* Address */}
              <div className="mt-4 flex gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100">
                  <MapPin
                    size={20}
                    color="#008000"
                  />
                </div>

                <div>
                  <p className="text-[14px] font-bold italic text-gray-800">
                    {displayName}
                  </p>

                  <p className="mt-1 text-[14px] leading-5 text-gray-500">
                    {displayAddress}
                  </p>
                </div>

              </div>

              {/* Directions */}
           

            </section>

            <div className="h-8" />

          </section>
        </div>

        {/* ================= IPHONE HOME INDICATOR ================= */}
        <div className="absolute bottom-0 left-0 right-0 z-50 flex h-6 items-center justify-center bg-white">
          <div className="h-1 w-[108px] rounded-full bg-black" />
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
        flex
        h-[132px]
        w-full
        flex-col
        items-center
        justify-center
        gap-4
        rounded-[15px]
        bg-gray-50
      "
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-[15px] bg-emerald-100">
        {icon}
      </div>

      <div className="text-center">
        <p className="text-[20px] leading-6 font-bold italic text-gray-800">
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