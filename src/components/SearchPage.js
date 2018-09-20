import React from 'react';
// import PropTypes from 'prop-types';
// import { Route } from 'react-router-dom';

// React Material Web Components
import { Grid, GridCell } from '@rmwc/grid';
import { TextField, TextFieldIcon, TextFieldHelperText } from '@rmwc/textfield';


// Application Components
import '../css/App.css';

const SearchPage = (props) => {

  /**
   * @description Create the search page which provides the user with the means
   * to search on locations and places
   * @returns {HTMLDivElement} Main application page
   * @memberof SearchPage
   */
  return (
    <div>
      <Grid>
        <GridCell span="4">
          <TextField box withLeadingIcon="search" fullwidth label="Enter location or place to search for..." />
          <h2>Results...</h2>
        </GridCell>
      </Grid>
    </div>
  )
}

export default SearchPage;
