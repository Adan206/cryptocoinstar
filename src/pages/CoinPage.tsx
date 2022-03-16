import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

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
  AreaSeriesPoint,
} from "react-vis";

type ChartDataElement = {
  x: number;
  y: string;
};

const CoinPage = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("coin") || "";
  const navigate = useNavigate();

  // if (id === undefined) {
  //   // return navigate("/");
  //   return <Navigate to='/' state={{ from: location }} replace />;
  // }

  const coinHistory: any[] | "error" = useSelector(selectHistoryData(id || ""));

  // const coinHistory: any = useSelector(selectHistoryData(id || ""));

  React.useEffect(() => {
    console.log({ id, coinHistory });
    if (coinHistory === "error") {
      return navigate("/cryptocoinstar");
    } else if (coinHistory.length === 0 && id !== undefined) {
      console.log(`this is the id ${id}`);
      dispatch(getHistoryData(id));
    }
  }, [coinHistory, dispatch, id, navigate]);

  const titleCaseId =
    (id?.slice(0, 1) || "").toUpperCase() +
    id?.slice(1, id.length).toLowerCase();

  const data =
    coinHistory === "error"
      ? coinHistory
      : coinHistory.map(
          (
            coin: { market_data: { current_price: { usd: any } } },
            index: number
          ): AreaSeriesPoint => {
            return {
              x: index + 1,
              y: coin.market_data.current_price.usd.toFixed(2),
            };
          }
        );

  console.log(data);

  return (
    <div className='divcenter'>
      <h1>{titleCaseId} Market Cap Past Week</h1>
      <button
        onClick={() => {
          navigate("/cryptocoinstar");
        }}
        style={{ width: "200px", margin: "1rem" }}
      >
        home
      </button>

      {data === "error" ? (
        <p>error in fetching data</p>
      ) : (
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
      )}
    </div>
  );
};

export default CoinPage;
