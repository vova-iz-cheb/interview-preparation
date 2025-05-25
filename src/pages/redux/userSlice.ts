import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type User = {
  id: number;
  name: string;
};

const initialState: {
  users: Record<string, User>;
} = {
  users: {},
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<User>) {
      state.users[action.payload.id.toString()] = action.payload;
    },
  },
});

export const usersReducer = usersSlice.reducer;
export const { addUser } = usersSlice.actions;
