import { removeSpecialChars } from '../utils/utilFunctions';

class Place {
  /**
   * @description Get the address of the place
   * @static
   * @param {PlaceDetail} placeDetail Characteristics of a specific place
   * @returns {String} Formatted address
   * @memberof Place
   */
  static getFormattedAddress(placeDetail) {
    if (placeDetail.formatted_address === undefined) {
      return '';
    }
    return placeDetail.formatted_address;
  }

  /**
   * @description Create HTML elements containing the formatted address
   * @static
   * @param {PlaceDetail} placeDetail Characteristics of a specific place
   * @returns {String} Two <div> tags containing the formatted address
   * @memberof Place
   */
  static createFormattedAddressHTML(placeDetail) {
    const address = this.getFormattedAddress(placeDetail);
    if (address === '') {
      return '';
    }
    // Return the address separated into two lines
    const firstComma = address.indexOf(',');
    return (
      `<div>${address.slice(0,firstComma)}</div>
      <div>${address.slice(firstComma+1)}</div>`
    );
  }

  /**
   * @description Get the address of the place
   * @static
   * @param {PlaceDetail} placeDetail Characteristics of a specific place
   * @returns {String} Formatted phone number
   * @memberof Place
   */
  static getFormattedPhoneNo(placeDetail) {
    if (placeDetail.formatted_phone_number === undefined) {
      return '';
    }
    return placeDetail.formatted_phone_number;
  }

  /**
   * @description Create HTML elements containing the formatted phone number
   * @static
   * @param {PlaceDetail} placeDetail Characteristics of a specific place
   * @returns {String} Formatted phone number
   * @memberof Place
   */
  static createFormattedPhoneNoHTML(placeDetail) {
    const phoneNo = this.getFormattedPhoneNo(placeDetail);
    if (phoneNo === '') {
      return '';
    }

    return (
      `<div>${phoneNo}</div>`
    );
  }

  /**
   * @description Get the price level of the place
   * @static
   * @param {PlaceDetails} placeDetails Characteristics of the selected place
   * @returns {String} Price level
   * @memberof Place
   */
  static getPriceLevel(placeDetails) {
    if (placeDetails.price_level === undefined) {
      return '';
    }
    return placeDetails.price_level;
  }

  /**
   * @description Create HTML elements containing the price level
   * @param {PlaceDetails} placeDetails Characteristics of the selected place
   * @returns {String} Formatted price level for the place
   * @memberof Place
   */
  static createPriceLevelHTML(placeDetails) {
    const priceLevel = this.getPriceLevel(placeDetails);
    if (priceLevel === '') {
      return '';
    }
    const priceLevelText = ['$ Free', '$ Inexpensive', '$ Moderate', '$ Expensive', '$ Very Expensive'];
    return (
      `<span class="iw-chip">${priceLevelText[priceLevel]}</span>`
    );
  }

  /**
   * @description Get the popularity rating for the place
   * @param {PlaceDetails} placeDetails Characteristics of the selected place
   * @returns {String} Place rating
   * @memberof Place
   */
  static getRating(placeDetails) {
    // Translate the numerical place rating to a graphical star rating
    if (placeDetails.rating === undefined) {
      return 0;
    }
    return placeDetails.rating;
  }

  /**
   * @description Create HTML elements containing the rating
   * @param {PlaceDetails} placeDetails Characteristics of the selected place
   * @returns {String} Formatted popularity rating of the place
   * @memberof Place
   */
  static createRatingHTML(placeDetails) {
    const rating = this.getRating(placeDetails);
    if (rating === 0) {
      return '';
    }

    // Translate the numerical place rating to a graphical star rating
    const ICON_STAR = 'star ';  // Material Design Icon Font - star
    const ICON_STAR_HALF = 'star_half '; // Material Design Icon Font - star_half
    const noWholeStars = Math.floor(rating);
    let starRating = '';

    for (let i = 0; i < noWholeStars; i += 1) {
      starRating += ICON_STAR;
    }
    if (rating > noWholeStars) {
      starRating += ICON_STAR_HALF;
    }

    return (
      `<span class="iw-chip">
        <i class="material-icons iw-rating">${starRating}</i>
      </span>`
    );
  }

  /**
   * @description Get the open/closed status of the place
   * @static
   * @param {PlaceDetails} placeDetails Characteristics of the selected place
   * @returns {String} Open/close status of the place
   * @memberof InfoWindow
   */
  static getStatus(placeDetails) {
    if (placeDetails.opening_hours === undefined) {
      return '';
    }
    return placeDetails.opening_hours.open_now ? 'Open' : 'Closed';
  }

  /**
   * @description Create HTML elements containing the place's status
   * @static
   * @param {PlaceDetails} placeDetails Characteristics of the selected place
   * @returns {String} Formatted open/close status of the place
   * @memberof Place
   */
  static createStatusHTML(placeDetails) {
    const status = this.getStatus(placeDetails);
    return (
      `<span class="iw-chip">${status}</span>`
    );
  }

    /**
   * @description Get the place's first type categorization
   * @static
   * @param {PlaceDetails} placeDetails Characteristics of the selected place
   * @returns {String} Formatted place category
   * @memberof Place
   */
  static getFirstType(placeDetails) {
    if (placeDetails.types === undefined) {
      return '';
    }
    return placeDetails.types[0];
  }

  /**
   * @description Create an HTML element containing the place's first type
   * @static
   * @param {PlaceDetails} placeDetails Characteristics of the selected place
   * @returns {String} Formatted first type of the place
   * @memberof Place
   */
  static createFirstTypeHTML(placeDetails) {
    // Return only the first type associated with the place
    const firstType = this.getFirstType(placeDetails);
    return (
      `<span class="iw-chip">
        ${firstType.charAt(0).toUpperCase() + removeSpecialChars(firstType.slice(1))}
      </span>`
    );
  }

}

export default Place;