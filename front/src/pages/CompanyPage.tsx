import { useState, useEffect } from "react";

import TemplatePage from "./TemplatePage";
import SortMenu from "../components/SortMenu";
import CompanyAccordion from "../components/CompanyAccordion";

import type { Company } from "../services/CompanyService";
import { CompanySortFields } from "../services/CompanyService";
import CompanyService from "../services/CompanyService";

import type { SortOption } from "../utils/SortUtils";
import { SortDirs } from "../utils/SortUtils";

function CompanyPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  const [sortField, setSortField] = useState<SortOption>(CompanySortFields[0]);
  const [sortDir, setSortDir] = useState<SortOption>(SortDirs[0]);

  const handleSortChange = (newField: SortOption, newDir: SortOption) => {
    setSortField(newField);
    setSortDir(newDir);
    setCompanies(CompanyService.getCompanies(newField, newDir));
  };

  useEffect(() => {
    setLoading(true);
    setCompanies(CompanyService.getCompanies());
    setLoading(false);
  }, []);

  return (
    <TemplatePage>
      <>
        <h1>Company View</h1>
        <SortMenu
          curField={sortField}
          curDir={sortDir}
          allFields={CompanySortFields}
          allDirs={SortDirs}
          onSortChange={handleSortChange}
        />
        {loading ? (
          <div>Loading companies...</div>
        ) : (
          companies.map((company) => (
            <CompanyAccordion key={company.id} company={company} />
          ))
        )}
      </>
    </TemplatePage>
  );
}

export default CompanyPage;
