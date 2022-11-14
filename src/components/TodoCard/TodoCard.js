import styles from './TodoCard.module.scss';
import classNames from 'classnames/bind';
import { useRef } from 'react';
import { useSelector } from 'react-redux';

let cx = classNames.bind(styles);

function TodoCard({ content, isCompleted, handleDelete, toggleComplete, handleEdit, id }) {
  const textareaRef = useRef('');
  let { loading } = useSelector((state) => state.todo);
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
          <button disabled={loading} className={cx('delete')} onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoCard;
