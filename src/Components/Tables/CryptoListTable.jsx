import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
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
  Tooltip,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { HelpOutlineOutlined } from "@mui/icons-material";

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.02)",
  backdropFilter: "blur(10px)",
  borderRadius: theme.shape.borderRadius,
  marginTop: theme.spacing(4),
}));

/*
***************************
  VARIABLES  
***************************
*/
const ITEMS_PER_PAGE = 99;
const TOTAL_ASSETS = 17373;

const CryptoListTable = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [pageCache, setPageCache] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [fetchingLoading, setFetchingLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  const totalPages = Math.ceil(TOTAL_ASSETS / ITEMS_PER_PAGE) - 2;

  useEffect(() => {
    fetchCryptoData(currentPage);
  }, [currentPage]);

  //refresh the data aagain every 1 minute?
  useEffect(() => {
    let refreshData = setInterval(() => {
      fetchCryptoData(currentPage);
      setFetchError(false);
    }, 60000); //1 minute
    return () => {
      clearInterval(refreshData);
    };
  }, [currentPage]);

  const fetchCryptoData = async (page) => {
    try {
      // guard condition check if page is already cached
      if (pageCache[page]) {
        return pageCache[page];
      }

      setFetchingLoading(true);

      const fetchCryptoResponse = await axios.get(
        ``,
        {
          signal: AbortSignal.timeout(8000),
          cache: true,
        }
      );

      if (fetchCryptoResponse?.data?.Data?.LIST) {
        setFetchingLoading(false);

        const coinList = fetchCryptoResponse?.data?.Data?.LIST.filter(
          (coin) => coin?.SYMBOL !== "USD"
        ).map((coin) => ({
          ...coin,
        }));

        // caching para hindi na mag render ulit
        setPageCache((prev) => ({
          ...prev,
          [page]: coinList,
        }));

        return coinList;
      }

      return [];
    } catch (error) {
      setFetchingLoading(false);
      setFetchError(true);
      console.log(error);
    }
  };

  const currentCoinData = pageCache[currentPage] || [];
  const sortedCoinDataByMarketCap = currentCoinData.sort(
    (a, b) => b.TOTAL_MKT_CAP_USD - a.TOTAL_MKT_CAP_USD
  );

  const formatPrice = (price) => {
    // guard condition if null yung value ng price
    if (price == null || isNaN(price)) {
      return "-";
    }

    if (price < 0.006) {
      return `$${price.toFixed(8)}`;
    } else if (price < 0.09) {
      return `$${price.toFixed(6)}`;
    }
    return `$${price.toFixed(2)}`;
  };

  return (
    <div>
      <StyledTableContainer>
        {fetchingLoading ? (
          <Typography
            variant="h6"
            align="center"
            sx={{ fontFamily: "Kanit", color: "#fff" }}
          >
            {fetchError ? "Failed Fetching Data" : "Loading...."}
          </Typography>
        ) : (
          <>
            <Table
              sx={{
                "& .MuiTableBody-root .MuiTableRow-root:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  cursor: "pointer",
                },
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: "#fff", fontFamily: "Kanit" }}>
                    <Typography
                      sx={{
                        fontFamily: "Kanit",
                        color: "#fff",
                        paddingY: "1vh",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      #
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ color: "#fff", fontFamily: "Kanit" }}>
                    <Typography
                      sx={{
                        fontFamily: "Kanit",
                        color: "#fff",
                        paddingY: "1vh",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      Coin
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ color: "#fff", fontFamily: "Kanit" }}>
                    <Typography
                      sx={{
                        fontFamily: "Kanit",
                        color: "#fff",
                        paddingY: "1vh",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      Price
                    </Typography>
                  </TableCell>
                  {!isMobile && (
                    <>
                      <TableCell sx={{ color: "#fff", fontFamily: "Kanit" }}>
                        <Typography
                          sx={{
                            fontFamily: "Kanit",
                            color: "#fff",
                            paddingY: "1vh",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          24h%
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ color: "#fff", fontFamily: "Kanit" }}>
                        <Typography
                          sx={{
                            fontFamily: "Kanit",
                            color: "#fff",
                            paddingY: "1vh",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          7d%
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ color: "#fff", fontFamily: "Kanit" }}>
                        <Typography
                          sx={{
                            fontFamily: "Kanit",
                            color: "#fff",
                            paddingY: "1vh",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          30d%
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ color: "#fff", fontFamily: "Kanit" }}>
                        <Typography
                          sx={{
                            fontFamily: "Kanit",
                            color: "#fff",
                            paddingY: "1vh",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          Circulating Supply
                          <Tooltip
                            title={
                              <Typography
                                sx={{
                                  fontFamily: "Inter",
                                  fontSize: 14,
                                  fontWeight: "medium",
                                }}
                              >
                                According to Coinmarketcap, circulating supply
                                is the amount of the cryptocurrency coins or
                                tokens in circulation. It is a fluctuating value
                                that can increase and/or decrease over time.
                              </Typography>
                            }
                          >
                            <IconButton
                              sx={{
                                marginLeft: 1,
                                padding: 0,
                              }}
                            >
                              <HelpOutlineOutlined
                                sx={{ fontSize: "0.95rem", color: "#fff" }}
                              />
                            </IconButton>
                          </Tooltip>
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ color: "#fff", fontFamily: "Kanit" }}>
                        <Typography
                          sx={{
                            fontFamily: "Kanit",
                            color: "#fff",
                            paddingY: "1vh",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          Market Cap
                          <Tooltip
                            title={
                              <Typography
                                sx={{
                                  fontFamily: "Inter",
                                  fontSize: 14,
                                  fontWeight: "medium",
                                }}
                              >
                                According to Coinmarketcap, crypto market capitalization (Market Cap) is a simple, straightforward
                                way of determining how big the token is.
                              </Typography>
                            }
                          >
                            <IconButton
                              sx={{
                                marginLeft: 1,
                                padding: 0,
                              }}
                            >
                              <HelpOutlineOutlined
                                sx={{ fontSize: "0.95rem", color: "#fff" }}
                              />
                            </IconButton>
                          </Tooltip>
                        </Typography>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedCoinDataByMarketCap.map((coin, index) => (
                  <TableRow key={coin?.ID}>
                    <TableCell sx={{ color: "#fff", fontFamily: "Kanit" }}>
                      {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "#fff",
                        }}
                      >
                        <Avatar
                          src={coin?.LOGO_URL}
                          alt={coin?.NAME}
                          sx={{ width: 24, height: 24, mr: 1 }}
                        />
                        <span>{coin?.NAME}</span>
                        <Typography
                          variant="body2"
                          sx={{
                            ml: 1,
                            color: "rgba(255,255,255,0.7)",
                            fontFamily: "Inter",
                          }}
                        >
                          {coin?.SYMBOL?.toUpperCase()}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: "#fff", fontFamily: "Inter" }}>
                      {formatPrice(coin?.PRICE_USD) ?? "-"}
                    </TableCell>
                    {!isMobile && (
                      <>
                        <TableCell
                          sx={{
                            color:
                              coin?.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD >=
                              0
                                ? "#2ecc71"
                                : coin?.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD?.toLocaleString()
                                    .length > 0
                                ? "#cb4335"
                                : "#fff",
                            fontFamily: "Inter",
                            fontWeight: 700,
                          }}
                        >
                          {coin?.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD?.toLocaleString()
                            .length > 0
                            ? `
                            ${
                              coin?.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD >=
                              0
                                ? "▲"
                                : "▼"
                            }
                            ${parseFloat(
                              coin?.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD
                            )?.toFixed(2)}%`
                            : "-"}
                        </TableCell>
                        <TableCell
                          sx={{
                            color:
                              coin?.SPOT_MOVING_7_DAY_CHANGE_PERCENTAGE_USD >= 0
                                ? "#2ecc71"
                                : coin?.SPOT_MOVING_7_DAY_CHANGE_PERCENTAGE_USD?.toLocaleString()
                                    .length > 0
                                ? "#cb4335"
                                : "#fff",
                            fontFamily: "Inter",
                            fontWeight: 700,
                          }}
                        >
                          {coin?.SPOT_MOVING_7_DAY_CHANGE_PERCENTAGE_USD?.toLocaleString()
                            .length > 0
                            ? `
                            ${
                              coin?.SPOT_MOVING_7_DAY_CHANGE_PERCENTAGE_USD >= 0
                                ? "▲"
                                : "▼"
                            }
                            ${parseFloat(
                              coin?.SPOT_MOVING_7_DAY_CHANGE_PERCENTAGE_USD
                            )?.toFixed(2)}%`
                            : "-"}
                        </TableCell>
                        <TableCell
                          sx={{
                            color:
                              coin?.SPOT_MOVING_30_DAY_CHANGE_PERCENTAGE_USD >=
                              0
                                ? "#2ecc71"
                                : coin?.SPOT_MOVING_30_DAY_CHANGE_PERCENTAGE_USD?.toLocaleString()
                                    .length > 0
                                ? "#cb4335"
                                : "#fff",
                            fontFamily: "Inter",
                            fontWeight: 700,
                          }}
                        >
                          {coin?.SPOT_MOVING_30_DAY_CHANGE_PERCENTAGE_USD?.toLocaleString()
                            .length > 0
                            ? `
                            ${
                              coin?.SPOT_MOVING_30_DAY_CHANGE_PERCENTAGE_USD >=
                              0
                                ? "▲"
                                : "▼"
                            }
                            ${parseFloat(
                              coin?.SPOT_MOVING_30_DAY_CHANGE_PERCENTAGE_USD
                            )?.toFixed(2)}%`
                            : "-"}
                        </TableCell>
                        <TableCell sx={{ color: "#fff", fontFamily: "Inter" }}>
                          {coin?.SUPPLY_CIRCULATING?.toLocaleString().length > 0
                            ? `${coin?.SUPPLY_CIRCULATING?.toLocaleString()} ${
                                coin?.SYMBOL
                              } `
                            : "-"}
                        </TableCell>
                        <TableCell sx={{ color: "#fff", fontFamily: "Inter" }}>
                          {coin?.TOTAL_MKT_CAP_USD?.toLocaleString().length >
                            0 && parseInt(coin?.TOTAL_MKT_CAP_USD) > 0
                            ? `$${coin?.TOTAL_MKT_CAP_USD?.toLocaleString()}`
                            : "-"}
                        </TableCell>
                        {/* <TableCell sx={{ color: "#fff", fontFamily: "Inter" }}>
                          <div style={{ width: "150px", height: "50px" }}>
                            <Sparklines data={[5, 10, 5, 20]}>
                              <SparklinesLine color="#2ecc71" />
                            </Sparklines>
                          </div>
                        </TableCell> */}
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </StyledTableContainer>
      {/* PAGINATION */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => {
            setCurrentPage(page);
          }}
          variant="outlined"
          showFirstButton
          showLastButton
          shape="rounded"
          sx={{
            "& .MuiPaginationItem-root": {
              color: "#fff",
              borderColor: "#fff",
            },
          }}
        />
      </Box>
    </div>
  );
};

export default CryptoListTable;
