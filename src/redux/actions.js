import axios from 'axios';

export const SET_TODOS = 'SET_TODOS';
export const DELETE_TODO = 'DELETE_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const COMPLETED_TODOS = 'COMPLETED_TODOS';
export const INCOMPLETED_TODOS = 'INCOMPLETED_TODOS';

//action creators
const setTodos = (items) => ({
  type: SET_TODOS,
  payload: items,
});

export const fetchTodos = () => async (dispatch) => {
  try {
    const res = await axios.get('https://636b58bb7f47ef51e12db0e1.mockapi.io/todos?sortBy=isCompleted');
    console.log('response:', res.data);
    if (res.status === 200) {
      dispatch(setTodos(res.data));
    }
  } catch (error) {
    console.log(error);
  }
};

const todoDeleted = (id) => {
  return {
    type: DELETE_TODO,
    payload: id,
  };
};

export const deleteTodo = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`https://636b58bb7f47ef51e12db0e1.mockapi.io/todos/${id}`);
    console.log('response:', res.data);
    if (res.status === 200) {
      dispatch(todoDeleted(res.data.id));
    }
  } catch (error) {
    console.log(error);
  }
};

export const addTodo = (text) => async (dispatch) => {
  try {
    const item = {
      content: text,
      isCompleted: false,
    };
    const res = await axios.post(`https://636b58bb7f47ef51e12db0e1.mockapi.io/todos`, item);
    console.log('response:', res.data);
    if (res.status === 201) {
      dispatch(fetchTodos());
    }
  } catch (error) {
    console.log(error);
  }
};

const todoToggled = (item) => {
  return {
    type: TOGGLE_TODO,
    payload: item,
  };
};

export const toggleTodo = (item) => async (dispatch) => {
  try {
    item.isCompleted = !item.isCompleted;
    const res = await axios.put(`https://636b58bb7f47ef51e12db0e1.mockapi.io/todos/${item.id}`, item);
    console.log('response:', res.data);
    if (res.status === 200) {
      dispatch(todoToggled(res.data));
      dispatch(fetchTodos());
    }
  } catch (error) {
    console.log(error);
  }
};

const todoEdited = (item) => {
  return {
    type: EDIT_TODO,
    payload: item,
  };
};

export const editTodo = (item) => async (dispatch) => {
  try {
    const res = await axios.put(`https://636b58bb7f47ef51e12db0e1.mockapi.io/todos/${item.id}`, item);
    console.log('response:', res.data);
    if (res.status === 200) {
      dispatch(todoEdited(res.data));
    }
  } catch (error) {
    console.log(error);
  }
};
