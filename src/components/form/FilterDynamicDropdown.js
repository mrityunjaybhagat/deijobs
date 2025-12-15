import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchData } from '../../services/apiServices';

const DynamicDropdown = ({ name, endpoint, placeholder, onSelect, labelKey = 'label', valueKey = 'value' }) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const res = await fetchData(endpoint, { method: 'GET' });
        // Assuming res.data is the array
        const items = res.data?.map(item => {
  // Try to detect company list automatically
  if (item.company_name && item.employer_id) {
    return {
      label: `${item.company_name} (${item.jobs_count || 0} jobs)`,
      value: item.employer_id
    };
  }

  // Generic fallback for other endpoints
  return {
    label: item[labelKey] || item.name || item.title || JSON.stringify(item),
    value: item[valueKey] || item.id
  };
}) || [];

        setOptions(items);
      } catch (err) {
        console.error(`Error fetching ${name} options:`, err);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };

    loadOptions();
  }, [endpoint, labelKey, valueKey, name]);

  return (
    <select className="form-control" onChange={(e) => onSelect(e.target.value)}>
      <option value="">{loading ? 'Loading...' : placeholder}</option>
      {options.length > 0 ? (
        options.map((opt, i) => (
          <option key={i} value={opt.value}>
            {opt.label}
          </option>
        ))
      ) : (
        !loading && <option disabled>No options available</option>
      )}
    </select>
  );
};

export default DynamicDropdown;
