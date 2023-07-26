import styles from './News.module.scss';
import { useEffect } from 'react';
import { getPosts } from '../../redux/newsReducer';
import { AppDispatch, AppStateType } from '../../redux/reduxStore';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { NewsCard } from './NewsCard/NewsCard';

export default function News() {
    const dispatch: AppDispatch = useDispatch();
    const posts = useSelector((state: AppStateType) => {
        return state.news.posts;
    });
    useEffect(() => {
        dispatch(getPosts() as unknown as AnyAction);
    }, []);
    return (
        <div className={styles.container}>
            <div className={styles.news}>
                {posts.map((el, i) => {
                    return <NewsCard news={el} key={i} />;
                })}
            </div>
        </div>
    );
}

export const NewsContainer = () => {};
