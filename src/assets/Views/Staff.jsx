import React from 'react'
import { Link } from 'react-router-dom'


const Staff = () => {
  return (
    <main className='main-staff'>
      <h1> Nuestro equipo veterinario</h1>
      <p>Conoce al equipo veterinario detrás del cuidado y recuperación de cada mascota. </p>
      <div className="container-staff">
        <div className="staff-pictures">
          <img src="imgs\our-team-frame-1.png" alt="" />
          <h2>Dra. María Torres</h2>
          <p>Especialista en medicina interna y bienestar animal. Comprometida con mejorar cada vida que pasa por el refugio.</p>
        </div>
        <div className="staff-pictures">
          <img src="imgs\our-team-frame-3.png" alt="" />
          <h2>Dra. Camila Rivas</h2>
          <p>Apasionada por la medicina preventiva y la educación comunitaria. Cree en la adopción como puente hacia el cambio.</p>
        </div>
        <div className="staff-pictures">
          <img src="imgs\our-team-frame-2.png" alt="" />
          <h2>Dr. Javier Soto</h2>
          <p>Cirujano veterinario y rescatista. Dedica su trabajo a dar segundas oportunidades con empatía y profesionalismo.</p>
        </div>
      </div>
      
          <h3>¿Te gustaría ser parte del equipo?</h3>
      
      <button className='melon-button'><Link to='/voluntary'> Súmate como voluntario</Link> </button>

      
    
    </main>
  )
}

export default Staff