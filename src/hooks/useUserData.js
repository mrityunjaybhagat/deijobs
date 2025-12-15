import { useState, useEffect } from 'react';
import { getUserData } from '../services/profileServices';
// Custom hook for fetching user data
const useUserData = () => {
  const userId = localStorage.getItem('login_token');
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      getUserData(userId)
        .then((response) => {
          if (response.code === 200) {
            setProfileData(response.data);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error loading user data:", error);
          setIsLoading(false);
        });
    }
  }, [userId]);

  return { profileData, isLoading };
};

export default useUserData;
