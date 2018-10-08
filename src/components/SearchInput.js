import React from 'react';
import debounce from "lodash.debounce";
import PropTypes from 'prop-types';

// React Material Web Components
import { Fab } from '@rmwc/fab';
import { Grid, GridCell } from '@rmwc/grid';
import { TextField, TextFieldIcon } from '@rmwc/textfield';

// Application Components
import MapsAPI from '../utils/MapsAPI';
import '../css/App.css';

class SearchInput extends React.Component {

  static propTypes = {
    home: PropTypes.object.isRequired,
    searchRadius: PropTypes.number.isRequired,
    map: PropTypes.object.isRequired,
    saveSearchResults: PropTypes.func.isRequired,
    saveInfoWindow: PropTypes.func.isRequired,
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
      this.props.saveSearchResults, this.props.saveInfoWindow, {
        location: this.props.home,
        radius: this.props.searchRadius,
        keyword: this.state.searchText
      }
    );
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
    this.queryLocation("");
    MapsAPI.searchNearby(this.props.map, this.state.placesService,
      this.props.saveSearchResults, this.props.saveInfoWindow, {
        location: this.props.home,
        radius: this.props.searchRadius,
        rankBy: window.google.maps.places.RankBy.PROMINENCE,
        keyword: [ 'nasa' ],
        type: [ 'point_of_interest' ]
      }
    );
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
              role=""/>
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
