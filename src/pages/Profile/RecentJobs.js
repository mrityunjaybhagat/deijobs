import React, { useState, useEffect } from "react";
import { getRecentJobDetails } from "../../services/profileServices"; // Path to appServices.js
import CompanyCard from "../../components/profile/CompanyCard.js";
import ProfileCard from "../../components/profile/ProfileCard";
import FilterForm from "../../components/ui/FilterForm.js";

const RecentJobs = () => {
  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentJobs = async () => {
      const userId = localStorage.getItem("login_token"); 
      const offset = 0;
      const limit = 10;

      try {
        const jobDetails = await getRecentJobDetails(userId,offset, limit);
        setRecentJobs(jobDetails); // Assuming jobDetails is an array of recent jobs
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
    <section className='content'>
            <div className='container'>
            <div className="row">
            <div className="col-md-4">
              <FilterForm/>          
            </div>
            <div className="col-md-7">
            <div className="card">
            <h3 className="card-title">Recent Jobs</h3>
            {recentJobs.length === 0 ? (
        <p>You have no recent jobs.</p>
      ) : (
        <ul>
          {recentJobs.map((job) => (
            <CompanyCard  jobpost={job.job_title} companyName={job.employer_name} companyLogo={job?.employer_logo}/>
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

export default RecentJobs;
