import React, { useState, useEffect, useCallback } from "react";
//import Sidebar from "./component/sidebar";

import debounce from "lodash.debounce";
import CompanyCard from "../../components/profile/CompanyCard";
import MultiSelect from "../../components/form/MultiSelect";
import { Accordion, AccordionItem } from "../../components/includes/Accordion"

const PaginatedTable = ({ apiUrl, columns, module }) => {
  const [data, setData] = useState([]); // Store fetched data
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [totalRecords, setTotalRecords] = useState(0); // Total number of records
  const [selectedRows, setSelectedRows] = useState([]); // Track selected rows

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
  const [preferenceCategory, setPreferenceCategory] = useState("");
  const [job_roles, setJobRoles] = useState("");

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
  search: ""
});
  const totalPages = Math.ceil(totalRecords / itemsPerPage); // Calculate total pages

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("Search triggered:", search);
      fetchData(); // Call search function
    }
  };
  // Debounced function to prevent frequent API calls
  const fetchData = debounce(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
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
      console.log("Current Page:", currentPage);
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
    salary_ranges:"",
    preference_category:"",
    is_active: "",
    start_date: "",
    end_date: "",
    search: ""
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
          className="btn btn-sm btn-primary mr-3"
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
          className="btn btn-sm btn-primary"
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
  const handleMultiSelectChange = (selectedOptions, fieldName) => {
  if (Array.isArray(selectedOptions)) {
    setFilters(prevData => ({
      ...prevData,
      [fieldName]: selectedOptions.map(option => option.value)
    }));
  } else {
    setFilters(prevData => ({
      ...prevData,
      [fieldName]: selectedOptions ? selectedOptions.value : ''
    }));
  }
};
  return (
    <section className='content'>
        <div className='container'>
            <div className="row">
        <div className="col-md-4">
            <div className="sidebarsearch">
                {/* Filters Section */}
                <h6 className="text-body-secondary px-4 pt-4">Filters</h6>
                <div className="sidebar_body p-4" id="search_filter_accordian">
    <Accordion id="myAccordion">
      <AccordionItem parentId="myAccordion" itemId="one" title="Work Mode">
        <MultiSelect
            endpoint="get-masters-details"
            tableName="work_modes"
            isMulti
            value=''
            onChange={(selectedOptions) => handleMultiSelectChange(selectedOptions, 'work_mode')} 
        />
      </AccordionItem>

      <AccordionItem parentId="myAccordion" itemId="two" title="Department">
        Department
      </AccordionItem>

      <AccordionItem parentId="myAccordion" itemId="three" title="Salary Range">
        <div className="row">
          <div className="col-6">
            <input
            type="number"
            className="form-control"
            placeholder="e.g. 30000"
            value={filters.salary_min}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, salary_min: e.target.value }))
            }
          />
          </div>
          <div className="col-md-6">
            <input
              type="number"
              className="form-control"
              placeholder="e.g. 80000"
              value={filters.salary_max}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, salary_max: e.target.value }))
              }
            />
          </div>
        </div>
        
      </AccordionItem>
      <AccordionItem parentId="myAccordion" itemId="four" title="Company Type">
        <MultiSelect
            endpoint="get-masters-details"
            tableName="company_types"
            isMulti={true}
            value=''
            onChange={(selectedOptions) =>
              handleMultiSelectChange(selectedOptions, "company_types")
            }
          />
      </AccordionItem>
      <AccordionItem parentId="myAccordion" itemId="five" title="Role Category">
        <MultiSelect
          endpoint="get-masters-details"
          tableName="job_roles"
          isMulti={true}
          value=''
          onChange={(selectedOptions) =>
            handleMultiSelectChange(selectedOptions, "job_roles")
          }
        />
      </AccordionItem>
      <AccordionItem parentId="myAccordion" itemId="six" title="Education">
        <MultiSelect
          endpoint="get-masters-details"
          tableName="education"
          isMulti={true}
          value=''
          onChange={(selectedOptions) =>
            handleMultiSelectChange(selectedOptions, "education")
          }
        />
      </AccordionItem>
      <AccordionItem parentId="myAccordion" itemId="seveen" title="Posted by">
        Posted by
      </AccordionItem>
      <AccordionItem parentId="myAccordion" itemId="seveen" title="Top Companies">
        <MultiSelect
          endpoint="get-companies"
          tableName=""
          isMulti={true}
          value=''
          onChange={(selectedOptions) =>
            handleMultiSelectChange(selectedOptions, "companies")
          }
        />
      </AccordionItem>
    </Accordion>
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
                <div className="filter-actions d-flex justify-content-between p-2">
                  {/* <button type="button" onClick={() => fetchJobs(filters)}>
                    Apply
                  </button> */}
                  <button type="button" className="btn btn-transparent" onClick={handleReset}>
                    Reset
                  </button>
                  <button type="button" className="btn btn-transparent text-primary" onClick={handleReset}>
                    Apply
                  </button>
                  
                </div>
            </div>
        </div>
        {/* Main Content */}
      <div className="col-md-7">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <p>Total Results: {totalRecords}</p>
            {/* Data Table */}
           <div className="card shadow">
                <h3 className="card-title mb-2">Results Jobs</h3>
                {data.map((item) => (
                    <>
                    <CompanyCard  
                    key={item.id}
                    linkTo={item.id}
                    isJob={true}
                    jobpost={item.job_title} 
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

            {/* //dELETE mODEL */}
          </>
        )}
      </div>
      </div>
      </div>
    </section>
  );
};

export default PaginatedTable;
