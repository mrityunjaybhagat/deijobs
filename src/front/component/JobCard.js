import React from "react";

const JobCard = () =>{
    return(
        <>
        <div className="jobcard_outer">
        <div className="jobcard bg-white text-black p-3 flex flex-col">
            <div className="jobcard_inner">
                <div className="emp_logo">
                <img src="assets/images/emplogo.png" alt="Employer Logo"/>
                </div>
                <div className="job_details">
                    <h4 className="jobTitle text-sm">
                        Engneering &
                        Design Engineer
                    </h4>
                    <p className="location text-sm">Full-Time • ABB • Bangalore</p>
                    <p className="postedby text-sm">Job posted by Company</p>
                </div>
            </div>
            <div className="text-center p-3">
                <a href="" className="text-center">View jobs</a>
            </div>
        </div>
        </div>
    </>
    )
}
export default JobCard;