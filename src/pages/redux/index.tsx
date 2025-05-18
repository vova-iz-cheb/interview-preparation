import { Provider } from 'react-redux';
import { store, useAppDispatch, useAppSelector } from './store';
import { getTodosLength } from './selectors';
import { addTodo } from './todoSlice';
import { useRef } from 'react';

const Inner = () => {
  const todos = useAppSelector((state) => state.todos.todos);
  const todosLength = useAppSelector(getTodosLength);
  console.log('todos', todos);
  console.log('todosLength', todosLength);

  const dispatch = useAppDispatch();

  const id = useRef(1);

  return (
    <div>
      <button
        onClick={() => {
          dispatch(
            addTodo({
              id: id.current,
              content: `${id.current} task`,
            })
          );
          id.current++;
        }}
      >
        add todos
      </button>
      inner todosLength: {todosLength}, todos: {JSON.stringify(todos)}
    </div>
  );
};

export const ReduxComponent = () => {
  return (
    <div>
      Redux tool kit
      <Provider store={store}>
        <Inner />
      </Provider>
    </div>
  );
};
