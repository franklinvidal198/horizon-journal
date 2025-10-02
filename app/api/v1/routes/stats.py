from fastapi import APIRouter, Depends
from sqlmodel import Session
import os
from app.db.session import get_session
from app.crud.stats import get_summary_stats, get_equity_curve

router = APIRouter()

@router.get("/summary")
async def summary_stats(session: Session = Depends(get_session)):
    mode = os.environ.get("DATA_MODE", "real")
    if mode == "test":
        return {
            "total_profit": 9999.99,
            "win_rate": 100.0,
            "avg_risk_reward": 5.0,
            "total_trades": 1,
            "winning_trades": 1,
            "losing_trades": 0
        }
    elif mode == "seed":
        return {
            "total_profit": 5000.00,
            "win_rate": 80.0,
            "avg_risk_reward": 3.0,
            "total_trades": 10,
            "winning_trades": 8,
            "losing_trades": 2
        }
    return get_summary_stats(session)

@router.get("/equity_curve")
async def equity_curve(session: Session = Depends(get_session)):
    mode = os.environ.get("DATA_MODE", "real")
    if mode == "test":
        return [
            {"date": "2025-01-01", "balance": 10000},
            {"date": "2025-01-02", "balance": 11000},
        ]
    elif mode == "seed":
        return [
            {"date": "2025-01-01", "balance": 5000},
            {"date": "2025-01-02", "balance": 6000},
        ]
    return get_equity_curve(session)
