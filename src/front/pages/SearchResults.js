import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const results = location.state?.results || []; // Safely access results passed from the form

  // Log the results to verify data is being received
  useEffect(() => {
    console.log('Received results:', results);
  }, [results]);

  return (
    <section className="search-results-container">
      <div className='container'>
        <h2>Search Results</h2>
        {results.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          <>
            <p>Total Results: {results.length}</p>
            
              {results.map((result, index) => (
                

                <div className="jobcard_outer" key={result.id}>
            <div className="jobcard bg-white text-black p-3 flex flex-col shadow">
                <div className="jobcard_inner">
                    <div className="emp_logo">
                    <img
                        src={result?.employer_logo}
                        className="h-11 w-11 object-contain"
                        alt="Employer Logo"
                    />
                    </div>
                    <div className="job_details">
                        <h4 className="jobTitle text-sm">
                        {result.job_title}
                        </h4>
                        <p className="location text-sm">{result.employement_type || 'Not specified'} • {result.employer_name || 'Not specified'} • {result.city || 'Not specified'}</p>
                        <p className="postedby text-sm">{result.posted_by || 'Not specified'} </p>
                    </div>
                </div>
                <div className="viewjobs text-center p-3">
                    <a href="" className="text-center">View jobs</a>
                    
                </div>
            </div>
            </div>
                 
              ))}
          
          </>
        )}
      </div>
    </section>
  );
};

export default SearchResults;
