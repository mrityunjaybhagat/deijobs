import PaginatedTable from "./PaginatedTable";
const FeaturedJobs = () => {
  const apiUrl = "https://deijobs.in/deijobs-api/api/get-featured-job";
  const module = "jobs";
  return (
    <div>
      <PaginatedTable apiUrl={apiUrl} title='Fetured'/>
    </div>
  );
};
export default FeaturedJobs;
