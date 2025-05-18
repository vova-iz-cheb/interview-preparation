import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

const selfSelector = (state: RootState) => state.todos;

export const getTodosLength = createSelector(
  selfSelector, // input only get
  (todos) => todos.todos.length // output should transform
);
