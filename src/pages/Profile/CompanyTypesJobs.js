import React from "react";
import PaginatedTable from "./PaginatedTable";
import { useParams } from 'react-router-dom';

const CompanyTypesJobs = () => {
  const { type } = useParams();
  const apiUrl = `https://deijobs.in/deijobs-api/api/jobs-by-company-type?companyType=${type}`;
  return (
    <div>
      <PaginatedTable apiUrl={apiUrl}  initialFilters={{company_type:type}}/>
    </div>
  );
};
export default CompanyTypesJobs;