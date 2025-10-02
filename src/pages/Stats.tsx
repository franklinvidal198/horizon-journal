import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Target,
  DollarSign,
  Activity,
  Calendar,
  Award,
  BarChart3,
  PieChart,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { statsAPI } from "@/lib/api";

// Remove hardcoded demo data. Fetch stats and equity curve from backend.

export default function Stats() {
  const [stats, setStats] = useState(null);
  const [equityData, setEquityData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchStatsData() {
      setLoading(true);
      setError("");
      try {
        const statsData = await statsAPI.getSummary();
        setStats(statsData);
        const equityCurve = await statsAPI.getEquityCurve();
        setEquityData(equityCurve);
      } catch (err) {
        setError("Failed to load stats data.");
      } finally {
        setLoading(false);
      }
    }
    fetchStatsData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Loading/Error States */}
      {loading && (
        <div className="text-center py-8 text-muted-foreground">Loading statistics...</div>
      )}
      {error && (
        <div className="text-center py-8 text-destructive">{error}</div>
      )}
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Statistics</h1>
          <p className="text-muted-foreground">Analyze your trading performance</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="border-border/50">
            <Calendar className="h-4 w-4 mr-2" />
            Last 30 Days
          </Button>
          <Button variant="outline" size="sm" className="border-border/50">
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
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
                  <CardTitle className="text-sm font-medium text-muted-foreground">Avg R:R Ratio</CardTitle>
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
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Trades</CardTitle>
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

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Equity Curve */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center text-foreground">
                <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                Account Growth
              </CardTitle>
              <CardDescription>Your equity curve over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={equityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="date" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="balance"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

  {/* Trading Pairs Performance */}
  {/* This section requires backend support for pair performance. If available, fetch and display. Otherwise, leave as placeholder or remove. */}
      </div>

      {/* Monthly Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      >
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <BarChart3 className="h-5 w-5 mr-2 text-accent" />
              Monthly Performance
            </CardTitle>
            <CardDescription>Monthly profit and trading activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[]}> {/* No monthly data from backend yet */}
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="month" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar 
                    dataKey="profit" 
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Additional Stats (expecting backend data) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <Award className="h-5 w-5 mr-2 text-success" />
              Best Trade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-success">{/* TODO: best trade value from backend */}-</div>
              <div className="text-sm text-muted-foreground">{/* TODO: best trade pair/direction from backend */}-</div>
              <div className="text-xs text-muted-foreground">{/* TODO: best trade date from backend */}-</div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <Target className="h-5 w-5 mr-2 text-primary" />
              Avg Hold Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-foreground">{/* TODO: avg hold time from backend */}-</div>
              <div className="text-sm text-muted-foreground">Average position</div>
              <div className="text-xs text-success">{/* TODO: hold time change from backend */}-</div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <Activity className="h-5 w-5 mr-2 text-accent" />
              Risk Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-foreground">{/* TODO: risk score from backend */}-</div>
              <div className="text-sm text-muted-foreground">{/* TODO: risk description from backend */}-</div>
              <div className="text-xs text-accent">{/* TODO: risk range from backend */}-</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}