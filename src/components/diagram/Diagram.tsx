import { useMemo, useEffect, useState } from "react";
import type { Transaction } from "../../types/transaction";
import styles from "./Diagram.module.scss"
import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LabelList, Cell, CartesianGrid,} from "recharts"
interface Props {
    transactions: Transaction[]
    type: string
    selectedCategory: string | null
}
const colors = [
    "#FF751D",
    "#FFDAC0"
]
const Diagram = ({transactions, type, selectedCategory}: Props) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 750)
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 750)
        }
        window.addEventListener("resize", handleResize)

        return() => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])
    const diagData = useMemo(() => {
        if (selectedCategory){
            return transactions
            .filter(
                (item) => item.type === type && item.category === selectedCategory
            )
            .map((item) => ({
                name: item.description, amount: Number(item.amount)
            }))
        }
        const result: Record<string, number> = {}

        transactions.forEach((item) => {
            if (item.type !== type) return

            result[item.category] = (result[item.category] || 0) + Number(item.amount)

        })

        return Object.entries(result)
            .map(([name, amount]) => ({ name, amount,}))

            .sort((a, b) => b.amount - a.amount);
    }, [transactions, type, selectedCategory]);
    
    return(
        <div className={styles.diagram}>
            <div className={styles.diagram__chart}>
                <ResponsiveContainer width="100%" height="100%">
                    {isMobile ? (
                        <BarChart layout="vertical" data={diagData} margin={{top: 10, right: 40,bottom: 10}}>              
                            <XAxis type="number" hide/>
                            <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} width={65} tick={{ fill: "#52555F", fontSize: 12, }}/> 
                            <Tooltip cursor={false} formatter={(value) => `${value} грн`} contentStyle={{ borderRadius: "15px", border: "none" }}/>
                                <CartesianGrid stroke="#F5F6FB" strokeDasharray="3 3" horizontal={false}/>
                            <Bar dataKey="amount"  radius={[0, 10, 10, 0]}>
                                {diagData.map((_, index) => (
                                    <Cell key={index} fill={colors[index % colors.length]}/>
                                ))}

                                <LabelList dataKey="amount" position="right" fill="#52555F" formatter={(value) => `${Number(value).toFixed(0)} грн`}/>
                            </Bar>
                        </BarChart>
                    ) : (
                        <BarChart data={diagData} margin={{ top: 40, right: 20, left: 20, bottom: 20}}>
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#52555F", fontSize: 12}}/>
                            <YAxis hide />
                            <Tooltip cursor={false} formatter={(value) => `${value} грн`} contentStyle={{ borderRadius: "15px", border: "none"}}/>
                            <CartesianGrid stroke="#F5F6FB" strokeDasharray="3 3" vertical={false}/>
                            <Bar dataKey="amount" radius={[10, 10, 0, 0]}>
                                {diagData.map((_, index) => (
                                    <Cell key={index} fill={colors[index % colors.length]}/>
                                ))}
                                <LabelList dataKey="amount" position="top" fill="#52555F" formatter={(value) => `${Number(value).toFixed(0)} грн`}/>
                            </Bar>
                        </BarChart>
                        )}
                </ResponsiveContainer>
            </div>
        </div>
    )
} 
export default Diagram