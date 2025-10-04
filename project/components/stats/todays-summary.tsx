import React from "react";

interface Stats {
  total_trades?: number;
  total_profit?: number;
  win_rate?: number;
}

interface TodaysSummaryProps {
  stats: Stats | null;
}

export default function TodaysSummary({ stats }: TodaysSummaryProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-2">
      <h3 className="text-lg font-semibold mb-2">Today's Summary</h3>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Trades</span>
        <span className="font-medium text-foreground">{stats?.total_trades ?? "-"}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">P&L</span>
        <span className="font-medium text-success">{stats?.total_profit !== undefined ? `$${stats.total_profit.toFixed(2)}` : "-"}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Win Rate</span>
        <span className="font-medium text-foreground">{stats?.win_rate !== undefined ? `${stats.win_rate.toFixed(1)}%` : "-"}</span>
      </div>
    </div>
  );
}
