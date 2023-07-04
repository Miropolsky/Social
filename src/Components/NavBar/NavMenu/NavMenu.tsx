import { NavLink } from 'react-router-dom'
import styles from './NavMenu.module.scss'

export default function NavMenu({text, link} : {text: string, link: string}) {
    return (
        <div>
            <NavLink to={`/${link}`} className={navData => navData.isActive ? styles.active : styles.text}>{text}</NavLink>
        </div>
    )
}