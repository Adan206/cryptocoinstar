import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Coinlist from "./Coinlist";
import CoinPage from "./pages/CoinPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/cryptocoinstar' element={<Coinlist />} />
          <Route path='/coin/:id' element={<CoinPage />} />
          <Route path='*' element={<Navigate to='/cryptocoinstar' />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
