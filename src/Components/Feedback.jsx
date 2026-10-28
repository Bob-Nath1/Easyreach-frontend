import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Star,
  MessageSquare,
  LoaderCircle,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const API_URL = "http://localhost:5000";

const aspects = [
  { name: "Quality of Work", key: "qualityOfWork" },
  { name: "Professionalism", key: "professionalism" },
  { name: "Communication", key: "communication" },
  { name: "Punctuality", key: "punctuality" },
  { name: "Value for Money", key: "valueForMoney" },
];

const emptyRatings = {
  qualityOfWork: 0,
  professionalism: 0,
  communication: 0,
  punctuality: 0,
  valueForMoney: 0,
};

function Feedback() {
  const navigate = useNavigate();
  const location = useLocation();

  const storedUser = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const isProvider = storedUser?.role === "provider";

  // Pass requestId when navigating to this page.
  const requestId =
    location.state?.requestId ??
    location.state?.serviceRequestId ??
    location.state?.request?.id ??
    location.state?.serviceRequest?.id;

  const selectedRequest =
    location.state?.request ??
    location.state?.serviceRequest ??
    {};

  const selectedProvider =
    location.state?.provider ??
    selectedRequest?.provider ??
    {};

  const [rating, setRating] = useState(0);
  const [aspectRatings, setAspectRatings] =
    useState(emptyRatings);
  const [comment, setComment] = useState("");

  const [feedbackData, setFeedbackData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = localStorage.getItem("token");

  // ================= LOAD PROVIDER FEEDBACK =================
  useEffect(() => {
    if (!isProvider) return;

    let cancelled = false;

    const fetchFeedback = async () => {
      if (!requestId) {
        setError(
          "No service request was selected. Open feedback from a completed booking."
        );
        return;
      }

      if (!token) {
        setError("Please log in to view feedback.");
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/feedback/${requestId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to load feedback."
          );
        }

        if (!cancelled) {
          setFeedbackData(data.feedback);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.message || "Unable to load feedback."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchFeedback();

    return () => {
      cancelled = true;
    };
  }, [isProvider, requestId, token]);

  // ================= RATINGS =================
  const handleAspectRating = (key, value) => {
    setAspectRatings((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  // ================= SUBMIT FEEDBACK =================
  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!requestId) {
      setError(
        "No service request was selected. Open feedback from a completed booking."
      );
      return;
    }

    if (!token) {
      setError("Please log in before submitting feedback.");
      return;
    }

    if (rating < 1 || rating > 5) {
      setError("Please select an overall rating.");
      return;
    }

    const missingAspect = aspects.find(
      (aspect) => aspectRatings[aspect.key] < 1
    );

    if (missingAspect) {
      setError(
        `Please rate ${missingAspect.name.toLowerCase()}.`
      );
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch(
        `${API_URL}/api/feedback/${requestId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            overallRating: rating,
            ...aspectRatings,
            comment: comment.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to submit feedback."
        );
      }

      setSuccess("Your feedback was submitted successfully.");
      setFeedbackData(data.feedback);
    } catch (err) {
      setError(
        err.message || "Unable to submit feedback."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const displayRating = isProvider
    ? feedbackData?.overallRating || 0
    : rating;

  const displayAspectRatings = isProvider
    ? {
        qualityOfWork: feedbackData?.qualityOfWork || 0,
        professionalism: feedbackData?.professionalism || 0,
        communication: feedbackData?.communication || 0,
        punctuality: feedbackData?.punctuality || 0,
        valueForMoney: feedbackData?.valueForMoney || 0,
      }
    : aspectRatings;

  const displayName = isProvider
    ? feedbackData?.seekerName || "Seeker"
    : selectedProvider?.fullName ||
      selectedProvider?.name ||
      "Your service provider";

  const serviceName =
    selectedRequest?.serviceCategory ||
    selectedRequest?.service ||
    selectedProvider?.serviceCategory ||
    "Completed service";

  const formatDate = (value) => {
    if (!value) return "";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "";

    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const serviceDate = formatDate(
    selectedRequest?.serviceDateTime
  );

  const feedbackDate = formatDate(
    feedbackData?.createdAt
  );

  return (
    <div
      className="
        relative mx-auto h-[926px] w-full
        sm:w-[640px] md:w-[768px] lg:w-[1024px]
        xl:w-[1280px] 2xl:w-[1536px]
        md:h-[1026px] lg:h-[1200px]
        xl:h-[1200px] 2xl:h-[1200px]
        overflow-hidden rounded-[35px]
        bg-[#F9FAFB] font-['Inter',sans-serif]
      "
    >
      {/* BACK BUTTON */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        aria-label="Go back"
        className="
          absolute left-6 top-[70px]
          flex h-8 w-8 items-center justify-center
          rounded-full bg-[#F3F4F6]
        "
      >
        <ArrowLeft
          size={17}
          strokeWidth={2.5}
          className="text-black"
        />
      </button>

      {/* MAIN CONTENT */}
      <div
        className="
          absolute left-6 right-6 top-[74px]
          bottom-[132px] flex flex-col items-center
          gap-[30px] overflow-y-auto pb-5
          scrollbar-hide
        "
      >
        {/* PROFILE / PAGE TITLE */}
        <div className="flex w-full max-w-[380px] flex-col items-center gap-6">
          <h1 className="text-center text-[18px] font-bold text-[#1F2937]">
            {isProvider
              ? "Service Feedback"
              : "Rate Your Experience"}
          </h1>

          <div
            className="
              flex h-[100px] w-[100px] items-center
              justify-center overflow-hidden rounded-full
              bg-[#D1FAE5] text-[32px] font-bold
              text-[#008000] shadow-sm
            "
          >
            {displayName.charAt(0).toUpperCase()}
          </div>

          <div className="flex flex-col items-center gap-2">
            <h2 className="text-center text-[20px] font-bold text-[#1F2937]">
              {displayName}
            </h2>
            
<p className="text-center text-[14px] text-[#6B7280]">
  {isProvider ? "Client" : serviceName}
</p>

            {(isProvider ? feedbackDate : serviceDate) && (
              <p className="text-center text-[12px] text-[#9CA3AF]">
                {isProvider ? feedbackDate : serviceDate}
              </p>
            )}

            {requestId && (
              <p className="text-[11px] text-[#9CA3AF]">
                Request #{requestId}
              </p>
            )}
          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <LoaderCircle size={18} className="animate-spin" />
            Loading feedback...
          </div>
        )}

        {/* ERROR / SUCCESS */}
        {error && (
          <p
            role="alert"
            className="w-full max-w-[380px] rounded-xl bg-red-50 p-3 text-center text-sm text-red-600"
          >
            {error}
          </p>
        )}

        {success && (
          <p
            role="status"
            className="w-full max-w-[380px] rounded-xl bg-green-50 p-3 text-center text-sm text-[#008000]"
          >
            {success}
          </p>
        )}

        {/* RATINGS */}
        {(!isProvider || feedbackData) && !loading && (
          <>
            <div className="flex w-full max-w-[380px] flex-col items-center gap-5">
              <h2 className="text-center text-[18px] font-bold italic text-[#1F2937]">
                {isProvider
                  ? "Overall Rating"
                  : "How was your experience?"}
              </h2>

              <div className="flex items-center justify-center gap-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    disabled={isProvider || submitting}
                    onClick={() => setRating(star)}
                    aria-label={`${star} out of 5 stars`}
                    className="transition-transform active:scale-90 disabled:cursor-default"
                  >
                    <Star
                      size={isProvider ? 38 : 42}
                      strokeWidth={0}
                      fill={
                        star <= displayRating
                          ? "#008000"
                          : "#E5E7EB"
                      }
                    />
                  </button>
                ))}
              </div>

              {isProvider && (
                <p className="text-sm text-[#6B7280]">
                  {displayRating} out of 5
                </p>
              )}
            </div>

            <div className="flex w-full max-w-[380px] flex-col items-center gap-5">
              <h2 className="w-full text-center text-[14px] font-bold text-[#1F2937]">
                Rate these aspects
              </h2>

              <div className="flex w-full flex-col gap-4">
                {aspects.map((aspect) => (
                  <div
                    key={aspect.key}
                    className="flex w-full items-center justify-between gap-3"
                  >
                    <span className="text-[13px] text-[#1F2937]">
                      {aspect.name}
                    </span>

                    <div className="flex shrink-0 items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          disabled={isProvider || submitting}
                          onClick={() =>
                            handleAspectRating(
                              aspect.key,
                              star
                            )
                          }
                          aria-label={`${aspect.name}: ${star} stars`}
                          className="disabled:cursor-default"
                        >
                          <Star
                            size={21}
                            strokeWidth={0}
                            fill={
                              star <=
                              displayAspectRatings[aspect.key]
                                ? "#008000"
                                : "#E5E7EB"
                            }
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* COMMENT */}
            <div className="w-full max-w-[380px]">
              <label
                htmlFor="feedbackComment"
                className="mb-2 block text-[14px] font-bold text-[#1F2937]"
              >
                <span className="inline-flex items-center gap-2">
                  <MessageSquare size={16} />
                  Comment
                </span>
              </label>

              {isProvider ? (
                <p className="min-h-[90px] whitespace-pre-wrap rounded-xl border border-gray-200 bg-white p-3 text-sm text-[#374151]">
                  {feedbackData?.comment || "No comment provided."}
                </p>
              ) : (
                <textarea
                  id="feedbackComment"
                  value={comment}
                  onChange={(event) =>
                    setComment(event.target.value)
                  }
                  maxLength={2000}
                  rows={4}
                  placeholder="Tell us about your experience (optional)"
                  disabled={submitting || Boolean(success)}
                  className="
                    w-full resize-none rounded-xl border
                    border-gray-200 bg-white p-3 text-sm
                    text-[#1F2937] outline-none
                    focus:border-[#008000]
                    disabled:bg-gray-100
                  "
                />
              )}
            </div>
          </>
        )}
      </div>

      {/* BOTTOM ACTION */}
      <button
        type="button"
        disabled={loading || submitting || (!isProvider && Boolean(success))}
        onClick={() => {
          if (isProvider || success) {
            navigate("/dashboard");
          } else {
            handleSubmit();
          }
        }}
        className="
          absolute bottom-[64px] left-6 right-6
          flex h-[52px] items-center justify-center
          rounded-full border-2 border-[#008000]
          bg-[#008000] px-3 text-[14px]
          font-semibold text-white transition
          active:scale-[0.98] disabled:opacity-60
        "
      >
        {submitting ? (
          <span className="inline-flex items-center gap-2">
            <LoaderCircle size={18} className="animate-spin" />
            Submitting...
          </span>
        ) : isProvider || success ? (
          "Done"
        ) : (
          "Submit Feedback"
        )}
      </button>

      {/* IPHONE HOME INDICATOR */}
      <div className="absolute bottom-0 left-0 z-50 h-6 w-full">
        <div className="absolute left-1/2 top-1/2 h-1 w-[108px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1F2937]" />
      </div>
    </div>
  );
}

export default Feedback;