import VenueInfo from '../utils/VenueInfo';
import '../css/App.css';

class InfoWindow {

  /**
   * @description Create HTML-formatted content to be placed in the Infowindow
   * @param {Object} venueDetail Object containing details about this venue
   * @returns {String} HTML-formatted content
   * @memberof InfoWindow
   */
  static create(venueDetail) {
    return (
      `<div class="gm-style-iw full-width">
        <div class="title full-width">
          <p class="venue-name">${VenueInfo.getName(venueDetail)}</p>
        </div>
        <div class="address-line full-width">
          ${VenueInfo.createFormattedAddressHTML(venueDetail)}
        <div/>
        <div class="iw-attrs full-width">
          ${VenueInfo.createFirstCategoryHTML(venueDetail)}
          ${VenueInfo.createHereNowHTML(venueDetail)}
        </div>
        <div>
          <p class="footnote">Venue info via Foursquare</p>
      </div>`);
  }

}

export default InfoWindow;