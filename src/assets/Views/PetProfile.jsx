import { Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import { jwtDecode } from 'jwt-decode';


const PetProfile = () => {

  const { id } = useParams();
  const [animal, setAnimal] = useState(null);
  const { token } = useContext(UserContext)
const navigate = useNavigate();

  let decoded = null;
  if (token) {
    try {
      decoded = jwtDecode(token);
    } catch (error) {
      console.error('Token inválido o corrupto:', error);
    }
  }
  const deletePets = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/pets/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })
      if (res.ok) {
        navigate('/adoptList');
      } else {
        console.log("No se pudo eliminar la mascota");
      }
    } catch (error) {
      console.log('Error al eliminar la mascota', error);
    }
  }


  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/pets/${id}`, {
          headers: {'Authorization': `Bearer ${token}`}
        }

        );
        const data = await res.json();
        setAnimal(data);
    
      } catch (err) {
        console.error('Error al obtener datos del animal:', err);
      }
    };


    fetchAnimal();
  }, [id]);

  if (!animal) return <main className='pet-main'> <p>Cargando información de la mascota...</p> </main>

  const ageMap = {
    0.25: '3 meses',
    0.33: '4 meses',
    0.41: '5 meses',
    0.5: '6 meses',
    0.58: '7 meses',
    0.67: '8 meses',
    0.75: '9 meses',
    0.83: '10 meses',
    0.91: '11 meses',
    1: '1 año',
    2: '2 años',
    3: '3 años',
    4: '4 años',
    5: '5 años',
    6: '6 años',
    7: '7 años',
    8: '8 años',
    9: '9 años',
    10: 'Mayor de 10 años'
  };

  const weightMap = {
    0.8: '800 gr',
    0.9: '900 gr',
    1: '1 kg',
    2: '2 kg',
    3: '3 kg',
    4: '4 kg',
    5: '5 kg',
    6: '6 kg',
    7: '7 kg',
    8: '8 kg',
    9: '9 kg',
    10: 'Mayor de 10 kg'
  };

  return (
    <main className='pet-main'>
      <div className="pet-photo">
        <img src={animal.photo} alt={`Foto de ${animal.name}`} />

      </div>
      <div className="pet-info">
        <h1> {animal.name}</h1>
        <p>Especie: <span>{animal.specie}</span> </p>
        <p>Edad: <span>{ageMap[animal.age] || animal.age}</span></p>
        <p>Peso: <span>{weightMap[animal.weight] || animal.weight}</span></p>
        <p>Sexo: <span>{{
          macho: 'Macho', hembra: 'Hembra'
        }[animal.gender?.trim().toLowerCase()] || 'Desconocido'} </span></p>
        <p>Chip: <span>{animal.chip === true ? 'Sí tiene chip' : animal.chip === false ? 'No tiene chip' : 'Desconocido'}</span></p>
        <p>Descripcion: <span>{animal.description} </span> </p>
        <button className='melon-button'> <Link to={'/adoptionGuide'}>  Comenzar adopción</Link></button>
        {(decoded?.role === 'administrador' || animal.isOwner) && ( <button className='melon-button' onClick={() => deletePets(id)}> Eliminar </button>)}

      </div>
    </main>
  )
}

export default PetProfile