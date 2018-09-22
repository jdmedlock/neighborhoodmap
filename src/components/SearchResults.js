import React from 'react';
// import PropTypes from 'prop-types';

// React Material Web Components
// import { Grid, GridCell } from '@rmwc/grid';

// Application Components
import PlaceResult from './PlaceResult';
import '../css/App.css';

const SearchResults = (props) => {

  /**
   * @description Display search results
   * @returns {HTMLDivElement} Main application page
   * @memberof SearchResults
   */
  return (
    <div>
      <h3>Search Results...</h3>
      <PlaceResult />
    </div>
  )
}

export default SearchResults;
