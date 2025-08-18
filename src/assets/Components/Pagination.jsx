

const Pagination = ({ page, setPage, totalPages }) => {

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => setPage((p) => p - 1)}disabled={page === 1}>Anterior</button>
        </li>
        {[...Array(totalPages)].map((_, i) => (
          <li key={i} className={`page-item ${page === i + 1 ? "active" : ""}`}>
            <button className="page-number" onClick={() => handleChangePage(i + 1)}>{i + 1}</button>
          </li>
        ))}
        <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => setPage((p) => p + 1)} disabled={page === totalPages}>Siguiente</button>
        </li>
      </ul>
    </> 
  );  
};

export default Pagination;
