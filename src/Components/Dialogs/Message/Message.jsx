import styles from '../Dialogs.module.scss';

export function Message(props) {
    return <div className={styles.message}>{props.message}</div>;
}
