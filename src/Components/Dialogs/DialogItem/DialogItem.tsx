import { NavLink } from 'react-router-dom';
import styles from '../Dialogs.module.scss';

type PropsType = {
    id: number
    name: string
    imgUrl: string
}
export function DialogItem(props: PropsType) {
    return (
        <div className={`${styles.dialog} ${styles.activeDialog}`}>
            <NavLink to={`/dialogs/${props.id}`}>{props.name}</NavLink>
            <div>
                <img src={props.imgUrl} alt='avatar' />
            </div>
        </div>
    );
}
