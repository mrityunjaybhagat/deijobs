import PaginatedTable from "./PaginatedTable";
import { useParams } from 'react-router-dom';
const AppliedJobs = () => {
  const { type } = useParams();
  const apiUrl = `https://deijobs.in/deijobs-api/api/jobs-by-flag?flag=saved`;
  return (
    <div>
      <PaginatedTable apiUrl={apiUrl} initialFilters={{work_mode:type}} title='Saved'/>
    </div>
  );
};
export default AppliedJobs;
