import { useEffect, useState } from "react"
import type { Transaction } from "../../types/transaction"
import { getTransactions } from "../../services/transactions"
import styles from "./diagramPage.module.scss"
import Header from "../../components/header/header"
import Diagram from "../../components/diagram/Diagram"
import { getBalance } from "../../services/balance"
import Statistics from "../../components/statistics/Statistics"
import Balance from "../../components/balance/Balance"
import { useNavigate } from "react-router-dom"
import Categories from "../../components/categories/Categories"
const DiagramPage = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [startBalance, setStartBalance] = useState(0)
    const [type, setType] = useState("expense")
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const navigate = useNavigate()
    const currentMonth = new Date().toLocaleDateString("uk-UA", {month: "long", year: "numeric"})
    const loadBalance = async () => {
        const email = localStorage.getItem("email")
        if(!email) return
        try{
            const balance = await getBalance(email)
            setStartBalance(balance)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadTransactions();
        loadBalance()
    }, [])

    const loadTransactions = async () => {
        const email = localStorage.getItem("email")
        if(!email) return
        try {
            const data = await getTransactions(email)
            setTransactions(data)
        } catch (error) {
            console.log(error)
        }
    }
    const income = transactions.filter(item => item.type === "income").reduce((sum, item) => sum + Number(item.amount), 0)

    const expense = transactions.filter(item => item.type === "expense").reduce((sum,item) => sum + Number(item.amount), 0)

    const currentBalance = startBalance + income - expense
    return(
        <div className={styles.diagramPage}>
            <Header />
            <div className={styles.diagramPage__background}>
                <div className={styles.diagramPage__top}>

                    <button className={styles.diagramPage__back} onClick={() => navigate("/dashboard")}><img src= {`${import.meta.env.BASE_URL} arrow.png" alt=""`} />Повернутись на головну</button>

                    <Balance showDiagramLink={false} balance={currentBalance} setBalance={setStartBalance} showHint={false} compact={true} />
               
                    <div className={styles.diagramPage__period}>
                        <p className={styles.diagramPage__periodTitle}>Поточний період</p>
                        <div>
                            <button className={styles.diagramPage__periodButton}><img src={`${import.meta.env.BASE_URL}arrowleft.png alt=""`} /></button>  
                            <span className={styles.diagramPage__periodDate}>{currentMonth}</span>
                        <button className={styles.diagramPage__periodButton}><img src={`${import.meta.env.BASE_URL}arrowright.png alt=""`} /></button>
                        </div>
                    </div>
                </div>   
                <Statistics balance={currentBalance} income={income} expense={expense} />

                <div className={styles.diagramPage__container}>
                    
            </div>
                <Categories transactions={transactions} type={type} setType={setType} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                <Diagram transactions={transactions} type={type} selectedCategory={selectedCategory} />
            </div>
        </div>
)
}
export default DiagramPage