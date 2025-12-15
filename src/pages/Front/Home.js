import React, { useState, useEffect } from "react";
import images from "../../assets/images/";
import HomeBanner from '../../components/home/banner'
import JobSearchForm from "../../components/ui/SearchForm";
import SectionWrapper from "../../components/home/SectionWrapper";
import CustomSlider from "../../components/ui/CustomSlider";
import FeaturedJobs from "../../components/home/FeaturedJobs";
import WhyChoose from "../../components/home/WhyChoose";
import HowWorksCard from "../../components/home/HowWorksCard";
import Testimonials from "../../components/home/Testimonials";
import { useResponsive } from '../../config/responsive';
import { useLocation } from "react-router-dom";


const HomePage = () => {
  const location = useLocation();
  const { isDesktopOrLaptop, isTabletOrMobile } = useResponsive();
  useEffect(() => {
    // Check if the current path is the homepage
    if (location.pathname === "/") {
      // Add a class to the body element if it's the homepage
      document.body.classList.add("home-page-body");
    } else {
      // Remove the class if it's not the homepage
      document.body.classList.remove("home-page-body");
    }

    // Cleanup function to remove the class when the component unmounts
    return () => {
      document.body.classList.remove("home-page-body");
    };
  }, [location.pathname]); 
  return (
    <> 
     {/* Banner Section */}
    <HomeBanner/>
     {/* Search Section */}
     {isDesktopOrLaptop && (
      <>
      <SectionWrapper>
        <JobSearchForm/>
      </SectionWrapper>
      </>
     )}
     <a href="https://idjf2023.exposim.io/" target="_blank" style={{display:'block',textAlign:'center'}}>
      <img src={images["Ads_slider01.png"]} className="w-full"/>
    </a>
    <SectionWrapper>
    
    </SectionWrapper>
     {/* Featured Section */}
    <SectionWrapper className="my-section"
        headclassName='d-flex justify-content-between'
        headerContent={
          <>
          <h2 className="">Featured companies actively hiring</h2>
          </>
        }
        footclassName='pt-5'
        footerContent={<a href="/showAll/featured-jobs" className="btn btn-trans btn-rounded seeall">View all Jobs</a>}
    >
      <FeaturedJobs/>
    </SectionWrapper>

    {/* Trusted Partner */}
    <SectionWrapper className="partners"
        headclassName='d-flex justify-content-center'
        headerContent={<h2>OUR TRUSTED PARTNERS</h2>}
    >
      <CustomSlider customSettings={{slidesToShow:5,arrows: false, infinite: true,autoplay: true,speed: 2000,autoplaySpeed: 2000,cssEase: "linear",
      responsive: [
      {
        breakpoint: 767, // For mobile screens
        settings: {
          slidesToShow:2,
          slidesToScroll: 1,
          arrows: false, // Disable arrows for mobile
        },
      },
    ],
      }}>
        <div className="">
          <img src={images['image 16.svg']} className="h-14 ml-4" alt="Tata Steel"/>
        </div>
        <div className="">
          <img src={images['image 17.svg']} className="h-14 ml-4" alt="Max Life Insurance"/>
        </div>
        <div className="">
          <img src={images['image 18.svg']} className="h-14 ml-4" alt="Tata Digital"/>
        </div> 
        <div className="">
          <img src={images['image 19.svg']} className="h-14 ml-4" alt="Tata Digital"/>
        </div> 
        <div className="">
          <img src={images['image 20.svg']} className="h-14 ml-4" alt="Tata Digital"/>
        </div> 
      </CustomSlider>
    </SectionWrapper>

    <SectionWrapper className="whychoos">
      <WhyChoose/>
    </SectionWrapper>

    <SectionWrapper className="howitowrks"
      headclassName='d-flex justify-content-center'
      headerContent={<h2 className="text-center">How It Works</h2>}
      footclassName='pt-5'
      footerContent={<a href="/login" className="btn btn-primary btn-white">Candidate Signup</a>} 
    >
    <div className="text-center">
    <h3 style={{color:'#fff'}}>Catapult your career into D&I job opportunities</h3>
    </div>
    <div className="col-md-9 offset-md-1">
      <CustomSlider customSettings={{slidesToShow:3,arrows:false,
      responsive: [{
        breakpoint:767,
        settings: {
          slidesToShow:1.2,
        }
      },
    ]
      }}>
        <HowWorksCard imageSrc={images["howItWorkds01.png"]} number='1' text='Register your DEI Jobs account'/>
        <HowWorksCard imageSrc={images["howItWorkds02.png"]} number='2' text='Create your resume with our AI powered resume builder'/>
        <HowWorksCard imageSrc={images["howItWorkds03.png"]} number='3' text='Apply Easily to D&I Jobs and Sharing'/>
      </CustomSlider>
      </div>
    </SectionWrapper>


    <SectionWrapper className="testimonial" 
      headclassName='d-flex justify-content-center'
      headerContent={<h2 className="text-center primary">Testimonials</h2>}
      footclassName='pt-5'
      //footerContent={<a href="/showAll/featured-jobs" className="btn btn-trans btn-rounded seeall">View all companies</a>} 
    >
    {/* <p className="text-lg">Join the community of job seekers and stay connected with a range of topics and aspects that revolve around D&I. Receive regular updates and learn how to navigate workplace dynamics</p>               */}
          <Testimonials/> 
    </SectionWrapper>
    <SectionWrapper>
      <div className="newsletter text-center">
          <div className="section-head mb-2 d-flex justify-content-center">
              <h2 className="primary">Subscribe to Newsletter</h2>
          </div>
            <div className="col-md-4  offset-md-4">
                <input type="email" className="form-control  mb-4" placeholder="Enter your email address"/>
                <button className="btn btn-primary primary-button w-100">Subscribe Now</button>
            </div>
          </div>
    </SectionWrapper>
    </>
  );    
};

export default HomePage;
