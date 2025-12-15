import  { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";
import CompanyCard from "../../components/profile/CompanyCard";
import BackButton from "../../components/ui/BackButton";
import FilterSidebar from "./FilterSidebar";

const PaginatedTable = ({ apiUrl,initialFilters,title }) => {
  const [data, setData] = useState([]); // Store fetched data
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [totalRecords, setTotalRecords] = useState(0); // Total number of records
  const [selectedRows, setSelectedRows] = useState([]); // Track selected rows
  const userId = localStorage.getItem("login_token");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
//————————————————————————————————————————————————————————————————————
// Filters
//————————————————————————————————————————————————————————————————————
  const [isActive, setIsActive] = useState(""); // is_active filter
  const [itemsPerPage, setItemsPerPage] = useState(20); // Items per page
  const [search, setSearch] = useState(""); //universal search
  const [workMode, setWorkMode] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  // const [preferenceCategory, setPreferenceCategory] = useState("");
  // const [job_roles, setJobRoles] = useState("");

  const [dateRange, setDateRange] = useState([null, null]); // Store start & end date
  const [startDate, endDate] = dateRange; // Destructure values
  //const [filters, setFilters] = useState({}); // Store dynamic filters
  const [filters, setFilters] = useState({
    work_mode: "",
    salary_range: "",
    preference_category: "",
    job_roles: "",
    is_active: "",
    start_date: "",
    end_date: "",
    salary_min: "",
    salary_max: "",
    search: "",
    ...initialFilters, //it overrides "",
  });
  const totalPages = Math.ceil(totalRecords / itemsPerPage); // Calculate total pages
  // Debounced function to prevent frequent API calls
  const fetchData = debounce(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId:userId,
          limit: itemsPerPage,
          page: currentPage,
          offset: (currentPage - 1) * itemsPerPage,
          is_active: isActive !== "" ? parseInt(isActive) : null,
          work_mode: workMode !== "" ? workMode : null, // ✅ added
          salary_range: salaryRange !== "" ? salaryRange : null, // ✅ added
          preference_category: filters.preference_category.length ? filters.preference_category : null,
          salary_min: "",
          salary_max: "",
          start_date: startDate
            ? new Date(startDate).toISOString().split("T")[0] + " 00:00:00"
            : null,
          end_date: endDate
            ? new Date(endDate).toISOString().split("T")[0] + " 23:59:59"
            : null,
          search: search,
          ...filters, // Send only active filters dynamically
        }),
      });

      const result = await response.json();
      //console.log("Current Page:", currentPage);
      setData(result.data || []);
      setTotalRecords(result.totalRecords || 0);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, 500); // Wait 500ms after the user stops typing

const handleReset = () => {
  setFilters({
    work_mode: "",
    salary_range: "",
    preference_category: "",
    job_roles: "",
    is_active: "",
    start_date: "",
    end_date: "",
    salary_min: "",
    salary_max: "",
    search: "",
    ...initialFilters, 
  });
  fetchData(); // call your API again with no filters
};
  useEffect(() => {
    if ((startDate && !endDate) || (!startDate && endDate)) {
      return; // Prevent API call if only one date is selected
    }
    fetchData();
  }, [
    apiUrl,
    currentPage,
    isActive,
    itemsPerPage,
    startDate,
    endDate,
    filters,
  ]);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };
  
  //Pagination
  const renderPagination = () => {
    return (
      <div className="pagination">
        <button
          className="btn btn-sm btn-primary mx-3"
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          First
        </button>
        <button
          className="btn btn-sm btn-primary"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>
          {" "}
          Page {currentPage} of {totalPages}{" "}
        </span>
        <button
          className="btn btn-sm btn-primary mx-2"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        <button
          className="btn btn-sm btn-primary"
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          Last
        </button>
      </div>
    );
  };
  // Handle filter change
  const handleFilterChange = (e) => {
    setIsActive(e.target.value);
    setCurrentPage(1); // Reset to first page when filter changes
  };
  //
