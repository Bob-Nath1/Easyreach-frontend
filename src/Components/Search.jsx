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
    <div className="relative mx-auto h-[926px] w-[428px] overflow-hidden rounded-[35px] bg-white font-['Inter']">
      {/* ================= STATUS BAR ================= */}
      <div className="absolute left-0 top-0 flex h-[62px] w-full items-center justify-between px-4 pt-[21px]">
        {/* Time */}
        <div className="flex h-[22px] w-[121px] items-center justify-center">
          <span className="text-[17px] font-semibold leading-[22px] text-black">
            9:41
          </span>
        </div>

        {/* Status icons */}
        <div className="flex h-[22px] w-[121px] items-center justify-end gap-[7px]">
          {/* Cellular */}
          <div className="flex h-[13px] w-[19px] items-end gap-[2px]">
            <span className="h-[5px] w-[3px] rounded-sm bg-black" />
            <span className="h-[7px] w-[3px] rounded-sm bg-black" />
            <span className="h-[10px] w-[3px] rounded-sm bg-black" />
            <span className="h-[13px] w-[3px] rounded-sm bg-black" />
          </div>

          {/* Wifi */}
          <div className="relative h-[13px] w-[18px]">
            <div className="absolute left-1/2 top-0 h-[12px] w-[18px] -translate-x-1/2 rounded-t-full border-t-[3px] border-black" />
            <div className="absolute left-1/2 top-[5px] h-[7px] w-[11px] -translate-x-1/2 rounded-t-full border-t-[3px] border-black" />
            <div className="absolute bottom-0 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-black" />
          </div>

          {/* Battery */}
          <div className="relative h-[13px] w-[27px] rounded-[4px] border border-black/35 p-[2px]">
            <div className="h-full w-[21px] rounded-[2px] bg-black" />
            <div className="absolute -right-[3px] top-[4px] h-[5px] w-[2px] rounded-r bg-black/40" />
          </div>
        </div>
      </div>

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
        className="absolute left-[364px] top-[67px] flex h-10 w-10 items-center justify-center rounded-lg bg-[#008000]"
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
      <div className="absolute left-6 top-[120px] flex h-[35px] items-center gap-4">
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
      <section className="absolute left-6 top-[187px] w-[380px]">
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
      <section className="absolute left-6 top-[488px] w-[328px]">
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
      <section className="absolute left-6 top-[673px] w-[380px]">
        <h2 className="text-[16px] font-bold leading-[19px] text-[#1F2937]">
          Popular Categories
        </h2>

        <div className="mt-4 flex h-[115px] gap-2 overflow-hidden">
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
      <div className="absolute bottom-0 left-1/2 h-6 w-[412px] -translate-x-1/2">
        <div className="absolute left-1/2 top-1/2 h-1 w-[108px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
      </div>
    </div>
  );
}

export default Search;