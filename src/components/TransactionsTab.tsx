import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";

export const TransactionsTab = () => {
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactionCount = async () => {
    try {
      setIsLoading(true);
      setError(null);
      // Replace this URL with your actual API endpoint
      const response = await fetch('/api/transactions/count');
      
      if (!response.ok) {
        throw new Error('Failed to fetch transaction count');
      }
      
      const data = await response.json();
      setCount(data.count || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error fetching transaction count:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch immediately on mount
    fetchTransactionCount();
    
    // Set up interval to fetch every 5 seconds
    const interval = setInterval(fetchTransactionCount, 5000);
    
    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  const getStatusIndicator = () => {
    if (isLoading) {
      return (
        <>
          <div className="w-2 h-2 rounded-full bg-primary animate-spin" />
          <span className="text-sm text-muted-foreground">Fetching data...</span>
        </>
      );
    }
    
    if (error) {
      return (
        <>
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <span className="text-sm text-red-500">API connection failed</span>
        </>
      );
    }
    
    return (
      <>
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-sm text-muted-foreground">Live data</span>
      </>
    );
  };

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
              {count === 0 && !error ? "No Transactions" : "Total Transactions"}
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border/50">
              {getStatusIndicator()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};