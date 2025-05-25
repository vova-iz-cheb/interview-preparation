import { Provider, useSelector } from 'react-redux';
import { RootState, store, useAppDispatch, useAppSelector } from './store';
import { getTodosLength } from './selectors';
import { addTodo } from './todoSlice';
import { useRef } from 'react';
import { addUser } from './userSlice';
import { addComment } from './commentSlice';
import { createSelector } from '@reduxjs/toolkit';

const Inner = () => {
  const todos = useAppSelector((state) => state.todos.todos);
  const users = useAppSelector((state) => state.users);
  const comments = useAppSelector((state) => state.comments);
  const todosLength = useAppSelector(getTodosLength);
  console.log('todos', todos);
  console.log('users', users);
  console.log('comments', comments);
  console.log('todosLength', todosLength);

  const dispatch = useAppDispatch();

  const todoId = useRef(1);
  const userId = useRef(1);
  const commentId = useRef(1);

  return (
    <div>
      <p>Что изучили? </p>
      <p>
        1 redux middleware - можно изменять action, отменять. prepend -
        добавлять в начало, append - добавлять в конец. То что возвращается из
        middleware возвращается в return dispatch вызова
      </p>
      <p>2 enhancer наврятли пригодятся пока</p>
      <p>
        3 как организовать store - лучше flatten и для many to many использовать
        принципы из bd
      </p>
      <p>
        4 селекторы - все теже проблемы если берешь данные инпут из разных мест,
        то даже если в этих местах изменятся данные которые тебе не нужны - твой
        селектор заново вычислится и компонент обновится
      </p>
      <p>
        5 thunk вызывается, а вот сага перехватывает - ее можно имитировать
        через middleware
      </p>
      <div>
        add user
        <button
          onClick={() => {
            userId.current++;

            dispatch(
              addUser({
                id: userId.current,
                name: `user_name${userId.current}`,
              })
            );
          }}
        >
          add user
        </button>
        users: {JSON.stringify(users)}
      </div>
      <div>
        add comment
        <button
          onClick={() => {
            dispatch(
              addComment({
                id: commentId.current,
                text: `comment_text${commentId.current}`,
                userId: userId.current,
              })
            );
            commentId.current++;
          }}
        >
          add comment
        </button>
        comments: {JSON.stringify(comments)}
      </div>
      <button
        onClick={() => {
          const res = dispatch(
            addTodo({
              id: todoId.current,
              content: `${todoId.current} task`,
            })
            // addTodo as any
          );

          console.log('res', res);
          todoId.current++;
        }}
      >
        add todos
      </button>
      inner todosLength: {todosLength}, todos: {JSON.stringify(todos)}
    </div>
  );
};

const selectCommentWithUser = createSelector(
  [
    (state: RootState) => state.comments.comments,
    (state: RootState) => state.users.users,
  ],
  (comments, users) => {
    if (!comments) return [];

    return Object.values(comments).map((x) => {
      const user = users[x.userId];
      return {
        id: x.id,
        text: x.text,
        userName: user?.name ?? 'Unknown',
      };
    });
  }
);

const CheckSelectors = () => {
  const data = useAppSelector((s) => selectCommentWithUser(s));
  console.log('-1-data', data);
  return (
    <div>
      checkSelectors(rerender add user and comments): {JSON.stringify(data)}
    </div>
  );
};

export const selectCommentWithUser2 = createSelector(
  [
    (state: RootState) => state.comments.comments,
    (state: RootState) => state.users.users,
  ],
  (comments, users) => {
    if (!comments) return [];

    return Object.values(comments).map((x) => {
      const user = users[x.userId];
      return {
        id: x.id,
        text: x.text,
        userName: user?.name ?? 'Unknown',
      };
    });
  },
  {
    memoizeOptions: {
      // 🔒 shallowEqual check на массив входных аргументов
      resultEqualityCheck: (a, b) => JSON.stringify(a) === JSON.stringify(b),
    },
  }
);

const CheckSelectors2 = () => {
  const data = useAppSelector((s) => selectCommentWithUser2(s));
  console.log('-2-data', data);
  return (
    <div>
      checkSelectors2(only render when comments add - used memo):{' '}
      {JSON.stringify(data)}
    </div>
  );
};

const selectUserNames = createSelector(
  [
    (state: RootState) => state.comments.comments,
    (state: RootState) => state.users.users,
  ],
  (comments, users) => {
    return JSON.stringify(
      Object.values(comments).map(
        (x) => users[x.userId.toString()]?.name ?? 'Unknown'
      )
    );
  }
);

const selectCommentWithUser3 = createSelector(
  [(state: RootState) => state.comments.comments, selectUserNames],
  (comments, userNamesJSON) => {
    const userNames = JSON.parse(userNamesJSON);
    console.log('userNames', userNames);

    return Object.values(comments).map((comment, i) => {
      const userName = userNames[i];
      return {
        id: comment.id,
        text: comment.text,
        userName: userName,
      };
    });
  }
);

const CheckSelectors3 = () => {
  const data = useAppSelector((s) => selectCommentWithUser3(s));
  console.log('-3-data', data);
  return (
    <div>
      checkSelectors3(only render when comments add -used json):{' '}
      {JSON.stringify(data)}
    </div>
  );
};

export const ReduxComponent = () => {
  return (
    <div>
      Redux tool kit
      <Provider store={store}>
        <Inner />
        <br />
        <br />
        <CheckSelectors />
        <br />
        <br />
        <CheckSelectors2 />
        <br />
        <br />
        <CheckSelectors3 />
      </Provider>
    </div>
  );
};
