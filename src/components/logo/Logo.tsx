import styles from "./Logo.module.scss"

const Logo = () => {
    return(
        <div className={styles.logo}>
            <img src={`${import.meta.env.BASE_URL} public/logo.png alt="" `}/>
            <span className={styles.text}>InvestIQ</span>
        </div>
    )
}
export default Logo