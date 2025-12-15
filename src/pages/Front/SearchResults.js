import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SectionWrapper from '../../components/home/SectionWrapper';
import CompanyCard from '../../components/profile/CompanyCard.js';

const SearchResults = () => {
  const location = useLocation();
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [resultsPerPage] = useState(25); // Number of results per page
  const results = location.state?.results || []; // Safely access results passed from the form

  // Calculate total pages
  const totalResults = results.length;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  // Get the results for the current page
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);

  // Log the results to verify data is being received
  useEffect(() => {
    console.log('Received results:', results);
  }, [results]);

  // Handle page changes
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <>
      <SectionWrapper
        className="content"
        headclassName="d-flex justify-content-center"
        headerContent={
          <>
            <h2 className="">Search results</h2>
            <p>Total Results: {totalResults}</p> {/* Display the total number of results */}
          </>
        }
      >
        <div className="fjob">
          {error && <p>{error}</p>}
          {currentResults.length === 0 ? (
            <p>No jobs found.</p>
          ) : (
            <>
              {currentResults.map((job, index) => (
                <div key={index} className="job-card_outer p-1">
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
                    linkTo={job?.id}
                  />
                </div>
              ))}
            </>
          )}

          {/* Pagination Controls */}
          <div className="pagination-controls my-3">
            <button 
              onClick={handlePreviousPage} 
              disabled={currentPage === 1}
              className='btn btn-sm btn-primary mr-3'
            >
              Previous
            </button>
            <span> Page {currentPage} of {totalPages} </span>
            <button 
              onClick={handleNextPage} 
              disabled={currentPage === totalPages}
              className='btn btn-sm btn-primary'
            >
              Next
            </button>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
};

export default SearchResults;
