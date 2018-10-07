import React from 'react';
import PropTypes from 'prop-types';

// React Material Web Components
import { DataTable, DataTableContent, DataTableHead, DataTableBody,
  DataTableHeadCell, DataTableRow, DataTableCell } from '@rmwc/data-table';
import { ButtonIcon } from '@rmwc/button';

// Application Components
import Place from '../utils/Place';
import '../css/App.css';

class SearchResults extends React.Component {
 
  static propTypes = {
    searchResults: PropTypes.array.isRequired,
    searchResultsLimit: PropTypes.number.isRequired,
  }

  /**
   * @description Establish the state for this component
   * @param {*} props
   */
  constructor(props) {
    super(props);

    this.state = {
      currentPlaceInResults: 0,
      pageForwardDisabled: false,
      pageBackDisabled: false
    };

    // Bind 'this' to the event handlers so they'll have the proper context
    this.pageForwardResults = this.pageForwardResults.bind(this);
    this.pageBackResults = this.pageBackResults.bind(this);
  }

  /**
   * @description Page forward to the prior set of search results by updating 
   * the index of the starting display point in the search results
   * @memberof SearchResults
   */
  pageForwardResults() {
    if ( this.state.currentPlaceInResults < this.props.searchResults.length ) {
      this.setState({ pageForwardDisabled: false });
      this.setState((prevState) => {
        return { currentPlaceInResults:  prevState.currentPlaceInResults +
          this.props.searchResultsLimit };
      });
    } else {
      this.setState({ pageForwardDisabled: true });
    }
  }

  /**
   * @description Page back to the prior set of search results by updating the
   * index of the starting display point in the search results
   * @memberof SearchResults
   */
  pageBackResults() {
    if ( this.state.currentPlaceInResults > 0 ) {
      this.setState({ pageBackDisabled: false });
      this.setState((prevState) => {
        return { currentPlaceInResults:  prevState.currentPlaceInResults -
          this.props.searchResultsLimit };
      });
    } else {
      this.setState({ pageBackDisabled: true });
    }

  }

  /**
   * @description Retrieve a subset of the search results to display
   * @returns {Object[]} Array containing the places in the search results
   * to display
   * @memberof SearchResults
   */
  getPlacesToDisplay() {
    return this.props.searchResults
      .reduce((resultsToDisplay, currentPlace, currentIndex) => {
        if (currentIndex >= this.state.currentPlaceInResults && 
          currentIndex <= (this.state.currentPlaceInResults + 
            this.props.searchResultsLimit - 1) ) {
          resultsToDisplay.push(currentPlace)
        }
        return resultsToDisplay;
      }, []);
  }

  /**
   * @description Display search results
   * @returns {HTMLDivElement} Main application page
   * @memberof SearchResults
   */
  render() {
    return (
      <div>
        <h3>Search Results...</h3>
        {
          this.props.searchResults.length > 0 ? (
            <div>
              <DataTable>
                <DataTableContent>
                  <DataTableHead className="table-heading">
                    <DataTableRow>
                      <DataTableHeadCell>Name</DataTableHeadCell>
                      <DataTableHeadCell>Type</DataTableHeadCell>
                      <DataTableHeadCell>Rating</DataTableHeadCell>
                    </DataTableRow>
                  </DataTableHead>
                  <DataTableBody>
                    { // Standard practice would normally be to invoke a
                      // cubordinate component to emit individual rows. Hoever,
                      // errors are emitted when RMWC Data Table elements are
                      // subdivided by <div>'s, which is required in render()
                      // methods. For this reason we iterate over the results here.
                      this.getPlacesToDisplay().map((place) => (
                        <DataTableRow key={ place.id }>
                          <DataTableCell>{ Place.getName(place) }</DataTableCell>
                          <DataTableCell>
                            { Place.getFirstType(place) }
                          </DataTableCell>
                          <DataTableCell id="dt-rating" alignMiddle>
                            { Place.getRating(place) }
                          </DataTableCell>
                        </DataTableRow >
                      ))
                    }
                  </DataTableBody>
                </DataTableContent>
              </DataTable>
              <div className="center-contents">
                <ButtonIcon id="page-up-btn"  onClick={ this.pageBackResults }
                  disabled={ this.state.pageBackDisabled }
                  icon="arrow_upward" aria-label="Page up results">
                </ButtonIcon>
                <ButtonIcon id="page-down-btn"  onClick={ this.pageForwardResults }
                  disabled={ this.state.pageForwardDisabled } 
                  icon="arrow_downward" aria-label="Page down results">
                </ButtonIcon>
              </div>
            </div>
          ) : (
            <p>No matching places found!</p>
          )
        }
      </div>
    )
  }
}


export default SearchResults;
