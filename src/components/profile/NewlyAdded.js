import React, { useState, useEffect } from 'react';
import { getRecentJobDetails } from '../../services/profileServices';
import JobCard from './JobCard.js';
import CompanyCard from './CompanyCard.js';

const NewlyAdded = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchRecentJobs = async () => {
        const userId = localStorage.getItem("login_token"); 
        const offset = 0;
        const limit = 10;
  
        try {
          const jobDetails = await getRecentJobDetails(userId,offset, limit);
          setJobs(jobDetails); // Assuming jobDetails is an array of recent jobs
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };
  
      fetchRecentJobs();
    }, []);
  
    if (loading) {
      return <p>Loading recent jobs...</p>;
    }
  
    if (error) {
      return <p>Error: {error}</p>;
    }
    return (
    <>
      {jobs.map((job) => (
        // <JobCard 
        //   isJob={true}
        //   linkTo={job.id} 
        //   jobpost={job.job_title} 
        //   companyName={job.employer_name} 
        //   companyLogo={job?.employer_logo}
        //   jobsposted={job?.jobsposted || ''} 
        // />
        <CompanyCard 
          key={job.id}
          linkTo={job.id}
          isJob={true}
          jobpost={job.job_title} 
          companyName={job.employer_name} 
          companyLogo={job?.employer_logo} 
          jobsposted={job?.jobsposted || ''} 
          />
      ))}
    </>
  );
};

export default NewlyAdded;
