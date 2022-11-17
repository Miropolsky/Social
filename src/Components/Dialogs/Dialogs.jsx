import styles from './Dialogs.module.scss';

export default function Dialogs() {
    return (
        <div className={styles.container}>
            <div className={styles.dialogs}>
                <div className={`${styles.dialog} ${styles.activeDialog}`}>
                    Andrey
                </div>
                <div className={styles.dialog}>
                    Alexey
                </div>
                <div className={styles.dialog}>
                    Sergey
                </div>
                <div className={styles.dialog}>
                    Vasya
                </div>
                <div className={styles.dialog}>
                    Ivan
                </div>
            </div>
            <div className={styles.messages}>
                <div className={styles.message}>Привет! Как дела</div>
                <div className={styles.message}>Привет, у меня отлично, у тебя как?</div>
                <div className={styles.message}>Тоже хорошо</div>
            </div>
        </div>
    )
}