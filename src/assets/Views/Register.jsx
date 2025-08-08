import React, { useContext, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faUpload } from '@fortawesome/free-solid-svg-icons'
import HomeLogo from '../Icons/HomeIcon'
import Home from './Home'
import { UserContext } from '../Context/UserContext'
import { useNavigate } from 'react-router-dom'


const Register = () => {

  const navigate = useNavigate();

  const { register } = useContext(UserContext)
  const [errors, setErrors] = useState({})

  const [registerForm, setRegisterForm] = useState({
    first_name: "",
    last_name: "",
    rut: "",
    email: "",
    password: "",
    password2: "",
    photo: null
  })

  const fileInputRef = useRef(null);


  const handleSubmit = async (e) => {
    e.preventDefault()

    const formErrors = validate();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setErrors({});

    const result = await register(registerForm);

    if (result?.token) {
      navigate('/myprofile');
    } else {
      console.error("Registro fallido");
    }

  }

  const validate = () => {
    const newErrors = {};

    if (!registerForm.first_name.trim()) {
      newErrors.nombre = 'Debes ingresar tu nombre';
    }
    if (!registerForm.last_name.trim()) {
      newErrors.apellido = 'Debes ingresar tu apellido';
    }
    if (!registerForm.rut.trim()) {
      newErrors.rut = 'Debes ingresar tu RUT';
    }

    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailPattern.test(registerForm.email)) {
      newErrors.email = 'Por favor ingresa un correo válido';
    }

    if (!registerForm.password.trim()) {
      newErrors.password = 'Debes ingresar una contraseña';
    }
    if (registerForm.password !== registerForm.password2) {
      newErrors.password2 = 'Las contraseñas no coinciden';
    }
    if (registerForm.photo && registerForm.photo.size > 5 * 1024 * 1024) {
      newErrors.photo = 'La imagen no puede superar los 5MB'
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setRegisterForm({
      ...registerForm,
      [name]: type === "file" ? files[0] : value
    });
  }

  return (
    <main className='main-register'>
      <div className="register-image">
        <img src="imgs\Form-frame.png" alt="" />
      </div>
      <div className="form-container">
        <h1> Súmate a Un Hogar Más <HomeLogo /> </h1>
        <p>Regístrate y descubre todas las formas en las que puedes ayudar.</p>

        <form id='register' action="" className='register-form' onSubmit={handleSubmit}>
          <div className="input-group">
            <input name='first_name' type="text" value={registerForm.first_name} placeholder='Ingresa tu nombre' onChange={handleChange} />
            {errors.nombre && <p className='form-error'> <img src="imgs\alert-icon.svg" alt="ícono alerta" />{errors.nombre}  </p>}
          </div>
          <div className="input-group">
            <input name='last_name' type="text" value={registerForm.last_name} placeholder='Ingresa tu apellido' onChange={handleChange} />
            {errors.apellido && <p className='form-error'> <img src="imgs\alert-icon.svg" alt="ícono alerta" />{errors.apellido}  </p>}
          </div>

          <div className="input-group">
            <input name='rut' type="text" value={registerForm.rut} placeholder='Ingresa tu RUT' onChange={handleChange} />
            {errors.rut && <p className='form-error'> <img src="imgs\alert-icon.svg" alt="ícono alerta" />{errors.rut}  </p>}

          </div>
          <div className="input-group">
            <input name='email' type="text" value={registerForm.email} placeholder='Ingresa tu email' onChange={handleChange} />
            {errors.email && <p className='form-error'> <img src="imgs\alert-icon.svg" alt="ícono alerta" />{errors.email}  </p>}
          </div>
          <div className="input-group">
            <input name='password' type="password" value={registerForm.password} placeholder='Contraseña' onChange={handleChange} />
            {errors.password && <p className='form-error'> <img src="imgs\alert-icon.svg" alt="ícono alerta" />{errors.password}  </p>}

          </div>
          <div className="input-group">
            <input name='password2' type="password" value={registerForm.password2} placeholder='Re ingresa tu contraseña' onChange={handleChange} />
            {errors.password2 && <p className='form-error'> <img src="imgs\alert-icon.svg" alt="ícono alerta" />{errors.password2}  </p>}

          </div>
          <div className="input-group" onClick={() => fileInputRef.current && fileInputRef.current.click()}>
            <FontAwesomeIcon icon={faUpload} />
            <input name='photo' type="file" onChange={handleChange} style={{ display: "none" }} ref={fileInputRef} />
            {registerForm.photo ? <span className="file-name">{registerForm.photo.name}</span> : <span> Selecciona tu foto de perfil</span>}
            {errors.photo && <p className='form-error'> <img src="imgs\alert-icon.svg" alt="ícono alerta" />{errors.photo}  </p>}

          </div>

          <button type='submit' form='register' className='melon-button'> <FontAwesomeIcon icon={faUserPlus} /> Unirme ahora</button>

        </form>


      </div>

    </main>
  )
}

export default Register