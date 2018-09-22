import React from 'react';
import PropTypes from 'prop-types';

// React Material Web Components
import { Grid, GridCell } from '@rmwc/grid';

// Application Components
import SearchInput from './SearchInput.js'
import SearchResults from './SearchResults.js'
import '../css/App.css';

class SearchPage extends React.Component {

  static propTypes = {
    map: PropTypes.object.isRequired
  }

  /**
   * @description Create the search page which provides the user with the means
   * to search on locations and places
   * @returns {HTMLDivElement} Main application page
   * @memberof SearchPage
   */
  render() {
    return (
      <div>
        <Grid>
          <GridCell span="8">
            <SearchInput handleChange={ this.handleChange } map={ this.props.map } />
            <SearchResults />
          </GridCell>
        </Grid>
      </div>
    )
  }
}

export default SearchPage;
