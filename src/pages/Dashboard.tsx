import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  Activity,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { statsAPI, tradesAPI } from "@/lib/api";

// Remove hardcoded demo data. Fetch stats and recent trades from backend.

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recentTrades, setRecentTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDashboardData() {
      setLoading(true);
      setError("");
      try {
        const statsData = await statsAPI.getSummary();
        setStats(statsData);
        const tradesData = await tradesAPI.getTrades({ limit: 3, status: "ALL" });
        setRecentTrades(tradesData);
      } catch (err) {
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Loading/Error States */}
      {loading && (
        <div className="text-center py-8 text-muted-foreground">Loading dashboard...</div>
      )}
      {error && (
        <div className="text-center py-8 text-destructive">{error}</div>
      )}
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back to your trading journey</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Last updated: 5 minutes ago</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0 }}
            >
              <Card className="glass border-border/50 hover:glow-primary transition-smooth">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Profit</CardTitle>
                  <div className="h-8 w-8 bg-gradient-success rounded-lg flex items-center justify-center glow-success">
                    <DollarSign className="h-4 w-4 text-background" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">${stats.total_profit?.toFixed(2) ?? "-"}</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    {/* No trend data from backend, so omit for now */}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className="glass border-border/50 hover:glow-primary transition-smooth">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Win Rate</CardTitle>
                  <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center glow-primary">
                    <Target className="h-4 w-4 text-background" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stats.win_rate ? `${stats.win_rate.toFixed(1)}%` : "-"}</div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card className="glass border-border/50 hover:glow-primary transition-smooth">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Avg R:R</CardTitle>
                  <div className="h-8 w-8 bg-gradient-accent rounded-lg flex items-center justify-center glow-accent">
                    <TrendingUp className="h-4 w-4 text-background" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stats.avg_risk_reward?.toFixed(2) ?? "-"}</div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Card className="glass border-border/50 hover:glow-primary transition-smooth">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Trades</CardTitle>
                  <div className="h-8 w-8 bg-gradient-secondary rounded-lg flex items-center justify-center glow-secondary">
                    <Activity className="h-4 w-4 text-background" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stats.total_trades ?? "-"}</div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Trades */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card className="glass border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-foreground">Recent Trades</CardTitle>
                  <CardDescription>Your latest trading activity</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="border-border/50">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTrades.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">No recent trades found.</div>
                ) : (
                  recentTrades.map((trade) => (
                    <div
                      key={trade.id}
                      className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-border/30"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          trade.direction === "BUY" 
                            ? "bg-success/20 text-success" 
                            : "bg-destructive/20 text-destructive"
                        }`}>
                          {trade.direction === "BUY" ? (
                            <TrendingUp className="h-5 w-5" />
                          ) : (
                            <TrendingDown className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{trade.pair}</div>
                          <div className="text-sm text-muted-foreground">
                            {trade.direction} • {trade.opened_at ? new Date(trade.opened_at).toLocaleDateString() : "-"}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-medium ${
                          trade.result_usd && trade.result_usd > 0 
                            ? "text-success" 
                            : trade.result_usd && trade.result_usd < 0 
                            ? "text-destructive" 
                            : "text-muted-foreground"
                        }`}>
                          {typeof trade.result_usd === "number"
                            ? trade.result_usd.toFixed(2)
                            : "-"}
                        </div>
                        <div className={`text-xs px-2 py-1 rounded-full ${
                          trade.status === "OPEN" 
                            ? "bg-accent/20 text-accent" 
                            : "bg-muted/20 text-muted-foreground"
                        }`}>
                          {trade.status}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="space-y-6"
        >
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="text-foreground">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-gradient-primary hover:glow-primary transition-smooth">
                Add New Trade
              </Button>
              <Button variant="outline" className="w-full border-border/50">
                View Analytics
              </Button>
              <Button variant="ghost" className="w-full">
                Export Data
              </Button>
            </CardContent>
          </Card>

          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="text-foreground">Today's Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Trades</span>
                <span className="font-medium text-foreground">{stats ? stats.total_trades : "-"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">P&L</span>
                <span className="font-medium text-success">{stats ? `$${stats.total_profit?.toFixed(2)}` : "-"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Win Rate</span>
                <span className="font-medium text-foreground">{stats ? `${stats.win_rate?.toFixed(1)}%` : "-"}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}