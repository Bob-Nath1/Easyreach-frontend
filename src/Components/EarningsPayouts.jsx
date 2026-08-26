
import { useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  ArrowUpRight,
  CreditCard,
  Settings,
  FileText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const breakdown = [
  {
    title: "Today",
    amount: "₦8,500",
    date: "Jan 16, 2025",
    growth: "+15%",
  },
  {
    title: "This Week",
    amount: "₦47,850",
    date: "Jan 13 - Jan 16",
    growth: "+18%",
  },
  {
    title: "This Month",
    amount: "₦187,300",
    date: "January 2025",
    growth: "+23%",
  },
  {
    title: "All Time",
    amount: "₦2.4M",
    date: "Since Jan 2023",
    growth: null,
  },
];

const transactions = [
  {
    type: "Payment Received",
    description: "John Daniels • Engine Check",
    time: "Today, 2:45 PM",
    amount: "+₦18,900",
    status: "COMPLETED",
    positive: true,
  },
  {
    type: "Payment Received",
    description: "Sarah Williams • Brake Repair",
    time: "Today, 11:30 AM",
    amount: "-₦75,000",
    status: "COMPLETED",
    positive: false,
  },
  {
    type: "Payment Received",
    description: "Michael Johnson • Oil Service",
    time: "Yesterday, 4:20 PM",
    amount: "+₦12,500",
    status: "COMPLETED",
    positive: true,
  },
  {
    type: "Withdrawal",
    description: "Bank Transfer",
    time: "Jan 15, 9:10 AM",
    amount: "-₦30,000",
    status: "COMPLETED",
    positive: false,
  },
];

export default function EarningsPayouts() {
    const navigate = useNavigate();
    


  const [activeTab, setActiveTab] = useState("All");
  const [period, setPeriod] = useState("This Month");

  const tabs = ["All", "Earnings", "Withdrawals", "Fees"];

  const filteredTransactions = transactions.filter((transaction) => {
    if (activeTab === "All") return true;

    if (activeTab === "Earnings") {
      return transaction.positive;
    }

    if (activeTab === "Withdrawals") {
      return transaction.type === "Withdrawal";
    }

    return false;
  });

  const handleWithdraw = () => {
    alert("Withdrawal feature clicked");
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      {/* Mobile Container */}
      <div className="mx-auto min-h-screen w-full max-w-[428px] bg-[#F8FAFC]">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-white">
          <div className="flex h-[60px] items-center justify-between px-6">
            <div className="flex items-center gap-6">
              <button
                onClick={handleBack}
                className="flex h-10 w-10 items-center justify-center rounded-lg transition hover:bg-slate-100"
                aria-label="Go back"
              >
                <ArrowLeft size={24} className="text-[#1F2937]" />
              </button>

              <h1 className="text-xl font-bold text-[#1F2937]">
                Earnings & Payouts
              </h1>
            </div>

            <div className="relative">
              <button
                onClick={() =>
                  setPeriod(
                    period === "This Month" ? "This Week" : "This Month"
                  )
                }
                className="flex items-center gap-1 rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-2 text-xs font-bold text-[#0F172A]"
              >
                {period}
                <ChevronDown size={15} />
              </button>
            </div>
          </div>
        </header>

        <main className="px-6 pb-10 pt-4">
          {/* Balance Card */}
          <section className="rounded-[15px] bg-[#008000] p-4 text-white">
            <div>
              <div className="mb-4">
                <p className="text-sm text-white/80">
                  Available Balance
                </p>

                <h2 className="mt-3 text-4xl font-bold">
                  ₦47,850
                </h2>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex gap-1">
                  <span className="text-white/80">Pending:</span>
                  <span className="font-bold">₦12,400</span>
                </div>

                <div className="flex items-center gap-1 font-bold">
                  <ArrowUpRight size={14} />
                  <span>+23% vs last month</span>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="mt-5">
              <div className="flex h-8 items-end justify-center gap-[3px]">
                {[16, 22, 18, 28, 20, 26, 32].map(
                  (height, index) => (
                    <div
                      key={index}
                      style={{ height: `${height}px` }}
                      className="w-full max-w-[45px] rounded-t-sm bg-white/30"
                    />
                  )
                )}
              </div>
            </div>

            {/* Withdraw Button */}
            <button
               onClick={() => navigate("/withdraw")}
              className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-[15px] bg-white text-sm font-bold text-[#047857] transition hover:bg-slate-50"
            >
              <CreditCard size={18} />
              Withdraw Funds
            </button>
          </section>

          {/* Quick Actions */}
          <section className="mt-4 grid grid-cols-2 gap-2">
            <button
              onClick={() => alert("Auto-Payout clicked")}
              className="flex h-[46px] items-center justify-center gap-2 rounded-[15px] border border-[#E5E7EB] bg-white text-xs font-bold text-[#0F172A]"
            >
              <Settings size={16} />
              Auto-Payout
            </button>

            <button
              onClick={() => alert("Tax Documents clicked")}
              className="flex h-[46px] items-center justify-center gap-2 rounded-[15px] border border-[#E5E7EB] bg-white text-xs font-bold text-[#0F172A]"
            >
              <FileText size={16} />
              Tax Docs
            </button>
          </section>

          {/* Earnings Breakdown */}
          <section className="mt-4 rounded-lg bg-white p-4">
            <h2 className="text-base font-bold text-[#0F172A]">
              Earnings Breakdown
            </h2>

            <div className="mt-6 space-y-6">
              {breakdown.map((item, index) => (
                <div
                  key={item.title}
                  className={
                    index !== breakdown.length - 1
                      ? "border-b border-[#F1F5F9] pb-4"
                      : ""
                  }
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[#0F172A]">
                      {item.title}
                    </h3>

                    <p className="text-lg font-bold text-[#047857]">
                      {item.amount}
                    </p>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-xs text-[#64748B]">
                      {item.date}
                    </p>

                    {item.growth && (
                      <div className="flex items-center gap-1">
                        <ArrowUpRight
                          size={13}
                          className="text-[#047857]"
                        />
                        <span className="text-[10px] font-bold text-[#047857]">
                          {item.growth}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Payout Method */}
          <section className="mt-4 rounded-lg border border-[#E5E7EB] bg-white p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[#0F172A]">
                Payout Method
              </h2>

              <button
                onClick={() => alert("Change payout method")}
                className="text-sm font-bold text-[#047857]"
              >
                Change
              </button>
            </div>

            {/* Bank Card */}
            <div className="relative mt-4 overflow-hidden rounded-xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-4 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex h-8 w-14 items-center justify-center rounded bg-white text-[11px] font-bold text-[#0F172A]">
                    GTBank
                  </div>
                </div>

                <span className="rounded-md bg-[#047857] px-2 py-1 text-[10px] font-bold">
                  DEFAULT
                </span>
              </div>

              <p className="mt-6 text-base font-bold tracking-wider">
                •••• •••• 4567
              </p>

              <p className="mt-2 text-sm text-white/80">
                Tunde Adebayo
              </p>
            </div>
          </section>

          {/* Transactions */}
          <section className="mt-4 overflow-hidden bg-white">
            {/* Tabs */}
            <div className="flex border-b border-[#E5E7EB]">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative flex h-[47px] flex-1 items-center justify-center text-xs font-bold transition ${
                    activeTab === tab
                      ? "text-[#047857]"
                      : "text-[#64748B]"
                  }`}
                >
                  {tab}

                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#008000]" />
                  )}
                </button>
              ))}
            </div>

            {/* Transaction List */}
            <div>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b border-[#F1F5F9] px-4 py-4"
                  >
                    {/* Left */}
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#D1FAE5]">
                        <ArrowUpRight
                          size={20}
                          className="text-[#047857]"
                        />
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-[#0F172A]">
                          {transaction.type}
                        </h3>

                        <p className="mt-1 text-xs text-[#64748B]">
                          {transaction.description}
                        </p>

                        <p className="mt-1 text-[10px] text-[#94A3B8]">
                          {transaction.time}
                        </p>
                      </div>
                    </div>

                    {/* Right */}
                    <div className="flex flex-col items-end gap-1">
                      <p
                        className={`text-base font-bold ${
                          transaction.positive
                            ? "text-[#047857]"
                            : "text-[#64748B]"
                        }`}
                      >
                        {transaction.amount}
                      </p>

                      <span className="rounded-lg bg-[#D1FAE5] px-2 py-1 text-[10px] font-bold text-[#065F46]">
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center text-sm text-[#64748B]">
                  No transactions found.
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
