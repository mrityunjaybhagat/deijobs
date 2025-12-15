import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCompanyJobDetails } from '../../services/profileServices';
import CompanyCard from '../../components/profile/CompanyCard.js';
import FilterForm from '../../components/ui/FilterForm.js';

const CompanyData = () => {
  const { id } = useParams(); 
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const userId = localStorage.getItem('userId'); // Fetch userId from local storage

  const fetchJobs = async () => {
    const offset = 0;
    const limit = 10;
    const employerId = id;

    try {
      const jobsData = await getCompanyJobDetails(userId, offset, limit, employerId);
      console.log("Jobs Data Response: ", jobsData); // Log the full response for debugging
      if (jobsData && jobsData.data) {
        setJobs(jobsData.data);  // Set the job data in state
      } else {
        setError('No jobs found');
      }
    } catch (error) {
      setError('Error fetching company job details');
    } finally {
      setLoading(false);  // Ensure loading stops after the request is done
    }
  };

  useEffect(() => {
    fetchJobs(); // Call the fetchJobs function on component mount
  }, []); // Run only once when the component mounts

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
    <section className='content'>
        <div className='container'>

        
    <div className='row'>
    <div className='col-md-4'>
        <FilterForm/>
    </div>
    <div className='col-md-7'>
      {jobs.map((job) => (
        <div className='p-2 recjob'>
            <CompanyCard  
                linkTo={job.id}
                isJob={true}
                jobpost={job.job_title} 
                companyName={job.employer_name} 
                companyLogo={job?.employer_logo}
                jobsposted={job?.jobsposted || ''} 
            />
          
        </div>
      ))}
      </div>
      </div>
      </div>
      </section>
    </>
  );
};

export default CompanyData;
