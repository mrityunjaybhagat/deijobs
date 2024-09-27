import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

const CreateProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    official_email: '',
    total_exp_hiring: '',
    jobrole: '',
    di_category: '',
    gender: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Validate Name
    if (!formData.name) {
      newErrors.name = 'Full Name is required';
    }

    // Validate Date of Birth
    if (!formData.dob) {
      newErrors.dob = 'Date of Birth is required';
    } else {
      const today = new Date();
      const birthDate = new Date(formData.dob);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 16) {
        newErrors.dob = 'You must be at least 16 years old';
      }
    }

    // Validate Email
    if (!formData.official_email) {
      newErrors.official_email = 'Email Address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.official_email)) {
      newErrors.official_email = 'Email Address is invalid';
    }

    // Validate Experience
    if (!formData.total_exp_hiring) {
      newErrors.total_exp_hiring = 'Experience is required';
    }

    // Validate Job Role
    if (!formData.jobrole) {
      newErrors.jobrole = 'Job Role is required';
    }

    // Validate D & I Category
    if (!formData.di_category) {
      newErrors.di_category = 'D & I Category is required';
    }

    // Validate Gender
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // If no errors, submit the form
      fetch('create-student-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
          //setSubmitLoading(false);
          navigate("/jobs");
          // Handle success case
        })
        .catch((error) => {
          console.error('Error:', error);
          // Handle error case
        });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const navigate = useNavigate();
  return (
    <section className="main_container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-5 py-5">
            <div className="profile_form_div bg-white p-4">
              <h5 className="text-gray-900 text-2xl font-semibold leading-loose">
                Create Your Profile
              </h5>
              <p>
                Precision in your resume details increases your chances of
                landing the perfect job. Make every word count.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Full Name*
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    id="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="dob" className="form-label">
                    Date of Birth*
                  </label>
                  <input
                    type="date"
                    className={`form-control ${errors.dob ? 'is-invalid' : ''}`}
                    id="dob"
                    placeholder="01 January 1970"
                    value={formData.dob}
                    onChange={handleChange}
                  />
                  {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="official_email" className="form-label">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    className={`form-control ${errors.official_email ? 'is-invalid' : ''}`}
                    id="official_email"
                    placeholder="Enter your Official Email"
                    value={formData.official_email}
                    onChange={handleChange}
                  />
                  {errors.official_email && (
                    <div className="invalid-feedback">{errors.official_email}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="total_exp_hiring" className="form-label">
                    Total Experience in Hiring*
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.total_exp_hiring ? 'is-invalid' : ''}`}
                    id="total_exp_hiring"
                    placeholder="Enter experience in years"
                    value={formData.total_exp_hiring}
                    onChange={handleChange}
                  />
                  {errors.total_exp_hiring && (
                    <div className="invalid-feedback">{errors.total_exp_hiring}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="jobrole" className="form-label">
                    Job Role*
                  </label>
                  <select
                    id="jobrole"
                    className={`form-select ${errors.jobrole ? 'is-invalid' : ''}`}
                    value={formData.jobrole}
                    onChange={handleChange}
                  >
                    <option value="">Select Job Role</option>
                    <option value="developer">Developer</option>
                    <option value="designer">Designer</option>
                    {/* Add more options as needed */}
                  </select>
                  {errors.jobrole && (
                    <div className="invalid-feedback">{errors.jobrole}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="di_category" className="form-label">
                    D & I Category*
                  </label>
                  <select
                    id="di_category"
                    className={`form-select ${errors.di_category ? 'is-invalid' : ''}`}
                    value={formData.di_category}
                    onChange={handleChange}
                  >
                    <option value="">Select D & I Category</option>
                    <option value="category1">Category 1</option>
                    <option value="category2">Category 2</option>
                    {/* Add more options as needed */}
                  </select>
                  {errors.di_category && (
                    <div className="invalid-feedback">{errors.di_category}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="gender" className="form-label">
                    Gender*
                  </label>
                  <select
                    id="gender"
                    className={`form-select ${errors.gender ? 'is-invalid' : ''}`}
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer_not_to_say">Prefer not to say</option>
                  </select>
                  {errors.gender && (
                    <div className="invalid-feedback">{errors.gender}</div>
                  )}
                </div>

                <div>
                  <button
                    className="btn btn-block text-white py-2 px-5 fw-m fs-s my-3"
                    id="save_employee_profile"
                    data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i> Saving..."
                    type="submit"
                  >
                    Save and Continue
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateProfile;
