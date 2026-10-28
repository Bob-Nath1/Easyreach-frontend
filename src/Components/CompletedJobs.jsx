
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  CalendarDays,
  UserRound,
  BriefcaseBusiness,
  RefreshCw,
} from "lucide-react";

const API_URL = "http://localhost:5000";

const formatDateTime = (value) => {
  if (!value) return "Completion date unavailable";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Completion date unavailable";
  }

  return date.toLocaleString("en-NG", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

function CompletedJobs() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCompletedJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please log in to view completed jobs.");
      }

      const response = await fetch(`${API_URL}/api/requests`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to load completed jobs."
        );
      }

      const completedJobs = (data.requests || [])
        .filter((request) => request.status === "completed")
        .sort((a, b) => {
          const dateA = new Date(a.completedAt || 0).getTime();
          const dateB = new Date(b.completedAt || 0).getTime();

          return dateB - dateA;
        });

      setJobs(completedJobs);
    } catch (err) {
      setError(err.message || "Unable to load completed jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompletedJobs();
  }, []);

  return (
    <div className="mx-auto min-h-screen w-full bg-[#F9FAFB] font-['Inter']">
      {/* Header */}
      <header className="flex items-center gap-4 border-b border-gray-100 bg-white px-5 py-5 sm:px-8">
        <button
          type="button"
          onClick={() => navigate("/dashboardprov")}
          aria-label="Back to provider dashboard"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-50"
        >
          <ArrowLeft size={21} className="text-gray-800" />
        </button>

        <div className="min-w-0 flex-1">
          <h1 className="text-xl font-bold text-[#1F2937]">
            Completed Jobs
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Your complete service completion history
          </p>
        </div>

        <button
          type="button"
          onClick={fetchCompletedJobs}
          disabled={loading}
          aria-label="Refresh completed jobs"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-50 text-[#008000] disabled:opacity-50"
        >
          <RefreshCw size={18} />
        </button>
      </header>

      <main className="mx-auto w-full max-w-4xl space-y-5 px-4 py-6 sm:px-8">
        {/* Total */}
        <section className="rounded-2xl bg-gradient-to-br from-[#10B981] to-[#059669] p-5 text-white">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={32} />

            <div>
              <p className="text-sm text-white/90">
                All-time completed jobs
              </p>

              <p className="text-3xl font-bold">
                {loading ? "…" : jobs.length}
              </p>
            </div>
          </div>
        </section>

        {/* Loading */}
        {loading && (
          <div className="py-12 text-center text-sm text-gray-500">
            Loading completed jobs...
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-xl border border-red-100 bg-red-50 p-4">
            <p className="text-sm text-red-700">{error}</p>

            <button
              type="button"
              onClick={fetchCompletedJobs}
              className="mt-3 rounded-lg bg-[#008000] px-4 py-2 text-sm font-semibold text-white"
            >
              Try again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && jobs.length === 0 && (
          <div className="rounded-2xl bg-white px-5 py-12 text-center">
            <CheckCircle2
              size={42}
              className="mx-auto text-gray-300"
            />

            <h2 className="mt-4 font-semibold text-gray-800">
              No completed jobs yet
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Jobs will appear here after you mark them as completed.
            </p>
          </div>
        )}

        {/* Completed jobs list */}
        {!loading && !error && jobs.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-base font-bold text-[#1F2937]">
              Completion history
            </h2>

            {jobs.map((job) => (
              <article
                key={job.id}
                className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-50">
                    <UserRound
                      size={21}
                      className="text-[#008000]"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="break-words font-bold text-[#1F2937]">
                      {job.seekerName || `Seeker #${job.seekerId}`}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {job.serviceCategory || "Service"}
                    </p>
                  </div>

                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-700">
                    <CheckCircle2 size={13} />
                    Completed
                  </span>
                </div>

                <div className="mt-4 flex items-start gap-2">
                  <BriefcaseBusiness
                    size={17}
                    className="mt-0.5 shrink-0 text-gray-400"
                  />

                  <p className="break-words text-sm leading-6 text-gray-700">
                    {job.description || "No description provided"}
                  </p>
                </div>

                <div className="mt-4 flex items-start gap-2 border-t border-gray-100 pt-4">
                  <CalendarDays
                    size={17}
                    className="mt-0.5 shrink-0 text-[#008000]"
                  />

                  <div>
                    <p className="text-xs text-gray-500">
                      Actual completion date
                    </p>

                    <p className="mt-1 text-sm font-semibold text-gray-800">
                      {formatDateTime(job.completedAt)}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

export default CompletedJobs;
