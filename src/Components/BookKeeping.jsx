import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Check,
  MessageCircle,
  Phone,
  MapPin,
  CalendarDays,
  Bell,
  ClipboardList,
  Navigation,
  MoreVertical,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

function BookKeeping() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const role = searchParams.get("role");
  const requestId = searchParams.get("requestId");
  const isProvider = role === "provider";

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
const [actionMessage, setActionMessage] = useState("");

  const API_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        if (!token || !requestId) {
          throw new Error(
            "Booking information is missing. Please open a booking from your requests."
          );
        }

        const response = await fetch(
          `${API_URL}/api/requests/${requestId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to load booking."
          );
        }

        setBooking(data.request);
      } catch (err) {
        setError(
          err.message || "Unable to load booking."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [requestId]);

  const handleServiceAction = async (action) => {
  try {
    setActionLoading(true);
    setError("");
    setActionMessage("");

    const token = localStorage.getItem("token");

    if (!token || !requestId) {
      throw new Error("Please log in and open a valid booking.");
    }

    const response = await fetch(
      `${API_URL}/api/requests/${requestId}/${action}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || `Failed to ${action} service.`
      );
    }

    setBooking(data.request);

    setActionMessage(
      action === "start"
        ? "Service started successfully."
        : "Service completed successfully."
    );
  } catch (err) {
    setError(err.message || "Unable to update service status.");
  } finally {
    setActionLoading(false);
  }
};

const handleStartService = () => {
  handleServiceAction("start");
};

const handleCompleteService = () => {
  handleServiceAction("complete");
};

// ================= BOOKING TIMELINE STATUS =================
const normalizedStatus = String(booking?.status || "")
  .toLowerCase()
  .trim()
  .replace(/[\s-]+/g, "_");

const timelineSteps = [
  {
    status: "pending",
    title: "Request Submitted",
    description: "The service request has been submitted.",
    icon: ClipboardList,
  },
  {
    status: "accepted",
    title: "Booking Accepted",
    description: "You have accepted this service request.",
    icon: Check,
  },
  {
    status: "in_progress",
    title: "Service In Progress",
    description: "You are currently carrying out the service.",
    icon: Navigation,
  },
  {
    status: "completed",
    title: "Service Completed",
    description: "The service has been completed.",
    icon: Check,
  },
];

const isDeclined = normalizedStatus === "declined";

