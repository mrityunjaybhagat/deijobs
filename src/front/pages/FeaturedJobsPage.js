import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

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

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4.5,
    slidesToScroll: 1,
    margin: 10,
    arrows: 1,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          slidesPerRow: 4,
          arrows: 0,
        }
      },
    ]
  };

  return (
    <section className=''>
      <div className='container'>
        <div className='section_heading'>
          <h2 className='text-center'>Featured companies actively hiring</h2>
        </div>
        {error && <p>{error}</p>}
        {jobs.length === 0 && !error ? (
          <p>Loading...</p>
        ) : (
          jobs.map((job) => (
            <div className="jobcard_outer" key={job.id}>
              <div className="jobcard bg-white text-black p-3 flex flex-col shadow">
                <div className="jobcard_inner">
                  <div className="emp_logo">
                    <img
                      src={job?.employer_logo}
                      className="h-11 w-11 object-contain"
                      alt="Employer Logo"
                    />
                  </div>
                  <div className="job_details">
                    <h4 className="jobTitle text-sm">
                      {job.job_title}
                    </h4>
                    <p className="location text-sm">
                      {job.employement_type || 'Not specified'} • {job.employer_name || 'Not specified'} • {job.city || 'Not specified'}
                    </p>
                    <p className="postedby text-sm">{job.posted_by || 'Not specified'} </p>
                  </div>
                </div>
                <div className="viewjobs text-center p-3">
                  <a href="" className="text-center">View jobs</a>
                </div>
              </div>
            </div>
          ))
        )}
        {/* <div className='text-center'>
          <a href='/showAll/featured-jobs' className='btn btn-trans seeall'>View all</a>
        </div> */}
      </div>
    </section>
  );
};

export default FeaturedJobsPage;
