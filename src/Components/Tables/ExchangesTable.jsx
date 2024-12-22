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
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import { HelpOutlineOutlined, OpenInNew } from "@mui/icons-material";

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
const TOTAL_ASSETS = 218;

const ExchangesTable = ({ handleTopThreeExchanges }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [pageCache, setPageCache] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [fetchingLoading, setFetchingLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  const totalPages = Math.ceil(TOTAL_ASSETS / ITEMS_PER_PAGE);

  useEffect(() => {
    fetchExchanges(currentPage);
  }, [currentPage]);

  //refresh the data aagain every 1 minute?
  useEffect(() => {
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
        `https://api.coingecko.com/api/v3/exchanges?page=${page}`,
        {
          signal: AbortSignal.timeout(8000),
          cache: true,
        }
      );
      console.log(fetchExchangesResponse.data);

      if (fetchExchangesResponse?.data) {
        setFetchingLoading(false);

        const exchangesList = fetchExchangesResponse?.data?.map(
          (exchanges) => ({
            ...exchanges,
          })
        );

        //getting the top three cex
        handleTopThreeExchanges(exchangesList?.slice(0, 3).sort((a, b) => a.trust_score_rank - b.trust_score_rank));

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

  const cryptoExchangesData = pageCache[currentPage] || [];
  const sortedExchangesByTrustScore = cryptoExchangesData.sort(
    (a, b) => b.trust_score - a.trust_score
  );

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
                            algorithm developed to evaluate the legitimacy of an
                            exchange's trading volume. For more information
                            about its methodology, visit CoinGecko's site about
                            Trust Score{" "}
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
                          24h Volume (Normalized)
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
                          24h Volume
                        </Typography>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedExchangesByTrustScore.map((exchange, index) => (
                  <TableRow key={exchange?.id}>
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
                          $
                          {exchange?.trade_volume_24h_btc_normalized?.toLocaleString()}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "Inter",
                            fontWeight: 700,
                            color: "#fff",
                          }}
                        >
                          ${exchange?.trade_volume_24h_btc?.toLocaleString()}
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

export default ExchangesTable;
