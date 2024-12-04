import * as React from "react";
import {
  Box,
  List,
  Toolbar,
  Divider,
  ListItem,
  IconButton,
  CssBaseline,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink, Outlet } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Drawer } from "@/features/drawer";
import { AppBar } from "@/features/appbar";
import { DrawerHeader } from "@/features/drawerheader";
import { removeItem } from "@/shared/lib/helpers";

export default function MainLayout() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        bgcolor: "palette.action.disabled",
      }}>
      <CssBaseline />
      <AppBar open={open}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: "none" },
            ]}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            { name: "Home", link: "home", icon: <HomeIcon /> },
            { name: "History", link: "history", icon: <HistoryIcon /> },
            { name: "Logout", link: "signin", icon: <LogoutIcon /> },
          ].map(({ name, link, icon }) => (
            <ListItem key={name} disablePadding sx={{ display: "block" }}>
              <NavLink to={link} style={{ textDecoration: "none" }} onClick={() => {
                if (name === "Logout") {
                  removeItem("session");
                }
              }}>
                {({ isActive }) => (
                  <ListItemButton
                    sx={[
                      {
                        minHeight: 48,
                        px: 2.5,
                        backgroundColor: isActive ? "primary.light" : "transparent",
                        "&:hover": {
                          backgroundColor: isActive ? "primary.light" : "transparent",
                        },
                      },
                      open ? { justifyContent: "initial" } : { justifyContent: "center" },
                    ]}>
                    <ListItemIcon
                      sx={[
                        {
                          minWidth: 0,
                          justifyContent: "center",
                        },
                        open ? { mr: 3 } : { mr: "auto" },
                      ]}>
                      {icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={name}
                      sx={{
                        opacity: open ? 1 : 0,
                        color: isActive ? "white" : "black",
                      }}
                    />
                  </ListItemButton>
                )}
              </NavLink>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, overflow: "auto" }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
