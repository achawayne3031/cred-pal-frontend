import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import "./../../scss/sidebar.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logOut } from "../../utils/LocalStorage";

const SideBar = () => {
  const navigate = useNavigate();

  const [togClass, setTogClass] = useState("dark");

  const processLogout = () => {
    navigate("/");
    logOut();
  };

  return (
    <div className={togClass === "dark" ? "dark-wrapper" : "light-wrapper"}>
      <div className="logo-header">
        <div>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="12" fill="#FFDE02" />
            <path
              d="M8.75852 16V7.27273H12.2528C12.8949 7.27273 13.4304 7.3679 13.8594 7.55824C14.2884 7.74858 14.6108 8.01278 14.8267 8.35085C15.0426 8.68608 15.1506 9.07244 15.1506 9.50994C15.1506 9.85085 15.0824 10.1506 14.946 10.4091C14.8097 10.6648 14.6222 10.875 14.3835 11.0398C14.1477 11.2017 13.8778 11.3168 13.5739 11.3849V11.4702C13.9063 11.4844 14.2173 11.5781 14.5071 11.7514C14.7997 11.9247 15.0369 12.1676 15.2188 12.4801C15.4006 12.7898 15.4915 13.1591 15.4915 13.5881C15.4915 14.0511 15.3764 14.4645 15.1463 14.8281C14.919 15.1889 14.5824 15.4744 14.1364 15.6847C13.6903 15.8949 13.1406 16 12.4872 16H8.75852ZM10.6037 14.4915H12.108C12.6222 14.4915 12.9972 14.3935 13.233 14.1974C13.4688 13.9986 13.5866 13.7344 13.5866 13.4048C13.5866 13.1634 13.5284 12.9503 13.4119 12.7656C13.2955 12.581 13.1293 12.4361 12.9134 12.331C12.7003 12.2259 12.446 12.1733 12.1506 12.1733H10.6037V14.4915ZM10.6037 10.9247H11.9716C12.2244 10.9247 12.4489 10.8807 12.6449 10.7926C12.8438 10.7017 13 10.5739 13.1136 10.4091C13.2301 10.2443 13.2884 10.0469 13.2884 9.81676C13.2884 9.50142 13.1761 9.24716 12.9517 9.05398C12.7301 8.8608 12.4148 8.7642 12.0057 8.7642H10.6037V10.9247ZM17.7191 16.1108C17.4379 16.1108 17.1964 16.0114 16.9947 15.8125C16.7958 15.6108 16.6964 15.3693 16.6964 15.0881C16.6964 14.8097 16.7958 14.571 16.9947 14.3722C17.1964 14.1733 17.4379 14.0739 17.7191 14.0739C17.9918 14.0739 18.2305 14.1733 18.435 14.3722C18.6396 14.571 18.7418 14.8097 18.7418 15.0881C18.7418 15.2756 18.6935 15.4474 18.5969 15.6037C18.5032 15.7571 18.3796 15.8807 18.2262 15.9744C18.0728 16.0653 17.9038 16.1108 17.7191 16.1108Z"
              fill="#312C08"
            />
          </svg>
        </div>

        <div>
          <p>Beam</p>
        </div>
      </div>

      <div className="top-sidebar-line"></div>

      <List className="p-4">
        <ListItemText>MAIN</ListItemText>

        <NavLink
          to={"/user/dashboard"}
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <div className="sidebar__menu">
            <ListItemIcon className="link-icon">
              <div className="sidebar-icon">
                <svg
                  className="svg-icon"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="svg-path"
                    d="M12 6V12M9 8.25V12M6 10.5V12M4.5 15H13.5C14.3284 15 15 14.3284 15 13.5V4.5C15 3.67157 14.3284 3 13.5 3H4.5C3.67157 3 3 3.67157 3 4.5V13.5C3 14.3284 3.67157 15 4.5 15Z"
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </ListItemIcon>

            <ListItemText className="nav-item-link" primary="Dashboard" />
          </div>
        </NavLink>

        <NavLink
          to={"/user/customers"}
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <div className="sidebar__menu">
            <ListItemIcon className="link-icon">
              <div className="sidebar-icon">
                <svg
                  className="svg-icon"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="svg-path"
                    d="M12.75 15H16.5V13.5C16.5 12.2574 15.4926 11.25 14.25 11.25C13.5333 11.25 12.8949 11.5851 12.4828 12.1072M12.75 15H5.25M12.75 15V13.5C12.75 13.0078 12.6552 12.5378 12.4828 12.1072M5.25 15H1.5V13.5C1.5 12.2574 2.50736 11.25 3.75 11.25C4.46671 11.25 5.10514 11.5851 5.51718 12.1072M5.25 15V13.5C5.25 13.0078 5.34482 12.5378 5.51718 12.1072M5.51718 12.1072C6.07013 10.7258 7.42111 9.75 9 9.75C10.5789 9.75 11.9299 10.7258 12.4828 12.1072M11.25 5.25C11.25 6.49264 10.2426 7.5 9 7.5C7.75736 7.5 6.75 6.49264 6.75 5.25C6.75 4.00736 7.75736 3 9 3C10.2426 3 11.25 4.00736 11.25 5.25ZM15.75 7.5C15.75 8.32843 15.0784 9 14.25 9C13.4216 9 12.75 8.32843 12.75 7.5C12.75 6.67157 13.4216 6 14.25 6C15.0784 6 15.75 6.67157 15.75 7.5ZM5.25 7.5C5.25 8.32843 4.57843 9 3.75 9C2.92157 9 2.25 8.32843 2.25 7.5C2.25 6.67157 2.92157 6 3.75 6C4.57843 6 5.25 6.67157 5.25 7.5Z"
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </ListItemIcon>

            <ListItemText className="nav-item-link" primary="Customers" />
          </div>
        </NavLink>

        <NavLink
          to={"/user/spot-orders"}
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <div className="sidebar__menu">
            <ListItemIcon className="link-icon">
              <div className="sidebar-icon">
                <svg
                  className="svg-icon"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="svg-path"
                    d="M6 9.75V9M9 9.75V7.5M12 9.75V6M6 15.75L9 12.75L12 15.75M2.25 3H15.75M3 3H15V12C15 12.4142 14.6642 12.75 14.25 12.75H3.75C3.33579 12.75 3 12.4142 3 12V3Z"
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </ListItemIcon>

            <ListItemText className="nav-item-link" primary="Spot Orders" />
          </div>
        </NavLink>

        <NavLink
          to={"/user/margin-orders"}
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <div className="sidebar__menu">
            <ListItemIcon className="link-icon">
              <div className="sidebar-icon">
                <svg
                  className="svg-icon"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="svg-path"
                    d="M3 3V2.5H2.5V3H3ZM15 3H15.5V2.5H15V3ZM4.89645 8.64645C4.70118 8.84171 4.70118 9.15829 4.89645 9.35355C5.09171 9.54881 5.40829 9.54881 5.60355 9.35355L4.89645 8.64645ZM7.5 6.75L7.85355 6.39645C7.65829 6.20118 7.34171 6.20118 7.14645 6.39645L7.5 6.75ZM9.75 9L9.39645 9.35355C9.59171 9.54881 9.90829 9.54881 10.1036 9.35355L9.75 9ZM13.1036 6.35355C13.2988 6.15829 13.2988 5.84171 13.1036 5.64645C12.9083 5.45118 12.5917 5.45118 12.3964 5.64645L13.1036 6.35355ZM5.64645 15.3964C5.45118 15.5917 5.45118 15.9083 5.64645 16.1036C5.84171 16.2988 6.15829 16.2988 6.35355 16.1036L5.64645 15.3964ZM9 12.75L9.35355 12.3964C9.15829 12.2012 8.84171 12.2012 8.64645 12.3964L9 12.75ZM11.6464 16.1036C11.8417 16.2988 12.1583 16.2988 12.3536 16.1036C12.5488 15.9083 12.5488 15.5917 12.3536 15.3964L11.6464 16.1036ZM2.25 2.5C1.97386 2.5 1.75 2.72386 1.75 3C1.75 3.27614 1.97386 3.5 2.25 3.5V2.5ZM15.75 3.5C16.0261 3.5 16.25 3.27614 16.25 3C16.25 2.72386 16.0261 2.5 15.75 2.5V3.5ZM3 3.5H15V2.5H3V3.5ZM14.5 3V12H15.5V3H14.5ZM14.25 12.25H3.75V13.25H14.25V12.25ZM3.5 12V3H2.5V12H3.5ZM3.75 12.25C3.61193 12.25 3.5 12.1381 3.5 12H2.5C2.5 12.6904 3.05964 13.25 3.75 13.25V12.25ZM14.5 12C14.5 12.1381 14.3881 12.25 14.25 12.25V13.25C14.9404 13.25 15.5 12.6904 15.5 12H14.5ZM5.60355 9.35355L7.85355 7.10355L7.14645 6.39645L4.89645 8.64645L5.60355 9.35355ZM7.14645 7.10355L9.39645 9.35355L10.1036 8.64645L7.85355 6.39645L7.14645 7.10355ZM10.1036 9.35355L13.1036 6.35355L12.3964 5.64645L9.39645 8.64645L10.1036 9.35355ZM6.35355 16.1036L9.35355 13.1036L8.64645 12.3964L5.64645 15.3964L6.35355 16.1036ZM8.64645 13.1036L11.6464 16.1036L12.3536 15.3964L9.35355 12.3964L8.64645 13.1036ZM2.25 3.5H15.75V2.5H2.25V3.5Z"
                    fill="white"
                  />
                </svg>
              </div>
            </ListItemIcon>

            <ListItemText className="nav-item-link" primary="Margin Orders" />
          </div>
        </NavLink>

        <NavLink
          to={"/user"}
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <div className="sidebar__menu">
            <ListItemIcon className="link-icon">
              <div className="sidebar-icon">
                <svg
                  className="svg-icon"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="svg-path"
                    d="M6 5.25L15 5.25M15 5.25L12 2.25M15 5.25L12 8.25M12 12.75L3 12.75M3 12.75L6 15.75M3 12.75L6 9.75"
                    stroke="#FFDE02"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </ListItemIcon>

            <ListItemText className="nav-item-link" primary="Wallet" />
          </div>
        </NavLink>

        <div className="sidebar-line"></div>

        <ListItemText>OTHER</ListItemText>

        <NavLink
          to={"/user/notification"}
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <div className="sidebar__menu">
            <ListItemIcon className="link-icon">
              <div className="sidebar-icon">
                <svg
                  className="svg-icon"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="svg-path"
                    d="M11.25 12.75H15L13.9463 11.6963C13.6605 11.4105 13.5 11.023 13.5 10.6188V8.25C13.5 6.29067 12.2478 4.62382 10.5 4.00606V3.75C10.5 2.92157 9.82843 2.25 9 2.25C8.17157 2.25 7.5 2.92157 7.5 3.75V4.00606C5.75221 4.62382 4.5 6.29067 4.5 8.25V10.6188C4.5 11.023 4.33946 11.4105 4.0537 11.6963L3 12.75H6.75M11.25 12.75V13.5C11.25 14.7426 10.2426 15.75 9 15.75C7.75736 15.75 6.75 14.7426 6.75 13.5V12.75M11.25 12.75H6.75"
                    stroke="#D9D8D5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </ListItemIcon>

            <ListItemText className="nav-item-link" primary="Notification" />
          </div>
        </NavLink>

        <NavLink
          to={"/user/settings"}
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <div className="sidebar__menu">
            <ListItemIcon className="link-icon">
              <div className="sidebar-icon">
                <svg
                  className="svg-icon"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="svg-path"
                    d="M7.74347 3.23798C8.06327 1.92067 9.93673 1.92067 10.2565 3.23798C10.4631 4.08895 11.4381 4.49278 12.1859 4.03714C13.3435 3.33179 14.6682 4.65653 13.9629 5.81414C13.5072 6.56194 13.9111 7.53688 14.762 7.74347C16.0793 8.06327 16.0793 9.93673 14.762 10.2565C13.9111 10.4631 13.5072 11.4381 13.9629 12.1859C14.6682 13.3435 13.3435 14.6682 12.1859 13.9629C11.4381 13.5072 10.4631 13.9111 10.2565 14.762C9.93673 16.0793 8.06327 16.0793 7.74347 14.762C7.53688 13.9111 6.56194 13.5072 5.81414 13.9629C4.65653 14.6682 3.33179 13.3435 4.03714 12.1859C4.49278 11.4381 4.08895 10.4631 3.23798 10.2565C1.92067 9.93673 1.92067 8.06327 3.23798 7.74347C4.08895 7.53688 4.49278 6.56194 4.03714 5.81414C3.33179 4.65653 4.65653 3.33179 5.81414 4.03714C6.56194 4.49278 7.53688 4.08895 7.74347 3.23798Z"
                    stroke="#D9D8D5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    className="svg-path"
                    d="M11.25 9C11.25 10.2426 10.2426 11.25 9 11.25C7.75736 11.25 6.75 10.2426 6.75 9C6.75 7.75736 7.75736 6.75 9 6.75C10.2426 6.75 11.25 7.75736 11.25 9Z"
                    stroke="#D9D8D5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </ListItemIcon>

            <ListItemText className="nav-item-link" primary="Settings" />
          </div>
        </NavLink>

        <NavLink
          to={"/"}
          onClick={processLogout}
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <div className="sidebar__menu">
            <ListItemIcon className="link-icon">
              <div className="sidebar-icon">
                <svg
                  className="svg-icon"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="svg-path"
                    d="M6 3H5.25C4.00736 3 3 4.00736 3 5.25V12.75C3 13.9926 4.00736 15 5.25 15H6M9 12L6 9M6 9L9 6M6 9L15 9"
                    stroke="#D9D8D5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </ListItemIcon>

            <ListItemText className="nav-item-link" primary="Logout" />
          </div>
        </NavLink>
      </List>

      <div className="screen-mode-wrapper"></div>
    </div>
  );
};

export default SideBar;
