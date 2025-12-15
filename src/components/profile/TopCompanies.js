import React, { useState, useEffect } from 'react';
import { getTopCompanies } from '../../services/profileServices';
import CompanyCard from './CompanyCard.js';

const TopCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getTopCompanies();
        setCompanies(data.data); // Assuming the response structure has `data` key
      } catch (error) {
        setError("Failed to fetch top companies");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
        {companies.map((company, index) => (
            <CompanyCard 
            linkTo={company?.employer_id}
            companyLogo={company?.company_logo} 
            companyName={company.company_name} 
            //jobpost={company?.jobpost} 
            //jobsposted={company?.jobs_count} // Pass jobsposted if available
            />

        ))}
    </>
  );
};
export default TopCompanies;
