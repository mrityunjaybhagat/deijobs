// src/components/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import { Menu, ChevronRight, UsersRound, User, MenuIcon ,Bell, User2} from "lucide-react";
import CardWithIcon from '../../components/ui/CardWithIcon';
import icons from '../../assets/icons';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const isLoggedIn = !!localStorage.getItem('login_token');
  const userId = localStorage.getItem("login_token");
  const handleLogout = () => {
    // Clear token and log out logic
    localStorage.removeItem("login_token");
    alert("You have been logged out.");
    window.location.href = "/login";
  };
  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-content">
        {/* <button onClick={toggleSidebar} className="close-btn">X</button> */}
        {isLoggedIn ? (
          <>
            <CardWithIcon
              imageSrc={icons['user']}
              startIcon={<UsersRound />}
              text="Account"
              endIcon={<ChevronRight />}
              to="/account"
            />
            <CardWithIcon
              imageSrc={icons['user']}
              startIcon={<UsersRound />}
              text="Notifications"
              endIcon={<ChevronRight />}
              to="/notifications"
            />
             <CardWithIcon
              imageSrc={icons['user']}
              startIcon={<UsersRound />}
              text="Receipt"
              endIcon={<ChevronRight />}
              to="/receipt"
            />
            <CardWithIcon
              imageSrc={icons['user']}
              startIcon={<UsersRound />}
              text="Logout"
              endIcon={<ChevronRight />}
              //to="/login"
              onClick={handleLogout}
            />
            <CardWithIcon
              imageSrc={icons['user']}
              startIcon={<UsersRound />}
              text="Resources"
              endIcon={<ChevronRight />}
              to="/resources"
            />
            <CardWithIcon
              imageSrc={icons['user']}
              startIcon={<UsersRound />}
              text="Blog"
              endIcon={<ChevronRight />}
              to="/blog"
            />
             <CardWithIcon
              imageSrc={icons['user']}
              startIcon={<UsersRound />}
              text="Terms & Condition"
              endIcon={<ChevronRight />}
              to="/t&c"
            />
            <CardWithIcon
              imageSrc={icons['user']}
              startIcon={<UsersRound />}
              text="Privacy Policy"
              endIcon={<ChevronRight />}
              to="privacy_policy"
            />
            
            </>
            
        ) :(
<>
        <CardWithIcon
            imageSrc={icons['resume.svg']}
            text="Featured Jobs"
            endIcon={<ChevronRight />}
            to="/showAll/featured-jobs"
        />
        <CardWithIcon
              imageSrc={icons['vector.svg']}
              startIcon={<UsersRound />}
              text="Login"
              endIcon={<ChevronRight />}
              to="/login"
            />
            <CardWithIcon
              imageSrc={icons['user.svg']}
              startIcon={<UsersRound />}
              text="Register"
              endIcon={<ChevronRight />}
              to="/login"
            />
            <CardWithIcon
              imageSrc={icons['employer.svg']}
              startIcon={<UsersRound />}
              text="Employer Login"
              endIcon={<ChevronRight />}
              to="/employer"
            />
            <CardWithIcon
            imageSrc={icons['users.svg']}
              startIcon={<UsersRound />}
              text="Community"
              endIcon={<ChevronRight />}
              to="/community"
            />
        </>
        )}
      </div>
    </div>
  );
};
export default Sidebar;


