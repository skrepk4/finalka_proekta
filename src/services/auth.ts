import { supabase } from "./supabase";
type registerData = {
    name: string;
    email: string;
    password: string;
}

type loginData = {
    email: string;
    password: string;
}

export const registerUser = async (data: registerData) => {
    const { data: authData, error} = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
            data:{
                name: data.name
            },
        },
    })
    if (error) throw error
    return authData
}
export const loginUser = async (data: loginData) => {
    const {data: authData, error} = 
    await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
    })
    if (error) throw error

    return authData
}