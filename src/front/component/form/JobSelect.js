import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const JobRoleSelect = ({ onChange }) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch job roles from the API
    fetch('https://deijobs.in/deijobs-api/api/job-roles')
      .then((response) => response.json())
      .then((data) => {
        // Transform the data to match the format react-select expects
        const formattedOptions = data.data.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        setOptions(formattedOptions);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching job roles:', error);
        setLoading(false);
      });
  }, []);

  return (
    <Select
      isLoading={loading}
      options={options}
      onChange={onChange}
      placeholder="Select a job role"
    />
  );
};

export default JobRoleSelect;
