import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: string | null;
  name: string;
  email: string;
}

const initialState: UserState = {
  id: localStorage.getItem("UserId"),
  name: '',
  email: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Omit<UserState,'isUser'>>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      
      localStorage.setItem("userId", action.payload.id || '' )
      localStorage.setItem("userName", action.payload.name || '' )
      localStorage.setItem("UserEmail", action.payload.email || '' )
    },
    clearUser: (state) => {
      state.id = null;
      state.name = '';
      state.email = '';

      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
