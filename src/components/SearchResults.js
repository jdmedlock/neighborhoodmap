import React from 'react';
import PropTypes from 'prop-types';

// React Material Web Components
import { ButtonIcon } from '@rmwc/button';
import { DataTable, DataTableContent, DataTableHead, DataTableBody,
  DataTableHeadCell, DataTableRow, DataTableCell } from '@rmwc/data-table';

  // Application Components
import MapsAPI from '../utils/MapsAPI';
import Venue from '../utils/VenueInfo';
import '../css/App.css';

class SearchResults extends React.Component {

  static propTypes = {
    map: PropTypes.object.isRequired,
    searchResults: PropTypes.array.isRequired,
    searchResultsLimit: PropTypes.number.isRequired,
    saveInfoWindow: PropTypes.func.isRequired,
    showPlaceDetails: PropTypes.func.isRequired
  }

  /**
   * @description Establish the state for this component
   * @param {*} props
   */
  constructor(props) {
    super(props);

    this.state = {
      currentVenueInResults: 0,
      pageForwardDisabled: false,
      pageBackDisabled: false,
      placesService: new window.google.maps.places.PlacesService(this.props.map)
    };

    // Bind 'this' to the event handlers so they'll have the proper context
    this.pageForwardResults = this.pageForwardResults.bind(this);
    this.pageBackResults = this.pageBackResults.bind(this);
    this.showInfoWindow = this.showInfoWindow.bind(this);
  }

  /**
   * @description Page forward to the prior set of search results by updating
   * the index of the starting display point in the search results
   * @memberof SearchResults
   */
  pageForwardResults() {
    if ( this.state.currentVenueInResults < this.props.searchResults.length ) {
      this.setState({ pageForwardDisabled: false });
      this.setState((prevState) => {
        return { currentVenueInResults:  prevState.currentVenueInResults +
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
        return { currentVenueInResults:  prevState.currentVenueInResults -
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
  getVenuesToDisplay() {
    return this.props.searchResults
      .reduce((resultsToDisplay, currentVenue, currentIndex) => {
        if (currentIndex >= this.state.currentVenueInResults &&
          currentIndex <= (this.state.currentVenueInResults +
            this.props.searchResultsLimit - 1) ) {
          resultsToDisplay.push(currentVenue)
        }
        return resultsToDisplay;
      }, []);
  }

  /**
   * @description Show the infowindow for the selected venue
   * @param {Object} aVenue Venue information
   * @memberof SearchResults
   */
  showInfoWindow(aVenue) {
    const marker = this.props.searchResults.find((element) => {
      return element.venue.id === aVenue.venue.id;
    }).marker;
    MapsAPI.openInfoWindow(this.props.map, aVenue, marker,
      this.props.saveInfoWindow, this.props.showPlaceDetails);
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
                    </DataTableRow>
                  </DataTableHead>
                  <DataTableBody>
                    { // Standard practice would normally be to invoke a
                      // cubordinate component to emit individual rows. Hoever,
                      // errors are emitted when RMWC Data Table elements are
                      // subdivided by <div>'s, which is required in render()
                      // methods. For this reason we iterate over the results here.
                      this.getVenuesToDisplay().map((aVenue) => (
                        <DataTableRow key={ aVenue.venue.id }>
                          <DataTableCell tabIndex="0"
                            onClick={ () => this.showInfoWindow({ aVenue }) }>
                            { Venue.getName(aVenue) }
                          </DataTableCell>
                        </DataTableRow >
                      ))
                    }
                  </DataTableBody>
                </DataTableContent>
              </DataTable>
              <div className="center-contents">
                <ButtonIcon id="page-up-btn" tabIndex="0" role="button"
                  onClick={ this.pageBackResults }
                  disabled={ this.state.pageBackDisabled }
                  icon="arrow_upward" aria-label="Page up results">
                </ButtonIcon>
                <ButtonIcon id="page-down-btn" tabIndex="0" role="button"
                  onClick={ this.pageForwardResults }
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
