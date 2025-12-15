import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ProfileCard from '../../components/profile/ProfileCard';
import ProfileComplete from '../../components/ui/CompleteStatus';
import TabNav from '../../components/ui/TabNav';
import useUserData from '../../hooks/useUserData';
import { Download, Upload } from "lucide-react";

const ProfileOverview = () => {
  const [uploading, setUploading] = useState(false);
  const location = useLocation();
  const { profileData, isLoading } = useUserData();
  const fileInputRef = useRef(null);

  if (isLoading) return <div>Loading...</div>;

  const user = profileData?.user_data?.[0] || {};

  // Handle Upload CV Click
  const handleClick = (e) => {
    e.preventDefault();
    if (fileInputRef.current) fileInputRef.current.click();
  };

  // Handle Resume Upload
 const handleFileChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  setUploading(true);

  const allowed = ['pdf', 'doc', 'docx'];
  const ext = file.name.split('.').pop().toLowerCase();

  if (!allowed.includes(ext)) {
    alert('Only PDF, DOC, or DOCX files are allowed!');
    return;
  }

  const user = profileData?.user_data?.[0] || JSON.parse(localStorage.getItem('user')) || {};

  if (!user?.id) {
    alert('User not found. Please log in again.');
    return;
  }

  const formData = new FormData();
  formData.append('user_id', user.id);
  formData.append('resume', file);

  try {
    const response = await fetch('https://deijobs.in/deijobs-api/api/update-resume', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    setUploading(false);
    alert(result.message || 'Resume uploaded successfully!');
  } catch (err) {
    console.error(err);
    setUploading(false);
    alert('Upload failed. Please try again.');
  }
};

  return (
    <section className='content'>
      <div className='container'>
        <div className='row'>
          {/* Left Column */}
          <div className='col-md-3'>
            <ProfileCard />
          </div>

          {/* Center Column */}
          <div className='col-md-6'>
            <TabNav />

            <div className="card no-border shadow">
              <div className='card-head_ py-2_'>
                {/* Upload / Download CV */}
                {user.resume && user.resume.trim().toLowerCase() !== "null" && user.resume.trim() !== "" ? (
                  <a
                    href={user.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="d-flex items-center gap-2 px-3 py-2 bg-blue-500 rounded hover:bg-blue-600"
                    style={{ color: "#fff", justifyContent: "space-between" }}
                  >
                    Download CV <Download className="w-5 h-5" />
                  </a>
                ) : (
                  <>
                    <a
                      href="#"
                      onClick={handleClick}
                      className="d-flex items-center gap-2 px-3 py-2 bg-gray-300 rounded hover:bg-gray-400"
                      style={{ color: "#00559F", justifyContent: "space-between" }}
                    >
                      Upload CV 
                      {uploading ? (
  <div className="spinner-border spinner-border-sm text-primary" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
) : (
  <Upload className="w-5 h-5" />
)}
                    </a>

                    {/* Hidden file input */}
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept=".pdf,.doc,.docx"
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                    />
                  </>
                )}
              </div>

              {/* User Overview */}
              <div className="card-body profile_overview" style={{ background: '#F3F4F6' }}>
                {user ? (
                  <>
                    {/* <h5>{user.id || 'N/A'}</h5> */}
                    <div className='d-flex'>
                      <div className='profile_pic'>
                        <img
                          src={user.candidate_profile_picture || "https://deijobs.in/uploads/profile/user_default.png"}
                          alt="User Profile"
                        />
                      </div>
                      <div className='px-2'>
                        <h5 style={{ color: "#333" }}>{user.name || 'N/A'}</h5>
                        <h5>{user.experience || ''} Years of exp, {user.location || ''}</h5>
                        <h5>{user.preferred_job_type || ''}</h5>
                      </div>
                    </div>

                    <h5 style={{ color: "#333" }}>Bio</h5>
                    <h5>{user.bio || 'N/A'}</h5>
                  </>
                ) : (
                  <p>No user data available.</p>
                )}

                <hr />
                {/* Work Experience */}
                <h5 style={{ color: "#333", textTransform: "capitalize" }}>Work Experience</h5>
                {profileData?.work_experience?.length > 0 ? (
                  profileData.work_experience.map((work, index) => (
                    <div key={index} className="mb-3">
                      <h6 style={{ color: "#333", textTransform: "capitalize" }}>{work.company_name || 'N/A'}</h6>
                      <h6>{work.role_name || 'N/A'}</h6>
                      <h6>{work.start_date || 'N/A'} - {work.end_date || 'N/A'}</h6>
                      <h6>Description: {work.description || 'N/A'}</h6>
                      <h6>Current Job: {work.is_current_company ? 'Yes' : 'No'}</h6>
                    </div>
                  ))
                ) : (
                  <p>No work experience found.</p>
                )}

                <hr />
                {/* Education */}
                <h5>Education</h5>
                {profileData?.education_data?.length > 0 ? (
                  profileData.education_data.map((edu, index) => (
                    <div key={index} className="mb-3">
                      <h6>{edu.degree || 'N/A'}</h6>
                      <h6>{edu.university || 'N/A'}</h6>
                      <h6>Passing Year: {edu.passing_year || 'N/A'}</h6>
                      <h6>Percentage: {edu.percentage || 'N/A'}</h6>
                      <h6>Description: {edu.description || 'N/A'}</h6>
                    </div>
                  ))
                ) : (
                  <p>No education data found.</p>
                )}

                 {/* Skills */}
                <h5>Skills</h5>
                    <div className="flex flex-wrap gap-2">
                      {profileData?.user_data?.[0]?.skill_names?.length > 0 ? (
                        profileData.user_data[0].skill_names.map((skill, index) => (
                          // <badge 
                          //   key={index}
                          //   className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
                          // >
                          //   {skill}
                          // </badge>
          <span key={index} style={{ display:'inline-block',background:'#fff',marginRight: '8px',marginBottom: '8px',borderRadius:'15px',color:'#474D6A', padding:'5px 10px',border:'1px solid #E7E7F1',}}>
            {skill.trim()}
          </span>
                        ))
                      ) : (
                        <span className="text-gray-500">N/A</span>
                      )}
                    </div>

<h5>Ideal next opportunity</h5>
  <h6>Desired Salary</h6>
{profileData?.user_data[0]?.desired_salary}
<h6>Work Prefrance</h6>
{profileData?.user_data[0]?.preferred_job_type}
<h5>Preferred Locations</h5>
<div className="flex flex-wrap gap-2">
  {profileData?.user_data?.[0]?.city_names?.length > 0 ? (
    profileData.user_data[0].city_names.map((city, index) => (
      // <span
      //   key={index}
      //   className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full"
      // >
      //   {city}
      // </span>
      <span key={index} style={{ display:'inline-block',background:'#fff',marginRight: '8px',marginBottom: '8px',borderRadius:'15px',color:'#474D6A', padding:'5px 10px',border:'1px solid #E7E7F1',}}>
            {city.trim()}
      </span>
    ))
  ) : (
    <span className="text-gray-500">N/A</span>
  )}
</div>


                 {/* <h5>Ideal next opportunity</h5> */}
                 {/* <h6>Desired Salary</h6>

                 <h6>Desired Role</h6>
                 
                 
                 <h6>Desired Location</h6>
                 <div className="flex flex-wrap gap-2">
                  {profileData?.user_data?.city_names?.length > 0 ? (
                    profileData.user_data.city_names.map((city, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
                      >
                        {city}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">N/A</span>
                  )}
                </div> */}
                 
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-md-3">
            <div className="card verticle topcompanies p-4">
              <ProfileComplete />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileOverview;
