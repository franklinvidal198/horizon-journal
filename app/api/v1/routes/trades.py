from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session
from typing import List, Optional
from datetime import datetime
from app.db.session import get_session
import os
from app.schemas.trade import TradeRead
from app.schemas.trade import TradeCreate, TradeRead, TradeUpdate
from app.crud.trade import (
    create_trade, get_trade, get_trades, update_trade, delete_trade, close_trade
)
from app.models.trade import TradeStatus

router = APIRouter()

def mock_trade():
    return TradeRead(
        id=1,
        pair="TEST/USD",
        direction="BUY",
        entry_price=1.0,
        exit_price=1.1,
        stop_loss=0.9,
        take_profit=1.2,
        position_size=1000,
        status="OPEN",
        opened_at=datetime.utcnow(),
        closed_at=datetime.utcnow(),
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
        risk_reward=1.5,
        result_pips=10,
        result_usd=100.0,
        notes="Test trade",
        screenshot_url=None
    )

def get_data_mode():
    return os.environ.get("DATA_MODE", "real")

def is_test_mode():
    return get_data_mode() == "test"

@router.post("/", response_model=TradeRead)
async def create_trade_endpoint(trade_in: TradeCreate, session: Session = Depends(get_session)):
    if is_test_mode():
        return mock_trade()
    trade = create_trade(session, trade_in)
    return trade

@router.get("/", response_model=List[TradeRead])
async def list_trades(
    pair: Optional[str] = Query(None),
    status: Optional[TradeStatus] = Query(None),
    start: Optional[datetime] = Query(None),
    end: Optional[datetime] = Query(None),
    session: Session = Depends(get_session)
):
    mode = get_data_mode()
    if mode == "test":
        return [mock_trade()]
    trades = get_trades(session, pair, status, start, end)
    if mode == "real":
        # Exclude any trade whose pair contains 'TEST' or 'XAU' (case-insensitive, substring or exact match)
        trades = [t for t in trades if all(x not in t.pair.upper() for x in ["TEST", "XAU"]) and t.pair.upper() not in ["TEST/USD", "XAU/USD"]]
    elif mode == "seed":
        # Only include trades whose pair contains 'XAU' (seed demo)
        trades = [t for t in trades if "XAU" in t.pair]
    return trades

@router.get("/{trade_id}", response_model=TradeRead)
async def get_trade_endpoint(trade_id: int, session: Session = Depends(get_session)):
    if is_test_mode():
        return mock_trade()
    trade = get_trade(session, trade_id)
    if not trade:
        raise HTTPException(status_code=404, detail="Trade not found")
    return trade

@router.put("/{trade_id}", response_model=TradeRead)
async def update_trade_endpoint(trade_id: int, trade_in: TradeUpdate, session: Session = Depends(get_session)):
    if is_test_mode():
        return mock_trade()
    trade = update_trade(session, trade_id, trade_in)
    if not trade:
        raise HTTPException(status_code=404, detail="Trade not found")
    return trade

@router.delete("/{trade_id}", response_model=TradeRead)
async def delete_trade_endpoint(trade_id: int, session: Session = Depends(get_session)):
    if is_test_mode():
        return mock_trade()
    trade = delete_trade(session, trade_id)
    if not trade:
        raise HTTPException(status_code=404, detail="Trade not found")
    return trade

@router.patch("/{trade_id}/close", response_model=TradeRead)
async def close_trade_endpoint(trade_id: int, exit_price: float, session: Session = Depends(get_session)):
    if is_test_mode():
        return mock_trade()
    trade = close_trade(session, trade_id, exit_price)
    if not trade:
        raise HTTPException(status_code=404, detail="Trade not found or already closed")
    return trade
