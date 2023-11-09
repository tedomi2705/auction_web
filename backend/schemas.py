from calendar import c
from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class UserBase(BaseModel):
    username: str
    email: str
    phone: str
    date_of_birth: Optional[datetime]
    first_name: str
    last_name: str
    address: str
    is_authenticated: bool = True
    is_admin: bool = False


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int

    class Config:
        from_attributes = True


class AuctionBase(BaseModel):
    name: str
    product_id: int
    user_id: int
    start_date: datetime
    end_date: Optional[datetime]
    starting_bid: float
    current_bid: float
    is_active: bool = True


class AuctionCreate(AuctionBase):
    pass


class AuctionUpdate(AuctionBase):
    pass


class Auction(AuctionBase):
    id: int

    class Config:
        from_attributes = True


class BidBase(BaseModel):
    auction_id: int
    user_id: int
    bid_price: float
    is_winner: bool = False


class BidCreate(BidBase):
    pass


class BidUpdate(BaseModel):
    bid_price: float
    is_winner: bool = False

    class Config:
        json_schema_extra = {"example": {"bid_price": 100.0}}


class Bid(BidBase):
    id: int

    class Config:
        from_attributes = True


class PaymentBase(BaseModel):
    auction_id: int
    user_id: int


class PaymentCreate(PaymentBase):
    pass


class PaymentUpdate(BaseModel):
    is_paid: bool = False

    class Config:
        json_schema_extra = {"example": {"is_paid": True}}


class Payment(PaymentBase):
    id: int

    class Config:
        from_attributes = True


class ProductBase(BaseModel):
    name: str
    description: str
    type: str
    user_id: int
    image_url: str


class ProductCreate(ProductBase):
    pass



class ProductUpdate(BaseModel):
    name: Optional[str]
    description: Optional[str]
    type: Optional[str]
    user_id: Optional[int]
    image_url: Optional[str]

    class Config:
        json_schema_extra = {
            "example": {
                "name": "Product Name",
                "description": "Product Description",
                "type": "Product Type",
                "user_id": 1,
                "image_url": "https://example.com/image.jpg"
            }
        }



class Product(ProductBase):
    id: int

    class Config:
        from_attributes = True
