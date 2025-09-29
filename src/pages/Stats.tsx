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
  PieChart as RechartsPieChart,
  Cell,
  BarChart,
  Bar,
} from "recharts";

const equityData = [
  { date: "Jan 01", balance: 10000 },
  { date: "Jan 02", balance: 10150 },
  { date: "Jan 03", balance: 10080 },
  { date: "Jan 04", balance: 10320 },
  { date: "Jan 05", balance: 10280 },
  { date: "Jan 06", balance: 10450 },
  { date: "Jan 07", balance: 10380 },
  { date: "Jan 08", balance: 10620 },
  { date: "Jan 09", balance: 10580 },
  { date: "Jan 10", balance: 10750 },
  { date: "Jan 11", balance: 10690 },
  { date: "Jan 12", balance: 10850 },
];

const pairData = [
  { name: "EUR/USD", trades: 12, profit: 650, color: "#00D4FF" },
  { name: "GBP/JPY", trades: 8, profit: 420, color: "#A855F7" },
  { name: "USD/CAD", trades: 6, profit: 280, color: "#3B82F6" },
  { name: "AUD/USD", trades: 4, profit: 180, color: "#10B981" },
];

const monthlyData = [
  { month: "Oct", profit: 850, trades: 15 },
  { month: "Nov", profit: 1200, trades: 18 },
  { month: "Dec", profit: 950, trades: 12 },
  { month: "Jan", profit: 1450, trades: 22 },
];

const stats = [
  {
    title: "Total Profit",
    value: "$4,650.00",
    change: "+8.2%",
    icon: DollarSign,
    color: "success",
  },
  {
    title: "Win Rate",
    value: "73.2%",
    change: "+2.1%",
    icon: Target,
    color: "primary",
  },
  {
    title: "Avg R:R Ratio",
    value: "2.34",
    change: "+0.15",
    icon: TrendingUp,
    color: "accent",
  },
  {
    title: "Total Trades",
    value: "67",
    change: "+12",
    icon: Activity,
    color: "secondary",
  },
];

export default function Stats() {
  return (
    <div className="space-y-6">
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
                <p className="text-xs text-success">
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
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
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center text-foreground">
                <PieChart className="h-5 w-5 mr-2 text-secondary" />
                Pair Performance
              </CardTitle>
              <CardDescription>Profit by trading pairs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pairData.map((pair, index) => (
                  <div key={pair.name} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: pair.color }}
                      />
                      <div>
                        <div className="font-medium text-foreground">{pair.name}</div>
                        <div className="text-sm text-muted-foreground">{pair.trades} trades</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-success">+${pair.profit}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
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
                <BarChart data={monthlyData}>
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

      {/* Additional Stats */}
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
              <div className="text-2xl font-bold text-success">+$345.50</div>
              <div className="text-sm text-muted-foreground">EUR/USD • BUY</div>
              <div className="text-xs text-muted-foreground">Jan 08, 2024</div>
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
              <div className="text-2xl font-bold text-foreground">4.2h</div>
              <div className="text-sm text-muted-foreground">Average position</div>
              <div className="text-xs text-success">-0.3h from last month</div>
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
              <div className="text-2xl font-bold text-foreground">7.2/10</div>
              <div className="text-sm text-muted-foreground">Moderate risk</div>
              <div className="text-xs text-accent">Optimal range</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}