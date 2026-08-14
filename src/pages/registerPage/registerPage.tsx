import { useState } from "react"
import { registerUser } from "../../services/auth"
import { useNavigate } from "react-router-dom"
import styles from "./registerPage.module.scss"
import Logo from "../../components/logo/Logo"
const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const handleChange = (e: any) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
        ...prev,
        [name]: value,
        }));
    };
    const navigate = useNavigate()

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        try{
            const data = await registerUser(formData)

            localStorage.setItem("email", data.user?.email ?? "")
            localStorage.setItem("name", data.user?.user_metadata.name ?? "")

           setFormData({
            name:"",
            email: "",
            password: "",
           })
           navigate("/")
        } catch (error: any) {
            console.error(error)
            console.log(error.message);
            alert("Помилка")
        }
    }
    return(
        <div className={styles.register}>
            <header className={styles.register__header}>
                <Logo />
            </header>
            <div className={styles.register__container}>
                <div className={styles.register__left}>
                    <h1 className={styles.register__title}>InvestIQ</h1>
                    <p className={styles.register__subtitle}>Smart Finance</p>
                </div>
                 <div className={styles.register__card}>
                    <p className={styles.register__text}>Ви можете авторизуватися за допомогою акаунта Google</p>
                    <button type="button" className={styles.register__google}><img src={`${import.meta.env.BASE_URL}Group.png`} />Google</button>
                    <p className={styles.register__text}>Або увійти за допомогою ел. пошти та паролю після реєстрації</p>
                    <form className={styles.register__form} onSubmit={handleSubmit}>
                        <label className={styles.register__label}>Ім'я</label>
                        <input className={styles.register__input} placeholder="Ваше ім'я" type="text" name="name" value={formData.name} onChange={handleChange} />

                        <label className={styles.register__label}>Email</label>
                        <input className={styles.register__input} type="email" name="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} />
                        <label className={styles.register__label}>Пароль</label>
                        <input className={styles.register__input}  placeholder="Пароль" type="password" name="password" value={formData.password} onChange={handleChange} />

                        <div className={styles.register__buttons}>
                            <button type="submit" className={styles.register__button}>Зареєструватися</button>
                            
                        </div>
                        <p className={styles.register__bottomText}>Вже маєте акаунт? {" "} <span className={styles.register__link} onClick={() => navigate("/")}>Увійти</span></p>
                    </form>
                </div>           
            </div>
           
        </div>
    )
}
export default RegisterPage