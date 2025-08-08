import { Link, useLocation } from "react-router-dom"
import '../../App.css'
import HomeLogo from "../Icons/HomeIcon"
import PersonLogo from "../Icons/PersonIcon"
import PawIcon from "../Icons/PawIcon"
import { useContext, useEffect, useRef, useState } from "react"
import { faSquareXmark, faBars, faPeopleGroup, faHandHoldingHeart, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import LoginForm from "./LoginForm"
import { UserContext } from "../Context/UserContext"



const Navbar = () => {


  const dialogRef = useRef(null);
  const openModal = () => dialogRef.current.showModal();
  const closeModal = () => dialogRef.current.close();
  const location = useLocation();
  const { token, logout, currentUser} = useContext(UserContext);


  useEffect(() => {
    if (dialogRef.current && dialogRef.current.open) {
      dialogRef.current.close();
    }
  }, [location]);

  return (
    <>
      <nav>

        <Link to="/"><HomeLogo />Un Hogar Más</Link>
        <Link to="/staff">Nuestro equipo</Link>
        <Link to="/voluntary">Colabora con nosotros</Link>

        <button className='melon-button'> <Link to="/adoptList"><PawIcon /> Ver mascotas </Link> </button>
        <button className='melon-button person' onClick={openModal}> <PersonLogo /> </button>
        <button className="melon-button hamburguer" onClick={openModal}> <FontAwesomeIcon icon={faBars} size="lg" /></button>

        <dialog ref={dialogRef}>
          <div className="dialog-container">
            <button className="close-button" onClick={closeModal}><FontAwesomeIcon icon={faSquareXmark} size="2x" /></button>
            <div className="mobile-menu">
              <p>Menú</p>
              <Link to="/staff"> <FontAwesomeIcon icon={faPeopleGroup} />Nuestro equipo</Link>
              <Link to="/voluntary"> <FontAwesomeIcon icon={faHandHoldingHeart} />Colabora con nosotros</Link>
              <hr />
            </div>

            {token ? (
              <>
                <p> Hola </p>
                <h1 className="user-name"> {currentUser.first_name}</h1>
                <Link to={`/myprofile`}>
                  <img src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${currentUser.photo}`} className="modal-pic" />
                </Link>

                <button className="melon-button" onClick={() => { logout(); closeModal() }}> <FontAwesomeIcon icon={faRightFromBracket} /> <Link to={'/'}> Cerrar Sesión</Link></button>
              </>
            ) : (
              <>

                <p>Bienvenido de vuelta</p>
                <h1> Inicia sesión</h1>
                <LoginForm />

                <Link onClick={closeModal} to={'/register'}> Crear una cuenta  </Link>
              </>
            )}



          </div>
        </dialog>

      </nav>

    </>
  )
}

export default Navbar