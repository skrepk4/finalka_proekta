import { useNavigate } from "react-router-dom"
import Logo from "../logo/Logo"
import styles from  "./header.module.scss"
const Header = () => {
    const navigate = useNavigate()
    const email = localStorage.getItem("email") || ""
    const name = localStorage.getItem("name") || ""
    const displayName = name || email
    const avatarLetter = displayName.charAt(0).toUpperCase()
    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("email")
        localStorage.removeItem("name")
        navigate("/")
    }
    return(
        <header className={styles.header}>
            <Logo />
            <div className={styles.header__user}>

                <div className={styles.header__avatar}>{avatarLetter}</div>

                <span className={styles.header__name}>{displayName}</span>

                <button onClick={handleLogout} className={styles.header__logout}>Вийти</button>
            </div>
        </header>
    )
}
export default Header