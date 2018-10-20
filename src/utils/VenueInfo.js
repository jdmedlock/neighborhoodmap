import { removeSpecialChars } from './utilFunctions';

class Place {
  /**
   * @description Get the address of the venue
   * @static
   * @param {venueDetail} venueDetail Characteristics of a specific venue
   * @returns {String} Formatted address
   * @memberof Place
   */
  static getFormattedAddress(venueDetail) {
    let { address, city, state, postal_code } = venueDetail.venue.location;
    if (address === undefined && city === undefined && state === undefined &&
        postal_code === undefined) {
      return '';
    }
    address = address !== undefined ? address : '';
    city = city !== undefined ? city : '';
    state = state !== undefined ? state : '';
    postal_code  = postal_code  !== undefined ? postal_code  : '';
    return `${address}, ${city}, ${state}  ${postal_code}`;
  }

  /**
   * @description Create HTML elements containing the formatted address
   * @static
   * @param {venueDetail} venueDetail Characteristics of a specific venue
   * @returns {String} Two <div> tags containing the formatted address
   * @memberof Place
   */
  static createFormattedAddressHTML(venueDetail) {
    const address = this.getFormattedAddress(venueDetail);
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
   * @description Retrieve the venue name
   * @static
   * @param {venueDetail} venueDetail Characteristics of a specific venue
   * @returns {String} Place name
   * @memberof Place
   */
  static getName(venueDetail) {
    if (venueDetail.venue.name === undefined) {
      return '';
    }
    return venueDetail.venue.name;
  }

  /**
   * @description Get the popularity rating for the venue
   * @param {venueDetail} venueDetail Characteristics of the selected venue
   * @returns {String} venue rating
   * @memberof Place
   */
  static getRating(venueDetail) {
    // Translate the numerical venue rating to a graphical star rating
    if (venueDetail.rating === undefined) {
      return 0;
    }
    return venueDetail.rating.toFixed(1);
  }

  /**
   * @description Create HTML elements containing the rating
   * @param {venueDetail} venueDetail Characteristics of the selected venue
   * @returns {String} Formatted popularity rating of the venue
   * @memberof Place
   */
  static createRatingHTML(venueDetail) {
    const rating = this.getRating(venueDetail);
    if (rating === 0) {
      return '';
    }

    // Translate the numerical venue rating to a graphical star rating
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
   * @description Get the here now status of the venue
   * @static
   * @param {venueDetail} venueDetail Characteristics of the selected venue
   * @returns {String} Here now status of the venue
   * @memberof InfoWindow
   */
  static getHereNow(venueDetail) {
    if (venueDetail.venue.hereNow.summary === undefined) {
      return '';
    }
    return venueDetail.venue.hereNow.summary;
  }

  /**
   * @description Create HTML elements containing the venue's status
   * @static
   * @param {venueDetail} venueDetail Characteristics of the selected venue
   * @returns {String} Formatted open/close status of the venue
   * @memberof Place
   */
  static createHereNowHTML(venueDetail) {
    const status = this.getHereNow(venueDetail);
    if (status === '') {
      return '';
    }
    return (
      `<span class="iw-chip">${ status }</span>`
    );
  }

    /**
   * @description Get the venue's first categorization
   * @static
   * @param {venueDetail} venueDetail Characteristics of the selected venue
   * @returns {String} Formatted venue category
   * @memberof Place
   */
  static getFirstCategory(venueDetail) {
    if (venueDetail.venue.categories === undefined || 
        venueDetail.venue.categories.length === 0) {
      return '';
    }
    return venueDetail.venue.categories[0].shortName.charAt(0).toUpperCase() +
      removeSpecialChars(venueDetail.venue.categories[0].shortName.slice(1));
  }

  /**
   * @description Create an HTML element containing the venue's first type
   * @static
   * @param {venueDetail} venueDetail Characteristics of the selected venue
   * @returns {String} Formatted first type of the venue
   * @memberof Place
   */
  static createFirstCategoryHTML(venueDetail) {
    // Return only the first type associated with the venue
    const firstCategory = this.getFirstCategory(venueDetail);
    if (firstCategory === '') {
      return '';
    }
    return (
      `<span class="iw-chip">
        ${ firstCategory }
      </span>`
    );
  }

}

export default Place;