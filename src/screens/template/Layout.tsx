import { Outlet } from "react-router-dom";
import "./../../scss/layout.scss";
import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import CssBaseline from "@mui/material/CssBaseline";
import { getToken } from "./../../utils/LocalStorage";
import SearchIcon from "@mui/icons-material/Search";
import LGUserSideNav from "../../components/widgets/LGUserSideNav";
import SMUserSideNav from "../../components/widgets/SMUserSideNav";

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

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { window } = props;
  const container =
    window !== undefined ? () => window().document.body : undefined;

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
                  <input type="text" placeholder="Search " />
                  <span className="">
                    <SearchIcon fontSize="small" color="secondary" />
                  </span>
                </div>
              </div>

              <div className="right-nav-section">
                <div className="sm-avatar">
                  <SMUserSideNav />
                </div>

                <span className="username-text">
                  <LGUserSideNav />
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
