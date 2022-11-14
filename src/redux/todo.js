import { SET_TODOS, DELETE_TODO, EDIT_TODO, TOGGLE_TODO, SET_LOADING } from './actions';

const initState = {
  items: [],
  loading: false,
};

// reducer
const reducer = (state = initState, actions) => {
  switch (actions.type) {
    case SET_TODOS:
      return {
        ...state,
        items: actions.payload,
      };
    case DELETE_TODO:
      const newItems = state.items.filter((item) => item.id !== actions.payload);
      return {
        ...state,
        items: [...newItems],
      };
    case EDIT_TODO:
      const stateEdited = { ...state };
      const itemsEdited = stateEdited.items.map((item) => {
        if (item.id === actions.payload.id) {
          return {
            ...item,
            ...actions.payload,
          };
        } else {
          return item;
        }
      });
      return {
        items: [...itemsEdited],
      };
    case TOGGLE_TODO:
      const stateToggled = { ...state };
      const itemsToggled = stateToggled.items.map((item) => {
        if (item.id === actions.payload.id) {
          return {
            ...item,
            ...actions.payload,
          };
        } else {
          return item;
        }
      });
      return {
        items: [...itemsToggled],
      };
    case SET_LOADING:
      return {
        ...state,
        loading: actions.payload,
      };
    default:
      return state;
  }
};

export default reducer;
