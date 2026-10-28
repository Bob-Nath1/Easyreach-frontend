
import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  MoreVertical,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Message() {
  const navigate = useNavigate();

  useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  const [activeView, setActiveView] = useState("All");
  const [showMenu, setShowMenu] = useState(false);

  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = "http://localhost:5000";

  // ================= FETCH CONVERSATIONS =================
  useEffect(() => {
  let isMounted = true;

  const fetchConversations = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      if (isMounted) {
        setError("Authentication required.");
        setLoading(false);
      }
      return;
    }

    try {
      if (isMounted) {
        setLoading(true);
        setError("");
      }

      const response = await fetch(
        `${API_URL}/api/messages`,
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
          data.message || "Failed to fetch conversations"
        );
      }

      if (isMounted) {
        setConversations(data.conversations || []);
      }
    } catch (error) {
      console.error("Fetch conversations error:", error);

      if (isMounted) {
        setError(
          error.message ||
            "Unable to load your messages."
        );
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  };

  fetchConversations();

  return () => {
    isMounted = false;
  };
}, []);
  // ================= FORMAT TIME =================
  const formatMessageTime = (dateValue) => {
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

  // ================= SPLIT CONVERSATIONS =================
  const activeMessages = conversations.filter(
    (conversation) =>
      !conversation.is_archived
  );

  const archivedMessages = conversations.filter(
    (conversation) =>
      conversation.is_archived
  );

  // ================= UNREAD COUNT =================
  const unreadMessages = activeMessages.filter(
    (conversation) =>
      Number(conversation.unread_count || 0) > 0
  );

  const totalUnread = unreadMessages.reduce(
    (total, conversation) =>
      total +
      Number(conversation.unread_count || 0),
    0
  );

  // ================= OPEN CONVERSATION =================
  const handleOpenConversation = (
    conversation
  ) => {
    navigate("/chatspace", {
      state: {
        conversationId: conversation.id,
        participant: {
          id: conversation.other_user_id,
          name: conversation.other_user_name,
          image: conversation.other_user_image,
          role: conversation.other_user_role,
        },
      },
    });
  };

  // ================= CHANGE VIEW =================
  const handleViewChange = (view) => {
    setActiveView(view);
    setShowMenu(false);
  };

  // ================= DISPLAY ACTIVE LIST =================
 const displayedMessages = conversations.filter((conversation) => {
  if (activeView === "Unread") {
    return !conversation.is_archived && Number(conversation.unread_count) > 0;
  }

  if (activeView === "Archived") {
    return conversation.is_archived;
  }

  return !conversation.is_archived;
});

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
        bg-white
        font-[Inter,sans-serif]
      "
    >

      {/* ================= HEADER ================= */}
      <div className="absolute left-6 right-6 top-[64px] flex h-10 items-center justify-between">
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex h-6 w-6 items-center justify-center"
          >
            <ArrowLeft
              size={24}
              strokeWidth={2}
              className="text-gray-800"
            />
          </button>

          <h1 className="text-[20px] font-bold leading-6 text-gray-800">
            Messages
          </h1>
        </div>

        {/* ================= MORE MENU ================= */}
        <div className="relative">
          <button
            type="button"
            onClick={() =>
              setShowMenu((previous) => !previous)
            }
            aria-label="Message options"
            aria-expanded={showMenu}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-lg
              bg-gray-50
            "
          >
            <MoreVertical
              size={18}
              className="text-gray-700"
            />
          </button>

          {showMenu && (
            <div
              className="
                absolute
                right-0
                top-[46px]
                z-50
                w-[150px]
                overflow-hidden
                rounded-lg
                border
                border-gray-200
                bg-white
                shadow-lg
              "
            >
            <button
  type="button"
  onClick={() =>
    handleViewChange("Unread")
  }
  className={`
    flex
    w-full
    items-center
    justify-between
    px-4
    py-3
    text-left
    text-[13px]
    font-medium
    ${
      activeView === "Unread"
        ? "bg-green-50 text-[#008000]"
        : "text-gray-700"
    }
  `}
>
                <span>Unread</span>

                  {totalUnread > 0 && (
    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#008000] px-1 text-[10px] font-bold text-white">
      {totalUnread > 99
        ? "99+"
        : totalUnread}
    </span>
  )}
</button>

<button
  type="button"
  onClick={() =>
    handleViewChange("Archived")
  }
  className={`
    w-full
    border-t
    border-gray-100
    px-4
    py-3
    text-left
    text-[13px]
    font-medium
    ${
      activeView === "Archived"
        ? "bg-green-50 text-[#008000]"
        : "text-gray-700"
    }
  `}
>
  Archived
</button>

              <button
                type="button"
                onClick={() =>
                  handleViewChange("All")
                }
                className={`
                  w-full
                  border-t
                  border-gray-100
                  px-4
                  py-3
                  text-left
                  text-[13px]
                  font-medium
                  ${
                    activeView === "All"
                      ? "text-[#008000]"
                      : "text-gray-700"
                  }
                `}
              >
                All
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ================= TOP TAB ================= */}
      <div
        className="
          absolute
          left-1/2
          top-[117px]
          flex
          h-[49px]
          w-[calc(100%-48px)]
          -translate-x-1/2
          items-center
          justify-center
          border
          border-gray-200
          bg-white
        "
      >
       <span className="text-[14px] font-semibold text-[#008000]">
  All
</span>

        {/* Unread badge */}
        {activeView === "All" &&
          totalUnread > 0 && (
            <span className="ml-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#008000] px-1 text-[10px] font-bold italic text-white">
              {totalUnread > 99
                ? "99+"
                : totalUnread}
            </span>
          )}
      </div>

      {/* ================= MESSAGE LIST ================= */}
      <div
        className="
          absolute
          left-6
          right-6
          top-[190px]
          bottom-[24px]
          overflow-y-auto
          pr-1
          scrollbar-thin
          scrollbar-thumb-gray-300
        "
      >

        {/* ================= LOADING ================= */}
        {loading && (
          <div className="flex min-h-[200px] items-center justify-center">
            <p className="text-[14px] font-medium text-gray-500">
              Loading messages...
            </p>
          </div>
        )}

        {/* ================= ERROR ================= */}
        {!loading && error && (
          <div className="flex min-h-[200px] items-center justify-center px-6 text-center">
            <p className="text-[14px] font-medium text-red-500">
              {error}
            </p>
          </div>
        )}

        {/* ================= CONTENT ================= */}
        {!loading && !error && (
          <div className="flex flex-col gap-1">

            {displayedMessages.length === 0 ? (
 <div className="flex min-h-[200px] items-center justify-center">
    <p className="text-[13px] text-gray-400">
      {activeView === "Unread"
        ? "No unread messages"
        : activeView === "Archived"
        ? "No archived messages"
        : "No messages"}
    </p>
  </div>
) : (
  displayedMessages.map((conversation) => (
    <button
      key={conversation.id}
      type="button"
      onClick={() =>
        navigate("/chatspace", {
          state: {
            conversationId: conversation.id,
            participant: {
              id: conversation.other_user_id,
              name: conversation.other_user_name,
              image: conversation.other_user_image,
              role: conversation.other_user_role,
            },
          },
        })
      }
      className="flex w-full items-center gap-3 border-b border-gray-100 py-4 text-left"
    >
      <img
        src={
          conversation.other_user_image ||
          "/default-avatar.png"
        }
        alt={conversation.other_user_name}
        className="h-12 w-12 rounded-full object-cover"
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <h3 className="truncate text-[14px] font-semibold text-gray-900">
            {conversation.other_user_name}
          </h3>

          {conversation.last_message_time && (
            <span className="ml-2 text-[10px] text-gray-400">
              {new Date(
                conversation.last_message_time
              ).toLocaleDateString()}
            </span>
          )}
        </div>

        <p className="mt-1 truncate text-[12px] text-gray-500">
          {conversation.last_message || "No messages yet"}
        </p>
      </div>

      {Number(conversation.unread_count) > 0 && (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#008000] px-1.5 text-[10px] font-bold text-white">
          {conversation.unread_count}
        </span>
      )}
    </button>
  ))
)}

            
            {/* ================= NO ACTIVE MESSAGES ================= */}
            

            {/* ================= ARCHIVED SECTION ================= */}
            
            {/* ================= ARCHIVED VIEW ================= */}
            
          </div>
        )}
      </div>

      {/* ================= BOTTOM IPHONE HANDLE ================= */}
      <div className="absolute bottom-0 left-0 z-50 flex h-6 w-full items-center justify-center bg-white">
        <div className="h-1 w-[108px] rounded-full bg-gray-800" />
      </div>

    </div>
  );
}

export default Message;
