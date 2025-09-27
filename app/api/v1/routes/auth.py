from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from app.db.session import get_session
from app.schemas.user import UserCreate, UserLogin
from app.schemas.auth import Token
from app.crud.user import get_user_by_email, create_user
from app.utils.security import verify_password, create_access_token

router = APIRouter()

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
