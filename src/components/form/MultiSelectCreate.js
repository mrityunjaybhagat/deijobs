import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import CreatableSelect from "react-select/creatable";
import { fetchData } from '../../services/apiServices';

const MultiSelectCreate = ({ endpoint, onChange, isMulti = false, tableName ,value }) => {
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        // Create a request body object, only include tableName if it's required
        const requestBody = {
          query: selectedOptions,
        };

        // Conditionally include tableName if endpoint is 'get-masters-details'
        if (endpoint === 'get-masters-details' && tableName) {
          requestBody.tableName = tableName;
        }

        // Make the API call
        const response = await fetchData(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

// let response;
// if (endpoint === 'get-masters-details') {
//   response = await fetchData(endpoint, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(requestBody),
//   });
// } else {
//   response = await fetchData(endpoint); // Simple GET
// }

        // Handle the response and format options for Select component
        const formattedOptions = response?.data?.map((item) => ({
          value: item.id,
          label: item.name,
        })) || [];

        setOptions(formattedOptions);
         // ✅ Initialize selected values from parent value prop
        // Initialize selected values only ONCE
if (!initialized && value && value.length) {
  const matched = formattedOptions.filter(opt =>
    value.includes(opt.value)
  );
  setSelectedOptions(isMulti ? matched : matched[0] || null);
  setInitialized(true);
}

        //
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchOptions();
  }, [endpoint, tableName,value]);

  const handleChange = (selected) => {
    setSelectedOptions(selected || []); // Set the selected options or an empty array if no option is selected
    onChange(selected); // Pass the selected options to the parent component
  };

  return (
     <CreatableSelect
    id="select-input"
    isMulti={isMulti}
    options={options}
    value={selectedOptions}
    onChange={handleChange}
    onCreateOption={(inputValue) => {
      const newOption = {
        value: inputValue, // temporary ID
        label: inputValue,
      };

      const updated = isMulti
        ? [...(selectedOptions || []), newOption]
        : newOption;

      setSelectedOptions(updated);
      onChange(updated);
    }}
    className="basic-multi-select"
    classNamePrefix="select"
  />
  );
};

MultiSelectCreate.propTypes = {
  endpoint: PropTypes.string.isRequired, // API endpoint is required
  onChange: PropTypes.func.isRequired, // Function to handle selected options
  isMulti: PropTypes.bool, // Optional prop for multi-select (default is false)
  tableName: PropTypes.string, // Optional tableName for some endpoints
};

export default MultiSelectCreate;
