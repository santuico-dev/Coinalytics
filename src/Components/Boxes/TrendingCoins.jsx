import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  List,
  ListItem,
  Skeleton,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import { LocalFireDepartment } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
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

const TrendingCoins = ({ loading }) => {
  const [trendingCoins, setTrendingCoins] = useState([]);
  const navigator = useNavigate();

  const { currencySymbol, conversionValue } = useConversionContext();

  useEffect(() => {
    fetchTrendingCoins();
  }, []);

  //refresh fear greed meter & trending coins
  useEffect(() => {
    const refreshTrendingCoins = setInterval(() => {
      fetchTrendingCoins();
    }, 30000); //30 seconds
    return () => clearInterval(refreshTrendingCoins);
  }, []);

  const fetchTrendingCoins = async () => {
    try {
      const trendingResponse = await axios.get(
        "",
        {
          signal: AbortSignal.timeout(8000),
          cache: true,
        }
      );

      console.log(trendingResponse?.data?.coins?.length);

      const topThreeCoins = trendingResponse?.data?.coins
        ?.slice(0, 3)
        .sort((a, b) => a.item.score - b.item.score);
      setTrendingCoins(topThreeCoins);
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewCoinInformation = (coinSymbol) => {
    navigator(`/viewcrypto/${coinSymbol}`);
  };

  return (
    <div>
      <GlassContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          {loading ? (
            <Skeleton
              variant="circular"
              width={40}
              height={40}
              sx={{ bgcolor: "#979a9a" }}
            />
          ) : (
            <LocalFireDepartment size={24} />
          )}
          <Typography variant="h6" sx={{ color: "#fff", fontFamily: "Kanit" }}>
            {loading ? (
              <Skeleton width={200} height={40} sx={{ bgcolor: "#979a9a" }} />
            ) : (
              "Trending Coins (24h)"
            )}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            mt: -2,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              width: "100%",
              overflow: "auto",
            }}
          >
            <List sx={{ width: "100%" }}>
              {trendingCoins.length > 0 ? (
                trendingCoins?.map((coin) => (
                  <ListItem
                    key={coin?.item?.id}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      py: 1,
                      px: 2,
                      "&:hover": {
                        bgcolor: "rgba(255, 255, 255, 0.05)",
                        borderRadius: 1,
                      },
                      transition: "background-color 0.2s",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      handleViewCoinInformation(coin?.item?.symbol)
                    }
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        flexShrink: 0,
                      }}
                    >
                      {loading ? (
                        <Skeleton
                          variant="circular"
                          width={40}
                          height={40}
                          sx={{ bgcolor: "#979a9a" }}
                        />
                      ) : (
                        <Avatar
                          src={coin?.item?.small}
                          alt={coin?.item?.name}
                          sx={{ width: 32, height: 32 }}
                        />
                      )}
                      <Box>
                        {loading ? (
                          <Skeleton
                            width={230}
                            height={40}
                            sx={{ bgcolor: "#979a9a" }}
                          />
                        ) : (
                          <Typography
                            sx={{
                              color: "white",
                              whiteSpace: "nowrap",
                              fontFamily: "Kanit",
                            }}
                          >
                            {coin?.item?.name}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                    <Box sx={{ textAlign: "right", flexShrink: 0 }}>
                      <Typography
                        sx={{
                          color: "white",
                          fontFamily: "Kanit",
                          visibility: loading ? "hidden" : "visible",
                        }}
                      >
                        {currencySymbol}
                        {coin?.item?.data?.price === 0.0
                          ? (
                              coin?.item?.data?.price * conversionValue
                            )?.toFixed(8)
                          : (
                              coin?.item?.data?.price * conversionValue
                            )?.toFixed(2)}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                          color:
                            coin?.item?.data?.price_change_percentage_24h
                              ?.usd >= 0
                              ? "#2ecc71"
                              : "#cb4335",
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "Kanit",
                            visibility: loading ? "hidden" : "visible",
                          }}
                        >
                          {coin?.item?.data?.price_change_percentage_24h?.usd >=
                          0
                            ? "▲"
                            : "▼"}{" "}
                          {coin?.item?.data?.price_change_percentage_24h?.usd?.toFixed(
                            2
                          )}
                          %
                        </Typography>
                      </Box>
                    </Box>
                  </ListItem>
                ))
              ) : (
                <Typography
                  align="center"
                  sx={{
                    fontFamily: "Kanit",
                    visibility: loading ? "hidden" : "visible",
                  }}
                >
                 No trending coins available as of this moment.
                </Typography>
              )}
            </List>
          </Box>
        </Box>
      </GlassContainer>
    </div>
  );
};

export default TrendingCoins;
