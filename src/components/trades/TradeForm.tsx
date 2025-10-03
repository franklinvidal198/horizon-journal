import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { tradesAPI, type Trade } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface TradeFormProps {
  onSuccess?: (trade: Trade) => void;
  onCancel?: () => void;
}

export function TradeForm({ onSuccess, onCancel }: TradeFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    pair: "",
    direction: "BUY" as "BUY" | "SELL",
    entry_price: "",
    stop_loss: "",
    take_profit: "",
    position_size: "",
    notes: "",
    screenshot: "",
  });

  const handleChange = (
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.pair || !formData.entry_price || !formData.stop_loss || !formData.position_size) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }

      // Convert string values to numbers
      const tradeData = {
        pair: formData.pair,
        direction: formData.direction,
        entry_price: parseFloat(formData.entry_price),
        stop_loss: parseFloat(formData.stop_loss),
        take_profit: formData.take_profit ? parseFloat(formData.take_profit) : undefined,
        position_size: parseFloat(formData.position_size),
        notes: formData.notes || undefined,
        screenshot: formData.screenshot || undefined,
        status: "OPEN" as const,
      };

      const newTrade = await tradesAPI.createTrade(tradeData);

      toast({
        title: "Success",
        description: "Trade created successfully",
      });

      onSuccess?.(newTrade);

      // Reset form
      setFormData({
        pair: "",
        direction: "BUY",
        entry_price: "",
        stop_loss: "",
        take_profit: "",
        position_size: "",
        notes: "",
        screenshot: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create trade. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="glass border-border/50">
      <CardHeader>
        <CardTitle className="text-foreground">New Trade</CardTitle>
        <CardDescription>Enter your trade details</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pair" className="text-foreground">
                Pair <span className="text-destructive">*</span>
              </Label>
              <Input
                id="pair"
                placeholder="e.g., EUR/USD"
                value={formData.pair}
                onChange={(e) => handleChange("pair", e.target.value)}
                className="bg-input/50 border-border/50"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="direction" className="text-foreground">
                Direction <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.direction}
                onValueChange={(value) => handleChange("direction", value)}
              >
                <SelectTrigger className="bg-input/50 border-border/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BUY">BUY</SelectItem>
                  <SelectItem value="SELL">SELL</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="entry_price" className="text-foreground">
                Entry Price <span className="text-destructive">*</span>
              </Label>
              <Input
                id="entry_price"
                type="number"
                step="0.00001"
                placeholder="0.00000"
                value={formData.entry_price}
                onChange={(e) => handleChange("entry_price", e.target.value)}
                className="bg-input/50 border-border/50"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="position_size" className="text-foreground">
                Position Size <span className="text-destructive">*</span>
              </Label>
              <Input
                id="position_size"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.position_size}
                onChange={(e) => handleChange("position_size", e.target.value)}
                className="bg-input/50 border-border/50"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stop_loss" className="text-foreground">
                Stop Loss <span className="text-destructive">*</span>
              </Label>
              <Input
                id="stop_loss"
                type="number"
                step="0.00001"
                placeholder="0.00000"
                value={formData.stop_loss}
                onChange={(e) => handleChange("stop_loss", e.target.value)}
                className="bg-input/50 border-border/50"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="take_profit" className="text-foreground">
                Take Profit
              </Label>
              <Input
                id="take_profit"
                type="number"
                step="0.00001"
                placeholder="0.00000"
                value={formData.take_profit}
                onChange={(e) => handleChange("take_profit", e.target.value)}
                className="bg-input/50 border-border/50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-foreground">
              Notes
            </Label>
            <Textarea
              id="notes"
              placeholder="Add any notes about this trade..."
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              className="bg-input/50 border-border/50 min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="screenshot" className="text-foreground">
              Screenshot URL
            </Label>
            <Input
              id="screenshot"
              type="url"
              placeholder="https://..."
              value={formData.screenshot}
              onChange={(e) => handleChange("screenshot", e.target.value)}
              className="bg-input/50 border-border/50"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-primary hover:glow-primary transition-smooth flex-1"
            >
              {isSubmitting ? "Creating..." : "Create Trade"}
            </Button>
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="border-border/50"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
