import React, { useState, useEffect } from 'react';

const EmailPhoneStatus = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Retrieve the login_token from localStorage
    const loginToken = localStorage.getItem('login_token');

    if (!loginToken) {
      setError(new Error('No login token found'));
      
      setLoading(false);
      return;
    }

    // Fetch data from the API with the login_token in the headers
    fetch('https://deijobs.in/deijobs-api/api/get-email-phone-verified-status', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${loginToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setData(data); // Store the data in state
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        setError(error); // Handle errors
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading message while data is being fetched
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Show error message if something went wrong
  }

  return (
    <div>
      <h3>Verification Status</h3>
      <p><strong>Mobile:</strong> {data.mobile}</p>
      <p><strong>Email:</strong> {data.email}</p>
      <p><strong>Mobile Status:</strong> {data.mobileStatus}</p>
      <p><strong>Email Status:</strong> {data.emailStatus}</p>
    </div>
  );
};

export default EmailPhoneStatus;
