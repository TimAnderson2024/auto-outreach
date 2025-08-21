import { useState, useEffect } from "react";
import TemplatePage from "./TemplatePage";
import ContactCard from "./ContactCard";
import type { Contact } from "../services/ContactService";
import ContactService from "../services/ContactService";

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