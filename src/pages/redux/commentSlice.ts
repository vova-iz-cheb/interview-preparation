import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type Comment = {
  id: number;
  text: string;
  userId: number;
};

const initialState: {
  comments: Record<string, Comment>;
} = {
  comments: {},
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment(state, action: PayloadAction<Comment>) {
      state.comments[action.payload.id.toString()] = action.payload;
    },
  },
});

export const commentsReducer = commentsSlice.reducer;
export const { addComment } = commentsSlice.actions;
