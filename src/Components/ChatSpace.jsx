import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Phone,
  MoreVertical,
  Send,
  MapPin,
  FileText,
  CalendarDays,
  Navigation,
  CheckCheck,
} from "lucide-react";

function ChatSpace() {
const location = useLocation();
const navigate = useNavigate();

useEffect(() => {
  window.scrollTo(0, 0);
}, []);

const provider =
  location.state?.provider ||
  location.state?.participant;

const request = location.state?.request;

const existingConversationId =
  location.state?.conversationId;

  const providerImage =
  provider?.profile_image ||
  provider?.profileImage ||
  provider?.image ||
  null;

const providerName =
  provider?.full_name ||
  provider?.fullName ||
  provider?.name ||
  "Provider";

  const [message, setMessage] = useState("");
const [conversationId, setConversationId] = useState(null);
const [loadingConversation, setLoadingConversation] = useState(true);

const [messages, setMessages] = useState([]);
const [loadingMessages, setLoadingMessages] = useState(true);

useEffect(() => {

  if (existingConversationId) {
  setConversationId(existingConversationId);
  setLoadingConversation(false);
  return;
}
  const createOrGetConversation = async () => {

    const token = localStorage.getItem("token");

    if (!token || !provider?.id) {
      setLoadingConversation(false);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/messages/conversations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            participantId: provider.id,
            serviceRequestId: request?.id || null,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(
          "Failed to create/get conversation:",
          data.message
        );
        return;
      }

      setConversationId(data.conversation.id);
    } catch (error) {
      console.error("Conversation error:", error);
    } finally {
      setLoadingConversation(false);
    }
  };

  createOrGetConversation();
}, [provider, request, existingConversationId]);

