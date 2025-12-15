import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const DynamicDropdown = ({ classname, endpoint, iconSrc = null, placeholder = 'Select One', onSelect }) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        setOptions(data.data || []); // Adjust this to your API response structure
        setLoading(false);
      } catch (error) {
        setError();
        setLoading(false);
      }
    };
    fetchOptions();
  }, [endpoint]);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedValue(selectedValue);
    onSelect(selectedValue); // Pass the selected value to the parent component
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="form-group d-flex gap-2 py-2">
	  {iconSrc && <img src={iconSrc} alt="icon"/>}
      <select className={`form-control ${classname || ''}`} value={selectedValue} onChange={handleChange}>
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {error ? (
          <option value="" disabled>
            Error loading data
          </option>
        ) : (
          options.map((option) => (
            <option key={option.id} value={option.name}>
              {option.name}
            </option>
          ))
        )}
      </select>
      
    </div>
  );
};

DynamicDropdown.propTypes = {
  endpoint: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

DynamicDropdown.defaultProps = {
  placeholder: 'Please select an option',
};

export default DynamicDropdown;
