import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Skeleton } from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import { useConversionContext } from "../../Context/ConversionContext";

const GlassContainer = styled(Paper)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.1)",
  height: "200px",
  backdropFilter: "blur(10px)",
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  color: "#fff",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

/*
***************************
  FETCHING  
***************************
*/

const MarketCap = ({ loading, handleGetGlobalMarketCap }) => {
  const [totalMarketCap, setTotalMarketCap] = useState(0);
  const [total24hVolume, setTotal24hVolume] = useState(0);
  const [totalMarketCapChange, setTotalMarketCapChange] = useState(0);

  const { currencySymbol, conversionValue } = useConversionContext();

  useEffect(() => {
    fetchGlobalData();
  }, []);

  //refresh fear greed meter & trending coins
  useEffect(() => {
    const refreshMarketCap = setInterval(() => {
      fetchGlobalData();
    }, 30000); //30 seconds
    return () => clearInterval(refreshMarketCap);
  }, []);

  const fetchGlobalData = async () => {
    try {
      const globalResponse = await axios.get(
        "",
        {
          signal: AbortSignal.timeout(8000),
          cache: true,
        }
      );

      const globalData = globalResponse?.data?.data;
      setTotalMarketCap(globalData?.total_market_cap?.usd);
      setTotal24hVolume(globalData?.total_volume?.usd);
      setTotalMarketCapChange(globalData?.market_cap_change_percentage_24h_usd);

      const top2DominantCoins = Object.keys(globalData?.market_cap_percentage).slice(0, 2).sort((a, b) => b - a) || [];
      const top2DominantCoinsPercentage = Object.values(globalData?.market_cap_percentage).slice(0, 2).sort((a, b) => b - a) || [];

      handleGetGlobalMarketCap(
        globalData?.total_market_cap?.usd, //-Josh total market cap in usd
        globalData?.market_cap_change_percentage_24h_usd, //-Josh percentae chnage of the total global market cap
        globalData?.total_volume?.usd, //-Josh total 24h trading volume
        globalData?.active_cryptocurrencies, //-Josh total tokens
        globalData?.markets, //-Josh exchanges
        top2DominantCoins, //-Josh top 2 dominant coins
        top2DominantCoinsPercentage //-Josh top 2 dominanct coins percentage
      );
    } catch (error) {
      console.log("Rate Limit Error");
    }
  };

  return (
    <div>
      <GlassContainer>
        <Box
          sx={{
            p: 2,
            borderBottom: "1px solid rgba(98, 94, 94, 0.1)",
          }}
        >
          <Box
            sx={{
              gap: 1,
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "#fff", fontFamily: "Kanit" }}
            >
              {loading ? (
                <Skeleton width={200} height={40} sx={{ bgcolor: "#979a9a" }} />
              ) : (
                "Market Cap"
              )}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "#fff",
                fontFamily: "Kanit",
                visibility: loading ? "hidden" : "visible",
              }}
            >
              {currencySymbol}{totalMarketCap === 0 ? (parseFloat(localStorage.getItem("totalMarketCap")) * conversionValue)?.toLocaleString() : (totalMarketCap * conversionValue)?.toLocaleString()} {" "}
              <span
                style={{
                  color: parseFloat(localStorage.getItem("totalMarketCapChange")) >= 0 ? "#2ecc71" : "#cb4335",
                  fontSize: 16,
                  visibility: loading ? "hidden" : "visible",
                }}
              >
                {parseFloat(localStorage.getItem("totalMarketCapChange")) >= 0 ? "▲" : "▼"}
                {parseFloat(localStorage.getItem("totalMarketCapChange")).toFixed(2)}%
              </span>
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            p: 2,
          }}
        >
          <Box
            sx={{
              transform: "scale(1)",
              transformOrigin: "top center",
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "#fff", fontFamily: "Kanit" }}
            >
              {loading ? (
                <Skeleton width={200} height={40} sx={{ bgcolor: "#979a9a" }} />
              ) : (
                "24h Trading Volume"
              )}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "#fff",
                fontFamily: "Kanit",
                visibility: loading ? "hidden" : "visible",
              }}
            >
              {currencySymbol}{total24hVolume === 0 ? (parseFloat(localStorage.getItem("total24hVolume")) * conversionValue)?.toLocaleString() : (total24hVolume * conversionValue)?.toLocaleString()}
            </Typography>
          </Box>
        </Box>
      </GlassContainer>
    </div>
  );
};

export default MarketCap;
