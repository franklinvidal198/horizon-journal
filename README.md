# Trading Journal API

A FastAPI backend MVP for recording and analyzing trades.

## Features

- Record trades (Forex, XAU/USD, BTC/USD)
- JWT Auth
- Stats & Equity Curve
- Async endpoints
- Alembic migrations
- CORS enabled

## Setup

1. **Clone repo & install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Configure environment**
   - Copy `.env.example` to `.env` and set your secrets.

3. **Run Alembic migrations**
   ```bash
   alembic upgrade head
   ```

4. **Seed demo data**
   ```bash
   python app/utils/seed.py
   ```

5. **Start server**
   ```bash
   uvicorn app.main:app --reload
   ```

## Testing

```bash
pytest
```

## API Docs

Visit `/docs` after starting the server.
# Trading-Journalv1
