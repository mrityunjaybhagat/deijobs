import { useResponsive } from '../../config/responsive';
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
const JobCard = ({
  isJob,
  jobId,
  linkTo,
  isVerticle,
  companyLogo,
  companyName,
  jobpost,
  jobsposted,
  employementType,
  postedBy,
  location,
}) => {
  const { isDesktopOrLaptop, isTabletOrMobile } = useResponsive();
  const navigate = useNavigate();
  const url = isJob 
  ? (linkTo ? `/job/${linkTo}` : `/job/${jobId}`) 
  : `/showAll/top-companies/${linkTo}`;
  const handleClick = () => {
    navigate(url);
  };
  return (
    <>
      <div onClick={handleClick}
        className={`card no-border ${isJob ? "job-card" : "company-card"}`}
        style={{ cursor: "pointer" }}
      >
        <div
          className={`d-flex gap-2 ${
            isJob ? 
            `${isVerticle ? 'job-card-inner' : 'flex-row'} ${isTabletOrMobile ? 'flex-row' : 'flex-column'}` 
            : `company-card ${isTabletOrMobile ? 'mobile-company-class' : ''}`
          }`}
        >
          <div className="comp_logo w-25">
            {companyLogo && (
              <img src={companyLogo} alt={`${companyName} logo`} />
            )}
          </div>
          <div className="">
            {isJob ? (
              <>
                <p>{jobpost}</p>
                <p style={{ fontWeight: "300", color: "#6B7280" }}>
                  {employementType || "Not specified"} •{" "}
                  {companyName || "Not specified"} •{" "}
                  {location || "Not specified"}</p>
                  <p style={{ fontWeight: "300", color: "#6B7280" }}>Job psoted by {postedBy || "Not specified"}</p>
                    {/* <a href={`/job/${jobId}`} className="nextIcon">
                      <ChevronRight />
                    </a> */}
                  {!isVerticle ||  isTabletOrMobile && (
                  <>
                    <a href={`/job/${jobId}`} className='nextIcon'>
                      <ChevronRight/>{jobId}
                    </a>
                  </>
                )}
              </>
            ) : (
              <>
                {companyName}
                <p>{jobpost}</p>
              </>
            )}
          </div>
        </div>
        {isJob && (
          <>
          {isDesktopOrLaptop && isVerticle && (
            <>
              <div className="viewjobs text-center p-3">
                <a href={`/job/${jobId}`} className="text-center">
                  View jobs 
                </a>
              </div>
            </>
          )}
          </>
        )}
        {jobsposted && ( // Conditional rendering
          <div className="d-flex gap-2 mt-2">
            <h2 className="">{jobsposted}</h2>
            <p style={{ fontWeight: 300 }}>Jobs Available</p>
          </div>
        )}
      </div>
    </>
  );
};

export default JobCard;
