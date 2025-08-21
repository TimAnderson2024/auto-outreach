import { useState, useEffect } from "react";

import TemplatePage from "./TemplatePage";
import ContactCard from "./ContactCard";
import SortMenu from "./SortMenu";

import type { Contact } from "../services/ContactService";
import ContactService from "../services/ContactService";
import PaginationControls from "./PaginationControls";

function ContactsPage() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true);
        setContacts(ContactService.getContacts())
        setLoading(false)
    }, []);

    return (
        <TemplatePage>
            <div className="d-flex justify-content-between align-items-center">
                <SortMenu/>
                <PaginationControls/>
            </div>
            <hr/>   
            {loading ? (
                <div>Loading contacts...</div>
            ) : (
                contacts.map(contact => (
                    <ContactCard key={contact.id} contact={contact} />
                ))
            )}
        </TemplatePage>
    )
}

export default ContactsPage;