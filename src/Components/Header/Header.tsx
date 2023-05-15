import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';


type PropsType = {
    isAuth: boolean,
    login: string | null,
    logout: () => void
}
export default function Header(props: PropsType) {
    return (
        <div className={styles.container}>
            <div className={styles.loginBlock}>
                {props.isAuth ? (
                    <div>
                        {props.login} -{' '}
                        <button onClick={props.logout}>Logout</button>
                    </div>
                ) : (
                    <NavLink to='/login'>Login</NavLink>
                )}
            </div>
        </div>
    );
}
