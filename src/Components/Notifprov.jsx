
import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000";

const DEFAULT_NOTIFICATIONS = {
  push: true,
  messages: true,
  providerResponses: true,
  bookingConfirmations: true,
  bookingReminders: true,
  specialOffers: true,
  appUpdates: true,
};

function Notifprov() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(
    DEFAULT_NOTIFICATIONS
  );

  const [unreadMessageCount, setUnreadMessageCount] = useState(0);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // ================= FETCH NOTIFICATION PREFERENCES =================
  useEffect(() => {
    const fetchNotificationPreferences = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        if (!token) {
          setError("Authentication required.");
          return;
        }

        const response = await fetch(
          `${API_URL}/api/provider-notification-preferences`,
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
            data.message ||
              "Failed to load notification preferences."
          );
        }

        if (data.preferences) {
          setNotifications({
            push: data.preferences.push,
            messages: data.preferences.messages,
            providerResponses:
              data.preferences.providerResponses,
            bookingConfirmations:
              data.preferences.bookingConfirmations,
            bookingReminders:
              data.preferences.bookingReminders,
            specialOffers:
              data.preferences.specialOffers,
            appUpdates:
              data.preferences.appUpdates,
          });
        }
      } catch (error) {
        console.error(
          "Fetch notification preferences error:",
          error
        );

        setError(
          error.message ||
            "Unable to load notification preferences."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNotificationPreferences();
  }, []);

  useEffect(() => {
  const fetchUnreadMessageCount = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const response = await fetch(
        `${API_URL}/api/messages/unread-count`,
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
          data.message ||
            "Failed to fetch unread message count"
        );
      }

      setUnreadMessageCount(
        Number(data.count || 0)
      );
    } catch (error) {
      console.error(
        "Fetch unread message count error:",
        error
      );
    }
  };

  fetchUnreadMessageCount();
}, []);

  // ================= UPDATE NOTIFICATION PREFERENCES =================
  const saveNotificationPreferences = async (
    updatedNotifications
  ) => {
    try {
      setSaving(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication required.");
      }

      const response = await fetch(
        `${API_URL}/api/provider-notification-preferences`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedNotifications),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update notification preferences."
        );
      }

      return true;
    } catch (error) {
      console.error(
        "Update notification preferences error:",
        error
      );

      setError(
        error.message ||
          "Unable to save notification preferences."
      );

      return false;
    } finally {
      setSaving(false);
    }
  };

  // ================= TOGGLE NOTIFICATION =================
  const toggleNotification = async (name) => {
    if (saving) {
      return;
    }

    const previousNotifications = notifications;

    const updatedNotifications = {
      ...notifications,
      [name]: !notifications[name],
    };

    setNotifications(updatedNotifications);

    const saved = await saveNotificationPreferences(
      updatedNotifications
    );

    if (!saved) {
      setNotifications(previousNotifications);
    }
  };

  // ================= RESET =================
  // ================= RESET =================
const handleReset = async () => {
  if (saving) {
    return;
  }

  const previousNotifications = notifications;

  setNotifications(DEFAULT_NOTIFICATIONS);

  const saved = await saveNotificationPreferences(
    DEFAULT_NOTIFICATIONS
  );

  if (!saved) {
    setNotifications(previousNotifications);
  }
};

