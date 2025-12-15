import React, { useState } from "react";
import PaginatedTable from "./PaginatedTable";


const RecommendedJobs = () => {
  const apiUrl = "https://deijobs.in/deijobs-api/api/get-recommended-job";
  const module = "jobs";
  return (
    <div>
      <PaginatedTable apiUrl={apiUrl} />
    </div>
  );
};
export default RecommendedJobs;
