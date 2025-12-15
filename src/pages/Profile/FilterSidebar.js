import React, { useState} from "react";
import MultiSelect from "../../components/form/MultiSelect";
import { Accordion, AccordionItem } from "../../components/includes/Accordion";

const FilterSidebar = ({ filters, setFilters, onApply, onReset, initialFilters = [] }) => {
const [isActive, setIsActive] = useState("");
//const showFilter = (name) => visibleFilters.includes(name);

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

  return (
    <div className="sidebarsearch">
      <h6 className="text-body-secondary px-4 pt-4">Filters</h6>

      <div className="sidebar_body p-4" id="search_filter_accordian">
        <Accordion id="myAccordion">
          {/* 1️⃣ Work Mode */}
          {!initialFilters.work_mode && (
          <AccordionItem parentId="myAccordion" itemId="one" title="Work Mode">
            <MultiSelect
              endpoint="get-masters-details"
              tableName="work_modes"
              isMulti
              value={filters.work_mode || ""}
              onChange={(selectedOptions) =>
                handleMultiSelectChange(selectedOptions, "work_mode")
              }
            />
          </AccordionItem>
          )}
          {/* 2️⃣ Department */}
          <AccordionItem parentId="myAccordion" itemId="two" title="Industry">
            <MultiSelect
              endpoint="get-masters-details"
              tableName="industry_expertises"
              isMulti={true}
              value={filters.industry}
              onChange={(selectedOptions) =>
                handleMultiSelectChange(selectedOptions, "industry")
              }
            />
          </AccordionItem>

          {/* 3️⃣ Salary Range */}
          <AccordionItem parentId="myAccordion" itemId="three" title="Salary Range">
            {/*<div className="row">
               <div className="col-6">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Min"
                  value={filters.salary_min || ""}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, salary_min: e.target.value }))
                  }
                />
              </div>
              <div className="col-6">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Max"
                  value={filters.salary_max || ""}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, salary_max: e.target.value }))
                  }
                />
              </div> 
            </div>*/}
            <MultiSelect
              endpoint="get-masters-details"
              tableName="salaryranges"
              isMulti={true}
              value={filters.salary}
              onChange={(selectedOptions) =>
                handleMultiSelectChange(selectedOptions, "salary")
              }
            />
          </AccordionItem>

          {/* 4️⃣ Company Type */}
          <AccordionItem parentId="myAccordion" itemId="four" title="Company Type">
            <MultiSelect
              endpoint="get-masters-details"
              tableName="company_types"
              isMulti
              value={filters.company_types || ""}
              onChange={(selectedOptions) =>
                handleMultiSelectChange(selectedOptions, "company_type")
              }
            />
          </AccordionItem>

          {/* 5️⃣ Role Category */}
          <AccordionItem parentId="myAccordion" itemId="five" title="Role Category">
            <MultiSelect
              endpoint="get-masters-details"
              tableName="job_roles"
              isMulti
              value={filters.job_roles || ""}
              onChange={(selectedOptions) =>
                handleMultiSelectChange(selectedOptions, "job_roles")
              }
            />
          </AccordionItem>

          {/* 6️⃣ Education */}
          <AccordionItem parentId="myAccordion" itemId="six" title="Education">
            <MultiSelect
              endpoint="get-masters-details"
              tableName="education"
              isMulti
              value={filters.education || ""}
              onChange={(selectedOptions) =>
                handleMultiSelectChange(selectedOptions, "education")
              }
            />
          </AccordionItem>
          
           {/* 6️⃣ Posted By */}
          <AccordionItem parentId="myAccordion" itemId="eight" title="Posted By">
            <MultiSelect
              endpoint="get-masters-details"
              tableName="registered_as"
              isMulti
              value={filters.registered_as || ""}
              onChange={(selectedOptions) =>
                handleMultiSelectChange(selectedOptions, "posted_by")
              }
            />
          </AccordionItem>
          {/* 7️⃣ Top Companies */}
          <AccordionItem parentId="myAccordion" itemId="seven" title="Top Companies">
            <MultiSelect
              endpoint="get-companies"
              tableName=""
              isMulti
              value={filters.companies || ""}
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

      {/* 🧭 Action Buttons */}
      <div className="filter-actions d-flex justify-content-between p-2">
        <button
          type="button"
          className="btn btn-transparent"
          onClick={onReset}
        >
          Reset
        </button>
        <button
          type="button"
          className="btn btn-transparent text-primary"
          onClick={onApply}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
