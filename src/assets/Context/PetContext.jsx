import { createContext, useContext, useState, useEffect } from 'react';

export const PetsContext = createContext();

const PetsProvider = ({ children }) => {

  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [filtros, setFiltros] = useState({ size: "", age: "", specie: "" });

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
      setNext(data.next);
      setPrevious(data.previous);
    } catch (err) {
      console.error("Error cargando mascotas:", err);
    } finally {
      setLoading(false);
    }
  };

  const deletePets = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/pets/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // o desde otro contexto
        },
      });
      if (res.ok) {
        getPets();
      } else {
        console.log("No se pudo eliminar la mascota");
      }
    } catch (error) {
      console.log('Error al eliminar la mascota', error);
    }
  };

  const handleFilterChange = (e) => {
    setFiltros((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setPage(1);
  };

  useEffect(() => {
    getPets();
  }, [filtros, page]);

  return (
    <PetsContext.Provider value={{
      animals,
      loading,
      page,
      totalPages,
      next,
      previous,
      filtros,
      setPage,
      setFiltros,
      handleFilterChange,
      getPets,
      deletePets
    }}>
      {children}
    </PetsContext.Provider>
  );
};

export default PetsProvider
