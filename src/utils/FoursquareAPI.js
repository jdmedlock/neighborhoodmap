class FourSquareAPI {
  /**
   * @description Search for nearby places
   * @static
   * @param {Number} latitude Locations latitude
   * @param {Number} longitude Locations longitude
   * @param {Number} radius Radius (in meters) to constrain the search within
   * @param {String} query Optional. Keyword to search for
   * @returns {Object[]} Array of result venues
   * @memberof FourSquareAPI
   */
  static async searchForMatch(latitude, longitude, radius, limit, query) {
    let url = `https://api.foursquare.com/v2/venues/explore` +
      `?v=20180323` +
      `&client_id=${process.env.REACT_APP_FS_CLIENT_ID}` +
      `&client_secret=${process.env.REACT_APP_FS_CLIENT_SECRET}` +
      `&ll=${latitude},${longitude}` +
      `&intent=match` +
      `&radius=${radius}` +
      `&limit=1`;
    url = query === undefined ? url : url + `&query=${query}`;
    let response = await fetch(url);
    let payload = await response.json();
    let venues = payload.response.groups[0].items;
    console.log('venues: ', venues);

    // Retrieve the details for each venue
    let venuesWithDetails = [];
    for (let i = 0; i < venues.length; i += 1) {
      this.getVenueDetails(venues[i].venue.id)
      .then(venueDetail => {
        venuesWithDetails.push(venueDetail);
      })
      .catch(reason => console.log(reason.message));
    };

    // Sort the results in descending rating sequence and limit the
    // number of entries displayed
    let sortedResultsByRating = venuesWithDetails.sort(this.sortByRating);

    console.log('sortedResultsByRating: ', sortedResultsByRating);
    return sortedResultsByRating;
  }

  /**
   * @description Retrieve detail information about for a venue
   * @static
   * @param {String} venueId Venue identifier
   * @returns {Object} Venue details
   * @memberof FourSquareAPI
   */
  static async getVenueDetails(venueId) {
    const url = `https://api.foursquare.com/v2/venues/${venueId}` +
      `?v=20180323` +
      `&client_id=${process.env.REACT_APP_FS_CLIENT_ID}` +
      `&client_secret=${process.env.REACT_APP_FS_CLIENT_SECRET}`;
    let response = await fetch(url);
    let payload = await response.json();
    return payload.response.venue;
  }
}

export default FourSquareAPI;