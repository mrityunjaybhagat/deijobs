import React ,{useState, useEffect} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import TabNav from "../../components/ui/TabNav";
import ProfileCard from '../../components/profile/ProfileCard';
import ProfileComplete from '../../components/ui/CompleteStatus';
import EducationForm from '../../components/profile/Education';
import ProfileFrom from '../../components/profile/ProfileForm';
import useUserData from '../../hooks/useUserData'; 
import ExperienceForm from '../../components/profile/Experience.js';
import CertificationForm from '../../components/profile/CertificationFrom.js';
const ProfileAdd = () => {
  const location = useLocation();
  const userId = localStorage.getItem('login_token');
  const { profileData, isLoading } = useUserData();
  const handleChange = (selectedOptions) => {
    console.log("Selected options:", selectedOptions);
    // Do something with the selected options
  };
  return (
    <>
        <section className='content'>
            <div className='container'>
                <div className='row'>
                  <div className='col-md-3'>
                    <ProfileCard/>
                  </div>
                  <div className='col-md-6'>
                   <TabNav/>
            <div className="card no-border shadow">
              <div className='card-head'>
                Upload Resume
              </div>
                <div className='card-body'>
                    <ProfileFrom/>
                </div>
            </div>

            <div className="card no-border shadow">
              <div className='card-body'>
                {/* <WorkExperience/> */}
                <ExperienceForm/>
              </div>  
            </div>
            <div className="card no-border shadow">
              <div className='card-body'>
                <EducationForm/>
              </div>  
            </div>
            {/* <div className="card no-border shadow">
              <div className='card-body'>
                <CertificationForm/>
              </div>  
            </div> */}

                                    
                  </div>
                  <div className="col-md-3">
              <div className="card verticle topcompanies p-4">
                <ProfileComplete/>                
              </div>
            </div>
                
                </div>
            </div>
        </section>
    </>
  );
};
export default ProfileAdd;



