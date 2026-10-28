import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  User,
  Settings,
  ChevronRight,
  MapPin,
  Clock,
  Check,
  X,
  Eye,
  Wrench,
  Tag,
  CalendarDays,
  Share2,
  Zap,
  Star,
  BriefcaseBusiness,
  TrendingUp,
  Home,
  ClipboardList,
  MessageCircle,
} from "lucide-react";

const API_URL = "http://localhost:5000";

function DashboardProv() {
  const navigate = useNavigate();

  const [available, setAvailable] = useState(true);

  const [user, setUser] = useState(null);

  const [responseTime, setResponseTime] = useState(null);
const [loadingResponseTime, setLoadingResponseTime] = useState(true);
const [responseTimeError, setResponseTimeError] = useState("");

const [totalResponses, setTotalResponses] = useState(0);


const [acceptanceRate, setAcceptanceRate] = useState(null);
const [loadingAcceptanceRate, setLoadingAcceptanceRate] = useState(true);
const [acceptanceRateError, setAcceptanceRateError] = useState("");
const [acceptedRequests, setAcceptedRequests] = useState(0);
const [declinedRequests, setDeclinedRequests] = useState(0);
const [totalDecided, setTotalDecided] = useState(0);


  const [activeRequestCount, setActiveRequestCount] = useState(0);
const [loadingActiveRequests, setLoadingActiveRequests] = useState(true);

const [showActiveRequests, setShowActiveRequests] = useState(false);

const [loadingUser, setLoadingUser] = useState(true);

const [providerProfile, setProviderProfile] = useState(null);
const [loadingProviderProfile, setLoadingProviderProfile] = useState(true);

const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);

const [completedJobsCount, setCompletedJobsCount] = useState(0);
const [loadingCompletedJobs, setLoadingCompletedJobs] = useState(true);
const [completedJobsError, setCompletedJobsError] = useState("");

const [averageRating, setAverageRating] = useState(0);
const [totalReviews, setTotalReviews] = useState(0);
const [loadingRating, setLoadingRating] = useState(true);

const [currentDate, setCurrentDate] = useState(new Date());

useEffect(() => {
  let cancelled = false;

  const fetchCompletedJobs = async () => {
    try {
      setLoadingCompletedJobs(true);
      setCompletedJobsError("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error(
          "Please log in to view completed jobs."
        );
      }

      const response = await fetch(
        `${API_URL}/api/requests/provider/completed-jobs`,
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
          data.message || "Unable to load completed jobs."
        );
      }

      if (!cancelled) {
        setCompletedJobs(
          Number.isFinite(Number(data.completedJobs))
            ? Number(data.completedJobs)
            : 0
        );
      }
    } catch (error) {
      if (!cancelled) {
        setCompletedJobsError(
          error.message || "Unable to load completed jobs."
        );
      }
    } finally {
      if (!cancelled) {
        setLoadingCompletedJobs(false);
      }
    }
  };

  fetchCompletedJobs();

  return () => {
    cancelled = true;
  };
}, []);


useEffect(() => {
  let cancelled = false;

  const fetchAcceptanceRate = async () => {
    try {
      setLoadingAcceptanceRate(true);
      setAcceptanceRateError("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error(
          "Please log in to view your acceptance rate."
        );
      }

      const response = await fetch(
        `${API_URL}/api/requests/provider/acceptance-rate`,
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
          data.message || "Unable to load acceptance rate."
        );
      }

      if (!cancelled) {
        setAcceptanceRate(
          data.acceptanceRate == null ||
            !Number.isFinite(Number(data.acceptanceRate))
            ? null
            : Number(data.acceptanceRate)
        );

        setAcceptedRequests(
          Number(data.acceptedRequests) || 0
        );

        setDeclinedRequests(
          Number(data.declinedRequests) || 0
        );

        setTotalDecided(
          Number(data.totalDecided) || 0
        );
      }
    } catch (error) {
      if (!cancelled) {
        setAcceptanceRateError(
          error.message ||
            "Unable to load acceptance rate."
        );
      }
    } finally {
      if (!cancelled) {
        setLoadingAcceptanceRate(false);
      }
    }
  };

  fetchAcceptanceRate();

  return () => {
    cancelled = true;
  };
}, []);



