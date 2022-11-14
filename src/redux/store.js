import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import todoReducer from './todo';

const reducer = combineReducers({
  todo: todoReducer,
});

// const myMiddleware = store => next => action => {
//   if (action.payload === 'fuck' && action.type === 'ADD_TODO') {
//     action.payload = '****'
//   }
//   return next(action)
// }

export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
