import styles from "./Statistics.module.scss"

interface Props {
    balance: number;
    income: number;
    expense: number;
}

const Statistics = ({ income, expense}: Props) => {
    return(
        <div className={styles.statistics}>

            <div className={styles.statistics__item}>
                
                <p className={styles.statistics__title}>Витрати:</p>
                <span className={styles.statistics__expense}>- {expense.toFixed(2)} грн</span>

            </div>

            <div className={styles.statistics__line}></div>

            <div className={styles.statistics__item2}>

                <p className={styles.statistics__title}>Доходи:</p>
                <span className={styles.statistics__income}> + {income.toFixed(2)} грн</span>
            </div>
        </div>
    )
}
export default Statistics