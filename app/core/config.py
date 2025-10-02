import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "supersecret")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24
    CORS_ORIGINS: list = ["*"]
    SQLITE_DB: str = os.getenv("SQLITE_DB", "sqlite:///./trading_journal.db")
    ALEMBIC_INI: str = "alembic.ini"


DATA_MODE = os.getenv('DATA_MODE', 'real')  # Options: 'test', 'real', 'seed'
settings = Settings()
