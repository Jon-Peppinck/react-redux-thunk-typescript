import { Dispatch } from 'redux';

import { AppActions } from '../models/actions';

import {
  FETCH_TODOS_REQUEST,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE,
} from './models/actions';
import { Todo } from './models/Todo';

const requestTodos = (): AppActions => ({
  type: FETCH_TODOS_REQUEST,
  loading: true,
  todos: [],
  error: '',
});
const receiveTodos = (todos: Todo[]): AppActions => ({
  type: FETCH_TODOS_SUCCESS,
  loading: false,
  todos: todos,
  error: '',
});
const invalidateTodos = (): AppActions => ({
  type: FETCH_TODOS_FAILURE,
  loading: false,
  todos: [],
  error: 'Unable to fetch todo list',
});

export const boundRequestTodos = () => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(requestTodos());
    return fetch(`https://jsonplaceholder.typicode.com/todos?_limit=5`)
      .then((res) => res.json())
      .then((json) => dispatch(receiveTodos(json)));
  };
};
