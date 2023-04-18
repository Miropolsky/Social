import styles from './Paginator.module.scss';
import React from 'react';

export default function Paginator(props) {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    return (
        <div className={styles.container}>
            <div className={styles.pages}>
                {pages.map((el) => {
                    return (
                        <span
                            key={el}
                            onClick={() => {
                                props.onPageChange(el);
                            }}
                            className={
                                props.currentPage === el
                                    ? styles.selectedPage
                                    : null
                            }
                        >
                            {el}
                        </span>
                    );
                })}
            </div>
        </div>
    );
}
