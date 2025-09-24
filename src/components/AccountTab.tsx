import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AccountData {
  id: string;
}

export const AccountTab = () => {
  const [accounts, setAccounts] = useState<AccountData[]>([]);

  // Generate 10 random IDs
  useEffect(() => {
    const generateRandomId = () => {
      return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    };

    const randomAccounts = Array.from({ length: 10 }, () => ({
      id: generateRandomId(),
    }));

    setAccounts(randomAccounts);
  }, []);

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Account IDs</CardTitle>
        <p className="text-muted-foreground">Random generated account identifiers</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {accounts.map((account, index) => (
            <div
              key={account.id}
              className="group p-4 rounded-lg bg-muted/50 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:bg-gradient-tab/10"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-tab flex items-center justify-center text-sm font-medium text-foreground">
                    {index + 1}
                  </div>
                  <span className="font-mono text-sm text-foreground group-hover:text-primary transition-colors duration-300">
                    {account.id}
                  </span>
                </div>
                <div className="w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};