import React, { useState, useEffect } from 'react';
import { fetchData } from '../../services/apiServices';
import Autocomplete from '../form/Autocomplete';
import { GraduationCap, PencilIcon, Trash2 } from 'lucide-react';

const EducationForm = () => {
  const [educationData, setEducationData] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});
  const userId = localStorage.getItem('login_token');

  const initialForm = {
    userId,
    id: null,
    degree: '',
    university: '',
    yearOfPassing: '',
    percentage: '',
    description: '',
  };

  const [formData, setFormData] = useState(initialForm);

  // 🔹 Fetch Education Data
  const fetchEducationData = async () => {
    try {
      const response = await fetchData('get-profile-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      if (response.code === 200) {
        setEducationData(response.data.education_data || []);
      } else {
        console.error('Error fetching education data:', response.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => { fetchEducationData(); }, []);

  // 🔹 Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const handleDegreeSelect = (suggestion) => {
  setFormData(prev => ({ ...prev, degree: suggestion.label }));
};

const handleUniversitySelect = (suggestion) => {
  setFormData(prev => ({ ...prev, university: suggestion.label }));
};
  // 🔹 Validation
  const validate = () => {
    const newErrors = {};
    if (!formData.degree.trim()) newErrors.degree = 'Degree is required';
    if (!formData.university.trim()) newErrors.university = 'University is required';
    if (!formData.yearOfPassing) newErrors.yearOfPassing = 'Year of passing is required';
    return newErrors;
  };

  // 🔹 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
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
        // ✅ Update state
        if (formData.id) {
          setEducationData((prev) =>
            prev.map((item) =>
              item.id === formData.id ? { ...item, ...payload } : item
            )
          );
        } else {
          setEducationData((prev) => [
            ...prev,
            { id: response.data.id, ...payload },
          ]);
        }

        // ✅ Success feedback
        setSuccessMessage('🎓 Education saved successfully!');

        setTimeout(() => {
          setEditingIndex(null);
          setFormVisible(false);
          setFormData(initialForm);
          setSuccessMessage('');
          fetchEducationData();
        }, 1500);
      } else {
        setSuccessMessage('⚠️ Failed to save education.');
      }
    } catch (error) {
      console.error('Error saving education:', error);
      setSuccessMessage('⚠️ Something went wrong.');
    }
  };

  // 🔹 Edit
  const handleEdit = (index) => {
    const data = educationData[index];
    setFormData({
      id: data.id,
      userId,
      degree: data.degree,
      university: data.university,
      yearOfPassing: data.passing_year,
      percentage: data.percentage || '',
      description: data.description || '',
    });
    setEditingIndex(index);
  };

  // 🔹 Delete
  const handleDelete = async (educationId) => {
    try {
      const response = await fetchData('delete-education', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, educationId }),
      });
      if (response.code === 200) fetchEducationData();
    } catch (error) {
      console.error('Error deleting education:', error);
    }
  };

  // 🔹 Form JSX
  const renderForm = (isEdit = false) => (
    <form onSubmit={handleSubmit} className="p-3 mb-2" style={{ border: '1px solid #bcbcbc', borderRadius: '15px' }}>
      <div className="form-row">
        <label>Degree</label>
        {/* <input type="text" name="degree" value={formData.degree} onChange={handleChange} className="form-control" /> */}
        <Autocomplete
          icon=""
          className='no-border'
          endpoint='get-degrees'
          onSelect={handleDegreeSelect}  // When a job role is selected, update state
          value={formData.degree}
          placeholder="Serach Degree or Type"
      />
        {errors.degree && <small className="text-danger">{errors.degree}</small>}
      </div>

      <div className="form-row">
        <label>University</label>
        {/* <input type="text" name="university" value={formData.university} onChange={handleChange} className="form-control" /> */}
        <Autocomplete
          icon=""
          className='no-border'
          endpoint='get-universities'
          onSelect={handleUniversitySelect}  // When a job role is selected, update state
          value={formData.university}
          placeholder="Serach University or Type"
      />
        {errors.university && <small className="text-danger">{errors.university}</small>}
      </div>

      <div className="form-row">
        <label>Year Of Passing</label>
        <input type="date" name="yearOfPassing" value={formData.yearOfPassing} onChange={handleChange} className="form-control" />
        {errors.yearOfPassing && <small className="text-danger">{errors.yearOfPassing}</small>}
      </div>

      <div className="form-row">
        <label>Percentage (%)</label>
        <input type="text" name="percentage" value={formData.percentage} onChange={handleChange} className="form-control" />
      </div>

      <div className="form-row">
        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} className="form-control" />
      </div>

      <button className="btn btn-sm btn-primary" type="submit">
        {isEdit ? 'Update' : 'Add'}
      </button>
      <button
        className="btn btn-sm btn-secondary ms-2"
        type="button"
        onClick={() => {
          if (isEdit) setEditingIndex(null);
          else setFormVisible(false);
          setFormData(initialForm);
          setErrors({});
        }}
      >
        Cancel
      </button>

      {successMessage && (
        <div style={{ color: successMessage.includes('⚠️') ? 'red' : 'green', marginTop: '10px' }}>
          {successMessage}
        </div>
      )}
    </form>
  );

  return (
    <div>
      <div className="card-head toggle-head d-flex mb-2 justify-content-between align-items-center">
        <h3 className="card-title">Education</h3>
        <button
          className="btn"
          style={{
            background: '#e5e7eb',
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            textAlign: 'center',
            padding: '0px',
            lineHeight: '1.4',
            fontWeight: 'bold',
          }}
          //onClick={() => { setFormVisible(!formVisible); setEditingIndex(null); }}
          onClick={() => {
            setFormVisible(!formVisible);
            setEditingIndex(null);
            setFormData({
              userId,
              degree: '',
              university: '',
              yearOfPassing: '',
              percentage: '',
              description: '',
            });
          }}
        >
          {formVisible ? '-' : '+'}
        </button>
      </div>

      {formVisible && editingIndex === null && renderForm(false)}

      <ul>
        {educationData.map((edu, index) => (
          <li key={edu.id} style={{ border: '1px solid #bcbcbc', borderRadius: '15px' }} className="mb-3">
            <div className="d-flex align-items-start gap-3 p-2">
              <div className="list_icon flex-shrink-0">
                <GraduationCap size={30} />
              </div>

              <div className="flex-grow-1">
                <strong>{edu.university}</strong>
                <p>{edu.degree}</p>
                <p>{edu.passing_year}</p>
              </div>

              <div className="d-flex flex-column gap-1">
                <button className="btn btn-sm text-primary" onClick={() => handleEdit(index)}>
                  <PencilIcon />
                </button>
                <button className="btn btn-sm text-danger" onClick={() => handleDelete(edu.id)}>
                  <Trash2 />
                </button>
              </div>
            </div>

            {editingIndex === index && renderForm(true)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EducationForm;
