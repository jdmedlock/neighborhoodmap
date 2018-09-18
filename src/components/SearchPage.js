import React from 'react';
// import PropTypes from 'prop-types';
// import { Route } from 'react-router-dom';

// React Material Web Components
import {
  Grid,
  GridCell
} from '@rmwc/grid';

// Application Components
import '../css/App.css';

const SearchPage = (props) => {

  /**
   * @description Create the search page which provides the user with the means
   * to search on locations and places
   * @returns {HTMLDivElement} Main application page
   * @memberof SearchPage
   */
  return (
    <div>
      <Grid>
        <GridCell span="4">
          <h1>Search fields and info goes here</h1>
        </GridCell>
      </Grid>
    </div>
  )
}

export default SearchPage;