useEffect(() => {
  const fetchMessages = async () => {
    if (!conversationId) {
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setLoadingMessages(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/messages/${conversationId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(
          "Failed to fetch messages:",
          data.message
        );
        return;
      }

      setMessages(data.messages || []);
    } catch (error) {
      console.error("Messages fetch error:", error);
    } finally {
      setLoadingMessages(false);
    }
  };

  fetchMessages();
}, [conversationId]);

useEffect(() => {
  const markMessagesAsRead = async () => {
    if (!conversationId) {
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/messages/${conversationId}/read`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        console.error(
          "Failed to mark messages as read:",
          data.message
        );
      }
    } catch (error) {
      console.error("Mark messages as read error:", error);
    }
  };

  markMessagesAsRead();
}, [conversationId]);

const handleSend = async () => {
  if (!message.trim() || !conversationId) return;

  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Authentication required");
    return;
  }

  const text = message.trim();

  try {
    const response = await fetch(
      `http://localhost:5000/api/messages/${conversationId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: text,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Failed to send message:", data.message);
      return;
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        ...data.data,
        sender_id: data.data.senderId,
        message: data.data.message,
        created_at: data.data.createdAt,
      },
    ]);

    setMessage("");
  } catch (error) {
    console.error("Send message error:", error);
  }
};

  return (
    <div
  className="
    mx-auto
    flex
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
    flex-col
    overflow-hidden
    rounded-[35px]
    bg-white
    shadow-lg
  "
>
      
      {/* ================= CHAT HEADER ================= */}
      <div className="flex h-[60px] shrink-0 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={24} strokeWidth={2} />
          </button>

          {/* Profile */}
          <div className="flex items-center gap-3">
            <div className="relative">
  <div className="flex h-[50px] w-[50px] items-center justify-center overflow-hidden rounded-[15px] bg-gray-200">
  {providerImage ? (
  <img
    src={providerImage}
    alt={providerName}
    className="h-full w-full object-cover"
  />
) : (
      <span className="text-lg font-bold text-gray-500">
        {providerName
  .split(" ")
  .map((name) => name[0])
  .join("")
  .slice(0, 2)
  .toUpperCase()}
      </span>
    )}
  </div>

  <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#008000]" />
</div>

            <div>
             <h2 className="text-[16px] font-bold leading-[19px] text-gray-800">
  {providerName}
</h2>

              <p className="mt-1 text-[13px] text-[#008000]">
                Online
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <button type="button">
            <Phone size={19} strokeWidth={1.8} />
          </button>

          <button type="button">
            <MoreVertical size={21} strokeWidth={1.8} />
          </button>
        </div>
      </div>

      {/* ================= CHAT AREA ================= */}
      <div className="flex-1 overflow-y-auto bg-[#F3F4F6] px-6 pb-8">
        {/* TODAY */}
        <div className="flex justify-center pt-8">
          <span className="rounded-full bg-[#E5E7EA] px-4 py-1.5 text-[12px] font-bold italic text-gray-500">
            Today
          </span>
        </div>

        <div className="mt-10 space-y-7">
          {messages.map((item) => {
            /* ================= QUOTE ================= */
            if (item.type === "quote") {
              return (
                <div
                  key={item.id}
                  className="w-[254px] rounded-[15px] border-[1.5px] border-[#008000] bg-white p-4"
                >
                  {/* Quote heading */}
                  <div className="flex items-center gap-4">
                    <FileText
                      size={17}
                      className="text-[#008000]"
                      strokeWidth={1.7}
                    />

                    <h3 className="text-[16px] font-bold italic text-gray-800">
                      Service Quote
                    </h3>
                  </div>

                  {/* Quote details */}
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between gap-3 text-[14px]">
                      <span className="text-gray-500">Service</span>
                      <span className="text-right font-bold italic text-gray-800">
                        AC Repair & Gas Refill
                      </span>
                    </div>

                    <div className="flex justify-between text-[14px]">
                      <span className="text-gray-500">Time</span>
                      <span className="font-bold italic text-gray-800">
                        1-2 hours
                      </span>
                    </div>

                    <div className="flex justify-between text-[14px]">
                      <span className="text-gray-500">Valid until</span>
                      <span className="font-bold italic text-gray-800">
                        Jan 20, 2025
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[14px] text-gray-500">
                        Price
                      </span>

                      <span className="text-[18px] font-bold italic text-[#008000]">
                        ₦1,500
                      </span>
                    </div>
                  </div>

                  {/* Accept button */}
                  <button
                    type="button"
                    className="mt-5 flex w-full items-center justify-center rounded-lg bg-[#008000] px-3 py-3 text-[16px] font-medium text-white transition hover:bg-green-700"
                  >
                    Accept Quote
                  </button>
                </div>
              );
            }

            /* ================= LOCATION ================= */
            if (item.type === "location") {
              return (
                <div
                  key={item.id}
                  className="w-[280px] overflow-hidden rounded-[15px] bg-white"
                >
                  {/* Map */}
                  <div className="relative h-[120px] overflow-hidden bg-[#dcebdc]">
                    {/* Fake map background */}
                    <div className="absolute inset-0 opacity-70">
                      <div className="absolute left-[-20px] top-10 h-2 w-[340px] rotate-[12deg] bg-white" />
                      <div className="absolute left-[-30px] top-20 h-2 w-[350px] rotate-[-25deg] bg-white" />
                      <div className="absolute left-20 top-[-20px] h-[180px] w-2 rotate-[30deg] bg-white" />
                      <div className="absolute left-40 top-[-30px] h-[200px] w-2 rotate-[-15deg] bg-white" />
                    </div>

                    {/* Map marker */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <MapPin
                        size={28}
                        fill="#1DAEEF"
                        color="#008000"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>

                  {/* Location information */}
                  <div className="rounded-b-[15px] bg-white px-4 py-2">
                    <p className="text-[14px] leading-[17px] text-gray-800">
                      123 Allen Avenue, Ikeja, Lagos
                    </p>

                    <button
                      type="button"
                      className="mt-1 flex items-center gap-1 text-[14px] font-bold italic text-[#008000]"
                    >
                      View in maps
                      <Navigation size={15} strokeWidth={1.8} />
                    </button>
                  </div>
                </div>
              );
            }

           /* ================= PROVIDER MESSAGE ================= */
if (Number(item.sender_id) === Number(provider?.id)) {
  return (
    <div
      key={item.id}
      className="flex items-start gap-2"
    >
      <div className="mt-0.5 flex h-[30px] w-[30px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-200">
       {providerImage ? (
  <img
    src={providerImage}
    alt={providerName}
    className="h-full w-full object-cover"
  />
) : (
          <span className="text-[9px] font-bold text-gray-500">
           {providerName
  .split(" ")
  .map((name) => name[0])
  .join("")
  .slice(0, 2)
  .toUpperCase()}
  
          </span>
        )}
      </div>

      <div className="max-w-[300px]">
        <div className="rounded-lg bg-white px-2 py-2 pb-1">
          <p className="text-[14px] leading-5 text-gray-800">
            {item.message}
          </p>
        </div>

        <p className="ml-1 mt-1 text-[10px] leading-5 text-gray-400">
          {new Date(item.created_at).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}

            /* ================= USER MESSAGE ================= */
            return (
              <div
                key={item.id}
                className="ml-auto flex max-w-[245px] flex-col items-end"
              >
                <div className="w-full rounded-lg bg-[#008000] px-2 py-2 pb-1">
                  <p className="text-[14px] leading-5 text-white">
                    {item.message}
                  </p>
                </div>

                <div className="mt-0.5 flex items-center gap-2">
                  <span className="text-[10px] leading-5 text-gray-400">
                    {new Date(item.created_at).toLocaleTimeString([], {
  hour: "numeric",
  minute: "2-digit",
})}
                  </span>

                  <CheckCheck
                    size={14}
                    className="text-[#008000]"
                    strokeWidth={2}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= BOTTOM SECTION ================= */}
      <div className="shrink-0 bg-white">
        {/* Quick actions */}
        <div className="flex gap-2 overflow-x-auto px-6 pt-3 pb-2 scrollbar-hide">
          <button
            type="button"
            className="flex h-8 shrink-0 items-center gap-2 rounded-full bg-[#E5E7EB] px-3.5 text-[13px] font-bold italic text-gray-800"
          >
            <MapPin size={16} />
            Share Location
          </button>

          <button
            type="button"
            className="flex h-8 shrink-0 items-center gap-2 rounded-full bg-[#E5E7EB] px-3.5 text-[13px] font-bold italic text-gray-800"
          >
            <FileText size={16} />
            Request Quote
          </button>

          <button
            type="button"
            className="flex h-8 shrink-0 items-center gap-2 rounded-full bg-[#E5E7EB] px-3.5 text-[12px] font-bold italic text-gray-800"
          >
            <CalendarDays size={16} />
            Schedule
          </button>
        </div>

        {/* Message input */}
        <div className="flex items-center gap-2 px-6 pb-3 pt-1">
          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F3F4F6] text-gray-500"
          >
            <span className="text-xl">+</span>
          </button>

          <div className="flex h-10 flex-1 items-center rounded-full bg-[#F3F4F6] px-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
              placeholder="Type a message..."
              className="w-full bg-transparent text-[13px] text-gray-800 outline-none placeholder:text-gray-400"
            />
          </div>

          <button
            type="button"
            onClick={handleSend}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#008000] text-white transition hover:bg-green-700"
          >
            <Send size={17} />
          </button>
        </div>

        {/* iPhone home indicator */}
        <div className="flex h-6 items-center justify-center">
          <div className="h-1 w-[108px] rounded-full bg-gray-800" />
        </div>
      </div>
    </div>
  );
}

export default ChatSpace;