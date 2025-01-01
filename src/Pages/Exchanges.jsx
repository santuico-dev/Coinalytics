import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import { styled, keyframes } from "@mui/system";
import Navbar from "../Components/Navbar";
import ExchangesTable from "../Components/Tables/ExchangesTable";
import { useNavValueContext } from "../Context/NavValueContext";
import Aos from "aos";

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

const Exchanges = () => {
  useEffect(() => {
    Aos.init();
    window.scrollTo(0, 0);
  }, []);

  //cyrpto exchanges Data
  const [topThreeExchanges, setTopThreeExchanges] = useState([]);

  //navbar statistics
  const {
    totalMarketCap,
    total24hVolume,
    totalCoins,
    totalExchanges,
    top2DominantCoins,
    top2DominantCoinsChange,
    totalMarketCapChange,
  } = useNavValueContext();

  const handleTopThreeExchanges = (exchangeName) => {
    try {
      setTopThreeExchanges(exchangeName.map((exchange) => exchange.name));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {totalMarketCap === 0 ? (
        <Navbar
          totalMarketCap={localStorage.getItem("totalMarketCap")}
          total24hVolume={localStorage.getItem("total24hVolume")}
          marketCapChange={localStorage.getItem("totalMarketCapChange")}
          totalCoins={localStorage.getItem("totalCoins")}
          totalExchanges={localStorage.getItem("totalExchanges")}
          top2DominantCoins={localStorage.getItem("top2DominantCoins")}
          top2DominantCoinsChange={localStorage.getItem(
            "top2DominantCoinsChange"
          )}
        />
      ) : (
        <Navbar
          totalMarketCap={totalMarketCap}
          total24hVolume={total24hVolume}
          marketCapChange={totalMarketCapChange}
          totalCoins={totalCoins}
          totalExchanges={totalExchanges}
          top2DominantCoins={top2DominantCoins}
          top2DominantCoinsChange={top2DominantCoinsChange}
        />
      )}
      <StyledBox>
        <AnimatedBackground />
        <Container
          maxWidth="xl"
          sx={{ position: "relative", zIndex: 1, mt: { xs: 5, md: 14 } }}
        >
          <Typography
            data-aos="fade-right"
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              color: "#fff",
              fontWeight: "500",
              fontFamily: "Kanit",
            }}
          >
            Top Crypto Exchanges Ranked by Trust Score
          </Typography>
          <Typography
            data-aos="fade-down"
            data-aos-delay="200"
            component="h6"
            gutterBottom
            sx={{
              color: "#ccc",
              fontWeight: "500",
              mb: 4,
              fontFamily: "Kanit",
            }}
          >
            {topThreeExchanges.length > 0
              ? `As of today, we track 218 crypto exchanges (CEX). Currently, the 3 largest cryptocurrency exchanges are ${
                  topThreeExchanges[0] || ""
                }, ${topThreeExchanges[1] || ""}, and ${
                  topThreeExchanges[2] || ""
                }.`
              : "Loading..."}
          </Typography>
          {/* EXCHANGES TABLE */}
          <ExchangesTable handleTopThreeExchanges={handleTopThreeExchanges} />
        </Container>
      </StyledBox>
    </div>
  );
};

export default Exchanges;
