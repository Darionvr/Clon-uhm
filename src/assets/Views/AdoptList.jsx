import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../Components/Pagination';
import { jwtDecode } from 'jwt-decode';
import { UserContext } from '../Context/UserContext';


const AdoptList = () => {

  const { token } = useContext(UserContext);

  let decoded = null;

  if (token) {
    try {
      decoded = jwtDecode(token);
    } catch (error) {
      console.error('Token inválido o corrupto:', error);
    }
  }


  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [order, setOrder] = useState("asc");
  const [allAnimals, setAllAnimals] = useState([]);
  const [filtros, setFiltros] = useState({
    tamaño: '',
    edad: '',
    specie: ''
  });
  const getPets = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/pets?page=1&limit=1000`);
      const data = await res.json();
      const raw = Array.isArray(data.results) ? data.results : [];
      setAllAnimals(raw); 
      applyFrontendFilters(raw, filtros); 
    } catch (err) {
      console.error('Error cargando mascotas:', err);
    } finally {
      setLoading(false);
    }
  };
  const deletePets = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/pets/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })
      if (res.ok) {
        setAnimals(prev => prev.filter(pet => pet.id !== id));
      } else {
        console.log("No se pudo eliminar la mascota");
      }
    } catch (error) {
      console.log('Error al eliminar la mascota', error);
    }
  }
  const applyFrontendFilters = (data, filtros) => {
    let filtered = data;

    if (filtros.specie) {
      filtered = filtered.filter(pet => pet.specie === filtros.specie);
    }

    if (filtros.tamaño) {
      if (filtros.tamaño === '800gr-4kg') {
        filtered = filtered.filter(pet => pet.weight >= 0.8 && pet.weight <= 4);
      } else if (filtros.tamaño === '5kg-9kg') {
        filtered = filtered.filter(pet => pet.weight >= 5 && pet.weight <= 9);
      } else if (filtros.tamaño === '+10kg') {
        filtered = filtered.filter(pet => pet.weight >= 10);
      }
    }

    if (filtros.edad) {
      if (filtros.edad === '-1a') {
        filtered = filtered.filter(pet => pet.age < 1);
      } else if (filtros.edad === '1-3a') {
        filtered = filtered.filter(pet => pet.age >= 1 && pet.age <= 3);
      } else if (filtros.edad === '+4a') {
        filtered = filtered.filter(pet => pet.age > 4);
      }
    }

    setAnimals(filtered.slice((page - 1) * 5, page * 5)); 
    setTotalPages(Math.ceil(filtered.length / 5));
  };

  useEffect(() => {
    getPets();
  }, []);

  useEffect(() => {
    applyFrontendFilters(allAnimals, filtros);
  }, [filtros, page]);
  const handleFilterChange = (e) => {
    const newFilters = { ...filtros, [e.target.name]: e.target.value.trim() };
    setFiltros(newFilters);
    setPage(1);
    applyFrontendFilters(allAnimals, newFilters);
  };
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
    <div className='AdopListBody'>
      <h1>Encuentra a tu nuevo mejor amigo</h1>

      <div className='filtrer'>
        <select name='specie' value={filtros.specie} onChange={handleFilterChange}>
          <option value="">Especie</option>
          <option value="Gato">Gato</option>
          <option value="Perro">Perro</option>
          <option value="Conejo">Conejo</option>
        </select>

        <select name="tamaño" value={filtros.tamaño} onChange={handleFilterChange}>
          <option value="">Tamaño</option>
          <option value="800gr-4kg">Menor a 4kg</option>
          <option value="5kg-9kg">5kg a 9kg</option>
          <option value="+10kg">Mayor a 10kg</option>
        </select>

        <select name="edad" value={filtros.edad} onChange={handleFilterChange}>
          <option value="">Edad</option>
          <option value="-1a">Menor de un año</option>
          <option value="1-3a">Entre 1 y 3 años</option>
          <option value="+4a">Más de 4 años</option>
        </select>
      </div>

      <div className='card-list'>
        {loading ? (
          <>
            <p>Cargando mascotas...</p>
          </>
        ) : (
          animals.map((animal) => (
            <div className='card' key={animal.id} >
              <Link to={`/petProfile/${animal.id}`} >
                <div className='img'>
                  <img src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${animal.photo}`} alt={animal.name} />
                </div>
                <div className='cardInfo'>
                  <h3>{animal.name}</h3>
                  <p>Sexo: <span>{animal.gender}</span></p>
                  <p>Edad: <span>{ageMap[animal.age] || animal.age}</span></p>
                  <p>Peso: <span>{weightMap[animal.weight] || animal.weight}</span></p>
                </div>
              </Link>
              {decoded?.role === 'administrador' && <button className='melon-button' onClick={() => deletePets(animal.id)}> Eliminar </button>}
            </div>
          ))
        )}
      </div>

      <div className='pagination-container'>
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          next={next}
          previous={previous}
          filtros={filtros}
          order={order}
          fetchPets={getPets}
        />
      </div>


    </div>
  );
};

export default AdoptList;