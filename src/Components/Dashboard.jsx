import React, { useEffect, useState } from "react";
import {
  MapPin,
  Search,
  Home,
  MessageCircle,
  User,
  Wrench,
  Utensils,
  Droplets,
  Star,
  Phone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState("All");

  const [user, setUser] = useState(null);
const [loadingUser, setLoadingUser] = useState(true);


  const [providers, setProviders] = useState([]);
const [loadingProviders, setLoadingProviders] = useState(true);

const [requests, setRequests] = useState([]);
const [loadingRequests, setLoadingRequests] = useState(true);

const [unreadNotificationCount, setUnreadNotificationCount] =
  useState(0);


  useEffect(() => {
  const fetchUnreadNotificationCount = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/notifications/unread-count",
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
          "Failed to fetch notification count:",
          data.message
        );
        return;
      }

      setUnreadNotificationCount(
        Number(data.count || 0)
      );
    } catch (error) {
      console.error(
        "Notification count fetch error:",
        error
      );
    }
  };

  fetchUnreadNotificationCount();
}, []);

useEffect(() => {
  const fetchUserProfile = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoadingUser(false);
      return;
    }

    try {
      const response = await fetch(
        
        "http://localhost:5000/api/users/profile",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }


        
      );


      const data = await response.json();

console.log("DASHBOARD LOCATION:", {
  realAddress: data.user.realAddress,
  city: data.user.city,
  latitude: data.user.latitude,
  longitude: data.user.longitude,
  searchRadius: data.user.searchRadius,
});

      if (!response.ok) {
        console.error(
          "Failed to fetch user profile:",
          data.message
        );
        return;
      }

      setUser(data.user);
    } catch (error) {
      console.error("Profile fetch error:", error);
    } finally {
      setLoadingUser(false);
    }
  };

  fetchUserProfile();
}, []);

useEffect(() => {
  const fetchNearbyProviders = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoadingProviders(false);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/nearby-providers",
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
          "Failed to fetch nearby providers:",
          data.message
        );
        return;
      }

      setProviders(data.providers || []);
    } catch (error) {
      console.error("Nearby providers fetch error:", error);
    } finally {
      setLoadingProviders(false);
    }
  };

  fetchNearbyProviders();
}, []);

useEffect(() => {
  const fetchServiceRequests = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoadingRequests(false);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/requests",
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
          "Failed to fetch service requests:",
          data.message
        );
        return;
      }

      setRequests(data.requests || []);
    } catch (error) {
      console.error("Service requests fetch error:", error);
    } finally {
      setLoadingRequests(false);
    }
  };

  fetchServiceRequests();
}, []);

  const categories = [
    {
      name: "Auto Repair",
      icon: <Wrench size={14} className="text-white" />,
    },
    {
      name: "Food Delivery",
      icon: <Utensils size={14} className="text-white" />,
    },
    {
      name: "Plumbing",
      icon: <Droplets size={14} className="text-white" />,
    },
  ];

  const handleContactProvider = (provider) => {
  console.log("CONTACT PROVIDER:", provider);
  console.log("CONTACT PHONE:", provider?.phone);

  if (!provider?.phone) {
    alert("This provider has not added a phone number.");
    return;
  }

  window.location.href = `tel:${provider.phone}`;
};

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center overflow-hidden -mt-8">

      {/* =====================================================
          DEVICE FRAME
          Figma: 428 × 926
      ====================================================== */}
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
    mx-auto
  "
>

        


        {/* =================================================
            SCROLLABLE DASHBOARD CONTENT
        ================================================== */}
        <div
  className="
    absolute
    left-[24px]
    right-[24px]
    top-[70px]
    bottom-[99px]
    overflow-y-auto
    scrollbar-hide
    pb-8
  "
>

          <div className="flex w-full flex-col gap-6">


            {/* =================================================
                GREETING
            ================================================== */}
            <div className="flex w-full flex-col gap-6">

              {/* Header */}
              <div className="flex h-[50px] w-full items-center justify-between">

                <div className="flex flex-col gap-1">
<h1 className="text-md font-bold italic leading-[29px] text-[#1F2937]">
  Hello, {loadingUser ? "..." : user?.fullName?.split(" ").pop() || "User"} 👋
