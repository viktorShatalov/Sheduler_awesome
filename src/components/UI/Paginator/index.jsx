import React, { Fragment } from 'react';
import ReactPaginate from 'react-paginate';
import classnames from 'classnames';

import st from './paginator.module.scss';

const Paginator = ({onChange, pageCount, className, currentPage, config}) => {
  const def = {
    prev: 'previous',
    next: 'next'
  };

  const setts = {...def, config}

  return (
    <Fragment>
      {pageCount > 1 &&
      <div className={classnames(className, st.container)}>
        <ReactPaginate
          previousLabel={setts.prev }
          previousClassName={st.prev}
          nextClassName={st.next}
          nextLabel={setts.next }
          breakLabel={'...'}
          breakClassName={st.breakMe}
          pageCount={pageCount}
          forcePage={currentPage}
          // initialPage={initialPage}
          marginPagesDisplayed={2}
          pageRangeDisplayed={window.innerWidth > 500 ? 5 : 1}
          onPageChange={onChange}
          containerClassName={st.pagination}
          pageClassName={st.li}
          subContainerClassName={'pages pagination'}
          activeClassName={st.active}
          activeLinkClassName={st.activeLink}
          disabledClassName={st.disabled}
        />
      </div>
      }
    </Fragment>
  );
};

export default Paginator;