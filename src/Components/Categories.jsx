import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  Search,
  Users,
  Grid2X2,
  List,
  Wrench,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";


const categories = [
  {
    name: "Art & Crafts",
    providers: 38,
    tag: null,
    bg: "rgba(234, 72, 113, 0.05)",
    iconBg: "#EA4871",
    icon: "🎨",
    image: "/images/art-crafts.jpg",
  },
  {
    name: "AC Repair",
    providers: 15,
    tag: "TRENDING",
    bg: "rgba(134, 182, 194, 0.05)",
    iconBg: "#86B6C2",
    icon: "❄️",
    image: "/images/ac-repair.jpg",
  },
  {
    name: "Auto & Mechanic",
    providers: 124,
    tag: "POPULAR",
    bg: "rgba(0, 128, 0, 0.05)",
    iconBg: "#008000",
    icon: "🔧",
    image: "/images/auto-mechanic.jpg",
  },
  {
    name: "Beauty & Salon",
    providers: 78,
    tag: null,
    bg: "rgba(184, 75, 134, 0.05)",
    iconBg: "#B84B86",
    icon: "💇",
    image: "/images/beauty-salon.jpg",
  },
  {
    name: "Catering Services",
    providers: 77,
    tag: "POPULAR",
    bg: "rgba(170, 198, 110, 0.05)",
    iconBg: "#AAC66E",
    icon: "🍽️",
    image: "/images/catering.jpg",
  },
  {
    name: "Cleaning Services",
    providers: 67,
    tag: "TRENDING",
    bg: "rgba(0, 158, 226, 0.05)",
    iconBg: "#009EE2",
    icon: "🧹",
    image: "/images/cleaning.jpg",
  },
  {
    name: "Electrical Services",
    providers: 38,
    tag: null,
    bg: "rgba(48, 34, 49, 0.05)",
    iconBg: "#302231",
    icon: "⚡",
    image: "/images/electrical.jpg",
  },
  {
    name: "Event Planning",
    providers: 86,
    tag: null,
    bg: "rgba(243, 190, 69, 0.05)",
    iconBg: "#F3BE45",
    icon: "🎉",
    image: "/images/event-planning.jpg",
  },
  {
    name: "Fitness & Wellness",
    providers: 53,
    tag: "POPULAR",
    bg: "rgba(116, 171, 103, 0.05)",
    iconBg: "#74AB67",
    icon: "🏋️",
    image: "/images/fitness.jpg",
  },
  {
    name: "Food Delivery",
    providers: 156,
    tag: "POPULAR",
    bg: "rgba(255, 215, 0, 0.05)",
    iconBg: "#FFD700",
    icon: "🍔",
    image: "/images/food-delivery.jpg",
  },
  {
    name: "Generator Repair",
    providers: 40,
    tag: "TRENDING",
    bg: "rgba(104, 103, 103, 0.05)",
    iconBg: "#686767",
    icon: "⚙️",
    image: "/images/generator.jpg",
  },
  {
    name: "Home Repairs",
    providers: 103,
    tag: null,
    bg: "rgba(176, 97, 87, 0.05)",
    iconBg: "#B06157",
    icon: "🏠",
    image: "/images/home-repairs.jpg",
  },
  {
    name: "IT & Tech Support",
    providers: 45,
    tag: null,
    bg: "rgba(236, 153, 63, 0.05)",
    iconBg: "#EC993F",
    icon: "💻",
    image: "/images/it-support.jpg",
  },
  {
    name: "Legal & Consulting",
    providers: 41,
    tag: null,
    bg: "rgba(59, 59, 59, 0.05)",
    iconBg: "#3B3B3B",
    icon: "⚖️",
    image: "/images/legal.jpg",
  },
  {
    name: "Logistics & Delivery",
    providers: 72,
    tag: null,
    bg: "rgba(48, 71, 89, 0.05)",
    iconBg: "#304759",
    icon: "🚚",
    image: "/images/logistics.jpg",
  },
  {
    name: "Phone Repair",
    providers: 24,
    tag: "TRENDING",
    bg: "rgba(204, 80, 82, 0.05)",
    iconBg: "#CC5052",
    icon: "📱",
    image: "/images/phone-repair.jpg",
  },
  {
    name: "Photo & Videography",
    providers: 59,
    tag: null,
    bg: "rgba(86, 172, 169, 0.05)",
    iconBg: "#56ACA9",
    icon: "📷",
    image: "/images/photo-video.jpg",
  },
  {
    name: "Plumbing Services",
    providers: 124,
    tag: null,
    bg: "rgba(37, 92, 255, 0.05)",
    iconBg: "#255CFF",
    icon: "🔧",
    image: "/images/plumbing.jpg",
  },
  {
    name: "Real Estate Services",
    providers: 77,
    tag: "POPULAR",
    bg: "rgba(135, 91, 56, 0.05)",
    iconBg: "#875B38",
    icon: "🏢",
    image: "/images/real-estate.jpg",
  },
  {
    name: "Tailoring & Fashion",
    providers: 92,
    tag: "TRENDING",
    bg: "rgba(91, 188, 176, 0.05)",
    iconBg: "#5BBCAf",
    icon: "✂️",
    image: "/images/tailoring.jpg",
  },
  {
    name: "Tutoring & Education",
    providers: 64,
    tag: null,
    bg: "rgba(238, 134, 49, 0.05)",
    iconBg: "#EE8631",
    icon: "📚",
    image: "/images/tutoring.jpg",
  },
];

