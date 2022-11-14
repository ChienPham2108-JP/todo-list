import React, { useState, useEffect } from 'react';
import styles from './TodoApp.module.scss';
import classNames from 'classnames/bind';
import TodoCard from './TodoCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, deleteTodo, addTodo, toggleTodo, editTodo } from '../redux/actions';
import debounce from 'lodash.debounce';

let cx = classNames.bind(styles);

function TodoApp() {
  let dispatch = useDispatch();
  let { items } = useSelector((state) => state.todo);

  // const [todo, setTodo] = useState({
  //   content: '',
  //   isCompleted: false,
  // });
  const [text, setText] = useState('');
  // const { content } = todo;

  const [error, setError] = useState('Please enter task in task field!!!');

  const [active, setActive] = useState('all');

  let filterItems = [...items];

  if (active === 'completed') {
    filterItems = filterItems.filter((item) => item.isCompleted === true);
  }
  if (active === 'incomplete') {
    filterItems = filterItems.filter((item) => item.isCompleted === false);
  }

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure to wanted to delete the task???')) {
      dispatch(deleteTodo(id));
    }
  };

  const handleInputChange = (e) => {
    // setTodo({
    //   ...todo,
    //   content: e.target.value,
    // });
    setText(e.target.value);
  };

  const toggleComplete = (id) => {
    let targetItem = items.find((item) => {
      return id === item.id;
    });
    dispatch(toggleTodo(targetItem));
  };
  const debounceToggleComplete = debounce(toggleComplete, 500);

  // Handle add to do
  const handleClick = () => {
    if (!text) {
      setError('Task field cannot be empty!!!');
      window.alert(error);
    } else {
      dispatch(addTodo(text));
      setText('');
    }
  };

  // Handle edit todo item
  const handleEdit = (e, target, id) => {
    if (e.target.innerText === 'EDIT') {
      target.disabled = false;
      target.focus();
      e.target.innerText = e.target.innerText === 'EDIT' ? 'SAVE' : 'EDIT';
      return;
    }

    if (e.target.innerText === 'SAVE') {
      // e.target.onclick = () => {
      const itemEdited = {
        id: id,
        content: target.value,
        isCompleted: false,
      };
      dispatch(editTodo(itemEdited));
      e.target.innerText = 'EDIT';
      target.disabled = true;
    }
    // }
  };

  // Handle active status
  const handleActive = (e) => {
    setActive(e.target.textContent);
  };

  return (
    <>
      <div className={cx('container')}>
        <div className={cx('add-card')}>
          <input
            className={cx('input')}
            type="text"
            value={text}
            onChange={handleInputChange}
            placeholder="Enter new task"
          />
          <button className={cx('add-button')} onClick={handleClick}>
            ADD
          </button>
        </div>
        <div className={cx('filter-wrap')}>
          <span className={active === 'all' ? cx('filter', 'active') : cx('filter')} onClick={(e) => handleActive(e)}>
            all
          </span>
          <span
            className={active === 'completed' ? cx('filter', 'active') : cx('filter')}
            onClick={(e) => handleActive(e)}
          >
            completed
          </span>
          <span
            className={active === 'incomplete' ? cx('filter', 'active') : cx('filter')}
            onClick={(e) => handleActive(e)}
          >
            incomplete
          </span>
        </div>
        <div className={cx('wrapper')}>
          <div className={cx('wrap-todos')}>
            {filterItems.length !== 0 ? (
              filterItems.map((item) => (
                <TodoCard
                  key={item.id}
                  isCompleted={item.isCompleted}
                  id={item.id}
                  content={item.content}
                  toggleComplete={() => debounceToggleComplete(item.id)}
                  handleDelete={() => handleDelete(item.id)}
                  handleEdit={handleEdit}
                />
              ))
            ) : (
              <div>No task found!</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoApp;
