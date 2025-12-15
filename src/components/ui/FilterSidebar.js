import { Accordion, AccordionItem } from "../../components/includes/Accordion";
import MultiSelect from "../../components/form/MultiSelect";

const FilterForm = ({ filters, setFilters, handleMultiSelectChange, handleReset, handleApply }) => {
  return (
    <>
    <Accordion id="myAccordion">
      <AccordionItem parentId="myAccordion" itemId="one" title="Work Mode">
        <MultiSelect
          endpoint="get-masters-details"
          tableName="work_modes"
          isMulti
          value={filters.work_mode || []}
          onChange={(selectedOptions) =>
            handleMultiSelectChange(selectedOptions, "work_mode")
          }
        />
      </AccordionItem>

      <AccordionItem parentId="myAccordion" itemId="three" title="Salary Range">
        <div className="row">
          <div className="col-6">
            <input
              type="number"
              className="form-control"
              placeholder="Min salary"
              value={filters.salary_min || ""}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  salary_min: e.target.value,
                }))
              }
            />
          </div>
          <div className="col-6">
            <input
              type="number"
              className="form-control"
              placeholder="Max salary"
              value={filters.salary_max || ""}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  salary_max: e.target.value,
                }))
              }
            />
          </div>
        </div>
      </AccordionItem>

      <AccordionItem parentId="myAccordion" itemId="four" title="Company Type">
        <MultiSelect
          endpoint="get-masters-details"
          tableName="company_types"
          isMulti
          value={filters.company_types || []}
          onChange={(selectedOptions) =>
            handleMultiSelectChange(selectedOptions, "company_types")
          }
        />
      </AccordionItem>

      <AccordionItem parentId="myAccordion" itemId="five" title="Role Category">
        <MultiSelect
          endpoint="get-masters-details"
          tableName="job_roles"
          isMulti
          value={filters.job_roles || []}
          onChange={(selectedOptions) =>
            handleMultiSelectChange(selectedOptions, "job_roles")
          }
        />
      </AccordionItem>

      <AccordionItem parentId="myAccordion" itemId="six" title="Education">
        <MultiSelect
          endpoint="get-masters-details"
          tableName="education"
          isMulti
          value={filters.education || []}
          onChange={(selectedOptions) =>
            handleMultiSelectChange(selectedOptions, "education")
          }
        />
      </AccordionItem>

      <AccordionItem parentId="myAccordion" itemId="seven" title="Top Companies">
        <MultiSelect
          endpoint="get-companies"
          isMulti
          value={filters.companies || []}
          onChange={(selectedOptions) =>
            handleMultiSelectChange(selectedOptions, "companies")
          }
        />
      </AccordionItem>
    </Accordion>
    <div className="filter-actions d-flex justify-content-between p-2">
            <button type="button" className="btn btn-transparent" onClick={handleReset}>
            Reset
            </button>
            <button type="button" className="btn btn-transparent text-primary" onClick={handleReset}>
            Apply
            </button>
            
        </div>
</>
  );
};

export default FilterForm;
