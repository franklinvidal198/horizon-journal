import { motion } from "framer-motion";
import { DollarSign, Target, TrendingUp, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { TradingStats } from "@/lib/api";

interface StatsCardsProps {
  stats: TradingStats | null;
  loading?: boolean;
}

export function StatsCards({ stats, loading }: StatsCardsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="glass border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-8 rounded-lg" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-24 mb-2" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No statistics available
      </div>
    );
  }

  const cards = [
    {
      title: "Total Profit",
      value: `$${stats.total_profit?.toFixed(2) ?? "0.00"}`,
      icon: DollarSign,
      gradient: "bg-gradient-success",
      glow: "glow-success",
      delay: 0,
    },
    {
      title: "Win Rate",
      value: `${stats.win_rate?.toFixed(1) ?? "0.0"}%`,
      subtitle: `${stats.winning_trades ?? 0}W / ${stats.losing_trades ?? 0}L`,
      icon: Target,
      gradient: "bg-gradient-primary",
      glow: "glow-primary",
      delay: 0.1,
    },
    {
      title: "Avg R:R",
      value: stats.avg_risk_reward?.toFixed(2) ?? "0.00",
      icon: TrendingUp,
      gradient: "bg-gradient-accent",
      glow: "glow-accent",
      delay: 0.2,
    },
    {
      title: "Total Trades",
      value: stats.total_trades?.toString() ?? "0",
      icon: Activity,
      gradient: "bg-gradient-secondary",
      glow: "glow-secondary",
      delay: 0.3,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: card.delay }}
        >
          <Card className="glass border-border/50 hover:glow-primary transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <div className={`h-8 w-8 ${card.gradient} rounded-lg flex items-center justify-center ${card.glow}`}>
                <card.icon className="h-4 w-4 text-background" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{card.value}</div>
              {card.subtitle && (
                <div className="text-xs text-muted-foreground mt-1">{card.subtitle}</div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
