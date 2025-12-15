import PaginatedTable from "./PaginatedTable";
import { useParams } from 'react-router-dom';


const JobsTypePage = () => {
  const { type } = useParams();
  const apiUrl = `https://deijobs.in/deijobs-api/api/jobs-by-type?jobType=${type}`;
  return (
    <div>
      <PaginatedTable apiUrl={apiUrl} initialFilters={{work_mode:type}}  title={type}/>
    </div>
  );
};
export default JobsTypePage;