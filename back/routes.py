from flask import abort, request, jsonify
from models import db, Contact, Company
from sqlalchemy.orm.exc import NoResultFound, MultipleResultsFound


def register_routes(app):
    # Fetch an item from the database by ID
    def fetch_by_id(model, data: dict):
        id = data.get("id")
        if not id:
            abort(400, description="id is required")
        return db.get_or_404(model, id)

    @app.errorhandler(ValueError)
    def handle_value_error(e):
        return jsonify({"error": str(e)}), 400

    @app.route("/contacts", methods=["POST"])
    def get_contacts():
        # Create filter from HTTP request
        filter_by = ["firstname", "lastname", "company_id", "email", "role"]
        filters = {}
        for field in filter_by:
            field_value = request.args.get(field)

            if field_value is not None:
                filters[field] = field_value

        # Send the query and convert to dict
        contacts = Contact.query.filter_by(**filters).all()
        contacts = [contact_to_dict(contact) for contact in contacts]

        return jsonify(contacts), 200

    def contact_to_dict(contact: Contact):
        return {
            "id": contact.id,
            "fullname": contact.fullname,
            "firstname": contact.firstname,
            "lastname": contact.lastname,
            "email": contact.email,
            "phone": contact.phone,
            "linkedin": contact.linkedin,
            "role": contact.role,
            "company_id": contact.company_id,
        }

    @app.route("/contacts/create", methods=["POST"])
    def create_contact():
        data: dict = request.get_json()

        required_fields = ["firstname", "lastname", "email", "company_id"]
        missing = [field for field in required_fields if not data.get(field)]
        if missing:
            return (
                jsonify({"error": f"Missing required fields: {', '.join(missing)}"}),
                400,
            )

        new_contact = Contact(
            fullname=f"{data['firstname']} {data['lastname']}",
            firstname=data["firstname"],
            lastname=data["lastname"],
            email=data["email"],
            phone=data.get("phone"),
            linkedin=data.get("linkedin"),
            role=data.get("role"),
            company_id=data.get("company_id"),
        )

        db.session.add(new_contact)
        db.session.commit()
        return (
            jsonify({"id": new_contact.id, "message": "Contact created successfully"}),
            201,
        )

    @app.route("/contacts/update", methods=["PUT"])
    def update_contact():
        data: dict = request.get_json()
        contact: Contact = fetch_by_id(Contact, data)

        for field in [
            "firstname",
            "lastname",
            "email",
            "phone",
            "linkedin",
            "role",
            "company_id",
        ]:
            if field in data:
                setattr(contact, field, data[field])

        if "firstname" in data or "lastname" in data:
            new_firstname = data.get("firstname", contact.firstname)
            new_lastname = data.get("lastname", contact.lastname)
            contact.fullname = f"{new_firstname} {new_lastname}"
        db.session.commit()

        return jsonify({"message": "Contact updated successfully"}), 200
