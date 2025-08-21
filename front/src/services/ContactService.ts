export interface Contact {
    id: number;
    fullName: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    linkedIn: string;
    company: string;
}

class ContactService {
    private dummyContacts: Contact[] = [
        {
            id: 1,
            fullName: "John Smith",
            firstName: "John",
            lastName: "Smith",
            email: "john.smith@techcorp.com",
            phone: "(555) 123-4567",
            linkedIn: "https://linkedin.com/in/johnsmith",
            company: "TechCorp Inc."
        },
        {
            id: 2,
            fullName: "Sarah Johnson",
            firstName: "Sarah",
            lastName: "Johnson",
            email: "sarah.johnson@innovate.io",
            phone: "(555) 987-6543",
            linkedIn: "https://linkedin.com/in/sarahjohnson",
            company: "Innovate Solutions"
        },
        {
            id: 3,
            fullName: "Michael Chen",
            firstName: "Michael",
            lastName: "Chen",
            email: "m.chen@startupx.com",
            phone: "(555) 456-7890",
            linkedIn: "https://linkedin.com/in/michaelchen",
            company: "StartupX"
        },
        {
            id: 4,
            fullName: "Emily Rodriguez",
            firstName: "Emily",
            lastName: "Rodriguez",
            email: "emily.r@globaltech.net",
            phone: "(555) 321-9876",
            linkedIn: "https://linkedin.com/in/emilyrodriguez",
            company: "Global Tech Networks"
        },
        {
            id: 5,
            fullName: "David Wilson",
            firstName: "David",
            lastName: "Wilson",
            email: "david.wilson@financeplus.com",
            phone: "(555) 654-3210",
            linkedIn: "https://linkedin.com/in/davidwilson",
            company: "FinancePlus"
        },
        {
            id: 6,
            fullName: "Lisa Thompson",
            firstName: "Lisa",
            lastName: "Thompson",
            email: "lisa.thompson@marketingpro.org",
            phone: "(555) 789-0123",
            linkedIn: "https://linkedin.com/in/lisathompson",
            company: "Marketing Pro"
        }
    ];

    getContacts(): Contact[] {
        return this.dummyContacts;
    }

    getContactById(id: number): Contact | undefined {
        return this.dummyContacts.find(contact => contact.id === id);
    }
}

export default new ContactService();