from sqlalchemy.orm import Session
import models


def get_account(db: Session, account_id: int):
    return db.query(models.Account).filter(models.Account.id == account_id).first()


def get_account_by_username(db: Session, username: str):
    return db.query(models.Account).filter(models.Account.username == username).first()


def get_account_by_email(db: Session, email: str):
    return db.query(models.Account).filter(models.Account.email == email).first()


def get_account_by_phone(db: Session, phone: str):
    return db.query(models.Account).filter(models.Account.phone == phone).first()


def get_accounts(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Account).offset(skip).limit(limit).all()


def create_account(db: Session, account: models.Account):
    db.add(account)
    db.commit()
    db.refresh(account)
    return account


def update_account(db: Session, account_id: int, account: models.Account):
    db_account = db.query(models.Account).filter(models.Account.id == account_id).first()
    if db_account:
        db_account.username = account.username
        db_account.email = account.email
        db_account.phone = account.phone
        db_account.password = account.password
        db_account.is_active = account.is_active
        db_account.is_admin = account.is_admin
        db.commit()
        db.refresh(db_account)
    return db_account


def delete_account(db: Session, account_id: int):
    db_account = db.query(models.Account).filter(models.Account.id == account_id).first()
    db.delete(db_account)
    db.commit()
    return db_account