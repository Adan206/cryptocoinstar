import "./Header.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setStringFilter } from "./store/coinSlice";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const dispatch = useDispatch();
  const [searchString, setSearchString] = useState("");

  const handleClick = (e: any) => {
    e.preventDefault();

    if (searchString === "") return alert("Please enter coin name!");
    // todo; dispatch new value
    dispatch(setStringFilter(searchString));
  };

  return (
    <div className='header'>
      <Link to='/'>
        <div className='logo'>
          <FontAwesomeIcon icon={faCoins} className='fonticon' />
          CryptoCoins
          <FontAwesomeIcon icon={faCoins} className='fonticon' size='lg' />
        </div>
      </Link>

      <div className='search-bar'>
        <form>
          <input
            type='text'
            // value={term}
            placeholder='Search for coins'
            onChange={(e) => setSearchString(e.target.value)}
          />
          <button onClick={handleClick}>
            <i className='fa fa-search'></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
