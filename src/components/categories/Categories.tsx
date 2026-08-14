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
  "Продукти": `${import.meta.env.BASE_URL}categories/продукти.png`,
  "Алкоголь": `${import.meta.env.BASE_URL}categories/алкоголь.png`,
  "Розваги": `${import.meta.env.BASE_URL}categories/розваги.png`,
  "Здоров'я": `${import.meta.env.BASE_URL}categories/здоров'я.png`,
  "Транспорт": `${import.meta.env.BASE_URL}categories/транспорт.png`,
  "Все для дому": `${import.meta.env.BASE_URL}categories/все для дому.png`,
  "Техніка": `${import.meta.env.BASE_URL}categories/техніка.png`,
  "Комуналка, зв'язок": `${import.meta.env.BASE_URL}categories/комуналка.png`,
  "Спорт, хобі": `${import.meta.env.BASE_URL}categories/спорт.png`,
  "Навчання": `${import.meta.env.BASE_URL}categories/навчання.png`,
  "Інше": `${import.meta.env.BASE_URL}categories/інше.png`,
};

const Categories = ({ transactions, type, setType, selectedCategory, setSelectedCategory }: Props) => {
    
    const getIcon = (category: string) => {
    if (type === "expense") {
        return expenseIcons[category]
    }

    if (category === "ЗП" || category === "Зарплата") {
        return `${import.meta.env.BASE_URL}categories/зп.png`
    }

    if (
        category === "Дод. прибуток" ||
        category === "Додатковий прибуток"
    ) {
        return `${import.meta.env.BASE_URL}categories/дод-прибуток.png`
    }

    return ""
}

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
                <button className={styles.categories__arrow} onClick={() => setType("expense")} disabled={type === "expense"}><img src={`${import.meta.env.BASE_URL}arrowleft.png`} /></button>
                <h2 className={styles.categories__title}>{type === "expense" ? "витрати" : "дохiд"} </h2>
                <button className={styles.categories__arrow} onClick={() => setType("income")} disabled={type === "income"}><img src={`${import.meta.env.BASE_URL}arrowright.png`} /></button>
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
                            <img className={styles.categories__icon} src={getIcon(item.category)} alt={item.category} />
                        </div>
                        
                        <p className={styles.categories__name}>{item.category}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Categories