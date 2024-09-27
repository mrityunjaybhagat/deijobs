import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

const SearchJobs = () => {
  const [jobRole, setJobRole] = useState('');
  const [city, setCity] = useState('');
  const [workMode, setWorkMode] = useState([]);
  const [salaryRange, setSalaryRange] = useState([]);
  const [postedBy, setPostedBy] = useState([]);
  const [companyType, setCompanyType] = useState([]);
  const [freshness, setFreshness] = useState([]);
  const [advanceSearch, setAdvanceSearch] = useState(false);

  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [diCategory, setDiCategory] = useState('');
  const [gender, setGender] = useState('');
  const [experience, setExperience] = useState('');

  useEffect(() => {
    // Fetch work modes
    fetch('https://deijobs.in/deijobs-api/api/work-modes')
      .then(response => response.json())
      .then(data => setWorkMode(data.data))
      .catch(error => console.error('Error fetching work modes:', error));
    // Fetch salary ranges
    fetch('https://deijobs.in/deijobs-api/api/salary-ranges')
      .then(response => response.json())
      .then(data => setSalaryRange(data.data))
      .catch(error => console.error('Error fetching salary ranges:', error));

    // Fetch posted by options
    fetch('https://deijobs.in/deijobs-api/api/posted-by')
      .then(response => response.json())
      .then(data => setPostedBy(data.data))
      .catch(error => console.error('Error fetching posted by options:', error));

    // Fetch company types
    fetch('https://deijobs.in/deijobs-api/api/company-types')
      .then(response => response.json())
      .then(data => setCompanyType(data.data))
      .catch(error => console.error('Error fetching company types:', error));

    // Fetch freshness options
    fetch('https://deijobs.in/deijobs-api/api/freshness')
      .then(response => response.json())
      .then(data => setFreshness(data.data))
      .catch(error => console.error('Error fetching freshness options:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle the form submission and search
    console.log({
      jobRole,
      city,
      workMode,
      salaryRange,
      postedBy,
      companyType,
      freshness,
      fullName,
      dateOfBirth,
      diCategory,
      gender,
      experience
    });
  };

  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });
  const isTabletOrMobile = useMediaQuery({ maxWidth: 767 });

  // Validate the Date of Birth to ensure the user is at least 16 years old
  const validateDateOfBirth = (date) => {
    const today = new Date();
    const birthDate = new Date(date);
    const age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  };

  const isDobValid = validateDateOfBirth(dateOfBirth) >= 16;

  return (
    <section className='seachformSec'>
      <div className="container">
        {isDesktopOrLaptop && (
          <form onSubmit={handleSubmit} className='searchform shadow'>
            <div className='d-flex'>
              <div className='col col-md-6 input-outer'>
                <input 
                  type="text" 
                  value={jobRole} 
                  onChange={(e) => setJobRole(e.target.value)} 
                  className='input_trans' 
                  placeholder='Enter skills / designations / companies'
                />
              </div>
              <div className='col col-md-2 input-outer'>
                <input
                  type="text" 
                  value={city} 
                  onChange={(e) => setCity(e.target.value)} 
                  className='input_trans' 
                  placeholder='Location'
                />
              </div>
              <div className='col col-md-2'>
                <input type="submit" className='btn btn-primary' value='Search' />
              </div>
            </div>
            
            <div className="form-group">
              <label>Full Name*</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="form-control"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label>Date of Birth* (Minimum 16 years)</label>
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="form-control"
                required
              />
              {!isDobValid && (
                <small className="text-danger">You must be at least 16 years old.</small>
              )}
            </div>

            <div className="form-group">
              <label>D&I Category</label>
              <select
                value={diCategory}
                onChange={(e) => setDiCategory(e.target.value)}
                className="form-control"
              >
                <option value="">Select Category</option>
                <option value="General">General</option>
                <option value="SC/ST">SC/ST</option>
                <option value="OBC">OBC</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="form-group">
              <label>Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="form-control"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Experience (in years)</label>
              <input
                type="number"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="form-control"
                placeholder="Enter your experience in years"
                min="0"
              />
            </div>

            <div className='advanced-search-toggle'>
              <button type="button" onClick={() => setAdvanceSearch(!advanceSearch)}>
                {advanceSearch ? 'Hide Advanced Search' : 'Show Advanced Search'}
              </button>
            </div>

            {advanceSearch && (
              <div className='advanced-search-fields'>
                <div className='field'>
                  <label>Work Mode</label>
                  <select className='input_trans'>
                    {workMode.map((mode) => (
                      <option key={mode.id} value={mode.name}>{mode.name}</option>
                    ))}
                  </select>
                </div>
                <div className='field'>
                  <label>Salary Range</label>
                  <select className='input_trans'>
                    {salaryRange.map((range) => (
                      <option key={range.id} value={range.name}>{range.name}</option>
                    ))}
                  </select>
                </div>
                <div className='field'>
                  <label>Posted By</label>
                  <select>
                    {postedBy.map((option) => (
                      <option key={option.id} value={option.name}>{option.name}</option>
                    ))}
                  </select>
                </div>
                <div className='field'>
                  <label>Company Type</label>
                  <select>
                    {companyType.map((type) => (
                      <option key={type.id} value={type.name}>{type.name}</option>
                    ))}
                  </select>
                </div>
                <div className='field'>
                  <label>Freshness</label>
                  <select className='input_trans'>
                    {freshness.map((option) => (
                      <option key={option.id} value={option.name}>{option.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </section>
  );
};

export default SearchJobs;
