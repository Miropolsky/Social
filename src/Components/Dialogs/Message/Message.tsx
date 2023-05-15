import styles from '../Dialogs.module.scss';

type PropsType = {
    message: string
}
export function Message(props: PropsType) {
    return <div className={styles.message}>{props.message}</div>;
}
