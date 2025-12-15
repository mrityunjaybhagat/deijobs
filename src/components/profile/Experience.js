import React, { useState, useEffect } from "react";
import { fetchData } from "../../services/apiServices";
import { ImageIcon, ImagesIcon, PencilIcon, Trash2 } from "lucide-react";
import Autocomplete from "../form/Autocomplete";

const ExperienceForm = () => {
  const [experienceData, setExperienceData] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});
  const userId = localStorage.getItem("login_token");

  const initialForm = {
    userId,
    id: null,
    companyName: "",
    roleName: "",
    startDate: "",
    endDate: "",
    is_current_company: false,
    description: "",
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    fetchExperienceData();
  }, []);

  const fetchExperienceData = async () => {
    try {
      const response = await fetchData("get-profile-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      if (response.code === 200) {
        setExperienceData(response.data.work_experience);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

const handleSelect = (suggestion) => {
  setFormData(prev => ({ ...prev, roleName: suggestion.label }));
}
const handleCompaniesSelect = (suggestion) => {
  setFormData(prev => ({ ...prev, companyName: suggestion.label }));
};

  // ✅ Validation function
  const validate = () => {
    const formErrors = {};
    let isValid = true;

    if (!formData.companyName.trim()) {
      formErrors.companyName = "Company name is required";
      isValid = false;
    }
    if (!formData.roleName.trim()) {
      formErrors.roleName = "Role name is required";
      isValid = false;
    }
    if (!formData.startDate) {
      formErrors.startDate = "Start date is required";
      isValid = false;
    }
    if (!formData.is_current_company && !formData.endDate) {
      formErrors.endDate = "Please enter End Date or mark as Current Company";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const payload = {
        userId,
        workExperienceId: formData.id || null,
        companyName: formData.companyName,
        roleName: formData.roleName,
        startDate: formData.startDate,
        endDate: formData.is_current_company ? null : formData.endDate,
        is_current_company: formData.is_current_company ? 1 : 0,
        description: formData.description,
      };

      const response = await fetchData("add-student-work-experience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.code === 200) {
        if (formData.id) {
          setExperienceData((prev) =>
            prev.map((item) =>
              item.id === formData.id ? { ...item, ...payload } : item
            )
          );
        } else {
          setExperienceData((prev) => [
            ...prev,
            { id: response.data.id, ...payload },
          ]);
        }

        setSuccessMessage("🎉 Experience saved successfully!");
        setTimeout(() => {
          setEditingIndex(null);
          setFormVisible(false);
          setSuccessMessage("");
          setFormData(initialForm);
          fetchExperienceData();
        }, 1500);
      } else {
        setSuccessMessage("⚠️ Failed to save experience.");
      }
    } catch (err) {
      console.error(err);
      setSuccessMessage("⚠️ Something went wrong.");
    }
  };

  const handleEdit = (index) => {
    const data = experienceData[index];
    setFormData({
      id: data.id,
      userId,
      companyName: data.company_name,
      roleName: data.role_name,
      startDate: data.start_date,
      endDate: data.end_date,
      is_current_company: data.is_current_company,
      description: data.description || "",
    });
    setEditingIndex(index);
    setFormVisible(true);
  };

  const handleDelete = (id) => {
    // implement API delete logic here
    console.log("Delete id:", id);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .replace(/ /g, "-");
  };

  const calculateDuration = (start, end) => {
    if (!start || !end) return "";
    const s = new Date(start);
    const e = new Date(end);
    let years = e.getFullYear() - s.getFullYear();
    let months = e.getMonth() - s.getMonth();
    if (months < 0) {
      years--;
      months += 12;
    }
    return `${years ? years + " yr " : ""}${months ? months + " mo" : ""}`;
  };

  const renderForm = () => (
    <form
      onSubmit={handleSubmit}
      className="p-3 mb-2"
      style={{ border: "1px solid #bcbcbc", borderRadius: "15px" }}
    >
      <div className="form-row">
        <label>Company Name</label>
        {/* <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          className="form-control"
        /> */}
         <Autocomplete
            icon=""
            className='no-border'
            endpoint='get-companies'
            onSelect={handleCompaniesSelect}  // When a job role is selected, update state
            value={formData.companyName}
            placeholder="Serach Company Name or Type"
        />
        {errors.companyName && (
          <small className="text-danger">{errors.companyName}</small>
        )}
      </div>

      <div className="form-row">
        <label>Designation</label>
        {/* <input
          type="text"
          name="roleName"
          value={formData.roleName}
          onChange={handleChange}
          className="form-control"
        /> */}
        <Autocomplete
            icon=""
            className='no-border'
            endpoint='job-roles'
            onSelect={handleSelect}  // When a job role is selected, update state
            value={formData.roleName}
            placeholder="Serach Company Name or Type"
        />
        {errors.roleName && (
          <small className="text-danger">{errors.roleName}</small>
        )}
      </div>

      <div className="form-row">
        <label>Start Date</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          className="form-control"
        />
        {errors.startDate && (
          <small className="text-danger">{errors.startDate}</small>
        )}
      </div>

      <div className="form-row">
        <label>End Date</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          className="form-control"
          disabled={formData.is_current_company}
        />
        {errors.endDate && (
          <small className="text-danger">{errors.endDate}</small>
        )}
      </div>

      <div className="form-row">
        <label>
          <input
            type="checkbox"
            name="is_current_company"
            checked={formData.is_current_company}
            onChange={handleChange}
          />{" "}
          Current Company
        </label>
      </div>

      <div className="form-row">
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <button className="btn btn-sm btn-primary" type="submit">
        {formData.id ? "Update" : "Add"}
      </button>
      <button
        className="btn btn-sm btn-secondary"
        type="button"
        onClick={() => {
          setFormVisible(false);
          setEditingIndex(null);
          setFormData(initialForm);
          setErrors({});
        }}
      >
        Cancel
      </button>

      {successMessage && (
        <div
          style={{
            color: successMessage.includes("⚠️") ? "red" : "green",
            marginTop: "8px",
          }}
        >
          {successMessage}
        </div>
      )}
    </form>
  );

  return (
    <div>
      <div className="card-head toggle-head d-flex mb-2 justify-content-between align-items-center">
        <h3 className="card-title">Experience</h3>
        <button
          className="btn"
          style={{
            background: "#e5e7eb",
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            textAlign: "center",
            padding: 0,
            fontWeight: "bold",
          }}
          onClick={() => {
            setFormVisible(!formVisible);
            setEditingIndex(null);
            setFormData(initialForm);
            setErrors({});
          }}
        >
          {formVisible ? "-" : "+"}
        </button>
      </div>

      {/* Show Form */}
      {formVisible && renderForm()}

      <ul>
        {experienceData.map((exp, index) => (
          <li
            key={exp.id}
            style={{ border: "1px solid #bcbcbc", borderRadius: "15px" }}
            className="mb-3"
          >
            <div className="d-flex align-items-start gap-3 p-2">
              <div className="list_icon flex-shrink-0">
                <ImagesIcon size={30} />
              </div>
              <div className="flex-grow-1">
                <strong>{exp.company_name}</strong>
                <p>{exp.role_name}</p>
                <p>
                  {formatDate(exp.start_date)} to{" "}
                  {exp.is_current_company === 1
                    ? "Present"
                    : formatDate(exp.end_date)}
                </p>
                <p>{calculateDuration(exp.start_date, exp.end_date)}</p>
                <p>{exp.description}</p>
              </div>
              <div className="d-flex flex-column gap-1">
                <button
                  className="btn btn-sm text-primary"
                  onClick={() => handleEdit(index)}
                >
                  <PencilIcon />
                </button>
                <button
                  className="btn btn-sm text-danger"
                  onClick={() => handleDelete(exp.id)}
                >
                  <Trash2 />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExperienceForm;
