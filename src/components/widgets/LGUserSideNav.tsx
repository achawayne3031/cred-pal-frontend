import { FC, useEffect } from "react";
import "../../scss/top-navbar.scss";
import { Menu, MenuItem } from "@mui/material";
import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { getData, logOut } from "../../utils/LocalStorage";
import { IUser } from "../../interfaces/IUser";
import { getFirstLetter } from "../../utils/FuncHelper";
import { useNavigate } from "react-router";

const LGUserSideNav: FC = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [userProfile, setUserProfile] = React.useState<IUser>();

  useEffect(() => {
    let user = getData();

    setUserProfile(user);
  }, []);

  const processLogout = () => {
    navigate("/");
    logOut();
  };

  return (
    <>
      <div className="lg-top-navbar-wrapper">
        <div>
          <div className="logo-wrapper">
            <p className="logo">{getFirstLetter(userProfile?.name)}</p>
          </div>
        </div>
        <div className="text-wrapper" onClick={handleClick}>
          <h6>{userProfile?.name}</h6>
          <span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.39229 12.0516C9.72823 12.425 10.2751 12.4219 10.6079 12.0516L13.4829 8.857C13.8188 8.48434 13.6852 8.182 13.1845 8.182H6.81567C6.31489 8.182 6.18363 8.48746 6.51723 8.857L9.39229 12.0516Z"
                fill="#213F7D"
              />
            </svg>
          </span>
        </div>
        <div className="notification-wrapper">
          <NotificationsIcon fontSize="medium" color="secondary" />
          <span className="indicator"></span>
        </div>
      </div>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={{
          style: {
            width: "25ch",
          },
        }}
      >
        <MenuItem onClick={processLogout}>
          <div className="menu-item">
            <p className="menu-item-text">Logout</p>
          </div>
        </MenuItem>
      </Menu>
    </>
  );
};

export default LGUserSideNav;
