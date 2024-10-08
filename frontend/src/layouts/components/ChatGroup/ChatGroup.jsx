
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './ChatGroup.module.scss';

const cx = classNames.bind(styles);

function ChatGroup({avatar = 'default', username, message, className, onClick}) {
    return (
        <div className={cx('wrapper', className)}
            onClick={onClick}
        >
            <div className={cx('avatar')}>
              {avatar}
            </div>
            <div className={cx('info')}>
              <div className={cx('username')}>{username}</div>
              <div className={cx('message')}>{message}</div>
            </div>
        </div>
    );
}

ChatGroup.propTypes = {
  avatar: PropTypes.string,
  username: PropTypes.string,
  message: PropTypes.string,
  className: PropTypes.array,
  onClick: PropTypes.func
}

export default ChatGroup;