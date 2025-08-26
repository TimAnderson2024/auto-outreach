import { useState, useEffect } from "react";

import TemplatePage from "./TemplatePage";

import type { Company } from "../services/CompanyService";
import CompanyService from "../services/CompanyService";

function CompanyPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setCompanies(CompanyService.getCompanies());
    setLoading(false);
  }, []);

  return (
    <TemplatePage>
      <>
        <h1>Company Page</h1>
        <h2>{loading ? "Loading Companies..." : companies[0].name}</h2>
      </>
    </TemplatePage>
  );
}

export default CompanyPage;
