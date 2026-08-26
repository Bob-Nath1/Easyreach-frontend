import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Wrench,
  MapPin,
  Navigation,
  CreditCard,
  Banknote,
  Smartphone,
  Info,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Phone,
  Check,
} from "lucide-react";

function ConfirmBooking() {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [agreed, setAgreed] = useState(false);

  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleProceed = () => {
    if (!agreed) {
      alert("Please agree to the booking terms and conditions.");
      return;
    }

    // Change this route to your next booking/payment page
    navigate("/book-keeping?role=seeker");
  };

  return (
    <div className="relative mx-auto h-[925px] w-[428px] overflow-hidden rounded-[35px] bg-[#F9FAFB] font-['Inter']">
      
      {/* ================= STATUS BAR ================= */}
      <div className="absolute left-0 top-0 flex h-[62px] w-full items-center justify-between px-4 pt-1">
        <span className="w-[121px] text-center text-[17px] font-semibold text-black">
          9:41
        </span>

        <div className="flex w-[121px] items-center justify-end gap-2">
          {/* Cellular */}
          <div className="flex h-[14px] items-end gap-[2px]">
            <span className="h-[5px] w-[3px] rounded-sm bg-black" />
            <span className="h-[8px] w-[3px] rounded-sm bg-black" />
            <span className="h-[11px] w-[3px] rounded-sm bg-black" />
            <span className="h-[14px] w-[3px] rounded-sm bg-black" />
          </div>

          {/* Wifi */}
          <div className="text-[14px] font-bold">⌁</div>

          {/* Battery */}
          <div className="relative h-[13px] w-[27px] rounded-[4px] border border-black/40">
            <div className="absolute left-[2px] top-[2px] h-[7px] w-[20px] rounded-[2px] bg-black" />
            <div className="absolute -right-[3px] top-[4px] h-[5px] w-[2px] rounded-r bg-black/40" />
          </div>
        </div>
      </div>

      {/* ================= HEADER ================= */}
      <div className="absolute left-1/2 top-[62px] flex h-[75px] w-[430px] -translate-x-1/2 items-center justify-between border border-[#E5E7EB] bg-white px-6 pb-4 pt-1">
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate(-1)}
            className="flex h-6 w-6 items-center justify-center"
          >
            <ArrowLeft size={24} strokeWidth={2} />
          </button>

          <div>
            <p className="text-[20px] font-bold leading-6 text-[#1F2937]">
              Confirm Booking
            </p>
          </div>
        </div>

        <span className="absolute left-[72px] top-[-11px] text-[12px] text-[#6B7280]">
          Step 1 of 2
        </span>
      </div>

      {/* ================= SCROLLABLE CONTENT ================= */}
      <div className="absolute left-6 top-[161px] h-[725px] w-[380px] overflow-y-auto pb-8 pr-0 scrollbar-hide">
        <div className="flex flex-col gap-6">

          {/* ================= PROVIDER CARD ================= */}
          <div className="flex min-h-[138px] w-full items-center gap-3 rounded-[24px] bg-[rgba(0,128,0,0.8)] px-4 py-8">
            
            {/* Provider image */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
              <div className="flex h-full w-full items-center justify-center bg-gray-100 text-2xl">
                🔧
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-[20px] font-bold leading-6 text-white">
                Booking with Timi Motors
              </h2>

              <p className="text-[14px] leading-[17px] text-white">
                4.8 (124 reviews)
              </p>

              <p className="text-[14px] leading-[17px] text-white">
                1.2km away from you
              </p>
            </div>
          </div>

          {/* ================= SERVICE DETAILS ================= */}
          <div className="rounded-[24px] bg-white p-4">
            <div className="flex flex-col gap-6">

              {/* Title */}
              <div className="flex items-center gap-2">
                <Wrench size={18} className="text-[#008000]" />
                <h3 className="text-[16px] font-bold italic text-[#1F2937]">
                  Service Details
                </h3>
              </div>

              <div className="flex flex-col gap-5">

                {/* Service */}
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[14px] text-[#6B7280]">
                      Service
                    </span>

                    <span className="text-right text-[15px] font-bold italic text-[#1F2937]">
                      Auto Repair - Engine Check
                    </span>
                  </div>

                  <div className="mt-3 border-t border-[#F3F4F6]" />
                </div>

                {/* Request */}
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <span className="shrink-0 text-[14px] text-[#6B7280]">
                      Your request:
                    </span>

                    <p className="text-right text-[14px] leading-[17px] text-[#1F2937]">
                      Need urgent car engine repair service - Making strange
                      noises
                    </p>
                  </div>

                  <button className="mt-3 flex w-full items-center justify-end gap-1">
                    <span className="text-[12px] font-bold italic text-[#008000]">
                      View full details
                    </span>
                    <span className="text-[#008000]">›</span>
                  </button>

                  <div className="mt-3 border-t border-[#F3F4F6]" />
                </div>

                {/* Date */}
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[14px] text-[#6B7280]">
                      Date & Time
                    </span>

                    <span className="text-right text-[15px] font-bold italic text-[#1F2937]">
                      Today, Jan 16, 3:00 PM
                    </span>
                  </div>

                  <div className="mt-3 border-t border-[#F3F4F6]" />
                </div>

                {/* Duration */}
                <div>
                  

                  <div className="mt-3 border-t border-[#F3F4F6]" />
                </div>

                {/* Completion */}
                <div>

                  <div className="mt-3 border-t border-[#F3F4F6]" />
                </div>

                {/* Change date */}
                <button className="flex items-center gap-2">
                  <Navigation
                    size={14}
                    className="text-[#008000]"
                  />

                  <span className="text-[14px] font-bold italic text-[#008000]">
                    Change date/time
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* ================= LOCATION ================= */}
          <div className="rounded-[15px] bg-[#F0FDF4] p-4">
            <div className="flex flex-col gap-4">

              <div className="flex items-center gap-2">
                <MapPin size={24} className="text-[#008000]" />

                <h3 className="text-[16px] font-bold italic text-[#1F2937]">
                  Service Location
                </h3>
              </div>

              <div>
                <p className="text-[15px] font-bold italic text-[#1F2937]">
                  23 Allen Avenue, Ikeja, Lagos
                </p>

                <p className="mt-2 text-[13px] text-[#6B7280]">
                  This is where the provider will come
                </p>
              </div>

              <button className="flex items-center gap-2">
                <Navigation size={14} className="text-[#008000]" />

                <span className="text-[14px] font-bold italic text-[#008000]">
                  Change location
                </span>
              </button>
            </div>
          </div>

          {/* ================= PRICE BREAKDOWN ================= */}
          <div className="rounded-[24px] bg-white px-4 py-6">
            <div className="flex flex-col gap-8">

              {/* Heading */}
              <div className="flex items-center gap-2">
                <CreditCard size={18} className="text-[#008000]" />

                <h3 className="text-[16px] font-bold italic text-[#1F2937]">
                  Price Breakdown
                </h3>
              </div>

              {/* Price Items */}
              <div className="flex flex-col gap-4">

                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-[#6B7280]">
                    Service - Engine Repair
                  </span>

                  <span className="text-[14px] font-bold italic text-[#1F2937]">
                    ₦18,000
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-[#6B7280]">
                    Parts & Materials
                  </span>

                  <span className="text-[14px] font-bold italic text-[#1F2937]">
                    Included
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-[#6B7280]">
                    Labor
                  </span>

                  <span className="text-[14px] font-bold italic text-[#1F2937]">
                    Included
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-[#6B7280]">
                    Transport/Travel
                  </span>

                  <span className="text-[14px] font-bold italic text-[#1F2937]">
                    Free (within 5km)
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-[#6B7280]">
                    EasyReach Service Fee
                  </span>

                  <span className="text-[14px] font-bold italic text-[#1F2937]">
                    ₦900 (5%)
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between">
                <span className="text-[20px] font-bold italic text-[#1F2937]">
                  Total Amount
                </span>

                <span className="text-[20px] font-bold italic text-[#008000]">
                  ₦18,900
                </span>
              </div>

              {/* ================= PAYMENT METHODS ================= */}
              <div className="flex flex-col gap-2">

                {/* Cash */}
                <button
                  onClick={() => setPaymentMethod("cash")}
                  className={`flex h-[52px] w-full items-center gap-4 rounded-xl border-[1.5px] p-4 text-left transition ${
                    paymentMethod === "cash"
                      ? "border-[#008000] bg-[#F0FDF4]"
                      : "border-[#E5E7EB] bg-white"
                  }`}
                >
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full border-[1.5px] ${
                      paymentMethod === "cash"
                        ? "border-[#008000]"
                        : "border-[#E5E7EB]"
                    }`}
                  >
                    {paymentMethod === "cash" && (
                      <div className="h-2.5 w-2.5 rounded-full bg-[#008000]" />
                    )}
                  </div>

                  <Banknote
                    size={20}
                    className={
                      paymentMethod === "cash"
                        ? "text-[#008000]"
                        : "text-[#6B7280]"
                    }
                  />

                  <span className="text-[16px] font-bold italic text-[#1F2937]">
                    Cash
                  </span>
                </button>

                {/* Card */}
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`flex h-[52px] w-full items-center gap-4 rounded-xl border-[1.5px] p-4 text-left ${
                    paymentMethod === "card"
                      ? "border-[#008000] bg-[#F0FDF4]"
                      : "border-[#E5E7EB] bg-white"
                  }`}
                >
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full border-[1.5px] ${
                      paymentMethod === "card"
                        ? "border-[#008000]"
                        : "border-[#E5E7EB]"
                    }`}
                  >
                    {paymentMethod === "card" && (
                      <div className="h-2.5 w-2.5 rounded-full bg-[#008000]" />
                    )}
                  </div>

                  <CreditCard
                    size={20}
                    className={
                      paymentMethod === "card"
                        ? "text-[#008000]"
                        : "text-[#6B7280]"
                    }
                  />

                  <span className="text-[16px] font-bold italic text-[#1F2937]">
                    Debit/Credit Card
                  </span>
                </button>

                {/* Mobile Money */}
                <button
                  onClick={() => setPaymentMethod("mobile")}
                  className={`flex h-[52px] w-full items-center gap-4 rounded-xl border-[1.5px] p-4 text-left ${
                    paymentMethod === "mobile"
                      ? "border-[#008000] bg-[#F0FDF4]"
                      : "border-[#E5E7EB] bg-white"
                  }`}
                >
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full border-[1.5px] ${
                      paymentMethod === "mobile"
                        ? "border-[#008000]"
                        : "border-[#E5E7EB]"
                    }`}
                  >
                    {paymentMethod === "mobile" && (
                      <div className="h-2.5 w-2.5 rounded-full bg-[#008000]" />
                    )}
                  </div>

                  <Smartphone
                    size={20}
                    className={
                      paymentMethod === "mobile"
                        ? "text-[#008000]"
                        : "text-[#6B7280]"
                    }
                  />

                  <span className="text-[16px] font-bold italic text-[#1F2937]">
                    Mobile Money
                  </span>
                </button>
              </div>

              {/* Payment Note */}
              <div className="flex items-center gap-2">
                <Info size={16} className="text-[#008000]" />

                <span className="text-[13px] text-[#6B7280]">
                  You'll pay after service completion
                </span>
              </div>
            </div>
          </div>

          {/* ================= TERMS ================= */}
          <div className="flex items-center gap-3 px-4">
            <button
              onClick={() => setAgreed(!agreed)}
              className={`flex h-[15px] w-[15px] shrink-0 items-center justify-center border ${
                agreed
                  ? "border-[#008000] bg-[#008000]"
                  : "border-black bg-white"
              }`}
            >
              {agreed && <Check size={12} color="white" />}
            </button>

            <p className="text-[14px] text-[#1F2937]">
              I agree to the{" "}
              <button className="font-bold italic text-[#008000]">
                booking terms and conditions
              </button>
            </p>
          </div>

          {/* ================= ACCORDIONS ================= */}
          <div className="flex flex-col gap-3">

            {/* Cancellation */}
            <div className="bg-white">
              <button
                onClick={() => toggleSection("cancellation")}
                className="flex h-[49px] w-full items-center justify-between px-4"
              >
                <span className="text-[14px] font-bold text-[#1F2937]">
                  Cancellation Policy
                </span>

                {openSection === "cancellation" ? (
                  <ChevronUp size={16} className="text-[#6B7280]" />
                ) : (
                  <ChevronDown size={16} className="text-[#6B7280]" />
                )}
              </button>

              {openSection === "cancellation" && (
                <div className="px-4 pb-4 text-[13px] leading-5 text-[#6B7280]">
                  You can cancel your booking before the provider begins the
                  service. Cancellation charges may apply depending on the
                  timing.
                </div>
              )}
            </div>

            {/* Guarantee */}
            <div className="bg-white">
              <button
                onClick={() => toggleSection("guarantee")}
                className="flex h-[49px] w-full items-center justify-between px-4"
              >
                <span className="text-[14px] font-bold text-[#1F2937]">
                  Service Guarantee
                </span>

                {openSection === "guarantee" ? (
                  <ChevronUp size={16} className="text-[#6B7280]" />
                ) : (
                  <ChevronDown size={16} className="text-[#6B7280]" />
                )}
              </button>

              {openSection === "guarantee" && (
                <div className="px-4 pb-4 text-[13px] leading-5 text-[#6B7280]">
                  Your service is covered by the EasyReach service guarantee.
                </div>
              )}
            </div>

            {/* Payment Terms */}
            <div className="bg-white">
              <button
                onClick={() => toggleSection("payment")}
                className="flex h-[49px] w-full items-center justify-between px-4"
              >
                <span className="text-[14px] font-bold text-[#1F2937]">
                  Payment Terms
                </span>

                {openSection === "payment" ? (
                  <ChevronUp size={16} className="text-[#6B7280]" />
                ) : (
                  <ChevronDown size={16} className="text-[#6B7280]" />
                )}
              </button>

              {openSection === "payment" && (
                <div className="px-4 pb-4 text-[13px] leading-5 text-[#6B7280]">
                  Payment is made after the service has been completed and
                  confirmed.
                </div>
              )}
            </div>
          </div>

          {/* ================= BOTTOM ACTIONS ================= */}
          <div className="rounded-[15px] bg-white p-4">
            <div className="flex flex-col gap-8">

              {/* Proceed */}
              <button
                onClick={handleProceed}
                className="flex h-[52px] w-full items-center justify-center rounded-full border-2 border-[#008000] bg-[#008000] px-3 text-[14px] font-semibold text-white transition active:scale-[0.98]"
              >
                Proceed
              </button>

              {/* Contact */}
              <div className="flex flex-col gap-8">
                <p className="text-center text-[14px] text-[#6B7280]">
                  Need to discuss details?
                </p>

                <div className="flex items-center gap-[22px]">

                  {/* Message */}
                  <button className="flex h-12 w-[197px] items-center gap-2 rounded-[15px] border-[1.5px] border-[#008000] bg-white px-4">
                    <MessageSquare
                      size={15}
                      className="text-[#008000]"
                    />

                    <span className="text-[14px] font-bold text-[#008000]">
                      Message Timi Motors
                    </span>
                  </button>

                  {/* Call */}
                  <button className="flex h-12 w-[129px] items-center gap-2 rounded-[15px] border-[1.5px] border-[#008000] bg-white px-4">
                    <Phone
                      size={14}
                      className="text-[#008000]"
                    />

                    <span className="text-[14px] font-bold text-[#008000]">
                      Call Provider
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Extra bottom spacing */}
          <div className="h-8" />
        </div>
      </div>

      {/* ================= IPHONE HOME INDICATOR ================= */}
      <div className="absolute bottom-[-1px] left-1/2 h-6 w-[412px] -translate-x-1/2 bg-transparent">
        <div className="absolute left-1/2 top-1/2 h-1 w-[108px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-[#1F2937]" />
      </div>
    </div>

  );
}

export default ConfirmBooking;