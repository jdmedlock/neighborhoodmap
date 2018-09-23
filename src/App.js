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

  constructor(props) {
    super(props);

    // App state
    this.state = {
      homeLatLng: '',
      map: {},
      mapIsLoaded: false,
      searchResults: []
    };
  }

  /**
   * @description Load the Google map for our neighborhood and add insert it
   * into the DOM
   * @memberof NeighborhoodMap
   */
  componentDidMount() {
    this.loadGoogleMap().then((map) => {
      this.setState({ map: map });
      this.setState({ mapIsLoaded: true });
    });
  }

  /**
   * @description Load the Neighborhood map
   * @returns {Promise} Promise that will be resolved when the map is loaded
   * @memberof NeighborhoodMap
   */
  loadGoogleMap() {
    return new Promise((resolve, reject) => {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 28.5729, lng: -80.6490 },
        zoom: 10,
        mapTypeId: 'roadmap'
      });
      resolve(map);
    });
  }

  /**
   * @description Replace the search results in our state
   * @param {*} searchResults Array of place results
   * @memberof NeighborhoodMap
   */
  setSearchResults(searchResults) {
    this.setState({ searchResults: searchResults });
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
              { 
                this.state.mapIsLoaded ? (
                  <Switch>
                    <Route exact path='/' render={() => (
                      <SearchPage
                        map={ this.state.map } 
                        setSearchResults={ this.setSearchResults } />
                      )}/>
                    <Route exact path='/search' render={() => (
                      <PlacePage />
                    )}/>
                  </Switch>
                ) : ('')
              }
            </section>
          </GridCell>

          <GridCell span="8">
            <section className="map-container">
              <Map id="map"/>
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
