
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const verifyUser = async () => {
      setChecking(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        if (!cancelled) {
          setAuthenticated(false);
          setChecking(false);
        }
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/users/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (cancelled) return;

        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          setAuthenticated(false);
          setChecking(false);
          return;
        }

        if (!response.ok) {
          setError(
            "We couldn't verify your account. Please try again."
          );
          setChecking(false);
          return;
        }

        const data = await response.json();
        const user = data.user;

        if (!user || !user.role) {
          setError("The server returned an invalid user profile.");
          setChecking(false);
          return;
        }

        localStorage.setItem("user", JSON.stringify(user));

        setUserRole(user.role);
        setAuthenticated(true);
        setAuthorized(
          !allowedRole || user.role === allowedRole
        );
        setChecking(false);
      } catch (err) {
        if (cancelled) return;

        console.error("Authentication error:", err);
        setError(
          "Unable to connect to the server. Check your connection and try again."
        );
        setChecking(false);
      }
    };

    verifyUser();

    return () => {
      cancelled = true;
    };
  }, [allowedRole, retryCount]);

  if (checking) {
    return <div>Checking authentication...</div>;
  }

  if (error) {
    return (
      <div className="flex min-h-[200px] flex-col items-center justify-center gap-4 p-6 text-center">
        <p className="text-sm text-red-600">{error}</p>

        <button
          type="button"
          onClick={() => setRetryCount((count) => count + 1)}
          className="rounded-lg bg-[#008000] px-5 py-3 text-sm font-semibold text-white"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (!authorized) {
    return (
      <Navigate
        to={
          userRole === "provider"
            ? "/dashboardprov"
            : "/dashboard"
        }
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;
