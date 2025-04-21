import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

interface UserState {
  isLogged: boolean;
}

const initialState: UserState = {
  isLogged: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLogged: (state: UserState) => {
      state.isLogged = true;
    },
    setIsLoggedOut: (state: UserState) => {
      state.isLogged = false;
    },
  },
});

export const { setIsLogged, setIsLoggedOut } = userSlice.actions;

export const selectUser = (state: RootState): UserState => state.user;

export default userSlice.reducer;
