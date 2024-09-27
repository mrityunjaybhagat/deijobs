import React from 'react';
import { useNavigate } from 'react-router-dom';

const CardWithIcon = ({ startIcon, text, imageSrc, endIcon, to }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    }
  };

  return (
    <div style={styles.card} onClick={handleClick} className="sidebarcard" >
      {imageSrc ? (
        <img src={imageSrc} className="card-icon" />
      ) : (
        <div style={styles.icon}>{startIcon}</div>
      )}
      <div style={styles.text}>{text}</div>
      {endIcon && <div style={styles.endIcon}>{endIcon}</div>}
    </div>
  );
};

const styles = {
  card: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '8px',
    padding:'1.5rem 1.25rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    boxShadow:'0 .5rem 1rem rgba(0,0,0,.15) !important',
    fontWeight:'300!important',
  },
  icon: {
    marginRight: '10px',
    fontSize: '20px',
    color: '#111827',
  },
  text: {
    flex: 1,
    fontSize: '15px',
    color: '#111827',
  },
  endIcon: {
    fontSize: '10px',
    color: '#4338ca',
  },
};

export default CardWithIcon;
