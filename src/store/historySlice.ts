import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type HistoryData = any;

type HistorySliceInnerState = {
  historyData: HistoryData[];
};

type HistorySlice = {
  history: HistorySliceInnerState;
};

const getFormattedDate = (daysAgo: number) => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - daysAgo);

  const currentDayFormat =
    currentDate.getDate() +
    "-" +
    (currentDate.getMonth() + 1) +
    "-" +
    currentDate.getFullYear();
  console.log(currentDayFormat);

  return currentDayFormat;
};

export const getHistoryData: AsyncThunk<any, string, {}> = createAsyncThunk(
  "history/getHistoryData",
  async (coinId) => {
    try {
      const dayOne = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/history?date=${getFormattedDate(
          0
        )}`
        // `https://api.coingecko.com/api/v3/coins/${coinId}/history?date=20-2-2022`
      ).then((response) => response.json());
      // console.log(dayOne);

      if (dayOne.error) {
        throw new Error(dayOne.error);
      }

      // <----------------------dayTwo ---------------------->

      const dayTwo = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/history?date=${getFormattedDate(
          1
        )}-2-2022`
      ).then((response) => response.json());
      // console.log(dayTwo);

      if (dayTwo.error) {
        throw new Error(dayTwo.error);
      }

      // <----------------------dayThree ---------------------->

      const dayThree = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/history?date=${getFormattedDate(
          2
        )}-2-2022`
      ).then((response) => response.json());
      // console.log(dayThree);

      if (dayThree.error) {
        throw new Error(dayThree.error);
      }
      // <----------------------dayFour---------------------->

      const dayFour = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/history?date=${getFormattedDate(
          3
        )}-2-2022`
      ).then((response) => response.json());
      // console.log(dayFour);

      if (dayFour.error) {
        throw new Error(dayFour.error);
      }
      // <----------------------dayFive ---------------------->

      const dayFive = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/history?date=${getFormattedDate(
          4
        )}-2-2022`
      ).then((response) => response.json());
      // console.log(dayFive);

      if (dayFive.error) {
        throw new Error(dayFive.error);
      }
      // <----------------------daySix ---------------------->

      const daySix = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/history?date=${getFormattedDate(
          5
        )}-2-2022`
      ).then((response) => response.json());
      // console.log(daySix);

      if (daySix.error) {
        throw new Error(daySix.error);
      }
      // <----------------------daySeven ---------------------->

      const daySeven = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/history?date=${getFormattedDate(
          6
        )}-2-2022`
      ).then((response) => response.json());
      // console.log(daySeven);

      if (daySeven.error) {
        throw new Error(daySeven.error);
      }

      return [dayOne, dayTwo, dayThree, dayFour, dayFive, daySix, daySeven];
      // return dayOne;
    } catch (error) {
      return "error";
    }
  }
);

export const historySlice = createSlice({
  name: "history",
  initialState: {
    historyData: {},
  } as HistorySliceInnerState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getHistoryData.fulfilled, (state, action) => {
      const coinId = action.meta.arg as any;
      // Add user to the state array
      state.historyData[coinId] = action.payload;
    });
  },
});

export const selectHistoryData =
  (coinId: string): any =>
  (state: HistorySlice) =>
    state.history.historyData[coinId as any] || [];

export default historySlice.reducer;
