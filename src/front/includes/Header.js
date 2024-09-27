import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import Logo from './Logo';
import { Menu, ChevronRight, UsersRound, User, MenuIcon ,Bell, User2} from "lucide-react";
import CardWithIcon from '../component/CardWithIcon';
import { useResponsive } from '../../config/responsive';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation(); // Get the current location
  const userId = localStorage.getItem("login_token");
  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("login_token");
      window.location.href = "/login"; // Redirect to the login page
    }
  };
  const { isDesktopOrLaptop, isTabletOrMobile } = useResponsive();
  return (
    <header className='fixed'>
      {isDesktopOrLaptop && (
        <>
          <nav className='navbar sticky-top top'>
            <div className='container'>
              <Logo />
              <div className='justify-content-end'>
              {userId ? (
                <>
                <a className='btn btn-primary btn-trans me-2  p-2 px-4' href="/login">Login</a>
                <a className='btn btn-primary btn-trans me-2  p-2 px-4' href="/register">Registration</a>
                <a href="/login">For Employers</a>
                </>
              ) : (
              <>
                <span className='searchbox'><input type='search' className='form-control'/></span>
                <a className='btn me-2  p-2 px-2' href="/login"><Bell/></a> 
                <a className='btn me-2  p-2 px-2' href="/login"><MenuIcon/></a>
                <a className='btn me-2  p-2 px-2' href="/login"><User2/></a>
              </>
            )}
              </div>
            </div>
          </nav>
        </>
      )}
      {isTabletOrMobile && (
        <>
          <header className='mobile_nav shadow'>
            <button onClick={toggleSidebar} className={`toggle-btn ${isSidebarOpen ? 'open' : ''}`}>
              <Menu fontSize={20} className="text-slate-700" />
            </button>
            <Logo />
          </header>
          <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
            <CardWithIcon
              imageSrc=""
              text="Featured Jobs"
              endIcon={<ChevronRight />}
              to="/showAll/featured-jobs"
            />
            <CardWithIcon
              startIcon={<UsersRound />}
              text="Login"
              endIcon={<ChevronRight />}
              to="/login"
            />
            <CardWithIcon
              startIcon={<UsersRound />}
              text="Register"
              endIcon={<ChevronRight />}
              to="/login"
            />
            <CardWithIcon
              startIcon={<UsersRound />}
              text="Employer Login"
              endIcon={<ChevronRight />}
              to="/employer"
            />
            <CardWithIcon
              startIcon={<UsersRound />}
              text="Community"
              endIcon={<ChevronRight />}
              to="/community"
            />
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
