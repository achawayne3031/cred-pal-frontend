import { Outlet } from "react-router-dom";
import "./../../scss/layout.scss";
import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import CssBaseline from "@mui/material/CssBaseline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { getToken, logOut } from "./../../utils/LocalStorage";

const drawerWidth = 250;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const Layout = (props: Props) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (getToken() === null) {
      navigate("/");
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  });

  const [toggle, setToggle] = useState(false);
  const [editMenu, setEditMenu] = useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorElSm, setAnchorElSm] = React.useState(null);

  const openSm = Boolean(anchorElSm);
  const handleClickSm = (event: any) => {
    setAnchorElSm(event.currentTarget);
  };
  const handleCloseSm = () => {
    setAnchorElSm(null);
  };

  const { window } = props;
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const processLogout = () => {
    navigate("/");
    logOut();
  };

  return (
    <div className="dashboard-template-wrapper">
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mt: 1, mr: 2, display: { sm: "none" } }}
              className="meun-btn-icon"
            >
              <MenuIcon />
            </IconButton>

            <div className="nav-header">
              <div>
                <div className="search-wrapper">
                  {/* <input type="text" placeholder='Search for anything' /> */}
                </div>
              </div>

              <div className="right-nav-section">
                <div className="sm-avatar">
                  <Button
                    id="basic-button"
                    aria-controls={openSm ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openSm ? "true" : undefined}
                    onClick={handleClickSm}
                  >
                    <AccountCircleIcon />
                  </Button>

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
                        processLogout();
                        handleCloseSm();
                      }}
                    >
                      <div className="menu-item">
                        <p className="menu-item-text">Logout</p>
                      </div>
                    </MenuItem>
                  </Menu>
                </div>

                <span className="username-text">
                  <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <AccountCircleIcon />

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
                  </Button>
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
                    <MenuItem
                      onClick={() => {
                        processLogout();
                        handleCloseSm();
                      }}
                    >
                      <div className="menu-item">
                        <p className="menu-item-text">Logout</p>
                      </div>
                    </MenuItem>
                  </Menu>
                </span>
              </div>
            </div>
          </Toolbar>
        </AppBar>

        <Box component="nav" aria-label="mailbox folders">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            <SideBar />
          </Drawer>

          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            <SideBar />
          </Drawer>
        </Box>

        <Box
          component="main"
          className="main-content-wrapper"
          sx={{ p: 2, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Outlet />
        </Box>
      </Box>
    </div>
  );
};

export default Layout;
