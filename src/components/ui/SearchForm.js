import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactGoogleAutocomplete, { usePlacesWidget } from "react-google-autocomplete";
import icons from '../../assets/icons/';
import DynamicDropdown from '../form/DynamicDropdown';
import Autocomplete from '../form/Autocomplete';
import { Search } from "lucide-react";


const JobSearchForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');

  const { ref } = usePlacesWidget({
    apiKey: 'AIzaSyBo6F5VIs1WvisRrmlwOUXq1T_IEITYTkw',
    onPlaceSelected: (place) => console.log(place)
  });

  const handleSelect = (suggestion) => {
    setTitle(suggestion.value); // Set the title when a suggestion is selected
    console.log('Selected suggestion:', suggestion);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://deijobs.in/deijobs-api/api/get-filtered-job-list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobRole: title,
          search_location: location,
          experience: experience,
        }),
      });

      const data = await response.json();
      navigate('/search-results', { state: { results: data.data || [] } });
    } catch (error) {
      console.error('Error fetching job results:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='searchform shadow'>
      <div className='d-flex align-items-center'>
        <div className='col col-md-6 input-outer'>
          <Autocomplete
            icon={<img src={icons["search.svg"]} alt="Search Icon" />}
            className='no-border'
            endpoint='get-skill-list'
            onSelect={handleSelect}
            placeholder="Search by Title, skill or category"
          />
        </div>
        <div className='col col-md-2 input-outer'>
          <DynamicDropdown
            classname='no-border'
            endpoint="https://deijobs.in/deijobs-api/api/experience-range"
            placeholder="Select Experience"
            onSelect={(selected) => setExperience(selected)}
          />
        </div>
        <div className='col col-md-2 input-outer'>
          <input
            type="text" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
            className='form-control input_trans' 
            placeholder='Location'
            ref={ref}
          />
        </div>
        <div className='col col-md-2'>
          <input type="submit" className='btn btn-primary' value='Search' />
        </div>
      </div>
    </form>
  );
};

export default JobSearchForm;
