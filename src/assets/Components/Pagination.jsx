

const Pagination = ({ page, setPage, totalPages, next, previous }) => {

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${!previous ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => {if(previous){setPage(page-1)}}}disabled={page === 1}>Anterior</button>
        </li>
        {[...Array(totalPages)].map((_, i) => (
          <li key={i} className={`page-item ${page === i + 1 ? "active" : ""}`}>
            <button className="page-number" onClick={() => setPage(i + 1)}>{i + 1}</button>
          </li>
        ))}
        <li className={`page-item ${!next ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => {if(next){setPage(page + 1)}}} disabled={page === totalPages}>Siguiente</button>
        </li>
      </ul>
    </> 
  );  
};

export default Pagination;