// ================= OPEN NEW MESSAGES =================
const handleOpenNewMessages = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/chatspace");
      return;
    }

    // Get the provider's conversations first
    const conversationsResponse = await fetch(
      `${API_URL}/api/messages`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const conversationsData =
      await conversationsResponse.json();

    if (!conversationsResponse.ok) {
      throw new Error(
        conversationsData.message ||
          "Failed to load conversations"
      );
    }

    const conversations =
      conversationsData.conversations || [];

    // Find a conversation that currently has unread messages
    const unreadConversation =
      conversations.find(
        (conversation) =>
          Number(conversation.unread_count || 0) > 0
      );

    // Mark all unread messages as read
    await fetch(
      `${API_URL}/api/messages/mark-all-read`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Remove the count immediately
    setUnreadMessageCount(0);

    // If there is an unread conversation,
    // open that exact conversation
    if (unreadConversation) {
      navigate("/chatspace", {
        state: {
          provider: {
            id: unreadConversation.other_user_id,
            full_name:
              unreadConversation.other_user_name,
            profile_image:
              unreadConversation.other_user_image,
            role:
              unreadConversation.other_user_role,
          },
          conversationId:
            unreadConversation.id,
        },
      });

      return;
    }

    // Fallback if there is no unread conversation
    navigate("/chatspace");
  } catch (error) {
    console.error(
      "Open new messages error:",
      error
    );

    navigate("/chatspace");
  }
};
  return (
    <div className="min-h-screen w-full bg-gray-100 flex justify-center">
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
        <div className="absolute top-[62px] left-0 flex h-[56px] w-full items-center justify-between border-b border-[#E5E7EB] bg-white px-6">

          <div className="flex items-center gap-6">

            {/* Back Button */}
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex h-6 w-6 items-center justify-center"
            >
              <ArrowLeft
                size={24}
                className="text-black"
              />
            </button>

            {/* Title */}
            <h1 className="text-[20px] font-bold leading-6 text-[#1F2937]">
              Notifications Settings
            </h1>

          </div>

          {/* Reset */}
          <button
            type="button"
            onClick={handleReset}
            disabled={loading || saving}
            className={`text-[14px] font-bold italic text-[#008000] ${
              loading || saving
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            }`}
          >
            Reset
          </button>

        </div>

        {/* ================= CONTENT ================= */}
        <div
          className="
            absolute
            left-6
            right-6
            top-[134px]
            bottom-[24px]
            w-auto
            overflow-y-auto
            overflow-x-hidden
            pb-6
            scrollbar-hide
          "
        >

          {/* ================= LOADING ================= */}
          {loading && (
            <div className="flex min-h-[200px] items-center justify-center">
              <p className="text-[14px] font-medium text-[#6B7280]">
                Loading notification settings...
              </p>
            </div>
          )}

          {/* ================= ERROR ================= */}
          {!loading && error && (
            <div className="mb-4 rounded-lg bg-red-50 px-4 py-3">
              <p className="text-[12px] font-medium text-red-500">
                {error}
              </p>
            </div>
          )}

          {/* ================= SETTINGS ================= */}
          {!loading && (
            <>
              {/* ================= PUSH NOTIFICATIONS ================= */}
              <div className="relative flex h-[90px] items-center justify-between rounded-[15px] bg-[#F0FDF4] px-4">

                <div className="flex flex-col gap-[15px]">

                  <h2 className="text-[16px] font-bold italic text-[#1F2937]">
                    Push Notifications
                  </h2>

                  <p className="text-[12px] text-[#6B7280]">
                    Disable to stop all notifications except critical account alerts
                  </p>

                </div>

                <Toggle
                  enabled={notifications.push}
                  onClick={() =>
                    toggleNotification("push")
                  }
                  disabled={saving}
                />

              </div>

              {/* ================= MESSAGES ================= */}
              <div className="mt-[39px]">

                <p className="mb-[12px] text-[12px] font-bold text-[#6B7280]">
                  MESSAGES
                </p>

                <div
  role="button"
  tabIndex={0}
  onClick={handleOpenNewMessages}
  onKeyDown={(event) => {
    if (event.key === "Enter" || event.key === " ") {
      handleOpenNewMessages();
    }
  }}
  className="flex h-[56px] w-full cursor-pointer items-center justify-between rounded-lg bg-white px-4 transition hover:bg-gray-50"
>
  <span className="text-[14px] text-[#1F2937]">
    New Messages
  </span>

  {unreadMessageCount > 0 && (
    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#008000] px-1 text-[10px] font-bold text-white">
      {unreadMessageCount > 99
        ? "99+"
        : unreadMessageCount}
    </span>
  )}
</div>

              </div>

              {/* ================= DIVIDER ================= */}
              <div className="my-[16px] h-px w-full bg-[#E5E7EB]" />

              {/* ================= REQUESTS & BOOKINGS ================= */}
              <div>

                <p className="mb-[12px] text-[12px] font-bold text-[#6B7280]">
                  REQUESTS & BOOKINGS
                </p>

                <div className="flex flex-col gap-2">

                  <NotificationRow
                    title="Provider Responses"
                    enabled={
                      notifications.providerResponses
                    }
                    onClick={() =>
                      toggleNotification(
                        "providerResponses"
                      )
                    }
                    disabled={
                      !notifications.push || saving
                    }
                  />

                  <NotificationRow
                    title="Booking Confirmations"
                    enabled={
                      notifications.bookingConfirmations
                    }
                    onClick={() =>
                      toggleNotification(
                        "bookingConfirmations"
                      )
                    }
                    disabled={
                      !notifications.push || saving
                    }
                  />

                  <NotificationRow
                    title="Booking Reminders"
                    enabled={
                      notifications.bookingReminders
                    }
                    onClick={() =>
                      toggleNotification(
                        "bookingReminders"
                      )
                    }
                    disabled={
                      !notifications.push || saving
                    }
                  />

                </div>

              </div>

              {/* ================= DIVIDER ================= */}
              <div className="my-[16px] h-px w-full bg-[#E5E7EB]" />

                          </>
          )}

        </div>

        {/* ================= HOME INDICATOR ================= */}
        <div className="absolute bottom-0 left-0 z-50 flex h-6 w-full items-center justify-center bg-white">

          <div className="h-1 w-[108px] rounded-xl bg-[#1F2937]" />

        </div>

      </div>
    </div>
  );
}


/* =====================================================
   NOTIFICATION ROW COMPONENT
===================================================== */

function NotificationRow({
  title,
  enabled,
  onClick,
  disabled = false,
}) {
  return (
    <div
      className={`flex h-[56px] w-full items-center justify-between rounded-lg bg-white px-4 transition ${
        disabled ? "opacity-50" : ""
      }`}
    >

      <span className="text-[14px] text-[#1F2937]">
        {title}
      </span>

      <Toggle
        enabled={enabled}
        onClick={onClick}
        disabled={disabled}
      />

    </div>
  );
}


/* =====================================================
   TOGGLE COMPONENT
===================================================== */

function Toggle({
  enabled,
  onClick,
  disabled = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`relative h-[28px] w-[48px] rounded-full transition-all duration-300 ${
        enabled
          ? "bg-[#008000]"
          : "bg-[#D1D5DB]"
      } ${
        disabled
          ? "cursor-not-allowed"
          : "cursor-pointer"
      }`}
    >

      <span
        className={`absolute top-[2px] h-[24px] w-[24px] rounded-full bg-white shadow-md transition-all duration-300 ${
          enabled
            ? "left-[22px]"
            : "left-[2px]"
        }`}
      />

    </button>
  );
}


export default Notifprov;
