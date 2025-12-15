import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { usePlacesWidget } from "react-google-autocomplete"; 
import { getUserData ,createStudentProfile } from '../../services/profileServices';
import { fetchData } from '../../services/apiServices';
import MultiSelect from '../form/MultiSelect';
import Autocomplete from '../form/Autocomplete';


const ProfileForm = () => {
  const [experience, setExperience] = useState('');
  const userId = localStorage.getItem('login_token'); // Retrieve user ID
  const [jobRole, setJobRole] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId, // ✅ Added here so it's part of formData from the start,
    name: '',
    dob: '',
    email: '',
    dniCategory: '',
    gender: '',
    jobRole: '',
    experience: '',
    location: '',
    languages:'',
    hobbies:'',
    skills:''
  });
  const [errors, setErrors] = useState({});
  const [profileData, setProfileData] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { ref } = usePlacesWidget({
    apiKey: 'AIzaSyBo6F5VIs1WvisRrmlwOUXq1T_IEITYTkw',
    onPlaceSelected: (place) => {
      setFormData((prevData) => ({
        ...prevData,
        location: place.formatted_address // Set the location based on the selected place
      }));
    }
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
              name: user.name || '',
              dob: user.dob || '',
              email: user.email || '',
              dniCategory: user.dni_category || '',
              gender: user.gender || '',
              jobRole: user.job_role || '',              
              experience: user.experience || '',
              location:user.location || '',
              languages:user.languages || '',
              hobbies:user.hobbies || '',
              skills:user.skills || '',
              bio:user.bio || '',
            });
           };
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
      formErrors.name = 'Full Name is required';
      isValid = false;
    }
    if (!formData.dob) {
      formErrors.dob = 'Date of Birth is required';
      isValid = false;
    } else if (new Date(formData.dob) > new Date()) {
      formErrors.dob = 'Date of Birth cannot be in the future';
      isValid = false;
    } else if (new Date().getFullYear() - new Date(formData.dob).getFullYear() < 16) {
      formErrors.dob = 'You must be at least 16 years old';
      isValid = false;
    }

    if (!formData.email) {
      formErrors.email = 'Email Address is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Email Address is invalid';
      isValid = false;
    }

    if (!formData.dniCategory) {
      formErrors.dniCategory = 'D & I Category is required';
      isValid = false;
    }

    if (!formData.gender) {
      formErrors.gender = 'Gender is required';
      isValid = false;
    }

    if (!formData.jobRole) {
      formErrors.jobRole = 'Job Role is required';
      isValid = false;
    }

    if (!formData.experience) {
      formErrors.experience = 'Experience is required';
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
      [id]: value
    }));
  };

    // const handleSelect = (suggestion) => {
    //     console.log('Selected suggestion:', suggestion);
    //     setJobRole(suggestion.label); // Set the selected job role
    // };

