import React, { useState, useEffect } from "react";
import { getUserAppliedJobDetails } from "../../services/profileServices"; // Path to appServices.js
import CompanyCard from "../../components/profile/CompanyCard.js";
import FilterForm from "../../components/ui/FilterForm.js";

const JobApplied = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      const userId = localStorage.getItem("login_token"); 
      const offset = 0;
      const limit = 10;
      try {
        const jobDetails = await getUserAppliedJobDetails(userId,offset, limit);
        setAppliedJobs(jobDetails); // Assuming jobDetails is an array of saved jobs
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  if (loading) {
    return <p>Loading saved jobs...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
    <section className='content'>
            <div className='container'>
            <div className="row">
            <div className="col-md-4">
              <FilterForm/>          
            </div>
            <div className="col-md-7">
            <div className="card">
            <h3 className="card-title">Jobs Applied</h3>
            {appliedJobs.length === 0 ? (
        <p>You have no saved jobs.</p>
      ) : (
        <ul>
          {appliedJobs.map((job) => (
            <CompanyCard 
            linkTo={job.id} 
            isJob={true}
            jobpost={job.job_title} companyName={job.employer_name} companyLogo={job?.employer_logo}/>
          ))}
        </ul>
      )}
      </div>
            </div>
            </div>
        </div>
        </section>
    </>
  );
};

export default JobApplied;
