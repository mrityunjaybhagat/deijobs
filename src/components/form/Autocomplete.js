import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchData } from '../../services/apiServices'; // Adjust path if needed
import './Autocomplete.css'; // Include your custom CSS here

const Autocomplete = ({ endpoint, onSelect, placeholder = 'Type to search' , icon, isImage = false, classname,value, method = 'GET'}) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allResults, setAllResults] = useState([]);
  const [selected, setSelected] = useState(false);



  useEffect(() => {
  if (value) {
    setInputValue(value);
    setSelected(true); // mark as selected
  }
}, [value]);




  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      // if (inputValue.trim() === '') {
      //   setSuggestions([]);
      //   return;
      // }
const value = typeof inputValue === "string" ? inputValue.trim() : "";
if (value === "") {
  setSuggestions([]);
  return;
}

      const fetchSuggestions = async () => {
        setLoading(true);
        setError(null);

        try {
          const response = await fetchData(endpoint, { query: inputValue });
          if (response && Array.isArray(response.data)) {
            setAllResults(response.data);
            const filteredSuggestions = response.data.filter(item =>
              item.name.toLowerCase().includes(inputValue.toLowerCase())
            ).map(item => ({
              label: item.name,
              value: item.id,
              raw: item
            }));
            setSuggestions(filteredSuggestions);
          } else {
            setError('Error loading data');
          }
        } catch (err) {
          setError('Error loading data');
        } finally {
          setLoading(false);
        }
      };

      fetchSuggestions();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [inputValue, endpoint]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setSelected(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.label); // Set selected suggestion label in the input
    setSuggestions([]); // Clear suggestions after selection
    setSelected(true); // Mark as selected
    onSelect(suggestion); // Call parent onSelect handler
  };

  // Delay clearing suggestions to allow for selection
  const handleBlur = () => {
    setTimeout(() => {
      if (!selected) {
        setSuggestions([]); 
      }
    }, 200); // Slight delay to ensure click event is registered
  };

  return (
    <div className='form-row'>
      <div className="input_outer autocomplete-container">      
          {/* {icon && (
            isImage ? (
              <span className='inputicon'>
                <img src={icon} alt="input icon" style={{ color: '#212529' }} />
              </span>
            ) : (
              <span className='inputicon'>
                  {icon}
              </span>
            )
          )} */}
{icon && (
  <span className="inputicon">
    {icon}
  </span>
)}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="form-control autocomplete-input"
        />
      </div>
      {/* {loading && <p>Loading...</p>} */}
      {error && <p className="error">{error}</p>}
      {suggestions.length > 0 && !selected && (  // Ensure suggestions are only shown if not selected
        <ul className="suggestions-list">
          {suggestions.map(suggestion => (
            <li
              key={suggestion.value}
              onMouseDown={() => handleSuggestionClick(suggestion)} // Use onMouseDown to avoid blur issues
              className="suggestion-item"
            >
              {suggestion.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Autocomplete.propTypes = {
  endpoint: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  icon: PropTypes.node, // Use node to allow both JSX and strings for icons
  isImage: PropTypes.bool,
  classname: PropTypes.string,
};

export default Autocomplete;
