class Settings:
    SECRET_KEY = "devsecretkey2090"
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = 60
import os

DATA_MODE = os.getenv('DATA_MODE', 'real')  # Options: 'test', 'real', 'seed'

settings = Settings()
