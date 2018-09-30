import Place from '../utils/Place';
import '../css/App.css';

class InfoWindow {

  /**
   * @description Create HTML-formatted content to be placed in the Infowindow
   * @param {PlaceDetails} placeDetails Characteristics of the selected place
   * @returns {String} HTML-formatted content
   * @memberof InfoWindow
   */
  create(placeDetails) {
    return (
      `<div class="gm-style-iw full-width">
        <div class="title full-width">${placeDetails.name}</div>
        <div class="address-line full-width">
          ${Place.createFormattedAddressHTML(placeDetails)}
          ${Place.createFormattedPhoneNoHTML(placeDetails)}
        <div/>
        <div class="iw-attrs full-width">
          ${Place.createFirstTypeHTML(placeDetails)}
          ${Place.createPriceLevelHTML(placeDetails)}
          ${Place.createRatingHTML(placeDetails)}
          ${Place.createStatusHTML(placeDetails)}
        </div>
      </div>`);
  }

}

export default InfoWindow;