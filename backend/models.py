from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base


class Account(Base):
    __tablename__ = "accounts"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    phone = Column(String, unique=True, index=True)
    date_of_birth = Column(DateTime)
    password = Column(String)
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)


class Auction(Base):
    __tablename__ = "auctions"

    id = Column(Integer, primary_key=True, index=True)
    item_description = Column(String)
    start_date = Column(DateTime, default=datetime.utcnow)
    end_date = Column(DateTime)
    starting_bid = Column(Float)
    current_bid = Column(Float)
    is_active = Column(Boolean, default=True)


class Bid(Base):
    __tablename__ = "bids"

    id = Column(Integer, primary_key=True, index=True)
    auction_id = Column(Integer, ForeignKey("auctions.id"))
    user_id = Column(Integer, ForeignKey("accounts.id"))
    bid_price = Column(Float)
    is_winner = Column(Boolean, default=False)

    auction = relationship("Auction", back_populates="bids")
    user = relationship("Account", back_populates="bids")


class Authentication(Base):
    __tablename__ = "authentications"

    user_id = Column(
        Integer, ForeignKey("accounts.id"), primary_key=True, index=True
    )
    email_verified = Column(Boolean, default=False)
    phone_verified = Column(Boolean, default=False)
    user = relationship("Account", back_populates="authentication")


class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    bid_id = Column(Integer, ForeignKey("bids.id"))
    payment_status = Column(String)

    bid = relationship("Bid", back_populates="payment")


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)
    image_url = Column(String)
    auction_id = Column(Integer, ForeignKey("auctions.id"))

    auction = relationship("Auction", back_populates="product")


Auction.bids = relationship("Bid", back_populates="auction")
Account.bids = relationship("Bid", back_populates="user")
Account.authentication = relationship("Authentication", back_populates="user")
Bid.payment = relationship("Payment", uselist=False, back_populates="bid")
Auction.product = relationship("Product", uselist=False, back_populates="auction")
