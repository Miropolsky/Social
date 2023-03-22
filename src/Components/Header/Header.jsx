import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

export default function Header(props) {
    return (
        <div className={styles.container}>
            <div className={styles.loginBlock}>
                {props.isAuth ? (
                    props.login
                ) : (
                    <NavLink to='/login'>Login</NavLink>
                )}
            </div>
        </div>
    );
}
