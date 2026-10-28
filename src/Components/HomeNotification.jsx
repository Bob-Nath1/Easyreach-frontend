import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  MoreVertical,
  MessageCircle,
  Users,
  CalendarClock,
  Bell,
  AlertCircle,
  Tag,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function HomeNotification() {
  const navigate = useNavigate();

  // =========================================================
  // STATE
  // =========================================================

  const [activeTab, setActiveTab] = useState("All");
  const [activeFilter, setActiveFilter] = useState("All");

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const filters = [
    "All",
    "Messages",
    "Bookings",
    "Offers",
    "Requests",
  ];

  // =========================================================
  // FETCH NOTIFICATIONS
  // =========================================================

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Authentication required.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/notifications",
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
            data.message || "Failed to fetch notifications"
          );
        }

        setNotifications(data.notifications || []);
      } catch (error) {
        console.error(
          "Fetch notifications error:",
          error
        );

        setError(
          error.message ||
            "Unable to load notifications."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // =========================================================
  // FILTER NOTIFICATIONS
  // =========================================================

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      // -------------------------------------------------------
      // TAB FILTER
      // -------------------------------------------------------

      // Unread
      if (
        activeTab === "Unread" &&
        notification.isRead
      ) {
        return false;
      }


      // -------------------------------------------------------
      // CATEGORY FILTER
      // -------------------------------------------------------

      if (activeFilter === "Messages") {
        return notification.type === "message";
      }

      if (activeFilter === "Bookings") {
        return (
          notification.type === "booking" ||
          notification.type === "confirmed"
        );
      }

      if (activeFilter === "Offers") {
        return notification.type === "offer";
      }

      if (activeFilter === "Requests") {
        return (
          notification.type === "request" ||
          notification.type === "service_request"
        );
      }

      return true;
    });
  }, [
    notifications,
    activeTab,
    activeFilter,
  ]);

  // =========================================================
  // GROUP NOTIFICATIONS BY DATE
  // =========================================================

  const groupedNotifications = useMemo(() => {
    const today = [];
    const yesterday = [];
    const week = [];
    const older = [];

    const now = new Date();

    filteredNotifications.forEach((notification) => {
      if (!notification.createdAt) {
        older.push(notification);
        return;
      }

      const notificationDate = new Date(
        notification.createdAt
      );

      if (Number.isNaN(notificationDate.getTime())) {
        older.push(notification);
        return;
      }

      const startOfToday = new Date(now);
      startOfToday.setHours(0, 0, 0, 0);

      const startOfYesterday = new Date(
        startOfToday
      );
      startOfYesterday.setDate(
        startOfYesterday.getDate() - 1
      );

      const sevenDaysAgo = new Date(startOfToday);
      sevenDaysAgo.setDate(
        sevenDaysAgo.getDate() - 7
      );

      if (notificationDate >= startOfToday) {
        today.push(notification);
      } else if (
        notificationDate >= startOfYesterday
      ) {
        yesterday.push(notification);
      } else if (
        notificationDate >= sevenDaysAgo
      ) {
        week.push(notification);
      } else {
        older.push(notification);
      }
    });

    return {
      today,
      yesterday,
      week,
      older,
    };
  }, [filteredNotifications]);

  // =========================================================
  // GET NOTIFICATION ICON
  // =========================================================

  const getIcon = (type) => {
    switch (type) {

      case "providers":
        return <Users size={20} />;

      case "booking":
        return <CalendarClock size={20} />;

      case "confirmed":
        return <Bell size={20} />;

      case "request":
      case "service_request":
        return <Bell size={20} />;

      case "offer":
        return <Tag size={20} />;
        
      case "review":
        return <AlertCircle size={20} />

      default:
        return <Bell size={20} />;
    }
  };

  // =========================================================
  // GET NOTIFICATION ICON STYLE
  // =========================================================

  const getIconStyle = (type) => {
    switch (type) {
      case "message":
        return "bg-emerald-100 text-green-700";

      case "providers":
        return "bg-amber-500 text-white";

      case "booking":
        return "bg-blue-500 text-white";

      case "confirmed":
        return "bg-green-100 text-green-700";

      case "request":
      case "service_request":
        return "bg-green-100 text-green-700";

      case "offer":
        return "bg-yellow-400 text-white";

      case "review":
        return "bg-red-500 text-white";


      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // =========================================================
  // NOTIFICATION CARD
  // =========================================================

  const NotificationCard = ({ item }) => {
    // -------------------------------------------------------
    // FORMAT NOTIFICATION TIME
    // -------------------------------------------------------

    const formatNotificationTime = (dateValue) => {
      if (!dateValue) {
        return "";
      }

      const date = new Date(dateValue);

      if (Number.isNaN(date.getTime())) {
        return "";
      }

      const now = new Date();

      const difference =
        now.getTime() - date.getTime();

      // Future date protection
      if (difference < 0) {
        return "Just now";
      }

      const minutes = Math.floor(
        difference / (1000 * 60)
      );

      const hours = Math.floor(
        difference / (1000 * 60 * 60)
      );

      const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
      );

      if (minutes < 1) {
        return "Just now";
      }

      if (minutes < 60) {
        return `${minutes}m ago`;
      }

      if (hours < 24) {
        return `${hours}h ago`;
      }

      if (days === 1) {
        return "Yesterday";
      }

      if (days < 7) {
        return `${days}d ago`;
      }

      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    };

    // -------------------------------------------------------
    // MARK AS READ
    // -------------------------------------------------------

    const markAsRead = async () => {
      if (item.isRead) {
        return;
      }

      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/notifications/${item.id}/read`,
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
            data.message ||
              "Failed to mark notification as read"
          );
        }

        // Update the notification locally
        setNotifications(
          (currentNotifications) =>
            currentNotifications.map(
              (notification) =>
                notification.id === item.id
                  ? {
                      ...notification,
                      isRead: true,
                    }
                  : notification
            )
        );
      } catch (error) {
        console.error(
          "Mark notification as read error:",
          error
        );
      }
    };

    return (
      <button
        type="button"
        onClick={markAsRead}
        className={`w-full rounded-lg bg-white px-3.5 py-2 flex items-start gap-3 text-left ${
          !item.isRead ? "" : "opacity-60"
        }`}
      >
        {/* Icon area */}
        <div className="flex items-start gap-1 shrink-0">
          {!item.isRead && (
            <span className="mt-2 h-2 w-2 rounded-full bg-[#008000]" />
          )}

          <div
            className={`h-10 w-10 rounded-full flex items-center justify-center ${getIconStyle(
              item.type
            )}`}
          >
            {getIcon(item.type)}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p
              className={`text-sm leading-[17px] ${
                !item.isRead
                  ? "font-bold italic text-[#008000]"
                  : "font-normal text-gray-600"
              }`}
            >
              {item.title}
            </p>

            <span className="text-[10px] text-gray-400 whitespace-nowrap">
              {formatNotificationTime(
                item.createdAt
              )}
            </span>
          </div>

          <p className="mt-2 text-xs leading-4 text-gray-500">
            {item.message}
          </p>
        </div>
      </button>
    );
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
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
        bg-[#F9FAFB]
        shadow-xl
        mx-auto
      "
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          absolute
          top-[62px]
          left-0
          h-[56px]
          w-full
          bg-white
          border
          border-gray-200
        "
      >
        {/* Back button */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="
            absolute
            left-[24px]
            top-1/2
            -translate-y-1/2
            rounded-full
            p-1
            hover:bg-gray-100
          "
        >
          <ArrowLeft size={24} />
        </button>

        {/* Title */}
        <h1
          className="
            absolute
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2
            whitespace-nowrap
            text-xl
            font-bold
            text-gray-800
          "
        >
          Notifications
        </h1>

        {/* More button */}
        <button
          type="button"
          className="
            absolute
            right-[24px]
            top-1/2
            -translate-y-1/2
            p-1
          "
        >
          <MoreVertical size={20} />
        </button>
      </div>

      {/* =====================================================
          TABS
      ===================================================== */}

      <div
        className="
          absolute
          top-[117px]
          left-0
          right-0
          h-[49px]
          bg-white
          border
          border-gray-200
          flex
        "
      >
        {["All", "Unread"].map(
          (tab) => (
            <button
              type="button"
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative flex-1 text-sm font-semibold ${
                activeTab === tab
                  ? "text-[#008000]"
                  : "text-gray-500"
              }`}
            >
              {tab}

              {/* Dynamic unread count */}
              {tab === "Unread" &&
                notifications.filter(
                  (notification) =>
                    !notification.isRead
                ).length > 0 && (
                  <span
                    className="
                      absolute
                      top-2
                      left-1/2
                      ml-[15px]
                      flex
                      h-[18px]
                      min-w-[18px]
                      items-center
                      justify-center
                      rounded-full
                      bg-[#008000]
                      px-1
                      text-[11px]
                      font-bold
                      italic
                      text-white
                    "
                  >
                    {notifications.filter(
                      (notification) =>
                        !notification.isRead
                    ).length > 99
                      ? "99+"
                      : notifications.filter(
                          (notification) =>
                            !notification.isRead
                        ).length}
                  </span>
                )}
            </button>
          )
        )}
      </div>

      {/* =====================================================
          GREEN TAB UNDERLINE
      ===================================================== */}

      <div
  className={`
    absolute
    top-[165px]
    h-[2px]
    w-1/2
    bg-[#008000]
    transition-all
    ${
      activeTab === "All"
        ? "left-0"
        : "left-1/2"
    }
  `}
