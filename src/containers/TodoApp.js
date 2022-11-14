// import { connect } from 'react-redux'

// import TodoApp from '../components/TodoApp'
// import { addTodo, setTodos, fetchTodos } from '../redux/todo';

// const mapStateToProps = (state) => ({
//   todos: state.todo.items
// })

// const mapActionsToProps = dispatch => ({
//   addTodo: (text) => dispatch(addTodo(text)),
//   setTodos: (items) => dispatch(setTodos(items)),
//   fetchTodos: () => dispatch(fetchTodos())
// })

// export default connect(mapStateToProps, mapActionsToProps)(TodoApp)

// import { connect } from "react-redux";
// import { fetchTodos, deleteTodo, addTodo } from "../redux/todo";
// import TodoApp from "../components/TodoApp";

// const mapStateToProps = (state) => ({
//   todos: state.todo.items
// })

// const mapDispatchToProps = dispatch => ({
//   addTodo: (item) => dispatch(addTodo(item)),
//   // setTodos: (items) => dispatch(setTodos(items)),
//   fetchTodos: () => dispatch(fetchTodos()),
//   // postTodo: (item) => dispatch(postTodo(item)),
//   deleteTodo: (id) => dispatch(deleteTodo(id))
// })

// export default connect(mapStateToProps, mapDispatchToProps)(TodoApp)
