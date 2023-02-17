import { NavLink } from 'react-router-dom';
import styles from '../Dialogs.module.scss';

export function DialogItem(props) {
    return (
        <div className={`${styles.dialog} ${styles.activeDialog}`}>
            <NavLink to={`/dialogs/${props.id}`}>{props.name}</NavLink>
            <div>
                <img src={props.imgUrl} alt='avatar' />
            </div>
        </div>
    );
}
