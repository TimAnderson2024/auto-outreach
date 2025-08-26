import { useState, useEffect } from "react";

// Custom Types
import type { Column } from "../components/ContactTable";
import type { Company } from "../services/CompanyService";
import type { SortOption } from "../utils/SortUtils";

// Constants
import { CompanySortFields } from "../services/CompanyService";
import { SortDirs } from "../utils/SortUtils";

// Services
import CompanyService from "../services/CompanyService";

// Custom Components
import { Accordion } from "react-bootstrap";
import TemplatePage from "./TemplatePage";
import SortMenu from "../components/SortMenu";
import PaginationControls from "../components/PaginationControls";
import ContactTable from "../components/ContactTable";

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

  const columns: Column[] = [
    { label: "Name", key: "fullName" },
    { label: "Email", key: "email" },
    { label: "Outreach", key: "firstContact" },
    { label: "Booster Check", key: "boosterCheck" },
    { label: "Follow-Up", key: "followupDate" },
  ];

  return (
    <TemplatePage>
      <h1>Company View</h1>
      <div className="d-flex justify-content-between align-items-center">
        <SortMenu
          curField={sortField}
          curDir={sortDir}
          allFields={CompanySortFields}
          allDirs={SortDirs}
          onSortChange={handleSortChange}
        />
        <PaginationControls />
      </div>
      <hr />
      {loading ? (
        <div>Loading companies...</div>
      ) : (
        companies.map((company) => (
          <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>{company.name}</Accordion.Header>
              <Accordion.Body>
                <ContactTable
                  key={company.id}
                  columns={columns}
                  contacts={company.contacts}
                />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        ))
      )}
    </TemplatePage>
  );
}

export default CompanyPage;
