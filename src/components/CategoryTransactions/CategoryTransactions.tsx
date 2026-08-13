import type { Transaction } from "../../types/transaction";
import styles from "./CategoryTransactions.module.scss"
interface Props {
    transactions: Transaction[];
    category: string;
    type: string
}
const CategoryTransactions = ({transactions, category, type}: Props) => {
    const CategoryTransactions = transactions.filter(
        (item) => item.category === category && item.type === type
    )

    if(CategoryTransactions.length === 0) {
        return null
    }
    return(
        <div className={styles.transactions}>
            <h2 className={styles.transaction__title}>{category}</h2>
            <div className={styles.transactions__list}>
                {CategoryTransactions.map((item) => (
                    <div className={styles.transaction__item} key={item.id}>
                        <span>{item.description}</span>
                        <span>{Number(item.amount).toFixed(2)} грн</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default CategoryTransactions