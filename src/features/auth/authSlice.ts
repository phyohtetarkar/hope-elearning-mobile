import { User } from '@/lib/models';
import { RootState } from '@/lib/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user?: User | null;
}

const initialState: AuthState = {
  user: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    userLoggedIn: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    userLoggedOut: state => {
      state.user = null;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
