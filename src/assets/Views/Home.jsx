import React, { useEffect, useState } from 'react'
import '../../App.css'
import '../../AppQueries.css'
import { BoneIcon } from '../Icons/BoneIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInbox, faCalendarWeek, faMobileScreenButton, faMapLocationDot, faArrowRotateLeft, faBrain, faDog, faCouch, faHouse, faPaw } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Home = () => {

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % 2);
    }, 5000);

    return () => clearInterval(interval);
  }, []);


  return (

    <>
      <header className='header-home'>
        <div className="slides" style={{ transform: `translateX(-${current * 100}%)` }}>
          <div className='slide-image-container'>
            <img src="imgs\header-2.png" alt="" />
          </div>
          <h1>Desde Santiago, rescatamos vidas y creamos hogares.</h1>
        </div>
        <div className="slides" style={{ transform: `translateX(-${current * 100}%)` }}>
          <div className='slide-image-container'>
            <img src="imgs\header-1.png" alt="" />
          </div>
          <h1>Nuestro equipo es el corazón del rescate.
            <span>Tú también puedes ser parte de esta misión. </span>
          </h1>
        
        </div>
        <div className="indicators">
          <button onClick={() => setCurrent(0)} className={`dot ${0 === current ? 'active' : ''}`} />
          <button onClick={() => setCurrent(1)} className={`dot ${1 === current ? 'active' : ''}`} />
        </div>


      </header>

      <main className='main-home'>

        <h2>  Al adoptar con nosotros </h2>
        <section className='main-section'>

          <div className='main-pictures' >
            <img src="imgs\home-frame 1.png" alt="" />
          </div>
          <div className='cards-container'>
            <div className="cards">
              <FontAwesomeIcon icon={faDog} size="lg" />
              <h3>Ayudas a una vida en espera</h3>
              <p>Le das una segunda oportunidad a un ser que ha pasado por abandono o maltrato. </p>
            </div>
            <div className="cards">
              <FontAwesomeIcon icon={faArrowRotateLeft} size="lg" />
              <h3>Libera espacio para otro rescate</h3>
              <p>Cada adopción permite que podamos acoger a otro animal necesitado. Es un acto que se multiplica. </p>
            </div>
            <div className="cards">
              <FontAwesomeIcon icon={faBrain} size="lg" />
              <h3>Cuidas tu salud emocional</h3>
              <p>Está comprobado que compartir tu vida con una mascota reduce el estrés y mejora el bienestar emocional. </p>
            </div>
            <div className="cards">
              <BoneIcon />
              <h3>Compañía incondicional</h3>
              <p>Adoptar suma tu vida un amigo que te acompañará en todo momento, con amor y sin condiciones. </p>
            </div>
          </div>
          <button className='melon-button'> <Link to={'/adoptionForm'}> Guía paso a paso para adoptar</Link></button>

        </section>

        <h2>  Historias con final feliz </h2>
        <section className='main-section'>

          <div className='main-pictures' >
            <img src="imgs\home-frame 2.png" alt=""  />
          </div>
          <div className='cards-container'>
            <div className="cards">

              <FontAwesomeIcon icon={faCouch} size="lg" />
              <h3>De la calle al sofá</h3>
              <p>Simón pasó de dormir solo en el frío a compartir cada siesta con su nueva familia. Hoy, es el rey del sillón. </p>
            </div>
            <div className="cards">
              <BoneIcon />
              <h3>Una amistad inesperada</h3>
              <p>Max llegó tímido, pero con paciencia y cariño, encontró en Camila a su compañera de aventuras. </p>
            </div>
            <div className="cards">
              <FontAwesomeIcon icon={faHouse} size="lg" />
              <h3>Más que una adopción</h3>
              <p>Cuando Tomás adoptó a Luna, no solo le dio un hogar… también encontró una amiga para toda la vida. </p>
            </div>
            <div className="cards">
              <FontAwesomeIcon icon={faPaw} size="lg" />
              <h3>Nuevos comienzos</h3>
              <p> Sus historias nos recuerdan que siempre es posible volver a confiar. </p>
            </div>
          </div>

          <button className='melon-button'> <Link to={'/adoptList'}> Explora la lista de adopción</Link></button>
        </section>


      </main>
      <article className='map-container'>
        <div className="info">

          <h4> ¿Dónde estamos?</h4>

          <p> <FontAwesomeIcon icon={faMapLocationDot} size="lg" />Calle Jane Goodall #123, Stgo</p>
          <p> <FontAwesomeIcon icon={faMobileScreenButton} size="lg" />630-323-5630</p>
          <p> <FontAwesomeIcon icon={faCalendarWeek} size="lg" />Horario Lunes a Viernes 09:00 a 18:00</p>
          <p> <FontAwesomeIcon icon={faInbox} size="lg" /> contacto@unhogarmas.cl</p>

        </div>
        <div className="map">
          <img src="imgs\map-frame.png" alt="" />
        </div>

      </article>
    </>
  )
}

export default Home