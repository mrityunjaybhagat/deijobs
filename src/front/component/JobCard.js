import React from "react";

const JobCard = () =>{
    return(
        <>
        <div className="jobcard bg-white rounded-xl shadow dark:bg-slate-950 flex flex-col">
            <div className="jobcard_inner">
                <div className="emp_logo">
                <img src="assets/images/emplogo.png" alt="Employer Logo"/>
                </div>
                <div className="job_details">
                    <h4 className="jobTitle text-base">
                    IS Service Manager,  AMEA ERP CoE
                    </h4>
                    <h5 className="location">Full-Time • ABB • Bangalore</h5>
                    <h5 className="postedby">Job posted by Company</h5>
                </div>
            </div>
        </div>
    </>
    )
}
export default JobCard;