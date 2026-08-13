import styles from "./Logo.module.scss"

const Logo = () => {
    return(
        <div className={styles.logo}>
            <img src="./public/logo.png" alt="" />
            <span className={styles.text}>InvestIQ</span>
        </div>
    )
}
export default Logo