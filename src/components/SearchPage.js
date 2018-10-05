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
    home: PropTypes.object.isRequired,
    searchRadius: PropTypes.number.isRequired,
    searchResultsLimit: PropTypes.number.isRequired,
    map: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      searchResults: []
    };
  }

  /**
   * @description Replace the search results in our state
   * @param {*} searchResults Array of place results
   * @memberof NeighborhoodMap
   */
  setSearchResults = (searchResults) => {
    this.setState({ searchResults: searchResults });
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
            <SearchInput handleChange={ this.handleChange }
              home={ this.props.home }
              searchRadius={ this.props.searchRadius }
              searchResultsLimit={ this.props.searchResultsLimit }
              map={ this.props.map }
              setSearchResults={ this.setSearchResults }
            />
            <SearchResults searchResults={ this.state.searchResults }/>
          </GridCell>
        </Grid>
      </div>
    )
  }
}

export default SearchPage;
