import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

export const TransactionsTab = () => {
  const [count] = useState<number>(0); // This will be updated when API is connected

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Transaction Count</CardTitle>
        <p className="text-muted-foreground">Total number of transactions from API</p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center py-12">
          <div className="text-center space-y-4">
            <div className="relative">
              <div className="text-6xl font-bold bg-gradient-tab-active bg-clip-text text-transparent">
                {count.toLocaleString()}
              </div>
              <div className="absolute inset-0 text-6xl font-bold bg-gradient-tab-active bg-clip-text text-transparent blur-sm opacity-30">
                {count.toLocaleString()}
              </div>
            </div>
            <div className="text-lg text-muted-foreground">
              {count === 0 ? "No API connected yet" : "Total Transactions"}
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border/50">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-muted-foreground">Awaiting API connection</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};