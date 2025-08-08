import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInbox } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
FontAwesomeIcon

const Voluntary = () => {
  return (
    <>
      <header className='header-voluntary'>
        <div className="slides">

          <div className="voluntary-title">
            <h1>Alza la voz por los que no pueden</h1>
            <p>Súmate al equipo</p>
          </div>

          <div className="slide-image-container">
            <img src="imgs\voluntary-frame.png" alt="" />
          </div>
        </div>
      </header>

      <main className='main-voluntary'>
        <h2> Conoce lo que necesitas para empezar</h2>
        <div className='voluntary-cards'>
          <div className="cards">


            <h3>Disponibilidad mínima</h3>
            <p>Puedes colaborar a tu ritmo, pero pedimos al menos unas horas semanales para asegurar continuidad y cuidado. </p>
          </div>
          <div className="cards">

            <h3>Compromiso y empatía</h3>
            <p>Trabajarás con animales que han pasado por situaciones difíciles. La paciencia y la sensibilidad son clave. </p>
          </div>
          <div className="cards">

            <h3>Mayor de 18 años</h3>
            <p>Por normativa de seguridad, todas las personas voluntarias deben ser mayores de edad. </p>
          </div>

        </div>

        <section className='voluntary-form-section'>
          
            <h2>
              ¿Quieres ayudar? Escríbenos y súmate.
            </h2>

         
          <form action="mailto:contacto@unhogarmas.cl">
            <input type="email" name="email" placeholder='Ingresa tu correo' required />
            <textarea name="mensaje" placeholder="Escribe tu mensaje"></textarea>
            <button> <FontAwesomeIcon icon={faInbox} /> Enviar</button>

          </form>

        </section>
      </main>
    </>
  )
}

export default Voluntary