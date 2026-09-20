import React, { useState } from "react";
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

  const providers = [
    {
      name: "Timi Motors",
      service: "Auto Repair Specialist",
      distance: "800m away",
      price: "₦10,000 - ₦20,000",
      rating: "4.8",
      reviews: "124 reviews",
      image: "/provider1.jpg",
    },
    {
      name: "Ada’s Plumbing",
      service: "Plumbing & Repairs",
      distance: "1.2km away",
      price: "₦5,000 - ₦10,000",
      rating: "4.9",
      reviews: "89 reviews",
      image: "/provider2.jpg",
    },
    {
      name: "Chef Francis",
      service: "Food & Catering",
      distance: "1.8km away",
      price: "₦5,000 - ₦15,000",
      rating: "4.7",
      reviews: "56 reviews",
      image: "/provider3.jpg",
    },
    {
      name: "Olu Plumbing",
      service: "Auto Repair Specialist",
      distance: "800m away",
      price: "₦10,000 - ₦15,000",
      rating: "4.8",
      reviews: "124 reviews",
      image: "/provider4.jpg",
    },
    {
      name: "Amaka’s Kitchen",
      service: "Food & Catering",
      distance: "2.1km away",
      price: "₦8,000 - ₦18,000",
      rating: "4.8",
      reviews: "124 reviews",
      image: "/provider5.jpg",
    },
  ];

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
                    Hello, Timi 👋
                  </h1>

                  <div className="flex items-center gap-1">
                    <MapPin
                      size={7}
                      strokeWidth={2.5}
                      className="text-[#008000]"
                    />

                    <span className="text-xs leading-[17px] text-[#6B7280]">
                      Ikeja, Lagos
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

  <span
    className="
      absolute
      -right-[3px]
      -top-[3px]
      flex
      h-[8px]
      w-[8px]
      items-center
      justify-center
      rounded-full
      bg-[#EF4444]
      text-[7px]
      font-bold
      italic
      text-white
    "
  >
    2
  </span>
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
                  6 providers nearby
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

                {providers.map((provider) => (

                  <div
                    key={provider.name}
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
                            src={provider.image}
                            alt={provider.name}
                            className="h-full w-full object-cover"
                          />

                        </div>


                        {/* Provider information */}
                        <div className="flex flex-col gap-1">

                          <h3 className="text-xs font-bold text-[#1F2937]">
                            {provider.name}
                          </h3>

                          <p className="text-[10px] font-normal italic text-[#6B7280]">
                            {provider.service}
                          </p>

                          <div className="flex items-center gap-2">

                            <div className="flex items-center gap-1">
                              <Star
                                size={9}
                                fill="#FBBF24"
                                stroke="#FBBF24"
                              />

                              <span className="text-[10px] font-bold italic text-[#1F2937]">
                                {provider.rating}
                              </span>
                            </div>

                            <span className="text-[10px] text-[#6B7280]">
                              ({provider.reviews})
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
                        {provider.distance}
                      </span>

                    </div>


                    {/* Price */}
                    <p className="absolute left-4 top-[116px] text-xs font-bold text-[#008000]">
                      {provider.price}
                    </p>


                    {/* Actions */}
                    <div className="absolute top-[151px] flex h-[48px] items-center gap-2">

                      <button
                        type="button"
                        className="
                          flex
                          h-[40px]
                          w-[100px]
                          items-center
                          justify-center
                          rounded-[8px]
                          border-[1.5px]
                          border-[#008000]
                          bg-white
                          text-[10px]
                          font-bold
                          italic
                          text-[#008000]
                        "
                      >
                        View Profile
                      </button>

                      <button
                        type="button"
                        className="
                          flex
                          h-[40px]
                          w-[100px]
                          items-center
                          justify-center
                          rounded-[8px]
                          border-[1.5px]
                          border-[#008000]
                          bg-[#008000]
                          text-[10px]
                          font-bold
                          italic
                          text-white
                        "
                      >
                        Contact Now
                      </button>

                      <button
                        type="button"
                        className="
                          flex
                          h-[48px]
                          w-[48px]
                          items-center
                          justify-center
                          rounded-[15px]
                          bg-[#F3F4F6]
                        "
                      >
                        <Phone
                          size={18}
                          className="text-[#6B7280]"
                        />
                      </button>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>
        </div>


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
            <button
                 onClick={() => navigate("/seekrequest")}

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