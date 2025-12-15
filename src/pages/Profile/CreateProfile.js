import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { usePlacesWidget } from "react-google-autocomplete";
import {
  getUserData,
  createStudentProfile,
} from "../../services/profileServices";
import { fetchData } from "../../services/apiServices";
import MultiSelect from "../../components/form/MultiSelect";
import Autocomplete from "../../components/form/Autocomplete";
import PrimaryButton from "../../components/form/PrimaryButton";
import MultiSelectCreate from "../../components/form/MultiSelectCreate";

const CreateProfile = () => {
  const userId = localStorage.getItem("login_token");
  const [errors, setErrors] = useState({});
  const [profileData, setProfileData] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [jobRole, setJobRole] = useState("");
  const [experience, setExperience] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId, // ✅ Added here so it's part of formData from the start,
    name: "",
    dob: "",
    email: "",
    dniCategory: "",
    gender: "",
    jobRole: "",
    experience: "",
    location: "",
    languages: "",
    hobbies: "",
    skills: "",
  });

  const { ref } = usePlacesWidget({
    apiKey: "AIzaSyBo6F5VIs1WvisRrmlwOUXq1T_IEITYTkw",
    onPlaceSelected: (place) => {
      setFormData((prevData) => ({
        ...prevData,
        location: place.formatted_address, // Set the location based on the selected place
      }));
    },
  });

  // Fetch profile data
  useEffect(() => {
    if (userId) {
      getUserData(userId)
        .then((response) => {
          if (response.code === 200 && response.data.user_data.length > 0) {
            const user = response.data.user_data[0];
            setFormData({
              userId,
              name: user.name || "",
              dob: user.dob || "",
              email: user.email || "",
              dniCategory: user.dni_category || "",
              gender: user.gender || "",
              jobRole: user.job_role || "",
              experience: user.experience || "",
              location: user.location || "",
              // languages: user.languages || "",
              // hobbies: user.hobbies || "",
              // skills: user.skills || "",
skills: user.skills
  ? user.skills.split(",").map(s => Number(s.trim()))
  : [],
languages: user.languages
  ? user.languages.split(",").map(s => Number(s.trim()))
  : [],
hobbies: user.hobbies
  ? user.hobbies.split(",").map(s => Number(s.trim()))
  : [],
              bio: user.bio || "",
            });
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error loading user data:", error);
          setIsLoading(false);
        });
    }
  }, [userId]);

  // Validate Form
  const validate = () => {
    let formErrors = {};
    let isValid = true;

    if (!formData.name) {
      formErrors.name = "Full Name is required";
      isValid = false;
    }
    if (!formData.dob) {
      formErrors.dob = "Date of Birth is required";
      isValid = false;
    } else if (new Date(formData.dob) > new Date()) {
      formErrors.dob = "Date of Birth cannot be in the future";
      isValid = false;
    } else if (
      new Date().getFullYear() - new Date(formData.dob).getFullYear() <
      16
    ) {
      formErrors.dob = "You must be at least 16 years old";
      isValid = false;
    }

    if (!formData.email) {
      formErrors.email = "Email Address is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email Address is invalid";
      isValid = false;
    }
    if (!formData.location) {
      formErrors.location = "Current location is required";
      isValid = false;
    }
    // Job Role validation
    if (!formData.jobRole) {
      formErrors.jobRole = "Job Role is required";
      isValid = false;
    }

    if (!formData.dniCategory) {
      formErrors.dniCategory = "D & I Category is required";
      isValid = false;
    }
    if (!formData.skills) {
      formErrors.skills = "At least one skill is required";
      isValid = false;
    }
    if (!formData.languages) {
      formErrors.languages = "Languages is required";
      isValid = false;
    }
    if (!formData.hobbies) {
      formErrors.hobbies = "Hobbies is required";
      isValid = false;
    }

    if (!formData.gender) {
      formErrors.gender = "Gender is required";
      isValid = false;
    }

    if (!formData.jobRole) {
      formErrors.jobRole = "Primary Job Role is required";
      isValid = false;
    }

    if (
      !formData.experience ||
      (Array.isArray(formData.experience) && formData.experience.length === 0)
    ) {
      formErrors.experience = "Experience is required";
      isValid = false;
    }
    setErrors(formErrors);
    return isValid;
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
const handleSelect = (suggestion) => {
  setFormData(prev => ({ ...prev, jobRole: suggestion.label }));
}
const handleLocationSelect = (suggestion) => {
  setFormData(prev => ({ ...prev, location: suggestion.label }));
};
  const handleMultiSelectChange = (selectedOptions, fieldName) => {
    if (Array.isArray(selectedOptions)) {
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: selectedOptions.map((option) => option.value),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: selectedOptions ? selectedOptions.value : "",
      }));
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowErrors(true);
    if (validate()) {
      try {
        const response = await fetchData("create-student-profile", {
          // Replace with your API endpoint for submission
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response && response.code === 200) {
          console.log("Profile created successfully!");
          setIsModalVisible(true); // Show the modal on success
          // Redirect to /jobs after 5 seconds
          setTimeout(() => {
            navigate("/jobs?ev=reg_done");
          }, 5000);
        } else {
          setSubmissionError("Failed to create profile. Please try again.");
        }
      } catch (error) {
        setSubmissionError("An error occurred while creating the profile.");
      }
    }
  };

  return (
    <>
      <section className="content">
        <div className="container">
          <div className="container_box">
            <div className="card py-5 px-4">
              <h2>Create Your Profile</h2>
              <p>
                Precision in your resume details increases your chances of
                landing the perfect job. Make every word count
              </p>

              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <label htmlFor="name" className="form-label">
                    Full Name*
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      showErrors && errors.name ? "is-invalid" : ""
                    }`}
                    id="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {showErrors && errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>

                <div className="form-row">
                  <label htmlFor="dob" className="form-label">
                    Date of Birth*
                  </label>
                  <input
                    type="date"
                    className={`form-control ${
                      showErrors && errors.dob ? "is-invalid" : ""
                    }`}
                    id="dob"
                    value={formData.dob}
                    onChange={handleChange}
                  />
                  {showErrors && errors.dob && (
                    <div className="invalid-feedback">{errors.dob}</div>
                  )}
                </div>
                <div className="form-row">
                  <label htmlFor="email" className="form-label">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    className={`form-control ${
                      showErrors && errors.email ? "is-invalid" : ""
                    }`}
                    id="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {showErrors && errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="form-row">
                  <label htmlFor="gender" className="form-label">
                    Gender*
                  </label>
                  <select
                    className={`form-control ${
                      showErrors && errors.gender ? "is-invalid" : ""
                    }`}
                    id="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {showErrors && errors.gender && (
                    <div className="invalid-feedback">{errors.gender}</div>
                  )}
                </div>

                <div className="form-row">
                  <label htmlFor="jobRole" className="form-label">
                    Designation
                  </label>
                  <Autocomplete
                    icon=""
                    className="no-border"
                    endpoint="job-roles"
                    onSelect={handleSelect} // When a job role is selected, update state
                    placeholder="Serach Role or Type"
                    value={formData.jobRole}
                  />
                  {showErrors && errors.jobRole && (
                    <div className="invalid-feedback d-block">
                      {errors.jobRole}
                    </div>
                  )}
                </div>

                <div className="form-row">
                  <label htmlFor="experience" className="form-label">
                    Experience In Years*
                  </label>
                  <MultiSelect
                    endpoint="experienceranges"
                    tableName="experience"
                    value={formData.experience}
                    onChange={(selectedOptions) =>
                      handleMultiSelectChange(selectedOptions, "experience")
                    }
                    placeholder="5"
                  />
                  {showErrors && errors.experience && (
                    <div className="invalid-feedback d-block">
                      {errors.experience}
                    </div>
                  )}
                </div>

                <div className="form-row">
                  <label htmlFor="location" className="form-label">
                    Where are you based?
                  </label>
                  <Autocomplete
                    icon=""
                    className="no-border"
                    endpoint="get-cities"
                    onSelect={handleLocationSelect} // When a job role is selected, update state
                    placeholder="Serach City"
                    value={formData.location}
                  />
                  {/* <input
                    type="text"
                    className={`form-control ${
                      showErrors && errors.location ? "is-invalid" : ""
                    }`}
                    id="location"
                    placeholder="Enter Location"
                    value={formData.location}
                    onChange={handleChange}
                    ref={ref}
                  /> */}
                  {showErrors && errors.location && (
                    <div className="invalid-feedback">{errors.location}</div>
                  )}
                </div>

                <div className="form-row">
                  <label htmlFor="dniCategory" className="form-label">
                    D & I Category*
                  </label>
                  <MultiSelect
                    endpoint="get-masters-details"
                    tableName="dei_categories"
                    value={formData.dniCategory}
                    className={`form-control ${
                      showErrors && errors.dniCategory ? "is-invalid" : ""
                    }`}
                    onChange={(selectedOptions) =>
                      handleMultiSelectChange(selectedOptions, "dniCategory")
                    }
                  />
                  {showErrors && errors.dniCategory && (
                    <div className="invalid-feedback d-block">
                      {errors.dniCategory}
                    </div>
                  )}
                </div>
                <div className="form-row">
                  <label htmlFor="skills" className="form-label">
                    Skills*
                  </label>
                  <MultiSelectCreate
                    endpoint="get-masters-details"
                    tableName="skills"
                    isMulti={true}
                    value={formData.skills}
                    onChange={(selectedOptions) =>
                      handleMultiSelectChange(selectedOptions, "skills")
                    }
                  />
                  {showErrors && errors.skills && (
                    <div className="invalid-feedback d-block">
                      {errors.skills}
                    </div>
                  )}
                </div>
                <div className="form-row">
                  <label htmlFor="languages" className="form-label">
                    Languages*
                  </label>
                  <MultiSelect
                    endpoint="get-masters-details"
                    tableName="languages"
                    isMulti={true}
                    value={formData.languages}
                    onChange={(selectedOptions) =>
                      handleMultiSelectChange(selectedOptions, "languages")
                    }
                  />
                  {showErrors && errors.dniCategory && (
                    <div className="invalid-feedback d-block">
                      {errors.languages}
                    </div>
                  )}
                </div>
                <div className="form-row">
                  <label htmlFor="hobbies" className="form-label">
                    Hobbies*
                  </label>
                  <MultiSelect
                    endpoint="get-hobbies"
                    tableName=""
                    value={formData.hobbies}
                    isMulti={true}
                    onChange={(selectedOptions) =>
                      handleMultiSelectChange(selectedOptions, "hobbies")
                    }
                  />
                  {showErrors && errors.hobbies && (
                    <div className="invalid-feedback d-block">
                      {errors.hobbies}
                    </div>
                  )}
                </div>
                <div className="form-row">
                  <label htmlFor="bio" className="form-label">
                    Bio*
                  </label>
                  <textarea
                    name="bio"
                    id="bio"
                    className="form-control"
                    value={formData.bio || ""} // prevent undefined
                    onChange={handleChange}
                  />
                </div>
                {/* <button type="submit" className="btn btn-primary primary-button" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Continue'}
            </button> */}
                <PrimaryButton
                  text="Continue"
                  disabled={isLoading}
                  onClick={handleSubmit}
                />
                {submissionError && (
                  <div className="alert alert-danger">{submissionError}</div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

        {/* <div
  className="modal fade"
  id="successModal"
  tabIndex="-1"
  role="dialog"
  aria-labelledby="successModalLabel"
  aria-hidden="true"
  style={{ display: isModalVisible ? "block" : "none" }}
>
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="successModalLabel">
          Profile Created Successfully
        </h5>
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
          onClick={() => setIsModalVisible(false)}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        Your profile has been successfully created. You can now explore job
        opportunities.
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => (window.location.href = "/jobs")}
        >
          Go to Jobs Page
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
          onClick={() => setIsModalVisible(false)}
        >
          Close
        </button>
      </div>
    </div>
  </div>
</div>; */}

{isModalVisible && (
  <div className="modal-backdrop show"></div>
)}
{isModalVisible && (
  <div className="modal show d-block" tabIndex="-1" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Profile Created Successfully</h5>
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={() => setIsModalVisible(false)}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          Your profile has been successfully created. You can now explore job opportunities.
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate("/jobs")}
          >
            Go to Jobs Page
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setIsModalVisible(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </>
  );
};

export default CreateProfile;
