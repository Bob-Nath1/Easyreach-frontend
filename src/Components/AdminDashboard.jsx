
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  ClipboardList,
  BriefcaseBusiness,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronRight,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  RefreshCw,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

function AdminDashboard() {
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState("Overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [overview, setOverview] = useState({
    totalUsers: 0,
    totalSeekers: 0,
    totalProviders: 0,
    totalRequests: 0,
    completedJobs: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [userRecords, setUserRecords] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [userFilter, setUserFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 10,
    totalRecords: 0,
    totalPages: 0,
  });

const [serviceRequests, setServiceRequests] = useState([]);
const [requestsLoading, setRequestsLoading] = useState(false);
const [requestsError, setRequestsError] = useState("");
const [requestType, setRequestType] = useState("all");
const [requestPage, setRequestPage] = useState(1);

const [requestPagination, setRequestPagination] = useState({
  currentPage: 1,
  limit: 10,
  totalRecords: 0,
  totalPages: 0,
});

  const navigation = [
    { name: "Overview", icon: LayoutDashboard },
    { name: "Users", icon: Users },
    { name: "Providers", icon: UserCheck },
    { name: "Service Requests", icon: ClipboardList },
    { name: "Services", icon: BriefcaseBusiness },
    { name: "Reports", icon: BarChart3 },
    { name: "Settings", icon: Settings },
  ];

  const fetchOverview = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/signin", { replace: true });
        return;
      }

      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/api/admin/overview`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.status === 401 || response.status === 403) {
        setError(data.message || "You are not authorized to view this dashboard.");
        return;
      }

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to load dashboard statistics.");
      }

      setOverview(data.overview);
    } catch (err) {
      console.error("Admin overview error:", err);
      setError(err.message || "Unable to load dashboard statistics.");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchOverview();
  }, [fetchOverview]);

  const fetchUsers = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/signin", { replace: true });
        return;
      }

      setUsersLoading(true);
      setUsersError("");

      const params = new URLSearchParams({
        role: userFilter,
        page: String(currentPage),
        limit: "10",
      });

      if (searchTerm.trim()) {
        params.set("search", searchTerm.trim());
      }

      const response = await fetch(
        `${API_URL}/api/admin/users?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to load users.");
      }

      setUserRecords(data.users || []);
      setPagination(data.pagination);
    } catch (err) {
      console.error("Admin users error:", err);
      setUsersError(err.message || "Unable to load users.");
    } finally {
      setUsersLoading(false);
    }
  }, [userFilter, currentPage, searchTerm, navigate]);

