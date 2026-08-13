import type { Transaction } from "../types/transaction";
import { supabase } from "./supabase";

export const saveTransaction = async (
    transaction: Transaction,
    userId: string
) => {
    const {error} = await supabase
    .from("transactions")
    .insert({
        user_id: userId,
        type: transaction.type,
        date: transaction.date,
        description: transaction.description,
        category: transaction.category,
        amount: transaction.amount,
    })
    if (error) throw error
}

export const getTransactions = async (userId: string) => {
    const {data, error} = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", {ascending: false})
    if(error) throw error
    
    return data
}
export const deleteTransactionFromDB = async (id: number) => {
    const {error} = await supabase
    .from("transactions")
    .delete()
    .eq("id", id)

    if (error) throw error
}
export const clearTransactionsFromDB = async (userId: string, type: string) => {
    const {error} = await supabase
    .from("transactions")
    .delete()
    .eq("user_id", userId)
    .eq("type", type)

    if(error) throw error
}