const currentStepIndex = timelineSteps.findIndex(
  (step) => step.status === normalizedStatus
);

  return (
    <div className="min-h-screen w-full bg-gray-100 flex justify-center">
      {/* ================= MOBILE SCREEN ================= */}
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
    font-[Inter,sans-serif]
  "
>

        {/* ================= HEADER ================= */}
        <div className="absolute top-[62px] left-0 w-full h-[36px] px-6 flex items-center justify-between">
          {/* Back */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="
              w-9
              h-9
              flex
              items-center
              justify-center
              rounded-full
              hover:bg-gray-100
              active:scale-95
              transition
            "
          >
            <ArrowLeft
              size={22}
              strokeWidth={2}
              className="text-gray-800"
            />
          </button>

          <h1 className="text-[18px] font-bold text-gray-800">
            Booking
          </h1>

          <button
            type="button"
            className="w-9 h-9 flex items-center justify-center"
          >
            <MoreVertical
              size={19}
              strokeWidth={2}
              className="text-gray-700"
            />
          </button>
        </div>

        {/* ================= SCROLLABLE CONTENT ================= */}
      <div
  className="
    absolute
    left-6
    right-6
    top-[98px]
    bottom-[24px]
    overflow-y-auto
    overflow-x-hidden
    scrollbar-hide
    pb-[40px]
  "
>
          <div className="flex flex-col items-start gap-[32px] w-full">
            {/* ================= CONFIRMATION SECTION ================= */}
<div className="w-full flex flex-col gap-[24px]">
  {loading ? (
    <p className="py-8 text-center text-sm text-gray-500">
      Loading booking details...
    </p>
  ) : error ? (
    <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
      {error}
    </div>
  ) : booking ? (
    <>
      {/* Heading */}
      <div className="w-full flex flex-col items-center gap-[12px]">
        <h2 className="w-full text-center text-[24px] leading-[29px] font-bold italic text-[#1F2937]">
          {booking.status === "accepted"
            ? "Booking Accepted! 🎉"
            : "Booking Details"}
        </h2>

        <p className="w-full text-[14px] leading-[20px] text-[#6B7280]">
          {isProvider
            ? "You have accepted this service request. Review the details below."
            : "Here are the details of your service request."}
        </p>
      </div>

      {/* Booking ID */}
      <div className="w-full min-h-[53px] bg-[#D1FAE5] rounded-[15px] px-4 py-3 flex items-center justify-between gap-3">
        <span className="text-[14px] font-bold italic text-[#008000] break-all">
          Booking ID: {booking.id}
        </span>

        <ClipboardList
          size={20}
          strokeWidth={2.5}
          className="shrink-0 text-[#008000]"
        />
      </div>

      {/* Actual Booking Details */}
      <div className="w-full rounded-[15px] bg-white p-4 flex flex-col gap-3">
        <p className="text-[14px] text-[#6B7280]">
          Service:{" "}
          <span className="font-semibold text-[#1F2937]">
            {booking.serviceCategory}
          </span>
        </p>

        <p className="text-[14px] text-[#6B7280]">
          Status:{" "}
          <span className="font-semibold capitalize text-[#008000]">
            {booking.status}
          </span>
        </p>

        <p className="text-[14px] text-[#6B7280]">
          Description:{" "}
          <span className="text-[#1F2937]">
            {booking.description}
          </span>
        </p>

        <p className="text-[14px] text-[#6B7280]">
          Scheduled for:{" "}
          <span className="font-semibold text-[#1F2937]">
            {booking.serviceDateTime
              ? new Date(
                  booking.serviceDateTime
                ).toLocaleString("en-GB", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })
              : "Not specified"}
          </span>
        </p>

        {booking.price != null && (
          <p className="text-[14px] text-[#6B7280]">
            Price:{" "}
            <span className="font-bold text-[#1F2937]">
              {new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
                maximumFractionDigits: 0,
              }).format(Number(booking.price))}
            </span>
          </p>
        )}

        {booking.distanceRangeKm != null && (
          <p className="text-[14px] text-[#6B7280]">
            Distance range:{" "}
            <span className="font-semibold text-[#1F2937]">
              {booking.distanceRangeKm} km
            </span>
          </p>
        )}
      </div>
    </>
  ) : null}