useEffect(() => {
  let cancelled = false;

  const fetchResponseTime = async () => {
    try {
      setLoadingResponseTime(true);
      setResponseTimeError("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please log in to view response time.");
      }

      const response = await fetch(
        "http://localhost:5000/api/requests/provider/response-time",
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
          data.message || "Unable to load response time."
        );
      }

     if (!cancelled) {
  setResponseTime(Number(data.averageSeconds));
  setTotalResponses(Number(data.totalResponses) || 0);
}
    } catch (error) {
      if (!cancelled) {
        setResponseTimeError(
          error.message || "Unable to load response time."
        );
      }
    } finally {
      if (!cancelled) {
        setLoadingResponseTime(false);
      }
    }
  };

  fetchResponseTime();

  return () => {
    cancelled = true;
  };
}, []);


useEffect(() => {
  let cancelled = false;

  const fetchRatingSummary = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please log in to view your rating.");
      }

      const response = await fetch(
        `${API_URL}/api/feedback/provider/summary`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load rating."
        );
      }

      if (!cancelled) {
        setAverageRating(Number(data.averageRating) || 0);
        setTotalReviews(Number(data.totalReviews) || 0);
      }
    } catch (error) {
      console.error("Fetch rating summary error:", error);
    } finally {
      if (!cancelled) {
        setLoadingRating(false);
      }
    }
  };

  fetchRatingSummary();

  return () => {
    cancelled = true;
  };
}, []);

useEffect(() => {
  let cancelled = false;

  const fetchCompletedJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please log in to view completed jobs.");
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
          data.message || "Failed to load completed jobs."
        );
      }

      const completedCount = (data.requests || []).filter(
        (request) => request.status === "completed"
      ).length;

      if (!cancelled) {
        setCompletedJobsCount(completedCount);
      }
    } catch (error) {
      console.error("Fetch completed jobs error:", error);
    } finally {
      if (!cancelled) {
        setLoadingCompletedJobs(false);
      }
    }
  };

  fetchCompletedJobs();

  return () => {
    cancelled = true;
  };
}, []);

useEffect(() => {
  const timer = setInterval(() => {
    setCurrentDate(new Date());
  }, 60000);

  return () => clearInterval(timer);
}, []);

useEffect(() => {
  const fetchActiveRequests = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication required.");
      }

      const response = await fetch(
        "http://localhost:5000/api/requests",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch requests."
        );
      }

      const requests = data.requests || [];

      // Count requests still awaiting the provider's response.
      const activeCount = requests.filter(
        (request) => request.status === "pending"
      ).length;

      setActiveRequestCount(activeCount);
    } catch (error) {
      console.error("Fetch active requests error:", error);
    } finally {
      setLoadingActiveRequests(false);
    }
  };

  fetchActiveRequests();
}, []);

useEffect(() => {
  let cancelled = false;

  const fetchSavedProviderProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const response = await fetch(
        `${API_URL}/api/users/provider-profile`,
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
          data.message || "Failed to load provider profile."
        );
      }

      if (!cancelled) {
        setProviderProfile({
          user: data.user || {},
          profile: data.profile || null,
        });

        // Keep the account details refreshed locally.
        const savedUser = JSON.parse(
          localStorage.getItem("user") || "{}"
        );

        localStorage.setItem(
          "user",
          JSON.stringify({
            ...savedUser,
            ...(data.user || {}),
          })
        );
      }
    } catch (error) {
      console.error(
        "Fetch saved provider profile error:",
        error
      );
    } finally {
      if (!cancelled) {
        setLoadingProviderProfile(false);
      }
    }
  };

  fetchSavedProviderProfile();

  return () => {
    cancelled = true;
  };
}, []);

// ================= FETCH BASIC USER PROFILE =================
useEffect(() => {
  let cancelled = false;

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setUser(null);
        return;
      }

      const response = await fetch(
        `${API_URL}/api/users/profile`,
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
          data.message || "Failed to load user profile."
        );
      }

      console.log("Basic profile API response:", data);

      if (!cancelled) {
        const profileUser = data.user || data;

        setUser(profileUser);

        // Keep the latest name and account details locally.
        const savedUser = JSON.parse(
          localStorage.getItem("user") || "{}"
        );

        localStorage.setItem(
          "user",
          JSON.stringify({
            ...savedUser,
            ...profileUser,
          })
        );
      }
    } catch (error) {
      console.error("Fetch user profile error:", error);
    } finally {
      if (!cancelled) {
        setLoadingUser(false);
      }
    }
  };

  fetchUserProfile();

  return () => {
    cancelled = true;
  };
}, []);

