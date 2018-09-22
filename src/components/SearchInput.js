import React from 'react';
import debounce from "lodash.debounce";

// React Material Web Components
import { TextField, TextFieldIcon } from '@rmwc/textfield';


// Application Components
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
      searchText: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.emitChangeDebounce = debounce(this.queryLocation, 150);
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
        <TextField box withTrailingIcon={<TextFieldIcon icon='search' />}
          fullwidth type="text" onChange={this.handleChange}
          label="Enter location or place to search for..." />
      </div>
    )
  }
}

export default SearchInput;
