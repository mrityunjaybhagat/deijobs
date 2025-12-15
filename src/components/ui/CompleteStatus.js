import React, { useEffect, useState } from 'react';
import { useResponsive } from '../../config/responsive';
import { fetchData } from '../../services/apiServices';
import profile_prog from '../../assets/images/profile_prog.png'; // Assuming this is your fetch helper


const ProfileComplete = () => {
  const userId = localStorage.getItem('login_token'); // Retrieve userId from localStorage
  const [profileData, setProfileData] = useState(null); // Store the profile completion data
  const [loading, setLoading] = useState(true); // Loading state
  const { isDesktopOrLaptop, isTabletOrMobile } = useResponsive();
  useEffect(() => {
    const fetchProfileCompletionData = async () => {
      const url = 'profile-complete-percentage'; // API endpoint
      try {
        const response = await fetchData(url, {
          method: 'POST', // Set to POST
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }), // Send userId in the request body
        });

        if (response.code === 200) {
          // Assuming the API response contains the data in response.data
          setProfileData(response.data);
        } else {
          console.error('Failed to fetch profile completion data:', response);
        }
      } catch (error) {
        console.error('Error fetching profile completion data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileCompletionData();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profileData) {
    return <div>No profile data available.</div>;
  }

  const completionPercentage = profileData.total_percentage || 0;
  // Display the profile completion data
  return (
    <>
    <div className='card'>
    {isDesktopOrLaptop && (
        <p style={{color:'#121224'}}>Profile Score</p>
    )}  
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${completionPercentage}%` }}
        ></div>
      </div>
      <p className=''>{profileData.total_percentage}%</p>
    </div>
    {isDesktopOrLaptop && (
        <>
        <img src={profile_prog} alt=""/>
        </>
    )}    
    </>
  );
};

export default ProfileComplete;
