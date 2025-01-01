import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Divider,
  Paper,
} from "@mui/material";
import { keyframes, styled } from "@mui/system";
import Navbar from "../Components/Navbar";
import { useNavValueContext } from "../Context/NavValueContext";
import about_pic_1 from "../assets/about_pic_1.png";
import about_pic_2 from "../assets/about_pic_3.png";
import Footer from "../Components/Footer";
import { AutoAwesome, Code, TipsAndUpdates } from "@mui/icons-material";
import ScrollToTop from "../Components/ScrollToTop";
import Aos from "aos";
import { useConversionContext } from "../Context/ConversionContext";

/*
***************************
  ABOUT COINALYTICS
***************************
*/

// ANIMATIONS

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

const StyledBox = styled(Box)({
  minHeight: "100vh",
  background: "linear-gradient(135deg, #000000, #0a0a0a, #111111)",
  position: "relative",
  padding: "2rem 0",
  "& *": {
    fontFamily: "Kanit, sans-serif",
  },
});

const MainContainer = styled(Box)({
  padding: "2rem",
  background: "transparent",
  backdropFilter: "blur(10px)",
  marginBottom: "2rem",
});

const StyledImage = styled("img")({
  width: "100%",
  height: "400px",
  objectFit: "cover",
  objectPosition: "center",
  borderRadius: "16px",
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: theme.spacing(2),
  height: "100%",
  color: "#ffffff",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    background: "rgba(255, 255, 255, 0.08)",
  },
}));

const About = () => {
  const [loading, setLoading] = useState(false);
  const [testing, setTesting] = useState("");

  const {
    totalMarketCap,
    total24hVolume,
    totalCoins,
    totalExchanges,
    top2DominantCoins,
    top2DominantCoinsChange,
    totalMarketCapChange,
  } = useNavValueContext();

  const { conversionValue } = useConversionContext();

  useEffect(() => {
    Aos.init();
    window.scrollTo(0, 0);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      <Navbar
        totalMarketCap={totalMarketCap}
        total24hVolume={total24hVolume}
        marketCapChange={totalMarketCapChange}
        totalCoins={totalCoins}
        totalExchanges={totalExchanges}
        top2DominantCoins={top2DominantCoins}
        top2DominantCoinsChange={top2DominantCoinsChange}
      />
      <StyledBox>
        <AnimatedBackground />
        <Container
          maxWidth="xl"
          sx={{ position: "relative", zIndex: 1, mt: { xs: 5, md: 15 } }}
        >
          <Typography
            data-aos="fade-right"
            data-aos-delay="200"
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              color: "#fff",
              fontWeight: "500",
              fontFamily: "Kanit",
            }}
          >
            About Coinalytics
          </Typography>

          <Divider
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              margin: "1.5rem 0",
            }}
          />

          <MainContainer>
            {/* First Section */}
            <Grid container spacing={4} alignItems="center" sx={{ mb: 4 }}>
              <Grid item xs={12} md={6} data-aos="fade-right" data-aos-delay="200">
                <StyledPaper>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 3,
                    }}
                  >
                    <AutoAwesome
                      sx={{
                        mr: 1.6,
                        color: "#ffffff",
                        fontSize: { xs: "1.5rem", md: "2rem" },
                      }}
                    />
                    <Typography
                      sx={{
                        color: "#fff",
                        fontWeight: "bold",
                        fontFamily: "Inter",
                        fontSize: { xs: "1.5rem", md: "1.7rem" },
                      }}
                    >
                      What is Coinalytics
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      color: "rgba(255, 255, 255, 0.7)",
                      fontSize: "1.1rem",
                      lineHeight: 1.8,
                    }}
                  >
                    Coinalytics is a simple cryptocurrency analysis website that
                    provides essential information about different
                    cryptocurrencies circulating the market. It is designed to
                    help users make informed decisions about their investments
                    or view the latest news about the cryptocurrency market.
                  </Typography>
                </StyledPaper>
              </Grid>
              <Grid item xs={12} md={6} data-aos="fade-left" data-aos-delay="400">
                <StyledImage src={about_pic_1} alt="Cryptocurrency Analysis" />
                <Typography
                  align="center"
                  sx={{
                    color: "rgba(255, 255, 255, 0.5)",
                    fontSize: "0.8rem",
                    lineHeight: 1.8,
                  }}
                >
                  https://www.bitwave.io/blog/converting-cryptocurrency-to-a-stablecoin-is-taxable-3-scenarios
                </Typography>
              </Grid>
            </Grid>

            {/* Second Section */}
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6} data-aos="fade-down" data-aos-delay="600">
                <StyledImage src={about_pic_2} alt="Our Mission" />
                <Typography
                  align="center"
                  sx={{
                    color: "rgba(255, 255, 255, 0.5)",
                    fontSize: "0.8rem",
                    lineHeight: 1.8,
                  }}
                >
                  https://www.pymnts.com/blockchain/bitcoin/2021/crypto-market-tops-1-trillion-as-bitcoin-smashes-records/
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} data-aos="fade-up" data-aos-delay="800">
                <StyledPaper>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 3,
                    }}
                  >
                    <TipsAndUpdates
                      sx={{
                        mr: 1.6,
                        color: "#ffffff",
                        fontSize: { xs: "1.5rem", md: "2rem" },
                      }}
                    />
                    <Typography
                      sx={{
                        color: "#fff",
                        fontWeight: "bold",
                        fontFamily: "Inter",
                        fontSize: { xs: "1.5rem", md: "1.7rem" },
                      }}
                    >
                      {testing}Project Mission
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      color: "rgba(255, 255, 255, 0.7)",
                      fontSize: "1.1rem",
                      lineHeight: 1.8,
                    }}
                  >
                    Coinalytics is a simple cryptocurrency analysis website that
                    provides essential information about different
                    cryptocurrencies circulating the market. It is designed to
                    help users make informed decisions about their investments
                    or view the latest news about the cryptocurrency market.
                  </Typography>
                </StyledPaper>
              </Grid>
            </Grid>
          </MainContainer>
        </Container>
      </StyledBox>
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default About;
