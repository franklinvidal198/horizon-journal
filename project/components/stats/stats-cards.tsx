import { useEffect, useState } from "react";
import { statsAPI, TradingStats } from "../../../Frontend/src/lib/api";

export default function StatsCards() {
	const [stats, setStats] = useState<TradingStats | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		async function fetchStats() {
			setLoading(true);
			setError("");
			try {
				const data = await statsAPI.getSummary();
				setStats(data);
			} catch (err) {
				setError("Failed to load trading statistics.");
			} finally {
				setLoading(false);
			}
		}
		fetchStats();
	}, []);

	if (loading) return <div>Loading trading statistics...</div>;
	if (error) return <div>{error}</div>;
	if (!stats) return <div>No statistics available.</div>;

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			<div className="card">
				<h3>Total Profit</h3>
				<p>{stats.total_profit}</p>
			</div>
			<div className="card">
				<h3>Win Rate</h3>
				<p>{stats.win_rate}%</p>
			</div>
			<div className="card">
				<h3>Avg Risk/Reward</h3>
				<p>{stats.avg_risk_reward}</p>
			</div>
			<div className="card">
				<h3>Total Trades</h3>
				<p>{stats.total_trades}</p>
			</div>
			<div className="card">
				<h3>Winning Trades</h3>
				<p>{stats.winning_trades}</p>
			</div>
			<div className="card">
				<h3>Losing Trades</h3>
				<p>{stats.losing_trades}</p>
			</div>
		</div>
	);
}
