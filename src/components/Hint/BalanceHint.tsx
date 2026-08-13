import styles from "./balancehint.module.scss"

const BalanceHint = () => {
    return(
        <div className={styles.hint}>
            <div className={styles.hint__arrow}></div>
            <p className={styles.hint__title}>Привіт! Для початку роботи внесіть свій поточний баланс рахунку!</p>
            <p className={styles.hint__text}>Ви не можете витрачати гроші, поки їх у Вас немає </p>
        </div>
    )
}
export default BalanceHint