import React from 'react';
import debounce from "lodash.debounce";
import PropTypes from 'prop-types';


// React Material Web Components
import { TextField, TextFieldIcon } from '@rmwc/textfield';


// Application Components
import '../css/App.css';

class SearchInput extends React.Component {

  static propTypes = {
    map: PropTypes.object.isRequired
  }

  /**
   * @description Establish the state for this component and define the
   * `emitChangeDebounce` function on the class.
   * @param {*} props
   */
  constructor(props) {
    super(props);

    // SearchPage state
    this.state = {
      searchText: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.emitChangeDebounce = debounce(this.queryLocation, 150);
  }

  /**
   * @description Link Google Maps Autocomplete to the search text fiels
   * @memberof SearchInput
   */
  componentDidMount() {
    const places = window.google.maps.places;
    const searchAutocomplete = new places.Autocomplete(
      document.getElementById('search-text'));
    // Constrain searches to the bounds of our neighborhood map and specify
    // the specific fields to be returned
    searchAutocomplete.bindTo('bounds', document.getElementById('map'));
    searchAutocomplete.setFields(
      ['place_id', 'name', 'types', 'rating', 'photos']);

    const searchBox = new window.google.maps.places.SearchBox(
      document.getElementById('search-text'));
    // Constrain searches to the bounds of our neighborhood map and specify
    // the specific fields to be returned
    searchBox.setBounds(this.props.map.getBounds());
    let results = searchBox.getPlaces();
    console.log('results: ', results);
  }

  /**
   * @description Add input entered by the user to the searchText element in
   * our state. Keystrokes are debounced to prevend the queryLocation function
   * from being called too many times in succession to reduce overhead.
   * @param {Object} event onChange event
   */
  handleChange(event) {
    this.emitChangeDebounce(event.target.value);
  }

  /**
   * @description Search Google Maps for matching locations within our
   * neighborhood
   * @param {String} enteredText Search terms entered by the user
   */
  queryLocation(enteredText) {
    // TODO: Add search logic
    console.log('enteredText: ', enteredText);
  }

  /**
   * @description Capture search terms entered by the user to locate places
   * and locations on our neighborhood map
   * @returns {HTMLDivElement} Search text field
   * @memberof SearchInput
   */
  render() {
    return (
      <div>
        <TextField id="search-text" box withTrailingIcon={<TextFieldIcon icon='search' />}
          fullwidth type="text" onChange={this.handleChange}
          label="Enter location or place to search for..." />
      </div>
    )
  }
}

export default SearchInput;
