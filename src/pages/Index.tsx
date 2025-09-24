import { useState } from "react";
import { AccountTab } from "@/components/AccountTab";
import { TransactionsTab } from "@/components/TransactionsTab";
import { cn } from "@/lib/utils";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"account" | "transactions">("account");

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Manage your account and view transactions</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab("account")}
            className={cn(
              "px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105",
              activeTab === "account"
                ? "bg-gradient-tab-active text-black shadow-lg shadow-primary/25"
                : "bg-gradient-tab text-foreground hover:bg-gradient-tab-active hover:text-black"
            )}
          >
            Account
          </button>
          <button
            onClick={() => setActiveTab("transactions")}
            className={cn(
              "px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105",
              activeTab === "transactions"
                ? "bg-gradient-tab-active text-black shadow-lg shadow-primary/25"
                : "bg-gradient-tab text-foreground hover:bg-gradient-tab-active hover:text-black"
            )}
          >
            Transactions
          </button>
        </div>

        {/* Tab Content */}
        <div className="animate-in fade-in-50 duration-300">
          {activeTab === "account" && <AccountTab />}
          {activeTab === "transactions" && <TransactionsTab />}
        </div>
      </div>
    </div>
  );
};

export default Index;