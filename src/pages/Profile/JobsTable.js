import React, { useState } from "react";
import PaginatedTable from "./PaginatedTable";


const JobsTable = () => {
  const apiUrl = "https://deijobs.in/deijobs-api/api/jobs";
  const module = "jobs";
  const columns = [
    { key: "id", label: "ID" },
    { key: "company_name", label: "Company" },
    { key: "job_title", label: "Job Title" },
    { key: "job_role_name", label: "Role" },
    { key: "industry_name", label: "Industry" },
    { key: "salary", label: "Salary" },
    { key: "city", label: "Location" },
    { key: "created_at", label: "Posted On" },
    { key: "is_active", label: "Status" },
    { key: "action", label: "Action" },
  ];
  return (
    <div>
      <PaginatedTable apiUrl={apiUrl} columns={columns} module={module}/>
    </div>
  );
};
export default JobsTable;
