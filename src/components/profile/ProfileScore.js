import React, { useState, useEffect } from 'react';
import images from '../../assets/images';
import { Briefcase ,User} from 'lucide-react';
import IconListItem from './IconListItem';
import { getUserData } from "../../services/profileServices";
const ProfileScore = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("login_token"); // Retrieve userId from localStorage
      try {
        const response = await getUserData(userId);

        // Even if userExists is false, we check if user_data array has data
        if (response.code === 200 && response.data.user_data.length > 0) {
          setUserData(response.data);
        } else {
          setError("No user data found.");
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Display a loading message while fetching data
  if (loading) {
    return <p>Loading...</p>;
  }

  // Display an error message if an error occurred
  if (error) {
    return <p>Error: {error}</p>;
  }
  const user = userData.user_data[0];
  return (
    <>
          <div className='card profile_card'>
            <div className='profile_pic'>
            <img
              src={user.candidate_profile_picture || "https://deijobs.in/uploads/profile/user_default.png"}
              alt="User Profile"
            />
            </div>
            <div className='user_text'>
                <h2>Lorem Ipsum dolor sit </h2>
                  {userData.work_experience && userData.work_experience.length > 0 && (
                    <div>
                      {userData.work_experience.map((work, index) => (
                        <div key={index}>
                        <h3 className='jobrole'>{work.role_name || "Not Provided"}</h3>
                        <h3 className='companyname'>{work.company_name || "Not Provided"}</h3>  
                        </div>
                      ))}
                    </div>
                  )}
            </div>
            <div className='profile_menu'>
               <ul className='list_item'>
                  <li>
                    <IconListItem iconCode={<Briefcase/>} iconText='Jobs' linkTo='/jobs'/>  
                  </li>
                  <li>
                    <IconListItem iconCode={<User/>} iconText='Profile'  linkTo='/profile/add'/>   
                  </li>
               </ul>
            </div>
          </div>
    </>
  );
};

export default ProfileScore;
