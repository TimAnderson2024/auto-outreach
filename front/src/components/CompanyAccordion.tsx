import { Accordion } from "react-bootstrap";
import ContactCard from "../components/ContactCard";

import type { Company } from "../services/CompanyService";

interface CompanyAccordionProps {
  company: Company;
}

function CompanyAccordion({ company }: CompanyAccordionProps) {
  return (
    <Accordion defaultActiveKey="0" flush>
      <Accordion.Item eventKey="0">
        <Accordion.Header>{company.name}</Accordion.Header>
        <Accordion.Body>
          {company.contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default CompanyAccordion;
