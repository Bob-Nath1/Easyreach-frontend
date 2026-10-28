import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Clock3,
  User,
  MessageCircle,
  Star,
  CheckCircle,
  LoaderCircle,
} from "lucide-react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

const API_URL = "http://localhost:5000";

function SeekRequestDetails() {
  const navigate = useNavigate();
  const { requestId } = useParams();

  const [request, setRequest] = useState(null);
  const [provider, setProvider] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error(
            "Your session has expired. Please log in again."
          );
        }

        // Fetch the selected request.
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
            data.message || "Unable to load request details."
          );
        }

        const currentRequest = data.request;

        if (!currentRequest) {
          throw new Error("Request details were not found.");
        }

        if (cancelled) return;

        setRequest(currentRequest);

        const providerId =
          currentRequest.providerId ??
          currentRequest.provider_id;

        // Fetch provider information.
        if (providerId) {
          try {
            const providerResponse = await fetch(
              `${API_URL}/api/providers/${providerId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (providerResponse.ok) {
              const providerData =
                await providerResponse.json();

              if (!cancelled) {
                setProvider(
                  providerData.provider || null
                );
              }
            }
          } catch (providerError) {
            console.error(
              "Unable to load provider:",
              providerError
            );
          }
        }

        // Fetch feedback if the service is completed.
        if (
          String(currentRequest.status).toLowerCase() ===
          "completed"
        ) {
          try {
            const feedbackResponse = await fetch(
              `${API_URL}/api/feedback/${requestId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (feedbackResponse.ok) {
              const feedbackData =
                await feedbackResponse.json();

              if (!cancelled) {
                setFeedback(
                  feedbackData.feedback || null
                );
              }
            }
          } catch (feedbackError) {
            console.error(
              "Unable to load feedback:",
              feedbackError
            );
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.message || "Unable to load request details."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchDetails();

    return () => {
      cancelled = true;
    };
  }, [requestId]);

  const status = String(
    request?.status || ""
  ).toLowerCase();

  const statusLabels = {
    pending: "Waiting for provider",
    accepted: "Request accepted",
    in_progress: "Service in progress",
    completed: "Service completed",
    declined: "Request declined",
  };

  const statusColors = {
    pending: "bg-amber-100 text-amber-800",
    accepted: "bg-blue-100 text-blue-800",
    in_progress: "bg-indigo-100 text-indigo-800",
    completed: "bg-green-100 text-green-800",
    declined: "bg-red-100 text-red-800",
  };

  const formatDate = (value) => {
    if (!value) return "Date not provided";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "Date unavailable";
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

  const formatPrice = (price) => {
    if (price === null || price === undefined) {
      return "Awaiting price";
    }

    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(Number(price));
  };

  const handleProfile = () => {
    if (!provider?.id) return;

    navigate("/viewprofile", {
      state: { provider },
    });
  };

  const handleMessage = () => {
    if (!provider?.id) return;

    navigate("/chatspace", {
      state: {
        provider,
        request,
      },
    });
  };

  const handleRateService = () => {
    navigate("/feedback", {
      state: {
        requestId: request.id,
        request,
        provider,
      },
    });
  };

  const providerName =
    provider?.fullName ||
    provider?.full_name ||
    `Provider #${
      request?.providerId ??
      request?.provider_id ??
      "Unavailable"
    }`;

  const providerAddress =
    provider?.realAddress ||
    provider?.real_address ||
    provider?.city ||
    "Location unavailable";

  if (loading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-100 p-5">
        <div className="flex flex-col items-center gap-3">
          <LoaderCircle
            size={32}
            className="animate-spin text-[#008000]"
          />
          <p className="text-sm text-gray-500">
            Loading request details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !request) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-100 p-5">
        <div className="w-full max-w-lg rounded-2xl bg-white p-6 text-center">
          <p className="text-sm text-red-600">
            {error || "Request not found."}
          </p>

          <button
            type="button"
            onClick={() => navigate("/seekrequest")}
            className="mt-5 rounded-full bg-[#008000] px-6 py-3 text-sm font-bold text-white"
          >
            Back to My Requests
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-100">
      <div className="relative mx-auto min-h-screen w-full overflow-hidden bg-[#F9FAFB] sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px]">
        {/* HEADER */}
        <header className="sticky top-0 z-20 flex h-[76px] items-center gap-4 border-b border-gray-200 bg-white px-5">
          <button
            type="button"
            onClick={() => navigate("/seekrequest")}
            aria-label="Back to request history"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-50"
          >
            <ArrowLeft size={22} />
          </button>

          <div>
            <h1 className="text-lg font-bold text-gray-900">
              Request Details
            </h1>
            <p className="text-xs text-gray-500">
              Request #{request.id}
            </p>
          </div>
        </header>

        {/* CONTENT */}
        <main className="space-y-5 px-5 py-6">
          {/* STATUS */}
          <section className="rounded-2xl bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs text-gray-500">
                  Service requested
                </p>

                <h2 className="mt-1 text-xl font-bold text-gray-900">
                  {request.serviceCategory ||
                    "Service request"}
                </h2>
              </div>

              <span
                className={`rounded-full px-3 py-2 text-xs font-bold ${
                  statusColors[status] ||
                  "bg-gray-100 text-gray-600"
                }`}
              >
                {statusLabels[status] ||
                  request.status ||
                  "Unknown status"}
              </span>
            </div>

            <div className="mt-5 border-t border-gray-100 pt-4">
              <p className="text-xs text-gray-500">
                Service price
              </p>

              <p className="mt-1 text-2xl font-bold text-[#008000]">
                {formatPrice(request.price)}
              </p>
            </div>
          </section>

          {/* PROVIDER */}
          <section className="rounded-2xl bg-white p-5">
            <h2 className="text-base font-bold text-gray-900">
              Provider Information
            </h2>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100">
                {provider?.profileImage ||
                provider?.profile_image ? (
                  <img
                    src={
                      provider.profileImage ||
                      provider.profile_image
                    }
                    alt={providerName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User
                    size={26}
                    className="text-gray-400"
                  />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="break-words font-bold text-gray-900">
                  {providerName}
                </p>

                <p className="mt-1 flex items-start gap-1 text-sm text-gray-500">
                  <MapPin
                    size={15}
                    className="mt-0.5 shrink-0 text-[#008000]"
                  />
                  {providerAddress}
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleProfile}
                disabled={!provider?.id}
                className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[#008000] px-2 text-sm font-bold text-[#008000] disabled:opacity-50"
              >
                <User size={16} />
                View Profile
              </button>

              <button
                type="button"
                onClick={handleMessage}
                disabled={!provider?.id}
                className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#008000] px-2 text-sm font-bold text-white disabled:opacity-50"
              >
                <MessageCircle size={16} />
                Let's Chat
              </button>
            </div>
          </section>

          {/* SERVICE DETAILS */}
          <section className="rounded-2xl bg-white p-5">
            <h2 className="text-base font-bold text-gray-900">
              Service Details
            </h2>

            <div className="mt-4 space-y-5">
              <div>
                <p className="text-xs text-gray-500">
                  Request description
                </p>

                <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-6 text-gray-800">
                  {request.description ||
                    "No description provided."}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <CalendarDays
                  size={19}
                  className="mt-0.5 shrink-0 text-[#008000]"
                />

                <div>
                  <p className="text-xs text-gray-500">
                    Preferred service date and time
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-800">
                    {formatDate(
                      request.serviceDateTime ||
                        request.service_date_time
                    )}
                  </p>
                </div>
              </div>

              {(request.distanceRangeKm ??
                request.distance_range_km) != null && (
                <div className="flex items-start gap-3">
                  <MapPin
                    size={19}
                    className="mt-0.5 shrink-0 text-[#008000]"
                  />

                  <div>
                    <p className="text-xs text-gray-500">
                      Distance range
                    </p>

                    <p className="mt-1 text-sm font-semibold text-gray-800">
                      {request.distanceRangeKm ??
                        request.distance_range_km}{" "}
                      km
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <Clock3
                  size={19}
                  className="mt-0.5 shrink-0 text-[#008000]"
                />

                <div>
                  <p className="text-xs text-gray-500">
                    Request status
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-800">
                    {statusLabels[status] ||
                      request.status ||
                      "Unknown status"}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FEEDBACK */}
          {status === "completed" && (
            <section className="rounded-2xl bg-white p-5">
              <h2 className="text-base font-bold text-gray-900">
                Service Feedback
              </h2>

              {feedback ? (
                <div className="mt-4 rounded-xl bg-green-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-green-800">
                    <CheckCircle size={17} />
                    Feedback submitted
                  </div>

                  <div className="mt-3 flex items-center gap-1">
                    {Array.from(
                      { length: 5 },
                      (_, index) => (
                        <Star
                          key={index}
                          size={18}
                          fill={
                            index <
                            Number(feedback.overallRating)
                              ? "#F59E0B"
                              : "none"
                          }
                          className={
                            index <
                            Number(feedback.overallRating)
                              ? "text-amber-500"
                              : "text-gray-300"
                          }
                        />
                      )
                    )}

                    <span className="ml-1 text-sm font-semibold text-gray-700">
                      {feedback.overallRating}/5
                    </span>
                  </div>

                  {feedback.comment && (
                    <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-gray-700">
                      {feedback.comment}
                    </p>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleRateService}
                  className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#008000] px-4 text-sm font-bold text-white"
                >
                  <Star size={17} />
                  Rate This Service
                </button>
              )}
            </section>
          )}

          {/* BACK TO HISTORY */}
          <button
            type="button"
            onClick={() => navigate("/seekrequest")}
            className="h-12 w-full rounded-full border border-[#008000] bg-white text-sm font-bold text-[#008000]"
          >
            Back to My Requests
          </button>
        </main>
      </div>
    </div>
  );
}

export default SeekRequestDetails;
