import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, LoginPayload } from "../user/type";
import {
  loadUserfromLocalStorage,
  saveUserinLocalStorage,
} from "../../utils/localstorage";
import { useCookies } from "react-cookie";
const [cookies, setCookie, removerCookie] = useCookies(["token"]);
const initialState: AuthState = {
  username: "",
  role: "",
  token: "",
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      (state.username = action.payload.username),
        (state.role = action.payload.role),
        (state.token = action.payload.token);
      saveUserinLocalStorage("user", {
        username: state.username,
        role: state.role,
      });
      setCookie("token", state.token || "");
    },
    logout: (state) => {
      state.username = "";
      state.role = "";
      state.token = "";
      removerCookie("token");
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    checkUserHaveLogedIn: (state) => {
      const user = loadUserfromLocalStorage("user");
      const token = cookies.token;
      if (user && token) {
        state.username = user.username;
        state.role = user.role;
        state.token = token;
      }
    },
  },
});

export const { login, logout, setLoading, checkUserHaveLogedIn } =
  authSlice.actions;
export default authSlice.reducer;
