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

class Map extends React.Component {

  /**
   * @description Load the Google map for our neighborhood and add insert it
   * into the DOM
   * @memberof Map
   */
  componentDidMount() {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 28.4812299, lng: -80.8883962 },
      zoom: 8
    });
  }

  /**
   * @description Create the map area containing the map of our neighborhood
   * @returns {HTMLDivElement} Main application page
   * @memberof Map
   */
  render() {
    return (
      <div>
        <Grid>
          <GridCell span="8">
            <section id="map" />
          </GridCell>
        </Grid>
      </div>
    )
  }
}

export default Map;
