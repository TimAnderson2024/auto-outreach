import create from "./httpservice"

import type { Contact } from "./ContactService";
import type { SortOption } from "../utils/SortUtils";
import { SortDirs } from "../utils/SortUtils";

export interface Company {
  id: number;
  name: string;
  industry: string;
  contacts: Contact[];
  lastContacted: Date;
}

export interface CompanyQuery {
  id: number;
  name: string;
  sortField: SortOption;
  sortDir: SortOption;
}

export const CompanySortFields: SortOption[] = [
  { label: "Last Contact", value: "lastContacted" },
  { label: "Name", value: "name" },
  { label: "Industry", value: "industry" },
];

const defaultCompanyQuery: CompanyQuery = {
  id: 0,
  name: "",
  sortField: CompanySortFields[0],
  sortDir: SortDirs[0]
};

const httpService = create("/companies");

class CompanyService {
  async getCompanies(query: CompanyQuery) {
    query = { ...defaultCompanyQuery, ...query };
    const { request } = httpService.getAll<Company[]>(query);
    const response = await request;
    return this.sortCompanies(response.data, query.sortField.value, query.sortDir.value);
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
