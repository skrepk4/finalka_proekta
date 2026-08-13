import { useMemo } from "react";
import type { Transaction } from "../../types/transaction";
import styles from "./summary.module.scss";

interface Props {
  transactions: Transaction[];
  type: string
}
const months = [
  "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"
]
const Summary = ({ transactions, type }: Props) => {

  const monthsSummary = useMemo(() => {
    const result: Record<string, number> = {};
    transactions.forEach((item) => {
      if (item.type !== type) return

      const month = months[new Date(item.date).getMonth()]
      result[month] = (result[month] || 0) + Number(item.amount)
    })
    return Object.entries(result).sort(
      (a,b) => months.indexOf(b[0]) - months.indexOf(a[0])
    )
  }, [transactions]);

  return (
    <div className={styles.summary}>
      <h2 className={styles.summary__title}>зведення</h2>
      <div className={styles.summary__list}>
        {monthsSummary.length === 0 ? (
          <p className={styles.summary__empty}>
            Поки що немає витрат
          </p>
        ) : (
          monthsSummary.map(([month, amount]) => (
            <div key={month} className={styles.summary__row}>
              <span>{month}</span>
              <span>{amount.toFixed(2)}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Summary;