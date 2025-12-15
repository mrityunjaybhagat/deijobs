import PaginatedTable from "./PaginatedTable";
import { useParams } from 'react-router-dom';

const CompanyJobs = () => {
  const { id } = useParams(); 
  const employerId = id;
  const apiUrl = `https://deijobs.in/deijobs-api/api/jobs-by-company?employerId=${employerId}`;
  return (
    <div>
      <PaginatedTable apiUrl={apiUrl} title='Company '/>
    </div>
  );
};
export default CompanyJobs;
