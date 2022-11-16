import axios from 'axios';
// import { v4 as uuidv4 } from 'uuid';

export const SET_TODOS = 'SET_TODOS';
export const DELETE_TODO = 'DELETE_TODO';
export const ADD_TODO = 'ADD_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const COMPLETED_TODOS = 'COMPLETED_TODOS';
export const INCOMPLETED_TODOS = 'INCOMPLETED_TODOS';
export const SET_LOADING = 'SET_LOADING';

//action creators
const setTodos = (items) => ({
  type: SET_TODOS,
  payload: items,
});

// const todoAdded = (items) => ({
//   type: ADD_TODO,
//   payload: items,
// });

const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading,
});

const todoDeleted = (id) => {
  return {
    type: DELETE_TODO,
    payload: id,
  };
};

const todoToggled = (item) => {
  return {
    type: TOGGLE_TODO,
    payload: item,
  };
};

const todoEdited = (item) => {
  return {
    type: EDIT_TODO,
    payload: item,
  };
};

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
      // id: uuidv4(),
      content: text,
      isCompleted: false,
    };
    console.log(item);
    const res = await axios.post(`https://636b58bb7f47ef51e12db0e1.mockapi.io/todos`, item);
    console.log('response:', res.data);
    if (res.status === 201) {
      // dispatch(todoAdded(item));
      dispatch(fetchTodos());
    }
  } catch (error) {
    console.log(error);
  }
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

export const editTodo = (item) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axios.put(`https://636b58bb7f47ef51e12db0e1.mockapi.io/todos/${item.id}`, item);
    console.log('response:', res.data);
    if (res.status === 200) {
      dispatch(todoEdited(res.data));
    }
  } catch (error) {
    console.log(error);
  }
  dispatch(setLoading(false));
};
