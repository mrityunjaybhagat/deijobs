import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const JobSearchForm = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Ensure the correct payload is sent to the API
      const response = await fetch('https://deijobs.in/deijobs-api/api/get-filtered-job-list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobRole: title,
          search_location: location,
          experience: experience,
        }),
      });

      const data = await response.json();
      // Ensure you are navigating and passing the results correctly
      navigate('/search-results', { state: { results: data.data || [] } });
    } catch (error) {
      console.error('Error fetching job results:', error);
    }
  };

  // Media query checks for responsiveness
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });
  const isTabletOrMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <section className='seachformSec'>
      <div className="container">
        {isDesktopOrLaptop && (
          <>
            <form onSubmit={handleSubmit} className='searchform shadow'>
              <div className='d-flex'>
                <div className='col col-md-6 input-outer'>
                  <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    className='input_trans' 
                    placeholder='Enter skills / designations / companies'
                  />
                </div>
                <div className='col col-md-2 input-outer'>
                  <input
                    type="text" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)} 
                    className='input_trans' 
                    placeholder='Location'
                  />
                </div>
                <div className='col col-md-2 input-outer'>
                  <input 
                    type="text" 
                    value={experience} 
                    onChange={(e) => setExperience(e.target.value)} 
                    className='input_trans' 
                    placeholder='Select experience'
                  />
                </div>
                <div className='col col-md-2'>
                  <input type="submit" className='btn btn-primary' value='Search' />
                </div>
              </div>
            </form>
          </>
        )}
        {isTabletOrMobile && (
          <>
            <a href='' className='btn btn-primary w-full mb-4'>Candidate Signup/Login</a>
            <a href='' className='btn btn-primary btn-trans w-full'>Employer Signup/Login</a>
          </>
        )}
      </div>
    </section>
  );
};

export default JobSearchForm;