const handleSelect = (suggestion) => {
  setFormData(prev => ({ ...prev, jobRole: suggestion.label }));
}
const handleMultiSelectChange = (selectedOptions, fieldName) => {
  if (Array.isArray(selectedOptions)) {
    setFormData(prevData => ({
      ...prevData,
      [fieldName]: selectedOptions.map(option => option.value)
    }));
  } else {
    setFormData(prevData => ({
      ...prevData,
      [fieldName]: selectedOptions ? selectedOptions.value : ''
    }));
  }
};


  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowErrors(true);
    if (validate()) {
      try {
        const response = await fetchData('update-student-profile', { // Replace with your API endpoint for submission
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        if (response && response.code === 200) {
          console.log("Profile created successfully!");
          setIsModalVisible(true); // Show the modal on success
          // Redirect to /jobs after 5 seconds
          setTimeout(() => {
            navigate('/jobs');
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
      <div className="">
        {/* <div className="card-head">
          <h3 className="card-title">Select your preference</h3>
        </div> */}
        <form onSubmit={handleSubmit}>
          <div className='form-row'>
            <label htmlFor="name" className="form-label">Full Name*</label>
            <input
              type="text"
              className={`form-control ${showErrors && errors.name ? 'is-invalid' : ''}`}
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
            {showErrors && errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          <div className='form-row'>
            <label htmlFor="dob" className="form-label">Date of Birth*</label>
            <input
              type="date"
              className={`form-control ${showErrors && errors.dob ? 'is-invalid' : ''}`}
              id="dob"
              value={formData.dob}
              onChange={handleChange}
            />
            {showErrors && errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
          </div>

          <div className='form-row'>
            <label htmlFor="gender" className="form-label">Gender*</label>
            <select
              className={`form-control ${showErrors && errors.gender ? 'is-invalid' : ''}`}
              id="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {showErrors && errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
          </div>

          <div className='form-row'>
            <label htmlFor="jobRole" className="form-label">Primary Role</label>
            <Autocomplete
                icon=""
                className='no-border'
                endpoint='job-roles'
                onSelect={handleSelect}  // When a job role is selected, update state
                value={formData.jobRole}
                placeholder="Serach Role or Type"
            />
            {showErrors && errors.jobRole && <div className="invalid-feedback">{errors.jobRole}</div>}
          </div>

          <div className='form-row'>
            <label htmlFor="experience" className="form-label">Experience In Years*</label>
              <MultiSelect 
                endpoint='experienceranges' 
                tableName='experience' 
                value={formData.experience}
                onChange={(selectedOptions) => handleMultiSelectChange(selectedOptions, 'experience')} 
                placeholder='5'
                />  
            {showErrors && errors.experience && <div className="invalid-feedback">{errors.experience}</div>}
          </div>

          <div className='form-row'>
            <label htmlFor="location" className="form-label">Where are you based?</label>
            <input
              type="text"
              className={`form-control ${showErrors && errors.location ? 'is-invalid' : ''}`}
              id="location"
              placeholder="Enter Location"
              value={formData.location}
              onChange={handleChange}
              ref={ref}
            />
            {showErrors && errors.location && <div className="invalid-feedback">{errors.location}</div>}
          </div>

          {/* <div className='form-row'>
            <label htmlFor="dniCategory" className="form-label">D & I Category*</label>
            <select
              className={`form-control ${showErrors && errors.dniCategory ? 'is-invalid' : ''}`}
              id="dniCategory"
              value={formData.dniCategory}
              onChange={handleChange}
            >
              <option value="">Select D & I Category</option>
              <option value="Veterans (Army/Navy/Airforce)">Veterans (Army/Navy/Airforce)</option>
              <option value="Disability">Disability</option>
              <option value="Women">Women</option>
              <option value="LGBTQIA">LGBTQIA</option>
              <option value="Others">Others</option>
            </select>
            {showErrors && errors.dniCategory && <div className="invalid-feedback">{errors.dniCategory}</div>}
          </div> */}

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
          <MultiSelect
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
        <div className='form-row'>
          <label htmlFor="languages" className="form-label">Languages*</label>
            <MultiSelect 
              endpoint='get-masters-details' 
              tableName='languages'
              isMulti={true} 
              value={formData.languages}
              onChange={(selectedOptions) => handleMultiSelectChange(selectedOptions, 'languages')}
            />
          </div>
          <div className='form-row'>
          <label htmlFor="languages" className="form-label">hobbies*</label>           
           <MultiSelect 
              endpoint='get-hobbies' 
              tableName=''
              value={formData.hobbies}
              isMulti={true}  
              onChange={(selectedOptions) => handleMultiSelectChange(selectedOptions, 'hobbies')} 
              />
          </div>
          <div className='form-row'>
          <label htmlFor="bio" className="form-label">Bio*</label>           
          <textarea
            name='bio'
            id="bio"
            className='form-control'
            value={formData.bio || ''} // prevent undefined
            onChange={handleChange}
          />
          </div>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Save'}
          </button>
          {submissionError && <div className="alert alert-danger">{submissionError}</div>}
        </form>
      </div>
    </>
  );
};

export default ProfileForm;
