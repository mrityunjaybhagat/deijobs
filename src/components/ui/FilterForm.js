import React, { useState } from "react";
import MultiSelect from "../form/MultiSelect";

const FilterForm = ({ onApply, onClear }) => {
  const [formState, setFormState] = useState({
    work_mode: '',
    salary_range: '',
    company_type: '',
    job_role: '',
    education: '',
    posted_by: '',
    top_company: ''
  });

  const handleMultiSelectChange = (selectedOptions, fieldName) => {
    setFormState(prevData => {
      const updated = {
        ...prevData,
        [fieldName]: Array.isArray(selectedOptions)
          ? selectedOptions.map(option => option.value) // multi
          : selectedOptions
            ? selectedOptions.value // single
            : ""
      };
      console.log("Updated Filters:", updated); // log on every change
      return updated;
    });
  };

  const handleApply = () => {
    console.log("Final Payload:", formState); // log all at once
    if (onApply) onApply(formState);
  };

  const handleClear = () => {
    setFormState({
      work_mode: [],
      salary_range: [],
      company_type: [],
      job_role: [],
      education: [],
      posted_by: [],
      top_company: []
    });
  };

  return (
    <>
      {/* Example with DynamicDropdown */}
      <div className='sidebarsearch'>            
        <div className='sidebar_body p-4'>
            <div className="form-row">
                <label>Work Mode</label>
                <MultiSelect
                    endpoint="get-masters-details"
                    tableName="work_modes"
                    isMulti
                    value={formState.work_mode}
                    onChange={(selectedOptions) => handleMultiSelectChange(selectedOptions, "work_mode")}
                    
                />
            </div>
            <div className="form-row">
                <label>Experience</label>
                <MultiSelect
                    endpoint="experienceranges"
                    tableName=""
                    isMulti
                    value={formState.work_mode}
                    onChange={(selectedOptions) => handleMultiSelectChange(selectedOptions, "work_mode")}
                    
                />
            </div>
            <div className="form-row">
                <label>Salary Ranges</label>
                <MultiSelect
                    endpoint="get-masters-details"
                    tableName="salary_ranges"
                    isMulti
                    value={formState.salary_range}
                    onChange={(selectedOptions) => handleMultiSelectChange(selectedOptions, "salary_range")}
                />
            </div>
            <div className="form-row">
                <label>Company Type</label>
                <MultiSelect
                    endpoint="get-masters-details"
                    tableName="company_types"
                    isMulti
                    value={formState.company_type}
                    onChange={(selectedOptions) => handleMultiSelectChange(selectedOptions, "company_type")}
                />
            </div>
            <div className="form-row">
                <label>Role Catagory</label>
                <MultiSelect
                    endpoint="get-masters-details"
                    tableName="job_roles"
                    isMulti
                    value={formState.job_role}
                    onChange={(selectedOptions) => handleMultiSelectChange(selectedOptions, "job_role")}
                />
            </div>
            <div className="form-row">
                <label>Education</label>
                <MultiSelect
                    endpoint="get-degrees"
                    tableName=""
                    isMulti
                    value={formState.degree}
                    onChange={(selectedOptions) => handleMultiSelectChange(selectedOptions, "degree")}
                />
            </div>
            <div className="form-row">
                <label>Posted By</label>
                <MultiSelect
                    endpoint="posted-by"
                    tableName=""
                    isMulti
                    value={formState.posted_by}
                    onSelect={(selectedOptions) => handleMultiSelectChange(selectedOptions, "posted_by")}
                />
            </div>
            <div className="form-row">
                <label>Top Companies</label>
                <MultiSelect
                    endpoint="top-companies-list"
                    //tableName="top-companies-list"
                    isMulti
                    value={formState.top_company}
                    onSelect={(selectedOptions) => handleMultiSelectChange(selectedOptions, "top_company")}
                />
              </div>
            <div style={{ marginTop: "10px" }}>
                <button onClick={handleApply}>Apply</button>
                <button onClick={handleClear} style={{ marginLeft: "10px" }}>
                Clear
                </button>
            </div>
        </div>
      </div>
    </>
  );
};

export default FilterForm;
