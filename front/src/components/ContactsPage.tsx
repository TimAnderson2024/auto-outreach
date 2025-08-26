import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";

import TemplatePage from "./TemplatePage";
import ContactCard from "./ContactCard";
import SortMenu from "./SortMenu";
import PaginationControls from "./PaginationControls";

import type { Contact } from "../services/ContactService";
import { ContactSortFields } from "../services/ContactService";
import ContactService from "../services/ContactService";

import type { SortOption } from "../utils/SortUtils";
import { SortDirs } from "../utils/SortUtils";

function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState<SortOption>(ContactSortFields[0]);
  const [sortDir, setSortDir] = useState<SortOption>(SortDirs[0]);

  useEffect(() => {
    setLoading(true);
    setContacts(ContactService.getContacts());
    setLoading(false);
  }, []);

  const handleSortChange = (newField: SortOption, newDir: SortOption) => {
    setSortField(newField);
    setSortDir(newDir);
    setContacts(ContactService.getContacts(newField, newDir));
  };

  return (
    <TemplatePage>
      <div className="d-flex justify-content-between align-items-center">
        <SortMenu
          curField={sortField}
          curDir={sortDir}
          allFields={ContactSortFields}
          allDirs={SortDirs}
          onSortChange={handleSortChange}
        />
        <PaginationControls />
      </div>
      <hr />
      <Row className="align-items-center py-2 border-bottom bg-light fw-bold">
        <Col sm={2}>Company</Col>
        <Col sm={2}>Name</Col>
        <Col sm={2}>Email</Col>
        <Col sm={1}>First Contact</Col>
        <Col sm={1}>Booster Check</Col>
        <Col sm={1} className="text-nowrap">
          Follow-Up Date
        </Col>
        <Col sm="auto" />
      </Row>
      {loading ? (
        <div>Loading contacts...</div>
      ) : (
        contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))
      )}
    </TemplatePage>
  );
}

export default ContactsPage;
