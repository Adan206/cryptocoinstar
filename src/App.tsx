import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/cryptocoinstar' element={<HomePage />} />
          {/* <Route path='/cryptocoinstar/coin/:id' element={<CoinPage />} /> */}
          {/* <Route path='/coin/:id' element={<CoinPage />} /> */}
          {/* <Route path='*' element={<Navigate to='/cryptocoinstar' />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
