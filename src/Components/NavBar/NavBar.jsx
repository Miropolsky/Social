import NavMenu from '../NavMenu/NavMenu'
import styles from './NavBar.module.scss'

export default function NavBar() {
    return (
        <div className={styles.container}>
            <NavMenu text='Profile' link='profile'/>
            <NavMenu text='Messages' link='dialogs'/>
            <NavMenu text='News' link='news'/>
            <NavMenu text='Music'link='music'/>
            <NavMenu text='Setting'link='setting'/>
        </div>
    )
}