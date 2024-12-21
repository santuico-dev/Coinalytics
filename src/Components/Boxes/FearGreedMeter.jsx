import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
} from "@mui/material";
import { styled} from "@mui/system";
import axios from "axios";
import GaugeComponent from "react-gauge-component";
import { Speed } from "@mui/icons-material";

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

const FearGreedMeter = () => {
  const [
    fearGreedIndexValueClassification,
    setFearGreedIndexValueClassification,
  ] = useState("");
  const [fearGreedValue, setFearGreedValue] = useState(0);

  useEffect(() => {
    fetchFearGreedIndex();
  }, []);

  //refresh fear greed meter & trending coins
  useEffect(() => {
    const refreshMeter = setInterval(() => {
      fetchFearGreedIndex();
    }, 30000); //30 seconds
    return () => clearInterval(refreshMeter);
  }, []);

  const fetchFearGreedIndex = async () => {
    try {
      await axios
        .get("https://api.alternative.me/fng/", {
          signal: AbortSignal.timeout(8000),
          cache: true,
        })
        .then((response) => {
          response?.data?.data?.map(async (data) => {
            setFearGreedIndexValueClassification(
              await data?.value_classification
            );
            setFearGreedValue(await data?.value);
          });
        });
    } catch (error) {
      console.log(error);
    }
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
          <Speed size={24} />
          <Typography variant="h6" sx={{ color: "#fff", fontFamily: "Kanit" }}>
            Fear & Greed Index
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              transform: "scale(1)",
              transformOrigin: "top center",
            }}
          >
            <GaugeComponent
              type="semicircle"
              arc={{
                colorArray: ["#FF2121", "#00FF15"],
                padding: 0.02,
                subArcs: [
                  {
                    tooltip: {
                      text: fearGreedIndexValueClassification,
                    },
                  },
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                ],
              }}
              pointer={{ type: "blob", animationDelay: 0 }}
              value={fearGreedValue}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: -4,
          }}
        >
          <Typography variant="h6" sx={{ color: "#fff", fontFamily: "Kanit" }}>
            {fearGreedIndexValueClassification}
          </Typography>
        </Box>
      </GlassContainer>
    </div>
  );
};

export default FearGreedMeter;
