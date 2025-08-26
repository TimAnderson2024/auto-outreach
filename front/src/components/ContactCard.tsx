import { Row, Col, Button } from "react-bootstrap";
import type { Contact } from "../services/ContactService";

interface ContactCardProps {
  contact: Contact;
}

function ContactCard({ contact }: ContactCardProps) {
  return (
    <Row className="align-items-center py-2 border-bottom">
      <Col sm={2} className="text-truncate">
        <strong>{contact.company}</strong>
      </Col>
      <Col sm={2} className="text-truncate">
        {contact.fullName}
      </Col>
      <Col sm={2} className="text-truncate">
        {contact.email}
      </Col>
      <Col sm={1} className="text-center text-truncate">
        {contact.firstContact
          ? new Date(contact.firstContact).toLocaleDateString()
          : "N/A"}
      </Col>
      <Col sm={1} className="text-center text-truncate">
        {contact.boosterCheck
          ? new Date(contact.boosterCheck).toLocaleDateString()
          : "N/A"}
      </Col>
      <Col sm={1} className="text-center text-truncate">
        {contact.followupDate
          ? new Date(contact.followupDate).toLocaleDateString()
          : "N/A"}
      </Col>
      <Col sm="auto" className="ms-auto d-flex gap-1">
        <Button variant="outline-primary" size="sm" title="Edit contact">
          <i className="bi bi-pencil"></i>
        </Button>
        <Button variant="outline-danger" size="sm" title="Delete contact">
          <i className="bi bi-trash"></i>
        </Button>
      </Col>
    </Row>
  );
}

export default ContactCard;
