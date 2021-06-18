import React, { Component } from 'react';

class LawyersList extends Component{
  constructor(props) {
    super();

    const { search } = props;

    this.state = {
      paginator: {
        fullCount: 0,
        pageCount: 0,
        onPage: 15,
        initPage: search.page || 1,
        currentPage: search.page || 1,
      },

      listState: 'loading',

      selectedLawyerId: null,
    };
  };

  render() {
    return (
      <div>
        
      </div>
    );
  }
};

export default LawyersList;