</div>


      
{/* ================= BOOKING TIMELINE ================= */}
<div className="relative w-full">
  <h3 className="mb-6 text-[16px] font-bold text-[#1F2937]">
    Booking Progress
  </h3>

  {isDeclined ? (
    <div className="rounded-[12px] bg-red-50 p-4">
      <p className="text-[14px] font-bold text-red-700">
        Request Declined
      </p>
      <p className="mt-1 text-[12px] text-red-600">
        This service request was declined by the provider.
      </p>
    </div>
  ) : currentStepIndex === -1 ? (
    <p className="text-[13px] text-gray-500">
      Booking progress is unavailable for this status.
    </p>
  ) : (
    <div className="relative flex flex-col gap-6">
      {timelineSteps.map((step, index) => {
        const StepIcon = step.icon;
        const isComplete = index < currentStepIndex;
        const isCurrent = index === currentStepIndex;
        const isUpcoming = index > currentStepIndex;

        const scheduledDate =
          step.status === "accepted" ||
          step.status === "in_progress" ||
          step.status === "completed"
            ? booking?.serviceDateTime
            : null;

        return (
          <div
            key={step.status}
            className="relative flex gap-3"
          >
            {/* Timeline indicator */}
            <div
              className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                isComplete
                  ? "bg-[#008000]"
                  : isCurrent
                  ? "bg-[#D1FAE5] ring-2 ring-[#008000]"
                  : "bg-[#E5E7EB]"
              }`}
            >
              <StepIcon
                size={16}
                strokeWidth={2.5}
                className={
                  isComplete
                    ? "text-white"
                    : isCurrent
                    ? "text-[#008000]"
                    : "text-[#9CA3AF]"
                }
              />
            </div>

            {/* Step details */}
            <div className="min-w-0 flex-1 pb-1">
              <p
                className={`text-[14px] font-bold ${
                  isUpcoming
                    ? "text-[#9CA3AF]"
                    : "text-[#1F2937]"
                }`}
              >
                {step.title}
                {isCurrent ? " — Current" : ""}
              </p>

              <p className="mt-1 text-[12px] leading-5 text-[#6B7280]">
                {step.description}
              </p>

              {step.status === "accepted" &&
                booking?.updatedAt &&
                currentStepIndex >= 1 && (
                  <p className="mt-1 text-[11px] text-[#6B7280]">
                    Last updated:{" "}
                    {new Date(
                      booking.updatedAt
                    ).toLocaleString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                )}

              {scheduledDate && (
                <p className="mt-1 text-[11px] text-[#6B7280]">
                  Scheduled for:{" "}
                  {new Date(
                    scheduledDate
                  ).toLocaleString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  )}
</div>

            {/* ================= ACTION BUTTONS ================= */}
            <div className="w-full flex flex-col gap-[12px]">
              {/* Row 1 */}
              <div className="w-full h-[120px] grid grid-cols-2 gap-[12px]">
  <button
    type="button"
    className="
      w-full
      h-[120px]
      bg-white
      rounded-[15px]
      p-4
      flex
      flex-col
      items-center
      gap-4
      active:scale-[0.98]
      transition
    "
  >
                  <div className="w-[48px] h-[48px] rounded-full bg-[#D1FAE5] flex items-center justify-center">
                    <ClipboardList
                      size={23}
                      strokeWidth={2.2}
                      className="text-[#008000]"
                    />
                  </div>

                  <span className="w-full text-center text-[14px] leading-[17px] font-bold italic text-[#1F2937]">
                    View Details
                  </span>
                </button>

                {/* Message Provider */}
                <button
                  type="button"
                  className="
                    w-[184px]
                    h-[120px]
                    bg-white
                    rounded-[15px]
                    p-4
                    flex
                    flex-col
                    items-center
                    gap-4
                    active:scale-[0.98]
                    transition
                  "
                >
                  <div className="w-[48px] h-[48px] rounded-full bg-[#D1FAE5] flex items-center justify-center">
                    <MessageCircle
                      size={23}
                      strokeWidth={2.2}
                      className="text-[#008000]"
                    />
                  </div>

                  <span className="w-full text-center text-[14px] leading-[17px] font-bold italic text-[#1F2937]">
  {isProvider ? "Message Seeker" : "Message Provider"}
</span>
                </button>
              </div>

              {/* Row 2 */}
              <div className="w-full h-[120px] grid grid-cols-2 gap-[12px]">
  <button
    type="button"
    className="
      w-full
      h-[120px]
      bg-white
      rounded-[15px]
      p-4
      flex
      flex-col
      items-center
      gap-4
      active:scale-[0.98]
      transition
    "
  >
                  <div className="w-[48px] h-[48px] rounded-full bg-[#D1FAE5] flex items-center justify-center">
                    <Phone
                      size={23}
                      strokeWidth={2.2}
                      className="text-[#008000]"
                    />
                  </div>

                  <span className="w-full text-center text-[14px] leading-[17px] font-bold italic text-[#1F2937]">
  {isProvider ? "Call Seeker" : "Call Provider"}
</span>
                </button>

                {/* Get Directions */}
                <button
                  type="button"
                  className="
                    w-[184px]
                    h-[120px]
                    bg-white
                    rounded-[15px]
                    p-4
                    flex
                    flex-col
                    items-center
                    gap-4
                    active:scale-[0.98]
                    transition
                  "
                >
                  <div className="w-[48px] h-[48px] rounded-full bg-[#D1FAE5] flex items-center justify-center">
                    <Navigation
                      size={23}
                      strokeWidth={2.2}
                      className="text-[#008000]"
                    />
                  </div>

                  <span className="w-full text-center text-[14px] leading-[17px] font-bold italic text-[#1F2937]">
                    Get Directions
                  </span>
                </button>
              </div>
                        
              
              {/* SERVICE STATUS ACTION */}
              {isProvider && booking?.status === "accepted" && (
                <button
                  type="button"
                  onClick={handleStartService}
                  disabled={actionLoading}
                  className="w-full h-[48px] rounded-full bg-[#008000] text-[14px] font-semibold text-white disabled:opacity-60"
                >
                  {actionLoading ? "Starting..." : "Start Service"}
                </button>
              )}

              {isProvider && booking?.status === "in_progress" && (
                <button
                  type="button"
                  onClick={handleCompleteService}
                  disabled={actionLoading}
                  className="w-full h-[48px] rounded-full bg-[#008000] text-[14px] font-semibold text-white disabled:opacity-60"
                >
                  {actionLoading ? "Updating..." : "Complete Service"}
                </button>
              )}

              {isProvider && booking?.status === "completed" && (
                <div className="rounded-xl bg-green-50 p-4 text-center text-[14px] font-semibold text-[#008000]">
                  Service completed successfully.
                </div>
              )}

            </div>
            
{/* ================= DONE / FEEDBACK BUTTON ================= */}
{booking?.status === "completed" ? (
  <button
    type="button"
    onClick={() =>
      navigate("/feedback", {
        state: {
          requestId: booking.id,
          request: booking,
          provider: {
            id: booking.providerId,
          },
        },
      })
    }
    className="
      w-full
      h-[52px]
      rounded-full
      bg-[#008000]
      border-2
      border-[#008000]
      px-[10px]
      py-3
      flex
      items-center
      justify-center
      text-white
      active:scale-[0.98]
      transition
    "
  >
    <span className="text-[14px] font-semibold">
      {isProvider ? "View Feedback" : "Rate / View Feedback"}
    </span>
  </button>
) : (
  <button
    type="button"
    onClick={() => navigate(-1)}
    className="
      w-full
      h-[52px]
      rounded-full
      border-2
      border-[#008000]
      bg-[#008000]
      px-[10px]
      py-3
      flex
      items-center
      justify-center
      text-white
      active:scale-[0.98]
      transition
    "
  >
    <span className="text-[14px] font-semibold">
      Done
    </span>
  </button>
)}
            {/* ================= ADD TO CALENDAR ================= */}
            <button
              type="button"
              className="
                w-full
                flex
                items-center
                justify-center
                gap-[6px]
              "
            >
              <CalendarDays
                size={16}
                strokeWidth={2}
                className="text-[#6B7280]"
              />

              <span className="text-[14px] leading-[17px] font-bold italic text-[#6B7280]">
                Add to Calendar
              </span>
            </button>

            {/* ================= NOTIFICATION ================= */}
            <div
              className="
                w-full
                h-[72px]
                px-4
                flex
                items-center
                gap-2
              "
            >
              {/* Bell */}
              <div className="w-[40px] h-[40px] rounded-full bg-[#008000] flex items-center justify-center shrink-0">
                <Bell
                  size={20}
                  strokeWidth={2.2}
                  className="text-white"
                />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0 flex items-center gap-[12px]">
                <span className="text-[12px] leading-[15px] text-[#6B7280]">
                  We'll notify you when the provider is on the way
                </span>

                <button
                  type="button"
                  className="text-[12px] leading-[15px] font-bold italic text-[#008000] shrink-0"
                >
                  Manage
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= IPHONE HOME INDICATOR ================= */}
      <div
  className="
    absolute
    bottom-0
    left-0
    z-50
    h-[24px]
    w-full
    flex
    items-center
    justify-center
    bg-[#F9FAFB]
  "
>
          <div className="w-[108px] h-[4px] rounded-[12px] bg-[#1F2937]" />
        </div>
      </div>
    </div>
  );
}

export default BookKeeping;