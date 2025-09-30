import { Link } from 'react-router-dom'


const Staff = () => {

  const doctores = [
    {
      nombre: "Dra. María Torres",
      descripcion: "Especialista en medicina interna y bienestar animal. Comprometida con mejorar cada vida que pasa por el refugio",
      fotosrc: "our-team-frame-1.png",
    }, {
      nombre: 'Dra. Camila Rivas',
      descripcion: 'Apasionada por la medicina preventiva y la educación comunitaria. Cree en la adopción como puente hacia el cambio.',
      fotosrc: 'our-team-frame-3.png'
    }, {
      nombre: 'Dr. Javier Soto',
      descripcion: 'Cirujano veterinario y rescatista. Dedica su trabajo a dar segundas oportunidades con empatía y profesionalismo.',
      fotosrc: 'our-team-frame-2.png'
    }
  ]

  return (
    <main className='main-staff'>
      <h1> Nuestro equipo veterinario</h1>
      <p>Conoce al equipo veterinario detrás del cuidado y recuperación de cada mascota. </p>
      <div className="container-staff">
        {doctores.map((doc, i) => (
          <div className="staff-pictures" key={i}>
            <img src={`imgs/${doc.fotosrc}`} alt="" />
            <h2>{doc.nombre}</h2>
            <p>{doc.descripcion}</p>
          </div>
        ))}

      </div>
      <h3>¿Te gustaría ser parte del equipo?</h3>
      <button className='melon-button'><Link to='/voluntary'> Súmate como voluntario</Link> </button>
    </main>
  )
}

export default Staff