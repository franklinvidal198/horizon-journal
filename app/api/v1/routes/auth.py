from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from app.models.user import User as UserModel
from app.schemas.user import UserRead
from app.core.config import settings
from sqlmodel import Session
from app.db.session import get_session
from app.schemas.user import UserCreate, UserLogin
from app.schemas.auth import Token
from app.crud.user import get_user_by_email, create_user
from app.utils.security import verify_password, create_access_token

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")
def get_current_user(token: str = Depends(oauth2_scheme), session: Session = Depends(get_session)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = get_user_by_email(session, email)
    if user is None:
        raise credentials_exception
    return user

@router.get("/me", response_model=UserRead)
async def read_users_me(current_user: UserModel = Depends(get_current_user)):
    import os
    mode = os.environ.get("DATA_MODE", "real")
    if mode == "test":
        return UserRead(
            id=1,
            email="testuser@example.com",
            name="Test User",
            is_active=True,
            created_at="2025-01-01T00:00:00",
            updated_at="2025-01-01T00:00:00"
        )
    elif mode == "seed":
        return UserRead(
            id=2,
            email="seeduser@example.com",
            name="Seed User",
            is_active=True,
            created_at="2025-01-01T00:00:00",
            updated_at="2025-01-01T00:00:00"
        )
    return current_user

@router.post("/signup", response_model=Token)
async def signup(user_in: UserCreate, session: Session = Depends(get_session)):
    user = get_user_by_email(session, user_in.email)
    if user:
        raise HTTPException(status_code=400, detail="Email already registered")
    user = create_user(session, user_in)
    token = create_access_token({"sub": user.email})
    return Token(access_token=token)

@router.post("/login", response_model=Token)
async def login(user_in: UserLogin, session: Session = Depends(get_session)):
    user = get_user_by_email(session, user_in.email)
    if not user or not verify_password(user_in.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": user.email})
    return Token(access_token=token)