/>

      {/* =====================================================
          FILTERS
      ===================================================== */}

      <div
        className="
          absolute
          top-[166px]
          left-0
          right-0
          h-[68px]
          bg-white
          border
          border-gray-200
          flex
          items-center
          gap-2
          px-6
          overflow-x-auto
          scrollbar-hide
        "
      >
        {filters.map((filter) => (
          <button
            type="button"
            key={filter}
            onClick={() =>
              setActiveFilter(filter)
            }
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold border ${
              activeFilter === filter
                ? "bg-emerald-100 border-[#008000] text-[#008000]"
                : "bg-gray-100 border-gray-100 text-gray-500"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* =====================================================
          TODAY HEADER
      ===================================================== */}

      <div
        className="
          absolute
          top-[234px]
          left-0
          right-0
          h-[35px]
          flex
          items-center
          px-6
          bg-white
          border
          border-gray-200
        "
      >
        <span className="text-xs font-bold italic text-gray-500">
          TODAY
        </span>
      </div>

      {/* =====================================================
          NOTIFICATION LIST
      ===================================================== */}

      <div
        className="
          absolute
          top-[284px]
          left-6
          right-6
          bottom-8
          overflow-y-auto
          pr-1
          scrollbar-hide
        "
      >
        {loading ? (
          // ---------------------------------------------------
          // LOADING
          // ---------------------------------------------------

          <div className="flex h-[200px] items-center justify-center">
            <p className="text-xs text-gray-400">
              Loading notifications...
            </p>
          </div>
        ) : error ? (
          // ---------------------------------------------------
          // ERROR
          // ---------------------------------------------------

          <div className="flex h-[200px] items-center justify-center px-4">
            <p className="text-center text-xs text-red-500">
              {error}
            </p>
          </div>
        ) : filteredNotifications.length === 0 ? (
          // ---------------------------------------------------
          // EMPTY
          // ---------------------------------------------------

          <div className="flex h-[200px] items-center justify-center">
            <p className="text-xs text-gray-400">
              No notifications
            </p>
          </div>
        ) : (
          // ---------------------------------------------------
          // NOTIFICATIONS
          // ---------------------------------------------------

          <div className="space-y-3">
            {/* TODAY */}
            {groupedNotifications.today.length >
              0 && (
              <div>
                <p className="mb-3 text-xs font-bold italic text-gray-500">
                  TODAY
                </p>

                <div className="space-y-3">
                  {groupedNotifications.today.map(
                    (notification) => (
                      <NotificationCard
                        key={notification.id}
                        item={notification}
                      />
                    )
                  )}
                </div>
              </div>
            )}

            {/* YESTERDAY */}
            {groupedNotifications.yesterday
              .length > 0 && (
              <div className="mt-4">
                <p className="mb-3 text-xs font-bold italic text-gray-500">
                  YESTERDAY
                </p>

                <div className="space-y-3">
                  {groupedNotifications.yesterday.map(
                    (notification) => (
                      <NotificationCard
                        key={notification.id}
                        item={notification}
                      />
                    )
                  )}
                </div>
              </div>
            )}

            {/* THIS WEEK */}
            {groupedNotifications.week.length >
              0 && (
              <div className="mt-4">
                <p className="mb-3 text-xs font-bold italic text-gray-500">
                  THIS WEEK
                </p>

                <div className="space-y-3">
                  {groupedNotifications.week.map(
                    (notification) => (
                      <NotificationCard
                        key={notification.id}
                        item={notification}
                      />
                    )
                  )}
                </div>
              </div>
            )}

            {/* OLDER */}
            {groupedNotifications.older.length >
              0 && (
              <div className="mt-4">
                <p className="mb-3 text-xs font-bold italic text-gray-500">
                  OLDER
                </p>

                <div className="space-y-3">
                  {groupedNotifications.older.map(
                    (notification) => (
                      <NotificationCard
                        key={notification.id}
                        item={notification}
                      />
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* =====================================================
          HOME INDICATOR
      ===================================================== */}

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          h-6
          bg-transparent
          flex
          justify-center
          items-center
        "
      >
        <div className="w-[108px] h-1 rounded-full bg-black" />
      </div>
    </div>
  );
}

export default HomeNotification;