
import React, { useState } from "react";
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
} from "lucide-react";

function AdminDashboard() {
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState("Overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: "Overview", icon: LayoutDashboard },
    { name: "Users", icon: Users },
    { name: "Providers", icon: UserCheck },
    { name: "Service Requests", icon: ClipboardList },
    { name: "Services", icon: BriefcaseBusiness },
    { name: "Reports", icon: BarChart3 },
    { name: "Settings", icon: Settings },
  ];

  const stats = [
    {
      title: "Total Users",
      value: "0",
      description: "Registered users",
      icon: Users,
    },
    {
      title: "Total Providers",
      value: "0",
      description: "Registered providers",
      icon: UserCheck,
    },
    {
      title: "Total Seekers",
      value: "0",
      description: "Registered seekers",
      icon: UserCheck,
    },
    {
      title: "Service Requests",
      value: "0",
      description: "All requests",
      icon: ClipboardList,
    },
    {
      title: "Completed Jobs",
      value: "0",
      description: "Successfully completed",
      icon: CheckCircle,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin", { replace: true });
  };

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

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="rounded-lg bg-green-50 p-3">
                  <Icon size={22} className="text-[#008000]" />
                </div>
                <TrendingUp size={18} className="text-gray-400" />
              </div>

              <p className="mt-5 text-sm text-gray-500">
                {stat.title}
              </p>

              <h2 className="mt-1 text-2xl font-bold text-gray-900">
                {stat.value}
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                {stat.description}
              </p>
            </div>
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

  const renderContent = () => {
    if (activePage === "Overview") {
      return renderOverview();
    }

    return (
      <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">
          {activePage}
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          The {activePage.toLowerCase()} management section will be
          connected to the backend in the next steps.
        </p>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-100 bg-white transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-gray-100 px-6">
          <h1 className="text-2xl font-bold text-[#008000]">
            EasyReach
          </h1>

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
              const isActive = activePage === item.name;

              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setActivePage(item.name);
                    setSidebarOpen(false);
                  }}
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

      {/* Main content */}
      <div className="min-w-0 flex-1 lg:ml-64">

        {/* Top navigation */}
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
              <p className="text-sm font-semibold text-gray-900">
                Admin Panel
              </p>
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
                  Administrator
                </p>
                <p className="text-xs text-gray-400">Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-8">
          {renderContent()}
        </main>

      </div>
    </div>
  );
}

export default AdminDashboard;
