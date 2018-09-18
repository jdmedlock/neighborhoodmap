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

const Map = (props) => {

  /**
   * @description Create the map area containing the map of our neighborhood
   * @returns {HTMLDivElement} Main application page
   * @memberof Map
   */
  return (
    <div>
      <Grid>
        <GridCell span="4">
          <h1>Map</h1>
        </GridCell>
      </Grid>
    </div>
  )
}

export default Map;
