import * as TodoApiUtil from '../util/todoApiUtil';

export const RECEIVE_TODO = 'RECEIVE_TODO';
export const RECEIVE_TODOS = 'RECEIVE_TODOS';
export const REMOVE_TODO = 'REMOVE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';

export const receiveTodo = (todo, listId) => ({
  type: RECEIVE_TODO,
  todo,
  listId,
});

export const receiveTodos = (todos) => ({
  type: RECEIVE_TODOS,
  todos,
});

export const removeTodo = (todoId, userId) => ({
  type: REMOVE_TODO,
  todoId,
  userId,
});

export const updateTodo = (todo) => ({
  type: UPDATE_TODO,
  todo,
});

export const createTodo = (todo, listId) => (dispatch) =>
  TodoApiUtil.createTodo(todo, listId).then((newTodo) => {
    dispatch(receiveTodo(newTodo, listId));
  });

export const deleteTodo = (todoId) => (dispatch, getState) => {
  const currentUserId = getState().session.id;

  return TodoApiUtil.removeTodo(todoId).then(() => {
    dispatch(removeTodo(todoId, currentUserId));
  });
};

export const editTodo = (todo) => (dispatch) =>
  TodoApiUtil.updateTodo(todo).then(() => {
    dispatch(updateTodo(todo));
  });

export const fetchTodos = () => (dispatch) =>
  TodoApiUtil.fetchTodos().then((todos) => {
    dispatch(receiveTodos(todos));
  });
