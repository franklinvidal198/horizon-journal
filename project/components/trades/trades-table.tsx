
import { Trade } from "../../../Frontend/src/lib/api";

interface TradesTableProps {
	trades: Trade[];
}

export default function TradesTable({ trades }: TradesTableProps) {
	if (!trades || trades.length === 0) return <div>No trades available.</div>;

	return (
		<table className="min-w-full border">
			<thead>
				<tr>
					<th>Pair</th>
					<th>Direction</th>
					<th>Entry</th>
					<th>Exit</th>
					<th>Stop Loss</th>
					<th>Take Profit</th>
					<th>Size</th>
					<th>Status</th>
					<th>Opened</th>
					<th>Closed</th>
					<th>Created</th>
					<th>Updated</th>
					<th>Risk/Reward</th>
					<th>Result Pips</th>
					<th>Result USD</th>
				</tr>
			</thead>
			<tbody>
				{trades.map((trade) => (
					<tr key={trade.id}>
						<td>{trade.pair}</td>
						<td>{trade.direction}</td>
						<td>{trade.entry_price}</td>
						<td>{trade.exit_price}</td>
						<td>{trade.stop_loss}</td>
						<td>{trade.take_profit}</td>
						<td>{trade.position_size}</td>
						<td>{trade.status}</td>
						<td>{trade.opened_at}</td>
						<td>{trade.closed_at}</td>
						<td>{trade.created_at}</td>
						<td>{trade.updated_at}</td>
						<td>{trade.risk_reward}</td>
						<td>{trade.result_pips}</td>
						<td>{trade.result_usd}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
