from datetime import date, datetime
from typing import List, Optional
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey, Enum
from sqlalchemy.orm import Mapped, DeclarativeBase, mapped_column, relationship


class Base(DeclarativeBase):
    pass


db = SQLAlchemy(model_class=Base)


class Contact(db.Model):
    __tablename__ = "contacts"
    id: Mapped[int] = mapped_column(primary_key=True)

    name: Mapped[str]
    email: Mapped[str] = mapped_column(unique=True)
    phone: Mapped[Optional[str]] = mapped_column(nullable=True)
    linkedin: Mapped[Optional[str]] = mapped_column(nullable=True)

    firstContactDate: Mapped[date]
    firstContactSent: Mapped[bool]
    boosterCheckDate: Mapped[date]
    followupDate: Mapped[date]
    followupSent: Mapped[bool]

    contactType: Mapped[str] = mapped_column(
        Enum("Booster", "Obligate", "Curmudgeon", name="contact_type_enum"),
        nullable=True,
    )

    company_id: Mapped[int] = mapped_column(ForeignKey("companies.id"))
    company: Mapped["Company"] = relationship(back_populates="contacts")


class Company(db.Model):
    __tablename__ = "companies"
    id: Mapped[int] = mapped_column(primary_key=True)

    name: Mapped[str]
    industry: Mapped[str]

    contacts: Mapped[List["Contact"]] = relationship(back_populates="company")
