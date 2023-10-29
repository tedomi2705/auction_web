import datetime
from fastapi import Depends, FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
from sqlalchemy.orm import Session

import models, crud
from database import SessionLocal, engine, Base

models.Base.metadata.create_all(bind=engine)
app = FastAPI()


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
async def get():
    return "Hemlo world!"


@app.post("/signup")
async def signup(
    username: str,
    email: str,
    phone: str,
    password: str,
    date_of_birth: datetime.date,
    db: Session = Depends(get_db),
):
    # Check if account already exists
    if crud.get_account_by_username(db, username):
        raise HTTPException(status_code=400, detail="Username already registered")
    if crud.get_account_by_email(db, email):
        raise HTTPException(status_code=400, detail="Email already registered")
    if crud.get_account_by_phone(db, phone):
        raise HTTPException(status_code=400, detail="Phone number already registered")

    # Create new account
    account = models.Account(
        username=username, email=email, phone=phone, password=password, date_of_birth=date_of_birth
    )
    crud.create_account(db, account)
    return account


@app.post("/login")
async def login(username: str, password: str, db: Session = Depends(get_db)):
    account = crud.get_account_by_username(db, username)
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")
    if account.password != password:
        raise HTTPException(status_code=401, detail="Incorrect password")
    return account
