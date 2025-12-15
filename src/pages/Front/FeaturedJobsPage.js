import React, { useEffect, useState } from 'react';
import CompanyCard from '../../components/profile/CompanyCard.js';
import SectionWrapper from '../../components/home/SectionWrapper';

const FeaturedJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedJobs = async () => {
      try {
        const response = await fetch('https://deijobs.in/deijobs-api/api/featured-job', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            limit: 10,   // Adjust the limit as needed
            offset: 0    // Adjust the offset as needed
          })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log('API Response:', result);

        // Check if the response contains data
        if (result.data && Array.isArray(result.data)) {
          setJobs(result.data);
        } else if (result.featuredJob && Array.isArray(result.featuredJob)) {
          setJobs(result.featuredJob);
        } else {
          throw new Error('Unexpected response structure');
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setError('Failed to load jobs. Please try again later.');
      }
    };

    fetchFeaturedJobs();
  }, []);

  return (
    <>
      <SectionWrapper className="content"
        headclassName='d-flex justify-content-center'
        headerContent={
          <>
          <h2 className="">Featured Jobs</h2>
          </>
        }
    >
      <div className='fjob'>
        {error && <p>{error}</p>}
        {jobs.length === 0 && !error ? (
          <p>Loading...</p>
        ) : (
          jobs.map((job) => (
            <div className='job-card_outer p-1' style={{flex:'25%'}}>
            <CompanyCard 
              companyLogo={job?.employer_logo} 
              companyName={job.employer_name} 
              jobpost={job?.job_title} 
              jobsposted={job?.jobs_count} // Pass jobsposted if available
              employementType={job?.employement_type}
              location={job?.city}
              postedBy={job?.posted_by}
              isJob={true}
              isVerticle={true}  
              jobId={job?.id}  
            />
            </div>          
          ))
        )}
        </div>
    </SectionWrapper>
    </>
  );
};

export default FeaturedJobsPage;
