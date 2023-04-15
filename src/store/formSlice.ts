import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "types";

const initialState: UserType[] = [];

const formSlice = createSlice({
  name: "form-cards",
  initialState,
  reducers: {
    addCard: (state, { payload }: PayloadAction<UserType>) => {
      state.push(payload);
    },
  },
});

export default formSlice.reducer;

export const { addCard } = formSlice.actions;
