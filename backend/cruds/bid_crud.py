
from sqlalchemy.orm import Session
from typing import List, Optional

from models import Bid
from schemas import BidCreate, BidUpdate


def get_bid(db: Session, bid_id: int) -> Optional[Bid]:
    return db.query(Bid).filter(Bid.id == bid_id).first()


def get_bids(db: Session, skip: int = 0, limit: int = 100) -> List[Bid]:
    return db.query(Bid).offset(skip).limit(limit).all()


def create_bid(db: Session, bid: BidCreate) -> Bid:
    db_bid = Bid(**bid.dict())
    db.add(db_bid)
    db.commit()
    db.refresh(db_bid)
    return db_bid


def update_bid(db: Session, bid_id: int, bid: BidUpdate) -> Optional[Bid]:
    db_bid = db.query(Bid).filter(Bid.id == bid_id).first()
    if db_bid:
        for key, value in bid.dict(exclude_unset=True).items():
            setattr(db_bid, key, value)
        db.commit()
        db.refresh(db_bid)
    return db_bid


def delete_bid(db: Session, bid_id: int) -> Optional[Bid]:
    db_bid = db.query(Bid).filter(Bid.id == bid_id).first()
    if db_bid:
        db.delete(db_bid)
        db.commit()
    return db_bid
