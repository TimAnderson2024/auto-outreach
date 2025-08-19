from typing import Optional
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, DeclarativeBase, mapped_column, relationship


class Base(DeclarativeBase):
    pass


db = SQLAlchemy(model_class=Base)


class Contact(db.Model):
    __tablename__ = "contacts"
    id: Mapped[int] = mapped_column(primary_key=True)

    fullname: Mapped[str]
    firstname: Mapped[str]
    lastname: Mapped[str]
    email: Mapped[str] = mapped_column(unique=True)
    phone: Mapped[Optional[str]] = mapped_column(nullable=True)
    linkedin: Mapped[Optional[str]] = mapped_column(nullable=True)
    role: Mapped[Optional[str]] = mapped_column(nullable=True)

    company_id: Mapped[int] = mapped_column(ForeignKey("companies.id"))
    company: Mapped["Company"] = relationship(back_populates="contacts")


class Company(db.Model):
    __tablename__ = "companies"
    id: Mapped[int] = mapped_column(primary_key=True)

    name: Mapped[str]
    industry: Mapped[str]

    contacts: Mapped["Contact"] = relationship(back_populates="company")
