import React from 'react';

const MobileNumberInput = ({ value, onChange, placeholder = 'Enter your mobile number', maxLength = 10 }) => {
  // Handle input change to allow only numbers
  const handleChange = (e) => {
    const newValue = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
    onChange(newValue);
  };

  return (
    <input
      type="tel"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      maxLength={maxLength}
      pattern="[0-9]{10}"
      id="mobileNumber"
      className="mobile-number-input form-control"
    />
  );
};

export default MobileNumberInput;
