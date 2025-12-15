import React, { useState } from 'react';

const ToggleComponent = ({ title, icon, children }) => {
  const [isVisible, setIsVisible] = useState(false); // Toggle visibility state

  const handleToggle = () => {
    setIsVisible(!isVisible); // Toggle the content visibility
  };

  return (
    <div className="no-border">
      <div className="card-head toggle-head d-flex mb-2 justify-content-between align-items-center">
        <h3 className="card-title">
          {icon && <img src={icon} alt="Icon" className="me-2" />} {/* Dynamically render icon */}
          {title} {/* Dynamic title */}
        </h3>
        <button className="btn" onClick={handleToggle} style={{background:'#e5e7eb',width:'30px',height:'30px',borderRadius:'50%',textAlign:'center',padding:'0px',lineHeight:'1.4',fontWeight:'bold'}}>
          {isVisible ? '-' : '+'} {/* Toggle button showing + or - */}
        </button>
      </div>

      {isVisible && (
        <div className="toggle-content p-3_">
          {children} {/* Render passed children as form content */}
        </div>
      )}
    </div>
  );
};

export default ToggleComponent;
