import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: { name: "" },
  reducers: {
    changeFilter: (state, action) => {
      state.name = action.payload;
    },
  },
});

// Експорт редюсер слайса
export default filtersSlice.reducer;
// Екшени слайса для використання в dispatch
export const { changeFilter } = filtersSlice.actions;
