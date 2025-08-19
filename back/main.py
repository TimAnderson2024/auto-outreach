from app import engine, SessionLocal
from models import Base, Contact, Company


def main():
    Base.metadata.create_all(bind=engine)

    session = SessionLocal()

    with SessionLocal() as session:
        # Create test companies
        company1 = Company(name="Acme Corp", industry="Technology")
        company2 = Company(name="Beta LLC", industry="Finance")
        session.add_all([company1, company2])
        session.commit()

        # Create test contacts
        contact1 = Contact(
            fullname="John Roberts",
            firstname="John",
            lastname="Roberts",
            email="john.roberts@acme.com",
            phone="123-456-7890",
            linkedin="johnroberts",
            role="Engineer",
            company_id=company1.id,
        )
        contact2 = Contact(
            fullname="Jane Smith",
            firstname="Jane",
            lastname="Smith",
            email="jane.smith@beta.com",
            phone="987-654-3210",
            linkedin="janesmith",
            role="Manager",
            company_id=company2.id,
        )
        contact3 = Contact(
            fullname="Alice Johnson",
            firstname="Alice",
            lastname="Johnson",
            email="alice.johnson@acme.com",
            phone=None,
            linkedin="alicejohnson",
            role="Designer",
            company_id=company1.id,
        )
        session.add_all([contact1, contact2, contact3])
        session.commit()


if __name__ == "__main__":
    main()
