import { supabase } from "./supabase";

export const saveBalance = async (userId: string, balance: number) => {
    const { error } = await supabase
        .from("profiles")
        .upsert({
            id: userId,
            balance,
        });

    if (error) throw error;
};

export const getBalance = async (userId: string) => {
    const { data, error } = await supabase
        .from("profiles")
        .select("balance")
        .eq("id", userId)
        .single();

    if (error) return 0;

    return Number(data.balance);
};