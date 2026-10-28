import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Bell,
  Clock,
  User,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  XCircle,
  PlayCircle,
  CheckCircle,
} from "lucide-react";

const API_URL = "http://localhost:5000";

const ServiceReq = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("All");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState("");

  // =========================
  // FETCH PROVIDER REQUESTS
  // =========================
  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("You are not logged in.");
        return;
      }

      const response = await fetch(`${API_URL}/api/requests`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load service requests."
        );
      }

      setRequests(data.requests || []);
    } catch (error) {
      console.error("Fetch service requests error:", error);
      setError(error.message || "Failed to load service requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // =========================
  // REQUEST ACTION
  // =========================
const handleRequestAction = async (requestId, action) => {
  try {
    setActionLoading(`${requestId}-${action}`);
    setError("");

    const token = localStorage.getItem("token");

    if (!token) {
      setError("You are not logged in.");
      return;
    }

    let price;

    // Provider must enter a price when accepting
    if (action === "accept") {
      const enteredPrice = window.prompt(
        "Enter the agreed service price in Naira:"
      );

      if (enteredPrice === null) {
        return;
      }

      price = Number(enteredPrice);

      if (
        !Number.isInteger(price) ||
        price < 0
      ) {
        setError("Please enter a valid price.");
        return;
      }
    }

    const response = await fetch(
      `${API_URL}/api/requests/${requestId}/${action}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          ...(action === "accept" && {
            "Content-Type": "application/json",
          }),
        },
        ...(action === "accept" && {
          body: JSON.stringify({
            price,
          }),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          `Failed to ${action} request.`
      );
    }

    // Refresh the requests so the new status and price are displayed.
    await fetchRequests();
  } catch (error) {
    console.error(
      `Request ${action} error:`,
      error
    );

    setError(
      error.message ||
        `Failed to ${action} service request.`
    );
  } finally {
    setActionLoading(null);
  }
};
  // =========================
  // TABS
  // =========================
  const tabs = [
    {
      name: "All",
      count: requests.length,
    },
    {
      name: "New",
      count: requests.filter(
        (request) => request.status === "pending"
      ).length,
    },
    {
      name: "Responded",
      count: requests.filter((request) =>
        ["accepted", "in_progress", "completed"].includes(
          request.status
        )
      ).length,
    },
    {
      name: "Declined",
      count: requests.filter(
        (request) => request.status === "declined"
      ).length,
    },
  ];

  // =========================
  // FILTER REQUESTS
  // =========================
  const filteredRequests = requests.filter((request) => {
    if (activeTab === "All") {
      return true;
    }

    if (activeTab === "New") {
      return request.status === "pending";
    }

    if (activeTab === "Responded") {
      return ["accepted", "in_progress", "completed"].includes(
        request.status
      );
    }

    if (activeTab === "Declined") {
      return request.status === "declined";
    }

    return true;
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // =========================
  // STATUS HELPERS
  // =========================
  const getStatusLabel = (status) => {
    switch (status) {
      case "pending":
        return "NEW";

      case "accepted":
        return "ACCEPTED";

      case "in_progress":
        return "IN PROGRESS";

      case "completed":
        return "COMPLETED";

      case "declined":
        return "DECLINED";

      default:
        return status?.toUpperCase() || "UNKNOWN";
    }
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case "pending":
        return "bg-[#008000] text-white";

      case "accepted":
        return "bg-blue-100 text-blue-700";

      case "in_progress":
        return "bg-orange-100 text-orange-700";

      case "completed":
        return "bg-[#D1FAE5] text-[#008000]";

      case "declined":
        return "bg-red-100 text-red-600";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const formatDate = (date) => {
    if (!date) {
      return "";
    }

    const createdAt = new Date(date);

    if (Number.isNaN(createdAt.getTime())) {
      return "";
    }

    return createdAt.toLocaleString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  // =========================
  // REQUEST CARD ACTIONS
  // =========================
  const renderActionButtons = (request) => {
    const { id, status } = request;

    // PENDING
    if (status === "pending") {
      return (
        <div className="flex h-12 flex-1 gap-2">
          <button
            type="button"
            onClick={() =>
              handleRequestAction(id, "accept")
            }
            disabled={actionLoading !== null}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#008000] px-2 text-sm font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {actionLoading === `${id}-accept` ? (
              <Loader2
                size={16}
                className="animate-spin"
              />
            ) : (
              <CheckCircle2 size={16} />
            )}

            Accept
          </button>

          <button
            type="button"
            onClick={() =>
              handleRequestAction(id, "decline")
            }
            disabled={actionLoading !== null}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-2 text-sm font-bold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {actionLoading === `${id}-decline` ? (
              <Loader2
                size={16}
                className="animate-spin"
              />
            ) : (
              <XCircle size={16} />
            )}

            Decline
          </button>
        </div>
      );
    }

    // ACCEPTED
    if (status === "accepted") {
      return (
        <button
          type="button"
          onClick={() =>
            handleRequestAction(id, "start")
          }
          disabled={actionLoading !== null}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-[#008000] px-2 text-sm font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {actionLoading === `${id}-start` ? (
            <Loader2
              size={16}
              className="animate-spin"
            />
          ) : (
            <PlayCircle size={17} />
          )}

          Start Service
        </button>
      );
    }

    // IN PROGRESS
    if (status === "in_progress") {
      return (
        <button
          type="button"
          onClick={() =>
            handleRequestAction(id, "complete")
          }
          disabled={actionLoading !== null}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-[#008000] px-2 text-sm font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {actionLoading === `${id}-complete` ? (
            <Loader2
              size={17}
              className="animate-spin"
            />
          ) : (
            <CheckCircle size={17} />
          )}

          Complete Service
        </button>
      );
    }

    // COMPLETED
    if (status === "completed") {
      return (
        <button
          type="button"
          disabled
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-[#D1FAE5] text-sm font-bold text-[#008000]"
        >
          <CheckCircle size={17} />

          Service Completed
        </button>
      );
    }

    // DECLINED
    if (status === "declined") {
      return (
        <button
          type="button"
          disabled
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 text-sm font-bold text-red-600"
        >
          <XCircle size={17} />

          Declined
        </button>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* MOBILE APPLICATION CONTAINER */}
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
        <header className="absolute left-0 top-0 z-30 w-full bg-white">
          {/* TOP HEADER */}
          <div className="flex h-14 items-center justify-between px-6">
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex items-center justify-center text-[#1F2937]"
              >
                <ArrowLeft size={24} />
              </button>

              <h1 className="text-xl font-bold text-[#1F2937]">
                Service Requests
              </h1>
            </div>

            {/* Notification */}
            <div className="relative">
              <Bell
                size={24}
                className="text-[#6B7280]"
              />

              {requests.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#008000] px-1 text-[10px] font-bold text-white">
                  {requests.length}
                </span>
              )}
            </div>
          </div>

          {/* ================= TABS ================= */}
          <div className="px-6 pb-4 pt-4">
            <div className="flex items-end justify-between">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.name;

                return (
                  <button
                    key={tab.name}
                    type="button"
                    onClick={() =>
                      handleTabChange(tab.name)
                    }
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm font-semibold ${
                          isActive
                            ? "text-[#008000]"
                            : "text-[#6B7280]"
                        }`}
                      >
                        {tab.name}
                      </span>

                      {tab.count !== null && (
                        <span
                          className={`flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1 text-[10px] font-bold text-white ${
                            tab.name === "New"
                              ? "bg-[#F59E0B]"
                              : "bg-[#008000]"
                          }`}
                        >
                          {tab.count}
                        </span>
                      )}
                    </div>

                    <div
                      className={`h-[2px] ${
                        isActive
                          ? "bg-[#008000]"
                          : "bg-transparent"
                      } ${
                        tab.name === "All"
                          ? "w-[73px]"
                          : tab.name === "New"
                          ? "w-[86px]"
                          : tab.name === "Responded"
                          ? "w-[100px]"
                          : "w-[89px]"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        {/* ================= REQUEST LIST ================= */}
        <main
          className="
            absolute
            left-0
            right-0
            top-[138px]
            bottom-0
            overflow-y-auto
            overflow-x-hidden
            scrollbar-hide
            space-y-3
            px-6
            py-3
            pb-10
          "
        >
          {/* ERROR */}
          {error && (
            <div className="mb-3 rounded-[15px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}

              <button
                type="button"
                onClick={fetchRequests}
                className="ml-2 font-bold underline"
              >
                Try again
              </button>
            </div>
          )}

          {/* LOADING */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2
                size={35}
                className="animate-spin text-[#008000]"
              />

              <p className="mt-4 text-sm text-[#6B7280]">
                Loading service requests...
              </p>
            </div>
          )}

          {/* REQUESTS */}
          {!loading &&
            filteredRequests.map((request) => (
              <article
                key={request.id}
                className="rounded-[15px] bg-white p-4"
              >
                <div className="flex flex-col gap-4">
                  {/* TOP REQUEST DETAILS */}
                  <div className="flex flex-col gap-4">
                    {/* PROFILE SECTION */}
                    <div className="flex items-start gap-3">
                      {/* Avatar */}
                      <div className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
                        <User size={24} />
                      </div>

                      {/* Name + Status */}
                      <div className="flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-1">
                          <h2 className="text-base font-bold leading-[19px] text-[#1F2937]">
                            Seeker #{request.seekerId}
                          </h2>

                          <p className="text-sm leading-[17px] text-[#6B7280]">
                            {request.serviceCategory}
                          </p>
                        </div>

                        {/* STATUS */}
                        <div className="flex flex-wrap items-center gap-2">
                          {request.status ===
                            "pending" && (
                            <span className="flex items-center gap-1 rounded-full bg-[#F59E0B] px-[7px] py-[6px] text-[10px] font-bold leading-3 text-white">
                              <AlertTriangle
                                size={11}
                              />
                              NEW REQUEST
                            </span>
                          )}

                          <span
                            className={`rounded-full px-[7px] py-[6px] text-[10px] font-bold leading-3 ${getStatusClasses(
                              request.status
                            )}`}
                          >
                            {getStatusLabel(
                              request.status
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* REQUEST ID */}
                    <div className="flex w-fit items-center gap-2 rounded-lg border border-[#E5E7EB] bg-gray-50 px-4 py-[10px]">
                      <CheckCircle2
                        size={12}
                        className="text-[#008000]"
                      />

                      <span className="text-xs font-bold text-[#4B5563]">
                        Request #{request.id}
                      </span>
                    </div>

                    {/* TIME */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                      <div className="flex items-center gap-1">
                        <Clock
                          size={14}
                          className="text-[#008000]"
                        />

                        <span className="text-xs text-[#6B7280]">
                          {formatDate(
                            request.createdAt
                          )}
                        </span>
                      </div>
                    </div>

                    {/* DESCRIPTION */}
                    <div>
                      <p className="mb-1 text-xs font-bold uppercase text-[#9CA3AF]">
                        Request description
                      </p>

                      <p className="text-sm leading-5 text-[#4B5563]">
                        {request.description}
                      </p>
                    </div>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="flex h-12 gap-2">
                    {renderActionButtons(request)}
                  </div>
                </div>
              </article>
            ))}

          {/* EMPTY STATE */}
          {!loading &&
            filteredRequests.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <User
                  size={50}
                  className="mb-4 text-gray-300"
                />

                <h3 className="font-bold text-[#1F2937]">
                  No requests found
                </h3>

                <p className="mt-2 text-sm text-[#6B7280]">
                  There are currently no service
                  requests in this category.
                </p>
              </div>
            )}

          {/* ALL REQUESTS LOADED */}
          {!loading &&
            filteredRequests.length > 0 && (
              <div className="py-5 text-center">
                <p className="text-sm text-[#6B7280]">
                  You have reached the end of the
                  requests.
                </p>
              </div>
            )}
        </main>
      </div>
    </div>
  );
};

export default ServiceReq;