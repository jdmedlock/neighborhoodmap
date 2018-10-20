import React from 'react';
import { Route, Switch } from 'react-router-dom';

// React Material Web Components
import { Grid, GridCell } from '@rmwc/grid';
import { TopAppBar, TopAppBarRow, TopAppBarSection, TopAppBarTitle } from '@rmwc/top-app-bar';
import { Typography } from '@rmwc/typography';

// Application Components
import Map from './components/Map';
import SearchPage from './components/SearchPage';
import MapsAPI from './utils/MapsAPI';
import './css/App.css';

class NeighborhoodMap extends React.Component {

  constructor(props) {
    super(props);

    // App state
    this.state = {
      // Coordinates of the center of our neighborhood
      home: {
        lat: Number.parseFloat(process.env.REACT_APP_LAT),
        lng: Number.parseFloat(process.env.REACT_APP_LNG)
      },
      // Maximum search radius in meters
      searchRadius: Number.parseInt(process.env.REACT_APP_SEARCH_RADIUS,10),
      searchResultsLimit: Number.parseInt(process.env.REACT_APP_SEARCH_RESULTS_LIMIT, 10),
      map: {},
      mapIsLoaded: false,
    };
  }

  /**
   * @description Load the Google map for our neighborhood and add insert it
   * into the DOM
   * @memberof NeighborhoodMap
   */
  componentDidMount() {
    MapsAPI.addScriptToDOM(process.env.REACT_APP_MAPS_URL, this.loadGoogleMap);
  }

  /**
   * @description Load the Neighborhood map
   * @returns {Promise} Promise that will be resolved when the map is loaded
   * @memberof NeighborhoodMap
   */
  loadGoogleMap = () => {
    MapsAPI.createMap(this.state.home)
    .then(map => {
      this.setState({ map: map });
      this.setState({ mapIsLoaded: true });
    })
    .catch(error => {
      console.log('Failed to load map. Error: ', error);

    });
  };

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
                <TopAppBarTitle>Neighborhood Map</TopAppBarTitle>
              </TopAppBarSection>
            </TopAppBarRow>
          </TopAppBar>
        </header>

        <main>
          <Grid>
            <GridCell span="4" phone="4" tablet="3" desktop="4">
              {
                this.state.mapIsLoaded ? (
                  <Switch>
                    <Route exact path='/' render={() => (
                      <SearchPage
                        home={ this.state.home}
                        searchRadius={ this.state.searchRadius }
                        searchResultsLimit={ this.state.searchResultsLimit }
                        map={ this.state.map }
                      />
                    )} />
                  </Switch>
                ) : ('')
              }
            </GridCell>
            {
              <GridCell className="map-container" span="4" phone="4" tablet="4" desktop="8">
              this.state.mapHasError ? (
                <Typography use="headline5">Google Maps API failure!</Typography>
                <Typography use="body1">
                  An error has occurred building the map. Please try again.
                </Typography>
              ) : (
                <Map id="map"/>
              ) 
              </GridCell>
            }
          </Grid>
        </main>
      </div>
    )
  }
}

export default NeighborhoodMap;