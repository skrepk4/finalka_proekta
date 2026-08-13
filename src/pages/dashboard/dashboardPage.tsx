import { useEffect, useState } from "react"
import Balance from "../../components/balance/Balance"
import Header from "../../components/header/header"
import Summary from "../../components/summary/Summary"
import TransactionForm from "../../components/transactionForm/TransactionForm"
import BalanceHint from "../../components/Hint/BalanceHint"
import styles from "./dashboardPage.module.scss"
import type { Transaction } from "../../types/transaction"
import { getBalance } from "../../services/balance"
import { saveTransaction, getTransactions, deleteTransactionFromDB, clearTransactionsFromDB } from "../../services/transactions"
import Diagram from "../../components/diagram/Diagram"
const dashboardPage = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [startBalance, setStartBalance] = useState(0)
    const [type, setType] = useState("expense")
    useEffect(() => {
        const loadBalance = async () => {
            const email = localStorage.getItem("email")

            if (!email) return
            try{
                const savedBalance = await getBalance(email)
                setStartBalance(savedBalance)
            } catch (error){
                console.log(error)
            }
        }
        loadBalance()
        loadTransactions()
    }, [])

    const loadTransactions = async () => {
        const email = localStorage.getItem("email")
        if (!email) return
        try{
            const data = await getTransactions(email)
            setTransactions(data)
        } catch(error){
            console.log(error)
        }
    }

    const addTransaction = async (transaction: Transaction) => {
        const email = localStorage.getItem("email")
        if(!email) return
        try{
            await saveTransaction(transaction, email);

            loadTransactions()
        } catch (error) {
            console.log(error)
        }
    }
    const currentBalance = startBalance + transactions.reduce((sum,item) => {
        if (item.type === "income") {
            return sum + Number(item.amount)
        }
        return sum - Number(item.amount)
    }, 0)
    const deleteTransaction = async (id: number) => {
            try{
                await deleteTransactionFromDB(id)
                loadTransactions()
            } catch (error) {
                console.log(error)
            }
    }
    const clearTransactions = async () => {
        const email = localStorage.getItem("email")

        if (!email) return

        try{
            await clearTransactionsFromDB(email, type)
            loadTransactions()
        } catch (error){
            console.log(error)
        }
    }
    const filteredTransactions = transactions.filter(
        item => item.type === type
    )
    return(
        <div className={styles.dashboard}>
            <Header />
        <div className={styles.dashboard__background}>

            <Balance balance={currentBalance} setBalance={setStartBalance}/>
                        
            <div className={styles.dashboard__content}>
                
                <div className={styles.dashboard__left}>
                    <TransactionForm type={type} setType={setType} addTransaction={addTransaction} clearTransactions={clearTransactions} transactions={filteredTransactions} deleteTransaction={deleteTransaction} currentBalance={currentBalance} />
                </div>
            </div>
        </div>
    </div>  
    )
}
export default dashboardPage