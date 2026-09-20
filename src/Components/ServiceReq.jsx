
import { useState } from "react";
import {
  ArrowLeft,
  Bell,
  MapPin,
  Clock,
  Wallet,
  User,
  CheckCircle2,
  AlertTriangle,
  MessageCircle,
  Eye,
  Loader2,
  XCircle,
} from "lucide-react";

const ServiceReq = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(false);

  const requests = [
    {
      id: 1,
      name: "John Daniels",
      service: "Auto Repair - Engine Check",
      initials: "JD",
      urgent: true,
      status: "NEW",
      category: "New",
      match: "Good match for you",
      matchType: "good",
      distance: "800m away",
      price: "₦15,000-₦25,000",
      time: "5 mins ago",
      description:
        "My car engine is overheating and making strange noises. Need immediate inspection and repair...",
      responded: "3 providers responded - Act fast!",
      avatarColor: "bg-blue-100 text-blue-700",
    },

    {
      id: 2,
      name: "David Lee",
      service: "Brake System Check",
      initials: "DL",
      status: "REPEAT CUSTOMER",
      category: "New",
      match: "You’ve worked with David before (2x, 5★)",
      matchType: "repeat",
      distance: "3.2km away",
      price: "₦10,000-₦15,000",
      time: "30 mins ago",
      description:
        "My brakes are making squeaking sounds. Need inspection and possible repair. You fixed my AC before!",
      avatarColor: "bg-purple-100 text-purple-700",
    },

    {
      id: 3,
      name: "Sarah K.",
      service: "Plumbing - Pipe Repair",
      initials: "SK",
      status: "FLEXIBLE",
      category: "New",
      distance: "2.3km away",
      price: "₦8,000-₦15,000",
      time: "1 hour ago",
      description:
        "Need bathroom pipe repair. Water leaking from under sink. Flexible on timing this week...",
      avatarColor: "bg-pink-100 text-pink-700",
    },

    {
      id: 4,
      name: "Tom Anderson",
      service: "AC Repair & Service",
      initials: "TA",
      status: "YOU RESPONDED",
      category: "Responded",
      distance: "1.5km away",
      price: "₦12,000-₦20,000",
      time: "2 hours ago",
      description:
        "My air conditioner is no longer cooling properly and needs inspection and servicing.",
      avatarColor: "bg-orange-100 text-orange-700",
      alreadyResponded: true,
    },

    {
      id: 5,
      name: "Chidi Mbah",
      service: "Electrical Wiring Repair",
      initials: "CM",
      status: "DECLINED",
      category: "Declined",
      distance: "4.5km away",
      price: "₦15,000-₦25,000",
      time: "3 hours ago",
      description:
        "Need an experienced electrician to inspect and repair faulty electrical wiring in my apartment.",
      avatarColor: "bg-red-100 text-red-700",
      declined: true,
    },

    {
      id: 6,
      name: "Oluwatobi Adeyemi",
      service: "Generator Repair & Maintenance",
      initials: "OA",
      status: "NEW",
      category: "New",
      distance: "2.8km away",
      price: "₦20,000-₦35,000",
      time: "4 hours ago",
      description:
        "My generator starts but stops after a few minutes. I need an experienced technician to inspect and repair it.",
      avatarColor: "bg-indigo-100 text-indigo-700",
    },

    {
      id: 7,
      name: "Mary Wilson",
      service: "Home Cleaning Service",
      initials: "MW",
      status: "FLEXIBLE",
      category: "New",
      distance: "3.6km away",
      price: "₦8,000-₦15,000",
      time: "5 hours ago",
      description:
        "Looking for a professional cleaner for a thorough cleaning of my apartment. Flexible with the date and time.",
      avatarColor: "bg-pink-100 text-pink-700",
    },

    {
      id: 8,
      name: "Michael Brown",
      service: "Laptop Repair",
      initials: "MB",
      status: "NEW",
      category: "New",
      distance: "1.8km away",
      price: "₦10,000-₦18,000",
      time: "6 hours ago",
      description:
        "My laptop is not turning on properly. I need a technician to diagnose and repair the problem.",
      avatarColor: "bg-cyan-100 text-cyan-700",
    },

    {
      id: 9,
      name: "Grace Johnson",
      service: "Painting Service",
      initials: "GJ",
      status: "NEW",
      category: "New",
      distance: "5.1km away",
      price: "₦25,000-₦45,000",
      time: "7 hours ago",
      description:
        "I need an experienced painter to repaint two rooms in my apartment.",
      avatarColor: "bg-yellow-100 text-yellow-700",
    },

    {
      id: 10,
      name: "Peter Okafor",
      service: "Phone Screen Repair",
      initials: "PO",
      status: "YOU RESPONDED",
      category: "Responded",
      distance: "2.1km away",
      price: "₦8,000-₦15,000",
      time: "Yesterday",
      description:
        "My phone screen is cracked and needs replacement as soon as possible.",
      avatarColor: "bg-teal-100 text-teal-700",
      alreadyResponded: true,
    },

    {
      id: 11,
      name: "Esther James",
      service: "Furniture Repair",
      initials: "EJ",
      status: "DECLINED",
      category: "Declined",
      distance: "6.2km away",
      price: "₦15,000-₦30,000",
      time: "Yesterday",
      description:
        "I need someone to repair a damaged wooden wardrobe.",
      avatarColor: "bg-rose-100 text-rose-700",
      declined: true,
    },

    {
      id: 12,
      name: "Samuel Ade",
      service: "Car Battery Replacement",
      initials: "SA",
      status: "NEW",
      category: "New",
      distance: "1.2km away",
      price: "₦18,000-₦30,000",
      time: "Yesterday",
      description:
        "My car battery keeps going flat and I need a replacement or proper inspection.",
      avatarColor: "bg-slate-100 text-slate-700",
    },
  ];

  const tabs = [
    {
      name: "All",
      count: requests.length,
    },
    {
      name: "New",
      count: requests.filter((request) => request.category === "New").length,
    },
    {
      name: "Responded",
      count: requests.filter(
        (request) => request.category === "Responded"
      ).length,
    },
    {
      name: "Declined",
      count: null,
    },
  ];

  const filteredRequests = requests.filter((request) => {
    if (activeTab === "All") return true;

    return request.category === activeTab;
  });

  const displayedRequests = filteredRequests.slice(0, visibleCount);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setVisibleCount(4);
  };

  const loadOlderRequests = () => {
    setLoading(true);

    setTimeout(() => {
      setVisibleCount((previous) => previous + 4);
      setLoading(false);
    }, 1000);
  };

  const hasMoreRequests =
    visibleCount < filteredRequests.length;

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
        
        {/* HEADER */}
