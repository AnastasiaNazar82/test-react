import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://connections-api.goit.global/";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

/*
 * POST @ /users/signup
 * body: { name, email, password }
 * After successful registration, add the token to the HTTP header
 */

export const register = createAsyncThunk(
  "auth/register",
  async (newUser, thunkAPI) => {
    try {
      const res = await axios.post("/users/register", newUser);
      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * POST @ /users/login
 * body: { email, password }
 * After successful login, add the token to the HTTP header
 */

export const login = createAsyncThunk(
  "auth/login",
  async (userInfo, thunkAPI) => {
    try {
      const res = await axios.post("/users/login", userInfo);
      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * POST @ /users/logout
 * headers: Authorization: Bearer token
 * After a successful logout, remove the token from the HTTP header
 */
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/users/logout");
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

/*
 * GET @ /users/me
 * headers: Authorization: Bearer token
 * Reading the token from the state via getState()
 * Add it to the HTTP header and perform the request
 * If there is no token, exit without performing any request
 */
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const reduxState = thunkAPI.getState();
    setAuthHeader(reduxState.auth.token);

    const res = await axios.get("/users/current");
    return res.data;
  },
  {
    condition(_, thunkAPI) {
      const reduxState = thunkAPI.getState();
      return reduxState.auth.token !== null;
    },
  }
);

// ++++++++++++++++++++++++++++++++

// export const sendResetEmail = createAsyncThunk(
//   'auth/request-reset-email',
//   async (email, thunkAPI) => {
//     try {
//       const response = await axios.post('auth/request-reset-email', { email });
//       return response.data;
//     } catch (error) {
//       throw thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const resetPwd = createAsyncThunk(
//   'auth/reset-password',
//   async ({ password, token }, thunkAPI) => {
//     try {
//       const res = await axios.post('auth/reset-password', { password, token });
//       return res.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
