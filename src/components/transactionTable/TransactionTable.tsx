import type { Transaction } from "../../types/transaction";
import styles from "./transactionTable.module.scss";

interface Props {
    transactions: Transaction[];
    deleteTransaction: (id: number) => void;
}

const TransactionTable = ({ transactions, deleteTransaction }: Props) => {
    return (
        <div className={styles.table}>

            <div className={styles.table__header}>
                <div className={styles.table__date}>Дата</div>
                <div>Опис</div>
                <div>Категорія</div>
                <div>Сума</div>
                <div></div>
            </div>

            <div className={styles.table__body}>
                {transactions.length === 0 ? (
                    <>
                    <div className={styles.table__empty}>
                        Поки що немає транзакцій
                        </div>
                        {Array.from({ length: 7 }).map((_, i) => (
                            <div key={i} className={styles.table__rowEmpty}></div>
                            ))}
                    </>
                ) : (
                    transactions.map((item) => (
                    <div key={item.id} className={styles.table__row}>
                        <div className={`${styles.table__cell} ${styles.table__date}`}>{item.date}</div>
                        <div className={styles.table__cell}>{item.description}</div>
                         <div className={styles.table__cell}>{item.category}</div>
                        <div
                            className={ item.type === "income" ? styles.table__income : styles.table__expense}>
                            {item.type === "income" ? `+ ${item.amount} грн.` : `- ${item.amount} грн.`}
                        </div>
                        <button className={styles.table__delete} onClick={() => deleteTransaction(item.id!)}>
                            <img src={`${import.meta.env.BASE_URL}TrashIcon.png`} />
                        </button>

                    </div>
                )))}
            </div>

        </div>
    );
};

export default TransactionTable;