

import { useState } from "react";
import {
  ArrowLeft,
  Wifi,
  Signal,
  Battery,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const RespondReq = () => {
  const navigate = useNavigate();

  const [availability, setAvailability] = useState("Today");
  const [selectedDays, setSelectedDays] = useState(["Wednesday"]);
  const [quoteType, setQuoteType] = useState("fixed");
  const [price, setPrice] = useState("10500");
  const [agreed, setAgreed] = useState(false);

  const availabilityOptions = [
    "Today",
    "Tomorrow",
    "This Week",
    "Next Week",
  ];

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day)
        ? prev.filter((item) => item !== day)
        : [...prev, day]
    );
  };

  const formatPrice = (value) => {
    if (!value) return "";
    return Number(value.replace(/\D/g, "")).toLocaleString("en-NG");
  };

  const handleSendResponse = () => {
    if (!price || !agreed) {
      alert("Please enter your quote and agree to the service terms.");
      return;
    }

    alert(`Response sent successfully! Quote: ₦${formatPrice(price)}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      {/* Main Mobile Container */}
      <div className="relative w-full max-w-[428px] min-h-[1176px] bg-white overflow-hidden">
        
        {/* Status Bar */}
        <div className="h-[62px] flex items-center justify-between px-6 pt-2">
          <div className="w-[121px]">
            <span className="text-[17px] font-semibold text-black">
              9:41
            </span>
          </div>

          <div className="w-[121px] flex justify-end items-center gap-2">
            <Signal size={19} fill="black" />
            <Wifi size={18} fill="black" />
            <Battery size={25} fill="black" />
          </div>
        </div>

        {/* Header */}
        <div className="h-[56px] flex items-center gap-6 px-6 bg-white">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center"
          >
            <ArrowLeft size={24} className="text-[#1F2937]" />
          </button>

          <h1 className="text-[20px] leading-6 font-bold text-[#1F2937]">
            Service Requests
          </h1>
        </div>

        {/* Customer Information */}
        <div className="h-[56px] bg-[#F8FAFC] px-6 flex items-center gap-[13px]">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-white">
            <img
              src="/images/profile.jpg"
              alt="John Daniels"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="text-[14px] font-bold leading-[17px] text-[#0F172A]">
              John Daniels
            </h2>

            <p className="text-[12px] leading-[15px] text-[#64748B]">
              Auto Repair - Engine Check
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pt-4 pb-10">

          {/* Your Availability */}
          <div className="mt-3">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-[14px] font-bold text-[#0F172A]">
                YOUR AVAILABILITY
              </h3>
              <span className="text-red-600">*</span>
            </div>

            {/* Availability Period */}
            <div className="flex gap-2 mb-5 overflow-x-auto">
              {availabilityOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setAvailability(option)}
                  className={`h-[41px] px-4 rounded-lg text-[14px] whitespace-nowrap transition ${
                    availability === option
                      ? "bg-[#008000] text-white border border-[#008000]"
                      : "bg-[#F8FAFC] text-[#64748B] border border-[#E5E7EB]"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Days */}
            <div className="flex flex-wrap gap-2">
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => toggleDay(day)}
                  className={`w-[121px] h-[45px] rounded-lg text-[14px] transition ${
                    selectedDays.includes(day)
                      ? "bg-[#008000] text-white"
                      : "bg-[#F8FAFC] border border-[#E5E7EB] text-[#64748B]"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>

            {/* Additional Time Options */}
            <div className="mt-10">
              <div className="flex gap-3 mb-4">
                {["Morning", "Afternoon", "Evening", "Flexible"].map(
                  (time) => (
                    <button
                      key={time}
                      onClick={() => setAvailability(time)}
                      className={`px-4 h-[41px] rounded-lg text-[14px] ${
                        availability === time
                          ? "bg-[#008000] text-white"
                          : "bg-[#F8FAFC] border border-[#E5E7EB] text-[#64748B]"
                      }`}
                    >
                      {time}
                    </button>
                  )
                )}
              </div>

              <div className="flex gap-3">
                {["1 Hour", "2 Hours", "Half Day", "Full Day"].map(
                  (duration) => (
                    <button
                      key={duration}
                      className="h-[41px] px-4 rounded-lg bg-[#F8FAFC] border border-[#E5E7EB] text-[14px] text-[#64748B]"
                    >
                      {duration}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Your Quote */}
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-[14px] font-bold text-[#0F172A]">
                YOUR QUOTE
              </h3>
              <span className="text-red-600">*</span>
            </div>

            <p className="text-[12px] text-[#64748B] mb-3">
              Duration estimate
            </p>

            {/* Fixed Price */}
            <button
              onClick={() => setQuoteType("fixed")}
              className={`w-full h-[72px] flex items-start gap-3 p-4 rounded-[15px] mb-2 text-left ${
                quoteType === "fixed"
                  ? "bg-[#F0FDF4] border-[1.5px] border-[#008000]"
                  : "bg-white border-[1.5px] border-[#E5E7EB]"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center ${
                  quoteType === "fixed"
                    ? "border-[#008000]"
                    : "border-[#D1D5DB]"
                }`}
              >
                {quoteType === "fixed" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#008000]" />
                )}
              </div>

              <div>
                <h4 className="text-[14px] font-bold text-[#0F172A]">
                  Fixed Price
                </h4>
                <p className="text-[12px] text-[#64748B] mt-1">
                  I can quote exactly now
                </p>
              </div>
            </button>

            {/* Alternative Quote Option */}
            <button
              onClick={() => setQuoteType("estimate")}
              className={`w-full h-[72px] flex items-start gap-3 p-4 rounded-[15px] mb-2 text-left ${
                quoteType === "estimate"
                  ? "bg-[#F0FDF4] border-[1.5px] border-[#008000]"
                  : "bg-white border-[1.5px] border-[#E5E7EB]"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center ${
                  quoteType === "estimate"
                    ? "border-[#008000]"
                    : "border-[#D1D5DB]"
                }`}
              >
                {quoteType === "estimate" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#008000]" />
                )}
              </div>

              <div>
                <h4 className="text-[14px] font-bold text-[#0F172A]">
                  Price Estimate
                </h4>
                <p className="text-[12px] text-[#64748B] mt-1">
                  Final price may vary
                </p>
              </div>
            </button>

            {/* Another Option */}
            <button
              onClick={() => setQuoteType("inspection")}
              className={`w-full h-[72px] flex items-start gap-3 p-4 rounded-[15px] text-left ${
                quoteType === "inspection"
                  ? "bg-[#F0FDF4] border-[1.5px] border-[#008000]"
                  : "bg-white border-[1.5px] border-[#E5E7EB]"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center ${
                  quoteType === "inspection"
                    ? "border-[#008000]"
                    : "border-[#D1D5DB]"
                }`}
              >
                {quoteType === "inspection" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#008000]" />
                )}
              </div>

              <div>
                <h4 className="text-[14px] font-bold text-[#0F172A]">
                  Inspection Required
                </h4>
                <p className="text-[12px] text-[#64748B] mt-1">
                  Price will be confirmed after inspection
                </p>
              </div>
            </button>

            {/* Price Input */}
            <div className="mt-4 flex items-center gap-3">
              <label className="text-[16px] font-bold text-black whitespace-nowrap">
                Input Price
              </label>

              <div className="flex-1 h-[60px] bg-[#F0FDF4] border-[1.5px] border-[#008000] flex items-center justify-center px-4">
                <span className="text-[#047857] font-bold text-[24px] mr-1">
                  ₦
                </span>

                <input
                  type="text"
                  value={formatPrice(price)}
                  onChange={(e) =>
                    setPrice(e.target.value.replace(/\D/g, ""))
                  }
                  className="w-full bg-transparent outline-none text-center text-[24px] font-bold text-[#047857]"
                />
              </div>
            </div>
          </div>

          {/* Agreement */}
          <div className="mt-6 w-full min-h-[68px] bg-[#F8FAFC] rounded-[15px] p-4 flex items-start gap-[15px]">
            <button
              onClick={() => setAgreed(!agreed)}
              className={`w-[15px] h-[15px] mt-1 border flex-shrink-0 flex items-center justify-center ${
                agreed
                  ? "bg-[#008000] border-[#008000]"
                  : "bg-white border-black"
              }`}
            >
              {agreed && <Check size={11} className="text-white" />}
            </button>

            <p className="text-[12px] leading-[18px] text-[#64748B]">
              I agree to{" "}
              <button className="font-bold underline text-[#047857]">
                EasyReach service terms
              </button>{" "}
              and confirm all information provided is accurate.
            </p>
          </div>

          {/* Send Response */}
          <div className="mt-4 flex flex-col items-center gap-3">
            <p className="text-[12px] text-[#64748B] text-center">
              Customer will see your quote within 5 minutes
            </p>

            <button
              onClick={handleSendResponse}
              className="w-full h-[50px] bg-[#008000] rounded-full text-white text-[16px] font-bold hover:bg-green-700 transition"
            >
              Send Response
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RespondReq;
