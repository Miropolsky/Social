import NavMenu from './NavMenu/NavMenu';
import styles from './NavBar.module.scss';
import Friends from './Frineds/Friends';
import { FriendType } from '../../types/types';

export default function NavBar({ frinedsData }: {frinedsData: Array<FriendType>}) {
    return (
        <div className={styles.container}>
            <NavMenu text='Profile' link='profile' />
            <NavMenu text='Messages' link='dialogs' />
            <NavMenu text='News' link='news' />
            <NavMenu text='Music' link='music' />
            <NavMenu text='Setting' link='setting' />
            <NavMenu text='Users' link='users' />
            <Friends friends={frinedsData} />
        </div>
    );
}
