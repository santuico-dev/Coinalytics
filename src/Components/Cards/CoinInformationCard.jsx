import {
  Article,
  Description,
  InfoOutlined,
  Language,
  RateReview,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  CardContent,
  Chip,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import { DiscordjsPlain } from "devicons-react";
import { X } from "lucide-react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useConversionContext } from "../../Context/ConversionContext";

const StatLabel = styled(Typography)(({ theme }) => ({
  color: "rgba(255, 255, 255, 0.6)",
  marginBottom: theme.spacing(0.5),
  fontSize: "0.9rem",
  fontFamily: "Kanit",
}));

const StatValue = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "1.1rem",
  color: "#ffffff",
}));

const StatsContainer = styled(Box)(({ theme }) => ({
  borderTop: "1px solid rgba(255, 255, 255, 0.1)",
  paddingTop: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

const CoinInformationCard = ({ coinInformation }) => {

  const { currencySymbol, conversionValue } = useConversionContext();

  const formatNumber = (num, decimals = 2) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(num);
  };

  useEffect(() => {
  }, [coinInformation]);

  return (
    <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: 1.5, sm: 2 },
          mb: { xs: 2.5, sm: 3 },
          width: "100%",
        }}
      >
        <Avatar
          src={coinInformation?.LOGO_URL || "/api/placeholder/64/64"}
          alt={coinInformation?.NAME}
          sx={{
            width: { xs: 32, sm: 36 },
            height: { xs: 32, sm: 36 },
            flexShrink: 0,
          }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 1.5, sm: 0.8 },
            overflow: "hidden",
            width: "100%",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "#ffffff",
              fontSize: { xs: "1.2rem", sm: "1.25rem" },
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {coinInformation?.NAME || 'Loading...'}
          </Typography>
          <Typography
            sx={{
              color: "rgba(255, 255, 255, 0.6)",
              textTransform: "uppercase",
              fontSize: { xs: "0.8rem", sm: "0.875rem" },
            }}
          >
            {coinInformation?.SYMBOL || 'Loading...'}
          </Typography>
          <Typography
            sx={{
              ml: "auto",
              color: "rgba(255, 255, 255, 0.6)",
              fontSize: { xs: "0.75rem", sm: "0.8rem" },
              fontWeight: 500,
            }}
          >
            <Chip
              variant="outlined"
              label={coinInformation?.ID ? "#" + coinInformation?.ID : 'Loading....'}
              color="warning"
            />
          </Typography>
        </Box>
      </Box>

      {/* Price Information */}
      <Box
        sx={{
          mb: { xs: 3.5, sm: 4 },
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: "#ffffff",
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
          }}
        >
          {currencySymbol}{(Math.ceil(coinInformation?.PRICE_USD * conversionValue) || 0).toLocaleString()}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color:
              (coinInformation?.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD ||
                0) > 0
                ? "#2ecc71"
                : "#cb4335",
            fontSize: { xs: "1.1rem", sm: "1.25rem" },
            display: "flex",
            alignItems: "center",
            fontFamily: "Kanit",
          }}
        >
          {(coinInformation?.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD || 0) > 0
            ? "▲"
            : "▼"}
          {(
            coinInformation?.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD || 0
          ).toFixed(2)}
          %
        </Typography>
      </Box>

      {/* Market Stats */}
      <StatsContainer sx={{ mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            mb: 2,
            gap: { xs: 0.5, sm: 0 },
          }}
        >
          <StatLabel>
            Market Cap
            <Tooltip title="The total market value of a cryptocurrency.">
              <InfoOutlined
                fontSize="small"
                sx={{
                  ml: 0.5,
                  fontSize: { xs: "0.7rem", sm: "0.75rem" },
                  color: "#ffffff",
                }}
              />
            </Tooltip>
          </StatLabel>
          <StatValue sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}>
            {currencySymbol}{(Math.ceil(coinInformation?.TOTAL_MKT_CAP_USD * conversionValue || 0 )).toLocaleString()}
          </StatValue>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            mb: 2,
            gap: { xs: 0.5, sm: 0 },
          }}
        >
          <StatLabel>
            Circulating Supply
            <Tooltip title="The number of coins currently in circulation.">
              <InfoOutlined
                fontSize="small"
                sx={{
                  ml: 0.5,
                  fontSize: { xs: "0.7rem", sm: "0.75rem" },
                  color: "#ffffff",
                }}
              />
            </Tooltip>
          </StatLabel>
          <StatValue sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}>
            {formatNumber(coinInformation?.SUPPLY_CIRCULATING || 0, 0)}
          </StatValue>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            mb: 2,
            gap: { xs: 0.5, sm: 0 },
          }}
        >
          <StatLabel>
            Total Supply
            <Tooltip title="The total number of coins that exist.">
              <InfoOutlined
                fontSize="small"
                sx={{
                  ml: 0.5,
                  fontSize: { xs: "0.7rem", sm: "0.75rem" },
                  color: "#ffffff",
                }}
              />
            </Tooltip>
          </StatLabel>
          <StatValue sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}>
            {formatNumber(coinInformation?.SUPPLY_TOTAL || 0, 0)}
          </StatValue>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            mb: 2,
            gap: { xs: 0.5, sm: 0 },
          }}
        >
          <StatLabel>
            Max Supply
            <Tooltip title="The total number of coins that exist.">
              <InfoOutlined
                fontSize="small"
                sx={{
                  ml: 0.5,
                  fontSize: { xs: "0.7rem", sm: "0.75rem" },
                  color: "#ffffff",
                }}
              />
            </Tooltip>
          </StatLabel>
          <StatValue sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}>
            {coinInformation?.SUPPLY_MAX === -1
              ? "∞"
              : formatNumber(coinInformation?.SUPPLY_MAX || 0, 0)}
          </StatValue>
        </Box>
      </StatsContainer>

      {/* Links Section */}
      <StatsContainer sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            color: "#ffffff",
            fontSize: { xs: "1.1rem", sm: "1.25rem" },
            fontFamily: "Kanit",
          }}
        >
          Info
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            mb: 2,
            gap: { xs: 0.5, sm: 0 },
          }}
        >
          <StatLabel>Website</StatLabel>
          <StatValue sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}>
            <Chip
              variant="outlined"
              label="Website"
              color="primary"
              sx={{
                cursor: "pointer",
              }}
              icon={<Language />}
              component={Link}
              to={coinInformation?.WEBSITE_URL || 'Loading...'}
            />
          </StatValue>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            mb: 2,
            gap: { xs: 0.5, sm: 0 },
          }}
        >
          <StatLabel>Whitepaper</StatLabel>
          <StatValue sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}>
            <Chip
              variant="outlined"
              label="Whitepaper"
              color="primary"
              sx={{
                cursor: "pointer",
              }}
              icon={<Description />}
              component={Link}
              to={coinInformation?.WHITE_PAPER_URL || 'Loading...'}
            />
          </StatValue>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            mb: 2,
            gap: { xs: 0.5, sm: 0 },
          }}
        >
          <StatLabel>Blog</StatLabel>
          <StatValue sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}>
            <Chip
              variant="outlined"
              label="Blog"
              color="primary"
              sx={{
                cursor: "pointer",
              }}
              icon={<RateReview />}
              component={Link}
              to={coinInformation?.BLOG_URL || 'Loading...'}
            />
          </StatValue>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            mb: 2,
            gap: { xs: 0.5, sm: 0 },
          }}
        >
          <StatLabel>Community</StatLabel>
          {Object.values(coinInformation).length > 0 ? (
            <>
              {coinInformation?.TWITTER_ACCOUNTS &&
                coinInformation?.TWITTER_ACCOUNTS.map((twitterDetails, index) => (
                  <StatValue sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }} key={index}>
                    <Chip
                      variant="outlined"
                      label="X"
                      color="primary"
                      sx={{
                        cursor: "pointer",
                      }}
                      icon={<X />}
                      component={Link}
                      to={twitterDetails?.URL || 'Loading...'}
                    />
                  </StatValue>
                ))}
            </>
          ) : (
            <Typography>-</Typography>
          )}
        </Box>
      </StatsContainer>
    </CardContent>
  );
};

export default CoinInformationCard;
