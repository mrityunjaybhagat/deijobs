import React from "react";
import { useMediaQuery } from 'react-responsive';
import { Link, useNavigate } from "react-router-dom";

const HomeBanner = () => {
    const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });
    const isTabletOrMobile = useMediaQuery({ maxWidth: 767 });
    const navigate = useNavigate();
    return(
        <> 
        {isTabletOrMobile && (
        <>
        <section>
            <div className="container">
          <form className=''>
            <input onClick={() => navigate("/search-jobs")} type='search' className='form-control'/>
          </form>
          </div>
        </section>
        </>
		  )}  
        <section class="bannerbg">
            <div class="container">
                <h1 class="header_title">Uniting Diversity! <span>Building a Community!</span></h1>
                <h4 class="fw-light">Promoting Inclusivity through Opportunity</h4>
                <h5 class="fw-light">Connecting Multi-talented Job Seekers with D&amp;I Jobs. Find the job you love.</h5>
            </div>
        </section>
    </>
    )
}
export default HomeBanner;