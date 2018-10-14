import Venue from '../utils/VenueInfo';
import '../css/App.css';

class InfoWindow {

  /**
   * @description Create HTML-formatted content to be placed in the Infowindow
   * @param {PlaceDetail} placeDetail Characteristics of the selected place
   * @param {Function} showSelectedPlace Callback to show the place details
   * @returns {String} HTML-formatted content
   * @memberof InfoWindow
   */
  static create(venueDetail) {
    return (
      `<div class="gm-style-iw full-width">
        <div class="title full-width">
          <p class="venue-name">${Venue.getName(venueDetail)}</p>
        </div>
        <div class="address-line full-width">
          ${Venue.createFormattedAddressHTML(venueDetail)}
        <div/>
        <div class="iw-attrs full-width">
          ${Venue.createFirstCategoryHTML(venueDetail)}
          ${Venue.createHereNowHTML(venueDetail)}
        </div>
        <div>
          <button class="iw-details-btn">Details...</button>
        <div>
        <div>
          <p class="footnote">Venue info via Foursquare</p>
      </div>`);
  }

}

export default InfoWindow;