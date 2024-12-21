import React, { useEffect, useState } from "react";
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import axios from "axios";

const SparkLine = () => {
  const [dailyPrices, setDailyPrices] = useState([]);
  const settings = {
    valueFormatter: (value) => `${value}%`,
    height: 90,
  };

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get(
          "https://min-api.cryptocompare.com/data/v2/histoday",
          {
            params: {
              fsym: "BTC", 
              tsym: "USD", 
              limit: 6,   
              api_key: "844c2246663001316d0292a6add57905ee62907d75229c35536f37be18376e9c",
            },
          }
        );

        const prices = response.data.Data.Data.map((day) => day.close);
        setDailyPrices(prices);
      } catch (error) {
        console.error("Error fetching the data:", error);
      }
    };

    fetchPrices();
  }, []);

  return (
    <div style={{ width: "150px", height: "50px" }}>
      {dailyPrices.length > 0 ? (
        <SparkLineChart
          data={dailyPrices}
          {...settings}
          lineWidth={2}
          sx={{ stroke: "red" }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SparkLine;
