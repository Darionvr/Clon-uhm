import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../Context/UserContext';
import { jwtDecode } from 'jwt-decode';

const PetCard = ({ id, photo, name, gender, age, weight, deletePets }) => {

    const { token } = useContext(UserContext)
    let decoded = null;
    if (token) {
        try {
            decoded = jwtDecode(token);
        } catch (error) {
            console.error('Token inválido o corrupto:', error);
        }
    }

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
        10: '+10 años'
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
        10: '+10 kg',
    };


    return (
        <div className='card'>
            <Link to={`/petProfile/${id}`} >
                <div className='card-img'>
                    <img src={photo} alt={name} />
                </div>
                <div className='card-info'>
                    <h3>{name}</h3>
                    <p>Sexo: <span>{gender}</span></p>
                    <p>Edad: <span>{ageMap[age]}</span></p>
                    <p>Peso: <span>{weightMap[weight]}</span></p>
                </div>
            </Link>
            {decoded?.role === 'administrador' && <button className='melon-button' onClick={() => deletePets(id)}> Eliminar </button>}
        </div>
    )
}

export default PetCard