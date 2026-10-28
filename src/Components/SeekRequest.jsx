import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  MoreVertical,
  MapPin,
  Clock3,
  Wrench,
  MessageCircle,
  User,
  CheckCircle,
  ChevronRight,
  LoaderCircle,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000";

function SeekRequest() {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [providers, setProviders] = useState({});
  const [feedbacks, setFeedbacks] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ============================================
  // FETCH ALL REQUESTS FOR THE LOGGED-IN SEEKER
  // ============================================
  useEffect(() => {
    let cancelled = false;

    const fetchRequests = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error(
            "Your session has expired. Please log in again."
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

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load your requests."
          );
        }

        const allRequests = (data.requests || [])
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

        if (cancelled) return;

        setRequests(allRequests);
        setLoading(false);

        // Fetch provider details and feedback for each request.
        const tokenForDetails = token;

        const providerEntries = await Promise.all(
          allRequests.map(async (request) => {
            if (!request.providerId) {
              return [request.id, null];
            }

            try {
              const providerResponse = await fetch(
                `${API_URL}/api/providers/${request.providerId}`,
                {
                  headers: {
                    Authorization: `Bearer ${tokenForDetails}`,
                  },
                }
              );

              if (!providerResponse.ok) {
                return [request.id, null];
              }

              const providerData =
                await providerResponse.json();

              return [
                request.id,
                providerData.provider || null,
              ];
            } catch {
              return [request.id, null];
            }
          })
        );

        if (!cancelled) {
          setProviders(Object.fromEntries(providerEntries));
        }

        const completedRequests = allRequests.filter(
          (request) =>
            String(request.status).toLowerCase() ===
            "completed"
        );

        const feedbackEntries = await Promise.all(
          completedRequests.map(async (request) => {
            try {
              const feedbackResponse = await fetch(
                `${API_URL}/api/feedback/${request.id}`,
                {
                  headers: {
                    Authorization: `Bearer ${tokenForDetails}`,
                  },
                }
              );

              if (feedbackResponse.status === 404) {
                return [request.id, null];
              }

              if (!feedbackResponse.ok) {
                return [request.id, null];
              }

              const feedbackData =
                await feedbackResponse.json();

              return [
                request.id,
                feedbackData.feedback || null,
              ];
            } catch {
              return [request.id, null];
            }
          })
        );

        if (!cancelled) {
          setFeedbacks(Object.fromEntries(feedbackEntries));
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.message || "Unable to load your requests."
          );
          setLoading(false);
        }
      }
    };

    fetchRequests();

    return () => {
      cancelled = true;
    };
  }, []);

  // ============================================
  // STATUS HELPERS
  // ============================================
  const getStatusLabel = (status) => {
    switch (String(status).toLowerCase()) {
      case "pending":
        return "Waiting for provider";
      case "accepted":
        return "Request accepted";
      case "in_progress":
        return "Service in progress";
      case "completed":
        return "Service completed";
      case "declined":
        return "Request declined";
      default:
        return status || "Unknown status";
    }
  };

  const getStatusColor = (status) => {
    switch (String(status).toLowerCase()) {
      case "pending":
        return "bg-[#FEF3C7] text-[#92400E]";
      case "accepted":
        return "bg-[#DBEAFE] text-[#1E40AF]";
      case "in_progress":
        return "bg-[#E0E7FF] text-[#3730A3]";
      case "completed":
        return "bg-[#DCFCE7] text-[#166534]";
      case "declined":
        return "bg-[#FEE2E2] text-[#991B1B]";
      default:
        return "bg-gray-100 text-gray-600";
    }
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

  // ============================================
  // OPEN REQUEST DETAILS
  // ============================================
const handleOpenRequest = (request) => {
  navigate(`/seekrequest/${request.id}`);
};

  const handleProfile = (provider) => {
    if (!provider?.id) return;

    navigate("/viewprofile", {
      state: {
        provider,
      },
    });
  };

  const handleMessage = (request, provider) => {
    navigate("/chatspace", {
      state: {
        provider,
        request,
      },
    });
  };

  // ============================================
  // LOADING
  // ============================================
  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center">
        <div className="flex min-h-[500px] w-full flex-col items-center justify-center gap-3 rounded-[35px] bg-[#F9FAFB] sm:w-[640px]">
          <LoaderCircle
            size={32}
            className="animate-spin text-[#008000]"
          />
          <p className="text-sm text-gray-500">
            Loading your service history...
          </p>
        </div>
      </div>
    );
  }

  // ============================================
  // PAGE
  // ============================================
  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center">
      <div className="relative h-[926px] w-full overflow-hidden rounded-[35px] bg-[#F9FAFB] sm:w-[640px] md:h-[1026px] md:w-[768px] lg:h-[1200px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1536px]">

        {/* HEADER */}
        <div className="absolute left-0 right-0 top-[62px] z-40 flex h-[56px] items-center justify-between border-b border-[#E5E7EB] bg-white px-6">
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              aria-label="Back to dashboard"
              className="flex h-8 w-8 items-center justify-center"
            >
              <ArrowLeft
                size={24}
                className="text-[#1F2937]"
              />
            </button>

            <div>
              <h1 className="text-[20px] font-bold text-[#1F2937]">
                My Requests
              </h1>
            </div>
          </div>

          <button
            type="button"
            aria-label="Request history options"
            className="flex h-8 w-8 items-center justify-center"
          >
            <MoreVertical
              size={20}
              className="text-black"
            />
          </button>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="absolute bottom-[24px] left-0 right-0 top-[118px] overflow-y-auto overflow-x-hidden px-5 pb-8 scrollbar-hide sm:px-6">

          {/* INTRODUCTION */}
          <div className="mb-5 mt-5 rounded-[20px] bg-[#008000] p-5 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15">
                <CheckCircle size={25} />
              </div>

              <div>
                <h2 className="text-[17px] font-bold">
                  Service Request History
                </h2>
                <p className="mt-1 text-[12px] text-white/90">
                  Track all your requests and their latest status.
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2 text-center">
              {[
                {
                  label: "Total",
                  count: requests.length,
                },
                {
                  label: "Pending",
                  count: requests.filter(
                    (item) => item.status === "pending"
                  ).length,
                },
                {
                  label: "Completed",
                  count: requests.filter(
                    (item) => item.status === "completed"
                  ).length,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl bg-white/10 p-3"
                >
                  <p className="text-xl font-bold">
                    {item.count}
                  </p>
                  <p className="mt-1 text-[11px]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <div className="mb-4 rounded-xl bg-red-50 p-4 text-sm text-red-700">
              {error}
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="ml-2 font-bold underline"
              >
                Retry
              </button>
            </div>
          )}

          {/* EMPTY STATE */}
          {!error && requests.length === 0 && (
            <div className="mt-8 rounded-[20px] bg-white p-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
                <Wrench
                  size={26}
                  className="text-[#008000]"
                />
              </div>

              <h2 className="mt-4 text-base font-bold text-[#1F2937]">
                No service requests yet
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                When you request a service from a provider, it will
                appear here with its current status.
              </p>

              <button
                type="button"
                onClick={() => navigate("/search")}
                className="mt-5 rounded-full bg-[#008000] px-6 py-3 text-sm font-bold text-white"
              >
                Find a Provider
              </button>
            </div>
          )}

          {/* ALL REQUESTS */}
          <div className="flex flex-col gap-4">
            {requests.map((request) => {
              const provider = providers[request.id];

              const providerName =
                provider?.fullName ||
                provider?.full_name ||
                `Provider #${request.providerId || "Unavailable"}`;

              const providerAddress =
                provider?.realAddress ||
                provider?.real_address ||
                provider?.city ||
                "Location unavailable";

              const status = String(
                request.status || ""
              ).toLowerCase();

              const feedback = feedbacks[request.id];

              return (
                <article
                  key={request.id}
                  className="rounded-[20px] bg-white p-5"
                >
                  {/* REQUEST HEADER */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[11px] font-medium text-gray-500">
                        REQUEST #{request.id}
                      </p>

                      <h3 className="mt-1 break-words text-[16px] font-bold text-[#1F2937]">
                        {request.serviceCategory || "Service request"}
                      </h3>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-3 py-2 text-[10px] font-bold ${getStatusColor(status)}`}
                    >
                      {getStatusLabel(status)}
                    </span>
                  </div>

                  {/* PROVIDER */}
                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100">
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
                          size={23}
                          className="text-gray-400"
                        />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-[#1F2937]">
                        {providerName}
                      </p>

                      <div className="mt-1 flex items-start gap-1 text-[12px] text-gray-500">
                        <MapPin
                          size={13}
                          className="mt-0.5 shrink-0 text-[#008000]"
                        />
                        <span className="break-words">
                          {providerAddress}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* DESCRIPTION */}
                  <div className="mt-4 rounded-xl bg-[#F9FAFB] p-3">
                    <p className="text-[11px] text-gray-500">
                      Request description
                    </p>

                    <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-6 text-[#1F2937]">
                      {request.description || "No description provided."}
                    </p>
                  </div>

                  {/* DATE */}
                  <div className="mt-4 flex items-start gap-2">
                    <Clock3
                      size={15}
                      className="mt-0.5 shrink-0 text-[#008000]"
                    />

                    <div>
                      <p className="text-[11px] text-gray-500">
                        Preferred service date and time
                      </p>
                      <p className="mt-1 text-[13px] font-semibold text-[#1F2937]">
                        {formatDate(
                          request.serviceDateTime ||
                            request.service_date_time
                        )}
                      </p>
                    </div>
                  </div>

                  {/* PRICE */}
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="text-[12px] text-gray-500">
                      {status === "declined"
                        ? "Request outcome"
                        : "Service price"}
                    </span>

                    <span className="text-[14px] font-bold text-[#008000]">
                      {status === "declined"
                        ? "Declined"
                        : formatPrice(request.price)}
                    </span>
                  </div>

                  {/* FEEDBACK FOR COMPLETED REQUESTS */}
                  {status === "completed" && (
                    <div className="mt-4 rounded-xl bg-green-50 p-3">
                      {feedback ? (
                        <>
                          <div className="flex items-center gap-2">
                            <CheckCircle
                              size={16}
                              className="text-[#008000]"
                            />
                            <span className="text-[12px] font-bold text-green-800">
                              Feedback submitted
                            </span>
                          </div>

                          <div className="mt-2 flex items-center gap-1">
                            {Array.from(
                              { length: 5 },
                              (_, index) => (
                                <Star
                                  key={index}
                                  size={15}
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

                            <span className="ml-1 text-xs font-semibold text-gray-700">
                              {feedback.overallRating}/5
                            </span>
                          </div>

                          {feedback.comment && (
                            <p className="mt-2 text-xs leading-5 text-gray-600">
                              “{feedback.comment}”
                            </p>
                          )}
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            navigate("/feedback", {
                              state: {
                                requestId: request.id,
                                request,
                                provider,
                              },
                            })
                          }
                          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#008000] px-4 py-3 text-sm font-bold text-white"
                        >
                          <Star size={16} />
                          Rate Service
                        </button>
                      )}
                    </div>
                  )}

                  {/* ACTIONS */}
                  <div className="mt-5 flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleProfile(provider)}
                      disabled={!provider?.id}
                      className="flex h-[43px] min-w-0 flex-1 items-center justify-center gap-2 rounded-xl border border-[#008000] bg-white px-2 text-[12px] font-bold text-[#008000] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <User size={15} />
                      Profile
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleMessage(request, provider)
                      }
                      disabled={!provider?.id}
                      className="flex h-[43px] min-w-0 flex-1 items-center justify-center gap-2 rounded-xl border border-[#008000] bg-white px-2 text-[12px] font-bold text-[#008000] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <MessageCircle size={15} />
                      Let's Chat
                    </button>
                  </div>

                  {/* STATUS MESSAGE */}
                  {status === "pending" && (
                    <p className="mt-4 text-[12px] leading-5 text-amber-700">
                      Your request is waiting for the provider's response.
                    </p>
                  )}

                  {status === "accepted" && (
                    <p className="mt-4 text-[12px] leading-5 text-blue-700">
                      The provider has accepted your request.
                    </p>
                  )}

                  {status === "in_progress" && (
                    <p className="mt-4 text-[12px] leading-5 text-indigo-700">
                      Your service is currently in progress.
                    </p>
                  )}

                  {status === "declined" && (
                    <p className="mt-4 text-[12px] leading-5 text-red-700">
                      The provider declined this request. You can find another provider if needed.
                    </p>
                  )}

                  {status === "completed" && (
                    <p className="mt-4 text-[12px] leading-5 text-green-700">
                      This service has been completed.
                    </p>
                  )}

                  {/* DETAILS */}
                  <button
                    type="button"
                    onClick={() => handleOpenRequest(request)}
                    className="mt-4 flex w-full items-center justify-between border-t border-gray-100 pt-4 text-[13px] font-bold text-[#008000]"
                  >
                    View Request Details
                    <ChevronRight size={17} />
                  </button>
                </article>
              );
            })}
          </div>
        </div>

        {/* HOME INDICATOR */}
        <div className="absolute bottom-0 left-0 z-50 flex h-6 w-full items-center justify-center bg-[#F9FAFB]">
          <div className="h-1 w-[108px] rounded-full bg-black" />
        </div>
      </div>
    </div>
  );
}

export default SeekRequest;