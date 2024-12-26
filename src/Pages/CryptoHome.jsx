import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import { styled, keyframes } from "@mui/system";
import Navbar from "../Components/Navbar";
import CryptoListTable from "../Components/Tables/CryptoListTable";
import TrendingCoins from "../Components/Boxes/TrendingCoins";
import MarketCap from "../Components/Boxes/MarketCap";
import FearGreedMeter from "../Components/Boxes/FearGreedMeter";
import { useNavValueContext } from "../Context/NavValueContext";
import Footer from "../Components/Footer";
import ScrollToTop from "../Components/ScrollToTop";

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

const CryptoHome = () => {

  const [loading, setLoading] = useState(false);
  const [totalGlobalMarketCap, setTotalGlobalMarketCap] = useState(0);
  const [marketCap24hChange, setMarketCap24hChange] = useState(0);
  const [total24hVolume, setTotal24hVolume] = useState(0);
  const [totalGlobalCoins, setTotalGlobalCoins] = useState(0);
  const [totalGlobalExchanges, setTotalGlobalExchanges] = useState(0);

  const [top2DominantCoins, setTop2DominantCoins] = useState([]);
  const [top2DominantCoinsPercentage, setTop2DominantCoinsPercentage] = useState([]);

  const { setTotalMarketCap, setTotalMarketCapChange, setTotal24hrsVolume, setTotal24hrsVolumeChange, setTotalCoins, setTotalExchanges, set2DominantCoins, setTop2DominantCoinsChange } = useNavValueContext();

  useEffect(() => {
    window.scroll(0, 0);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleGetGlobalMarketCap = (
    globalMarketCap,
    globalMarketCap24hChange,
    global24hVolume,
    globalTotalCoins,
    globalTotalExchanges,
    top2DominantCoins,
    top2DominantCoinsPercentage
  ) => {
    try {
      setTotalGlobalMarketCap(globalMarketCap);
      setMarketCap24hChange(globalMarketCap24hChange);
      setTotal24hVolume(global24hVolume);
      setTotalGlobalCoins(globalTotalCoins);
      setTotalGlobalExchanges(globalTotalExchanges);

      setTop2DominantCoins(top2DominantCoins);
      setTop2DominantCoinsPercentage(top2DominantCoinsPercentage);

      //save to context so we can use it in other jsx files
      setTotalMarketCap(globalMarketCap);
      setTotalMarketCapChange(globalMarketCap24hChange);
      setTotal24hrsVolume(global24hVolume);
      setTotal24hrsVolumeChange(globalMarketCap24hChange);
      setTotalCoins(globalTotalCoins);
      setTotalExchanges(globalTotalExchanges);
      set2DominantCoins(top2DominantCoins);
      setTop2DominantCoinsChange(top2DominantCoinsPercentage);
      
    } catch (error) {
      console.log(error);
    }
  };

  //TODO: To Filters, Search Bar, converter, and more
  return (
    <div>
      <Navbar 
        totalMarketCap={totalGlobalMarketCap} 
        total24hVolume={total24hVolume} 
        marketCapChange={marketCap24hChange} 
        totalCoins={totalGlobalCoins} 
        totalExchanges={totalGlobalExchanges}
        top2DominantCoins={top2DominantCoins}
        top2DominantCoinsChange={top2DominantCoinsPercentage}
      />
      <StyledBox>
        <AnimatedBackground />
        <Container
          maxWidth="xl"
          sx={{ position: "relative", zIndex: 1, mt: { xs: 5, md: 14 } }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              color: "#fff",
              fontWeight: "500",
              fontFamily: "Kanit",
            }}
          >
            Crypto Market Overview by Market cap
          </Typography>
          <Typography
            component="h6"
            gutterBottom
            sx={{
              color: "#ccc",
              fontWeight: "500",
              mb: 4,
              fontFamily: "Kanit",
            }}
          >
            The global cryptocurrency market cap today is $
            {totalGlobalMarketCap === 0 ? parseFloat(localStorage.getItem("totalMarketCap") / 1e12)?.toFixed(2) : (totalGlobalMarketCap / 1e12).toFixed(2)} Trillion, a {" "}
            <span
              style={{ color: parseFloat(localStorage.getItem("totalMarketCapChange")) >= 0 ? "#2ecc71" : "#cb4335" }}
            >
              {parseFloat(localStorage.getItem("totalMarketCapChange")) >= 0 ? "▲" : "▼"} {parseFloat(localStorage.getItem("totalMarketCapChange"))?.toFixed(2)}%
            </span> change in the last 24 hours.
          </Typography>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {/* MARKET CAP & 24 HR VOLUME */}
            <Grid item xs={12} md={4}>
              <MarketCap
                loading={loading}
                handleGetGlobalMarketCap={handleGetGlobalMarketCap}
              />
            </Grid>

            {/* TRENDING COINS */}
            <Grid item xs={12} md={4}>
              <TrendingCoins loading={loading} />
            </Grid>

            {/* FEAR GREED METER */}
            <Grid item xs={12} md={4}>
              <FearGreedMeter loading={loading} />
            </Grid>
          </Grid>
          {/* CRYTPO TABLE */}
          <CryptoListTable />
        </Container>
      </StyledBox>
      <ScrollToTop/>
      <Footer/>
    </div>
  );
};

export default CryptoHome;
