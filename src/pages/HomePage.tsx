import React from "react";
import CoinPage from "./CoinPage";
import Coinlist from "../Coinlist";
import { useSearchParams } from "react-router-dom";

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const coinId = searchParams.get("coin") || "";
  return coinId ? <CoinPage /> : <Coinlist />;
};

export default HomePage;
