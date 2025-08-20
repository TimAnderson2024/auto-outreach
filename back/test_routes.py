import pytest
from app import app, db
from models import Contact, Company


def test_update_contact_success(client):
    # Create a company and contact
    with app.app_context():
        company = Company(name="UpdateCo", industry="Tech")
        db.session.add(company)
        db.session.commit()
        contact = Contact(
            fullname="Jane Doe",
            firstname="Jane",
            lastname="Doe",
            email="jane@example.com",
            company_id=company.id,
        )
        db.session.add(contact)
        db.session.commit()
        contact_id = contact.id

    # Update firstname and check fullname
    response = client.put(
        "/contacts/update",
        json={"id": contact_id, "firstname": "Janet"},
    )
    assert response.status_code == 200
    data = response.get_json()
    assert data["message"] == "Contact updated successfully"

    # Verify update
    with app.app_context():
        updated = db.session.get(Contact, contact_id)
        assert updated.firstname == "Janet"
        assert updated.fullname == "Janet Doe"

    # Update lastname and check fullname
    response = client.put(
        "/contacts/update",
        json={"id": contact_id, "lastname": "Smith"},
    )
    assert response.status_code == 200
    with app.app_context():
        updated = db.session.get(Contact, contact_id)
        assert updated.lastname == "Smith"
        assert updated.fullname == "Janet Smith"


def test_update_contact_missing_id(client):
    response = client.put(
        "/contacts/update",
        json={"firstname": "NoId"},
    )
    assert response.status_code == 400


def test_update_contact_not_found(client):
    response = client.put(
        "/contacts/update",
        json={"id": 9999, "firstname": "Ghost"},
    )
    assert response.status_code == 404


@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
        yield client
        with app.app_context():
            db.drop_all()


def test_create_contact_success(client):
    # Create a company first
    with app.app_context():
        company = Company(name="TestCo", industry="Tech")
        db.session.add(company)
        db.session.commit()
        company_id = company.id

    response = client.post(
        "/contacts/create",
        json={
            "firstname": "Alice",
            "lastname": "Smith",
            "email": "alice@example.com",
            "company_id": company_id,
        },
    )
    assert response.status_code == 201
    data = response.get_json()
    assert "id" in data
    assert data["message"] == "Contact created successfully"


def test_create_contact_no_company(client):
    response = client.post(
        "/contacts/create",
        json={"firstname": "Bob", "lastname": "Jones", "email": "bob@example.com"},
    )
    assert response.status_code == 400


def test_create_contact_company_not_exist(client):
    response = client.post(
        "/contacts/create",
        json={
            "firstname": "Carol",
            "lastname": "White",
            "email": "carol@example.com",
            "company": "NonExistentCo",
        },
    )
    assert response.status_code == 500 or response.status_code == 400


def test_get_contacts(client):
    # Add a company and a contact
    with app.app_context():
        company = Company(name="GetCo", industry="Tech")
        db.session.add(company)
        db.session.commit()
        contact = Contact(
            fullname="Dan Brown",
            firstname="Dan",
            lastname="Brown",
            email="dan@example.com",
            company_id=company.id,
        )
        db.session.add(contact)
        db.session.commit()

    response = client.post("/contacts", query_string={"firstname": "Dan"})
    assert response.status_code == 200
    data = response.get_json()
    assert isinstance(data, list)
    assert any(c["firstname"] == "Dan" for c in data)
