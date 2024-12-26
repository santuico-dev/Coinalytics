import React from "react";
import { Grid, Typography, ThemeProvider } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

import { createTheme, styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const Footer = () => {
  const navigator = useNavigate();

  //navigate to learn page with sectionID and sectionName provided so it will be directed to that section
  const handleNavigateToLearnPage = (sectionID, sectionName) => {
    try {
      navigator(`/learn/${sectionID}/${sectionName}`, { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const resourceSection = [
    {
      rSectionTitle: "Blockchain Technology",
      rSectionID: "blockchain",
      rSectionName: "blockchain",
    },
    {
      rSectionTitle: "Latest News",
      rSectionID: "events",
      rSectionName: "latest-news",
    },
  ];

  const helpSection = [
    {
      hSectionTitle: "What is Cryptocurrency",
      hSectionID: "blockchain",
      hSectionName: "what-is-crypto",
    },
    {
      hSectionTitle: "How to Earn Crypto",
      hSectionID: "blockchain",
      hSectionName: "how-to-earn-crypto-currency",
    },
  ];

  return (
    <div>
      <ThemeProvider theme={theme}>
        <div
          style={{
            backgroundColor: "#1c1d1d",
            padding: "20px",
            color: "white",
          }}
        >
          <Grid container spacing={5} sx={{ padding: { xs: 2, md: 2 } }}>
            {/* Logo */}
            <Grid
              item
              xs={12}
              md={2.4}
              sx={{ textAlign: { xs: "center", md: "left" } }}
            >
              <Typography
                sx={{
                  fontSize: { xs: 12, md: 20 },
                  fontFamily: "Kanit",
                  fontWeight: "bold",
                  mb: 0.8,
                }}
              >
                Coinalytics
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 12, md: 13 },
                  fontFamily: "Inter",
                }}
              >
                Crypto Coin Analytics Platform tailored for crypto peeps and
                enthusiasts.
              </Typography>
            </Grid>

            {/* Join Us */}
            <Grid
              item
              xs={12}
              md={2.4}
              sx={{ textAlign: { xs: "center", md: "left" } }}
            >
              <Typography
                sx={{
                  fontSize: { xs: 12, md: 15 },
                  fontFamily: "Kanit",
                  fontWeight: "bold",
                }}
              >
                Join Us
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 8, md: 12 },
                  fontFamily: "Kanit",
                  cursor: "pointer",
                }}
              >
                <p
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <GitHubIcon
                    sx={{ color: "#fff", fontSize: { xs: 16, md: 20 }, mr: 1 }}
                  />
                  GitHub
                </p>
              </Typography>
            </Grid>

            {/* Links */}
            <Grid
              item
              xs={12}
              md={2}
              sx={{ textAlign: { xs: "center", md: "left" } }}
            >
              <Typography
                sx={{
                  fontSize: { xs: 12, md: 15 },
                  fontFamily: "Kanit",
                  fontWeight: "bold",
                }}
              >
                Resource
              </Typography>
              {resourceSection?.map((rSection, rIndex) => (
                <Typography
                  key={rIndex}
                  sx={{
                    fontSize: { xs: 8, md: 12 },
                    fontFamily: "Kanit",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                  onClick={() =>
                    handleNavigateToLearnPage(
                      rSection?.rSectionID,
                      rSection?.rSectionName
                    )
                  }
                >
                  {rSection?.rSectionTitle}
                </Typography>
              ))}
            </Grid>
            {/* Privacy & Policy */}
            <Grid
              item
              xs={12}
              md={2.4}
              sx={{ textAlign: { xs: "center", md: "left" } }}
            >
              <Typography
                sx={{
                  fontSize: { xs: 12, md: 15 },
                  fontFamily: "Kanit",
                  fontWeight: "bold",
                }}
              >
                Help
              </Typography>

              {helpSection?.map((hSection, hIndex) => (
                <Typography
                  key = {hIndex}
                  sx={{
                    fontSize: { xs: 8, md: 12 },
                    fontFamily: "Kanit",
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                  onClick = {() => handleNavigateToLearnPage(hSection?.hSectionID, hSection?.hSectionName)}
                >
                  {hSection?.hSectionTitle}
                </Typography>
              ))}
            </Grid>

            <Grid
              item
              xs={12}
              md={2.4}
              sx={{ textAlign: { xs: "center", md: "left" } }}
            >
              <Typography
                sx={{
                  fontSize: { xs: 12, md: 15 },
                  fontFamily: "Kanit",
                  fontWeight: "bold",
                }}
              >
                Know more
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 8, md: 12 },
                  fontFamily: "Kanit",
                  cursor: "pointer",
                  textDecoration: 'underline'
                }}
                onClick={() => navigator("/about")}
              >
                About
              </Typography>
            </Grid>
          </Grid>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default Footer;
