// Sidebar.js
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Assuming you are using react-router for navigation
import { useSidebar } from '../context/SidebarContext';
import { ChevronRight, UsersRound, User } from "lucide-react";
import CardWithIcon from '../component/form/CardWithIcon';

const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const location = useLocation();

  // Close the sidebar whenever the location changes (i.e., navigation occurs)
  useEffect(() => {
    if (isSidebarOpen) {
      toggleSidebar();
    }
  }, [location]);

  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <CardWithIcon
        startIcon={<User/>}
        text="Featured Jobs"
        endIcon={<ChevronRight/>}
        to="/showAll/featured-jobs"
      />
      <CardWithIcon
        startIcon={<UsersRound/>}
        text="Login"
        endIcon={<ChevronRight/>}
        to="/login"
      />
      <CardWithIcon
        startIcon={<UsersRound/>}
        text="Register"
        endIcon={<ChevronRight/>}
        to="/register"
      />
      <CardWithIcon
        startIcon={<UsersRound/>}
        text="Employer Login"
        endIcon={<ChevronRight/>}
        to="/employer"
      />
      <CardWithIcon
        startIcon={<UsersRound/>}
        text="Community"
        endIcon={<ChevronRight/>}
        to="/community"
      />
    </div>
  );
};

export default Sidebar;
