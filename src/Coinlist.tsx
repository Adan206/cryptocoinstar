import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, CardGroup } from "react-bootstrap";
import {
  getCoinData,
  selectFilteredCoinData,
  selectCoinData,
} from "./store/coinSlice";
import { useDispatch, useSelector } from "react-redux";
import CardCoin from "./features/CardCoin";

const Coinlist = () => {
  const filteredCoins = useSelector(selectFilteredCoinData);
  const allCoins = useSelector(selectCoinData);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (allCoins.length === 0) {
      dispatch(getCoinData());
    }
  }, [allCoins, dispatch]);
  return (
    <div className='App'>
      <Container>
        <Row>
          <Col>
            <CardGroup>
              {Array.isArray(filteredCoins) &&
                filteredCoins.map((coin: any) => {
                  return <CardCoin key={coin.id} coin={coin} />;
                })}
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Coinlist;
