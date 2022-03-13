import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type CoinData = any;

type CoinSliceInnerState = {
  coinData: CoinData[];
  filter: string;
};

type CoinSlice = {
  coin: CoinSliceInnerState;
};

export const getCoinData = createAsyncThunk("coin/getCoinData", async () => {
  const results = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets" +
      "?vs_currency=btc&order=market_cap_desc&per_page=100&page=1&sparkline=false"
  ).then((response) => response.json());
  return results;
});

export const coinSlice = createSlice({
  name: "coin",
  initialState: {
    coinData: [],
    filter: "",
  } as CoinSliceInnerState,
  reducers: {
    setStringFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getCoinData.fulfilled, (state, action) => {
      // Add user to the state array
      state.coinData = action.payload;
    });
  },
});

export const { setStringFilter } = coinSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync =
//   (amount: number) =>
//   (dispatch: (args: any) => void): void => {
//     setTimeout(() => {
//       dispatch(incrementByAmount(amount));
//     }, 1000);
//   };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCoinData = (state: CoinSlice) => state.coin.coinData;

//filter based on coin name
export const selectFilteredCoinData = (state: CoinSlice) =>
  state.coin.coinData.filter((singleCoin) => {
    if (
      singleCoin?.name.toLowerCase().includes(state.coin.filter.toLowerCase())
    ) {
      return true;
    }
    return false;
  });

export default coinSlice.reducer;
