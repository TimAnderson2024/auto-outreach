import { useState, useEffect } from "react";

// Custom Types
import type { Column } from "../components/ContactTable";
import type { Contact } from "../services/ContactService";
import type { SortOption } from "../utils/SortUtils";

// Constants
import { SortDirs } from "../utils/SortUtils";
import { ContactSortFields } from "../services/ContactService";

// Services
import ContactService from "../services/ContactService";

// Custom Components
import TemplatePage from "./TemplatePage";
import ContactTable from "../components/ContactTable";
import SortMenu from "../components/SortMenu";
import PaginationControls from "../components/PaginationControls";

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

  const columns: Column[] = [
    { label: "Company", key: "company" },
    { label: "Name", key: "fullName" },
    { label: "Email", key: "email" },
    { label: "Outreach", key: "firstContact" },
    { label: "Booster Check", key: "boosterCheck" },
    { label: "Follow-Up", key: "followupDate" },
  ];

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
      {loading ? (
        "Loading Contacts..."
      ) : (
        <ContactTable columns={columns} contacts={contacts} />
      )}
    </TemplatePage>
  );
}

export default ContactsPage;
