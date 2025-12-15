import React, { useState, useEffect } from 'react';
import { getUserData } from '../../services/apiService'; // Adjust path as per your folder structure
import PrimaryButton from '../../components/form/PrimaryButton';

const CreateProfile = () => {
  const userId = localStorage.getItem('login_token');
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    email: '',
    diCategory: '',
    gender: '',
    jobRole: '',
    experience: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      getUserData(userId)
        .then((response) => {
          if (response.code === 200 && response.data.user_data.length > 0) {
            const user = response.data.user_data[0];
            setFormData({
              name: user.name || '',
              dob: user.dob || '',
              email: user.email || '',
              diCategory: user.dni_category || '',
              gender: user.gender || '',
              jobRole: user.job_role || '',
              experience: user.experience || '',
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

  // Form validation
  const validate = () => {
    let formErrors = {};
    let isValid = true;

    // Add validation logic here...
    // (Same as before)

    setErrors(formErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form is valid:', formData);
      // Handle form submission logic here
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section className='content'>
      <div className='container'>
        <div className='container_box'>
          <div className='card py-5 px-4'>
            <h2>Create Your Profile</h2>
            <form onSubmit={handleSubmit}>
              <div className='form-row'>
                <label htmlFor="name" className="form-label">Full Name*</label>
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

              {/* Other form fields (dob, email, etc.) similarly populated */}

              <PrimaryButton text='Continue' onClick={handleSubmit} />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateProfile;
