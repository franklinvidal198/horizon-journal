import { TrendingUp, TrendingDown, Eye, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Trade } from "@/lib/api";

interface TradesTableProps {
  trades: Trade[];
  loading?: boolean;
  onView?: (trade: Trade) => void;
  onEdit?: (trade: Trade) => void;
  onDelete?: (trade: Trade) => void;
  title?: string;
  showActions?: boolean;
}

export function TradesTable({
  trades,
  loading,
  onView,
  onEdit,
  onDelete,
  title = "Trading History",
  showActions = true,
}: TradesTableProps) {
  if (loading) {
    return (
      <Card className="glass border-border/50">
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full mb-2" />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass border-border/50">
      <CardHeader>
        <CardTitle className="text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50">
                <TableHead className="text-foreground">Pair</TableHead>
                <TableHead className="text-foreground">Direction</TableHead>
                <TableHead className="text-foreground">Entry</TableHead>
                <TableHead className="text-foreground">Exit</TableHead>
                <TableHead className="text-foreground">Size</TableHead>
                <TableHead className="text-foreground">Result</TableHead>
                <TableHead className="text-foreground">R:R</TableHead>
                <TableHead className="text-foreground">Status</TableHead>
                {showActions && (
                  <TableHead className="text-foreground">Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {trades.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={showActions ? 9 : 8}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No trades found.
                  </TableCell>
                </TableRow>
              ) : (
                trades.map((trade) => (
                  <TableRow
                    key={trade.id}
                    className="border-border/30 hover:bg-muted/10"
                  >
                    <TableCell>
                      <div className="font-medium text-foreground">
                        {trade.pair}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(trade.opened_at).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {trade.direction === "BUY" ? (
                          <TrendingUp className="h-4 w-4 text-success" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-destructive" />
                        )}
                        <span
                          className={`text-sm font-medium ${
                            trade.direction === "BUY"
                              ? "text-success"
                              : "text-destructive"
                          }`}
                        >
                          {trade.direction}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-foreground">
                      {trade.entry_price}
                    </TableCell>
                    <TableCell className="text-foreground">
                      {trade.exit_price ?? "-"}
                    </TableCell>
                    <TableCell className="text-foreground">
                      {trade.position_size?.toLocaleString?.() ?? "-"}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div
                          className={`font-medium ${
                            trade.result_usd && trade.result_usd > 0
                              ? "text-success"
                              : trade.result_usd && trade.result_usd < 0
                              ? "text-destructive"
                              : "text-muted-foreground"
                          }`}
                        >
                          {typeof trade.result_usd === "number"
                            ? `$${trade.result_usd.toFixed(2)}`
                            : "-"}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {typeof trade.result_pips === "number"
                            ? `${trade.result_pips} pips`
                            : "-"}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-foreground">
                      {typeof trade.risk_reward === "number"
                        ? trade.risk_reward.toFixed(2)
                        : "-"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          trade.status === "OPEN" ? "default" : "secondary"
                        }
                        className={
                          trade.status === "OPEN"
                            ? "bg-accent/20 text-accent border-accent/30"
                            : "bg-muted/20 text-muted-foreground border-muted/30"
                        }
                      >
                        {trade.status}
                      </Badge>
                    </TableCell>
                    {showActions && (
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => onView?.(trade)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => onEdit?.(trade)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                            onClick={() => onDelete?.(trade)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