//   const handleMultiSelectChange = (selectedOptions, fieldName) => {
//   if (Array.isArray(selectedOptions)) {
//     setFilters(prevData => ({
//       ...prevData,
//       [fieldName]: selectedOptions.map(option => option.value)
//     }));
//   } else {
//     setFilters(prevData => ({
//       ...prevData,
//       [fieldName]: selectedOptions ? selectedOptions.value : ''
//     }));
//   }
// };

const formatTitle = (slug) => {
  if (!slug) return "Jobs";

  return slug
    .replace(/-/g, " ")        // full-time → full time
    .replace(/\b\w/g, c => c.toUpperCase()) // full time → Full Time
    + " ";                 // Full Time Jobs
};
const properTitle = formatTitle(title);
  return (
    <section className='content'>
        <div className='container'>
          <BackButton/>
            <div className="row">
        <div className="col-md-4">
            <div className="sidebarsearch">
                {/* Filters Section */}
<FilterSidebar
  filters={filters}
  setFilters={setFilters}
  onApply={fetchData}
  onReset={handleReset}
  initialFilters={initialFilters}
/>
              {/* <div className="form-row hidden">
                  <input
                      type="text"
                      placeholder="Search"
                      className="form-control d-inline-block w-auto_ me-3"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      onKeyDown={handleKeyDown}
                  />
              </div> */}
                {/* <div className="form-row hidden">
                <label className="me-2">Filter by Status:</label>
                <select
                    className="form-select d-inline-block w-auto_ me-3"
                    value={isActive}
                    onChange={(e) => {
                    setIsActive(e.target.value);
                    setCurrentPage(1); // Reset to first page when filter changes
                    }}
                >
                    <option value="">All</option>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                </select>
                </div> */}
                {/* <div className="form-row hidden">
                <label className="me-2">Items per page:</label>
                <select
                    className="form-select d-inline-block w-auto_ me-3"
                    value={itemsPerPage}
                    onChange={(e) => {
                    setItemsPerPage(parseInt(e.target.value));
                    setCurrentPage(1); // Reset to first page when changing items per page
                    }}
                >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                </div> */}
                {/* Date Range Picker */}
                {/* <div className="form-row">
                <label className="me-2">
                    Select Date Range: <i className="bi bi-calendar4-range"></i>
                </label>
                </div> */}
                {/* <div className="form-row">
                <label>D&I Category</label>
                 <MultiSelect
                    endpoint="get-masters-details"
                    tableName="dei_categories"
                    isMulti
                    value=''
                    onChange={(selectedOptions) => handleMultiSelectChange(selectedOptions, 'preference_category')}
                />
                </div> */}
                </div>
        </div>
        {/* Main Content */}
      <div className="col-md-7">


{isLoading ? (
  <p>Loading...</p>
) : (
  <>
    {totalRecords === 0 ? (
      <div className="card shadow">
                <h3 className="card-title mb-2">No Results Found</h3>
      </div>
    ) : (
      <>
          
            
            {/* Data Table */}
              <div className="card shadow">
                {/* <h3 className="card-title mb-2">Results Jobs </h3> */}
                <div className="card-head mb-2">
                  <h3 className="card-title">{formatTitle(title)} Jobs</h3>
                  <p>Total Results: {totalRecords}</p>             
                </div> 
                {data.map((item) => (
                    <>
                    <CompanyCard  
                    key={item.id}
                    linkTo={item.id}
                    isJob={true}
                    jobpost={item.job_title} 
                    employementType={item.work_mode}
                    companyName={item.employer_name} 
                    companyLogo={item?.employer_logo} 
                    jobsposted={item?.jobsposted || ''} 
                    preferenceCategory={item?.preference_category}
                    />
                    </>
                ))}

                {/* Pagination */}
                {renderPagination()}
              </div>
          </>
    )}
  </>
)}
        
      </div>
      </div>
      </div>
    </section>
  );
};

export default PaginatedTable;
