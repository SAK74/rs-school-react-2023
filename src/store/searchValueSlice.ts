import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const searchValueSlice = createSlice({
  initialState: "",
  name: "searchValue",
  reducers: {
    changeValue: (state, { payload }: PayloadAction<string>) => payload,
  },
});

export default searchValueSlice.reducer;
export const { changeValue } = searchValueSlice.actions;
