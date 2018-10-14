import React from 'react';
import debounce from "lodash.debounce";
import PropTypes from 'prop-types';

// React Material Web Components
import { Fab } from '@rmwc/fab';
import { Grid, GridCell } from '@rmwc/grid';
import { TextField, TextFieldIcon } from '@rmwc/textfield';

// Application Components
import FSAPI from '../utils/FoursquareAPI';
import MapsAPI from '../utils/MapsAPI';
import '../css/App.css';

class SearchInput extends React.Component {

  static propTypes = {
    home: PropTypes.object.isRequired,
    searchRadius: PropTypes.number.isRequired,
    map: PropTypes.object.isRequired,
    searchResultsLimit: PropTypes.number.isRequired,
    saveSearchResults: PropTypes.func.isRequired,
    saveInfoWindow: PropTypes.func.isRequired,
    showPlaceDetails: PropTypes.func.isRequired,
  };

  /**
   * @description Establish the state for this component
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    // SearchPage state
    this.state = {
      searchText: "",
      placesService: new window.google.maps.places.PlacesService(this.props.map)
    };

    // Bind 'this' to the event handlers so they'll have the proper context
    this.handleChange = this.handleChange.bind(this);
    this.showTopAttractions = this.showTopAttractions.bind(this);
    this.emitChangeDebounce = debounce(this.queryLocation, 150);
  }

  /**
   * @description Link Google Maps Autocomplete to the search text fiels
   * @memberof SearchInput
   */
  componentDidMount() {
    // Default to search for local attractions
    this.showTopAttractions();

    MapsAPI.createSearchBox(this.props.map,
      'search-text', this.handlePlaceChange);
  };

  /**
   * @description Add input entered by the user to the searchText element in
   * our state. Keystrokes are debounced to prevend the queryLocation function
   * from being called too many times in succession to reduce overhead.
   * @param {Object} event onChange event
   */
  handleChange(event) {
    this.emitChangeDebounce(event.target.value);
  };

  /**
   * @description Conduct a nearby search using the user-specified search
   * keywords. Searches are constrained to be within a given radius of the
   * center position of our neighborhood.
   * @memberof SearchInput
   */
  handlePlaceChange = () => {
    MapsAPI.searchNearby(this.props.map, this.state.placesService,
      this.props.saveInfoWindow, this.props.showPlaceDetails, {
        location: this.props.home,
        radius: this.props.searchRadius,
        keyword: this.state.searchText
      }
    )
    .then(searchResults => {
      this.props.saveSearchResults(searchResults);
    })
    .catch(error => console.log(error));
  };

  /**
   * @description Search Google Maps for matching locations within our
   * neighborhood
   * @param {String} enteredText Search terms entered by the user
   */
  queryLocation(enteredText) {
    this.setState({ searchText: enteredText });
  };

  /**
   * @description Search for the top attractions in the neighborhood
   *
   * @memberof SearchInput
   */
  showTopAttractions() {
    // Retrieve a list of popular location from Google Places within the
    // search radius
    this.queryLocation("");
    FSAPI.searchForNearby(this.props.home.lat, this.props.home.lng,
        this.props.searchRadius, this.props.searchResultsLimit, 'NASA')
      .then(venues => {
        this.props.saveSearchResults(venues);
        venues.forEach(aVenue => {
          console.log('Foursquare venue: ', aVenue);
          const mapBounds = new window.google.maps.LatLngBounds();
          const marker = MapsAPI.addMarkerToMap(this.props.map, aVenue.name, 
            aVenue.venue.location.lat, aVenue.venue.location.lng, mapBounds);
          MapsAPI.addInfoWindowToMarker(this.props.map,
            aVenue, marker, this.props.saveInfoWindow, this.props.showPlaceDetails);
       });
      })
      .catch(reason => console.log(reason));
  };

  /**
   * @description Capture search terms entered by the user to locate places
   * and locations on our neighborhood map
   * @returns {HTMLDivElement} Search text field
   * @memberof SearchInput
   */
  render() {
    return (
      <div>
        <Grid>
          <GridCell span="8">
            <TextField id="search-text" tabIndex="0" box
              withTrailingIcon={<TextFieldIcon icon='search' />}
              fullwidth type="text" onChange={this.handleChange}
              label="Enter the place you want to find..."
              placeholder="" value={ this.state.searchText }
              aria-label="Enter search terms for places search"
            />
          </GridCell>
          <GridCell span="4">
            <Fab id="top-attractions-btn" tabIndex="0"
              onClick={ this.showTopAttractions }
              raised="true" icon="thumb_up_alt" label="Top Places...">
              aria-label="Show top places"
              role="button"</Fab>
          </GridCell>
        </Grid>
      </div>
    )
  };
}

export default SearchInput;
