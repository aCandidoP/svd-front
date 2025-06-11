export default function Paginacao({ setPerPage, totalPages, setPage }) {
  function handleOnChange(e) {
    setPerPage(e.target.value);
  }

  return (
    <div className="d-flex justify-content-between align-items-center">
      <div className="mx-auto">
        <button className="me-2 px-3 py-1 border rounded border-secondary cursor-pointer hover-bg-light disabled-opacity-50 disabled-cursor-not-allowed">
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;
          return (
            <button
              className="px-3 py-1 border rounded border-secondary cursor-pointer hover-bg-light"
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
        <button className="ms-2 px-3 py-1 border rounded border-secondary cursor-pointer hover-bg-light disabled-opacity-50 disabled-cursor-not-allowed">
          &gt;
        </button>
      </div>
      <select name="perPage" id="perPage" onChange={handleOnChange}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
    </div>
  );
}
