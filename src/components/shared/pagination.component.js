import { useEffect, useState } from "react";
import "../../assets/css/app.css";

const PaginationComponent = (props) => {
  const {
    pageNumber,
    pageSize,
    areMoreCountriesLeftToShow,
    totalCountryCount,
    switchPageHandler,
  } = props;
  const [totalPagesAvailable, setTotalPagesAvailable] = useState(totalCountryCount);

  useEffect(() => {
    const leftOverItemsInLastPage = totalCountryCount % pageSize;
    const totalPagesAvailable = leftOverItemsInLastPage ? (totalCountryCount - leftOverItemsInLastPage) / (pageSize) + 1 : (totalCountryCount - leftOverItemsInLastPage) / (pageSize);
  
    setTotalPagesAvailable(totalPagesAvailable);
  }, [totalCountryCount, pageSize])

  return (
    <div className='pull-right' id="paginationSection">
      <div>
        <small>Page <b>{pageNumber}</b> of <b>{totalPagesAvailable}</b></small>
      </div>
      <button disabled={pageNumber === 1} id="p-button" onClick={() => switchPageHandler(-1)}>
        Previous Page
      </button>
      <button disabled={areMoreCountriesLeftToShow === 0 || totalPagesAvailable === pageNumber} id="n-button" onClick={() => switchPageHandler(1)}>
        Next Page
      </button>
    </div>
  )
}

export default PaginationComponent;