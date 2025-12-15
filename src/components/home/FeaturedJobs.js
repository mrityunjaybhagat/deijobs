import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import JobCard from '../ui/JobCard'
import CompanyCard from '../profile/CompanyCard.js';

const FeaturedJobs = () => {
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

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow:4.5,
    slidesToScroll: 1,
    margin:10,
    arrows:1,
    responsive: [
        {
            breakpoint:767,
            settings: {
            slidesToShow:1,
            slidesToScroll:1,
            initialSlide:0,
            slidesPerRow:4,
            arrows:0,
            }
        },
    ]
  };
  return (
    <>
      {error && <p>{error}</p>}
      {jobs.length === 0 && !error ? (
        <p>Loading...</p>
      ) : (
        <Slider {...settings}>
          {jobs.map((job) => (
            <>
            <div className='p-2'>
            <CompanyCard 
            companyLogo={job?.employer_logo} 
            companyName={job.employer_name} 
            jobpost={job?.job_title} 
            jobsposted={job?.jobs_count} // Pass jobsposted if available
            employementType={job?.employement_type}
            location={job?.city}
            postedBy={job?.posted_by}
            isVerticle={true}
            isJob={true} 
            jobId={job?.id}     
            classname='flex-row'
            />
            </div>
            </>
          ))}
        </Slider>
      )}
      </>
  );
};

export default FeaturedJobs;
