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

  const datosForm = [
    {
      name: 'first_name', type: 'text', placeholder: 'Ingresa tu nombre',
    }, {
      name: 'last_name', type: 'text', placeholder: 'Ingresa tu apellido',
    }, {
      name: 'rut', type: 'text', placeholder: 'Ingresa tu RUT',
    }, {
      name: 'email', type: 'email', placeholder: 'Ingresa tu correo',
    }, {
      name: 'password', type: 'password', placeholder: 'Ingresa tu contraseña',
    }, {
      name: 'password2', type: 'password', placeholder: 'Re ingresa tu contraseña',
    }
  ]

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
      newErrors.fist_name = 'Debes ingresar tu nombre';
    }
    if (!registerForm.last_name.trim()) {
      newErrors.last_name = 'Debes ingresar tu apellido';
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
          
        {datosForm.map((dato) => (
           <div className="input-group">
             <input name={dato.name} type={dato.type} value={registerForm[dato.name]} placeholder={dato.placeholder} onChange={handleChange} />
              {errors[dato.name] && <p className='form-error'> <img src="imgs\alert-icon.svg" alt="ícono alerta" />{errors[dato.name]}  </p>}
           </div>
        ))}
          
          <div className="input-group-photo" onClick={() => fileInputRef.current && fileInputRef.current.click()}>
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