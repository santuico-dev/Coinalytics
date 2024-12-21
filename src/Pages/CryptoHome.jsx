import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
  Avatar,
  Pagination,
  setRef,
} from "@mui/material";
import { styled, keyframes } from "@mui/system";
import Navbar from "../Components/Navbar";
import CryptoListTable from "../Components/Tables/CryptoListTable";
import axios from "axios";

/*
***************************
  ANIMATIONS  
***************************
*/

const rotateAndFade = keyframes`
  0% {
    transform: rotate(0deg);
    opacity: 0;
  }
  50% { opacity: 0.3; }
  100% {
    transform: rotate(360deg);
    opacity: 0;
  }
`;

const drift = keyframes`
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(100px, 50px);
  }
  100% {
    transform: translate(0, 0);
  }
`;

const GlassContainer = styled(Paper)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  color: "#fff",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

const BackgroundAnimation = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  overflow: "hidden",
  zIndex: 0,
  pointerEvents: "none",
});

const Dust = styled("div")(({ size = 2, left, top, duration = 15 }) => ({
  position: "absolute",
  width: `${size}px`,
  height: `${size}px`,
  background: "rgba(255, 255, 255, 0.1)",
  borderRadius: "50%",
  left: `${left}%`,
  top: `${top}%`,
  animation: `${rotateAndFade} ${duration}s infinite linear`,
}));

const FloatingSquare = styled("div")(
  ({ size = 20, left, top, duration = 20 }) => ({
    position: "absolute",
    width: `${size}px`,
    height: `${size}px`,
    background: "rgba(255, 255, 255, 0.02)",
    left: `${left}%`,
    top: `${top}%`,
    animation: `${drift} ${duration}s infinite ease-in-out`,
  })
);

const StyledBox = styled(Box)({
  minHeight: "100vh",
  background: "linear-gradient(135deg, #000000, #0a0a0a, #111111)",
  position: "relative",
  padding: "2rem 0",
  "& *": {
    fontFamily: "Kanit, sans-serif",
  },
});

const AnimatedBackground = () => {
  const dustParticles = Array.from({ length: 50 }, (_, i) => ({
    size: Math.random() * 3 + 1,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: Math.random() * 10 + 10,
  }));

  const squares = Array.from({ length: 15 }, (_, i) => ({
    size: Math.random() * 30 + 20,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: Math.random() * 15 + 15,
  }));

  return (
    <BackgroundAnimation>
      {dustParticles.map((particle, i) => (
        <Dust key={`dust-${i}`} {...particle} />
      ))}
      {squares.map((square, i) => (
        <FloatingSquare key={`square-${i}`} {...square} />
      ))}
    </BackgroundAnimation>
  );
};

/*
***************************
  FETCHING  
***************************
*/



const CryptoHome = () => {

  const [fearGreedIndexValueClassification, setFearGreedIndexValueClassification] = useState('');
  const [fearGreedValue, setFearGreedValue] = useState(0);
  
  useEffect(() => {
    fetchFearGreedIndex();
  }, [])

  const fetchFearGreedIndex = async () => {
    try {
      await axios.get(
        "https://api.alternative.me/fng/",
        {
          signal: AbortSignal.timeout(8000),
          cache: true
        }
      ).then((response) => {
        response?.data?.data?.map(async (data) => {
          setFearGreedIndexValueClassification(await data?.value_classification);
          setFearGreedValue(await data?.value);
        })  
      })
    } catch (error) {
      console.log(error);
    }
  }

  const statsBoxes = [
    { title: "Total Market Cap", value: "$2.5T" },
    { title: "Total Volume 24h", value: "$125B" },
    { title: "Fear Greed Index", value: fearGreedValue },
  ];

  return (
    <div>
      <Navbar />
      <StyledBox>
        <AnimatedBackground />
        <Container
          maxWidth="xl"
          sx={{ position: "relative", zIndex: 1, mt: { xs: 5, md: 10 } }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              color: "#fff",
              fontWeight: "500",
              mb: 4,
              fontFamily: "Kanit",
            }}
          >
            Cyrpto Market by Market Cap
          </Typography>
          {/* MEMA STATS */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {statsBoxes.map((box, index) => (
              <Grid item xs={12} md={4} key={index}>
                <GlassContainer>
                  <Typography variant="h6" gutterBottom>
                    {box.title}
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: "500" }}>
                    {box.value}
                  </Typography>
                </GlassContainer>
              </Grid>
            ))}
          </Grid>

          {/* CRYTPO TABLE */}
          <CryptoListTable/>
        </Container>
      </StyledBox>
    </div>
  );
};

export default CryptoHome;
