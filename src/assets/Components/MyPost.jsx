import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileCirclePlus, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../Context/UserContext'


const Mypost = () => {

    const { token } = useContext(UserContext);
    const [myPets, setMyPets] = useState([])
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
        10: '10+ años'
    };


    const findMyPets = async (token) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/pets/myPets`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("error:", errorData);
                return false;
            }

            const data = await response.json();
            console.log(data.results);
            return data

        } catch (error) {
            console.error("Network or unexpected error:", error);
            return false;
        }
    };

    useEffect(() => {
        const fetchPets = async () => {
            const pets = await findMyPets(token);
            setMyPets(pets.results);
        };
        if (token) fetchPets();
    }, [token])


    return (
        <>
            <div className="my-posts">
                <h2>Mis publicaciones</h2>

                {myPets.length === 0 ? (
                    <p> No tienes mascotas publicadas</p>
                ) : (

                    <div className="card-list">
                        {myPets.map(pet => (
                            <Link className='card-link' key={pet.id} to={`/petProfile/${pet.id}`}>
                                <div className="card" >
                                    <div className="img">
                                        <img src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${pet.photo}`} alt="Mascota" />
                                    </div>

                                    <div className="cardInfo">
                                        <h3>{pet.name}</h3>
                                        <p>{pet.specie}, {ageMap[pet.age] || pet.age}</p>
                                    </div>
                                </div>
                            </Link>

                        ))}
                    </div>
                )}
                <div className="AddPetButton">
                    <button className='melon-button'>
                        <Link to="/createPost">
                            <FontAwesomeIcon icon={faFileCirclePlus} /> Agregar nueva mascota
                        </Link>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Mypost;