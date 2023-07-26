import styles from './Paginator.module.scss';
import React from 'react';
import { Pagination } from 'antd';

type PropsType = {
    currentPage: number;
    totalUsersCount: number;
    pageSize: number;
    onPageChange: (el: number) => void;
};

export default function Paginator(props: PropsType) {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    return (
        <div className={styles.container}>
            <Pagination
                current={props.currentPage}
                total={pagesCount}
                showSizeChanger={false}
                showQuickJumper
                pageSize={props.pageSize}
                onChange={(e) => props.onPageChange(e)}
            />
        </div>
    );
}
