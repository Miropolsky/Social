import { NewsType } from '../../../api/NewsApi';
import {
    EditOutlined,
    EllipsisOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import styles from './NewsCard.module.scss';
const { Meta } = Card;

type PropsType = {
    news: NewsType;
};

export const NewsCard = (props: PropsType) => {
    const date = new Date(props.news.publishedAt);
    let day: string | number = date.getDate();
    let month: string | number = date.getMonth() + 1;
    let year: string | number = date.getFullYear();
    let hh: string | number = date.getHours();
    let mm: string | number = date.getMinutes();
    let ss: string | number = date.getSeconds();
    if (month < 10) {
        month = `0${month}`;
    }
    if (day < 10) {
        day = `0${day}`;
    }
    if (hh < 10) {
        hh = `0${hh}`;
    }
    if (mm < 10) {
        mm = `0${mm}`;
    }
    if (ss < 10) {
        ss = `0${ss}`;
    }
    const parseDate = `${day}.${month}.${year} ${hh}:${mm}:${ss}`;
    return (
        <Card style={{ width: '31.8%' }}>
            <Meta title={props.news.author} description={props.news.title} />
            <div className={styles.date}>{parseDate}</div>
        </Card>
    );
};
