import type React from "react";
import styles from "./balance.module.scss"
import { startTransition, useEffect, useState } from "react";
import { saveBalance } from "../../services/balance";
import { Link } from "react-router-dom";
import BalanceHint from "../Hint/BalanceHint";
interface Props {
    balance: number;
    setBalance: React.Dispatch<React.SetStateAction<number>>
    showDiagramLink?: boolean
    showHint?: boolean
    compact?: boolean
}
const Balance = ({balance, setBalance, showDiagramLink= true, showHint = true, compact = false,}: Props) => {
    const [value, setValue] = useState("")
    useEffect(() => {
        if (balance > 0) {
            setValue(balance.toFixed(2))
        } else{
            setValue("")
        }
    }, [balance])
        const handleSave = async() => {
            if (!value.trim()) {
                return
            }
            const newBalance = Number(value)
            if (isNaN(newBalance) || newBalance < 0) {
                alert("Введіть коректний баланс")
                return
            }
            if (newBalance === balance) {
                return
            }
            const email = localStorage.getItem("email")
            if (!email) return

            try{
                await saveBalance(email, newBalance)
                setBalance(newBalance)
            } catch (error) {
                console.log(error)
            }
        }
    return(
        <div className={`${styles.balance} ${compact ? styles.balanceCompact : "" }`}>
                <p className={styles.balance__title}>Баланс:</p>
                <div className={styles.balance__inputBox}>
                    <input className={styles.balance__input} type="number" placeholder="0,00" value={value} onChange={(e) => setValue(e.target.value)} />
                    <span className={styles.balance__currency}>UAH</span>
                </div>
                <div className={styles.balance__confirm}>
                    <button className={styles.balance__button} onClick={handleSave}>Підтвердити</button>
                    {showHint && balance === 0 && <BalanceHint />}
                </div>
            {showDiagramLink && (
                <Link to="/diagram" className={styles.balance__link}>
                    <span className={styles.balance__text}>Перейти до розрахунків</span>
                    <img className={styles.balance__icon} src="/barChart.png" alt="Статистика" />
            </Link>
            )}

        </div>
    )
}
export default Balance