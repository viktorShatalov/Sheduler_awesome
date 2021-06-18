import React, { Component } from 'react';
import classnames from 'classnames';
import qs from 'query-string';

const DEFAULT_CENTER = {
  lat: 40.7127753,
  lng: -74.0059728
};

const GEO_NA = {
  lat: {
    min: 27.539923, 
    max: 71.241482
  },
  lng: {
    min: -168.814113,
    max: -48.861465
  }
};

const checkGeoInNA = ({latitude, longitude}) => (latitude < GEO_NA.lat.max && latitude > GEO_NA.lat.min ) && (longitude < GEO_NA.lng.max && longitude > GEO_NA.lng.min );

class SeachBlock extends Component {
  constructor(props) {
    super();

    const search = qs.parse(props.location.search);

    this.state = {
      filter: {
        city: search.city || localStorage.getItem('city') || '',
        name: search.name || '',
        date: search.date || new Date(),
        occupation: search.occupation ? search.occupation.split(',') : ''
      },



      listState: 'loading',

    };
  };

  render() {
    return (
      <div>
        
      </div>
    );
  }
}

export default SeachBlock;