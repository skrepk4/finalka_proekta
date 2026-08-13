import { useNavigate } from "react-router-dom"
import styles from "./loginPage.module.scss"
import { useState } from "react"
import { loginUser } from "../../services/auth"
import Logo from "../../components/logo/Logo"
const LoginPage = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email:"",
        password: ""
    })
    const handleChange = (e: any) => {
        const {name, value} = e.target

        setFormData({
            ...formData,
            [name]: value,
        })
    }
    const handleSubmit = async (e: any) => {
        e.preventDefault()

        try{
            const data = await loginUser(formData)

            localStorage.setItem("email", data.user?.email ?? "")
            localStorage.setItem("name", data.user?.user_metadata?.name ?? "")
            
            navigate("/dashboard")
        } catch(error){
            console.log(error)
            alert("pomilka")
        }
    }
    return(
        <div className={styles.login}>
            <header className={styles.login__header}>
                <div className={styles.login__logo}>
                    <Logo />
                </div>
            </header>
            
            <div className={styles.login__container}>
                <div className={styles.login__left}>
                    <h1 className={styles.login__title}>InvestIQ</h1>
                    <p className={styles.login__subtitle}>Smart Finance</p>
                </div>

                <div className={styles.login__card}>
                    <p className={styles.login__text}>Ви можете авторизуватися за допомогою акаунта Google</p>
                    <button className={styles.login__google}> <img src="/Group.png" alt=""/> Google</button>
                    <p className={styles.login__text}>Або увійти за допомогою ел. пошти та праолю після реєстрації</p>

                    <form className={styles.login__form} onSubmit={handleSubmit}>
                        <label className={styles.login__label}>Електронна пошта:</label>
                        <input className={styles.login__input} type="email" name="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} />

                        <label className={styles.login__label} htmlFor="">Пароль:</label>
                        <input className={styles.login__input} type="password" name="password" placeholder="Пароль" value={formData.password} onChange={handleChange} />
                        <div className={styles.login__buttons}>
                            <button className={styles.login__button1} type="submit">Увійти</button>
                            <button className={styles.login__button2} type="button" onClick={() => navigate("/register")}>Реєстрація</button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    
    )
}
export default LoginPage