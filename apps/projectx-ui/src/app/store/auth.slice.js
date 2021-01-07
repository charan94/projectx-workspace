import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { authService } from '../service/auth.service';
export const AUTH_FEATURE_KEY = 'auth';
export const authAdapter = createEntityAdapter();

export const loginAction = createAsyncThunk(
  'auth/login',
  async (payload, thunkAPI) => {
    const result = await authService.login(payload.email, payload.password);
    return result;
  }
);
export const initialAuthState = authAdapter.getInitialState({
  isAuthenticated: false,
  user: null,
  loginError: null,
  token: null
});
export const authSlice = createSlice({
  name: AUTH_FEATURE_KEY,
  initialState: initialAuthState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state, action) => {
        state.isAuthenticated = false;
        state.loginError = null;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        console.log('fulfilled ', action);
        if (action.payload.status === 200) {
          state.isAuthenticated = true;
          state.user = action.payload.data;
          state.token = action.payload.data.token;
          localStorage.setItem('x-auth-token', action.payload.data.token);
        } else {
          state.loginError = action.error.message || 'Invalid Credentails';
        }
      })
      .addCase(loginAction.rejected, (state, action) => {
        console.log('rejected ', action);
        state.isAuthenticated = false;
        state.loginError = action.error.message || 'Unable to login';
      });
  },
});
/*
 * Export reducer for store configuration.
 */
export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
const { selectAll, selectEntities } = authAdapter.getSelectors();
export const getAuthState = (rootState) => rootState[AUTH_FEATURE_KEY];
export const selectAllAuth = createSelector(getAuthState, selectAll);
export const selectAuthEntities = createSelector(getAuthState, selectEntities);
