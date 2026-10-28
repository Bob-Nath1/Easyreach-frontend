
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Wrench,
  MapPin,
  Navigation,
  CreditCard,
  Banknote,
  Smartphone,
  Info,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Phone,
  Check,
} from "lucide-react";

const API_URL = "http://localhost:5000";

// Validate the supported service distance ranges
const getValidDistanceRange = (value) => {
  const parsed = Number(
    String(value ?? "")
      .replace(/km/i, "")
      .trim()
  );

  return [1, 2, 5, 10].includes(parsed)
    ? parsed
    : null;
};


function ConfirmBooking() {
  const navigate = useNavigate();
  const location = useLocation();

  // ================= PROVIDER AND SERVICE DATA =================
  const provider = location.state?.provider || null;
  const service = location.state?.service || null;

  const providerId = provider?.id;

  const providerImage =
  provider?.profile_image ||
  provider?.profileImage ||
  provider?.image ||
  provider?.avatar ||
  null;

  const providerName =
  provider?.full_name ||
  provider?.fullName ||
  provider?.name ||
  "Selected Provider";

const providerCategory =
  provider?.service_category ||
  provider?.serviceCategory ||
  "General Service";

const providerDistance =
  provider?.distance_meters != null
    ? `${(Number(provider.distance_meters) / 1000).toFixed(1)} km away`
    : provider?.distance || "Distance unavailable";


// ================= PROVIDER PRICING =================
const [distanceRangeKm, setDistanceRangeKm] = useState(
  getValidDistanceRange(location.state?.distanceRangeKm)
);

const [providerPrices, setProviderPrices] = useState([]);
const [loadingPrice, setLoadingPrice] = useState(true);
const [priceError, setPriceError] = useState("");

const serviceName =
  provider?.service_category ||
  provider?.serviceCategory ||
  service?.name ||
  service?.title ||
  "General Service";

const availableDistanceRanges = [
  ...new Set(
    providerPrices
      .filter(
        (item) =>
          String(
            item.serviceCategory ?? item.service_category ?? ""
          ).toLowerCase() === serviceName.toLowerCase()
      )
      .map((item) =>
        Number(item.distanceRangeKm ?? item.distance_range_km)
      )
      .filter((range) => [1, 2, 5, 10].includes(range))
  ),
].sort((a, b) => a - b);

const selectedPrice =
  distanceRangeKm === null
    ? null
    : providerPrices.find(
        (item) =>
          String(
            item.serviceCategory ?? item.service_category ?? ""
          ).toLowerCase() === serviceName.toLowerCase() &&
          Number(
            item.distanceRangeKm ?? item.distance_range_km
          ) === Number(distanceRangeKm)
      )?.price ?? null;

  // ================= FORM STATE =================
  const [description, setDescription] = useState(
    location.state?.description || ""
  );

  const [serviceDate, setServiceDate] = useState("");
  const [serviceTime, setServiceTime] = useState("");
  const [editingDateTime, setEditingDateTime] = useState(true);

  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [agreed, setAgreed] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // ================= DATE HELPERS =================
  const getTodayLocalDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const isValidFutureDateTime = () => {
    if (!serviceDate || !serviceTime) {
      return false;
    }

    const selectedDateTime = new Date(
      `${serviceDate}T${serviceTime}`
    );

    return (
      !Number.isNaN(selectedDateTime.getTime()) &&
      selectedDateTime > new Date()
    );
  };

  const formatServiceDateTime = () => {
    if (!serviceDate || !serviceTime) {
      return "";
    }

    const selectedDateTime = new Date(
      `${serviceDate}T${serviceTime}`
    );

    if (Number.isNaN(selectedDateTime.getTime())) {
      return "";
    }

    return selectedDateTime.toLocaleString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  // ================= ACCORDION =================
  const toggleSection = (section) => {
    setOpenSection((previous) =>
      previous === section ? null : section
    );
  };

  // ================= SAVE DATE AND TIME =================
  const handleSaveDateTime = () => {
    if (!serviceDate || !serviceTime) {
      setError("Please select both a date and a time.");
      return;
    }

    if (!isValidFutureDateTime()) {
      setError("Please select a future date and time.");
      return;
    }

    setError("");
    setEditingDateTime(false);
  };

// ================= LOAD OFFERINGS AND PRICES =================
useEffect(() => {
  let cancelled = false;

  const loadBookingOptions = async () => {
    if (!providerId) {
      setPriceError("Provider information is missing.");
      setLoadingPrice(false);
      return;
    }

    try {
      setLoadingPrice(true);
      setPriceError("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please log in to continue.");
      }

      // Fetch the seeker's saved distance.
    let savedDistance = distanceRangeKm;

      if (savedDistance === null) {
        const profileResponse = await fetch(
          `${API_URL}/api/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const profileData = await profileResponse.json();

        if (!profileResponse.ok) {
          throw new Error(
            profileData.message ||
              "Could not load your saved service distance."
          );
        }

        savedDistance = getValidDistanceRange(
          profileData.user?.searchRadius
        );
      }

      // Fetch all active offerings and their saved prices.
      const response = await fetch(
        `${API_URL}/api/pricing/${providerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Could not load provider offerings."
        );
      }

      if (cancelled) return;

    console.log("Provider pricing response:", data);
console.log("Service category being matched:", serviceName);
      setProviderPrices(data.prices || []);

      if (savedDistance !== null) {
        setDistanceRangeKm(savedDistance);
      }
    } catch (err) {
      if (!cancelled) {
        setPriceError(
          err.message || "Unable to load booking options."
        );
      }
    } finally {
      if (!cancelled) {
        setLoadingPrice(false);
      }
    }
  };

  loadBookingOptions();

  return () => {
    cancelled = true;
  };
}, [providerId]);

// ================= SUBMIT REQUEST =================
  const handleProceed = async () => {
    setError("");

    if (!agreed) {
      setError("Please agree to the booking terms and conditions.");
      return;
    }

    if (!providerId) {
      setError(
        "Provider information is missing. Please go back and select a provider."
      );
      return;
    }

if (!serviceDate || !serviceTime) {
  setError("Please select your preferred service date and time.");
  setEditingDateTime(true);
  return;
}

const scheduledDateTime = new Date(
  `${serviceDate}T${serviceTime}`
);

if (
  Number.isNaN(scheduledDateTime.getTime()) ||
  scheduledDateTime <= new Date()
) {
  setError("Please select a future date and time.");
  setEditingDateTime(true);
  return;
}



    if (!description.trim()) {
      setError(
        "Please describe what you need the provider to help you with."
      );
      return;
    }

    if (!isValidFutureDateTime()) {
      setEditingDateTime(true);
      setError("Please select a valid future date and time.");
      return;
    }

const token = localStorage.getItem("token");

if (!token) {
  setError("Your session has expired. Please log in again.");
  return;
}

try {
  setSubmitting(true);

  const response = await fetch(`${API_URL}/api/requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
body: JSON.stringify({
  providerId: Number(providerId),
  serviceCategory: serviceName,
  description: description.trim(),
  serviceDateTime: scheduledDateTime.toISOString(),
}),



  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to create service request."
    );
  }

  navigate("/seekrequest", {
    replace: true,
    state: {
      requestCreated: true,
      requestId: data.request?.id,
    },
  });
} catch (requestError) {
  console.error("Create service request error:", requestError);
  setError(
    requestError.message ||
      "Something went wrong while creating your request."
  );
} finally {
  setSubmitting(false);
}
}; // Close handleProceed here

return (
    <div
      className="
        relative
        mx-auto
        h-[925px]
        w-full
        sm:w-[640px]
        md:w-[768px]
        lg:w-[1024px]
        xl:w-[1280px]
        2xl:w-[1536px]
        md:h-[1025px]
        lg:h-[1200px]
        xl:h-[1200px]
        2xl:h-[1200px]
        overflow-hidden
        rounded-[35px]
        bg-[#F9FAFB]
        font-['Inter']
      "
    >
      {/* ================= HEADER ================= */}
      <div
        className="
          absolute
          left-1/2
          top-[62px]
          flex
          h-[75px]
          w-full
          -translate-x-1/2
          items-center
          justify-between
          border
          border-[#E5E7EB]
          bg-white
          px-6
          pb-4
          pt-1
        "
      >
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="flex h-6 w-6 items-center justify-center"
          >
            <ArrowLeft size={24} strokeWidth={2} />
          </button>

          <div>
            <p className="text-[20px] font-bold leading-6 text-[#1F2937]">
              Confirm Booking
            </p>
          </div>
        </div>
      </div>

      {/* ================= SCROLLABLE CONTENT ================= */}
      <div
        className="
          absolute
          left-6
          right-6
          top-[161px]
          bottom-[24px]
          overflow-y-auto
          pb-8
          pr-0
          scrollbar-hide
        "
      >
        <div className="flex flex-col gap-6">
          {/* ================= PROVIDER CARD ================= */}
          <div className="flex min-h-[138px] w-full items-center gap-3 rounded-[24px] bg-[rgba(0,128,0,0.8)] px-4 py-8">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
              {providerImage ? (
                <img
                  src={providerImage}
                  alt={providerName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-100 text-2xl">
                  🔧
                </div>
              )}
            </div>

            <div className="flex min-w-0 flex-col gap-2">
              <h2 className="text-[20px] font-bold leading-6 text-white">
                Booking with {providerName}
              </h2>

              <p className="text-[14px] leading-[17px] text-white">
                {providerCategory}
              </p>

              <p className="text-[14px] leading-[17px] text-white">
                {providerDistance}
              </p>
            </div>
          </div>

{/* ================= SERVICE DETAILS ================= */}
<div className="rounded-[15px] bg-white p-4">
  <label
    htmlFor="serviceDescription"
    className="mb-2 block text-[16px] font-bold text-[#1F2937]"
  >
    What service do you need?
  </label>

  <p className="mb-3 text-[13px] leading-5 text-[#6B7280]">
    Describe the work you need. Include any relevant details
    so the provider can understand your request.
  </p>

  <textarea
    id="serviceDescription"
    value={description}
    onChange={(event) => setDescription(event.target.value)}
    placeholder="Describe the service you need..."
    rows={4}
    className="w-full resize-y rounded-[12px] border border-[#E5E7EB] bg-[#F9FAFB] p-3 text-[14px] text-[#1F2937] outline-none focus:border-[#008000]"
  />
</div>


{/* ================= DATE & TIME ================= */}
<div className="rounded-[15px] bg-white p-4">
  <div className="flex items-center justify-between gap-3">
    <h3 className="text-[16px] font-bold text-[#1F2937]">
      Date & Time
    </h3>

    {!editingDateTime && (
      <button
        type="button"
        onClick={() => setEditingDateTime(true)}
        className="text-[13px] font-bold text-[#008000]"
      >
        Change
      </button>
    )}
  </div>

  {editingDateTime ? (
    <div className="mt-4 flex flex-col gap-4">
      <div>
        <label
          htmlFor="serviceDate"
          className="mb-2 block text-[13px] font-medium text-[#6B7280]"
        >
          Preferred date
        </label>

        <input
          id="serviceDate"
          type="date"
          min={getTodayLocalDate()}
          value={serviceDate}
          onChange={(event) => {
            setServiceDate(event.target.value);
            setError("");
          }}
          className="w-full rounded-[12px] border border-[#E5E7EB] bg-[#F9FAFB] p-3 text-[14px] text-[#1F2937] outline-none focus:border-[#008000]"
        />
      </div>

      <div>
        <label
          htmlFor="serviceTime"
          className="mb-2 block text-[13px] font-medium text-[#6B7280]"
        >
          Preferred time
        </label>

        <input
          id="serviceTime"
          type="time"
          value={serviceTime}
          onChange={(event) => {
            setServiceTime(event.target.value);
            setError("");
          }}
          className="w-full rounded-[12px] border border-[#E5E7EB] bg-[#F9FAFB] p-3 text-[14px] text-[#1F2937] outline-none focus:border-[#008000]"
        />
      </div>

      <button
        type="button"
        onClick={handleSaveDateTime}
        className="flex h-[44px] items-center justify-center rounded-full bg-[#008000] px-4 text-[14px] font-semibold text-white"
      >
        Save date & time
      </button>
    </div>
  ) : (
    <div className="mt-3 rounded-[12px] bg-[#F0FDF4] p-3">
      <p className="text-[14px] font-semibold text-[#1F2937]">
        {formatServiceDateTime()}
      </p>
    </div>
  )}
</div>



          {/* ================= LOCATION ================= */}
          <div className="rounded-[15px] bg-[#F0FDF4] p-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <MapPin size={24} className="text-[#008000]" />

                <h3 className="text-[16px] font-bold italic text-[#1F2937]">
                  Service Location
                </h3>
              </div>

              <div>
                <p className="text-[15px] font-bold italic text-[#1F2937]">
                  Your saved service location
                </p>

                <p className="mt-2 text-[13px] text-[#6B7280]">
                  The provider will use your saved location when the request
                  is accepted.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setError(
                    "Location editing will be handled from your profile."
                  )
                }
                className="flex items-center gap-2"
              >
                <Navigation size={14} className="text-[#008000]" />

                <span className="text-[14px] font-bold italic text-[#008000]">
                  Change location
                </span>
              </button>
            </div>
          </div>

          {/* ================= TERMS ================= */}
          <div className="flex items-center gap-3 px-4">
            <button
              type="button"
              onClick={() => setAgreed((previous) => !previous)}
              aria-pressed={agreed}
              aria-label="Agree to booking terms"
              className={`flex h-[15px] w-[15px] shrink-0 items-center justify-center border ${
                agreed
                  ? "border-[#008000] bg-[#008000]"
                  : "border-black bg-white"
              }`}
            >
              {agreed && <Check size={12} color="white" />}
            </button>

            <p className="text-[14px] text-[#1F2937]">
              I agree to the{" "}
              <button
                type="button"
                className="font-bold italic text-[#008000]"
              >
                booking terms and conditions
              </button>
            </p>
          </div>

          {/* ================= ACCORDIONS ================= */}
          <div className="flex flex-col gap-3">
            {/* Cancellation */}
            <div className="bg-white">
              <button
                type="button"
                onClick={() => toggleSection("cancellation")}
                className="flex h-[49px] w-full items-center justify-between px-4"
              >
                <span className="text-[14px] font-bold text-[#1F2937]">
                  Cancellation Policy
                </span>

                {openSection === "cancellation" ? (
                  <ChevronUp size={16} className="text-[#6B7280]" />
                ) : (
                  <ChevronDown size={16} className="text-[#6B7280]" />
                )}
              </button>

              {openSection === "cancellation" && (
                <div className="px-4 pb-4 text-[13px] leading-5 text-[#6B7280]">
                  You can cancel your request before the provider begins the
                  service. Cancellation rules can be finalized when the
                  booking workflow is implemented.
                </div>
              )}
            </div>

            {/* Guarantee */}
            <div className="bg-white">
              <button
                type="button"
                onClick={() => toggleSection("guarantee")}
                className="flex h-[49px] w-full items-center justify-between px-4"
              >
                <span className="text-[14px] font-bold text-[#1F2937]">
                  Service Guarantee
                </span>

                {openSection === "guarantee" ? (
                  <ChevronUp size={16} className="text-[#6B7280]" />
                ) : (
                  <ChevronDown size={16} className="text-[#6B7280]" />
                )}
              </button>

              {openSection === "guarantee" && (
                <div className="px-4 pb-4 text-[13px] leading-5 text-[#6B7280]">
                  Service guarantee details can be added when the complete
                  service and payment workflow is implemented.
                </div>
              )}
            </div>

            {/* Payment Terms */}
            <div className="bg-white">
              <button
                type="button"
                onClick={() => toggleSection("payment")}
                className="flex h-[49px] w-full items-center justify-between px-4"
              >
                <span className="text-[14px] font-bold text-[#1F2937]">
                  Payment Terms
                </span>

                {openSection === "payment" ? (
                  <ChevronUp size={16} className="text-[#6B7280]" />
                ) : (
                  <ChevronDown size={16} className="text-[#6B7280]" />
                )}
              </button>

              {openSection === "payment" && (
                <div className="px-4 pb-4 text-[13px] leading-5 text-[#6B7280]">
                  Payment will be handled after the provider confirms the
                  service details and price.
                </div>
              )}
            </div>
          </div>

          {/* ================= ERROR ================= */}
          {error && (
            <div className="rounded-[15px] border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-[13px] leading-5 text-red-600">
                {error}
              </p>
            </div>
          )}

          {/* ================= BOTTOM ACTIONS ================= */}
          <div className="rounded-[15px] bg-white p-4">
            <div className="flex flex-col gap-8">
              {/* Proceed */}
              <button
                type="button"
                onClick={handleProceed}
                disabled={submitting}
                className="
                  flex
                  h-[52px]
                  w-full
                  items-center
                  justify-center
                  rounded-full
                  border-2
                  border-[#008000]
                  bg-[#008000]
                  px-3
                  text-[14px]
                  font-semibold
                  text-white
                  transition
                  active:scale-[0.98]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {submitting ? "Sending Request..." : "Send Service Request"}
              </button>

              {/* Contact */}
              <div className="flex flex-col gap-8">
                <p className="text-center text-[14px] text-[#6B7280]">
                  Need to discuss details?
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  {/* Message */}
                  <button
                    type="button"
                    onClick={() => navigate("/chatspace")}
                    className="flex h-12 min-w-0 flex-1 items-center justify-center gap-2 rounded-[15px] border-[1.5px] border-[#008000] bg-white px-4"
                  >
                    <MessageSquare
                      size={15}
                      className="text-[#008000]"
                    />

                    <span className="truncate text-[14px] font-bold text-[#008000]">
                      Message {providerName}
                    </span>
                  </button>

                  {/* Call */}
                  <button
                    type="button"
                    onClick={() => {
                      if (provider?.phone) {
                        window.location.href = `tel:${provider.phone}`;
                      } else {
                        setError(
                          "Provider phone number is not available."
                        );
                      }
                    }}
                    className="flex h-12 items-center justify-center gap-2 rounded-[15px] border-[1.5px] border-[#008000] bg-white px-4"
                  >
                    <Phone
                      size={14}
                      className="text-[#008000]"
                    />

                    <span className="text-[14px] font-bold text-[#008000]">
                      Call
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="h-8" />
        </div>
      </div>

      {/* ================= IPHONE HOME INDICATOR ================= */}
      <div className="absolute bottom-0 left-0 z-50 flex h-6 w-full items-center justify-center bg-transparent">
        <div className="h-1 w-[108px] rounded-xl bg-[#1F2937]" />
      </div>
    </div>
  
    
  );
}

export default ConfirmBooking;
