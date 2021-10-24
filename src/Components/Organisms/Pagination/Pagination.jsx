import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Pagination.scss';

function Pagination(props) {
  const { data, RenderComponent, pageLimit, dataLimit } = props;
  const [ pages ] = useState(Math.round(data.length / dataLimit));
  const [ currentPage, setCurrentPage ] = useState(1);

  const goToNextPage = () => {
    setCurrentPage(page => page + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage(page => page - 1);
  };

  const changePage = (e) => {
    const pageNumber = Number(e.target.textContent);
    setCurrentPage(pageNumber);
  };

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, index) => start + index + 1);
  };

  const renderCard = () => {
    return getPaginatedData().map((card) => {
      return (
        <Link to={`super-coach/${card.id}`} key={card.id}>
          <RenderComponent data={card} />
        </Link>
      );
    });
  };

  const renderPaginatedGroup = () => {
    const pagesToRender = [];
    for (let index = 0; index < pages; index++) {
      const element = index+1;
      pagesToRender.push(element);
    };

    return getPaginationGroup().map((item, index) => {
      return (
        <button
          key={index}
          onClick={changePage}
          className={`paginationItem ${currentPage === item ? 'active' : ''}`} >
          {item}
        </button>
      )
    })
  };

  const renderPrevNextButtons = () => {
    return (
      <>
        <button
          onClick={goToPreviousPage}
          className={`prev ${currentPage === 1 ? 'disabled' : ''}`} >
          Prev
        </button>
        <button
          onClick={goToNextPage}
          className={`next ${currentPage === pages ? 'disabled' : ''}`}>
          Next
        </button>
      </>
    );
  };

  return (
    <>
      <div className='pagination-cards-container'>
        { renderCard() }
      </div>
      <div className="pagination">
        <div className='pagination-group-btn-container'>
          { renderPaginatedGroup() }
        </div>
        <div className='prev-next-btn-container'>
          { renderPrevNextButtons() }
        </div>
      </div>
    </>
  );
};

export default Pagination;
