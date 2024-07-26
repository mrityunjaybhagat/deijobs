import React from 'react';
import HomeBanner from './HomePage/HomeBanner';
import FeturedJob from './HomePage/FeaturedJobs';
import BelowBanner from './HomePage/BelowBanner';
import TrustedPartners from './HomePage/TrustedPartners';
import WhyChoose from './HomePage/WhyChoose';
import NewsLetter from './HomePage/NewsLetter';

const HomePage = () => {
  return (
    <>
      <HomeBanner/>
      <BelowBanner/>
      <FeturedJob/>
      <TrustedPartners/>
      <WhyChoose/>
      <NewsLetter/>
    </>
  );
};

export default HomePage;
