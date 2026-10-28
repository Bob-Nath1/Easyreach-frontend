import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const API_URL = "http://localhost:5000";
const DISTANCE_RANGES = [1, 2, 5, 10];

const formatPrice = (value) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(Number(value));

function Pricing() {
  const navigate = useNavigate();

  const [serviceCategory, setServiceCategory] = useState("");
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [savingRange, setSavingRange] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Load the provider's actual profession and saved prices.
  useEffect(() => {
    const fetchProfileAndPrices = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Please log in as a provider.");
        }

        const profileResponse = await fetch(
          `${API_URL}/api/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const profileData = await profileResponse.json();

        if (!profileResponse.ok) {
          throw new Error(
            profileData.message || "Unable to load your profile."
          );
        }

        const user = profileData.user;

        if (user?.role !== "provider") {
          throw new Error("This page is only available to providers.");
        }

        const category = user.serviceCategory?.trim();

        if (!category) {
          throw new Error(
            "Your profession is missing from your profile. Please update your profile before setting prices."
          );
        }

        setServiceCategory(category);

        const pricesResponse = await fetch(
          `${API_URL}/api/pricing`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const pricesData = await pricesResponse.json();

        if (!pricesResponse.ok) {
          throw new Error(
            pricesData.message || "Unable to load saved prices."
          );
        }

        const savedPrices = {};

        (pricesData.prices || [])
          .filter(
            (item) =>
              item.serviceCategory?.trim().toLowerCase() ===
              category.toLowerCase()
          )
          .forEach((item) => {
            savedPrices[item.distanceRangeKm] = String(item.price);
          });

        setPrices(savedPrices);
      } catch (err) {
        setError(err.message || "Unable to load pricing.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndPrices();
  }, []);

  const handlePriceChange = (range, value) => {
    setPrices((previous) => ({
      ...previous,
      [range]: value,
    }));

    setMessage("");
    setError("");
  };

  const handleSavePrice = async (range) => {
    setError("");
    setMessage("");

    const value = prices[range];

    if (value === undefined || value.trim() === "") {
      setError(`Enter a price for ${range} km.`);
      return;
    }

    const amount = Number(value);

    if (!Number.isSafeInteger(amount) || amount < 0) {
      setError("Enter a valid whole-number price of ₦0 or more.");
      return;
    }

    try {
      setSavingRange(range);

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please log in as a provider.");
      }

      const response = await fetch(`${API_URL}/api/pricing`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          serviceCategory,
          distanceRangeKm: range,
          price: amount,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save price.");
      }

      setPrices((previous) => ({
        ...previous,
        [range]: String(data.price.price),
      }));

      setMessage(`${range} km ${serviceCategory} price saved successfully.`);
    } catch (err) {
      setError(err.message || "Unable to save price.");
    } finally {
      setSavingRange(null);
    }
  };

  return (
    <div className="relative mx-auto min-h-[926px] w-full overflow-hidden rounded-[35px] bg-[#F9FAFB] font-['Inter',sans-serif]">
      <main className="mx-auto w-full max-w-3xl px-5 pb-12 pt-12 sm:px-8">
        <header className="mb-8 flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate("/dashboardprov")}
            aria-label="Back to provider dashboard"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white"
          >
            <ArrowLeft size={22} />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-[#1F2937]">
              Manage Pricing
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Set your {serviceCategory || "service"} prices by distance.
            </p>
          </div>
        </header>

        <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6">
            <p className="mb-2 text-sm font-semibold text-gray-700">
              Your profession
            </p>
            <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base font-semibold text-gray-800">
              {serviceCategory || "Loading profession..."}
            </div>
            <p className="mt-2 text-xs text-gray-500">
              This category comes from your provider profile.
            </p>
          </div>

          <h2 className="mb-1 text-lg font-bold text-gray-800">
            Distance-based prices
          </h2>

          <p className="mb-5 text-sm text-gray-500">
            Enter the amount you charge for each service distance.
          </p>

          {loading ? (
            <p className="py-8 text-center text-sm text-gray-500">
              Loading your profile and saved prices...
            </p>
          ) : error && !serviceCategory ? (
            <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
              {error}
              <button
                type="button"
                onClick={() => navigate("/editprofile")}
                className="mt-3 block font-semibold underline"
              >
                Update profile
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {DISTANCE_RANGES.map((range) => (
                <div
                  key={range}
                  className="rounded-xl border border-gray-200 p-4"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-gray-800">
                        Up to {range} km
                      </p>
                      <p className="text-xs text-gray-500">
                        {range === 1
                          ? "Short-distance service"
                          : `${range} kilometre service range`}
                      </p>
                    </div>

                    {prices[range] !== undefined &&
                      prices[range] !== "" && (
                        <span className="text-xs font-medium text-green-700">
                          Saved price
                        </span>
                      )}
                  </div>

                  <label
                    htmlFor={`price-${range}`}
                    className="mb-2 block text-sm text-gray-600"
                  >
                    Price (₦)
                  </label>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <input
                      id={`price-${range}`}
                      type="number"
                      min="0"
                      step="1"
                      inputMode="numeric"
                      value={prices[range] ?? ""}
                      onChange={(event) =>
                        handlePriceChange(range, event.target.value)
                      }
                      placeholder="Enter your price"
                      className="min-w-0 flex-1 rounded-xl border border-gray-300 px-4 py-3 text-base outline-none focus:border-[#008000]"
                    />

                    <button
                      type="button"
                      onClick={() => handleSavePrice(range)}
                      disabled={savingRange !== null}
                      className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#008000] px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Save size={17} />
                      {savingRange === range ? "Saving..." : "Save"}
                    </button>
                  </div>

                  {prices[range] !== undefined &&
                    prices[range] !== "" &&
                    Number.isSafeInteger(Number(prices[range])) &&
                    Number(prices[range]) >= 0 && (
                      <p className="mt-2 text-sm text-gray-500">
                        Preview: {formatPrice(prices[range])}
                      </p>
                    )}
                </div>
              ))}
            </div>
          )}

          {message && (
            <p className="mt-5 flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-800">
              <CheckCircle size={18} />
              {message}
            </p>
          )}

          {error && serviceCategory && (
            <p className="mt-5 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
              <AlertCircle size={18} />
              {error}
            </p>
          )}
        </section>
      </main>
    </div>
  );
}

export default Pricing;
