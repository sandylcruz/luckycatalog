import { ajax } from 'jquery';

export const createTodo = (todo, listId) =>
  new Promise((resolve, reject) => {
    ajax({
      type: 'POST',
      url: 'api/todos',
      data: {
        todo: {
          title: todo.title,
          done: todo.done,
          list_id: listId,
        },
      },
      success: (newTodo) => {
        resolve(newTodo);
      },
      error: () => {
        reject();
      },
    });
  });

export const updateTodo = (todo) =>
  new Promise((resolve, reject) => {
    ajax({
      type: 'PATCH',
      url: `api/todos/${todo.id}`,
      data: {
        todo: {
          title: todo.title,
          done: todo.done,
        },
      },
      success: (updatedTodo) => {
        resolve(updatedTodo);
      },
      error: () => {
        reject();
      },
    });
  });

export const removeTodo = (todoId) =>
  new Promise((resolve, reject) => {
    ajax({
      type: 'DELETE',
      url: `api/todos/${todoId}`,
      success: () => {
        resolve();
      },
      error: () => {
        reject();
      },
    });
  });

export const fetchTodos = () =>
  new Promise((resolve, reject) => {
    ajax({
      type: 'GET',
      url: 'api/todos/',
      success: (todos) => {
        resolve(todos);
      },
      error: () => {
        reject();
      },
    });
  });
