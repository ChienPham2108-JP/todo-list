import styles from './TodoCard.module.scss';
import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';

import { deleteTodo, editTodo } from '../../redux/actions';

let cx = classNames.bind(styles);

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

function TodoCard({ content, isCompleted, toggleComplete, id }) {
  const textareaRef = useRef('');
  let { loading } = useSelector((state) => state.todo);
  let dispatch = useDispatch();

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = '#151625';
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleDelete(id) {
    console.log(id);
    dispatch(deleteTodo(id));
  }

  // Handle edit todo
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

  return (
    <div className={cx('card-wrap')}>
      <button className={cx('task_checkbox')} onClick={toggleComplete}>
        <div className={cx('task_checkbox__circle')}>
          <svg width="24" height="24">
            <path
              fill={isCompleted ? 'currentColor' : 'transparent'}
              d="M11.23 13.7l-2.15-2a.55.55 0 0 0-.74-.01l.03-.03a.46.46 0 0 0 0 .68L11.24 15l5.4-5.01a.45.45 0 0 0 0-.68l.02.03a.55.55 0 0 0-.73 0l-4.7 4.35z"
            ></path>
          </svg>
        </div>
      </button>
      <div className={cx('card')} style={isCompleted ? { filter: 'grayscale(100%)' } : {}}>
        <textarea
          style={{ background: '#fff' }}
          disabled
          ref={textareaRef}
          rows={4}
          className={cx('task_checkbox__content')}
          defaultValue={content}
        />
        <div className={cx('wrap-action')}>
          <button disabled={loading} className={cx('edit')} onClick={(e) => handleEdit(e, textareaRef.current, id)}>
            Edit
          </button>
          <button disabled={loading} className={cx('delete')} onClick={openModal}>
            Delete
          </button>

          {/* Modal Delete todo card */}
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            onClick={handleDelete}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Delete task</h2>
            <div>Are you sure to wanted to delete this task?</div>
            <div className={cx('wrapbtn')}>
              <button className={cx('btn', 'danger')} onClick={() => handleDelete(id)}>
                Delete
              </button>
              <button className={cx('btn', 'secondary')} onClick={closeModal}>
                Cancel
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default TodoCard;
