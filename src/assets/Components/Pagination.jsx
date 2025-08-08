import{ useEffect } from 'react';

const Pagination = ({ page, setPage, totalPages, next, previous, filtros, order, fetchPets }) => {
  useEffect(() => {
    setPage(1);
    fetchPets(1, order);
  }, [filtros]);

  const handleChangePage = (newPage) => {
    setPage(newPage);
    fetchPets(newPage, order);
  };

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => handleChangePage(page - 1)} disabled={page === 1}>Anterior</button>
        </li>
        {[...Array(totalPages)].map((_, i) => (
          <li key={i} className={`page-item ${page === i + 1 ? "active" : ""}`}>
            <button className="page-number" onClick={() => handleChangePage(i + 1)}>{i + 1}</button>
          </li>
        ))}
        <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => handleChangePage(page + 1)} disabled={page === totalPages}>Siguiente</button>
        </li>
      </ul>
    </>
  );
};

export default Pagination;
