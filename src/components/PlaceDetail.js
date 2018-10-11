import React from 'react';
import PropTypes from 'prop-types';

// React Material Web Components
import { Button } from '@rmwc/button';
import { Typography } from '@rmwc/typography';

// Application Components
import '../css/App.css';

class PlaceDetail extends React.Component {

  static propTypes = {
    closePlaceDrawer: PropTypes.func.isRequired,
  }

  /**
   * @description Create the map area containing the map of our neighborhood
   * @returns {HTMLDivElement} Main application page
   * @memberof Map
   */
  render() {
    return (
      <div>
        <Typography use="body1">
          This is a paragraph describing this awesome freakin place
        </Typography>
        <Button id="place-drawer-close-btn" raised
          onClick={ this.props.closePlaceDrawer } >
          Close
        </Button>
      </div>
    )
  }
}

export default PlaceDetail;