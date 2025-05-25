import { configureStore } from '@reduxjs/toolkit';
import { todosReducer } from './todoSlice';
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector, useStore } from 'react-redux';
import loggerMiddleware from './logger-middleware';
import { monitorReducerEnhancer } from './monitor-enhancer';
import { usersReducer } from './userSlice';
import { commentsReducer } from './commentSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    users: usersReducer,
    comments: commentsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // actionCreatorCheck: false,
      // serializableCheck: false,
    }).prepend(loggerMiddleware),
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers().concat(monitorReducerEnhancer),
  devTools: {
    name: 'my app',
  },
  preloadedState: {
    todos: {
      todos: [
        {
          id: 1,
          content: 'preloaded 1 task',
        },
        {
          id: 2,
          content: 'preloaded 2 task',
        },
      ],
    },
  },
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch'];

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// export const useAppDispatch: () => AppDispatch = useDispatch;
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// export const useAppStore: () => AppStore = useStore;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
