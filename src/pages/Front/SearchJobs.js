import React, { useState } from 'react';
import icons from "../../assets/icons";
import UpArrowIcon from '../../assets/icons/Vectordown.svg';
import { usePlacesWidget } from "react-google-autocomplete";
import Autocomplete from "../../components/form/Autocomplete";
import MultiSelect from '../../components/form/MultiSelect';
import InputWithIcon from '../../components/form/InputWithIcon';
import CustomButton from '../../components/form/CustomButton';
import CompanyCard from '../../components/profile/CompanyCard';

const SearchJobs = () => {
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
  });

const [advanceSearch, setAdvanceSearch] = useState(false);
const [results, setResults] = useState([]);

const { ref } = usePlacesWidget({
apiKey: 'AIzaSyBo6F5VIs1WvisRrmlwOUXq1T_IEITYTkw',
onPlaceSelected: (place) => setFilters(prev => ({ ...prev, location: place.formatted_address })),
});

// 🔁 Handle MultiSelect changes
const handleMultiSelectChange = (selectedOptions, fieldName) => {
if (Array.isArray(selectedOptions)) {
setFilters(prev => ({
...prev,
[fieldName]: selectedOptions.map(option => option.value)
}));
} else {
setFilters(prev => ({
...prev,
[fieldName]: selectedOptions ? selectedOptions.value : ""
}));
}
};

const handleSubmit = async (e) => {
e.preventDefault();
try {
const response = await fetch('https://deijobs.in/deijobs-api/api/get-filtered-job-list', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
    jobRole: filters.jobRole,
    experience: filters.experience,
    search_location: filters.location,
    workMode: filters.work_mode,
    salary_min: filters.salary_min,
    salary_max: filters.salary_max,
    postedBy: filters.posted_by,
    companyType: filters.company_type,
    freshness: filters.freshness,
    deiCategory: filters.preference_category,
    gender: filters.gender,
    companies: filters.companies,
}),
});
  const data = await response.json();
  setResults(data.data || []);
} catch (error) {
  console.error("Error fetching job results:", error);
}

};

const handleReset = () => {
setFilters({
jobRole: "",
experience: "",
location: "",
work_mode: "",
salary_min: "",
salary_max: "",
posted_by: "",
company_type: "",
freshness: "",
preference_category: "",
gender: "",
companies: "",
});
setResults([]);
};

// Handle Autocomplete selection
const handleSelect = (suggestion) => {
setFilters(prev => ({ ...prev, jobRole: suggestion.label }));
};

return ( <section className='content'> <div className='container'>

```
    {/* Autocomplete for Job Role */}
    <Autocomplete
      icon={<img src={icons["search.svg"]} alt="Search Icon" />}
      isImage
      className='no-border'
      endpoint='get-skill-list'
      onSelect={handleSelect}
      placeholder="Search by Title, skill or category"
    />

    {/* Input for Location */}
    <InputWithIcon icon={<img src={icons['location_job.svg']} alt="Location Icon" />}>
      <input
        type="text"
        value={filters.location}
        onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
        className='form-control'
        placeholder='Location'
        ref={ref}
      />
    </InputWithIcon>

    {/* Advanced Search Toggle */}
    <div className='advanced-search-toggle'>
      <a
        href="#"
        className="d-flex py-4"
        onClick={() => setAdvanceSearch(!advanceSearch)}
        style={{ alignItems: 'center', justifyContent: 'space-between', display:'block'}}
      >
        Advance Search
        {advanceSearch ? (
          <img src={UpArrowIcon} alt="Up Arrow Icon" />
        ) : (
          <img src={UpArrowIcon} alt="Down Arrow Icon" style={{ transform: 'rotate(180deg)' }} />
        )}
      </a>
    </div>

    {/* Advanced Search Fields */}
    {advanceSearch && (
      <div className='advanced-search-fields'>

        {/* Work Mode */}
        <div className="mb-3">
          <label className="form-label">Work Mode</label>
          <MultiSelect
            endpoint="get-masters-details"
            tableName="work_modes"
            isMulti
            value={filters.work_mode || ""}
            onChange={(selectedOptions) =>
              handleMultiSelectChange(selectedOptions, "work_mode")
            }
          />
        </div>

        {/* Department */}
        <div className="mb-3">
          <label className="form-label">Department</label>
          Department
        </div>

        {/* Salary Range */}
        <div className="mb-3">
          <label className="form-label">Salary Range</label>
          <div className="row">
            <div className="col-6">
              <input
                type="number"
                className="form-control"
                placeholder="Min"
                value={filters.salary_min || ""}
                onChange={(e) => setFilters(prev => ({ ...prev, salary_min: e.target.value }))}
              />
            </div>
            <div className="col-6">
              <input
                type="number"
                className="form-control"
                placeholder="Max"
                value={filters.salary_max || ""}
                onChange={(e) => setFilters(prev => ({ ...prev, salary_max: e.target.value }))}
              />
            </div>
          </div>
        </div>

        {/* Company Type */}
        <div className="mb-3">
          <label className="form-label">Company Type</label>
          <MultiSelect
            endpoint="get-masters-details"
            tableName="company_types"
            isMulti
            value={filters.company_type || ""}
            onChange={(selectedOptions) =>
              handleMultiSelectChange(selectedOptions, "company_type")
            }
          />
        </div>

        {/* Role Category */}
        <div className="mb-3">
          <label className="form-label">Role Category</label>
          <MultiSelect
            endpoint="get-masters-details"
            tableName="job_roles"
            isMulti
            value={filters.job_roles || ""}
            onChange={(selectedOptions) =>
              handleMultiSelectChange(selectedOptions, "job_roles")
            }
          />
        </div>

        {/* Education */}
        <div className="mb-3">
          <label className="form-label">Education</label>
          <MultiSelect
            endpoint="get-masters-details"
            tableName="education"
            isMulti
            value={filters.education || ""}
            onChange={(selectedOptions) =>
              handleMultiSelectChange(selectedOptions, "education")
            }
          />
        </div>

        {/* Posted By */}
        <div className="mb-3">
          <label className="form-label">Posted By</label>
          <MultiSelect
            endpoint="get-masters-details"
            tableName="registered_as"
            isMulti
            value={filters.posted_by || ""}
            onChange={(selectedOptions) =>
              handleMultiSelectChange(selectedOptions, "posted_by")
            }
          />
        </div>

        {/* Top Companies */}
        <div className="mb-3">
          <label className="form-label">Top Companies</label>
          <MultiSelect
            endpoint="get-companies"
            tableName=""
            isMulti
            value={filters.companies || ""}
            onChange={(selectedOptions) =>
              handleMultiSelectChange(selectedOptions, "companies")
            }
          />
        </div>

      </div>
    )}

    {/* Search & Reset Buttons */}
    <div className='d-flex gap-2 mb-4'>
      <CustomButton onClick={handleSubmit} text='Search Jobs' />
      <CustomButton onClick={handleReset} text='Reset' />
    </div>

    {/* Search Results */}
    {results.length > 0 ? (
      <div className="search-results mt-4">
        {results.map(item => (
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
        ))}
      </div>
    ) : (
      <p className="mt-4 text-center">No jobs found.</p>
    )}

  </div>
</section>
);
};

export default SearchJobs;
