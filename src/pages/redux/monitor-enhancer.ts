import { StoreEnhancer } from '@reduxjs/toolkit';

// Правильный тип enhancer'а
export const monitorReducerEnhancer: StoreEnhancer =
  (createStore) => (reducer: any, preloadedState: any) => {
    const monitoredReducer = (state: any, action: any) => {
      const start = performance.now();
      const newState = reducer(state, action);
      const end = performance.now();
      console.log('Reducer time:', end - start, 'ms');
      return newState;
    };

    return createStore(monitoredReducer, preloadedState);
  };
