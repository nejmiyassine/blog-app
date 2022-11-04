import { createSlice } from '@reduxjs/toolkit';

export interface ThemeState {
  isDark: boolean;
}

const initialState: ThemeState = {
  isDark: false,
};

export const themeSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    changeThemeMode: (state) => {
      state.isDark = !state.isDark;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeThemeMode } = themeSlice.actions;

export default themeSlice.reducer;
