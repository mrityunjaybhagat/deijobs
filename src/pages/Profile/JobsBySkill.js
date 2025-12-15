import PaginatedTable from "./PaginatedTable";
import { useParams } from 'react-router-dom';


const JobsBySkill = () => {
  const { type } = useParams();
  const apiUrl = `https://deijobs.in/deijobs-api/api/jobs-by-skill?skill=${type}`;
  //const apiUrl = `https://deijobs.in/deijobs-api/api/filter-job-type-job-list?jobType=${type}`;
  //const initialFilters = {work_mode:type };
  return (
    <div>
      <PaginatedTable apiUrl={apiUrl} initialFilters={{skill:type}} />
    </div>
  );
};
export default JobsBySkill;