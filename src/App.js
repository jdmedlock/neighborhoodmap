import React from 'react';
import { Route, Switch } from 'react-router-dom';

// React Material Web Components
import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarNavigationIcon,
  TopAppBarTitle
} from '@rmwc/top-app-bar';
import {
  Grid,
  GridCell
} from '@rmwc/grid';

// Application Components
import FooterBar from './components/FooterBar';
import Map from './components/Map';
import PlacePage from './components/PlacePage';
import SearchPage from './components/SearchPage';
import './css/App.css';

class NeighborhoodMap extends React.Component {

  // MainPage state
  state = {
    homeLatLng: '',
    searchRadius: 0
  }

  /**
   * @description Create the HTML for the following application pages:
   * - Search page to allow the user to search for locations and places
   * - Details page showing detail information about a specific location
   * @returns {HTMLDivElement} Main application page
   * @memberof NeighborhoodMap
   */
  render() {
    return (
      <div>
        <header>
          <TopAppBar>
            <TopAppBarRow>
              <TopAppBarSection alignStart>
                <TopAppBarNavigationIcon icon="" />
                <TopAppBarTitle>Neighborhood Map</TopAppBarTitle>
              </TopAppBarSection>
            </TopAppBarRow>
          </TopAppBar>
        </header>

        <Grid>
          <GridCell span="8">
            <section>
              <Switch>
                <Route exact path='/' render={() => (
                  <SearchPage />
                  )}/>
                <Route exact path='/search' render={() => (
                  <PlacePage />
                )}/>
              </Switch>
            </section>
          </GridCell>

          <GridCell span="8">
            <section className="map-container">
              <Map />
            </section>
          </GridCell>

          <GridCell span="8">
            <footer className="footer">
              <FooterBar />
            </footer>
          </GridCell>

        </Grid>

      </div>
    )
  }
}

export default NeighborhoodMap;
