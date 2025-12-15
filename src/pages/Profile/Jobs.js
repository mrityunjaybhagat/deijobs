import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useResponsive } from '../../config/responsive';
import icons from "../../assets/icons";
import images from "../../assets/images";
import IconCard from "../../components/ui/IconCard";
import BottomNav from "../../components/ui/BottomNav";
import PayNowCard from "../../components/profile/PayNowCard";
import NewlyAdded from "../../components/profile/NewlyAdded";
import ProfileCard from "../../components/profile/ProfileCard";
import OverviewData from "../../components/profile/OverviewData";
import TopCompanies from "../../components/profile/TopCompanies";
import RecemendedData from "../../components/profile/RecemndedData";
import { useLocation } from "react-router-dom";
import ReactPixel from "react-facebook-pixel";
import InputWithIcon from "../../components/form/InputWithIcon";
import { Search, SearchIcon } from "lucide-react";


const Jobs = () => {
  const { isDesktopOrLaptop, isTabletOrMobile } = useResponsive();
  const navigate = useNavigate();
  const location = useLocation(); 
  //Meta Pixel For Complete Registration
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    // if (params.get("ev") === "reg_done" && typeof fbq === "function") {
    //   // Fire Meta Pixel event
    //   fbq("track", "CompleteRegistration");

    //   // Optional: prevent re-firing in this session
    //   sessionStorage.setItem("regTracked", "true");

    //   // Remove ev from URL
    //   params.delete("ev");
    //   const newUrl =
    //     location.pathname + (params.toString() ? `?${params.toString()}` : "");
    //   window.history.replaceState({}, document.title, newUrl);
    // }

        if (params.get("ev") === "reg_done") {
          // Prevent double-firing in same session
          if (!sessionStorage.getItem("regTracked")) {
            ReactPixel.track("CompleteRegistration");
            console.log("✅ Meta Pixel: CompleteRegistration fired");
            sessionStorage.setItem("regTracked", "true");
          }

          // Clean the URL
          params.delete("ev");
          const newUrl =
            location.pathname + (params.toString() ? `?${params.toString()}` : "");
          window.history.replaceState({}, document.title, newUrl);
        }
  }, [location]);
  
  
  return (
    <>
      <section className="content">
        <div className="container">
          <div className="row">
          {isDesktopOrLaptop && (
            <>
            <div className="col-md-3">
              <ProfileCard />
            </div>
            </>
          )}
            <div className="col-md-6">
            {/* Pay Now Banner */}
            {isDesktopOrLaptop && (
            <>
            <div className="card no-pad shadow">
              <PayNowCard
                    type=""
                    BgImge={images["payment_banner.png"]}
                  />
              </div>
              </>
            )}
            {isTabletOrMobile && (
                <>
                <section className="banner no-background">
                    <div className="container">
                        <InputWithIcon 
                        classname="mobilesearch_"
                        icon={<SearchIcon/>}>
                            <input onClick={() => navigate("/search-jobs")} type='search' className='form-control' placeholder="Search for DEI Jobs"/>
                        </InputWithIcon>
                    </div>
                </section>
                </>
              )}  
              {/* Overview */}
              <div className="card no-border shadow">
                <div className="card-head">
                  <h3 className="card-title">Overview</h3>
                </div>
                <div className="d-flex justify-between w-100 gap-2">
                    <OverviewData/>
                </div>
              </div>
            {isTabletOrMobile && (
            <>
            <div className="card no-pad shadow">
              <PayNowCard
                    type=""
                    BgImge={images["payment_banner.png"]}
                  />
              </div>
              </>
            )}
              {/* Recemended Jobs */}
              <div className="card no-border shadow">
              <div className="card-head">
                  <h3 className="card-title">Recommended Jobs</h3>
                  <a href="/jobs/recommended">See All</a>                  
              </div> 
              <div>
              <RecemendedData/>
              </div>               
              </div>
              {/* Search By JobType */}
              <div className="card no-border shadow">
              <div className="card-head">
                  <h3 className="card-title">Search by Job Type</h3>
              </div>
                
                <div className="d-flex justify-between  w-100  gap-2">
                  <IconCard iconSrc={icons["fulltime.svg"]} text="Full Time" goTo='/jobs/full-time'/>
                  <IconCard iconSrc={icons["parttime.svg"]} text="Part Time" goTo='/jobs/part-time'/>
                  <IconCard iconSrc={icons["internship.svg"]} text="Internship" goTo='/jobs/internship'
                  />
                </div>
              </div>
              {/* Newly Added*/}
              <div className="card no-border shadow">
              <div className="card-head">
                <h3 className="card-title">New Hiring</h3>
                 <a href="/jobs/recent">See All</a>    
              </div>
                <NewlyAdded/>
              </div>
            </div>
            {isDesktopOrLaptop && (
            <>
            <div className="col-md-3">
              <div className="card verticle topcompanies p-4">
              <h2>Top Companies</h2>
              {/* Top Companies*/}
                <TopCompanies/>
              </div>
              <PayNowCard type='verticle' BgImge={images["payment_banner.png"]}/>
            </div>
            </>
          )}
            
          </div>
        </div>
      </section>
      {isTabletOrMobile && (
        <>
        <BottomNav/>
        </>
      )}
    </>
  );    
};

export default Jobs;
