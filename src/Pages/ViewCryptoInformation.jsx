import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Link,
  styled,
  keyframes,
  Container,
  Tooltip,
} from "@mui/material";
import { Sparklines, SparklinesLine } from "react-sparklines";
import {
  Language,
  Description,
  Article,
  InfoOutlined,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useNavValueContext } from "../Context/NavValueContext";
import Navbar from "../Components/Navbar";
import CoinInformationCard from "../Components/Cards/CoinInformationCard";
import ScrollToTop from "../Components/ScrollToTop";
import Footer from "../Components/Footer";

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

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: theme.spacing(2),
  height: "100%",
  color: "#ffffff",
  marginBottom: 5,
}));

const ViewCryptoInformation = () => {
  const { coinSymbol } = useParams();
  const navigator = useNavigate();
  const [coinInformation, setCoinInformation] = useState({});
  const [coinSparkLine, setCoinSparkLine] = useState([]);
  const [fetchingLoading, setFetchingLoading] = useState(false);

  const {
    totalMarketCap,
    total24hVolume,
    totalCoins,
    totalExchanges,
    top2DominantCoins,
    top2DominantCoinsChange,
    totalMarketCapChange,
  } = useNavValueContext();

  useEffect(() => {
    window.scrollTo(0,0)
    coinSymbol
      ? fetchCoinInformation()
      : navigator("/cryptolist", { replace: true });
  }, [coinSymbol]);

  const fetchCoinInformation = async () => {
    try {
      setFetchingLoading(true);

      const [coinSparklineDataResponse, coinInfoResponse] = await Promise.all([
        await axios.get(
          ``,
          {
            signal: AbortSignal.timeout(8000),
            cache: true,
          }
        ),

        await axios.get(
          ``,
          {
            signal: AbortSignal.timeout(8000),
            cache: true,
          }
        ),
      ]);

      if (coinSparklineDataResponse?.data && coinInfoResponse?.data) {
        const _coinSparkLine = coinSparklineDataResponse?.data?.Data?.Data.map(
          (sparkLineData) => ({
            ...sparkLineData,
          })
        );

        setCoinInformation(coinInfoResponse?.data?.Data);
        setCoinSparkLine(_coinSparkLine);
        setFetchingLoading(false);

        return _coinSparkLine;
      }

      return [];
    } catch (error) {
      console.log(error);
      setFetchingLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "transparent" }}>
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
      <StyledBox sx={{ minHeight: "calc(100vh - 64px)", pb: { xs: 4, sm: 6 } }}>
        <AnimatedBackground />
        <Container
          maxWidth="xl"
          sx={{
            position: "relative",
            zIndex: 1,
            mt: { xs: 2, sm: 4, md: 14 },
            px: { xs: 1.5, sm: 3, md: 4 },
          }}
        >
          <Grid
            container
            spacing={{ xs: 3, sm: 4 }}
            sx={{ mb: { xs: 4, sm: 6 } }}
          >
            {/* Coin Information */}
            <Grid item xs={12} md={4}>
              <StyledCard>
                <CoinInformationCard coinInformation={coinInformation} />
              </StyledCard>
            </Grid>

            {/* Sparkline Chart */}
            <Grid item xs={12} md={8}>
              <Box sx={{ width: "100%", height: "100%" }}>
                <StyledCard>
                  <CardContent
                    sx={{
                      p: { xs: 2.5, sm: 3 },
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      variant="h6"
                      align="center"
                      sx={{
                        mb: 3,
                        color: "#ffffff",
                        fontWeight: 600,
                        fontSize: { xs: "1.1rem", sm: "1.8rem" },
                        fontFamily: 'Kanit'
                      }}
                    >
                      {coinInformation?.NAME?.toUpperCase()} Price Chart for the previous 7d
                    </Typography>
                    <Box
                      sx={{
                        flex: 1,
                        minHeight: { xs: 220, sm: 250, md: 280 },
                        width: "100%",
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        "& > div": {
                          position: "absolute",
                          top: "50%",
                          left: 0,
                          right: 0,
                          transform: "translateY(-50%)",
                          height: "90%", 
                          "& > svg": {
                            width: "100% !important",
                            height: "100% !important",
                            preserveAspectRatio: "none",
                          },
                        },
                      }}
                    >
                      {coinSparkLine.length > 0 && (
                        <Sparklines
                          data={coinSparkLine.map((d) => d?.close)}
                          margin={2} 
                          svgWidth={1000} 
                          svgHeight={400}
                        >
                          <SparklinesLine
                            color= {coinInformation?.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD >= 0 ? "#2ecc71" : "#cb4335"}
                            style={{
                              strokeWidth: 1, 
                              fill: coinInformation?.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD >= 0 ? "#58d68d" : "#f1948a",
                            }}
                          />
                        </Sparklines>
                      )}
                    </Box>
                  </CardContent>
                </StyledCard>
              </Box>
            </Grid>

            {/* Description Section - Full Width */}
            <Grid item xs={12} sx={{ mt: 5 }}>
              <StyledCard>
                <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 3,
                      color: "#ffffff",
                      fontWeight: 600,
                      fontSize: { xs: "1.1rem", sm: "1.25rem" },
                      fontFamily: "Kanit",
                    }}
                  >
                    About {coinInformation?.NAME}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "rgba(255, 255, 255, 0.8)",
                      lineHeight: 1.7,
                      fontSize: { xs: "0.95rem", sm: "1rem" },
                      fontFamily: "Inter",
                    }}
                  >
                    {coinInformation?.ASSET_DESCRIPTION_SNIPPET ||
                      "No description available."}
                  </Typography>
                  <br />
                  <Typography
                    variant="body1"
                    sx={{
                      color: "rgba(255, 255, 255, 0.8)",
                      lineHeight: 1.7,
                      fontSize: { xs: "0.95rem", sm: "1rem" },
                      fontFamily: "Inter",
                    }}
                  >
                    {coinInformation?.ASSET_DESCRIPTION
                      ? coinInformation.ASSET_DESCRIPTION.split("##")
                          .filter((section) => section.trim() !== "")
                          .map((section, index) => {
                            const [question, ...answerLines] = section
                              .trim()
                              .split("\n");
                            const answer = answerLines.join(" ").trim();

                            return (
                              <div key={index} style={{ marginBottom: "1rem" }}>
                                <Typography
                                  variant="h6"
                                  sx={{
                                    fontWeight: 600,
                                    color: "#ffffff",
                                    fontSize: "1.1rem",
                                    fontFamily: "Inter",
                                    mb: 3,
                                  }}
                                >
                                  {question}
                                </Typography>
                                <Typography
                                  variant="body1"
                                  sx={{
                                    color: "rgba(255, 255, 255, 0.8)",
                                    lineHeight: 1.7,
                                    fontSize: { xs: "0.95rem", sm: "1rem" },
                                    fontFamily: "Inter",
                                  }}
                                  dangerouslySetInnerHTML={{
                                    __html: answer.replace(
                                      /\*\*(.*?)\*\*/g,
                                      "<b>$1</b>"
                                    ),
                                  }}
                                />
                              </div>
                            );
                          })
                      : "No description available."}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>
        </Container>
      </StyledBox>
      <Footer/>
      <ScrollToTop />
    </div>
  );
};

export default ViewCryptoInformation;
