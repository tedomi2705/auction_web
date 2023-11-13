from itertools import product
from sqlalchemy import Boolean, Column, Date, ForeignKey, Integer, String, DateTime, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    phone = Column(String, unique=True, index=True)
    date_of_birth = Column(Date)
    password = Column(String) # yes plaintext is bad, but this is a demo
    first_name = Column(String)
    last_name = Column(String)
    address = Column(String)
    is_authenticated = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)


class Auction(Base):
    __tablename__ = "auctions"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    product_id = Column(Integer, ForeignKey("products.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    start_date = Column(DateTime, default=datetime.utcnow)
    end_date = Column(DateTime)
    starting_bid = Column(Float)
    current_bid = Column(Float)
    is_active = Column(Boolean, default=True)


class Bid(Base):
    __tablename__ = "bids"

    id = Column(Integer, primary_key=True, index=True)
    auction_id = Column(Integer, ForeignKey("auctions.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    bid_price = Column(Float)
    is_winner = Column(Boolean, default=False)


class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    auction_id = Column(Integer, ForeignKey("auctions.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    is_paid = Column(Boolean, default=False)


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)
    type = Column(String)
    user_id = Column(Integer, ForeignKey("users.id"))
    image_url = Column(String)


