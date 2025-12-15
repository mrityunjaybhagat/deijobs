import React, { useState, useEffect } from 'react';
import { getUserData } from '../../services/profileServices'; // Assuming this fetches the profile data
import { fetchData } from '../../services/apiServices';
import ProfileCard from '../../components/profile/ProfileCard';
import TabNav from '../../components/ui/TabNav';
import { usePlacesWidget } from "react-google-autocomplete"; 
import MultiSelect from '../../components/form/MultiSelect';
import ProfileComplete from '../../components/ui/CompleteStatus';

const ProfileForm = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [showErrors, setShowErrors] = useState(false);
  const [errors, setErrors] = useState({});
  const userId = localStorage.getItem('login_token'); // Retrieve user ID
  const { ref } = usePlacesWidget({
    //apiKey: 'AIzaSyBo6F5VIs1WvisRrmlwOUXq1T_IEITYTkw',
    // onPlaceSelected: (place) => {
    //   setFormData((prevData) => ({
    //     ...prevData,
    //     location: place.formatted_address // Set the location based on the selected place
    //   }));
    // }
  });
  const [formData, setFormData] = useState({
    userId, // Include userId
    jobType: '', // What type of job are you interested in?
    openTo: [], // Also open to job types (checkboxes)
    location: '', // Preferred location
    salary: '', // Desired salary
    companySize: {
      seed: '', // Seed company (1-10 employees)
      early: '', // Early stage company (11-50 employees)
      mid: '', // Mid-size company (51-200 employees)
      large: '', // Large company (201-500 employees)
      veryLarge: '', // Very Large (501-1000 employees)
      massive: '', // Massive (1000+ employees)
    },
  });

    const fetchProfile = async () => {
      try {
        const response = await getUserData(userId);
        if (response.code === 200) {
          const userProfile = response.data.preference_data;

          // Extract the preferences related to company sizes
          // const seed = userProfile.find(item => item.question_id === "Seed(1-10 employees)")?.answer || '';
          // const early = userProfile.find(item => item.question_id === "Early(11-50 employees)")?.answer || '';
          // const mid = userProfile.find(item => item.question_id === "Mid-size(51-200 employees)")?.answer || '';
          // const large = userProfile.find(item => item.question_id === "Large(201-500 employees)")?.answer || '';
          // const veryLarge = userProfile.find(item => item.question_id === "Very Large(501-1000 employees)")?.answer || '';
          // const massive = userProfile.find(item => item.question_id === "Massive(1000+ employees)")?.answer || '';

const seed = userProfile.find(item => item.question_id === "5")?.answer || '';
const early = userProfile.find(item => item.question_id === "6")?.answer || '';
const mid = userProfile.find(item => item.question_id === "7")?.answer || '';
const large = userProfile.find(item => item.question_id === "8")?.answer || '';
const veryLarge = userProfile.find(item => item.question_id === "9")?.answer || '';
const massive = userProfile.find(item => item.question_id === "10")?.answer || '';


          setFormData({
            userId: localStorage.getItem('login_token'),
            jobType: userProfile[0].answer || '',
            openTo: userProfile[1].answer ? userProfile[1].answer.split(',') : [],
            location: userProfile[2].answer || '',
            salary: userProfile[3].answer || '',
            companySize: {
              seed: seed,  // Set the state with the correct values from API
              early: early,
              mid: mid,
              large: large,
              veryLarge: veryLarge,
              massive: massive,
            }
          });
        }
      } catch (error) {
        console.error('Failed to fetch profile data:', error);
      }
    };
  useEffect(() => {
    fetchProfile();
  }, [userId]);


  const validate = () => {
    let formErrors = {};
    let isValid = true;
    if (!formData.salary) {
      formErrors.salary = 'Salary is required';
      isValid = false;
    }
    setErrors(formErrors);
    return isValid;
  };
  // Handle form change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle checkbox change for openTo job types
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      openTo: checked
        ? [...prevData.openTo, value]
        : prevData.openTo.filter((item) => item !== value),
    }));
  };

  // Handle radio button changes for company size preferences
  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      companySize: {
        ...prevData.companySize,
        [name]: value,
      },
    }));
  };
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
  const handleSubmit = async (e) => {
  e.preventDefault();

  // Convert formData to the expected format
  // const questions = [
  //   {
  //     questionId: "What type of job are you interested in?",
  //     answer: formData.jobType
  //   },
  //   {
  //     questionId: "Also open to job types",
  //     answer: formData.openTo.join(',')
  //   },
  //   {
  //     questionId: "What location do you want to work in?",
  //     answer: Array.isArray(formData.location) ? formData.location.join(',') : formData.location
  //   },
  //   {
  //     questionId: "What is your desired salary?",
  //     answer: formData.salary
  //   },
  //   {
  //     questionId: "Seed(1-10 employees)",
  //     answer: formData.companySize.seed
  //   },
  //   {
  //     questionId: "Early(11-50 employees)",
  //     answer: formData.companySize.early
  //   },
  //   {
  //     questionId: "Mid-size(51-200 employees)",
  //     answer: formData.companySize.mid
  //   },
  //   {
  //     questionId: "Large(201-500 employees)",
  //     answer: formData.companySize.large
  //   },
  //   {
  //     questionId: "Very Large(501-1000 employees)",
  //     answer: formData.companySize.veryLarge
  //   },
  //   {
  //     questionId: "Massive(1000+ employees)",
  //     answer: formData.companySize.massive
  //   }
  // ];
// ✅ Use numeric or UUID question IDs instead of question text
  const questions = [
    {
      questionId: 1, // "What type of job are you interested in?"
      answer: formData.jobType
    },
    {
      questionId: 2, // "Also open to job types"
      answer: formData.openTo.join(',')
    },
    {
      questionId: 3, // "What location do you want to work in?"
      answer: Array.isArray(formData.location)
        ? formData.location.join(',')
        : formData.location
    },
    {
      questionId: 4, // "What is your desired salary?"
      answer: formData.salary
    },
    {
      questionId: 5, // "Seed (1–10 employees)"
      answer: formData.companySize.seed
    },
    {
      questionId: 6, // "Early (11–50 employees)"
      answer: formData.companySize.early
    },
    {
      questionId: 7, // "Mid-size (51–200 employees)"
      answer: formData.companySize.mid
    },
    {
      questionId: 8, // "Large (201–500 employees)"
      answer: formData.companySize.large
    },
    {
      questionId: 9, // "Very Large (501–1000 employees)"
      answer: formData.companySize.veryLarge
    },
    {
      questionId: 10, // "Massive (1000+ employees)"
      answer: formData.companySize.massive
    }
  ];
  const payload = {
    userId: formData.userId,
    questions: questions
  };

  try {
    const response = await fetchData('add-student-prefrence-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.code === 200) {
      setSuccessMessage('✅ Preferences updated successfully!');
      fetchProfile();  // 🔄 reload updated data
      setTimeout(() => setSuccessMessage(''), 3000); // clear after 3 seconds
      //console.log('Preferences submitted successfully:', response);
    } else {
      console.error('Failed to submit preferences:', response);
    }
  } catch (error) {
    console.error('Error submitting preferences:', error);
  }
};

  // Handle button click
  const handleButtonClick = (e) => {
    e.preventDefault(); // Prevent default behavior
    handleSubmit(e); // Call the handleSubmit function
  };

  return (
    <>
     <section className='content'>
            <div className='container'>
                <div className='row'>
                  <div className='col-md-3'>
                    <ProfileCard/>
                  </div>
                  <div className='col-md-6'>
                   <TabNav/>
                    <div className="card no-border shadow">
                    <div className='card-head'>
                        Select your preferences
                    </div>
                      <form onSubmit={handleSubmit}>
                        <div className='form-row'>
                          <label>What type of job are you interested in?</label>
                          <select name="jobType" className='form-control' value={formData.jobType} onChange={handleInputChange}>
                            <option value="">Select</option>
                            <option value="full-time">Full Time</option>
                            <option value="part-time">Part Time</option>
                            <option value="internship">Internship</option>
                          </select>
                        </div>

                        <div className='form-row'>
                          <label>Also open to the following job types:</label>
                          <p><input type="checkbox" value="Contractor" checked={formData.openTo.includes('Contractor')} onChange={handleCheckboxChange} /> Contractor</p>
                          <p><input type="checkbox" value="Intern" checked={formData.openTo.includes('Intern')} onChange={handleCheckboxChange} /> Intern</p>
                          <p><input type="checkbox" value="Co-founder" checked={formData.openTo.includes('Co-founder')} onChange={handleCheckboxChange} /> Co-founder</p>
                        </div>

                        <div className='form-row'>
                          <label>What location do you want to work in?</label>
                          {/* <input type="text" name="location"  className='form-control'  id="location" value={formData.location} onChange={handleInputChange}  ref={ref}/>                          */}
                          <MultiSelect
                              endpoint="get-masters-details"
                              tableName="cities"
                              isMulti
                              value={formData.location}
                              onChange={(selectedOptions) => handleMultiSelectChange(selectedOptions, 'location')}
                          />
                        </div>

                        <div className='form-row'>
                          <label>What is your desired salary (Per Annum) ?</label>                          
                            <MultiSelect 
                                endpoint='salaryranges' 
                                tableName='' 
                                value={formData.salary}
                                onChange={(selectedOptions) => handleMultiSelectChange(selectedOptions, 'salary')} 
                                placeholder='5'
                                />  
                            {showErrors && errors.salaryranges && <div className="invalid-feedback">{errors.salaryranges}</div>}
                          {/* <input type="number" name="salary"  className='form-control' value={formData.salary} onChange={handleInputChange} /> */}
                        </div>

                        <div className='form-row'>
                          <label>Would you like to work at companies of these sizes?</label>
                          <div>
                            <label>Seed (1-10 employees)</label>
                            <p>
                              <input 
                                type="radio" 
                                name="seed" 
                                value="Ideal" 
                                checked={formData.companySize.seed === 'Ideal'} 
                                onChange={handleRadioChange} 
                              /> Ideal
                            </p>
                            <p>
                              <input 
                                type="radio" 
                                name="seed" 
                                value="Yes" 
                                checked={formData.companySize.seed === 'Yes'} 
                                onChange={handleRadioChange} 
                              /> Yes
                            </p>
                            <p>
                              <input 
                                type="radio" 
                                name="seed" 
                                value="No" 
                                checked={formData.companySize.seed === 'No'} 
                                onChange={handleRadioChange} 
                              /> No
                            </p>
                          </div>

                          <div>
                            <label>Early (11-50 employees)</label>
                            <p>
                              <input 
                                type="radio" 
                                name="early" 
                                value="Ideal" 
                                checked={formData.companySize.early === 'Ideal'} 
                                onChange={handleRadioChange} 
                              /> Ideal
                            </p>
                            <p>
                              <input 
                                type="radio" 
                                name="early" 
                                value="Yes" 
                                checked={formData.companySize.early === 'Yes'} 
                                onChange={handleRadioChange} 
                              /> Yes
                            </p>
                            <p>
                              <input 
                                type="radio" 
                                name="early" 
                                value="No" 
                                checked={formData.companySize.early === 'No'} 
                                onChange={handleRadioChange} 
                              /> No
                            </p>
                          </div>

                          <div>
                            <label>Mid-size (51-200 employees)</label>
                            <p>
                              <input
                                type="radio"
                                name="mid"
                                value="Ideal"
                                checked={formData.companySize.mid === 'Ideal'}
                                onChange={handleRadioChange}
                              /> Ideal
                            </p>
                            <p>
                              <input
                                type="radio"
                                name="mid"
                                value="Yes"
                                checked={formData.companySize.mid === 'Yes'}
                                onChange={handleRadioChange}
                              /> Yes
                            </p>
                            <p>
                              <input
                                type="radio"
                                name="mid"
                                value="No"
                                checked={formData.companySize.mid === 'No'}
                                onChange={handleRadioChange}
                              /> No
                            </p>
                          </div>

                          <div>
                            <label>Large (201-500 employees)</label>
                            <p>
                              <input
                                type="radio"
                                name="large"
                                value="Ideal"
                                checked={formData.companySize.large === 'Ideal'}
                                onChange={handleRadioChange}
                              /> Ideal
                            </p>
                            <p>
                              <input
                                type="radio"
                                name="large"
                                value="Yes"
                                checked={formData.companySize.large === 'Yes'}
                                onChange={handleRadioChange}
                              /> Yes
                            </p>
                            <label>
                              <input
                                type="radio"
                                name="large"
                                value="No"
                                checked={formData.companySize.large === 'No'}
                                onChange={handleRadioChange}
                              /> No
                            </label>
                          </div>

                          <div>
                            <label>Very Large (501-1000 employees)</label>
                            <p>
                              <input
                                type="radio"
                                name="veryLarge"
                                value="Ideal"
                                checked={formData.companySize.veryLarge === 'Ideal'}
                                onChange={handleRadioChange}
                              /> Ideal
                            </p>
                            <p>
                              <input
                                type="radio"
                                name="veryLarge"
                                value="Yes"
                                checked={formData.companySize.veryLarge === 'Yes'}
                                onChange={handleRadioChange}
                              /> Yes
                            </p>
                            <p>
                              <input
                                type="radio"
                                name="veryLarge"
                                value="No"
                                checked={formData.companySize.veryLarge === 'No'}
                                onChange={handleRadioChange}
                              /> No
                            </p>
                          </div>

                          <div>
                            <label>Massive (1000+ employees)</label>
                            <p>
                              <input
                                type="radio"
                                name="massive"
                                value="Ideal"
                                checked={formData.companySize.massive === 'Ideal'}
                                onChange={handleRadioChange}
                              /> Ideal
                            </p>
                            <p>
                              <input
                                type="radio"
                                name="massive"
                                value="Yes"
                                checked={formData.companySize.massive === 'Yes'}
                                onChange={handleRadioChange}
                              /> Yes
                            </p>
                            <p>
                              <input
                                type="radio"
                                name="massive"
                                value="No"
                                checked={formData.companySize.massive === 'No'}
                                onChange={handleRadioChange}
                              /> No
                            </p>
                          </div>
                        </div>

                        <button type="button" className="btn btn-primary" onClick={handleButtonClick}>Submit</button>
                      </form>
{successMessage && (
  <div
    style={{
      color: successMessage.includes('⚠️') ? 'red' : 'green',
      marginTop: '10px',
    }}
  >
    {successMessage}
  </div>
)}
                    </div>
    </div>
                  <div className="col-md-3">
                    <div className="card verticle topcompanies p-4">
                      <ProfileComplete/>
                    </div>
                  </div>
                </div>
            </div>
        </section>
    </>
  );
};

export default ProfileForm;
