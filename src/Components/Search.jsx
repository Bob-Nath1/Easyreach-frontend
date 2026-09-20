import React, { useState } from "react";
import {
  ArrowLeft,
  Search as SearchIcon,
  X,
  History,
  ChevronRight,
  Star,
  Wrench,
  Utensils,
  Droplets,
  Zap,
  Flame,
  Scissors,
  Smartphone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Search() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("Near me");

  const [recentSearches, setRecentSearches] = useState([
    {
      title: "Plumber near me",
      category: "Plumbing Services",
    },
    {
      title: "Auto repair",
      category: "Auto Services",
    },
    {
      title: "Food delivery",
      category: "Food Services",
    },
    {
      title: "Electrician",
      category: "Electrical Services",
    },
  ]);

  const trending = [
    "AC Repair",
    "House Cleaning",
    "Generator Repair",
    "Catering Services",
    "Tailoring",
    "Phone Repair",
  ];

  const categories = [
    {
      name: "Auto Repair",
      icon: Wrench,
    },
    {
      name: "Food Delivery",
      icon: Utensils,
    },
    {
      name: "Plumbing",
      icon: Droplets,
    },
  ];

  const handleSearch = (value = search) => {
    const trimmed = value.trim();

    if (!trimmed) return;

    const newSearch = {
      title: trimmed,
      category: "Services",
    };

    setRecentSearches((prev) => {
      const filtered = prev.filter(
        (item) => item.title.toLowerCase() !== trimmed.toLowerCase()
      );

      return [newSearch, ...filtered].slice(0, 4);
    });
  };

  const handleClearAll = () => {
    setRecentSearches([]);
  };

  const handleRecentClick = (item) => {
    setSearch(item.title);
    handleSearch(item.title);
  };

  const handleTrendingClick = (item) => {
    setSearch(item);
    handleSearch(item);
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
    font-['Inter']
  "
>

      {/* ================= BACK BUTTON ================= */}
      <button
        onClick={() => navigate(-1)}
        className="absolute left-6 top-[75px] flex h-6 w-6 items-center justify-center"
        aria-label="Go back"
      >
        <ArrowLeft
          size={24}
          strokeWidth={2}
          className="text-[#1F2937]"
        />
      </button>

      {/* ================= SEARCH BUTTON ================= */}
      <button
        onClick={() => handleSearch()}
        className="
  absolute
  right-6
  top-[67px]
  flex
  h-10
  w-10
  items-center
  justify-center
  rounded-lg
  bg-[#008000]
"
        aria-label="Search"
      >
        <SearchIcon size={20} strokeWidth={2.5} color="white" />
      </button>

      {/* ================= SEARCH INPUT ================= */}
       <div className="absolute left-[62px] top-[62px] flex h-[50px] w-[293px] items-center rounded-[15px] bg-[#F3F4F6] px-4">
        <SearchIcon
          size={18}
          strokeWidth={2}
          className="mr-2 shrink-0 text-[#008000]"
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          placeholder="Search"
          className="w-full bg-transparent text-[14px] text-[#1F2937] outline-none placeholder:text-[#9CA3AF]"
        />

        {search && (
          <button
            onClick={() => setSearch("")}
            className="flex h-5 w-5 items-center justify-center rounded-full"
          >
            <X size={15} className="text-[#6B7280]" />
          </button>
        )}
      </div>

      {/* ================= FILTER TABS ================= */}
      <div className="absolute left-6 right-6 top-[120px] flex h-[35px] items-center gap-4">
        {["Near me", "Popular", "Recommended"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex h-[35px] items-center justify-center rounded-full px-4 text-[12px] font-bold transition ${
              activeTab === tab
                ? "bg-[#008000] text-white"
                : "border-[1.5px] border-[#E5E7EB] bg-white text-[#6B7280]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ================= DIVIDER ================= */}
      <div className="absolute left-0 top-[161px] h-px w-full bg-[#E5E7EB]" />

      {/* ================= RECENT SEARCHES ================= */}
     <section
  className="
    absolute
    left-6
    right-6
    top-[187px]
    w-auto
  "
>
        <div className="flex h-[19px] items-center justify-between">
          <h2 className="text-[16px] font-bold leading-[19px] text-[#1F2937]">
            Recent Searches
          </h2>

          {recentSearches.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-[12px] font-bold italic leading-[15px] text-[#008000]"
            >
              Clear All
            </button>
          )}
        </div>

        <div className="mt-2 rounded-xl px-[10px] py-[10px]">
          {recentSearches.length === 0 ? (
            <div className="flex h-[180px] flex-col items-center justify-center text-center">
              <History size={30} className="mb-2 text-[#D1D5DB]" />
              <p className="text-[13px] text-[#9CA3AF]">
                No recent searches
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {recentSearches.map((item, index) => (
                <button
                  key={`${item.title}-${index}`}
                  onClick={() => handleRecentClick(item)}
                  className="flex h-10 w-full items-center justify-between text-left"
                >
                  <div className="flex items-center gap-2">
                    {/* Icon box */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F9FAFB]">
                      <History
                        size={17}
                        strokeWidth={2}
                        className="text-[#9CA3AF]"
                      />
                    </div>

                    {/* Text */}
                    <div className="flex flex-col gap-1">
                      <span className="text-[14px] font-bold italic leading-[17px] text-[#374151]">
                        {item.title}
                      </span>

                      <span className="text-[12px] font-normal leading-[15px] text-[#9CA3AF]">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <ChevronRight
                    size={12}
                    strokeWidth={2}
                    className="text-[#9CA3AF]"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= TRENDING ================= */}
   <section
  className="
    absolute
    left-6
    right-6
    top-[488px]
    w-auto
  "
>
        <h2 className="text-[16px] font-bold leading-[19px] text-[#1F2937]">
          Trending Now 🔥
        </h2>

        <div className="mt-2 flex flex-col gap-2">
          {/* Row 1 */}
          <div className="flex items-center gap-4">
            {trending.slice(0, 2).map((item) => (
              <button
                key={item}
                onClick={() => handleTrendingClick(item)}
                className="flex h-[41px] items-center rounded-full border-[1.5px] border-[#E5E7EB] bg-white px-[10px] text-left"
              >
                <Flame
                  size={13}
                  fill="#F59E0B"
                  className="mr-1 shrink-0 text-[#F59E0B]"
                />

                <span className="whitespace-nowrap text-[14px] font-bold italic leading-[17px] text-[#374151]">
                  {item}
                </span>
              </button>
            ))}
          </div>

          {/* Row 2 */}
          <div className="flex items-center gap-4">
            {trending.slice(2, 4).map((item) => (
              <button
                key={item}
                onClick={() => handleTrendingClick(item)}
                className="flex h-[41px] items-center rounded-full border-[1.5px] border-[#E5E7EB] bg-white px-[10px]"
              >
                <Flame
                  size={13}
                  fill="#F59E0B"
                  className="mr-1 shrink-0 text-[#F59E0B]"
                />

                <span className="whitespace-nowrap text-[14px] font-bold italic leading-[17px] text-[#374151]">
                  {item}
                </span>
              </button>
            ))}
          </div>

          {/* Row 3 */}
          <div className="flex items-center gap-4">
            {trending.slice(4, 6).map((item) => (
              <button
                key={item}
                onClick={() => handleTrendingClick(item)}
                className="flex h-[41px] items-center rounded-full border-[1.5px] border-[#E5E7EB] bg-white px-[10px]"
              >
                <Flame
                  size={13}
                  fill="#F59E0B"
                  className="mr-1 shrink-0 text-[#F59E0B]"
                />

                <span className="whitespace-nowrap text-[14px] font-bold italic leading-[17px] text-[#374151]">
                  {item}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= POPULAR CATEGORIES ================= */}
      <section
  className="
    absolute
    left-6
    right-6
    top-[673px]
    w-auto
  "
>
        <h2 className="text-[16px] font-bold leading-[19px] text-[#1F2937]">
          Popular Categories
        </h2>

       <div className="mt-4 flex h-[115px] w-full gap-2 overflow-hidden">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <button
                key={category.name}
                onClick={() => {
                  setSearch(category.name);
                  handleSearch(category.name);
                }}
                className="flex h-[115px] w-[120px] shrink-0 flex-col items-center rounded-[15px] bg-[#F9FAFB] p-4"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#008000]">
                  <Icon
                    size={28}
                    strokeWidth={2}
                    className="text-[#F9FAFB]"
                  />
                </div>

                <span className="mt-4 w-[88px] text-center text-[13px] font-bold italic leading-4 text-[#1F2937]">
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ================= HOME INDICATOR ================= */}
     <div className="absolute bottom-0 left-0 h-6 w-full">
        <div className="absolute left-1/2 top-1/2 h-1 w-[108px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
      </div>
    </div>
  );
}

export default Search;