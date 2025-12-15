import React, { useState, useEffect } from 'react';
import { useResponsive } from '../../config/responsive';
import images from "../../assets/images";
import PayNowCard from '../../components/profile/PayNowCard';
import ProfileCard from '../../components/profile/ProfileCard';
import VarifiedCard from '../../components/profile/VarifiedCard';

const AccountPage = () => {
  const { isDesktopOrLaptop, isTabletOrMobile } = useResponsive();
  const [verificationData, setVerificationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('login_token');
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
            <div className="col-md-6 acocunt_card">
               <VarifiedCard />
            </div>
            {isDesktopOrLaptop && (
            <>
            <div className="col-md-3">
              <PayNowCard type='verticle' BgImge={images["payment_banner.png"]}/>
            </div>
            </>
          )}
          </div>
        </div>
      </section>
    </>
  );
};

export default AccountPage;
