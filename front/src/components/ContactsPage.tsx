import { useState, useEffect } from "react";

import TemplatePage from "./TemplatePage";
import ContactCard from "./ContactCard";
import SortMenu from "./SortMenu";
import PaginationControls from "./PaginationControls";

import type { Contact } from "../services/ContactService";
import { ContactSortFields } from "../services/ContactService";
import ContactService from "../services/ContactService";

import type { SortChange } from "../utils/SortUtils";
import { sortDirs } from "../utils/SortUtils";

function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const loadedContacts = ContactService.getContacts();
    const field = ContactSortFields[0].value;
    const dir = sortDirs[0].value;
    const sortedContacts = [...loadedContacts].sort((a, b) => {
      if (a[field as keyof Contact] < b[field as keyof Contact])
        return dir === "asc" ? -1 : 1;
      if (a[field as keyof Contact] > b[field as keyof Contact])
        return dir === "asc" ? 1 : -1;
      return 0;
    });
    setContacts(sortedContacts);
    setLoading(false);
  }, []);

  const handleSortChange = (change: SortChange) => {
    // Map 'ascending'/'descending' to 'asc'/'desc' for sorting logic
    const dir = change.dir === "ascending" ? "asc" : "desc";
    const field = change.field as keyof Contact;
    const sortedContacts = [...contacts].sort((a, b) => {
      if (a[field] < b[field]) return dir === "asc" ? 1 : -1;
      if (a[field] > b[field]) return dir === "asc" ? -1 : 1;
      return 0;
    });
    setContacts(sortedContacts);
  };

  return (
    <TemplatePage>
      <div className="d-flex justify-content-between align-items-center">
        <SortMenu
          sortFields={ContactSortFields}
          onSortChange={handleSortChange}
        />
        <PaginationControls />
      </div>
      <hr />
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
