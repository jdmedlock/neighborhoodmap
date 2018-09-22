import React from 'react';

// React Material Web Components
import {
  Grid,
  GridCell
} from '@rmwc/grid';

// Application Components
import '../css/App.css';

class Map extends React.Component {

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
