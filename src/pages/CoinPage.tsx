import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectHistoryData, getHistoryData } from "../store/historySlice";
import { useAppDispatch } from "../store/store";
import "./coinpage.css";
// import Coinlist from "../Coinlist";

import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  AreaSeries,
} from "react-vis";

const CoinPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  // if (id === undefined) {
  //   // return navigate("/");
  //   return <Navigate to='/' state={{ from: location }} replace />;
  // }

  // const coinHistory: any[] | "error" = useSelector(selectHistoryData(id || ""));

  const coinHistory: any = useSelector(selectHistoryData(id || ""));

  React.useEffect(() => {
    console.log({ id, coinHistory });
    if (coinHistory === "error") {
      return navigate("/");
    } else if (coinHistory.length === 0 && id !== undefined) {
      console.log(`this is the id ${id}`);
      dispatch(getHistoryData(id));
    }
  }, [coinHistory, dispatch, id, navigate]);

  const titleCaseId =
    (id?.slice(0, 1) || "").toUpperCase() +
    id?.slice(1, id.length).toLowerCase();

  const data = coinHistory.map(
    (coin: { market_data: { current_price: { usd: any } } }, index: number) => {
      return {
        x: index + 1,
        y: `${coin.market_data.current_price.usd.toFixed(3)}`,
      };
    }
  );

  console.log(data);

  return (
    <div className='divcenter'>
      <h1>{titleCaseId} Market Cap Past Week</h1>
      <button
        onClick={() => {
          navigate("/");
        }}
        style={{ width: "200px", margin: "1rem" }}
      >
        home
      </button>

      <XYPlot xType='ordinal' width={900} height={500}>
        <VerticalGridLines />
        <HorizontalGridLines />
        {/* <XAxis title=' Week' />
        <YAxis title='Market Cap' /> */}
        {/* <LineSeries data={data} color='red' /> */}
        <AreaSeries
          data={data}
          style={{ strokeDasharray: "2 2" }}
          animation
          colorType={"category"}
          stroke={"#ccc"}
        />
        <XAxis marginBottom={30} title=' Days Of Week' />
        <YAxis left={30} title='Market Cap In Dollars' />
      </XYPlot>
    </div>
  );
};

export default CoinPage;
