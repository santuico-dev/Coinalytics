import React, { useEffect, useState } from "react";
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
import { styled } from "@mui/material/styles";
import logoPic from "../assets/logo_1.png";
import { Link, useNavigate } from "react-router-dom";
import ConversionChangerButton from "./Buttons/ConversionChangerButton";
import { useConversionContext } from "../Context/ConversionContext";
import { useSnackbar } from "notistack";

const pages = [
  { pageName: "Cryptocurrencies", pagePath: "/cryptolist" },
  { pageName: "Exchanges", pagePath: "/exchanges" },
  { pageName: "Learn", pagePath: "/learn" },
  { pageName: "About Coinalytics", pagePath: "/about" },
];

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

const StatsTypography = styled(Typography)(({ theme }) => ({
  fontSize: "0.75rem",
  fontFamily: "Inter",
  color: "white",
  marginBottom: "0.5rem",
  display: { xs: "none", lg: "block" },
}));

const StatsDivider = styled("span")({
  margin: "0 0.5rem",
  color: "rgba(255, 255, 255, 0.5)",
});

function Navbar({
  totalCoins,
  totalExchanges,
  totalMarketCap,
  total24hVolume,
  marketCapChange,
  top2DominantCoins,
  top2DominantCoinsChange,
}) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [changeConversionValueClickCount, setChangeConversionValueClickCount] = useState(0);
  const [enableConversionValueButton, setEnableConversionValueButton] = useState(true);

  const { enqueueSnackbar } = useSnackbar();

  const {
    currencySymbol,
    conversionValue,
    philippineConversionValue,
    usdConversionValue,
    setConversionValue,
    setCurrencySymbol,
  } = useConversionContext();

  const navigator = useNavigate();

  useEffect(() => {
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

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenNavLink = (navPath) => {
    navigator(navPath);
  };

  const handleChangeConversionValue = () => {

    setChangeConversionValueClickCount(changeConversionValueClickCount + 1);

    //guard condition to preveng spamming
    if(changeConversionValueClickCount >= 3) {

      setEnableConversionValueButton(false);
      enqueueSnackbar("You might want to calm down clicking that buddy.", {
        autoHideDuration: 6000,
        variant: 'warning',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        },
        style: {
          fontFamily: 'Kanit'
        }
      });

      setTimeout(() => {
        setChangeConversionValueClickCount(0);
        setEnableConversionValueButton(true);
      }, [6000])

      return;
    }

    //conversion changer, for now PHP => USD lang muna
    if (currencySymbol === "$") {
      setCurrencySymbol("₱");
      setConversionValue(philippineConversionValue);
    } else {
      setCurrencySymbol("$");
      setConversionValue(usdConversionValue);
    }    
  };

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          background: "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(10px)",
          padding: "0.5rem 0",
          position: "fixed",
          top: 0,
          zIndex: 1200,
        }}
      >
        {/* STATISTACS */}
        <Container maxWidth="xl">
          <StatsTypography>
            Coins:{" "}
            <span style={{ color: "#ccc" }}>
              {parseInt(totalCoins)?.toLocaleString()}
            </span>
            <StatsDivider>|</StatsDivider>
            Exchanges:{" "}
            <span style={{ color: "#ccc" }}>
              {parseInt(totalExchanges)?.toLocaleString()}
            </span>
            <StatsDivider>|</StatsDivider>
            Market Cap:{" "}
            <span style={{ color: "#ccc" }}>
              {currencySymbol}
              {(
                Math.ceil(parseFloat(totalMarketCap) * conversionValue) / 1e12
              )?.toFixed(2)}
              T
            </span>{" "}
            <span
              style={{
                color: parseFloat(marketCapChange) >= 0 ? "#2ecc71" : "#cb4335",
              }}
            >
              {parseFloat(marketCapChange) >= 0 ? "▲" : "▼"}
              {parseFloat(marketCapChange)?.toFixed(2)}%
            </span>
            <StatsDivider>|</StatsDivider>
            24h Vol:{" "}
            <span style={{ color: "#ccc" }}>
              {currencySymbol}
              {/* I did this because of the decimal placing. The decimal place is correct for USD but not in PHP */}
              {currencySymbol === "$"
                ? (
                    Math.ceil(parseFloat(total24hVolume) * conversionValue) /
                    1e9
                  )?.toFixed(2)
                : (
                    Math.ceil(parseFloat(total24hVolume) * conversionValue) /
                    1e12
                  )?.toFixed(2)}
              B
            </span>
            <StatsDivider>|</StatsDivider>
            {/* -JOSH  top2DominantCoins[0] - BTC 
            top2DominantCoins[1] - ETH*/}
            Dominance: {top2DominantCoins[0]?.toUpperCase()}{" "}
            <span style={{ color: "#ccc" }}>
              {parseFloat(top2DominantCoinsChange[0])?.toFixed(2)}%
            </span>{" "}
            | {top2DominantCoins[1]?.toUpperCase()}{" "}
            <span style={{ color: "#ccc" }}>
              {parseFloat(top2DominantCoinsChange[1])?.toFixed(2)}%
            </span>
          </StatsTypography>
        </Container>
      </Box>
      <StyledAppBar
        position="fixed"
        scrolled={scrolled ? 1 : 0}
        sx={{ top: { lg: "32px" } }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => navigator("/cryptolist", { replace: true })}
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
                    onClick={() => handleOpenNavLink(page?.pagePath)}
                    sx={{ color: "white" }}
                  >
                    <Typography
                      sx={{ textAlign: "center", fontFamily: "Kanit" }}
                    >
                      {page?.pageName}
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
                  onClick={() => handleOpenNavLink(page?.pagePath)}
                  sx={{ fontFamily: "Kanit" }}
                >
                  {page?.pageName}
                </NavButton>
              ))}
            </Box>

            <Box sx={{ mr: 2 }}>
              <ConversionChangerButton
                onClick={handleChangeConversionValue}
                currencySymbol={currencySymbol}
                isEnabled={enableConversionValueButton}
              />
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
    </Box>
  );
}

export default Navbar;
