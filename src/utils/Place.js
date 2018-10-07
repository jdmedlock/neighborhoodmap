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
      `<div>${ address.slice(0,firstComma) }</div>
      <div>${ address.slice(firstComma+1) }</div>`
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
      `<div>${ phoneNo }</div>`
    );
  }

  /**
   * @description Retrieve the place name
   * @static
   * @param {PlaceDetail} placeDetail Characteristics of a specific place
   * @returns {String} Place name
   * @memberof Place
   */
  static getName(placeDetail) {
    if (placeDetail.name === undefined) {
      return '';
    }
    return placeDetail.name;
  }

  /**
   * @description Get the price level of the place
   * @static
   * @param {PlaceDetail} placeDetail Characteristics of the selected place
   * @returns {String} Price level
   * @memberof Place
   */
  static getPriceLevel(placeDetail) {
    if (placeDetail.price_level === undefined) {
      return '';
    }
    return placeDetail.price_level;
  }

  /**
   * @description Create HTML elements containing the price level
   * @param {PlaceDetail} placeDetail Characteristics of the selected place
   * @returns {String} Formatted price level for the place
   * @memberof Place
   */
  static createPriceLevelHTML(placeDetail) {
    const priceLevel = this.getPriceLevel(placeDetail);
    if (priceLevel === '') {
      return '';
    }
    const priceLevelText = ['$ Free', '$ Inexpensive', '$ Moderate', '$ Expensive', '$ Very Expensive'];
    return (
      `<span class="iw-chip">${ priceLevelText[priceLevel] }</span>`
    );
  }

  /**
   * @description Get the popularity rating for the place
   * @param {PlaceDetail} placeDetail Characteristics of the selected place
   * @returns {String} Place rating
   * @memberof Place
   */
  static getRating(placeDetail) {
    // Translate the numerical place rating to a graphical star rating
    if (placeDetail.rating === undefined) {
      return 0;
    }
    return placeDetail.rating.toFixed(1);
  }

  /**
   * @description Create HTML elements containing the rating
   * @param {PlaceDetail} placeDetail Characteristics of the selected place
   * @returns {String} Formatted popularity rating of the place
   * @memberof Place
   */
  static createRatingHTML(placeDetail) {
    const rating = this.getRating(placeDetail);
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
        <i class="material-icons iw-rating">${ starRating }</i>
      </span>`
    );
  }

  /**
   * @description Get the open/closed status of the place
   * @static
   * @param {PlaceDetail} placeDetail Characteristics of the selected place
   * @returns {String} Open/close status of the place
   * @memberof InfoWindow
   */
  static getStatus(placeDetail) {
    if (placeDetail.opening_hours === undefined) {
      return '';
    }
    return placeDetail.opening_hours.open_now ? 'Open' : 'Closed';
  }

  /**
   * @description Create HTML elements containing the place's status
   * @static
   * @param {PlaceDetail} placeDetail Characteristics of the selected place
   * @returns {String} Formatted open/close status of the place
   * @memberof Place
   */
  static createStatusHTML(placeDetail) {
    const status = this.getStatus(placeDetail);
    if (status === '') {
      return '';
    }
    return (
      `<span class="iw-chip">${ status }</span>`
    );
  }

    /**
   * @description Get the place's first type categorization
   * @static
   * @param {PlaceDetail} placeDetail Characteristics of the selected place
   * @returns {String} Formatted place category
   * @memberof Place
   */
  static getFirstType(placeDetail) {
    if (placeDetail.types === undefined || placeDetail.types.length === 0) {
      return '';
    }
    return placeDetail.types[0].charAt(0).toUpperCase() +
      removeSpecialChars(placeDetail.types[0].slice(1));
  }

  /**
   * @description Create an HTML element containing the place's first type
   * @static
   * @param {PlaceDetail} placeDetail Characteristics of the selected place
   * @returns {String} Formatted first type of the place
   * @memberof Place
   */
  static createFirstTypeHTML(placeDetail) {
    // Return only the first type associated with the place
    const firstType = this.getFirstType(placeDetail);
    if (firstType === '') {
      return '';
    }
    return (
      `<span class="iw-chip">
        ${ firstType }
      </span>`
    );
  }

}

export default Place;