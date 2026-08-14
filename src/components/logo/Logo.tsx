import styles from "./Logo.module.scss"

const Logo = () => {
    return(
        <div className={styles.logo}>
            <img src={`${import.meta.env.BASE_URL}logo.png`}/>
            <span className={styles.text}>InvestIQ</span>
        </div>
    )
}
export default Logo