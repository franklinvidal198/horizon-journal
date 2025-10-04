import { useState } from "react";
import { tradesAPI, Trade } from "../../../Frontend/src/lib/api";

const initialForm: Partial<Trade> = {
	pair: "",
	direction: "BUY",
	entry_price: 0,
	exit_price: undefined,
	stop_loss: 0,
	take_profit: 0,
	position_size: 0,
	notes: "",
	screenshot: "",
};

export default function TradeForm({ onSuccess }: { onSuccess?: () => void }) {
	const [form, setForm] = useState<Partial<Trade>>(initialForm);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setLoading(true);
		setError("");
		try {
			await tradesAPI.createTrade(form);
			setForm(initialForm);
			if (onSuccess) onSuccess();
		} catch (err) {
			setError("Failed to create trade.");
		} finally {
			setLoading(false);
		}
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<input name="pair" value={form.pair} onChange={handleChange} placeholder="Pair" required />
			<select name="direction" value={form.direction} onChange={handleChange}>
				<option value="BUY">BUY</option>
				<option value="SELL">SELL</option>
			</select>
			<input name="entry_price" type="number" value={form.entry_price} onChange={handleChange} placeholder="Entry Price" required />
			<input name="exit_price" type="number" value={form.exit_price ?? ""} onChange={handleChange} placeholder="Exit Price" />
			<input name="stop_loss" type="number" value={form.stop_loss} onChange={handleChange} placeholder="Stop Loss" required />
			<input name="take_profit" type="number" value={form.take_profit} onChange={handleChange} placeholder="Take Profit" required />
			<input name="position_size" type="number" value={form.position_size} onChange={handleChange} placeholder="Position Size" required />
			<textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Notes" />
			<input name="screenshot" value={form.screenshot} onChange={handleChange} placeholder="Screenshot URL" />
			<button type="submit" disabled={loading}>{loading ? "Saving..." : "Save Trade"}</button>
			{error && <div className="text-red-500">{error}</div>}
		</form>
	);
}
