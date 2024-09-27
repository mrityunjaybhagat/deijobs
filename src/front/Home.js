import React from 'react';
import { useMediaQuery } from 'react-responsive';
import HomeBanner from './HomePage/HomeBanner';
import BelowBanner from './HomePage/BelowBanner';
import TrustedPartners from './HomePage/TrustedPartners';
import WhyChoose from './HomePage/WhyChoose';
import HowItWorks from './HomePage/howitworks';
import Testimonials from './HomePage/Testimonials';
import FeaturedJobs from './HomePage/FeaturedJobs';
import JobSearchForm from './HomePage/JobSearchForm';

const HomePage = () => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });
  const isTabletOrMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <>
    
      <HomeBanner/>
      <JobSearchForm/>
      <BelowBanner/>
      <FeaturedJobs/>
      <TrustedPartners/>
      <WhyChoose/>
      <HowItWorks/>
      <Testimonials/>
    </>
  );
};

export default HomePage;
