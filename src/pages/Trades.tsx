import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  Download,
  TrendingUp,
  TrendingDown,
  Eye,
  Edit,
  Trash2
} from "lucide-react";
import { tradesAPI } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function Trades() {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");

  useEffect(() => {
    async function fetchTrades() {
      setLoading(true);
      setError("");
      try {
        const data = await tradesAPI.getTrades();
        setTrades(data);
      } catch (err) {
        setError("Failed to load trades.");
      } finally {
        setLoading(false);
      }
    }
    fetchTrades();
  }, []);

  const filteredTrades = trades.filter((trade) => {
    const matchesSearch = trade.pair.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "ALL" || trade.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Loading/Error States */}
      {loading && (
        <div className="text-center py-8 text-muted-foreground">Loading trades...</div>
      )}
      {error && (
        <div className="text-center py-8 text-destructive">{error}</div>
      )}
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Trades</h1>
          <p className="text-muted-foreground">Manage and analyze your trading positions</p>
        </div>
        <Button className="bg-gradient-primary hover:glow-primary transition-smooth">
          <Plus className="h-4 w-4 mr-2" />
          Add Trade
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="glass border-border/50">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search trades by pair..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input/50 border-border/50"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "ALL" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("ALL")}
                className={filterStatus === "ALL" ? "bg-gradient-primary" : "border-border/50"}
              >
                All
              </Button>
              <Button
                variant={filterStatus === "OPEN" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("OPEN")}
                className={filterStatus === "OPEN" ? "bg-gradient-accent" : "border-border/50"}
              >
                Open
              </Button>
              <Button
                variant={filterStatus === "CLOSED" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("CLOSED")}
                className={filterStatus === "CLOSED" ? "bg-gradient-secondary" : "border-border/50"}
              >
                Closed
              </Button>
            </div>
            <Button variant="outline" size="sm" className="border-border/50">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
            <Button variant="outline" size="sm" className="border-border/50">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Trades Table */}
      {!loading && !error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="text-foreground">Trading History</CardTitle>
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
                      <TableHead className="text-foreground">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTrades.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                          No trades found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredTrades.map((trade) => (
                        <TableRow key={trade.id} className="border-border/30 hover:bg-muted/10">
                          <TableCell>
                            <div className="font-medium text-foreground">{trade.pair}</div>
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
                              <span className={`text-sm font-medium ${
                                trade.direction === "BUY" ? "text-success" : "text-destructive"
                              }`}>
                                {trade.direction}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-foreground">{trade.entry_price}</TableCell>
                          <TableCell className="text-foreground">
                            {trade.exit_price ?? "-"}
                          </TableCell>
                          <TableCell className="text-foreground">
                            {trade.position_size?.toLocaleString?.() ?? "-"}
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
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
                              variant={trade.status === "OPEN" ? "default" : "secondary"}
                              className={trade.status === "OPEN" 
                                ? "bg-accent/20 text-accent border-accent/30" 
                                : "bg-muted/20 text-muted-foreground border-muted/30"
                              }
                            >
                              {trade.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}

// End of file