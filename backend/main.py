import datetime
from fastapi import Depends, FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from sqlalchemy.orm import Session
from cruds import auction_crud, payment_crud, product_crud
from cruds import user_crud, bid_crud

import models, schemas
from database import SessionLocal, engine, Base

models.Base.metadata.create_all(bind=engine)  # type: ignore
app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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


# region login
@app.post("/login", tags=["Authentication"])
async def login(login: schemas.Login, db: Session = Depends(get_db)):
    user = user_crud.get_user_by_username(db, login.username)
    if not user:
        raise HTTPException(status_code=404, detail="user not found")
    if user.password != login.password:
        raise HTTPException(status_code=401, detail="Incorrect password")
    return user


@app.post("/signup", tags=["Authentication"])
async def signup(
    signup: schemas.SignUp,
    db: Session = Depends(get_db),
):
    # Check if user already exists
    if user_crud.get_user_by_username(db, signup.username):
        raise HTTPException(status_code=400, detail="Username already registered")
    if user_crud.get_user_by_email(db, signup.email):
        raise HTTPException(status_code=400, detail="Email already registered")
    if user_crud.get_user_by_phone(db, signup.phone):
        raise HTTPException(status_code=400, detail="Phone number already registered")

    # Create new user
    user = models.User(
        username=signup.username,
        email=signup.email,
        phone=signup.phone,
        password=signup.password,
        date_of_birth=signup.date_of_birth,
        first_name=signup.first_name,
        last_name=signup.last_name
    )
    user_crud.create_user(db, user)
    return user


# endregion


# region users
@app.get("/users", tags=["Users"])
async def get_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return user_crud.get_users(db, skip=skip, limit=limit)


@app.get("/users/{user_id}", tags=["Users"])
async def get_user(user_id: int, db: Session = Depends(get_db)):
    return user_crud.get_user(db, user_id=user_id)


@app.put("/users/{user_id}", tags=["Users"])
async def update_user(
    user_id: int, user: schemas.SignUp, db: Session = Depends(get_db)
):
    return user_crud.update_user(db, user_id=user_id, user=user)


@app.delete("/users/{user_id}", tags=["Users"])
async def delete_user(user_id: int, db: Session = Depends(get_db)):
    return user_crud.delete_user(db, user_id=user_id)


# endregion


# region auctions
@app.get("/auctions", tags=["Auctions"])
async def get_auctions(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return auction_crud.get_auctions(db, skip=skip, limit=limit)


@app.get("/auctions/{auction_id}", tags=["Auctions"])
async def get_auction(auction_id: int, db: Session = Depends(get_db)):
    return auction_crud.get_auction(db, auction_id=auction_id)


@app.post("/auction", tags=["Auctions"])
async def create_auction(auction: schemas.AuctionCreate, db: Session = Depends(get_db)):
    return auction_crud.create_auction(db, auction=auction)


@app.put("/auctions/{auction_id}", tags=["Auctions"])
async def update_auction(
    auction_id: int, auction: schemas.AuctionUpdate, db: Session = Depends(get_db)
):
    return auction_crud.update_auction(db, auction_id=auction_id, auction=auction)


@app.delete("/auctions/{auction_id}", tags=["Auctions"])
async def delete_auction(auction_id: int, db: Session = Depends(get_db)):
    return auction_crud.delete_auction(db, auction_id=auction_id)


# endregion


# region bids
@app.get("/bids", tags=["Bids"])
async def get_bids(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return bid_crud.get_bids(db, skip=skip, limit=limit)


@app.get("/bids/{bid_id}", tags=["Bids"])
async def get_bid(bid_id: int, db: Session = Depends(get_db)):
    return bid_crud.get_bid(db, bid_id=bid_id)


@app.post("/bid", tags=["Bids"])
async def create_bid(bid: schemas.BidCreate, db: Session = Depends(get_db)):
    return bid_crud.create_bid(db, bid=bid)


@app.put("/bids/{bid_id}", tags=["Bids"])
async def update_bid(
    bid_id: int, bid: schemas.BidUpdate, db: Session = Depends(get_db)
):
    return bid_crud.update_bid(db, bid_id=bid_id, bid=bid)


@app.delete("/bids/{bid_id}", tags=["Bids"])
async def delete_bid(bid_id: int, db: Session = Depends(get_db)):
    return bid_crud.delete_bid(db, bid_id=bid_id)


# endregion


# region payments
@app.get("/payments", tags=["Payments"])
async def get_payments(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return payment_crud.get_payments(db, skip=skip, limit=limit)


@app.get("/payments/{payment_id}", tags=["Payments"])
async def get_payment(payment_id: int, db: Session = Depends(get_db)):
    return payment_crud.get_payment(db, payment_id=payment_id)


@app.post("/payment", tags=["Payments"])
async def create_payment(payment: schemas.PaymentCreate, db: Session = Depends(get_db)):
    return payment_crud.create_payment(db, payment=payment)


@app.put("/payments/{payment_id}", tags=["Payments"])
async def update_payment(
    payment_id: int, payment: schemas.PaymentUpdate, db: Session = Depends(get_db)
):
    return payment_crud.update_payment(db, payment_id=payment_id, payment=payment)


@app.delete("/payments/{payment_id}", tags=["Payments"])
async def delete_payment(payment_id: int, db: Session = Depends(get_db)):
    return payment_crud.delete_payment(db, payment_id=payment_id)


# endregion

# region products
@app.get("/products", tags=["Products"])
async def get_products(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return product_crud.get_products(db, skip=skip, limit=limit)

@app.get("/products/{product_id}", tags=["Products"])
async def get_product(product_id: int, db: Session = Depends(get_db)):
    return product_crud.get_product(db, product_id=product_id)

@app.post("/product", tags=["Products"])
async def create_product(product: schemas.ProductCreate, db: Session = Depends(get_db)):
    return product_crud.create_product(db, product=product)

@app.put("/products/{product_id}", tags=["Products"])
async def update_product(
    product_id: int, product: schemas.ProductUpdate, db: Session = Depends(get_db)
):
    return product_crud.update_product(db, product_id=product_id, product=product)

@app.delete("/products/{product_id}", tags=["Products"])
async def delete_product(product_id: int, db: Session = Depends(get_db)):
    return product_crud.delete_product(db, product_id=product_id)

# endregion