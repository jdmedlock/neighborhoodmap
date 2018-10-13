import Place from '../utils/Place';
import '../css/App.css';

class InfoWindow {

  /**
   * @description Create HTML-formatted content to be placed in the Infowindow
   * @param {PlaceDetail} placeDetail Characteristics of the selected place
   * @param {Function} showSelectedPlace Callback to show the place details
   * @returns {String} HTML-formatted content
   * @memberof InfoWindow
   */
  static create(placeDetail) {
    return (
      `<div class="gm-style-iw full-width">
        <div class="title full-width">${Place.getName(placeDetail)}</div>
        <div class="address-line full-width">
          ${Place.createFormattedAddressHTML(placeDetail)}
          ${Place.createFormattedPhoneNoHTML(placeDetail)}
        <div/>
        <div class="iw-attrs full-width">
          ${Place.createFirstTypeHTML(placeDetail)}
          ${Place.createPriceLevelHTML(placeDetail)}
          ${Place.createRatingHTML(placeDetail)}
          ${Place.createStatusHTML(placeDetail)}
        </div>
        <div>
          <button class="iw-details-btn">Details...</button>
        <div>
      </div>`);
  }

}

export default InfoWindow;