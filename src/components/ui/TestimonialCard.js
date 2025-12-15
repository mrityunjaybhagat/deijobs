import React from 'react';
import icons from '../../assets/icons';

const TestimonialCard = ({ image, title, created_at, description, preference_category }) => { 
  const imagePath = "https://deijobs.in/uploads/" + image;
  //const imagePath = process.env.REACT_APP_IMAGE_URL + image;
   // Function to limit word count
   const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };
  return (
    <>
      <div className="card testimonial-card">
        <div className="d-flex gap-2">
          <div className="img testi_img">
            <img src={image} alt={title} /> 
          </div>
          <div className="testi_head">
            <p style={{marginBottom:'2px',color:'#111827'}}>{title}</p>
            <p style={{fontSize:'12px',color:'#6B7280'}}>{created_at}</p>
          </div>
        </div>
        <h6 style={{color:'#111827',fontSize:'14px',fontWeight:'400'}}>{title}</h6>
        <p className='testi_desc'>{truncateText(description, 20)}</p>
        <div className="d-flex justify-content-between">
          <p style={{color:'#ea580c'}}>{preference_category}</p>
          <p className='d-flex align-items-center'>
            <img src={icons["share.svg"]} alt="Share icon" />
            Share
          </p>
        </div>
      </div>
    </>
  );
};

export default TestimonialCard;