const handleAvailabilityToggle = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return;
  }

  const newAvailability = !available;

  try {
    const response = await fetch(
      `${API_URL}/api/users/availability`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          isAvailable: newAvailability,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to update availability"
      );
    }

    setAvailable(data.availability.isAvailable);
  } catch (error) {
    console.error(
      "Update availability error:",
      error
    );
  }
};

useEffect(() => {
  const fetchUnreadNotificationCount = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }


const response = await fetch(
  `${API_URL}/api/notifications/unread-count`,
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
          data.message || "Failed to fetch notification count"
        );
      }

      setUnreadNotificationCount(
        Number(data.count || 0)
      );
    } catch (error) {
      console.error(
        "Fetch unread notification count error:",
        error
      );
    }
  };

  fetchUnreadNotificationCount();
}, []);

const handleOpenNotifications = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/notifprov");
      return;
    }

    await fetch(
      `${API_URL}/api/notifications/mark-all-read`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setUnreadNotificationCount(0);

    navigate("/notifprov");
  } catch (error) {
    console.error(
      "Mark notifications as read error:",
      error
    );

    navigate("/notifprov");
  }
};

const [requests, setRequests] = useState([]);
const [loadingRequests, setLoadingRequests] = useState(true);
const [requestError, setRequestError] = useState("");

useEffect(() => {
  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setRequestError("Please log in to view requests.");
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
        throw new Error(data.message || "Failed to load requests.");
      }

      setRequests(
        (data.requests || []).filter(
          (request) => request.status === "pending"
        )
      );
    } catch (error) {
      console.error("Fetch requests error:", error);
      setRequestError(error.message || "Unable to load requests.");
    } finally {
      setLoadingRequests(false);
    }
  };

  fetchRequests();
}, []);

const formatServiceDateTime = (dateValue) => {
  if (!dateValue) return "Date and time not provided";

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "Invalid service date and time";
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
  if (price === null || price === undefined || price === "") {
    return "No charge";
  }

  const amount = Number(price);

  if (!Number.isFinite(amount)) {
    return "Price unavailable";
  }

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 2,
  }).format(amount);
};

const getPricingModel = (request) => {
  if (request.pricingModel) {
    return request.pricingModel;
  }

  // Infer models from request fields if the API
  // does not yet return pricingModel.
  if (
    request.quoteStatus === "requested" ||
    request.quoteStatus === "quoted" ||
    request.quoteStatus === "accepted" ||
    request.quoteStatus === "declined" ||
    request.quotedPrice !== null &&
      request.quotedPrice !== undefined
  ) {
    return "quotation";
  }

  if (
    request.distanceRangeKm !== null &&
    request.distanceRangeKm !== undefined
  ) {
    return "distance_based";
  }

  return "unknown";
};

const getPricingLabel = (request) => {
  const model = getPricingModel(request);

  switch (model) {
    case "fixed":
      return "Fixed price";

    case "distance_based":
      return `Distance-based${
        request.distanceRangeKm
          ? ` · ${request.distanceRangeKm} km`
          : ""
      }`;

    case "quotation":
      return "Quotation";

    case "non_commercial":
      return "Non-commercial";

    default:
      return "Pricing details";
  }
};


const handleAccept = async (request) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Please log in again.");
    }

    const response = await fetch(
      `${API_URL}/api/requests/${request.id}/accept`,
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
        data.message || "Failed to accept request."
      );
    }

    // Remove the accepted request from the pending list.
    setRequests((previous) =>
      previous.filter(
        (item) => item.id !== request.id
      )
    );

    setActiveRequestCount((count) => Math.max(0, count - 1));

    // Open the booking page for this specific request.
    const acceptedRequest = data.request;

    navigate(
      `/book-keeping?role=provider&requestId=${
        acceptedRequest.id
      }`
    );
  } catch (error) {
    console.error("Accept request error:", error);
    alert(error.message || "Unable to accept request.");
  }
};

const handleDecline = async (request) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Please log in again.");
    }

    const response = await fetch(
      `${API_URL}/api/requests/${request.id}/decline`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to decline request.");
    }

    setRequests((previous) =>
      previous.filter((item) => item.id !== request.id)
    );

    setActiveRequestCount((count) => Math.max(0, count - 1));

  } catch (error) {
    console.error("Decline request error:", error);
    alert(error.message || "Unable to decline request.");
  }
};



  const handleViewDetails = (request) => {
    console.log("Viewing:", request);
  };

  const formattedDate = currentDate.toLocaleDateString(
  "en-US",
  {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }
);

