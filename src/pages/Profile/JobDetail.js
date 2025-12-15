import React, { useState, useEffect } from 'react';
import briefcaseIcon from '../../assets/icons/briefcase_job.svg';
import groupIcon from '../../assets/icons/group_job.svg';
import locationIcon from '../../assets/icons/location_job.svg';
import shareIcon from '../../assets/icons/share.svg';
import { useParams } from 'react-router-dom';
import { fetchData } from '../../services/apiServices'; 
import BackButton from '../../components/ui/BackButton';
import { Share2 } from 'lucide-react';
import ShareMenu from '../../components/ui/ShareMenu';

const JobDetailPage = () => {
  const { jobId } = useParams();  // Get the jobId from the URL
  const isLoggedIn = localStorage.getItem('login_token');
  const [jobDetail, setJobDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  // Function to handle button click and open the modal
  const handleApplyClick = () => {
    setIsModalVisible(true);
  };

  // Function to handle modal close
  const closeModal = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    const fetchJobDetail = async () => {
      setLoading(true);
      setError(null);  // Reset any previous errors
      try {
        // API endpoint for getting job details
        //const url = `get-candidate-job-details?jobId=${jobId}&login_token=${localStorage.getItem('login_token')}&userId=${localStorage.getItem('login_token')}`;
        const loginToken = localStorage.getItem('login_token');
let url;

if (!loginToken) {
  // fallback if not logged in
  url = `get-job-details?jobId=${jobId}`;
} else {
  url = `get-candidate-job-details?jobId=${jobId}&login_token=${loginToken}&userId=${loginToken}`;
}

        const response = await fetchData(url, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
        });

        // Check if the response code is 200 and data is available
        if (response.code === 200 && response.jobDetails) {
          //setJobDetail(response.jobDetails);  // Set the job details
          setJobDetail({
            ...response.jobDetails,
            userJobDetails: response.userJobDetails
          });
        } else {
          setError("Job not found");
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
        setError("Something went wrong while fetching job details.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetail();
  }, [jobId]);  // Fetch job details whenever the jobId changes


const applyForJob = async (jobId, appliedFlag) => {
  const url = 'save-apply-action'; // Your API endpoint

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      appliedFlag,
      jobId,
      login_token: localStorage.getItem('login_token'), // Retrieve login_token from localStorage
      userId: localStorage.getItem('login_token') // Assuming userId is the same as login_token
    }),
  };

  try {
    //const response = await fetchData(url, options);
    //const data = await response.json();
    const data = await fetchData(url, options);
    if (data.code === 200) {
      console.log('Job action successful:', data);
      // Handle success (e.g., show a success message, update state)
    } else {
      console.error('Job action failed:', data);
      // Handle error (e.g., show an error message)
    }
  } catch (error) {
    console.error('Error applying for job:', error);
    // Handle network or other errors
  }
};
//applyForJob('2483', 'Saved');

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return jobDetail ? (
    <>
    <section className="main_container jobpage main_container_new">
		    <div className="container">
			    <BackButton/>
				<div className="card big_card">
          <div className='job_top card-head_'>
             <h2>{jobDetail.job_title}</h2>
             <div className='d-flex justify-content-between'>
             <ul className='job_top_txt'>
              <li>
                  <img src={briefcaseIcon} alt="Job Icon" />
                  <span>{jobDetail.minimum_exp} - {jobDetail.maximum_exp} Years</span>
              </li>
              <li>
                  <img src={groupIcon} alt="Breafcase Icon" />
                  <span>{jobDetail.dni_category}</span>
              </li>
              <li>
                  <img src={locationIcon} alt="Location Icon" />
                  <span>{jobDetail.city_name}</span>
              </li>
             </ul>
            <ShareMenu title={`🚀 ${jobDetail.job_title}\n${jobDetail.city_name}\nApply here:`} />
             </div>
             <div className='d-flex w-100'>
             <p>Posted on {jobDetail.posted}  
              {jobDetail.totalApplicants ? (
                <strong>• {jobDetail.totalApplicants} Applicants</strong>
              ) : null}</p>
             </div>
             <div className='d-flex justify-content-end align-items-center mb-4'>
             

             {isLoggedIn ? (
               <>

<span
  className={`btn me-2 p-2 px-4 ${
    jobDetail?.userJobDetails?.Saved === "1"
      ? "btn-secondary btn-trans"
      : "btn-trans btn-primary"
  }`}
  onClick={() => {
    const newFlag = jobDetail?.userJobDetails?.Saved === "1" ? "NotSaved" : "Saved";
    applyForJob(jobDetail.id, newFlag);
    setJobDetail((prev) => ({
      ...prev,
      userJobDetails: {
        ...prev.userJobDetails,
        Saved: newFlag === "Saved" ? "1" : "0",
      },
    }));
  }}
>
  {jobDetail?.userJobDetails?.Saved === "1" ? "Saved" : "Save"}
</span>

{jobDetail.applied_job_link ? (
  <span
    className={`btn me-2 p-2 px-4 ${
      jobDetail?.userJobDetails?.Applied === "1"
        ? "btn-secondary btn-trans_"
        : "btn-trans_ btn-primary"
    }`}
    onClick={() => {
      if (jobDetail?.userJobDetails?.Applied === "1") return; // Already applied
      setIsModalVisible(true); // Show modal for job portal redirect
    }}
  >
    {jobDetail?.userJobDetails?.Applied === "1" ? "Applied" : "Apply Now"}
  </span>
) : (
  <span
    className={`btn me-2 p-2 px-4 ${
      jobDetail?.userJobDetails?.Applied === "1"
        ? "btn-secondary btn-trans_"
        : "btn-trans_ btn-primary"
    }`}
    onClick={() => {
  // If external link is present, open it in a new tab and skip internal apply logic
  if (jobDetail?.applied_job_link) {
    window.open(jobDetail.applied_job_link, "_blank");
    return;
  }

  // If already applied, do nothing
  if (jobDetail?.userJobDetails?.Applied === "1") return;

  const newFlag = "Applied";

  // Internal application handler
  applyForJob(jobDetail.id, newFlag);

  // Update the local state to reflect "Applied"
  setJobDetail((prev) => ({
    ...prev,
    userJobDetails: {
      ...prev.userJobDetails,
      Applied: "1",
    },
  }));
}}
  >
    {jobDetail?.userJobDetails?.Applied === "1" ? "Applied" : "Apply Now"}
  </span>
)}


               {/* {jobDetail.applied_job_link ? (
                <a className='btn btn-primary btn-trans_ me-2  p-2 px-4' onClick={handleApplyClick}>
                  Apply Now
                </a>
                ):(
                <>
                <a className='btn btn-primary btn-trans_ me-2  p-2 px-4' href={jobDetail.applied_job_link} target="_blank" rel="noopener noreferrer">
                  Apply Now
                </a>
                </>
                )
   
              } */}
               
               </>
             ):(
                <><a className='btn btn-primary btn-trans me-2  p-2 px-4' href="/login">Login To Apply</a></>
             )}
                
             </div>
             
              
          </div>
      <div className='job_body py-4'>
      <h5><strong>Overview</strong></h5>
      <p>{jobDetail.job_details}</p>
      <br/>
      <p><strong>What you’ll do</strong></p>
      <p>{jobDetail.key_responsibilities}</p>
      <p><strong>Role: </strong>{jobDetail.role_name}</p>
      <p><strong>Industry Type : </strong>{jobDetail.industry_name}</p>
      <p><strong>Department : </strong></p>
      <p><strong>Employment Type:</strong> {jobDetail.employement_type}</p>
      {/* <h5>Education</h5> */}
      <p><strong>Company: </strong>{jobDetail.employer_name}</p>
      <p><strong>Posted by: </strong>{jobDetail.posted_by}</p>
      
      {/* <p><strong>Experience: </strong>{jobDetail.minimum_exp} - {jobDetail.maximum_exp} years</p> */}
<p>
  <strong>Experience: </strong>
  {jobDetail.experience 
    ? jobDetail.experience 
    : `${jobDetail.minimum_exp} - ${jobDetail.maximum_exp}`} years
</p>
      {/* <p><strong>Salary Range: </strong>{jobDetail.salary_range}</p> */}
      {/* <p>
        <strong>Salary Range: </strong>
        {jobDetail.salary_range === 0 || jobDetail.salary_range > 10
          ? "Not specified or out of range"
          : jobDetail.salary_range}
      </p> */}
      <p>
<strong>Salary Range: </strong>
  {jobDetail.salary ?? `${jobDetail.salary_min} - ${jobDetail.salary_max}`} / years
</p>
      {/* <p><strong>Key skill: </strong> {jobDetail.skill}</p> */}
      <p><strong>Key skill: </strong></p>
       <p>{jobDetail.skill && jobDetail.skill.split(',').map((skill, index) => (
          <span key={index} style={{ display:'inline-block',marginRight: '8px',marginBottom: '8px',borderRadius:'15px',color:'#474D6A', padding:'0px 9px',border:'1px solid #E7E7F1',}}>
            {skill.trim()}
          </span>
        ))}
      </p>
      </div>
      {/* Add more job details here as needed */}
       {/* Bootstrap Modal */}
       {isModalVisible && (
        <div className="modal fade show d-block applyjob" tabIndex="-1" role="dialog">
          <div className="modal-dialog p-4" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <div className='d-flex flex-column'>
                <img className='popuplogo' src={jobDetail.employer_logo} alt=""/>
                <h2>{jobDetail.job_title}</h2>
                <p style={{fontWeight:'400',fontSize:'14px'}}>{jobDetail.employer_name || "Not specified"} •{" "}
                {jobDetail.employement_type || "Not specified"} •{" "}
                {jobDetail.city_name || "Not specified"}</p>
                <p className='py-3'>You will be redirected to the company’s job portal to apply</p>
                <a className='btn btn-primary btn-trans_ mb-2  p-2 px-4' href={jobDetail.applied_job_link} target="_blank" rel="noopener noreferrer">Take me there</a>
                <a href="#" type="button" className="btn btn-secondary_" onClick={closeModal}>
                  Cancel
                </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop for modal */}
      {isModalVisible && <div className="modal-backdrop fade show"></div>}
        </div>
      </div>
    </section>
    </>
  ) : (
    <p>Job details not available.</p>
  );
};

export default JobDetailPage;
