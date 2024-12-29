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
const ITEMS_PER_PAGE = 98;
const TOTAL_ASSETS = 218;

const NewsFeedsTable = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [pageCache, setPageCache] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [fetchingLoading, setFetchingLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [searchNewsFeed, setSearchNewsFeed] = useState("");

  const totalPages = Math.ceil(TOTAL_ASSETS / ITEMS_PER_PAGE);

  useEffect(() => {
    fetchNewsFeeds(currentPage);
  }, [currentPage]);

  const fetchNewsFeeds = async (page) => {
    try {
      //guard condition for caching
      if (pageCache[page]) {
        return pageCache[page];
      }

      const newsFeedResponse = await axios.get(
        ``,
        {
          signal: AbortSignal.timeout(8000),
          cache: true,
        }
      );

      //check if may data na 
      if(newsFeedResponse?.data) {

        const newsFeedList = newsFeedResponse?.data?.map((newsFeed) => ({
            ...newsFeed,
        }));

        setPageCache((prev) => ({
            ...prev,
            [page]: newsFeedList
        }));

        return newsFeedList;

      }

      return []

    } catch (error) {
      console.log(error);
      setFetchError(true);
      setFetchingLoading(false)
    }
  };

  const handleSearchNewsFeed = (event) => {
    setSearchNewsFeed(event.target.value);
  } 

  const cachedNewsFeed = pageCache[currentPage] || [];
  const filteredNewsFeedBySearch = cachedNewsFeed?.filter((newsFeed) => {
    return newsFeed?.name.toLowerCase().includes(searchNewsFeed.toLowerCase());
  })
  
  return (
    <div>
      <MainContainer maxWidth="xl">
        <Box sx={{ width: "100%" }}>
          {/* SEARCH FIELD */}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="ex. CoinDesk"
              value={searchNewsFeed}
              onChange={handleSearchNewsFeed}
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
                          News Feed Name
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
                          Language
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredNewsFeedBySearch.map((newsFeed, index) => (
                      <TableRow
                        key={index}
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
                              src={newsFeed?.img}
                              alt={newsFeed?.name}
                              sx={{ width: 24, height: 24, mr: 1 }}
                            />
                            <span>{newsFeed?.name}</span>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ color: "#fff", fontFamily: "Inter" }}>
                          {newsFeed?.lang}
                        </TableCell>
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

export default NewsFeedsTable;
