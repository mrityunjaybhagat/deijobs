import React from 'react';
import PropTypes from 'prop-types';
//import './PrimaryButton.css'; // Optional: Import CSS for styling

const PrimaryButton = ({ onClick, disabled = false, text , }) => {
  return (
    <button 
      className={`btn btn-primary primary-button ${disabled ? 'disabled' : ''}`} 
      style={{
        width:'100%',
        color: disabled ? '#000000!important' : '#fff',
        backgroundColor: disabled ? '#D0D5DB' : '#2b589f',
        border: 'none',
        borderRadius: '4px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        padding:'12px 16px 12px 16px',
        gap: '10px',
        opacity:'1',
      }}
      onClick={onClick} 
      disabled={disabled}
    >
      {text}
    </button>
  );
};

PrimaryButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  text: PropTypes.node.isRequired
};

// PrimaryButton.defaultProps = {
//   disabled: false
// };

export default PrimaryButton;
