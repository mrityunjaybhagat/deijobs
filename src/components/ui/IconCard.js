import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const IconCard = ({ iconSrc,text,goTo}) => {
  const navigate = useNavigate();
  const handleNavigation = (url) => {
    window.location.href = url; // Navigate to the specified URL
  };
  return (
    <>
        <div className='col'>
            <div className='card no-border' style={{
            boxShadow:'0px 4px 16px 0px #0000001A',
            padding:'20px',
            height:'120px',
            width:'120px',
            textAlign:'center',
            cursor:'pointer',
            }} onClick={() => handleNavigation(goTo)}>
            <img src={iconSrc} style={{width:'60%',margin:'0 auto'}}/>
            <p>{text}</p>
            </div>
        </div>
    </>
  );
};

export default IconCard;
