import NavMenu from './NavMenu/NavMenu';
import styles from './NavBar.module.scss';
import Friends from './Frineds/Friends';

export default function NavBar({ state }) {
    return (
        <div className={styles.container}>
            <NavMenu text='Profile' link='profile' />
            <NavMenu text='Messages' link='dialogs' />
            <NavMenu text='News' link='news' />
            <NavMenu text='Music' link='music' />
            <NavMenu text='Setting' link='setting' />

            <Friends friends={state.friends} />
        </div>
    );
}
