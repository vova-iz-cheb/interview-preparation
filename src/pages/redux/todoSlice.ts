import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type Todo = {
  id: number;
  content: string;
};

const initialState: {
  todos: Todo[];
} = {
  todos: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<Todo>) {
      state.todos.push(action.payload);
    },
  },
});

export const todosReducer = todosSlice.reducer;
export const { addTodo } = todosSlice.actions;
