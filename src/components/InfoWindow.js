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
      `<div class="infowindow-content">
        <div class="infowindow-place">${placeDetails.name}</div>
          ${this.getAddress(placeDetails)}
          <div>${placeDetails.formatted_phone_number}</div>
          <div/>
          <div class="infowindow-attrs">
            ${this.getType(placeDetails)}
            ${this.getPriceLevel(placeDetails)}
            ${this.getRating(placeDetails)}
            ${this.getStatus(placeDetails)}
          </div>
        <div/>
      </div>`);
  }

  /**
   * @description Get the address of the place
   * @param {PlaceDetails} placeDetails Characteristics of the selected place
   * @returns {String} Formatted place address
   * @memberof InfoWindow
   */
  getAddress(placeDetails) {
    if (placeDetails.formatted_address === undefined) {
      return '';
    }
    const firstComma = placeDetails.formatted_address.indexOf(',');
    // Return the address separated into two lines
    return (
      `<div>${placeDetails.formatted_address.slice(0,firstComma)}</div>
      <div>${placeDetails.formatted_address.slice(firstComma+1)}</div>`
    );
  }

  /**
   * @description Get the price level of the place
   * @param {PlaceDetails} placeDetails Characteristics of the selected place
   * @returns {String} Formatted price level for the place
   * @memberof InfoWindow
   */
  getPriceLevel(placeDetails) {
    if (placeDetails.price_level === undefined) {
      return '';
    }
    const priceLevel = ['$ Free', '$ Inexpensive', '$ Moderate', '$ Expensive', '$ Very Expensive'];
    return (
      `<span class="infowindow-chip">${priceLevel[placeDetails.price_level]}</span>`
    );
  }

  /**
   * @description Get the popularity rating for the place
   * @param {PlaceDetails} placeDetails Characteristics of the selected place
   * @returns {String} Formatted popularity rating of the place
   * @memberof InfoWindow
   */
  getRating(placeDetails) {
    // Translate the numerical place rating to a graphical star rating
    if (placeDetails.rating === undefined) {
      return '';
    }

    const ICON_STAR = 'star ';  // Material Design Icon Font - star
    const ICON_STAR_HALF = 'star_half '; // Material Design Icon Font - star_half
    const noWholeStars = Math.floor(placeDetails.rating);
    let starRating = '';

    for (let i = 0; i < noWholeStars; i += 1) {
      starRating += ICON_STAR;
    }
    if (placeDetails.rating > noWholeStars) {
      starRating += ICON_STAR_HALF;
    }

    return (
      `<span class="infowindow-chip">
        <i class="material-icons infowindow-rating">${starRating}</i>
      </span>`

    );
  }

  /**
   * @description Get the open/closed status of the place
   * @param {PlaceDetails} placeDetails Characteristics of the selected place
   * @returns {String} Formatted open/close status of the place
   * @memberof InfoWindow
   */
  getStatus(placeDetails) {
    if (placeDetails.opening_hours === undefined) {
      return '';
    }
    return (
      `<span class="infowindow-chip">${placeDetails.opening_hours.open_now ? 'Open' : 'Closed'}</span>`
    );
}

  /**
   * @description Get the place's type categorization
   * @param {PlaceDetails} placeDetails Characteristics of the selected place
   * @returns {String} Formatted place category
   * @memberof InfoWindow
   */
  getType(placeDetails) {
    // Return only the first type associated with the place
    return (
      `<span class="infowindow-chip">
        ${placeDetails.types[0].charAt(0).toUpperCase() + placeDetails.types[0].slice(1)}
      </span>`
    );
  }
}

export default InfoWindow;