import React from 'react';
import PropTypes from 'prop-types';

// React Material Web Components
import { DataTable, DataTableContent, DataTableHead, DataTableBody,
  DataTableHeadCell, DataTableRow, DataTableCell } from '@rmwc/data-table';

// Application Components
import { removeSpecialChars } from '../utils/utilFunctions';
import '../css/App.css';

const SearchResults = (props) => {

  /**
   * @description Display search results
   * @returns {HTMLDivElement} Main application page
   * @memberof SearchResults
   */
  return (
    <div>
      <h3>Search Results...</h3>
      {
        props.searchResults.length > 0 ? (
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
                  props.searchResults.map((place) => (
                    <DataTableRow key={ place.id }>
                      <DataTableCell>{ place.name }</DataTableCell>
                      <DataTableCell>
                        { place.types[0].charAt(0).toUpperCase() + 
                          removeSpecialChars(place.types[0].slice(1)) }
                      </DataTableCell>
                      <DataTableCell id="dt-rating" alignMiddle>
                        { place.rating.toFixed(1) }
                      </DataTableCell>
                    </DataTableRow >
                  ))}
              </DataTableBody>
            </DataTableContent>
          </DataTable>
        ) : (
          <p>No matching places found!</p>
        )
      }
    </div>
  )
}

SearchResults.propTypes = {
  searchResults: PropTypes.array.isRequired,
};

export default SearchResults;
