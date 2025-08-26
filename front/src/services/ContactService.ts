export interface Contact {
    id: number;
    fullName: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    linkedIn: string;
    company: string;
    firstContact: Date;
    boosterCheck: Date;
    followupDate: Date;
}


import type { SortOption } from "../utils/SortUtils";
import { SortDirs } from "../utils/SortUtils"

// Helper function outside the class to avoid recursion
function addBusinessDays(date: Date, days: number): Date {
    let result = new Date(date);
    let added = 0;
    while (added < days) {
        result.setDate(result.getDate() + 1);
        if (result.getDay() !== 0 && result.getDay() !== 6) {
            added++;
        }
    }
    return result;
}

// First option listed is the "default" sort option
export const ContactSortFields: SortOption[] = [
    {label: "Company", value: "company"},
    {label: "First Name", value: "firstName"},
    {label: "Last Name", value: "lastName"},
    {label: "Contact Date", value:"firstContact"},
]

class ContactService {
    private dummyContacts: Contact[] = (() => {
        // Use a fixed firstContact date for demo purposes
        const baseDate = new Date('2025-08-26T09:00:00');
        const baseDate2 = new Date('2025-08-27T09:00:00');
        const baseDate3 = new Date('2025-08-28T09:00:00');
        return [
            {
                id: 1,
                fullName: "John Smith",
                firstName: "John",
                lastName: "Smith",
                email: "john.smith@techcorp.com",
                phone: "(555) 123-4567",
                linkedIn: "https://linkedin.com/in/johnsmith",
                company: "TechCorp Inc.",
                firstContact: baseDate,
                boosterCheck: addBusinessDays(baseDate, 3),
                followupDate: addBusinessDays(baseDate, 7),
            },
            {
                id: 2,
                fullName: "Sarah Johnson",
                firstName: "Sarah",
                lastName: "Johnson",
                email: "sarah.johnson@innovate.io",
                phone: "(555) 987-6543",
                linkedIn: "https://linkedin.com/in/sarahjohnson",
                company: "Innovate Solutions",
                firstContact: baseDate,
                boosterCheck: addBusinessDays(baseDate, 3),
                followupDate: addBusinessDays(baseDate, 7),
            },
            {
                id: 3,
                fullName: "Michael Chen",
                firstName: "Michael",
                lastName: "Chen",
                email: "m.chen@startupx.com",
                phone: "(555) 456-7890",
                linkedIn: "https://linkedin.com/in/michaelchen",
                company: "StartupX",
                firstContact: baseDate2,
                boosterCheck: addBusinessDays(baseDate2, 3),
                followupDate: addBusinessDays(baseDate2, 7),
            },
            {
                id: 4,
                fullName: "Emily Rodriguez",
                firstName: "Emily",
                lastName: "Rodriguez",
                email: "emily.r@globaltech.net",
                phone: "(555) 321-9876",
                linkedIn: "https://linkedin.com/in/emilyrodriguez",
                company: "Global Tech Networks",
                firstContact: baseDate2,
                boosterCheck: addBusinessDays(baseDate2, 3),
                followupDate: addBusinessDays(baseDate2, 7),
            },
            {
                id: 5,
                fullName: "David Wilson",
                firstName: "David",
                lastName: "Wilson",
                email: "david.wilson@financeplus.com",
                phone: "(555) 654-3210",
                linkedIn: "https://linkedin.com/in/davidwilson",
                company: "FinancePlus",
                firstContact: baseDate2,
                boosterCheck: addBusinessDays(baseDate2, 3),
                followupDate: addBusinessDays(baseDate2, 7),
            },
            {
                id: 6,
                fullName: "Lisa Thompson",
                firstName: "Lisa",
                lastName: "Thompson",
                email: "lisa.thompson@marketingpro.org",
                phone: "(555) 789-0123",
                linkedIn: "https://linkedin.com/in/lisathompson",
                company: "Marketing Pro",
                firstContact: baseDate3,
                boosterCheck: addBusinessDays(baseDate3, 3),
                followupDate: addBusinessDays(baseDate3, 7),
            }
        ];
    })();

    getContacts(sortField: SortOption = ContactSortFields[0], sortDir: SortOption = SortDirs[0]): Contact[] {
        return this.sortContacts(this.dummyContacts, sortField.value, sortDir.value);
    }

    getContactById(id: number): Contact | undefined {
        return this.dummyContacts.find(contact => contact.id === id);
    }

    sortContacts(unsorted: Contact[], newField: String, newDir: String): Contact[] {
        const sortField = newField as keyof Contact
        const sorted = [...unsorted].sort((a, b) => {
            if (a[sortField] < b[sortField]) return newDir === "asc" ? -1 : 1;
            if (a[sortField] > b[sortField]) return newDir === "asc" ? 1 : -1;
            return 0;
        }); 
        return sorted
    }
}

export default new ContactService();