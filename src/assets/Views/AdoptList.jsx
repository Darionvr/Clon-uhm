import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../Components/Pagination';
import { jwtDecode } from 'jwt-decode';
import { UserContext } from '../Context/UserContext';
import PetCard from '../Components/PetCard';


const AdoptList = () => {

  const { token } = useContext(UserContext);
  
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [filtros, setFiltros] = useState({ size: "", age: "", specie: "" });

  // Inicio
  const getPets = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page,
        limit: 10,
        specie: filtros.specie || "",
        size: filtros.size || "",
        age: filtros.age || ""
      });

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/pets?${params}`);
      const data = await res.json();

      setAnimals(data.results || []);
      setTotalPages(data.total_pages || 1);
    } catch (err) {
      console.error("Error cargando mascotas:", err);
    } finally {
      setLoading(false);
    }
  };

  // Eliminar
  const deletePets = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/pets/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })
      if (res.ok) {
        getPets();
      } else {
        console.log("No se pudo eliminar la mascota");
      }
    } catch (error) {
      console.log('Error al eliminar la mascota', error);
    }
  }

  useEffect(() => {
    getPets();
  }, [filtros, page]);

  const handleFilterChange = (e) => {
    setFiltros((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setPage(1); // Reiniciar a la primera página
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

        <select name="size" value={filtros.size} onChange={handleFilterChange}>
          <option value="">Tamaño</option>
          <option value="800gr-4kg">Menor a 4kg</option>
          <option value="5kg-9kg">5kg a 9kg</option>
          <option value="+10kg">Mayor a 10kg</option>
        </select>

        <select name="age" value={filtros.age} onChange={handleFilterChange}>
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
          animals.map((animal, i) => (
            <PetCard
              key={i}
              id={animal.id}
              photo={animal.photo}
              name={animal.name}
              gender={animal.gender}
              age={animal.age}
              weight={animal.weight}
              deletePets={deletePets}
            />
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
          fetchPets={getPets}
        />
      </div>


    </div>
  );
};

export default AdoptList;