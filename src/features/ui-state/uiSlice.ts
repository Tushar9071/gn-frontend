import { createSlice } from "@reduxjs/toolkit";

const InitialState = {
  extendedMenu: true,
  selectedItem: -1,
};

const uiSlice = createSlice({
  name: "sidebar",
  initialState: InitialState,
  reducers: {
    toggleExtendedMenu(state) {
      state.extendedMenu = !state.extendedMenu;
    },
    setSelectedItem(state, action) {
      state.selectedItem = action.payload;
    },
  },
});

export const { toggleExtendedMenu, setSelectedItem } = uiSlice.actions;
export default uiSlice.reducer;