<header className="absolute left-0 top-0 z-30 w-full bg-white">
          
          {/* Top Header */}
          <div className="flex h-14 items-center justify-between px-6">
            
            <div className="flex items-center gap-6">
              <button
                type="button"
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

              <span className="absolute -right-2 -top-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#008000] px-1 text-[10px] font-bold text-white">
                6
              </span>
            </div>
          </div>

          {/* TABS */}
          <div className="px-6 pb-4 pt-4">
            <div className="flex items-end justify-between">
              
              {tabs.map((tab) => {
                const isActive = activeTab === tab.name;

                return (
                  <button
                    key={tab.name}
                    type="button"
                    onClick={() => handleTabChange(tab.name)}
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

        {/* REQUEST LIST */}
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
          
          {displayedRequests.map((request) => (
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
                    <div
                      className={`flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full text-sm font-bold ${request.avatarColor}`}
                    >
                      {request.initials}
                    </div>

                    {/* Name + Status */}
                    <div className="flex flex-col gap-2">
                      
                      <div className="flex flex-col gap-1">
                        <h2 className="text-base font-bold leading-[19px] text-[#1F2937]">
                          {request.name}
                        </h2>

                        <p className="text-sm leading-[17px] text-[#6B7280]">
                          {request.service}
                        </p>
                      </div>

                      {/* BADGES */}
                      <div className="flex flex-wrap items-center gap-2">
                        
                        {request.urgent && (
                          <span className="flex items-center gap-1 rounded-full bg-[#F59E0B] px-[7px] py-[6px] text-[10px] font-bold leading-3 text-white">
                            <AlertTriangle size={11} />
                            URGENT
                          </span>
                        )}

                        {request.status && (
                          <span
                            className={`rounded-full px-[7px] py-[6px] text-[10px] font-bold leading-3 ${
                              request.status === "NEW"
                                ? "bg-[#008000] text-white"
                                : request.status === "DECLINED"
                                ? "bg-red-100 text-red-600"
                                : request.status === "YOU RESPONDED"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-[#D1FAE5] text-[#008000]"
                            }`}
                          >
                            {request.status}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* MATCH BOX */}
                  {request.match && (
                    <div
                      className={`flex w-fit items-center gap-2 rounded-lg border-[0.8px] px-4 py-[10px] ${
                        request.matchType === "good"
                          ? "border-[#008000] bg-[#F0FDF4] text-[#059669]"
                          : "border-[#008000] bg-[#D1FAE5] text-[#008000]"
                      }`}
                    >
                      <CheckCircle2 size={12} />

                      <span className="text-xs font-bold">
                        {request.match}
                      </span>
                    </div>
                  )}

                  {/* LOCATION / PRICE / TIME */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    
                    <div className="flex items-center gap-1">
                      <MapPin
                        size={14}
                        className="text-[#008000]"
                      />

                      <span className="text-xs font-bold text-[#008000]">
                        {request.distance}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Wallet
                        size={14}
                        className="text-[#008000]"
                      />

                      <span className="text-xs font-bold text-[#008000]">
                        {request.price}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Clock
                        size={14}
                        className="text-[#008000]"
                      />

                      <span className="text-xs text-[#6B7280]">
                        {request.time}
                      </span>
                    </div>
                  </div>

                  {/* PROVIDER RESPONSE ALERT */}
                  {request.responded && (
                    <div className="flex w-fit items-center gap-2 rounded-lg bg-[#FEF3C7] px-4 py-[6px]">
                      <AlertTriangle
                        size={12}
                        className="text-[#92400E]"
                      />

                      <span className="text-xs font-bold text-[#92400E]">
                        {request.responded}
                      </span>
                    </div>
                  )}

                  {/* DESCRIPTION */}
                  <p className="text-sm leading-5 text-[#4B5563]">
                    {request.description}
                  </p>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex h-12 gap-2">
                  
                  <button
                    type="button"
                    className="flex w-[38%] items-center justify-center gap-2 rounded-lg border-[1.5px] border-[#008000] bg-white px-2 text-xs font-bold text-[#008000] transition hover:bg-green-50"
                  >
                    <Eye size={14} />
                    View Profile
                  </button>

                  {/* DECLINED BUTTON */}
                  {request.declined ? (
                    <button
                      type="button"
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 text-sm font-bold text-red-600"
                    >
                      <XCircle size={16} />
                      Declined
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-2 text-sm font-bold transition ${
                        request.alreadyResponded
                          ? "bg-[#008000] text-white hover:bg-green-700"
                          : "bg-[#008000] text-white hover:bg-green-700"
                      }`}
                    >
                      <MessageCircle size={16} />

                      {request.alreadyResponded
                        ? "View Response"
                        : "Respond Now"}
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}

          {/* LOADING OLDER REQUESTS */}
          {hasMoreRequests && (
            <div className="flex justify-center py-5">
              <button
                type="button"
                onClick={loadOlderRequests}
                disabled={loading}
                className="flex items-center gap-2 rounded-lg border border-[#008000] bg-white px-5 py-3 text-sm font-bold text-[#008000] transition hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                    Loading older requests...
                  </>
                ) : (
                  "Load older requests"
                )}
              </button>
            </div>
          )}

          {/* ALL REQUESTS LOADED */}
          {!hasMoreRequests &&
            filteredRequests.length > 0 && (
              <div className="py-5 text-center">
                <p className="text-sm text-[#6B7280]">
                  You have reached the end of the requests.
                </p>
              </div>
            )}

          {/* EMPTY STATE */}
          {filteredRequests.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <User
                size={50}
                className="mb-4 text-gray-300"
              />

              <h3 className="font-bold text-[#1F2937]">
                No requests found
              </h3>

              <p className="mt-2 text-sm text-[#6B7280]">
                There are currently no service requests in this category.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ServiceReq;
