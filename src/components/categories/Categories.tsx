import { useMemo } from "react";
import type { Transaction } from "../../types/transaction";
import styles from "./Categories.module.scss"
import type React from "react";

interface Props {
    transactions: Transaction[]
    type: string
    setType: React.Dispatch<React.SetStateAction<string>>
    selectedCategory: string | null
    setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>
}
const expenseIcons: Record<string, string> = {
    "Продукти": "/categories/продукти.png",
    "Алкоголь": "/categories/алкоголь.png",
    "Розваги": "/categories/розваги.png",
    "Здоров'я": "/categories/здоров'я.png",
    "Транспорт": "/categories/транспорт.png",
    "Все для дому": "/categories/все для дому.png",
    "Техніка": "/categories/техніка.png",
    "Комуналка, зв'язок": "/categories/комуналка.png",
    "Спорт, хобі": "/categories/спорт.png",
    "Навчання": "/categories/навчання.png",
    "Інше": "/categories/інше.png",
};

const incomeIcons: Record<string, string> = {
    "ЗП": "/categories/зп.png",
    "Дод. прибуток": "/categories/дод-прибуток.png",
};

const Categories = ({ transactions, type, setType, selectedCategory, setSelectedCategory }: Props) => {
    
    const icons = type === "expense" ? expenseIcons : incomeIcons

    const categories = useMemo(() => {
        const result: Record<string, number> = {};

        transactions.forEach((item) => {
            if (item.type !== type) return;

            result[item.category] = (result[item.category] || 0) + Number(item.amount);
        });

        return Object.entries(result)
            .map(([category, amount]) => ({ category,amount,}))
            .sort((a, b) => b.amount - a.amount);

    }, [transactions, type])
    return(
        <div className={styles.categories}>
            <div className={styles.categories__header}>
                <button className={styles.categories__arrow} onClick={() => setType("expense")} disabled={type === "expense"}><img src="./arrowleft.png" alt="" /></button>
                <h2 className={styles.categories__title}>{type === "expense" ? "витрати" : "дохiд"} </h2>
                <button className={styles.categories__arrow} onClick={() => setType("income")} disabled={type === "income"}><img src="./arrowright.png" alt="" /></button>
            </div>
            <div className={`${styles.categories__grid} ${type === "income" ? styles.categories__gridIncome : ""}`}>
                {categories.map((item) => (
                    <div className={`${styles.categories__item} ${selectedCategory === item.category ? styles.categories__itemSelected : ""}`} onClick={() => {
                        setSelectedCategory(
                            selectedCategory === item.category ? null : item.category
                        )
                    }}>

                        <p className={styles.categories__amount}>{item.amount.toFixed(2)}</p>
                        <div className={styles.categories__iconBox}>
                            <img className={styles.categories__icon} src={icons[item.category]} alt={item.category} />
                        </div>
                        
                        <p className={styles.categories__name}>{item.category}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Categories