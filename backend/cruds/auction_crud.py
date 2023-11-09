
from sqlalchemy.orm import Session
from typing import List, Optional

from models import Auction
from schemas import AuctionCreate, AuctionUpdate


def get_auction(db: Session, auction_id: int) -> Optional[Auction]:
    return db.query(Auction).filter(Auction.id == auction_id).first()


def get_auctions(db: Session, skip: int = 0, limit: int = 100) -> List[Auction]:
    return db.query(Auction).offset(skip).limit(limit).all()


def create_auction(db: Session, auction: AuctionCreate) -> Auction:
    db_auction = Auction(**auction.dict())
    db.add(db_auction)
    db.commit()
    db.refresh(db_auction)
    return db_auction


def update_auction(db: Session, auction_id: int, auction: AuctionUpdate) -> Optional[Auction]:
    db_auction = db.query(Auction).filter(Auction.id == auction_id).first()
    if db_auction:
        for field, value in auction.dict(exclude_unset=True).items():
            setattr(db_auction, field, value)
        db.commit()
        db.refresh(db_auction)
    return db_auction


def delete_auction(db: Session, auction_id: int) -> Optional[Auction]:
    db_auction = db.query(Auction).filter(Auction.id == auction_id).first()
    if db_auction:
        db.delete(db_auction)
        db.commit()
    return db_auction