function Categories() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid");

  const navigate = useNavigate();

  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      category.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const handleBack = () => {
    window.history.back();
  };

  const handleCategoryClick = (category) => {
    if (category.name === "Auto & Mechanic") {
      navigate("/provider");
    }
    // If you are using React Router, you can replace this with:
    // navigate(`/category/${category.name.toLowerCase().replaceAll(" ", "-")}`);
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
    bg-white
    font-[Inter,sans-serif]
    text-gray-800
  "
>

     

      {/* ================= HEADER ================= */}
      <div className="absolute left-6 top-[62px] flex h-10 items-center gap-6">

        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex h-6 w-6 items-center justify-center"
        >
          <ArrowLeft
            size={24}
            strokeWidth={2}
            className="text-gray-800"
          />
        </button>

        {/* Title */}
        <h1 className="text-[20px] font-bold leading-6 text-gray-800">
          Categories
        </h1>
      </div>

      {/* ================= VIEW TOGGLE ================= */}
      <div className="absolute right-6 top-[62px] flex h-11 w-20 rounded-lg bg-gray-50 p-1">

        <button
          onClick={() => setView("grid")}
          className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${
            view === "grid"
              ? "bg-white shadow-sm"
              : "bg-transparent"
          }`}
        >
          <Grid2X2
            size={19}
            strokeWidth={2}
            className={
              view === "grid" ? "text-[#008000]" : "text-gray-500"
            }
          />
        </button>

        <button
          onClick={() => setView("list")}
          className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${
            view === "list"
              ? "bg-white shadow-sm"
              : "bg-transparent"
          }`}
        >
          <List
            size={19}
            strokeWidth={2}
            className={
              view === "list" ? "text-[#008000]" : "text-gray-500"
            }
          />
        </button>
      </div>

      {/* ================= SEARCH ================= */}
      <div
  className="
    absolute
    left-6
    right-6
    top-[122px]
    flex
    h-[50px]
    items-center
    rounded-[15px]
    bg-[#F3F4F6]
    px-4
  "
>

        <Search
          size={18}
          strokeWidth={2}
          className="text-[#008000]"
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="ml-2 w-full bg-transparent text-[12px] text-gray-800 outline-none placeholder:text-gray-500"
        />
      </div>

      {/* ================= CATEGORY AREA ================= */}
      <div
  className="
    absolute
    left-6
    right-6
    top-[188px]
    bottom-[40px]
    overflow-y-auto
    pb-8
    pr-1
    scrollbar-hide
  "
>
        {view === "grid" ? (
          <div className="grid grid-cols-2 gap-4">

            {filteredCategories.map((category, index) => (
              <button
                key={category.name}
                onClick={() => handleCategoryClick(category)}
                className="
  relative
  h-[168px]
  w-full
  overflow-hidden
  rounded-[15px]
  text-center
  transition-transform
  active:scale-[0.98]
"
                style={{
                  background: `linear-gradient(
                    135deg,
                    ${category.bg} 15%,
                    rgba(255,255,255,0.01) 85%
                  )`,
                }}
              >
                {/* Tag */}
                {category.tag && (
                  <span
                    className={`absolute right-[16px] top-[16px] text-[10px] font-bold italic ${
                      category.tag === "POPULAR"
                        ? "text-[#008000]"
                        : "text-[#F59E0B]"
                    }`}
                  >
                    {category.tag}
                  </span>
                )}

                {/* Icon Circle */}
                <div
                  className="absolute left-1/2 top-[35px] flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: category.iconBg,
                  }}
                >
                  <span className="text-[28px]">
                    {category.icon}
                  </span>
                </div>

                {/* Category Info */}
                <div className="absolute left-1/2 top-[107px] flex w-full -translate-x-1/2 flex-col items-center gap-[5px]">

                  <span className="text-[14px] font-bold italic leading-[17px] text-gray-800">
                    {category.name}
                  </span>

                  <div className="flex items-center gap-2">
                    <Users
                      size={11}
                      strokeWidth={2}
                      className="text-gray-500"
                    />

                    <span className="text-[12px] leading-[15px] text-gray-500">
                      {category.providers} providers
                    </span>
                  </div>
                </div>
              </button>
            ))}

          </div>
        ) : (
          /* ================= LIST VIEW ================= */
          <div className="flex flex-col gap-3">

            {filteredCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => handleCategoryClick(category)}
                className="flex h-[85px] w-full items-center rounded-[15px] px-4 text-left transition-transform active:scale-[0.99]"
                style={{
                  background: `linear-gradient(
                    135deg,
                    ${category.bg} 15%,
                    rgba(255,255,255,0.01) 85%
                  )`,
                }}
              >
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: category.iconBg,
                  }}
                >
                  <span className="text-[24px]">
                    {category.icon}
                  </span>
                </div>

                <div className="ml-4 flex flex-1 flex-col gap-1">
                  <span className="text-[14px] font-bold italic">
                    {category.name}
                  </span>

                  <div className="flex items-center gap-2">
                    <Users
                      size={11}
                      className="text-gray-500"
                    />

                    <span className="text-[12px] text-gray-500">
                      {category.providers} providers
                    </span>
                  </div>
                </div>

                {category.tag && (
                  <span
                    className={`mr-2 text-[10px] font-bold italic ${
                      category.tag === "POPULAR"
                        ? "text-[#008000]"
                        : "text-[#F59E0B]"
                    }`}
                  >
                    {category.tag}
                  </span>
                )}

                <ChevronRight
                  size={18}
                  className="text-gray-400"
                />
              </button>
            ))}

          </div>
        )}

        {/* Empty Search Result */}
        {filteredCategories.length === 0 && (
          <div className="flex h-[300px] flex-col items-center justify-center text-center">
            <Search
              size={40}
              className="mb-3 text-gray-300"
            />

            <p className="text-[15px] font-semibold text-gray-700">
              No categories found
            </p>

            <p className="mt-1 text-[12px] text-gray-500">
              Try searching for another service.
            </p>
          </div>
        )}
      </div>

      {/* ================= HOME INDICATOR ================= */}
      <div className="absolute bottom-0 left-0 flex h-6 w-full items-center justify-center">
        <div className="h-1 w-[108px] rounded-xl bg-gray-800" />
      </div>
    </div>
  );
}

export default Categories;