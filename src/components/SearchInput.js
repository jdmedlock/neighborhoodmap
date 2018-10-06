import React from 'react';
import debounce from "lodash.debounce";
import PropTypes from 'prop-types';

// React Material Web Components
import { Button } from '@rmwc/button';
import { Grid, GridCell } from '@rmwc/grid';
import { TextField, TextFieldIcon } from '@rmwc/textfield';

// Application Components
import MapsAPI from '../utils/MapsAPI';
import '../css/App.css';

class SearchInput extends React.Component {
  /**
   * @description Establish the state for this component and define the
   * `emitChangeDebounce` function on the class.
   * @param {*} props
   */
  constructor(props) {
    super(props);

    // SearchPage state
    this.state = {
      searchText: "",
      placesService: new window.google.maps.places.PlacesService(this.props.map)
    };

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
      this.props.setSearchResults, this.props.searchResultsLimit, {
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
      this.props.setSearchResults, this.props.searchResultsLimit, {
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
            <TextField id="search-text" box
              withTrailingIcon={<TextFieldIcon icon='search' />}
              fullwidth type="text" onChange={this.handleChange}
              label="Enter the place you want to find..."
              placeholder=""
              value={ this.state.searchText } />
          </GridCell>
          <GridCell span="4">
            <Button id="top-attractions-btn" onClick={ this.showTopAttractions }
              raised theme="secondary-bg on-secondary">Top 10</Button>
          </GridCell>
        </Grid>
      </div>
    )
  };
}

SearchInput.propTypes = {
  home: PropTypes.object.isRequired,
  searchRadius: PropTypes.number.isRequired,
  searchResultsLimit: PropTypes.number.isRequired,
  map: PropTypes.object.isRequired,
  setSearchResults: PropTypes.func.isRequired
};

export default SearchInput;
