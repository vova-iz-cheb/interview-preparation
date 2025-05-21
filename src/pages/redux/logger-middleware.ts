const logger = (store: any) => (next: any) => (action: any) => {
  console.log('1 store', store);
  console.log('1 next', next);
  console.log('1 action', action);
  console.group(action.type);
  console.info('dispatching', action);
  let result;
  if (action.payload.id % 3 !== 0) {
    result = next(action);
    console.log('result', result);
  }
  console.log('next state', store.getState());
  console.groupEnd();
  return result ?? action;
};

export default logger;
