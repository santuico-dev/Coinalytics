import React, { useState } from "react";
import { Box, Typography, Container, Card, Button, Grid, styled } from "@mui/material";
import moment from "moment";

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: theme.spacing(1),
  width: 280,
  height: 350,
  color: "#ffffff",
  transition: "transform 0.3s ease-in-out",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  gap: theme.spacing(1),
  "&:hover": {
    transform: "translateY(-5px)",
    background: "rgba(255, 255, 255, 0.08)",
  },
}));

const NewsSlider = ({ news }) => {
  const [visibleCount, setVisibleCount] = useState(3);

  const handleReadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const handleOpenNews = (newsLink) => {
    try {
      window.open(newsLink)      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container
      disableGutters
      sx={{
        maxWidth: "100% !important",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Grid container spacing={1.5} sx={{ mx: "auto", width: "100%" }}>
        {news.slice(0, visibleCount).map((news, index) => (
          <Grid item xs={4} key={index}>
            <StyledCard sx={{ cursor: 'pointer' }} onClick={() => handleOpenNews(news?.url)}>
              <Box
                component="img"
                src={news?.imageurl}
                alt={news?.title}
                sx={{
                  width: "100%",
                  height: "50%",
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
              />
              <Typography
                variant="subtitle2"
                sx={{
                  fontSize: 20,
                  fontWeight: 500,
                  fontFamily: "Kanit, sans-serif",
                }}
              >
                {news?.title}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start"
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: "#ccc",
                    fontFamily: "Kanit, sans-serif",
                  }}
                >
                 {news?.source_info?.name} {" "} ● { moment(news?.published_on * 1000).fromNow() }
                </Typography>
              </Box>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      {visibleCount < news.length && (
        <Button
          onClick={handleReadMore}
          variant="contained"
          sx={{
            mt: 2,
            fontFamily: "Kanit, sans-serif",
            textTransform: "none",
            background: "rgba(255, 255, 255, 0.1)",
            color: "#ffffff",
            "&:hover": { background: "rgba(255, 255, 255, 0.2)" },
            display: "block",
            mx: "auto",
          }}
        >
          Read More
        </Button>
      )}
    </Container>
  );
};

export default NewsSlider;