useEffect(() => {
  if (
    activePage === "Service Requests" ||
    activePage === "Completed Jobs"
  ) {
    fetchServiceRequests();
  }
}, [activePage, fetchServiceRequests]);

  const fetchServiceRequests = useCallback(async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signin", { replace: true });
      return;
    }

    setRequestsLoading(true);
    setRequestsError("");

    const params = new URLSearchParams({
      type: requestType,
      page: String(requestPage),
      limit: "10",
    });

    const response = await fetch(
      `${API_URL}/api/admin/service-requests?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (response.status === 401 || response.status === 403) {
      throw new Error(
        data.message || "You are not authorized to view service requests."
      );
    }

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Unable to load service requests.");
    }

    setServiceRequests(data.requests || []);
    setRequestPagination(
      data.pagination || {
        currentPage: 1,
        limit: 10,
        totalRecords: 0,
        totalPages: 0,
      }
    );
  } catch (err) {
    console.error("Admin service requests error:", err);
    setRequestsError(err.message || "Unable to load service requests.");
  } finally {
    setRequestsLoading(false);
  }
}, [requestType, requestPage, navigate]);

  const handleAccountStatusChange = async (userId, newStatus) => {
  const statusLabels = {
    active: "reactivate",
    suspended: "suspend",
    deactivated: "deactivate",
  };

  const action = statusLabels[newStatus];

  const confirmed = window.confirm(
    `Are you sure you want to ${action} this account?`
  );

  if (!confirmed) return;

  try {
    const token = localStorage.getItem("token");

    setActionLoadingId(userId);
    setUsersError("");

    const response = await fetch(
      `${API_URL}/api/admin/users/${userId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Unable to update account status.");
    }

    await fetchUsers();
  } catch (err) {
    console.error("Account status update error:", err);
    setUsersError(err.message || "Unable to update account status.");
  } finally {
    setActionLoadingId(null);
  }
};

  useEffect(() => {
    if (activePage === "User Records") {
      fetchUsers();
    }
  }, [activePage, fetchUsers]);

  const openUserRecords = (role) => {
    setUserFilter(role);
    setCurrentPage(1);
    setSearchTerm("");
    setActivePage("User Records");
  };

  const openServiceRequests = (type = "all") => {
  setRequestType(type);
  setRequestPage(1);
  setActivePage(type === "completed" ? "Completed Jobs" : "Service Requests");
  setSidebarOpen(false);
};

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin", { replace: true });
  };

  const stats = [
    {
      title: "Total Users",
      value: overview.totalUsers,
      description: "Registered users",
      icon: Users,
      role: "all",
    },
    {
      title: "Total Providers",
      value: overview.totalProviders,
      description: "Registered providers",
      icon: UserCheck,
      role: "provider",
    },
    {
      title: "Total Seekers",
      value: overview.totalSeekers,
      description: "Registered seekers",
      icon: UserCheck,
      role: "seeker",
    },
    {
      title: "Service Requests",
      value: overview.totalRequests,
      description: "All requests",
      icon: ClipboardList,
      page: "Service Requests",
    },
    {
      title: "Completed Jobs",
      value: overview.completedJobs,
      description: "Successfully completed",
      icon: CheckCircle,
      page: "Service Requests",
    },
  ];

  const renderOverview = () => (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Dashboard Overview
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome to your EasyReach administration panel.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const isClickable = Boolean(stat.role || stat.page);

          return (
            <button
              key={stat.title}
              type="button"
              disabled={!isClickable}
              onClick={() => {
  if (stat.role) {
    openUserRecords(stat.role);
  } else if (stat.page === "Service Requests") {
    openServiceRequests("all");
  } else if (stat.page === "Completed Jobs") {
    openServiceRequests("completed");
  }
}}
              className={`rounded-xl border border-gray-100 bg-white p-5 text-left shadow-sm transition ${
                isClickable
                  ? "cursor-pointer hover:-translate-y-1 hover:border-green-200 hover:shadow-md"
                  : "cursor-default"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="rounded-lg bg-green-50 p-3">
                  <Icon size={22} className="text-[#008000]" />
                </div>
                <TrendingUp size={18} className="text-gray-400" />
              </div>

              <p className="mt-5 text-sm text-gray-500">{stat.title}</p>

              <h2 className="mt-1 text-2xl font-bold text-gray-900">
                {loading ? "..." : stat.value}
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                {stat.description}
              </p>

              {isClickable && (
                <p className="mt-3 text-xs font-semibold text-[#008000]">
                  View records →
                </p>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Activity
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Platform activity will appear here.
          </p>

          <div className="flex min-h-[180px] flex-col items-center justify-center text-center">
            <Clock size={32} className="text-gray-300" />
            <p className="mt-3 text-sm text-gray-500">
              No activity to display yet.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Platform Updates
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Important notifications and updates.
          </p>

          <div className="flex min-h-[180px] flex-col items-center justify-center text-center">
            <AlertCircle size={32} className="text-gray-300" />
            <p className="mt-3 text-sm text-gray-500">
              No new updates.
            </p>
          </div>
        </div>
      </div>
    </>
  );

  const renderUserRecords = () => (
    <>
      <div className="mb-6">
        <button
          onClick={() => setActivePage("Overview")}
          className="mb-5 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#008000]"
        >
          <ArrowLeft size={18} />
          Back to Overview
        </button>

        <h1 className="text-2xl font-bold text-gray-900">
          {userFilter === "all"
            ? "All Registered Users"
            : userFilter === "provider"
            ? "Registered Providers"
            : "Registered Seekers"}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          {pagination.totalRecords} registered account(s) found.
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search name, email or phone..."
            className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-[#008000] focus:ring-2 focus:ring-green-100"
          />
        </div>

        <select
          value={userFilter}
          onChange={(event) => {
            setUserFilter(event.target.value);
            setCurrentPage(1);
          }}
          className="rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#008000]"
        >
          <option value="all">All Users</option>
          <option value="seeker">Seekers</option>
          <option value="provider">Providers</option>
        </select>

        <button
          onClick={fetchUsers}
          disabled={usersLoading}
          className="flex items-center justify-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-[#008000] hover:bg-green-100 disabled:opacity-50"
        >
          <RefreshCw size={16} className={usersLoading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {usersError && (
        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {usersError}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] text-left">
            <thead className="bg-gray-50">
              <tr className="text-xs uppercase tracking-wide text-gray-500">
                <th className="px-5 py-4 font-semibold">User</th>
                <th className="px-5 py-4 font-semibold">Contact</th>
                <th className="px-5 py-4 font-semibold">Role</th>
                <th className="px-5 py-4 font-semibold">Location</th>
                <th className="px-5 py-4 font-semibold">Verification</th>
                <th className="px-5 py-4 font-semibold">Account Status</th>
<th className="px-5 py-4 font-semibold">Actions</th>
                <th className="px-5 py-4 font-semibold">Joined</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {usersLoading ? (
                <tr>
                  <td colSpan="8" className="px-5 py-12 text-center text-sm text-gray-500">
                    Loading registered users...
                  </td>
                </tr>
              ) : userRecords.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-5 py-12 text-center text-sm text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                userRecords.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {user.profileImage ? (
                          <img
                            src={user.profileImage}
                            alt=""
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 font-semibold text-[#008000]">
                            {user.fullName?.charAt(0)?.toUpperCase() || "U"}
                          </div>
                        )}

                        <div>
                          <p className="text-sm font-semibold text-gray-800">
                            {user.fullName}
                          </p>
                          <p className="text-xs text-gray-400">
                            ID: {user.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm text-gray-700">{user.email}</p>
                      <p className="mt-1 text-xs text-gray-400">{user.phone}</p>
                    </td>

                    <td className="px-5 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                        user.role === "provider"
                          ? "bg-blue-50 text-blue-700"
                          : "bg-green-50 text-green-700"
                      }`}>
                        {user.role}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {user.city || "Not provided"}
                    </td>

                    <td className="px-5 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                        user.isVerified
                          ? "bg-green-50 text-green-700"
                          : "bg-yellow-50 text-yellow-700"
                      }`}>
                        {user.isVerified ? "Verified" : "Unverified"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
  <span
    className={`rounded-full px-3 py-1 text-xs font-medium ${
      user.status === "active"
        ? "bg-green-50 text-green-700"
        : user.status === "suspended"
        ? "bg-yellow-50 text-yellow-700"
        : "bg-red-50 text-red-700"
    }`}
  >
    {user.status || "active"}
  </span>
</td>

<td className="px-5 py-4">
  <div className="flex items-center gap-2">
    {user.status === "active" || !user.status ? (
      <>
        <button
          type="button"
          disabled={actionLoadingId === user.id}
          onClick={() =>
            handleAccountStatusChange(user.id, "suspended")
          }
          className="rounded-lg bg-yellow-50 px-3 py-2 text-xs font-medium text-yellow-700 hover:bg-yellow-100 disabled:opacity-50"
        >
          Suspend
        </button>

        <button
          type="button"
          disabled={actionLoadingId === user.id}
          onClick={() =>
            handleAccountStatusChange(user.id, "deactivated")
          }
          className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-700 hover:bg-red-100 disabled:opacity-50"
        >
          Deactivate
        </button>
      </>
    ) : (
      <>
        {user.status === "suspended" && (
          <button
            type="button"
            disabled={actionLoadingId === user.id}
            onClick={() =>
              handleAccountStatusChange(user.id, "deactivated")
            }
            className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-700 hover:bg-red-100 disabled:opacity-50"
          >
            Deactivate
          </button>
        )}

        <button
          type="button"
          disabled={actionLoadingId === user.id}
          onClick={() =>
            handleAccountStatusChange(user.id, "active")
          }
          className="rounded-lg bg-green-50 px-3 py-2 text-xs font-medium text-green-700 hover:bg-green-100 disabled:opacity-50"
        >
          Reactivate
        </button>
      </>
    )}

    {actionLoadingId === user.id && (
      <span className="text-xs text-gray-400">Updating...</span>
    )}
  </div>
</td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-500">
            Showing {userRecords.length} of {pagination.totalRecords} users
          </p>

          <div className="flex items-center gap-3">
            <button
              disabled={currentPage <= 1 || usersLoading}
              onClick={() => setCurrentPage((page) => page - 1)}
              className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            <span className="text-sm text-gray-600">
              Page {pagination.currentPage || 1} of {pagination.totalPages || 1}
            </span>

            <button
              disabled={currentPage >= pagination.totalPages || usersLoading}
              onClick={() => setCurrentPage((page) => page + 1)}
              className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
              <ChevronRightIcon size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );

  const renderServiceRequests = () => {
  const isCompleted = requestType === "completed";

  const statusStyles = {
    pending: "bg-yellow-50 text-yellow-700",
    accepted: "bg-blue-50 text-blue-700",
    completed: "bg-green-50 text-green-700",
    declined: "bg-red-50 text-red-700",
    cancelled: "bg-gray-100 text-gray-600",
  };

  return (
    <>
      <div className="mb-6">
        <button
          onClick={() => setActivePage("Overview")}
          className="mb-5 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#008000]"
        >
          <ArrowLeft size={18} />
          Back to Overview
        </button>

        <h1 className="text-2xl font-bold text-gray-900">
          {isCompleted ? "Completed Jobs" : "Service Requests"}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          {requestPagination.totalRecords} record(s) found.
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <select
          value={requestType}
          onChange={(event) => {
            const type = event.target.value;
            setRequestType(type);
            setRequestPage(1);
            setActivePage(
              type === "completed" ? "Completed Jobs" : "Service Requests"
            );
          }}
          className="rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#008000]"
        >
          <option value="all">All Requests</option>
          <option value="completed">Completed Jobs</option>
        </select>

        <button
          type="button"
          onClick={fetchServiceRequests}
          disabled={requestsLoading}
          className="flex items-center justify-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-[#008000] hover:bg-green-100 disabled:opacity-50"
        >
          <RefreshCw
            size={16}
            className={requestsLoading ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>

      {requestsError && (
        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {requestsError}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] text-left">
            <thead className="bg-gray-50">
              <tr className="text-xs uppercase tracking-wide text-gray-500">
                <th className="px-5 py-4 font-semibold">Request</th>
                <th className="px-5 py-4 font-semibold">Service</th>
                <th className="px-5 py-4 font-semibold">Seeker</th>
                <th className="px-5 py-4 font-semibold">Provider</th>
                <th className="px-5 py-4 font-semibold">Service Date</th>
                <th className="px-5 py-4 font-semibold">Price</th>
                <th className="px-5 py-4 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {requestsLoading ? (
                <tr>
                  <td colSpan="7" className="px-5 py-12 text-center text-sm text-gray-500">
                    Loading service requests...
                  </td>
                </tr>
              ) : serviceRequests.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-5 py-12 text-center text-sm text-gray-500">
                    No service requests found.
                  </td>
                </tr>
              ) : (
                serviceRequests.map((request) => {
                  const price = request.quotedPrice ?? request.price;

                  return (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-5 py-4 text-sm font-semibold text-gray-800">
                        #{request.id}
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-gray-800">
                          {request.serviceCategory}
                        </p>
                        <p className="mt-1 max-w-xs truncate text-xs text-gray-400">
                          {request.description}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm text-gray-800">
                          {request.seeker?.fullName || "Unknown seeker"}
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                          {request.seeker?.email || "—"}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm text-gray-800">
                          {request.provider?.fullName || "Unknown provider"}
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                          {request.provider?.email || "—"}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {request.serviceDateTime
                          ? new Date(request.serviceDateTime).toLocaleString()
                          : "Not scheduled"}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {price != null
                          ? `₦${Number(price).toLocaleString()}`
                          : "Not set"}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            statusStyles[request.status] ||
                            "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {request.status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-500">
            Showing {serviceRequests.length} of{" "}
            {requestPagination.totalRecords} requests
          </p>

          <div className="flex items-center gap-3">
            <button
              disabled={requestPage <= 1 || requestsLoading}
              onClick={() => setRequestPage((page) => page - 1)}
              className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            <span className="text-sm text-gray-600">
              Page {requestPagination.currentPage || 1} of{" "}
              {requestPagination.totalPages || 1}
            </span>

            <button
              disabled={
                requestPage >= requestPagination.totalPages ||
                requestsLoading
              }
              onClick={() => setRequestPage((page) => page + 1)}
              className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
              <ChevronRightIcon size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

  const renderContent = () => {
  if (activePage === "Overview") return renderOverview();

  if (activePage === "User Records") return renderUserRecords();

  if (
    activePage === "Service Requests" ||
    activePage === "Completed Jobs"
  ) {
    return renderServiceRequests();
  }

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900">{activePage}</h1>
      <p className="mt-2 text-sm text-gray-500">
        The {activePage.toLowerCase()} management section will be connected to the backend in the next steps.
      </p>
    </div>
  );
};

  return (
    <div className="flex min-h-screen bg-gray-50">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-100 bg-white transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-gray-100 px-6">
          <h1 className="text-2xl font-bold text-[#008000]">EasyReach</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-500 lg:hidden"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        <div className="px-5 py-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Administration
          </p>

          <nav className="space-y-2">
            {navigation.map((item) => {
  const Icon = item.icon;

  const isActive =
    activePage === item.name ||
    (activePage === "User Records" &&
      ["Users", "Providers"].includes(item.name)) ||
    (["Service Requests", "Completed Jobs"].includes(activePage) &&
      item.name === "Service Requests");

  return (                <button
                  key={item.name}
                  onClick={() => {
                    if (item.name === "Users") {
  openUserRecords("all");
} else if (item.name === "Providers") {
  openUserRecords("provider");
} else if (item.name === "Service Requests") {
  openServiceRequests("all");
} else {
  setActivePage(item.name);
  setSidebarOpen(false);
}                  }}
                  className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-green-50 text-[#008000]"
                      : "text-gray-600 hover:bg-gray-50 hover:text-[#008000]"
                  }`}
                >
                  <Icon size={19} />
                  {item.name}
                  {isActive && (
                    <ChevronRight size={16} className="ml-auto" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto border-t border-gray-100 p-5">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            <LogOut size={19} />
            Sign Out
          </button>
        </div>
      </aside>

      <div className="min-w-0 flex-1 lg:ml-64">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-100 bg-white px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-600 lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>

            <div>
              <p className="text-sm font-semibold text-gray-900">Admin Panel</p>
              <p className="hidden text-xs text-gray-400 sm:block">
                Manage your EasyReach platform
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <button
              className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            <button
              className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100"
              aria-label="Notifications"
            >
              <Bell size={20} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            </button>

            <div className="flex items-center gap-2 border-l border-gray-100 pl-3 sm:pl-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 font-bold text-[#008000]">
                A
              </div>

              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-800">
                  Bob Nath
                </p>
                <p className="text-xs text-gray-400">Admin</p>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-8">{renderContent()}</main>
      </div>
    </div>
  );
}

export default AdminDashboard;
