import React, { useState } from "react";
import PaginatedTable from "./PaginatedTable";


const RecentsJobs = () => {
  const apiUrl = "https://deijobs.in/deijobs-api/api/get-recent-job";
  return (
    <div>
      <PaginatedTable apiUrl={apiUrl}  title='Recent'/>
    </div>
  );
};
export default RecentsJobs;
