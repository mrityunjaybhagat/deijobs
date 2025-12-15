import React, { useState, useEffect } from 'react';
import { fetchData } from '../../services/apiServices'; // Adjust the path if necessary
import MultiSelect from '../form/MultiSelect';
import ToggleComponent from '../ui/ToggleComponent ';
import icons from '../../assets/icons'

const WorkExperience = () => {
  const userId = localStorage.getItem('login_token');
  const [formData, setFormData] = useState({
    userId: userId,
    company_name: '',
    job_role: '',
    start_date: '',
    end_date: '',
    description: '',
  });

  const [educationData, setEducationData] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [editIndex, setEditIndex] = useState(null); // For inline edit tracking
  const [editedExperience, setEditedExperience] = useState({}); // Holds data being edited

  // Handle text inputs for new form submission
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // Handle MultiSelect inputs
  const handleMultiSelectChange = (selectedOption, fieldName) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: selectedOption ? selectedOption.value : '',
    }));
  };

  // Fetch existing work experience
  const fetchEducationData = async () => {
    try {
      const response = await fetchData('get-profile-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
      if (response.code === 200) {
        setEducationData(response.data.work_experience);
      } else {
        console.error('Error fetching work experience data:', response.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchEducationData(); // Fetch data when the component mounts
  }, []);

  // Handle form submission for adding new experience
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchData('add-student-work-experience', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.code === 200) {
        setIsSubmitted(true);
        fetchEducationData(); // Fetch updated education data after successful submission
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Handle deletion of an experience entry
  const handleDelete = async (experienceId) => {
    try {
      const response = await fetchData('delete-experience', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, experienceId }),
      });
      if (response.code === 200) {
        fetchEducationData(); // Fetch updated data after deletion
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Handle edit click
  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditedExperience(educationData[index]); // Store data to be edited
  };

  // Handle edit change for inline edit
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedExperience((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Save edited experience data
  const handleSaveEdit = async (experienceId) => {
    try {
      const response = await fetchData('update-experience', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...editedExperience, userId, experienceId }),
      });
      if (response.code === 200) {
        setEditIndex(null); // Exit edit mode
        fetchEducationData(); // Fetch updated data
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
     <ToggleComponent title="Work Experience" icon={icons['briefcase.svg']}>
      {/* Form for adding new work experience */}
      <div className='card no-shadow'>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Degree</label>
          <MultiSelect
            endpoint='get-degrees'
            onChange={(selectedOption) => handleMultiSelectChange(selectedOption, 'degree')}
          />
        </div>

        <div className="form-row">
          <label>University</label>
          <MultiSelect
            endpoint='get-universities'
            onChange={(selectedOption) => handleMultiSelectChange(selectedOption, 'university')}
          />
        </div>

        <div className="form-row">
          <label>Year of Passing</label>
          <input
            type="date"
            name="yearOfPassing"
            className="form-control"
            value={formData.yearOfPassing}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label>Percentage</label>
          <input
            type="text"
            name="percentage"
            className="form-control"
            placeholder="Percentage"
            value={formData.percentage}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label>Description</label>
          <textarea
            name="description"
            className="form-control"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      </div>
      </ToggleComponent> 
      {/* Display existing education data with edit and delete options */}
      {educationData.length > 0 && (
        <div className="education-data-section">
          <ul>
            {educationData.map((experience, index) => (
              <li key={index}>
                {editIndex === index ? (
                  <>
                    <strong>Company Name:</strong>
                    <input
                      type="text"
                      name="company_name"
                      className="form-control"
                      value={editedExperience.company_name}
                      onChange={handleEditChange}
                    />
                    <MultiSelect 
                      endpoint='get-masters-details' 
                      tableName='employer_details' 
                      value={formData.company_name}
                      onChange={(selectedOptions) => handleMultiSelectChange(selectedOptions, 'company_name')} />  
                    <br/>
                    <strong>Role Name:</strong>
                    <MultiSelect 
                      endpoint='get-masters-details' 
                      tableName='job_roles' 
                      value={formData.role_name}
                      onChange={(selectedOptions) => handleMultiSelectChange(selectedOptions, 'role_name')} />    
                    <input
                      type="text"
                      name="role_name"
                      className="form-control"
                      value={editedExperience.role_name}
                      onChange={handleEditChange}
                    />
                    <br/>
                    <strong>Start Date:</strong>
                    <input
                      type="date"
                      name="start_date"
                      className="form-control"
                      value={editedExperience.start_date}
                      onChange={handleEditChange}
                    />
                    <br/>
                    <strong>End Date:</strong>
                    <input
                      type="date"
                      name="end_date"
                      className="form-control"
                      value={editedExperience.end_date}
                      onChange={handleEditChange}
                    />
                    <br/>
                    <strong>Description:</strong>
                    <textarea
                      name="description"
                      className="form-control"
                      value={editedExperience.description}
                      onChange={handleEditChange}
                    ></textarea>
                    <br/>
                    <button className="btn btn-sm btn-success" onClick={() => handleSaveEdit(experience.id)}>Save</button>
                    &nbsp; <button className="btn btn-sm btn-secondary" onClick={() => setEditIndex(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                        <div className='card'>
                            {experience.employer_logo ? (
                              <div className='w-15'>
                                  <img src={experience.employer_logo} alt=''/>
                              </div>
                              ) : (
                                <div className='w-15'>
                                <img src="/path/to/default-logo.png" alt="Default Logo" width="100" />
                              </div>                                
                            )}                              
                            <div className='d-flex justify-space-between'>
                            <div>
                            <p><strong>{experience.role_name || ''}</strong></p>
                            <p style={{fontWeight:'300',color:'#4B5563'}}>{experience.company_name || 'Not Provided'}</p>                              
                            <p style={{fontWeight:'300',color:'#4B5563'}}>{experience.start_date || 'Not Provided'} - {experience.is_current_company ? 'Currently Working' : experience.end_date}</p>
                            <p style={{fontWeight:'500',color:'#4B5563'}}>{experience.description || 'Not Provided'}</p>
                            </div>
                              <div>
                                <button onClick={() => handleEditClick(index)} className='btn btn-sm btn-primary'>Edit</button>
                                <button onClick={() => handleDelete(experience.id)} className='btn btn-sm btn-danger'>Delete</button>
                              </div>
                            </div>
                        </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default WorkExperience;
