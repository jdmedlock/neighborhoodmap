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
    console.log('document: ', document);
    let map = new window.google.maps.Map(document.getElementById('mapit'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    })
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
            <h1>Map</h1>
            <div id="mapit">
            </div>
          </GridCell>
        </Grid>
      </div>
    )
  }
}

export default Map;
