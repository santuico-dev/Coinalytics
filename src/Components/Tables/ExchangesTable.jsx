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
  Chip,
  Tooltip,
  IconButton,
  Container,
  TextField,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import { HelpOutlineOutlined, OpenInNew, Search } from "@mui/icons-material";
import Aos from "aos";
import { useConversionContext } from "../../Context/ConversionContext";

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.02)",
  backdropFilter: "blur(10px)",
  borderRadius: theme.shape.borderRadius,
  marginTop: theme.spacing(4),
}));

const MainContainer = styled(Container)(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

/*
***************************
  VARIABLES  
***************************
*/
const ITEMS_PER_PAGE = 99;
const TOTAL_ASSETS = 218;

const ExchangesTable = ({ handleTopThreeExchanges }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [pageCache, setPageCache] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [fetchingLoading, setFetchingLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  const { currencySymbol, conversionValue } = useConversionContext();

  const [searchExchanges, setSearchExchanges] = useState("");

  const totalPages = Math.ceil(TOTAL_ASSETS / ITEMS_PER_PAGE);

  useEffect(() => {
    fetchExchanges(currentPage);
  }, [currentPage]);

  //refresh the data aagain every 1 minute?
  useEffect(() => {
    Aos.init();
    let refreshExchangesData = setInterval(() => {
      fetchExchanges(currentPage);
      setFetchError(false);
    }, 60000); //1 minute
    return () => {
      clearInterval(refreshExchangesData);
    };
  }, [currentPage]);

  const fetchExchanges = async (page) => {
    try {
      // guard condition check if page is already cached
      if (pageCache[page]) {
        return pageCache[page];
      }

      setFetchingLoading(true);

      const fetchExchangesResponse = await axios.get(
        ``,
        {
          signal: AbortSignal.timeout(8000),
          cache: true,
        }
      );
      if (fetchExchangesResponse?.data) {
        setFetchingLoading(false);

        const exchangesList = fetchExchangesResponse?.data?.map(
          (exchanges) => ({
            ...exchanges,
          })
        );
        //getting the top three cex
        handleTopThreeExchanges(
          exchangesList
            ?.slice(0, 3)
            .sort((a, b) => a.trust_score_rank - b.trust_score_rank)
        );

        // caching para hindi na mag render ulit
        setPageCache((prev) => ({
          ...prev,
          [page]: exchangesList,
        }));

        return exchangesList;
      }

      return [];
    } catch (error) {
      setFetchingLoading(false);
      setFetchError(true);
      console.log(error);
    }
  };

  const handleSearchExchanges = (event) => {
    setSearchExchanges(event.target.value);
  };

  const cryptoExchangesData = pageCache[currentPage] || [];
  const sortedExchangesByTrustScore = cryptoExchangesData.sort(
    (a, b) => b.trust_score - a.trust_score
  );

  // search handler
  const filteredExchanges = sortedExchangesByTrustScore.filter((exchange) => {
    return exchange?.name?.toLowerCase().includes(searchExchanges.toLowerCase());
  });

  return (
    <div>
      <MainContainer maxWidth="xl">
        <Box sx={{ width: "100%" }}>
          {/* SEARCH FIELD */}
          <Box
            sx={{ display: "flex", justifyContent: "flex-end" }}
            data-aos="fade-right"
            data-aos-delay="400"
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="ex. Bybit"
              value={searchExchanges}
              onChange={handleSearchExchanges}
              InputLabelProps={{
                sx: { fontFamily: "Kanit", fontSize: 20, color: "#fff" },
              }}
              sx={{
                "& input": { fontSize: 18, pt: 3, color: "#fff" },
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                mt: 1,
                width: "400px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  borderBottomColor: "#ccc",
                  borderRadius: 0,
                  borderBottom: "1.5px solid #ccc",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderBottomColor: "#ccc !important",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderBottomColor: "#ccc",
                },
              }}
              inputProps={{ style: { fontSize: 16, fontFamily: "Kanit" } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" disabled>
                      <Search sx={{ color: "#fff" }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

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
                  data-aos="fade-up"
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
                          Exchange
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
                          Trust Score
                          <Tooltip
                            title={
                              <Typography
                                sx={{
                                  fontFamily: "Inter",
                                  fontSize: 14,
                                  fontWeight: "medium",
                                }}
                              >
                                According to CoinGecko, Trust Score is a rating
                                algorithm developed to evaluate the legitimacy
                                of an exchange's trading volume. For more
                                information about its methodology, visit
                                CoinGecko's site about Trust Score{" "}
                                <a
                                  href="https://www.coingecko.com/en/methodology"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <OpenInNew
                                    fontSize="0.5rem"
                                    style={{
                                      verticalAlign: "middle",
                                      color: "#5dade2",
                                    }}
                                  />
                                </a>{" "}
                                .
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
                      {!isMobile && (
                        <>
                          <TableCell
                            sx={{ color: "#fff", fontFamily: "Kanit" }}
                          >
                            <Typography
                              sx={{
                                fontFamily: "Kanit",
                                color: "#fff",
                                paddingY: "1vh",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              24h Volume (Normalized)
                            </Typography>
                          </TableCell>
                          <TableCell
                            sx={{ color: "#fff", fontFamily: "Kanit" }}
                          >
                            <Typography
                              sx={{
                                fontFamily: "Kanit",
                                color: "#fff",
                                paddingY: "1vh",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              24h Volume
                            </Typography>
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredExchanges.map((exchange, index) => (
                      <TableRow
                        key={exchange?.id}
                        onClick={() => {
                          window.open(exchange?.url, "_blank");
                        }}
                      >
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
                              src={exchange?.image}
                              alt={exchange?.name}
                              sx={{ width: 24, height: 24, mr: 1 }}
                            />
                            <span>{exchange?.name}</span>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ color: "#fff", fontFamily: "Inter" }}>
                          {exchange?.trust_score !== null ? (
                            <Chip
                              label={exchange?.trust_score + "/10"}
                              color={
                                exchange?.trust_score >= 6
                                  ? "success"
                                  : exchange?.trust_score > 2 &&
                                    exchange?.trust_score <= 5
                                  ? "warning"
                                  : "error"
                              }
                              variant="outlined"
                              sx={{
                                color:
                                  exchange?.trust_score >= 6
                                    ? "#2ecc71"
                                    : exchange?.trust_score > 2 &&
                                      exchange?.trust_score <= 5
                                    ? "#f7dc6f"
                                    : "#cb4335",
                              }}
                            />
                          ) : (
                            "N/A"
                          )}
                        </TableCell>
                        {!isMobile && (
                          <>
                            <TableCell
                              sx={{
                                fontFamily: "Inter",
                                fontWeight: 700,
                                color: "#fff",
                              }}
                            >
                              {currencySymbol}
                              {(Math.ceil(exchange?.trade_volume_24h_btc_normalized * conversionValue))?.toLocaleString()}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontFamily: "Inter",
                                fontWeight: 700,
                                color: "#fff",
                              }}
                            >
                              {currencySymbol}
                              {(Math.ceil(exchange?.trade_volume_24h_btc * conversionValue))?.toLocaleString()}
                            </TableCell>
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
              disabled={fetchingLoading}
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
        </Box>
      </MainContainer>
    </div>
  );
};

export default ExchangesTable;
