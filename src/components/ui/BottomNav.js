// src/components/BottomNav.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Briefcase, User, Menu } from "lucide-react"; // Icons for the navigation items
import '../../assets/css/BottomNav.css'; // Import your CSS file
const BottomNav = () => {
    const location = useLocation();
  return (
    <nav className="bottom-nav">
      <ul className="nav-items">
      <li className={location.pathname === "/jobs" ? "active" : ""}>
          <Link to="/jobs">
            <Briefcase/>
            <div>Jobs</div>
          </Link>
        </li>
        <li className={location.pathname === "/profile" ? "active" : ""}>
          <Link to="/profile/add">
            <User/>
            <div>Profile/Add</div>
          </Link>
        </li>
        <li className={location.pathname === "/more" ? "active" : ""}>
          <Link to="/more">
            <Menu/>
            <div>More</div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default BottomNav;
