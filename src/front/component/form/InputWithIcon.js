import React from 'react';

const InputWithIcon = ({ icon, type, placeholder, value, onChange }) => {
  return (
    <div style={styles.container}>
      <span style={styles.icon}>{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={styles.input}
      />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '5px 10px',
    width: '100%',
  },
  icon: {
    marginRight: '10px',
    color: '#aaa',
  },
  input: {
    border: 'none',
    outline: 'none',
    width: '100%',
  },
};

export default InputWithIcon;
