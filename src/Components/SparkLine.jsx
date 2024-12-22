import React, { useEffect, useState } from "react";
import axios from "axios";
import { Sparklines, SparklinesLine } from "react-sparklines";

const SparkLine = ({ coinName }) => {
  const [dailyPrices, setDailyPrices] = useState([]);
  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    try {
      const coinSparkLinePrice = await axios.get(
        `https://min-api.cryptocompare.com/data/v2/histohour?fsym=${coinName}&tsym=USD&limit=168`, 
        {
            cache: true,
            signal: AbortSignal.timeout(8000)
        }
      );

      console.log(await coinSparkLinePrice?.data?.Data?.Data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ width: "150px", height: "50px" }}>
      <Sparklines data={[5, 10, 5, 20]}>
        <SparklinesLine color="#2ecc71" />
      </Sparklines>
    </div>
  );
};

export default SparkLine;
