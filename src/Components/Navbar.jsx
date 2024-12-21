import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { styled } from "@mui/material/styles";
import logoPic from "../assets/logo_1.png";
import { Link } from "react-router-dom";

const pages = [

  {pageName: 'Cryptocurrencies', pagePath: '/cryptolist'},
  {pageName: 'NFT', pagePath: '/nft'},
  {pageName: 'Exchanges', pagePath: '/exchanges'},
  {pageName: 'Learn', pagePath: '/learn'},
  {pageName: 'About Coinalytics', pagePath: '/about'},

]

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const StyledAppBar = styled(AppBar)(({ theme, scrolled }) => ({
  background: scrolled ? "rgba(0, 0, 0, 0.7)" : "transparent",
  backdropFilter: scrolled ? "blur(10px)" : "none",
  boxShadow: scrolled ? "0 4px 30px rgba(0, 0, 0, 0.1)" : "none",
  transition: "all 0.3s ease-in-out",
}));

const LogoImage = styled("img")({
  height: "90px",
  width: "auto",
  marginRight: "10px",
  objectFit: "contain",
  maxHeight: "100%",
});

const NavButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2),
  color: "white",
  display: "block",
  "&:hover": {
    background: "rgba(255, 255, 255, 0.1)",
  },
}));

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <StyledAppBar position="fixed" scrolled={scrolled ? 1 : 0}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
            >
              <LogoImage src={logoPic} alt="logo" />
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                  "& .MuiPaper-root": {
                    background: "rgba(0, 0, 0, 0.7)",
                    backdropFilter: "blur(10px)",
                  },
                }}
              >
                {pages.map((page, index) => (
                  <MenuItem
                    key={index}
                    component = {Link}
                    to = {page.pagePath}
                    sx={{ color: "white" }}
                  >
                    <Typography
                      sx={{ textAlign: "center", fontFamily: "Kanit" }}
                    >
                      {page.pageName}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box
              sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}
            >
              <LogoImage src={logoPic} alt="logo" />
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page, index) => (
                <NavButton
                  key={index}
                  component = {Link}
                  to = {page.pagePath}
                  sx={{ fontFamily: "Kanit" }}
                >
                  {page.pageName}
                </NavButton>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Menu
                sx={{
                  mt: "45px",
                  "& .MuiPaper-root": {
                    background: "rgba(0, 0, 0, 0.7)",
                    backdropFilter: "blur(10px)",
                  },
                }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={handleCloseUserMenu}
                    sx={{ color: "white" }}
                  >
                    <Typography
                      sx={{ textAlign: "center", fontFamily: "Kanit" }}
                    >
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </StyledAppBar>
    </>
  );
}

export default Navbar;
