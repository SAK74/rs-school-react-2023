import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchParams } from "types";

const initialState: SearchParams = {};

const searchValueSlice = createSlice({
  initialState,
  name: "searchValue",
  reducers: {
    changeValue: (state, { payload }: PayloadAction<SearchParams>) => payload,
  },
});

export default searchValueSlice.reducer;
export const { changeValue } = searchValueSlice.actions;
