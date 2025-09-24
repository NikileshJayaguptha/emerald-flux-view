import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

export const TransactionsTab = () => {
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [apiEndpoint, setApiEndpoint] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const fetchTransactionCount = async () => {
    if (!apiEndpoint.trim()) return;
    
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(apiEndpoint);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      setCount(data.count || data.total || data.transactions || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error fetching transaction count:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const connectToAPI = () => {
    if (!apiEndpoint.trim()) return;
    
    setIsConnected(true);
    fetchTransactionCount();
    
    const interval = setInterval(fetchTransactionCount, 5000);
    setIntervalId(interval);
  };

  const disconnectFromAPI = () => {
    setIsConnected(false);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setError(null);
  };

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const getStatusIndicator = () => {
    if (!isConnected) {
      return (
        <>
          <div className="w-2 h-2 rounded-full bg-muted-foreground" />
          <span className="text-sm text-muted-foreground">Not connected</span>
        </>
      );
    }
    
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
          <span className="text-sm text-red-500">Connection failed</span>
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
        <p className="text-muted-foreground">Connect to your API to see live transaction data</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* API Configuration */}
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="url"
              placeholder="Enter your API endpoint (e.g., https://api.example.com/transactions/count)"
              value={apiEndpoint}
              onChange={(e) => setApiEndpoint(e.target.value)}
              className="flex-1"
              disabled={isConnected}
            />
            {!isConnected ? (
              <Button 
                onClick={connectToAPI}
                disabled={!apiEndpoint.trim() || isLoading}
                className="shrink-0"
              >
                Connect
              </Button>
            ) : (
              <Button 
                onClick={disconnectFromAPI}
                variant="outline"
                className="shrink-0"
              >
                Disconnect
              </Button>
            )}
          </div>
          {error && (
            <div className="text-sm text-red-500 bg-red-50 dark:bg-red-950/20 p-3 rounded-md border border-red-200 dark:border-red-800">
              Error: {error}
            </div>
          )}
        </div>

        {/* Transaction Count Display */}
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
              {!isConnected ? "Connect API to see data" : count === 0 && !error ? "No Transactions" : "Total Transactions"}
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