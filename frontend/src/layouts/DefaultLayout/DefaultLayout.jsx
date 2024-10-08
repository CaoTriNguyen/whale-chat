
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Sidebar from '../components/Sidebar';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles); 

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Sidebar/>
            <div className={cx('chat-content')}>
                {children}
            </div>
        </div> 
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired
}

export default DefaultLayout;