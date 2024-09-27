import React from 'react';

const CustomButton = ({ label, onClick, disabled ,classname}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classname}
      style={{
        padding: '10px 20px',
        fontSize: '16px',
        color: disabled ? '#aaa' : '#fff',
        backgroundColor: disabled ? '#ccc' : '#007bff',
        border: 'none',
        borderRadius: '4px',
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      {label}
    </button>
  );
};

export default CustomButton;
