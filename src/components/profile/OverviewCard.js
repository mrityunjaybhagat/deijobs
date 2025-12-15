import React from 'react';
import { useNavigate } from 'react-router-dom';

const OverviewCard = ({ iconSrc, text, count, goTo }) => {
  const navigate = useNavigate();

  const handleNavigation = (url) => {
    window.location.href = url; // Navigate to the specified URL
  };

  return (
    <>
      <div className='overview_card col' onClick={() => handleNavigation(goTo)} style={{cursor:'pointer'}}>
        <div className='card p-2 w-100'>
          <h3 className=''>{count}</h3>
          <div className='d-flex gap-4' style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <p className='last-child'>{text}</p>
            <img src={iconSrc} alt={text} />
          </div>
        </div>
      </div>
    </>
  );
};

export default OverviewCard;
