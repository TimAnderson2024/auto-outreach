import create from "./httpservice"
import type { SortOption } from "../utils/SortUtils";

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

export interface ContactQuery {
    id?: number;
    fullname?: string;
    company?: string;
    sortField?: SortOption;
    sortDir?: SortOption;
}

// First option listed is the "default" sort option
export const ContactSortFields: SortOption[] = [
    {label: "Company", value: "company"},
    {label: "First Name", value: "firstName"},
    {label: "Last Name", value: "lastName"},
    {label: "Contact Date", value:"firstContact"},
]

const httpService = create("/contacts");

class ContactService {
    async getContacts(query: ContactQuery) {
        const { request }  = httpService.getAll<Contact[]>(query);
        const response = await request
        return response.data
    }

    async getContactById(id: number) {
        const { request }  = httpService.getAll<Contact[]>({ id });
        const response = await request
        return response.data
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