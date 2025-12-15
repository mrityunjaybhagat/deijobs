import React from "react";
import { useResponsive } from "../../config/responsive";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CompanyCard = ({
  linkTo,
  classname,
  jobId,
  companyLogo,
  companyName,
  preferenceCategory,
  jobpost,
  jobsposted,
  employementType,
  postedBy,
  location,
  isJob,
  isVerticle
}) => {
  const { isDesktopOrLaptop, isTabletOrMobile } = useResponsive();
  const navigate = useNavigate();

  /** ✅ Resolve URL based on isJob */
  const url = isJob
    ? `/job/${linkTo || jobId}`
    : `/jobs/company/${linkTo}`;

  const handleClick = () => navigate(url);

  /** ✅ Conditional classes */
  const cardClass = `card no-border ${isJob ? "job-card" : "company-card"}`;

  // const innerClass = isJob
  //   ? `${isVerticle ? "job-card-inner" : "flex-row"} ${
  //       isTabletOrMobile ? "flex-row" : "flex-column"
  //     }`
  //   : `company-card ${isTabletOrMobile ? "mobile-company-class" : ""}`;

  const innerClass = isJob
  ? `${
      isTabletOrMobile
        ? "flex-row" // Always row on mobile
        : isVerticle
        ? "job-card-inner flex-column" // vertical layout
        : "flex-row" // horizontal layout
    }`
  : `company-card ${isTabletOrMobile ? "mobile-company-class" : ""}`;


  /** ✅ Common placeholder style */
  const subTextStyle = { fontWeight: 300, color: "#6B7280" };

  return (
    <div onClick={handleClick} className={cardClass} style={{ cursor: "pointer" }}>
      <div className={`d-flex gap-2 ${innerClass}`}>
        
        {/* ✅ Company Logo */}
        <div className="comp_logo w-25">
          {companyLogo && <img src={companyLogo} alt={`${companyName} logo`} />}
        </div>

        {/* ✅ Job / Company Info */}
        <div>
          {isJob ? (
            <>
              <p>{jobpost}</p>

              <p style={subTextStyle}>
                {employementType || "Not specified"} •{" "}
                {companyName || "Not specified"} •{" "}
                {location || "Not specified"}
              </p>

              <p style={subTextStyle}>
                Job posted by {postedBy || "Not specified"}
              </p>

              {/* ✅ Chevron only for horizontal or mobile */}
              {(!isVerticle || isTabletOrMobile) && (
                <a href='#' onClick={handleClick} className="nextIcon">
                  <ChevronRight/>
                </a>
              )}
            </>
          ) : (
            <>
              <p className="fw-bold">{companyName}</p>
              <p>{jobpost}</p>
            </>
          )}
        </div>
      </div>

      {/* ✅ Footer View Jobs (for vertical desktop only) */}
      {isJob && isDesktopOrLaptop && isVerticle && (
        <div className="viewjobs text-center p-3">
          <a href={`/job/${jobId}`}>View jobs</a>
        </div>
      )}

      {/* ✅ Job count section */}
      {jobsposted && (
        <div className="d-flex gap-2 mt-2">
          <h2>{jobsposted}</h2>
          <p style={subTextStyle}>Jobs Available</p>
        </div>
      )}
    </div>
  );
};

export default CompanyCard;
