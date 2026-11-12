import React, { useMemo, useState, useEffect } from "react";
import {
  ArrowLeft,
  Search,
  Users,
  Grid2X2,
  List,
  Wrench,
  Sparkles,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import occupationCatalogue from "../data/occupationCatalogue";

const categoryStyles = {
  "Home Cleaning & Domestic Services": {
    bg: "rgba(0, 158, 226, 0.05)",
    iconBg: "#009EE2",
    icon: "🧹",
    tag: "TRENDING",
  },
  "Plumbing & Water Services": {
    bg: "rgba(37, 92, 255, 0.05)",
    iconBg: "#255CFF",
    icon: "🔧",
    tag: null,
  },
  "Electrical & Power Services": {
    bg: "rgba(48, 34, 49, 0.05)",
    iconBg: "#302231",
    icon: "⚡",
    tag: null,
  },
  "Construction & Building Services": {
    bg: "rgba(176, 97, 87, 0.05)",
    iconBg: "#B06157",
    icon: "🏗️",
    tag: null,
  },
  "Painting & Wall Decoration": {
    bg: "rgba(234, 72, 113, 0.05)",
    iconBg: "#EA4871",
    icon: "🎨",
    tag: null,
  },
  "Carpentry, Furniture & Interior Design": {
    bg: "rgba(135, 91, 56, 0.05)",
    iconBg: "#875B38",
    icon: "🪚",
    tag: null,
  },
  "Automobile & Vehicle Repair": {
    bg: "rgba(0, 128, 0, 0.05)",
    iconBg: "#008000",
    icon: "🚗",
    tag: "POPULAR",
  },
  "Transport, Delivery & Moving": {
    bg: "rgba(48, 71, 89, 0.05)",
    iconBg: "#304759",
    icon: "🚚",
    tag: null,
  },
  "Beauty, Hair & Grooming": {
    bg: "rgba(184, 75, 134, 0.05)",
    iconBg: "#B84B86",
    icon: "💇",
    tag: null,
  },
  "Fashion, Tailoring & Clothing": {
    bg: "rgba(91, 188, 176, 0.05)",
    iconBg: "#5BBCAF",
    icon: "✂️",
    tag: "TRENDING",
  },
  "Healthcare & Medical Services": {
    bg: "rgba(0, 158, 100, 0.05)",
    iconBg: "#009E64",
    icon: "🏥",
    tag: null,
  },
  "Education, Tutoring & Training": {
    bg: "rgba(238, 134, 49, 0.05)",
    iconBg: "#EE8631",
    icon: "📚",
    tag: null,
  },
  "Information Technology & Software": {
    bg: "rgba(236, 153, 63, 0.05)",
    iconBg: "#EC993F",
    icon: "💻",
    tag: null,
  },
  "Graphic Design & Creative Services": {
    bg: "rgba(86, 172, 169, 0.05)",
    iconBg: "#56ACA9",
    icon: "📷",
    tag: null,
  },
  "Catering, Cooking & Food Services": {
    bg: "rgba(170, 198, 110, 0.05)",
    iconBg: "#AAC66E",
    icon: "🍽️",
    tag: "POPULAR",
  },
  "Agriculture, Farming & Gardening": {
    bg: "rgba(116, 171, 103, 0.05)",
    iconBg: "#74AB67",
    icon: "🌱",
    tag: null,
  },
  "Security & Safety Services": {
    bg: "rgba(104, 103, 103, 0.05)",
    iconBg: "#686767",
    icon: "🛡️",
    tag: null,
  },
  "Property & Real Estate": {
    bg: "rgba(135, 91, 56, 0.05)",
    iconBg: "#875B38",
    icon: "🏢",
    tag: "POPULAR",
  },
  "Repairs, Installation & Equipment Rental": {
    bg: "rgba(134, 182, 194, 0.05)",
    iconBg: "#86B6C2",
    icon: "⚙️",
    tag: null,
  },
};

const categories = Object.entries(occupationCatalogue).map(
  ([name, occupations]) => ({
    name,
    occupations,
    providers: 0,
    ...(categoryStyles[name] || {
      bg: "rgba(0, 128, 0, 0.05)",
      iconBg: "#008000",
      icon: "🛠️",
      tag: null,
    }),
  })
);


function Categories() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid");

  const [selectedCategory, setSelectedCategory] = useState(null);
const [occupationCounts, setOccupationCounts] = useState({});
const [loadingOccupations, setLoadingOccupations] = useState(false);
const [occupationError, setOccupationError] = useState("");

  const navigate = useNavigate();

  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      category.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const handleBack = () => {
    window.history.back();
  };

  const handleCategoryClick = async (category) => {
  if (selectedCategory === category.name) {
    setSelectedCategory(null);
    return;
  }

  setSelectedCategory(category.name);
  setOccupationError("");

  // Use cached counts if already fetched
  if (occupationCounts[category.name]) {
    return;
  }

  try {
    setLoadingOccupations(true);

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/providers/occupation-counts?category=${encodeURIComponent(category.name)}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Unable to fetch provider counts.");
    }

    const counts = {};

    data.occupations.forEach((item) => {
      counts[item.occupation] = Number(item.providerCount);
    });

    setOccupationCounts((prev) => ({
      ...prev,
      [category.name]: counts,
    }));
  } catch (error) {
    console.error("Occupation count error:", error);
    setOccupationError(error.message);
  } finally {
    setLoadingOccupations(false);
  }
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

           
{filteredCategories.map((category) => (
  <div
    key={category.name}
    className={selectedCategory === category.name ? "col-span-2" : ""}
  >
    <button
      type="button"
      onClick={() => handleCategoryClick(category)}
      className="relative h-[168px] w-full overflow-hidden rounded-[15px] text-center transition-transform active:scale-[0.98]"
      style={{
        background: `linear-gradient(
          135deg,
          ${category.bg} 15%,
          rgba(255,255,255,0.01) 85%
        )`,
      }}
    >
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

      <div
        className="absolute left-1/2 top-[35px] flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full"
        style={{ backgroundColor: category.iconBg }}
      >
        <span className="text-[28px]">{category.icon}</span>
      </div>

      <div className="absolute left-1/2 top-[107px] flex w-full -translate-x-1/2 flex-col items-center gap-[5px]">
        <span className="text-[14px] font-bold italic leading-[17px] text-gray-800">
          {category.name}
        </span>

        <div className="flex items-center gap-2">
          <Users size={11} strokeWidth={2} className="text-gray-500" />
          <span className="text-[12px] leading-[15px] text-gray-500">
            {category.providers} providers
          </span>
        </div>
      </div>

      <div className="absolute right-3 bottom-3">
        {selectedCategory === category.name ? (
          <ChevronDown size={18} />
        ) : (
          <ChevronRight size={18} />
        )}
      </div>
    </button>

    {selectedCategory === category.name && (
      <div className="mt-2 rounded-xl bg-white border border-gray-200 p-3">
        <h4 className="font-semibold text-sm mb-3">
          Available Occupations
        </h4>

        {loadingOccupations ? (
          <p className="text-sm text-gray-500">Loading occupations...</p>
        ) : occupationError ? (
          <p className="text-sm text-red-500">{occupationError}</p>
        ) : (
          <div className="space-y-3">
            {category.occupations.map((occupation) => (
              <div
                key={occupation}
                className="flex items-center justify-between gap-3 text-sm"
              >
                <span>{occupation}</span>
                <span className="text-gray-500 whitespace-nowrap">
                  {occupationCounts[category.name]?.[occupation] ?? 0} providers
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    )}
  </div>
))}

          </div>
        ) : (
          /* ================= LIST VIEW ================= */
          <div className="flex flex-col gap-3">
            
            
            
            
            {filteredCategories.map((category) => (
  <div
    key={category.name}
    className={selectedCategory === category.name ? "col-span-2" : ""}
  >
    <button
      type="button"
      onClick={() => handleCategoryClick(category)}
      className="w-full h-[168px] rounded-2xl p-4 text-left transition-all"
      style={{ background: category.bg }}
    >
      <div className="flex items-center justify-between">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
          style={{ background: category.iconBg }}
        >
          {category.icon}
        </div>

        {selectedCategory === category.name ? (
          <ChevronDown size={20} />
        ) : (
          <ChevronRight size={20} />
        )}
      </div>

      <h3 className="mt-3 font-semibold text-sm">
        {category.name}
      </h3>

      <p className="text-xs text-gray-500 mt-1">
        {category.providers} providers
      </p>
    </button>

    {selectedCategory === category.name && (
      <div className="mt-2 rounded-xl bg-white border border-gray-200 p-3">
        <h4 className="font-semibold text-sm mb-3">
          Available Occupations
        </h4>

        {loadingOccupations ? (
          <p className="text-sm text-gray-500">
            Loading occupations...
          </p>
        ) : occupationError ? (
          <p className="text-sm text-red-500">
            {occupationError}
          </p>
        ) : (
          <div className="space-y-3">
            {category.occupations.map((occupation) => (
              <div
                key={occupation}
                className="flex items-center justify-between gap-3 text-sm"
              >
                <span>{occupation}</span>

                <span className="text-gray-500 whitespace-nowrap">
                  {occupationCounts[category.name]?.[occupation] ?? 0} providers
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    )}
  </div>
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