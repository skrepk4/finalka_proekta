export interface registerData{
    name: string;
    email: string;
    password: string
}
export interface loginData{
    email:string;
    password:string;
}
export interface user {
    name: string;
    email: string;
}
export interface authResponse {
    token: string;
    user: user
}