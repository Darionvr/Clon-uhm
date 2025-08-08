import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../Context/UserContext.jsx'
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {

    const { login } = useContext(UserContext);
    const [errors, setErrors] = useState({})
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formErrors = validate();

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return
        }
        setErrors({});

        const result = await login(email, password);

        if (result?.token) {
            navigate('/Myprofile');
        } else {
            setErrors({ general: "Usuario o contraseña incorrectos" });
        }
    }

    const validate = () => {
        const newErrors = {};

        const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        if (!emailPattern.test(email)) {
            newErrors.email = 'Por favor ingresa un correo válido';
        }

        if (!password.trim()) {
            newErrors.password = 'Debes ingresar una contraseña'
        }
        return newErrors;
    }


    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Ingresa tu correo" value={email} onChange={(e) => setEmail(e.target.value)} />
            {errors.email && <p className='form-error'> <img src="imgs\alert-icon.svg" alt="ícono alerta" />{errors.email}  </p>}
            <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
            {errors.password && <p className='form-error'> <img src="imgs\alert-icon.svg" alt="ícono alerta" />{errors.password} </p>}
            {errors.general && <p className='form-error'><img src="imgs\alert-icon.svg" alt="ícono alerta" />{errors.general}</p>}

            <button type="submit" className='melon-button'> Ingresar </button>
        </form>
    )
}

export default LoginForm