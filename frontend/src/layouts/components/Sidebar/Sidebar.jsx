
import classNames from 'classnames/bind';

//import { useToken } from '../../../store';
import styles from './Sidebar.module.scss';
import { 
    CommentIcon,
    GearIcon, 
    UserIcon, 
    ContactsIcon
 } from '../../../components/Icons';
const cx = classNames.bind(styles);

function Sidebar() {  
    //const { token, setToken } = useToken();
    //console.log(valueContext);
    const page = location.pathname.substring 
            (location.pathname.lastIndexOf("/") + 1); 
    //console.log(page);
    return  (
        <div className={cx('wrapper')}> 
            <div className={cx('user')}> 
                <UserIcon className={cx('icon')}/>
            </div>
            <div className={cx('top')}>
                
                <a href = './' className={cx('item', page===''?'active':'')}>
                    <CommentIcon className={cx('icon')}/> 
                </a>
                <a href = './contact' className={cx('item',page==='contact'?'active':'')} >
                    <ContactsIcon className={cx('icon')}/>
                </a>
            </div>
            <div className={cx('bottom')}>
                <a className={cx('item',page==='setting'?'active':'')} >
                    <GearIcon className={cx('icon')}/>
                </a>
                
            </div>
        </div>
    ) ;
}

export default Sidebar;