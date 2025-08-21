import { Row, Col, Button } from "react-bootstrap";
import type { Contact } from "../services/ContactService";

interface ContactCardProps {
    contact: Contact;
}

function ContactCard({ contact }: ContactCardProps) {
    return (
        <Row className="align-items-center py-2 border-bottom">
            <Col sm={3} className="text-truncate">
                <strong>{contact.company}</strong>
            </Col>
            <Col sm={3} className="text-truncate">
                {contact.fullName}
            </Col>
            <Col sm={3} className="text-truncate">
                {contact.email}
            </Col>
            <Col sm={2} className="text-truncate">
                {contact.phone}
            </Col>
            <Col sm={1}>
                <Button className="ms-auto d-block" variant="outline-danger" size="sm">
                    Delete
                </Button>
            </Col>
        </Row>
    )
}

export default ContactCard;