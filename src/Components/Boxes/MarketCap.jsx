import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Skeleton } from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";

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
        "https://api.coingecko.com/api/v3/global",
        {
          signal: AbortSignal.timeout(8000),
          cache: true,
        }
      );

      const globalData = globalResponse?.data?.data;
      setTotalMarketCap(globalData?.total_market_cap?.usd);
      setTotal24hVolume(globalData?.total_volume?.usd);
      setTotalMarketCapChange(globalData?.market_cap_change_percentage_24h_usd);

      handleGetGlobalMarketCap(await globalData?.total_market_cap?.usd, await globalData?.market_cap_change_percentage_24h_usd);
    } catch (error) {
      console.log(error);
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
              ${totalMarketCap?.toLocaleString()} ${" "}
              <span
                style={{
                  color: totalMarketCapChange >= 0 ? "#2ecc71" : "#cb4335",
                  fontSize: 16,
                  visibility: loading ? "hidden" : "visible",
                }}
              >
                {totalMarketCapChange >= 0 ? "▲" : "▼"}
                {totalMarketCapChange.toFixed(2)}%
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
              ${total24hVolume?.toLocaleString()}
            </Typography>
          </Box>
        </Box>
      </GlassContainer>
    </div>
  );
};

export default MarketCap;
