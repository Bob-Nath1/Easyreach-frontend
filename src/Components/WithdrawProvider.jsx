import { useState } from "react";
import { ArrowLeft, Building2 } from "lucide-react";

const WithdrawProvider = () => {
  const [amount, setAmount] = useState(47850);
  const [instantWithdrawal, setInstantWithdrawal] = useState(false);

  const availableBalance = 47850;
  const processingFee = instantWithdrawal ? 100 : 0;
  const receiveAmount = Math.max(amount - processingFee, 0);

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(value);

  const handleQuickAmount = (value) => {
    if (value === "max") {
      setAmount(availableBalance);
    } else {
      setAmount(Math.min(value, availableBalance));
    }
  };

  const handleConfirmWithdrawal = () => {
    if (!amount || amount <= 0) {
      alert("Please enter a valid withdrawal amount.");
      return;
    }

    alert(
      `Withdrawal of ${formatCurrency(
        amount
      )} has been initiated successfully.`
    );
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
  <div className="min-h-screen w-full bg-gray-50 font-sans">
  <div
    className="
      relative
      mx-auto
      h-[926px]
      w-full
      sm:w-[640px]
      md:w-[768px]
      lg:w-[1024px]
      xl:w-[1280px]
      2xl:w-[1536px]
      md:h-[1026px]
      lg:h-[1200px]
      xl:h-[1200px]
      2xl:h-[1200px]
      overflow-hidden
      rounded-[35px]
      bg-[#F9FAFB]
    "
  >
        {/* Header */}
       <header className="absolute left-0 right-0 top-0 z-30 flex h-[56px] items-center bg-white px-6">

  <button
                onClick={handleBack}
                className="flex h-10 w-10 items-center justify-center rounded-lg transition hover:bg-slate-100"
                aria-label="Go back"
              >
                <ArrowLeft size={24} className="text-[#1F2937]" />
              </button>

  <h1 className="text-[20px] font-bold leading-6 text-[#1F2937]">
    Withdraw Funds
  </h1>
</header>
    

        {/* Scrollable Content */}
       <main
  className="
    absolute
    left-0
    right-0
    top-[56px]
    bottom-[82px]
    overflow-y-auto
    overflow-x-hidden
    space-y-4
    pb-6
    scrollbar-hide
  "
>
          {/* Balance Card Section */}
          <section className="bg-white px-6 py-6">
            <div className="rounded-[15px] bg-[#008000] p-4">
              <div className="flex flex-col gap-6">
                {/* Balance */}
                <div>
                  <p className="text-[14px] leading-[17px] text-white/80">
                    Available Balance
                  </p>

                  <h2 className="mt-4 text-[36px] font-bold leading-[44px] text-white">
                    {formatCurrency(availableBalance)}
                  </h2>
                </div>

                <div className="border-t border-white/20" />

                {/* Bottom Stats */}
                <div className="flex items-end justify-between">
                  <div className="space-y-2">
                    <div className="flex gap-1 text-[12px] font-bold text-white/90">
                      <span>Pending:</span>
                      <span>{formatCurrency(12400)}</span>
                    </div>

                    <p className="text-[12px] text-white/70">
                      Last: Jan 10 • ₦35,000
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-[12px] font-bold text-white">
                    <span>↗</span>
                    <span>+₦45k this week</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="space-y-4 px-6">
            {/* Withdraw To */}
            <section className="rounded-[15px] border border-[#E5E7EB] bg-white px-4 pb-4 pt-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-[16px] font-bold text-[#0F172A]">
                  WITHDRAW TO
                </h3>

                <button
                  type="button"
                  className="text-[14px] font-bold text-[#008000]"
                >
                  Change
                </button>
              </div>

              <div className="flex items-center justify-between rounded-[15px] border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white">
                    <Building2 size={22} className="text-[#0F172A]" />
                  </div>

                  <div className="space-y-[7px]">
                    <p className="text-[14px] font-bold text-[#0F172A]">
                      GTBank
                    </p>

                    <p className="text-[14px] text-[#64748B]">
                      *** *** 6146
                    </p>

                    <p className="text-[12px] text-[#94A3B8]">
                      Israel Abidoye
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-[#D1FAE5] px-[10px] py-[6px] text-[12px] font-bold text-[#008000]">
                  DEFAULT
                </span>
              </div>
            </section>

            {/* Enter Amount */}
            <section className="rounded-[15px] bg-white p-4">
              <h3 className="text-[14px] font-bold text-[#0F172A]">
                Enter Amount
              </h3>

              <div className="mt-2 space-y-4">
                {/* Amount Input */}
                <div className="flex h-[71px] items-center justify-center rounded-[15px] border border-[#E5E7EB] bg-[#F8FAFC] px-[10px]">
                  <div className="flex items-center">
                    <span className="mr-1 text-[32px] font-bold text-[#0F172A]">
                      ₦
                    </span>

                    <input
                      type="number"
                      value={amount}
                      max={availableBalance}
                      min="0"
                      onChange={(e) =>
                        setAmount(
                          Math.min(
                            Number(e.target.value),
                            availableBalance
                          )
                        )
                      }
                      className="w-[180px] bg-transparent text-center text-[32px] font-bold text-[#0F172A] outline-none"
                    />
                  </div>
                </div>

                {/* Quick Amount Buttons */}
                <div className="grid grid-cols-4 gap-2">
                  <button
                    onClick={() => handleQuickAmount(10000)}
                    className="h-11 rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] text-[14px] font-bold text-[#0F172A]"
                  >
                    ₦10k
                  </button>

                  <button
                    onClick={() => handleQuickAmount(20000)}
                    className="h-11 rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] text-[14px] font-bold text-[#0F172A]"
                  >
                    ₦20k
                  </button>

                  <button
                    onClick={() => handleQuickAmount(30000)}
                    className="h-11 rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] text-[14px] font-bold text-[#0F172A]"
                  >
                    ₦30k
                  </button>

                  <button
                    onClick={() => handleQuickAmount("max")}
                    className="h-11 rounded-lg bg-[#008000] text-[14px] font-bold text-white"
                  >
                    Max
                  </button>
                </div>
              </div>
            </section>

            {/* Fee Breakdown */}
            <section className="rounded-[15px] bg-white p-4">
              <h3 className="text-[16px] font-bold text-[#0F172A]">
                FEE BREAKDOWN
              </h3>

              <div className="mt-2 rounded-[15px] bg-[#F8FAFC] px-3 py-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[14px]">
                    <span className="text-[#64748B]">
                      Withdrawal Amount
                    </span>

                    <span className="font-bold text-[#0F172A]">
                      {formatCurrency(amount)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[14px]">
                    <span className="text-[#64748B]">
                      Processing Fee
                    </span>

                    <span className="text-[12px] font-bold text-[#008000]">
                      {processingFee === 0
                        ? "₦0 (Free)"
                        : formatCurrency(processingFee)}
                    </span>
                  </div>

                  <div className="border-t border-[#E5E7EB]" />

                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-bold text-[#0F172A]">
                      You'll Receive
                    </span>

                    <span className="text-[24px] font-bold text-[#008000]">
                      {formatCurrency(receiveAmount)}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Withdrawal Information */}
            <section className="relative flex gap-3 rounded-[15px] border border-[#CCFBF1] bg-[#F0FDFA] px-4 py-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white">
                <Building2 size={20} className="text-[#0F172A]" />
              </div>

              <div className="flex-1">
                <div className="space-y-2">
                  <h3 className="text-[14px] font-bold text-[#0F172A]">
                    Funds arrive in 1-3 business days
                  </h3>

                  <p className="text-[12px] leading-[15px] text-[#64748B]">
                    Bank transfers are processed securely. You'll receive SMS
                    confirmation when complete.
                  </p>
                </div>

                <div className="my-4 border-t border-[#CCFBF1]" />

                <p className="text-[12px] font-bold text-[#008000]">
                  Instant withdrawal (+₦100 fee)
                </p>
              </div>

              {/* Toggle */}
              <button
                type="button"
                onClick={() =>
                  setInstantWithdrawal(!instantWithdrawal)
                }
                className={`absolute bottom-4 right-4 h-7 w-12 rounded-full transition-colors ${
                  instantWithdrawal
                    ? "bg-[#008000]"
                    : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${
                    instantWithdrawal
                      ? "-translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </section>
          </div>
        </main>

        {/* Bottom Button */}
      <div className="absolute bottom-0 left-0 z-40 w-full bg-white px-[10px] py-4">
          <button
            type="button"
            onClick={handleConfirmWithdrawal}
            className="flex h-[50px] w-full items-center justify-center rounded-lg bg-[#008000] text-[16px] font-bold text-white transition hover:bg-green-700 active:scale-[0.98]"
          >
            Confirm Withdrawal
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawProvider;