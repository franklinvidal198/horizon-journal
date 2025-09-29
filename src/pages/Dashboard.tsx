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

const stats = [
  {
    title: "Total Profit",
    value: "$12,847.50",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "success",
  },
  {
    title: "Win Rate",
    value: "73.2%",
    change: "+2.1%",
    trend: "up",
    icon: Target,
    color: "primary",
  },
  {
    title: "Avg R:R",
    value: "2.34",
    change: "+0.15",
    trend: "up",
    icon: TrendingUp,
    color: "accent",
  },
  {
    title: "Active Trades",
    value: "7",
    change: "+3",
    trend: "up",
    icon: Activity,
    color: "secondary",
  },
];

const recentTrades = [
  {
    id: 1,
    pair: "EUR/USD",
    direction: "BUY",
    result: "+145.50",
    status: "CLOSED",
    time: "2h ago",
  },
  {
    id: 2,
    pair: "GBP/JPY",
    direction: "SELL",
    result: "-67.20",
    status: "CLOSED",
    time: "4h ago",
  },
  {
    id: 3,
    pair: "USD/CAD",
    direction: "BUY",
    result: "+0.00",
    status: "OPEN",
    time: "1d ago",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
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
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="glass border-border/50 hover:glow-primary transition-smooth">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`h-8 w-8 bg-gradient-${stat.color} rounded-lg flex items-center justify-center glow-${stat.color}`}>
                  <stat.icon className="h-4 w-4 text-background" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3 text-success mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-destructive mr-1" />
                  )}
                  <span className={stat.trend === "up" ? "text-success" : "text-destructive"}>
                    {stat.change}
                  </span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
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
                {recentTrades.map((trade) => (
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
                          {trade.direction} • {trade.time}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-medium ${
                        parseFloat(trade.result) > 0 
                          ? "text-success" 
                          : parseFloat(trade.result) < 0 
                          ? "text-destructive" 
                          : "text-muted-foreground"
                      }`}>
                        {trade.result}
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
                ))}
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
                <span className="font-medium text-foreground">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">P&L</span>
                <span className="font-medium text-success">+$234.50</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Win Rate</span>
                <span className="font-medium text-foreground">66.7%</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}