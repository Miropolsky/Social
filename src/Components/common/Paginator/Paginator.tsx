import styles from './Paginator.module.scss';
import React, { useState } from 'react';

type PropsType = {
    currentPage: number
    totalUsersCount: number
    pageSize: number
    onPageChange: (el: number) => void
}

export default function Paginator(props: PropsType) {
    let portionSize = 10;
    const [portionNum, setPortionNum] = useState(
        props.currentPage % portionSize === 0
            ? props.currentPage / portionSize
            : Math.floor(props.currentPage / portionSize + 1)
    );
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let rightPage = portionSize * portionNum;
    let leftPage = portionSize * (portionNum - 1) + 1;
    return (
        <div className={styles.container}>
            {portionNum !== 1 && (
                <button onClick={() => setPortionNum(portionNum - 1)}>
                    Prev
                </button>
            )}
            <div className={styles.pages}>
                {pages
                    .filter((el) => el >= leftPage && el <= rightPage)
                    .map((el) => {
                        return (
                            <span
                                key={el}
                                onClick={() => {
                                    props.onPageChange(el);
                                }}
                                className={
                                    props.currentPage === el
                                        ? styles.selectedPage
                                        : ''
                                }
                            >
                                {el}
                            </span>
                        );
                    })}
            </div>
            {portionNum !== pagesCount && (
                <button onClick={() => setPortionNum(portionNum + 1)}>
                    Next
                </button>
            )}
        </div>
    );
}
