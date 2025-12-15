import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, Camera, ClipboardCheckIcon, FileText, NotebookPen, ReceiptText, User } from 'lucide-react';
import IconListItem from './IconListItem';
import useUserData from '../../hooks/useUserData';
import { useLocation, Link } from "react-router-dom";

const ProfileCard = () => {
  const { profileData, isLoading } = useUserData();
  const [uploading, setUploading] = useState(false);
  const [profilePic, setProfilePic] = useState("https://deijobs.in/uploads/profile/user_default.png"); // Top level hook
  const fileInputRef = useRef(null);

  const location = useLocation();
  // Extract user safely
  const user = profileData?.user_data?.[0] || {};

  // Sync profilePic if user changes
  useEffect(() => {
    if (user.candidate_profile_picture) {
      setProfilePic(user.candidate_profile_picture);
    }
  }, [user]);

  // Early return for loading / no data
  if (isLoading) return <p>Loading...</p>;
  if (!profileData || !profileData.user_data?.length) return <p>No user data found.</p>;

  const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setUploading(true);

  const formData = new FormData();
  formData.append('user_id', user.id);
  formData.append('image', file);

  try {
    const response = await fetch('https://deijobs.in/deijobs-api/api/upload-image-jobseeker', {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();

    if (result.code === 200 && result.logo_url) {
      // update profile pic instantly without changing HTML
      setProfilePic(`https://deijobs.in/uploads/profile/${result.logo_url}`);
      alert('Profile picture updated successfully!');
    } else {
      alert(result.message || 'Failed to update profile picture.');
    }
  } catch (error) {
    console.error(error);
    alert('Something went wrong.');
  } finally {
    setUploading(false);
  }
};


  return (
    <div className='card profile_card d-none d-sm-block'>
      <div className="profile_pic" style={{ position:'relative' }}>
        <img src={profilePic} alt="User Profile" />
        <div className='edit_icn' style={{cursor: 'pointer'}} onClick={() => fileInputRef.current.click()}>
{uploading ? (
  <div className="spinner-border spinner-border-sm text-primary" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
) : (
  <Camera />
)}
        </div>
        <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/png, image/jpeg" onChange={handleImageUpload} />
      </div>

      <div className='user_text'>
        <h2>{user.name || "Unknown User"}</h2>
        {profileData.work_experience?.length ? (
          <div>
            {profileData.work_experience.slice(0,1).map((work,index) => (
              <div key={index}>
                <h3 className='jobrole'>{work.role_name || "Not Provided"}</h3>
                <h3 className='companyname'>{work.company_name || "Not Provided"}</h3>
              </div>
            ))}
          </div>
        ) : <p>No work experience available.</p>}
      </div>

      <div className='profile_menu'>



<ul className="list_item">
  <li className={location.pathname === "/jobs" ? "active" : ""}>
    <IconListItem iconCode={<Briefcase />} iconText="Jobs" linkTo="/jobs" />
  </li>
  <li className={location.pathname === "/profile/add" ? "active" : ""}>
    <IconListItem iconCode={<User />} iconText="Profile" linkTo="/profile/add" />
  </li>
  <li className={location.pathname === "/resources" ? "active" : ""}>
    <IconListItem iconCode={<ClipboardCheckIcon />} iconText="Resources" linkTo="/resources" />
  </li>
  <li className={location.pathname === "/profile/blog" ? "active" : ""}>
    <IconListItem iconCode={<NotebookPen />} iconText="Blog" linkTo="/profile/blog" />
  </li>
</ul>

      </div>
    </div>
  );
};

export default ProfileCard;
