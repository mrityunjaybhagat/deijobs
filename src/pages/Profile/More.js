import React from "react";
import { useNavigate } from "react-router-dom";

const More = () => {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  const menu = [
    {
      title: "Account",
      action: () => {
        navigate("/account");
      },
    },
    {
      title: "Notifications",
      action: () => {
        navigate("/notifications");
      },
    },
    {
      title: "Receipt",
      action: () => {
        navigate("/receipt");
      },
    },
    {
      title: "Terms & Conditions",
      action: () => {
        navigate("/t&c");
      },
    },
    {
      title: "Privacy Policy",
      action: () => {
        navigate("/privacy_policy");
      },
    },
    {
      title: "Logout",
      action: () => {
        localStorage.clear();
        navigate("/login");
      },
    },
  ];
  return (
    <div className="p-5">
      <div className="rounded-md border border-grey-400 overflow-hidden shadow">
        {menu.map((item, key) => (
          <div
            key={key}
            className="p-4 bg-white cursor-pointer"
            onClick={() => item?.action()}
          >
            {item?.title}
          </div>
        ))}
      </div>
    </div>
  );
};

More.layoutProps = {
  requiredAuth: true,
};

export default More;
