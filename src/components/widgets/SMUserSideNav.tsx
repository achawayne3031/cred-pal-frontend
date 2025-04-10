import { FC, useEffect } from "react";
import "../../scss/top-navbar.scss";
import { Menu, MenuItem } from "@mui/material";
import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { getData, logOut } from "../../utils/LocalStorage";
import { IUser } from "../../interfaces/IUser";
import { getFirstLetter } from "../../utils/FuncHelper";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router";

const SMUserSideNav: FC = () => {
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = React.useState<IUser>();

  useEffect(() => {
    let user = getData();

    setUserProfile(user);
  }, []);

  const [anchorElSm, setAnchorElSm] = React.useState(null);

  const openSm = Boolean(anchorElSm);
  const handleClickSm = (event: any) => {
    setAnchorElSm(event.currentTarget);
  };
  const handleCloseSm = () => {
    setAnchorElSm(null);
  };

  const processLogout = () => {
    navigate("/");
    logOut();
  };

  return (
    <>
      <div className="sm-top-navbar-wrapper">
        <div className="text-wrapper" onClick={handleClickSm}>
          <div className="logo-wrapper">
            <p className="logo">{getFirstLetter(userProfile?.name)}</p>
          </div>

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

        <Menu
          id="basic-menu"
          anchorEl={anchorElSm}
          open={openSm}
          onClose={handleCloseSm}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          PaperProps={{
            style: {
              width: "25ch",
            },
          }}
        >
          <MenuItem
            onClick={() => {
              handleCloseSm();
            }}
          >
            <div className="notification-wrapper">
              <NotificationsIcon fontSize="medium" color="secondary" />
              <span className="indicator"></span>
              <h6>Notification</h6>
            </div>
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleCloseSm();
              processLogout();
            }}
          >
            <div className="logout-wrapper">
              <LogoutIcon fontSize="medium" />
              <h6>Logout</h6>
            </div>
          </MenuItem>
        </Menu>
      </div>
    </>
  );
};

export default SMUserSideNav;
