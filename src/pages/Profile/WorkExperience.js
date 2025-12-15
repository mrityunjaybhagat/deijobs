import React, { useState, useEffect } from 'react';
import { fetchData } from '../../services/apiServices';
import { GraduationCap, PencilIcon, Trash2 } from 'lucide-react';

const WorkExperienceForm = () => {
  const [educationData, setEducationData] = useState([]);
  const [formVisible, setFormVisible] = useState(false); // For "Add New" form above the list
  const [editingIndex, setEditingIndex] = useState(null); // null = no edit
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});
  const userId = localStorage.getItem('login_token');
  const [formData, setFormData] = useState({
    userId:userId,
    degree: '',
    university: '',
    yearOfPassing: '',
    percentage: '',
    description: '',
  });
  const fetchEducationData = async () => {
    try {
      const response = await fetchData('get-profile-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      if (response.code === 200) {
        setEducationData(response.data.education_data);
      } else {
        console.error('Error fetching education data:', response.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  useEffect(() => { fetchEducationData(); }, []);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const handleSubmit_working = async (e) => {
  e.preventDefault();

  // Basic front-end validation (optional)
  if (!formData.degree || !formData.university) {
    setSuccessMessage('Please fill all required fields');
    return;
  }

  try {
    const payload = {
      userId,
      id: formData.id || null,
      degree: formData.degree,
      university: formData.university,
      passingYear: formData.yearOfPassing,
      percentage: formData.percentage,
      description: formData.description,
    };

    const response = await fetchData('add-student-education', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.code === 200) {
      // ✅ Update state data
      if (formData.id) {
        setEducationData((prev) =>
          prev.map((item) =>
            item.id === formData.id
              ? { ...item, ...response.data }
              : item
          )
        );
      } else {
        setEducationData((prev) => [
          ...prev,
          { id: response.data.id, ...response.data },
        ]);
      }

      // ✅ Show success message first
      setSuccessMessage('🎉 Education updated successfully!');

      // ✅ Delay before closing the form (smooth UX)
      setTimeout(() => {
        setEditingIndex(null);
        setFormVisible(false);
        setSuccessMessage('');
        fetchEducationData();
        setFormData({
          userId,
          degree: '',
          university: '',
          yearOfPassing: '',
          percentage: '',
          description: '',
        });
      }, 1500); // 1.5 seconds delay for smooth close
    } else {
      console.error('Error saving education:', response.message);
      setSuccessMessage('⚠️ Failed to save education.');
    }
  } catch (error) {
    console.error('Error:', error);
    setSuccessMessage('⚠️ Something went wrong.');
  }
};


const handleSubmit = async (e) => {
  e.preventDefault();

  // ✅ Reset previous errors
  setErrors({});
  setSuccessMessage('');

  // ✅ Frontend validation
  let validationErrors = {};
  if (!formData.degree.trim()) validationErrors.degree = 'Degree is required';
  if (!formData.university.trim()) validationErrors.university = 'University is required';
  if (!formData.yearOfPassing) validationErrors.yearOfPassing = 'Year of passing is required';
  // Optional: add more checks for percentage, description if needed

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return; // stop submit
  }

  try {
    const payload = {
      userId,
      id: formData.id || null,
      degree: formData.degree,
      university: formData.university,
      passingYear: formData.yearOfPassing, 
      percentage: formData.percentage,
      description: formData.description,
    };

    const response = await fetchData('add-student-education', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.code === 200) {
      // ✅ Update state data
      if (formData.id) {
        setEducationData(prev =>
          prev.map(item =>
            item.id === formData.id ? { ...item, ...response.data } : item
          )
        );
      } else {
        setEducationData(prev => [
          ...prev,
          { id: response.data.id, ...response.data },
        ]);
      }

      // ✅ Show success message first
      setSuccessMessage('🎉 Education updated successfully!');

      // ✅ Smooth form close
      setTimeout(() => {
        setEditingIndex(null);
        setFormVisible(false);
        setSuccessMessage('');
        fetchEducationData();
        setFormData({
          userId,
          degree: '',
          university: '',
          yearOfPassing: '',
          percentage: '',
          description: '',
        });
      }, 1500);

    } else {
      console.error('Error saving education:', response.message);
      setSuccessMessage('⚠️ Failed to save education.');
    }
  } catch (error) {
    console.error('Error:', error);
    setSuccessMessage('⚠️ Something went wrong.');
  }
};

const handleSubmit_new = async (e) => {
  e.preventDefault();

  try {
    const payload = {
      userId,
      id: formData.id || null,
      degree: formData.degree,
      university: formData.university,
      passingYear: formData.yearOfPassing,
      percentage: formData.percentage,
      description: formData.description,
    };

    const res = await fetchData('add-student-education', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    // ✅ Extract only the LAST JSON from mixed response
    const jsonMatch = res.match(/\{[\s\S]*\}$/);
    if (!jsonMatch) {
      console.error('Invalid response format:', res);
      return;
    }
    const response = JSON.parse(jsonMatch[0]);

    // ✅ Check for success
    if (response.code === 200 || (response.data && response.data.code === 200)) {
      // Refresh list
      await fetchEducationData();

      // Close appropriate form
      if (formData.id) {
        setEditingIndex(null); // close edit form
      } else {
        setFormVisible(false); // close add form
      }

      // Reset form data
      setFormData({
        userId,
        degree: '',
        university: '',
        yearOfPassing: '',
        percentage: '',
        description: '',
      });

      // Optional success alert
      alert('✅ Education saved successfully');
    } else {
      console.error('❌ Failed to save:', response);
    }
  } catch (error) {
    console.error('Error in handleSubmit:', error);
  }
};


  const handleEdit = (index) => {
    const data = educationData[index];
    setFormData({
      id: data.id,
      userId,
      degree: data.degree, // or degree name depending on what you want to show
      university: data.university,
      yearOfPassing: data.passing_year,
      percentage: data.percentage || '',
      description: data.description || '',
    });
    setEditingIndex(index);
  };
  const handleDelete = async (educationId) => {
    try {
      const response = await fetchData('delete-education', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, educationId }),
      });
      if (response.code === 200) fetchEducationData();
      else console.error('Error deleting education:', response.message);
    } catch (error) { console.error('Error:', error); }
  };
  return (
    <div>
      <div className='card-head toggle-head d-flex mb-2 justify-content-between align-items-center'>
          <h3 className="card-title">Education</h3>
          <button 
        className="btn"
        style={{
          background:'#e5e7eb', width:'30px', height:'30px', borderRadius:'50%',
          textAlign:'center', padding:'0px', lineHeight:'1.4', fontWeight:'bold'
        }}
        onClick={() => { setFormVisible(!formVisible); setEditingIndex(null); }}
      >
        {formVisible ? '-' : '+'}
      </button>
      </div>
      
      {/* Add New Button */}
      

      {/* Add New Form above the list */}
      {formVisible && editingIndex === null && (
        <form onSubmit={handleSubmit} className='p-3 mb-2'  style={{border:'1px solid #bcbcbc',borderRadius:"15px"}}>
          <div className='d-flex form-row'>
            <label>Degree</label>
            <input type="text" name="degree" placeholder="Degree" value={formData.degree} onChange={handleChange} className='form-control' required />
          </div>
          {errors.degree && <span className="text-danger">{errors.degree}</span>}
          <div className='d-flex form-row'>
            <label>University</label>
            <input type="text" name="university" placeholder="University" value={formData.university} onChange={handleChange} className='form-control' required />
          </div>
          <div className='d-flex form-row'>
            <label>Year Of Passing</label>
            <input type="date" name="yearOfPassing" placeholder="Year of Passing" value={formData.yearOfPassing} onChange={handleChange} className='form-control' required />
          </div>
          <div className='d-flex form-row'>
            <label>Percentage (%)</label>
            <input type="text" name="percentage" placeholder="Percentage" value={formData.percentage} onChange={handleChange} className='form-control' />
          </div>
          <div className='d-flex form-row'>
            <label>Description</label>
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className='form-control' />
          </div>
          <button className="btn btn-sm btn-primary" type="submit">Add</button>
          <button className="btn btn-sm btn-secondary" type="button" onClick={() => setFormVisible(false)}>Cancel</button>
        </form>
      )}

      <ul>
        {educationData.map((edu, index) => (
          <li 
  key={edu.id} 
  style={{border:'1px solid #bcbcbc', borderRadius:"15px"}} 
  className="mb-3"
>
  <div className='d-flex align-items-start gap-3 p-2'>
    {/* Icon */}
    <div className='list_icon flex-shrink-0'>
      <GraduationCap size={30} />
      {/* Or use an image if needed */}
      {/* <img src={icons['EducationCapRectangle.svg']} alt="Icon" style={{ width: '40px', height: '40px', objectFit: 'cover' }} /> */}
    </div>

    {/* Content */}
    <div className='flex-grow-1'>
      <strong>{edu.university}</strong>
      <p>{edu.degree}</p>
      <p>{edu.passing_year}</p>
      {/* <p>{edu.description}</p> */}
    </div>

    {/* Action buttons */}
    <div className='d-flex flex-column gap-1'>
      <button className="btn btn-sm btn-primary_ text-primary text-sm" onClick={() => handleEdit(index)}>
        <PencilIcon />
      </button>
      <button className="btn btn-sm btn-danger_ text-primary text-sm" onClick={() => handleDelete(edu.id)}>
        <Trash2 />
      </button>
    </div>
  </div>

            {/* Inline Edit Form */}
            {editingIndex === index && (
<>
              <form onSubmit={handleSubmit} style={{marginTop:'10px'}} className='p-2'>
                <div className='d-flex form-row'>
                <label>Degree</label>
                <input type="text" name="degree" placeholder="Degree" value={formData.degree} onChange={handleChange} className='form-control' required />
                </div>
                <div className='d-flex form-row'>
                <label>University</label>
                <input type="text" name="university" placeholder="University" value={formData.university} onChange={handleChange} className='form-control' required />
                </div>
                <div className='d-flex form-row'>
                <label>Year Of Passing</label>
                <input type="date" name="yearOfPassing" placeholder="Year of Passing" value={formData.yearOfPassing} onChange={handleChange} className='form-control' required />
                </div>
                <div className='d-flex form-row'>
                <label>Percentage (%)</label>
                <input type="text" name="percentage" placeholder="Percentage" value={formData.percentage} onChange={handleChange} className='form-control' />
                </div>
                <div className='d-flex form-row'>
                <label>Description</label>
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className='form-control' />
                </div>
                <button className="btn btn-sm btn-primary" type="submit">Update</button>
                <button className="btn btn-sm btn-secondary" type="button" onClick={() => setEditingIndex(null)}>Cancel</button>
              </form>

{successMessage && (
  <div style={{ color: successMessage.includes('⚠️') ? 'red' : 'green', marginBottom: '8px' }}>
    {successMessage}
  </div>
)}
</>
            )}

          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkExperienceForm;
