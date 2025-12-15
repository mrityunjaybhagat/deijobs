import React, { useState, useEffect } from 'react';
import { useResponsive } from '../../config/responsive';
import InputWithIcon from '../form/InputWithIcon';
import Logo from './Logo';
import { useLocation, useNavigate } from 'react-router-dom';
import icons from '../../assets/icons';
import LogoutModal from '../ui/LogoutModal';
import JobSearchForm from '../ui/SearchForm';
import BackButton from '../ui/BackButton';
import Sidebar from './Sidebar';

const Header = () => {
  const navigate = useNavigate();
  const { isDesktopOrLaptop, isTabletOrMobile } = useResponsive();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showDiv, setShowDiv] = useState(false);

  const location = useLocation();
  const userId = localStorage.getItem("login_token");
  const isLoggedIn = localStorage.getItem('login_token');

  const onlyLogoPaths = ['/login', '/verify-mobile','/upload-resume','/create-profile'];
  const onlyLogo = onlyLogoPaths.includes(location.pathname);
  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const handleLogout = () => {
    // Clear token and log out logic
    localStorage.removeItem("login_token");
    alert("You have been logged out.");
    window.location.href = "/login";
  };
  return (
    <>
        <header className='header  sticky-top top'>
            <div className='container'>
            <nav className={`navbar ${onlyLogo ? 'justify-content-center' : ''}  ${isTabletOrMobile ? 'justify-content-space-between' : ''}`}>
            {isTabletOrMobile && (
              <>
              {location.pathname === '/' || location.pathname === '/jobs' ? (
            <>
            <a onClick={toggleSidebar} className={`toggle-btn ${isSidebarOpen ? 'open' : ''}`}>
              <img src={icons['menu.svg']} alt="Menu Icon" />
            </a>
            </>
          ):(
            <BackButton/>
          )}
              </>
            )}
                <Logo/>
              {isDesktopOrLaptop && (
                <>
                <div className='d-flex justify-content-end align-items-center'>
                {!onlyLogo && (
                <>
                {isLoggedIn ? (
                  <>
                  <span className='searchbox' onClick={() => setShowDiv(prev => !prev)}>
                    <InputWithIcon icon={<img src={icons["search.svg"]}/>}>
                    <input type='search' className='form-control' placeholder='Search Jobs'/>
                    </InputWithIcon>
                  </span>
                <a className='btn me-2  p-2 px-3' href="/notifications"><img src={icons["bell.svg"]}/></a> 
                <div className="dropdown-center">
                  <button className="btn me-2  p-2 px-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={icons["toogleBlue.svg"]}/>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <a className='btn me-2  p-2 px-3' href="/profile/blog">Blog</a>
                    <a className='btn me-2  p-2 px-3' href="/receipt">Receipt</a>
                    <a className='btn me-2  p-2 px-3' href="/resources">Resources</a>                    
                    <a className='btn me-2  p-2 px-3' href="/t&c">Terms & Conditions</a>
                    <a className='btn me-2  p-2 px-3' href="/privacy_policy">Privacy Policy</a>
                  </ul>
                </div>
                <div className="btn-group">
                  <button className="btn me-2  p-2 px-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src={icons["userSolid.svg"]}/>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li><a className='btn me-2  p-2 px-3 d-block' href="/account">Account</a></li>
                    <li><a className='btn me-2  p-2 px-3 d-block' href="/notifications">Notifications</a></li>
                    <li><a className='btn me-2  p-2 px-3 d-block' data-bs-toggle="modal" href="#" data-bs-target="#logoutModal">Logout</a></li>
                  </ul>
                </div>              
                  </>
                ):(
                  <>
                  <a className='btn btn-primary btn-trans me-2  p-2 px-4' href="/login">Login</a>
                  <a className='btn btn-primary btn-trans me-2  p-2 px-4' href="/login">Registration</a>
                  <a href="/employer">For Employers</a>
                  </>
                )}

                </>)}
                
                </div>
                {showDiv && 
                  <>
                  <div className="header_search w-100">
                    <JobSearchForm/>
                  </div>
                  </>
                }
                </>
              )}
               
              </nav>
            </div>
        </header>
        {isTabletOrMobile && (
        <>
          <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </>
        )}
        <LogoutModal handleLogout={handleLogout}/>
    </>
  );
};

export default Header;