</h1>

                  <div className="flex items-center gap-1">
                    <MapPin
                      size={7}
                      strokeWidth={2.5}
                      className="text-[#008000]"
                    />

              <span className="text-xs leading-[17px] text-[#6B7280]">
  {loadingUser ? "..." : user?.realAddress || "Location not set"}
</span>
                  </div>

                </div>


                {/* Notification */}
<button
  onClick={() => navigate("/homenotification")}
  type="button"
  className="
    relative
    flex
    items-center
    justify-center
    h-[24px]
    w-[24px]
    rounded-full
    bg-[#F3F4F6]
  "
>
  <img
    src="/Home-notification.png"
    alt="Notification"
    className="w-3 h-4"
  />

{unreadNotificationCount > 0 && (
  <span
    className="
      absolute
      -right-[3px]
      -top-[3px]
      flex
      h-[8px]
      min-w-[8px]
      items-center
      justify-center
      rounded-full
      bg-[#EF4444]
      px-[2px]
      text-[7px]
      font-bold
      italic
      text-white
    "
  >
    {unreadNotificationCount > 99
      ? "99+"
      : unreadNotificationCount}
  </span>
)}
</button>

              </div>


              {/* =================================================
                  SEARCH
              ================================================== */}
              <div
                className="
                  flex
                  h-[50px]
                  w-full                  items-center
                  justify-between
                  rounded-[15px]
                  bg-[#F3F4F6]
                  px-4
                "
              >
                <div className="flex items-center gap-2">

                  <Search
                  onClick={() => navigate("/search")}
                    size={10}
                    className="text-[#008000]"
                  />

                  <span className="text-xs text-black">
                    Search
                  </span>

                </div>

                <MapPin
                  size={10}
                  className="text-[#008000]"
                />

              </div>


              {/* =================================================
                  CATEGORIES
              ================================================== */}
              <div className="flex w-full flex-col gap-4">

                <div className="flex items-center justify-between">

                  <h2 className="text-sm font-bold leading-[19px] text-[#1F2937]">
                    Categories
                  </h2>

                  <button
                  onClick={()=> navigate("/category")}
                    type="button"
                    className="text-[14px] font-bold italic text-[#008000]"
                  >
                    See All
                  </button>

                </div>   


                {/* Category Cards */}
                <div className="flex w-full gap-2 overflow-x-auto pb-1">

                  {categories.map((category) => (
                    <button
                      key={category.name}
                      type="button"
                      onClick={() =>
                        setActiveCategory(category.name)
                      }
                      className={`
                        flex
                        h-[110px]
                        min-w-[80px]
                        flex-col
                        items-center
                        justify-center
                        gap-2
                        rounded-[15px]
                        bg-white
                        transition
                        ${
                          activeCategory === category.name
                            ? "ring-2 ring-[#008000]"
                            : ""
                        }
                      `}
                    >

                      <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#008000]">
                        {category.icon}
                      </div>

                      <span className="text-[13px] font-bold italic text-[#1F2937]">
                        {category.name}
                      </span>

                    </button>
                  ))}

                </div>

              </div>


              {/* =================================================
                  MAP
              ================================================== */}
              <div className="relative h-[200px] w-full overflow-hidden rounded-[15px] bg-white">

                <img
                  src="/basemap.png"
                  alt="Nearby service providers"
                  className="
                    absolute
                    left-0
                    top-[-35px]
                    h-[285px]
                    w-full
                    object-cover
                  "
                />

                {/* Provider markers */}
                <div className="absolute left-[32%] top-[20%]">
                  <MapPin
                    size={16}
                    fill="#3EC3FF"
                    stroke="#1DAEEF"
                  />
                </div>

                <div className="absolute left-[48%] top-[35%]">
                  <MapPin
                    size={16}
                    fill="#3EC3FF"
                    stroke="#1DAEEF"
                  />
                </div>

                <div className="absolute left-[55%] top-[55%]">
                  <MapPin
                    size={16}
                    fill="#3EC3FF"
                    stroke="#1DAEEF"
                  />
                </div>

                <div className="absolute left-[42%] top-[70%]">
                  <MapPin
                    size={16}
                    fill="#3EC3FF"
                    stroke="#1DAEEF"
                  />
                </div>


                {/* View Full Map */}
                <button
                  type="button"
                  className="
                    absolute
                    left-1/2
                    top-[152px]
                    -translate-x-1/2
                    rounded-[15px]
                    bg-white
                    px-[10px]
                    py-[10px]
                    text-[10px]
                    font-bold
                    text-black
                  "
                >
                  View Full Map
                </button>


                {/* Providers nearby */}
                <div
                  className="
                    absolute
                    right-[8px]
                    top-[27px]
                    rounded-[15px]
                    bg-white
                    px-[6px]
                    py-[6px]
                    text-[8px]
                    font-bold
                    text-black
                  "
                >
                  {loadingProviders
  ? "..."
  : `${providers.length} provider${providers.length !== 1 ? "s" : ""} nearby`}
                </div>

              </div>


              {/* =================================================
                  AVAILABLE NEAR YOU
              ================================================== */}
              <div className="flex w-full flex-col gap-2">

                <h2 className="text-[16px] font-bold text-[#1F2937]">
                  Available Near You
                </h2>

                <div className="flex items-center gap-2">

                  {["All", "Auto", "Food", "Plumbing"].map(
                    (category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() =>
                          setActiveCategory(category)
                        }
                        className={`
                          rounded-full
                          border
                          px-[14px]
                          py-[7px]
                          text-[12px]
                          font-bold
                          italic
                          ${
                            activeCategory === category
                              ? "border-[#008000] bg-[#008000] text-white"
                              : "border-[#E5E7EB] bg-white text-[#6B7280]"
                          }
                        `}
                      >
                        {category}
                      </button>
                    )
                  )}

                </div>

              </div>


              {/* =================================================
                  PROVIDER LIST
              ================================================== */}
              <div className="flex w-full flex-col gap-4">

  {loadingProviders ? (
    <div className="flex h-[120px] items-center justify-center rounded-[15px] bg-white">
      <p className="text-xs text-[#6B7280]">
        Finding providers near you...
      </p>
    </div>
  ) : providers.length === 0 ? (
    <div className="flex h-[120px] items-center justify-center rounded-[15px] bg-white px-4">
      <p className="text-center text-xs text-[#6B7280]">
        No providers found within your search radius.
      </p>
    </div>
  ) : (
   [...providers]
  .sort(
    (a, b) =>
      Number(a.distance_meters ?? Infinity) -
      Number(b.distance_meters ?? Infinity)
  )
  .map((provider) => (


      <div
        key={provider.id}
        className="
          relative
          h-[218px]
          w-full
          shrink-0
          rounded-[15px]
          bg-white
        "
      >

        {/* Provider header */}
        <div className="absolute left-4 right-4 top-4 flex items-start justify-between">

          <div className="flex items-center gap-4">

            {/* Provider image */}
            <div className="relative h-[50px] w-[50px] overflow-hidden rounded-[15px] bg-[#F3F4F6]">

              <img
                src={provider.profile_image || "/profile.jpg"}
                alt={provider.full_name}
                className="h-full w-full object-cover"
              />

            </div>

            {/* Provider information */}
            <div className="flex flex-col gap-1">

              <h3 className="text-xs font-bold text-[#1F2937]">
                {provider.full_name}
              </h3>

              <p className="text-[10px] font-normal italic text-[#6B7280]">
                Service Provider
              </p>

              <div className="flex items-center gap-1">

                <Star
                  size={9}
                  fill="#FBBF24"
                  stroke="#FBBF24"
                />

                <span className="text-[10px] text-[#6B7280]">
                  No reviews yet
                </span>

              </div>

            </div>

          </div>

          {/* Verification icon */}
          <div className="flex h-[12px] w-[12px] items-center justify-center rounded-full bg-gradient-to-br from-[#10B981] to-[#059669] text-[9px] font-bold text-white">
            ✓
          </div>

        </div>

        {/* Distance */}
        <div className="absolute left-4 top-[93px] flex items-center gap-[5px]">

          <MapPin
            size={9}
            className="text-[#008000]"
          />

          <span className="text-xs font-bold italic text-[#008000]">
            {provider.distance_meters < 1000
              ? `${Math.round(provider.distance_meters)}m away`
              : `${(provider.distance_meters / 1000).toFixed(1)}km away`}
          </span>

        </div>

        {/* Location */}
        <p className="absolute left-4 top-[116px] text-xs font-bold text-[#008000]">
          {provider.city || provider.real_address || "Location available"}
        </p>

        {/* Actions */}
<div className="absolute left-3 right-3 top-[151px] flex h-[48px] items-center gap-2">

  {/* View Profile */}
  <button
    type="button"
    onClick={() =>
      navigate("/viewprofile", {
        state: { provider },
      })
    }
    className="
      flex
      h-[40px]
      min-w-0
      flex-1
      items-center
      justify-center
      rounded-[8px]
      border-[1.5px]
      border-[#008000]
      bg-white
      px-1
      text-[10px]
      font-bold
      italic
      text-[#008000]
    "
  >
    View Profile
  </button>

  {/* Contact Now */}
  <button
    type="button"
    onClick={() => handleContactProvider(provider)}
    className="
      flex
      h-[40px]
      min-w-0
      flex-1
      items-center
      justify-center
      rounded-[8px]
      border-[1.5px]
      border-[#008000]
      bg-[#008000]
      px-1
      text-[10px]
      font-bold
      italic
      text-white
    "
  >
    Contact Now
  </button>

  {/* Request Service */}
  <button
    type="button"
    onClick={() =>
      navigate("/confirmbooking", {
        state: { provider },
      })
    }
    className="
      flex
      h-[40px]
      min-w-0
      flex-1
      items-center
      justify-center
      rounded-[8px]
      bg-[#008000]
      px-1
      text-[10px]
      font-bold
      italic
      text-white
    "
  >
    Request
  </button>

</div>


      </div>

    ))
  )}

</div>        </div>
</div>        </div>


        {/* =================================================
            BOTTOM NAVIGATION
        ================================================== */}
        <div
          className="
            absolute
            bottom-0
            left-0
            z-50
            h-[99px]
            w-full
            bg-white
          "
        >

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

            {/* Home */}
            <button
              type="button"
              className="flex w-[32px] flex-col items-center gap-3"
            >
              <Home
                size={20}
                fill="#008000"
                className="text-[#008000]"
              />

              <span className="text-[9px] font-bold text-[#008000]">
                Home
              </span>
            </button>


            {/* Request */}
            {/* Request */}
<button
  onClick={() => {
    if (loadingRequests) {
      return;
    }

    if (!requests.length) {
      alert("You do not have a service request yet.");
      return;
    }

    navigate("/seekrequest", {
      state: {
        requestId: requests[0].id,
      },
    });
  }}
  type="button"
  className="flex w-[49px] flex-col items-center gap-[9px]"
>
  <img
    src="/request.png"
    alt="Request"
    className="w-[17px] h-[22px] object-contain"
  />

  <span className="text-[9px] font-bold text-[#9CA3AF]">
    Request
  </span>
</button>


            {/* Messages */}
            
            <button
            onClick={() => navigate("/message")}
              type="button"
              className="relative flex w-[56px] flex-col items-center gap-[7px]"
            >
              <MessageCircle
                size={18}
                className="text-[#9CA3AF]"
              />

              <span
                className="
                  absolute
                  right-[7px]
                  top-[-4px]
                  flex
                  h-[16px]
                  w-[16px]
                  items-center
                  justify-center
                  rounded-full
                  bg-[#EF4444]
                  text-[7px]
                  font-bold
                  text-white
                "
              >
                2
              </span>

              <span className="text-[9px] font-bold text-[#9CA3AF]">
                Messages
              </span>
            </button>


            {/* Profile */}
            <button
            onClick={() => navigate("/realprofile")}
              type="button"
              className="flex w-[35px] flex-col items-center gap-[9px]"
            >
              <User
                size={18}
                className="text-[#9CA3AF]"
              />

              <span className="text-[9px] font-bold text-[#9CA3AF]">
                Profile
              </span>
            </button>

          </div>


          {/* iPhone Home Indicator */}
          <div className="absolute bottom-0 left-0 h-6 w-full">

            <div
              className="
                absolute
                left-1/2
                top-1/2
                h-[4px]
                w-[108px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-xl
                bg-black
              "
            />

          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;