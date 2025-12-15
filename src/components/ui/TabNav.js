// src/components/BottomNav.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Briefcase, User, Menu } from "lucide-react"; // Icons for the navigation items
import '../../assets/css/BottomNav.css'; // Import your CSS file
const TabNav = () => {
  const location = useLocation();
  return (
    <div className='card p-0'>
    <ul className="nav-items">
      <li className={location.pathname === "/profile/overview" ? "active" : ""}>
        <a href='/profile/overview'>Overview</a>
      </li>
      <li className={location.pathname === "/profile/add" ? "active" : ""}>
        <a href='/profile/add'>Profile</a>
      </li>
      <li className={location.pathname === "/profile/preferences" ? "active" : ""}>
        <a href='/profile/Preferences'>Preferences</a>
      </li>
  </ul>
    </div>
  );
};

export default TabNav;
