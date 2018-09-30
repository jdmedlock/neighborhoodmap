import React from 'react';
import debounce from "lodash.debounce";
import PropTypes from 'prop-types';

// React Material Web Components
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
      mapsAPI: new MapsAPI(),
      placesService: new window.google.maps.places.PlacesService(this.props.map)
    };

    this.handleChange = this.handleChange.bind(this);
    this.emitChangeDebounce = debounce(this.queryLocation, 150);
  }

  /**
   * @description Link Google Maps Autocomplete to the search text fiels
   * @memberof SearchInput
   */
  componentDidMount() {
    this.state.mapsAPI.createSearchBox(this.props.map,
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
    this.state.mapsAPI.searchNearby(this.props.map, this.state.placesService,
      this.props.setSearchResults, {
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
   * @description Capture search terms entered by the user to locate places
   * and locations on our neighborhood map
   * @returns {HTMLDivElement} Search text field
   * @memberof SearchInput
   */
  render() {
    return (
      <div>
        <TextField id="search-text" box
          withTrailingIcon={<TextFieldIcon icon='search' />}
          fullwidth type="text" onChange={this.handleChange}
          label="Enter the place you want to find..."
          placeholder="" />
      </div>
    )
  };
}

SearchInput.propTypes = {
  home: PropTypes.object.isRequired,
  searchRadius: PropTypes.number.isRequired,
  map: PropTypes.object.isRequired,
  setSearchResults: PropTypes.func.isRequired
};

export default SearchInput;
