import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CreatableSelect from "react-select/creatable";

const DynamicCreatableDropdown = ({
  classname,
  endpoint,
  iconSrc = null,
  placeholder = "Select One",
  onSelect
}) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch(endpoint);
        const data = await response.json();

        // Map API data to { value, label } format
        const mappedOptions = (data.data || []).map((item) => ({
          value: item.name,
          label: item.name
        }));

        setOptions(mappedOptions);
        setLoading(false);
      } catch (err) {
        setError("Error loading data");
        setLoading(false);
      }
    };

    fetchOptions();
  }, [endpoint]);

  const handleChange = (selected) => {
    setSelectedValue(selected);
    if (onSelect) {
      onSelect(selected ? selected.value : null);
    }
  };

  const handleCreate = (inputValue) => {
    const newOption = { value: inputValue, label: inputValue };
    setOptions((prev) => [...prev, newOption]);
    setSelectedValue(newOption);
    if (onSelect) {
      onSelect(inputValue);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="form-group d-flex gap-2 py-2" style={{ width: "100%" }}>
      {iconSrc && <img src={iconSrc} alt="icon" />}
      <CreatableSelect
        className={classname}
        isClearable
        options={options}
        value={selectedValue}
        onChange={handleChange}
        onCreateOption={handleCreate}
        placeholder={placeholder}
      />
    </div>
  );
};

DynamicCreatableDropdown.propTypes = {
  endpoint: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onSelect: PropTypes.func
};

DynamicCreatableDropdown.defaultProps = {
  placeholder: "Please select an option",
  onSelect: () => {}
};

export default DynamicCreatableDropdown;
