import React from 'react';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
const Pagination = ({ setPageNumber, pageCount, take }) => {
  const handlePageClick = (event) => {
    setPageNumber(event.selected + 1);
  };
  return (
    <div className="py-4 flex justify-end">
      <ReactPaginate
        nextLabel="Next"
        marginPagesDisplayed={2}
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        pageCount={Math.ceil(pageCount / take)}
        previousLabel="Prev"
        renderOnZeroPageCount={null}
        containerClassName="flex justify-center items-center"
        pageClassName="pagination-item-style"
        activeClassName="active"
        previousClassName="pagination-item-style prev"
        nextClassName="pagination-item-style next"
        disabledClassName="disabled-item"
      />
    </div>
  );
};
Pagination.propTypes = {
  setPageNumber: PropTypes.func,
  pageCount: PropTypes.number,
  take: PropTypes.number,
};
export default Pagination;
