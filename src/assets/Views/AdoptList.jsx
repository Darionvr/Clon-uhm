import React, { useState, useEffect, useContext } from 'react';
import Pagination from '../Components/Pagination';
import { UserContext } from '../Context/UserContext';
import PetCard from '../Components/PetCard';
import { PetsContext} from '../Context/PetContext';

const AdoptList = () => {

  const { token } = useContext(UserContext);
  const {
    animals,
    loading,
    page,
    totalPages,
    next,
    previous,
    filtros,
    handleFilterChange,
    deletePets,
    setPage
  } = useContext(PetsContext);


  
  return (
    <main className='main-adopt-list'>
      <div className='adopt-list-body'>
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
          />
        </div>
      </div>
    </main>
  );
};

export default AdoptList;