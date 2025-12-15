import { useNavigate } from "react-router-dom";
import { useResponsive } from '../../config/responsive';
import InputWithIcon from "../form/InputWithIcon";
import searchIcon from '../../assets/icons/search.svg';
const HomeBanner = () => {
    const navigate = useNavigate();
    const { isDesktopOrLaptop, isTabletOrMobile } = useResponsive();
    return(
        <> 
        {isTabletOrMobile && (
        <>
        <section className="banner no-background">
            <div className="container">
                <InputWithIcon 
                classname="mobilesearch"
                icon={<img src={searchIcon} />}>
                    <input onClick={() => navigate("/search-jobs")} type='search' className='form-control' placeholder="Search for DEI Jobs"/>
                </InputWithIcon>
            </div>
        </section>
        </>
		  )}  
        <section className="banner">
            <div className="container">
                <h1 className="header_title">Uniting Diversity! <span>Building a Community!</span></h1>
                <h4 className="fw-light">Promoting Inclusivity through Opportunity</h4>
                <h5 className="fw-light">Connecting Multi-talented Job Seekers with D&amp;I Jobs. <span>Find the job you love.</span></h5>
                {isTabletOrMobile && (
                <>
                    <a href="/login" className="btn btn-primary w-100 my-4">Candidate Signup/Login</a>
                    <a href="/login" className="btn btn-trans w-100">Employer Signup/Login</a>
                </>
                )}
            </div>
        </section>
    </>
    )
}
export default HomeBanner;