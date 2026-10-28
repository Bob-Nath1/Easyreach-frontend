import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  CheckCircle2,
  ClipboardList,
} from "lucide-react";

const API_URL = "http://localhost:5000";

function ServiceHistory() {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

useEffect(() => {
  let cancelled = false;

  const fetchServiceHistory = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error(
          "Please log in to view your service history."
        );
      }

      const response = await fetch(
        `${API_URL}/api/requests`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      
      const data = await response.json();

      console.log("Service history API response:", data);
console.log("Total requests returned:", data.requests?.length);
console.table(
  (data.requests || []).map((request) => ({
    id: request.id,
    status: request.status,
    seekerId: request.seekerId,
    providerId: request.providerId,
  }))
);
      
      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load service history."
        );
      }

      const serviceHistory = (data.requests || [])
        .slice()
        .sort((a, b) => {
          const dateA = new Date(
            a.createdAt ||
              a.created_at ||
              a.updatedAt ||
              0
          ).getTime();

          const dateB = new Date(
            b.createdAt ||
              b.created_at ||
              b.updatedAt ||
              0
          ).getTime();

          return dateB - dateA;
        });

      if (!cancelled) {
        setServices(serviceHistory);
      }
    } catch (err) {
      if (!cancelled) {
        setError(
          err.message ||
            "Unable to load your service history."
        );
      }
    } finally {
      if (!cancelled) {
        setLoading(false);
      }
    }
  };

  fetchServiceHistory();

  return () => {
    cancelled = true;
  };
}, []);


  const formatDateTime = (value) => {
    if (!value) return "Date and time unavailable";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "Date and time unavailable";
    }

    return date.toLocaleString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getClientName = (service) =>
    service.seekerName ||
    service.seeker?.fullName ||
    `Client #${service.seekerId}`;

  return (
    <div
      className="
        relative mx-auto h-[926px] w-full
        sm:w-[640px] md:w-[768px] lg:w-[1024px]
        xl:w-[1280px] 2xl:w-[1536px]
        md:h-[1026px] lg:h-[1200px]
        xl:h-[1200px] 2xl:h-[1200px]
        overflow-hidden rounded-[35px]
        bg-[#F9FAFB] font-['Inter',sans-serif]
      "
    >
      {/* HEADER */}
      <div className="absolute left-0 right-0 top-0 z-10 bg-white px-6 pb-5 pt-[62px]">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate("/dashboardprov")}
            aria-label="Back to dashboard"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100"
          >
            <ArrowLeft size={20} className="text-[#1F2937]" />
          </button>

          <div>
            <h1 className="text-[20px] font-bold text-[#1F2937]">
              Service History
            </h1>

            <p className="mt-1 text-[12px] text-[#6B7280]">
             All your service requests
            </p>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="absolute bottom-6 left-0 right-0 top-[155px] overflow-y-auto px-5 pb-8 scrollbar-hide">
        <div className="mb-5 flex items-center justify-between">
          <p className="text-[14px] font-semibold text-[#374151]">
            All service requests
          </p>

          {!loading && !error && (
            <span className="rounded-full bg-green-100 px-3 py-1 text-[12px] font-semibold text-[#008000]">
              {services.length}
            </span>
          )}
        </div>

        {/* LOADING */}
        {loading && (
          <div className="flex min-h-[180px] items-center justify-center gap-2 text-sm text-gray-500">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-[#008000]" />
            Loading service history...
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="rounded-[15px] bg-red-50 p-5 text-center">
            <p className="text-sm text-red-600">{error}</p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-3 font-semibold text-[#008000]"
            >
              Try again
            </button>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && services.length === 0 && (
          <div className="flex min-h-[250px] flex-col items-center justify-center rounded-[15px] bg-white px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
              <ClipboardList size={30} className="text-[#008000]" />
            </div>

            <h2 className="mt-4 text-[16px] font-bold text-[#1F2937]">
              No completed services yet
            </h2>

            <p className="mt-2 max-w-[280px] text-[13px] leading-5 text-[#6B7280]">
              Services will appear here after you complete your bookings.
            </p>
          </div>
        )}

        {/* COMPLETED SERVICES */}
        {!loading && !error && services.length > 0 && (
          <div className="flex flex-col gap-4">
            {services.map((service) => (
              <article
                key={service.id}
                className="rounded-[15px] border border-gray-100 bg-white p-4 shadow-sm"
              >
                {/* SERVICE HEADING */}
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-50">
                    <CheckCircle2
                      size={23}
                      className="text-[#008000]"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="break-words text-[15px] font-bold text-[#1F2937]">
                      {service.serviceCategory || "Service"}
                    </h2>

                    <p className="mt-1 text-[12px] text-[#6B7280]">
                      {getClientName(service)}
                    </p>
                  </div>

            
<span
  className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold ${
    service.status === "completed"
      ? "bg-green-50 text-[#008000]"
      : service.status === "accepted"
        ? "bg-blue-50 text-blue-700"
        : service.status === "declined"
          ? "bg-red-50 text-red-700"
          : service.status === "pending"
            ? "bg-amber-50 text-amber-700"
            : "bg-gray-100 text-gray-700"
  }`}
>
  {(service.status || "unknown").replace("_", " ")}
</span>

                </div>

                {/* DESCRIPTION */}
                {service.description && (
                  <p className="mt-4 whitespace-pre-wrap break-words text-[13px] leading-5 text-[#4B5563]">
                    {service.description}
                  </p>
                )}

                <div className="my-4 border-t border-gray-100" />

                {/* SERVICE DATE AND TIME */}
                <div className="flex items-start gap-3">
                  <CalendarDays
                    size={18}
                    className="mt-0.5 shrink-0 text-[#008000]"
                  />

                  <div>
                    <p className="text-[11px] text-[#6B7280]">
                      Service date and time
                    </p>

                    <p className="mt-1 text-[13px] font-semibold text-[#1F2937]">
                      {formatDateTime(service.serviceDateTime)}
                    </p>
                  </div>
                </div>

                {/* REQUEST ID */}
                <p className="mt-4 text-[11px] text-[#9CA3AF]">
                  Request #{service.id}
                </p>

                {/* OPEN BOOKING */}
                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      `/book-keeping?role=provider&requestId=${service.id}`
                    )
                  }
                  className="mt-4 flex h-[42px] w-full items-center justify-center rounded-full border border-[#008000] text-[13px] font-semibold text-[#008000] transition active:scale-[0.98]"
                >
                  View Service Details
                </button>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* IPHONE HOME INDICATOR */}
      <div className="absolute bottom-0 left-0 z-20 flex h-6 w-full items-center justify-center bg-[#F9FAFB]">
        <div className="h-1 w-[108px] rounded-full bg-[#1F2937]" />
      </div>
    </div>
  );
}

export default ServiceHistory;