const providerUser = providerProfile?.user || {};

const savedProfile = providerProfile?.profile || {};

const providerBusinessName =
  savedProfile.businessName ||
  providerUser.businessName ||
  "";

const providerOccupation =
  providerUser.occupation || "";

const providerServiceCategory =
  providerUser.serviceCategory || "";

const providerServices = Array.isArray(savedProfile.services)
  ? savedProfile.services
  : providerServiceCategory
    ? [providerServiceCategory]
    : [];

const providerLocationValue =
  savedProfile.serviceArea ||
  providerUser.realAddress ||
  providerUser.city ||
  "";

const providerLocation =
  typeof providerLocationValue === "string"
    ? providerLocationValue
    : providerLocationValue?.address ||
      providerUser.realAddress ||
      providerUser.city ||
      "";

const providerExperience =
  savedProfile.yearsOfExperience;

const formatResponseTime = (seconds) => {
  if (seconds === null || !Number.isFinite(seconds) || seconds < 0) {
    return "N/A";
  }

  const totalMinutes = Math.round(seconds / 60);

  if (totalMinutes < 1) {
    return "< 1 min";
  }

  if (totalMinutes < 60) {
    return `${totalMinutes} min`;
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours < 24) {
    return minutes > 0
      ? `${hours}h ${minutes}m`
      : `${hours}h`;
  }

  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;

  return remainingHours > 0
    ? `${days}d ${remainingHours}h`
    : `${days}d`;
};


  return (
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
    font-['Inter',sans-serif]
  "
>
      

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <div
  className="
    absolute
    left-0
    right-0
    top-0
    bottom-[99px]
    w-full
    overflow-y-auto
    overflow-x-hidden
    scrollbar-hide
  "
>
  <div className="flex w-full flex-col items-center gap-6 pt-[62px] pb-[120px]">


        {/* =====================================================
            HEADER
        ====================================================== */}
        <div className="flex h-[104px] w-full flex-col">

          {/* Logo + icons */}
          <div className="flex h-[44px] w-full items-center justify-between px-6">

            {/* EasyReach */}
            <button
              type="button"
              onClick={() => navigate("/dashboard-provider")}
              className="flex items-center gap-[2px]"
            >
              <div className="relative h-[25px] w-[21px] rotate-[25deg]">

                <img
            src="/EasyReach.png"
            alt="EasyReach"
            className=" h-7 -mt-1 object-contain"
          />
          

              </div>

              <span className="font-['Rajdhani'] text-[17px] font-bold leading-[22px] text-[#1F2937]">
                EasyReach
              </span>
            </button>


            {/* Notification + profile */}
            <div className="flex items-center gap-4">

              <button
                type="button"
                onClick={handleOpenNotifications}
                className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#F9FAFB]"
              >
                <Bell size={20} className="text-[#6B7280]" />
{unreadNotificationCount > 0 && (
  <span className="absolute right-[7px] top-[7px] flex h-4 w-4 items-center justify-center rounded-full border border-white bg-[#EF4444] text-[10px] font-bold text-white">
    {unreadNotificationCount > 99
      ? "99+"
      : unreadNotificationCount}
  </span>
  
)}
  </button>
 
            </div>
          </div>
{/* Availability */}
          <div className="flex h-[60px] w-full items-center justify-between bg-[#D1FAE5] px-6">

            <span className="text-[14px] font-bold italic text-[#008000]">
              Available
            </span>

            <button
              type="button"
            
onClick={handleAvailabilityToggle}


              className={`relative h-7 w-12 rounded-full transition ${
                available ? "bg-[#008000]" : "bg-[#9CA3AF]"
              }`}
            >
              <span
                className={`absolute top-[3px] h-[22px] w-[22px] rounded-full bg-white shadow transition ${
                  available ? "right-[3px]" : "left-[3px]"
                }`}
              />
            </button>

          </div>
        </div>


        {/* =====================================================
            GREETING
        ====================================================== */}
        <div className="flex w-full flex-col gap-2 bg-white px-6 py-3">

  <p className="text-[20px] font-bold leading-6 text-[#1F2937]">
  Good morning,{" "}
  {loadingUser
    ? "..."
    : (
        user?.fullName ||
        providerProfile?.user?.fullName ||
        JSON.parse(localStorage.getItem("user") || "{}").fullName ||
        "Provider"
      )
        .trim()
        .split(/\s+/)
        .pop()}
</p>
          <p className="text-[14px] leading-[17px] text-[#6B7280]">
            {formattedDate}
          </p>

        </div>

      
{/* =====================================================
    SAVED PROVIDER PROFILE
====================================================== */}
<section className="mx-6 flex w-auto self-stretch flex-col gap-3 rounded-[18px] border border-[#E5E7EB] bg-white p-4">
  <div className="flex items-start justify-between gap-3">
    <div className="min-w-0 flex-1">
      <p className="text-[12px] font-medium text-[#6B7280]">
        Your Business Profile
      </p>

      <h2 className="mt-1 break-words text-[18px] font-bold text-[#1F2937]">
        {loadingProviderProfile
          ? "Loading profile..."
          : providerBusinessName ||
            user?.fullName ||
            "Complete your profile"}
      </h2>
    </div>

    <button
      type="button"
      onClick={() => navigate("/realprofile")}
      className="shrink-0 text-[12px] font-bold text-[#008000]"
    >
      View Profile
    </button>
  </div>

  {loadingProviderProfile ? (
    <p className="text-[13px] text-[#6B7280]">
      Loading your saved details...
    </p>
  ) : (
    <>
      {providerOccupation && (
        <div>
          <p className="text-[11px] text-[#9CA3AF]">
            Occupation
          </p>
          <p className="mt-1 text-[13px] font-semibold text-[#374151]">
            {providerOccupation}
          </p>
        </div>
      )}

      {providerServices.length > 0 && (
        <div>
          <p className="text-[11px] text-[#9CA3AF]">
            Services
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            {providerServices.map((service) => (
              <span
                key={service}
                className="rounded-full bg-[#F0FDF4] px-3 py-1.5 text-[11px] font-semibold text-[#008000]"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      )}

      {providerLocation && (
        <div className="flex items-start gap-2">
          <MapPin
            size={15}
            className="mt-0.5 shrink-0 text-[#008000]"
          />

          <p className="break-words text-[12px] text-[#6B7280]">
            {providerLocation}
          </p>
        </div>
      )}

      {providerExperience != null && (
        <p className="text-[12px] text-[#6B7280]">
          {providerExperience}{" "}
          {Number(providerExperience) === 1
            ? "year"
            : "years"}{" "}
          of experience
        </p>
      )}

      {!providerBusinessName &&
        !providerOccupation &&
        providerServices.length === 0 && (
          <p className="text-[12px] text-[#6B7280]">
            Complete your profile to display your business details here.
          </p>
        )}
    </>
  )}
</section>


 {/* =====================================================
            STAT CARDS
        ====================================================== */}
        <div className="mx-6 grid w-auto self-stretch grid-cols-3 gap-[13px]">

{/* Active Requests */}
<button
  type="button"
  onClick={() => setShowActiveRequests(true)}
  className="
    flex h-[144px] w-full flex-col items-center
    rounded-[15px]
    bg-gradient-to-br from-[#F59E0B] to-[#D97706]
    px-6 py-4
    transition-opacity hover:opacity-90
  "
>
  <Zap size={32} className="text-white" />

  <span className="mt-2 text-[28px] font-bold italic leading-[34px] text-white">
    {loadingActiveRequests ? "..." : activeRequestCount}
  </span>

  <span className="mt-1 text-center text-[12px] leading-[15px] text-white">
    Active Requests
  </span>

  <span className="mt-1 text-[10px] text-white/90">
    Click to view details
  </span>
</button>

          


{/* Completed Jobs */}
<button
  type="button"
  onClick={() => navigate("/completed-jobs")}
  className="flex h-[144px] w-full flex-col items-center rounded-[15px] bg-gradient-to-br from-[#10B981] to-[#059669] px-6 py-4 transition-opacity hover:opacity-90"
>
  <Check size={32} className="text-white" />

  <span className="mt-2 text-[28px] font-bold italic leading-[34px] text-white">
    {completedJobsCount}
  </span>

  <span className="mt-1 text-center text-[12px] leading-[15px] text-white">
    Completed Jobs
  </span>
</button>


{/* Ratings */}
<div className="flex h-[144px] w-full flex-col items-center rounded-[15px] bg-gradient-to-br from-[#3B82F6] to-[#1E40AF] px-6 py-4">
  <Star
    size={30}
    className="fill-white text-white"
  />

  <span className="mt-2 text-[28px] font-bold italic leading-[34px] text-white">
    {loadingRating
      ? "..."
      : totalReviews === 0
        ? "—"
        : averageRating.toFixed(1)}
  </span>

  <span className="mt-1 text-center text-[12px] text-white">
    {loadingRating
      ? "Loading rating"
      : totalReviews === 0
        ? "No reviews yet"
        : `${totalReviews} ${
            totalReviews === 1 ? "review" : "reviews"
          }`}
  </span>
</div>




        </div>

        {/* =====================================================
            NEW REQUESTS
        ====================================================== */}
       <section className="mx-6 flex w-auto self-stretch flex-col gap-4">

          <div className="flex items-center justify-between">

            <h2 className="text-[16px] font-bold text-[#1F2937]">
              New Requests Near You
            </h2>

  <button
  type="button"
  onClick={() => navigate("/service-history")}
  className="flex items-center gap-1 text-[14px] text-[#008000]"
>
  View All
  <ChevronRight size={14} />
</button>


          </div>

{loadingRequests && (
  <p className="text-sm text-gray-500">
    Loading incoming requests...
  </p>
)}

{!loadingRequests && requestError && (
  <p className="text-sm text-red-600">
    {requestError}
  </p>
)}

{!loadingRequests &&
  !requestError &&
  requests.length === 0 && (
    <p className="text-sm text-gray-500">
      No pending service requests at the moment.
    </p>
  )}


          <div className="flex flex-col gap-3">

      
{requests.map((request) => (
  <div
    key={request.id}
    className="relative box-border w-full rounded-[15px] border-[1.5px] border-[#008000] bg-white p-4"
  >
    {/* Seeker details */}
    <div className="flex items-start gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-100">
        <User size={22} className="text-[#6B7280]" />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-[16px] font-bold text-[#1F2937]">
          Seeker #{request.seekerId}
        </h3>

        <p className="text-[12px] text-[#6B7280]">
          {request.serviceCategory || "Service not specified"}
        </p>

        <p className="mt-1 break-words text-[12px] leading-5 text-[#4B5563]">
          {request.description || "No description provided"}
        </p>
      </div>
    </div>

    {/* Requested service date and time */}
    <div className="mt-4 rounded-lg bg-green-50 p-3">
      <div className="flex items-center gap-2">
        <CalendarDays
          size={18}
          className="shrink-0 text-[#008000]"
        />

        <span className="text-[12px] font-semibold text-[#008000]">
          Requested service date & time
        </span>
      </div>

      <p className="mt-2 text-[14px] font-bold text-[#1F2937]">
        {formatServiceDateTime(request.serviceDateTime)}
      </p>
    </div>

    {/* Request status */}
    <div className="mt-3 flex items-center justify-between gap-3">
      <span className="text-[12px] text-gray-500">
        Request status
      </span>

      <span
        className={`rounded-full px-3 py-1 text-[11px] font-semibold capitalize ${
          request.status === "pending"
            ? "bg-amber-50 text-amber-700"
            : request.status === "accepted"
              ? "bg-green-50 text-green-700"
              : request.status === "declined"
                ? "bg-red-50 text-red-700"
                : "bg-gray-100 text-gray-700"
        }`}
      >
        {request.status}
      </span>
    </div>

    {/* Accept and Decline: pending requests only */}
    {request.status === "pending" && (
      <div className="mt-5 flex gap-3">
        <button
          type="button"
          onClick={() => handleDecline(request)}
          className="flex h-[42px] flex-1 items-center justify-center gap-1 rounded-lg border border-[#D1D5DB] text-[13px] font-bold italic text-[#6B7280]"
        >
          <X size={14} />
          Decline
        </button>

        <button
          type="button"
          onClick={() => handleAccept(request)}
          className="flex h-[42px] flex-1 items-center justify-center gap-1 rounded-lg bg-[#008000] text-[13px] font-bold italic text-white"
        >
          <Check size={14} />
          Accept
        </button>
      </div>
    )}
  </div>
))}



              

          </div>
        </section>

        {/* =====================================================
            THIS WEEK'S PERFORMANCE
        ====================================================== */}
     <section className="mx-6 flex w-auto self-stretch flex-col gap-4">

          <h2 className="text-[16px] font-bold text-[#1F2937]">
            This Week’s Performance
          </h2>

          <div className="grid grid-cols-2 gap-3">

<Performance
  icon={<Clock size={24} />}

value={
  loadingResponseTime
    ? "Loading..."
    : responseTimeError
      ? "Unavailable"
      : totalResponses === 0
        ? "No data"
        : formatResponseTime(responseTime)
}

/>

        
<Performance
  icon={<Check size={24} />}
  value={
    loadingAcceptanceRate
      ? "Loading..."
      : acceptanceRateError
        ? "Unavailable"
        : totalDecided === 0
          ? "No data"
          : `${acceptanceRate}%`
  }
  label="Acceptance Rate"
/>

          
<Performance
  icon={<BriefcaseBusiness size={24} />}
  value={
    loadingCompletedJobs
      ? "Loading..."
      : completedJobsError
        ? "Unavailable"
        : completedJobs ?? 0
  }
  label="Jobs Completed"
/>


          
<Performance
  icon={<Star size={22} className="fill-[#FBBF24]" />}
  value={
    loadingRating
      ? "Loading..."
      : totalReviews === 0
        ? "No data"
        : `${Math.round(
            (Number(averageRating) / 5) * 100
          )}%`
  }
  label="Satisfaction"
  yellow
/>


          </div>

        </section>



        {/* =====================================================
            PRO TIP
        ====================================================== */}
        <div className="mx-6 flex min-h-[130px] w-auto self-stretch flex-col gap-2 rounded-[15px] bg-[#DBEAFE] p-4">

          <div className="flex flex-col gap-1">

            <span className="text-xl">
              💡
            </span>

            <h3 className="text-[15px] font-bold text-[#1E40AF]">
              Pro Tip
            </h3>

          </div>

          <p className="text-[13px] leading-[18px] text-[#1E40AF]">
            Providers who respond within 30 minutes get 3x more bookings
          </p>

        </div>


        {/* Bottom spacing */}
        <div className="h-8" />

      </div>

     
      </div>

    
{/* Active Requests Modal */}
{showActiveRequests && (
  <div
    className="absolute inset-0 z-[60] flex items-center justify-center bg-black/40 p-4"
    onClick={() => setShowActiveRequests(false)}
  >
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="active-requests-title"
      className="flex max-h-[80%] w-full max-w-[560px] flex-col overflow-hidden rounded-[20px] bg-white shadow-xl"
      onClick={(event) => event.stopPropagation()}
    >
      <div className="flex items-center justify-between border-b border-gray-100 p-5">
        <div>
          <h2
            id="active-requests-title"
            className="text-[20px] font-bold text-[#1F2937]"
          >
            Active Requests
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {activeRequestCount} pending request(s)
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowActiveRequests(false)}
          aria-label="Close active requests"
          className="rounded-lg px-3 py-2 text-gray-500 hover:bg-gray-100"
        >
          ✕
        </button>
      </div>

      <div className="overflow-y-auto p-5">
        {loadingRequests ? (
          <p className="py-8 text-center text-sm text-gray-500">
            Loading requests...
          </p>
        ) : requestError ? (
          <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {requestError}
          </p>
        ) : requests.length === 0 ? (
          <p className="py-8 text-center text-sm text-gray-500">
            There are no pending requests.
          </p>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <div
                key={request.id}
                className="rounded-[14px] border border-gray-200 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-[#1F2937]">
                      {request.serviceCategory || "Service request"}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                      Request #{request.id}
                    </p>
                  </div>

                  <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold capitalize text-amber-700">
                    {request.status}
                  </span>
                </div>

                <div className="mt-4 space-y-3 text-sm">
                  <div>
                    <p className="text-xs text-gray-500">Seeker ID</p>
                    <p className="font-medium text-gray-800">
                      {request.seekerId ?? request.seeker_id ?? "Unavailable"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Description</p>
                    <p className="whitespace-pre-wrap break-words text-gray-800">
                      {request.description || "No description provided"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Preferred service date and time
                    </p>
                    <p className="font-medium text-gray-800">
                      {formatServiceDateTime(
                        request.serviceDateTime ?? request.service_date_time
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Submitted</p>
                    <p className="text-gray-800">
                      {request.createdAt || request.created_at
                        ? new Date(
                            request.createdAt ?? request.created_at
                          ).toLocaleString("en-GB")
                        : "Unavailable"}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex gap-3">
                  <button
                    type="button"
                    onClick={() => handleDecline(request)}
                    className="h-[42px] flex-1 rounded-lg border border-gray-300 text-sm font-semibold text-gray-600"
                  >
                    Decline
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAccept(request)}
                    className="h-[42px] flex-1 rounded-lg bg-[#008000] text-sm font-semibold text-white"
                  >
                    Accept
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
)}

       
       
       {/* =====================================================
    BOTTOM NAVIGATION
===================================================== */}
 <div
    className="
      absolute
      bottom-[28px]
      left-0
      flex
      h-[70px]
      w-full
      items-center
      justify-center
      bg-white
      px-4
      gap-7
    "
  >

  <div className="flex w-full items-center justify-around px-4 py-3">

    {/* HOME */}
    <button
      type="button"
      onClick={() => navigate("/dashboardprov")}
      className="flex h-[46px] w-[32px] flex-col items-center gap-3"
    >
      <Home
        size={24}
        className="text-[#008000]"
        fill="#008000"
      />

      <span className="text-[11px] font-bold leading-[13px] text-[#008000]">
        Home
      </span>
    </button>


    {/* REQUESTS */}
    <button
      type="button"
      onClick={() => navigate("/servicereq")}
      className="relative flex h-[46px] w-[51px] flex-col items-center gap-2"
    >
      <div className="relative">
        <ClipboardList
          size={24}
          className="text-[#9CA3AF]"
        />

        {/* Notification Badge */}
        <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#EF4444] text-[10px] font-bold italic text-white">
          3
        </span>
      </div>

      <span className="text-[11px] font-bold leading-[13px] text-[#9CA3AF]">
        Requests
      </span>
    </button>


    {/* MESSAGES */}
    <button
      type="button"
      onClick={() => navigate("/message")}
      className="relative flex h-[46px] w-[56px] flex-col items-center gap-2"
    >
      <div className="relative">
        <MessageCircle
          size={24}
          className="text-[#9CA3AF]"
        />

        {/* Notification Badge */}
        <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#EF4444] text-[10px] font-bold italic text-white">
          2
        </span>
      </div>

      <span className="text-[11px] font-bold leading-[13px] text-[#9CA3AF]">
        Messages
      </span>
    </button>

{/* PROFILE */}
    <button
      type="button"
      onClick={() => navigate("/realprofile")}
      className="flex h-[46px] w-[35px] flex-col items-center gap-[9px]"
    >
      <User
        size={24}
        className="text-[#9CA3AF]"
      />

      <span className="text-[11px] font-bold leading-[13px] text-[#9CA3AF]">
        Profile
      </span>
    </button>

  </div>
</div>


      

    </div>
  );
}


/* ============================================================
   QUICK ACTION COMPONENT
============================================================ */
function QuickAction({ icon, title, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[109px] flex-col items-center justify-center gap-3 rounded-lg bg-white p-4 transition hover:bg-[#F9FAFB] active:scale-[0.98]"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D1FAE5] text-[#008000]">
        {icon}
      </div>

      <span className="text-[14px] font-bold text-[#1F2937]">
        {title}
      </span>
    </button>
  );
}


/* ============================================================
   PERFORMANCE COMPONENT
============================================================ */
function Performance({
  icon,
  value,
  label,
  yellow = false,
}) {
  return (
    <div className="flex h-[117px] flex-col items-center justify-center gap-2 bg-white p-4">

      <div className="flex h-6 items-center justify-center text-[#008000]">
        {icon}
      </div>

      <p
        className={`text-center text-[18px] font-bold ${
          yellow ? "text-[#FBBF24]" : "text-[#008000]"
        }`}
      >
        {value}
      </p>

      <p className="text-center text-[12px] text-[#6B7280]">
        {label}
      </p>

    </div>
  );
}


/* ============================================================
   ACTIVITY COMPONENT
============================================================ */
function Activity({ text, time }) {
  return (
    <div className="flex min-h-[40px] flex-col gap-1">
      <p className="text-[14px] text-[#4B5563]">
        {text}
      </p>

      <p className="text-[12px] text-[#9CA3AF]">
        {time}
      </p>
    </div>
  );
}


export default DashboardProv;