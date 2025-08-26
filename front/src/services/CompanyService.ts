import type { Contact } from "./ContactService";
import ContactService from "./ContactService";
import type { SortOption } from "../utils/SortUtils";
import { SortDirs } from "../utils/SortUtils";

export interface Company {
  id: number;
  name: string;
  industry: string;
  contacts: Contact[];
  lastContacted: Date;
}

export const CompanySortFields: SortOption[] = [
  { label: "Last Contact", value: "lastContacted" },
  { label: "Name", value: "name" },
  { label: "Industry", value: "industry" },
];

class CompanyService {
  private dummyCompanies: Company[] = [
    {
      id: 1,
      name: "TechCorp Inc.",
      industry: "Technology",
      contacts: ContactService.getContacts().filter(
        (c) => c.company === "TechCorp Inc."
      ),
      lastContacted:
        ContactService.getContacts().find((c) => c.company === "TechCorp Inc.")
          ?.firstContact || new Date(),
    },
    {
      id: 2,
      name: "Innovate Solutions",
      industry: "Consulting",
      contacts: ContactService.getContacts().filter(
        (c) => c.company === "Innovate Solutions"
      ),
      lastContacted:
        ContactService.getContacts().find(
          (c) => c.company === "Innovate Solutions"
        )?.firstContact || new Date(),
    },
    {
      id: 3,
      name: "StartupX",
      industry: "Startups",
      contacts: ContactService.getContacts().filter(
        (c) => c.company === "StartupX"
      ),
      lastContacted:
        ContactService.getContacts().find((c) => c.company === "StartupX")
          ?.firstContact || new Date(),
    },
    {
      id: 4,
      name: "Global Tech Networks",
      industry: "Networking",
      contacts: ContactService.getContacts().filter(
        (c) => c.company === "Global Tech Networks"
      ),
      lastContacted:
        ContactService.getContacts().find(
          (c) => c.company === "Global Tech Networks"
        )?.firstContact || new Date(),
    },
    {
      id: 5,
      name: "FinancePlus",
      industry: "Finance",
      contacts: ContactService.getContacts().filter(
        (c) => c.company === "FinancePlus"
      ),
      lastContacted:
        ContactService.getContacts().find((c) => c.company === "FinancePlus")
          ?.firstContact || new Date(),
    },
    {
      id: 6,
      name: "Marketing Pro",
      industry: "Marketing",
      contacts: ContactService.getContacts().filter(
        (c) => c.company === "Marketing Pro"
      ),
      lastContacted:
        ContactService.getContacts().find((c) => c.company === "Marketing Pro")
          ?.firstContact || new Date(),
    },
  ];

  getCompanies(
    sortField: SortOption = CompanySortFields[0],
    sortDir: SortOption = SortDirs[0]
  ): Company[] {
    return this.sortCompanies(
      this.dummyCompanies,
      sortField.value,
      sortDir.value
    );
  }

  sortCompanies(
    unsorted: Company[],
    newField: String,
    newDir: String
  ): Company[] {
    const sortField = newField as keyof Company;
    const sorted = [...unsorted].sort((a, b) => {
      if (a[sortField] < b[sortField]) return newDir === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return newDir === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }
}

export default new CompanyService();
