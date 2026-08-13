import { useState } from "react";
import styles from "./transactionForm.module.scss";
import type { Transaction } from "../../types/transaction";
import TransactionTable from "../transactionTable/TransactionTable";
import Summary from "../summary/Summary";
interface Props{
  addTransaction: (transaction: Transaction) => void;
  transactions: Transaction[];
  deleteTransaction: (id: number) => void
  clearTransactions: () => void
  type: string
  setType: React.Dispatch<React.SetStateAction<string>>;
  currentBalance: number
}
const TransactionForm = ({addTransaction, transactions, deleteTransaction, clearTransactions, type, setType, currentBalance}: Props) => {

    const [formData, setFormData] = useState({
        date: '',
        description: "",
        category: "",
        amount: ""
    })

    const [error, setError] = useState("")

    const expenseCategories = [
      "Транспорт",
      "Продукти",
      "Здоров'я",
      "Алкоголь",
      "Розваги",
      "Все для дому",
      "Техніка",
      "Комуналка, зв'язок",
      "Спорт, хобі",
      "Навчання",
      "Інше"
    ]
    const incomeCategories = [
      "ЗП",
      "Дод. прибуток"
    ]

    const handleChange = (e: any) => {
        const {name, value} = e.target

        setFormData({
            ...formData,
            [name]: value,
        })
    }
    const handleSubmit = () => {
      if(
        !formData.date ||
        !formData.description ||
        !formData.category ||
        !formData.amount 
      ) {
        alert("Заповніть усі поля")
        return
      }
      const amount = Number(formData.amount)
      if(type === "expense" && amount > currentBalance) {
        setError("Недостатьно коштів на рахунку, в мінус піти не можна")
        return
      }
        addTransaction({
          ...formData,
          type
        })

        setFormData({
            date: "",
            description: "",
            category: "",
            amount: ""
        })
        handleClear()
    }
    const handleClear = () => {
      setFormData({
        date: "",
        description: "",
        category: "",
        amount: "",
      })

    }
  return (
    <div className={styles.panel}>

      <div className={styles.panel__tabs}>
        <button className={type === "expense" ? styles.panel__tabActive : styles.panel__tab} onClick={() => setType("expense")} type="button">Витрати</button>

        <button className={type === "income" ? styles.panel__tabActive : styles.panel__tab} onClick={() => setType("income")} type="button">Дохід</button>
      </div>

      <div className={styles.panel__body}>
      {error && (<p className={`${styles.panel__error} ${error ? styles.panel__errorVisible : "" }`}>{error || "Недостатньо коштів"}</p>)}
        <div className={styles.panel__form}>

        <div className={styles.panel__inputs}>
          <input className={styles.panel__date} name="date" value={formData.date} onChange={handleChange} type="date"/>

          <input className={styles.panel__description} name="description" value={formData.description} onChange={handleChange} type="text" placeholder="Опис товару"/>

          <select className={styles.panel__category} name="category" value={formData.category} onChange={handleChange}><option value="">Категорія товару</option> {(type === "expense" ? expenseCategories : incomeCategories).map((category) => (<option key={category} value={category}>{category}</option>))}</select>

          <input className={styles.panel__amount} type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="0.00"/>
        </div>
        <div className={styles.panel__buttons}>
          <button className={styles.panel__submit} type="button" onClick={handleSubmit}>Ввести</button>

          <button className={styles.panel__clear} type="button" onClick={clearTransactions}>Очистити </button>
        </div>
        </div>

        <div className={styles.panel__table}>
          <TransactionTable transactions={transactions} deleteTransaction={deleteTransaction}/>
            <Summary type={type} transactions={transactions} />
        </div>

      </div>

    </div>
  );
};

export default TransactionForm;