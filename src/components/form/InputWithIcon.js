import React from 'react';

const InputWithIcon = ({ classname, children, icon, isImage = false }) => {
  return (
    <div className='form-row'>
       <div className={`input_outer ${classname || ''}`}>
        <span className='inputicon'>
          {isImage ? (
            <img src={icon} alt="input icon" style={{ color: '#212529'}} />
          ) : (
            icon // Render the icon component directly
          )}
        </span>
        {children} {/* Render the input or any other child component */}
      </div>
    </div>
  );
};

export default InputWithIcon;
