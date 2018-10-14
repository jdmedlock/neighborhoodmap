import MapsAPI from '../utils/MapsAPI';

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
  static async searchForNearby(latitude, longitude, radius, query) {
    let url = `https://api.foursquare.com/v2/venues/explore` +
      `?v=20180323` +
      `&client_id=${process.env.REACT_APP_FS_CLIENT_ID}` +
      `&client_secret=${process.env.REACT_APP_FS_CLIENT_SECRET}` +
      `&ll=${latitude},${longitude}` +
      `&intent=browse` +
      `&radius=${radius}`;
    url = query === undefined ? url : url + `&query=${query}`;
    let response = await fetch(url);
    let payload = await response.json();
    let venues = payload.response.groups[0].items;

    // Sort the results in descending rating sequence
    let sortedResultsByRating = venues.sort(this.sortByRating);

    return sortedResultsByRating;
  }

  /**
   * @description Add venues to the map
   * @static
   * @param {Object} map Map markers are to be placed on
   * @param {Object[]} venues Venues to be added to the map
   * @param {Function} saveInfoWindow Callback to save the active InfoWindow
   * @param {Function} showPlaceDetails Callback to display venue details
   * @memberof FourSquareAPI
   */
  static addVenuesToMap(map, venues, saveInfoWindow, showPlaceDetails) {
    venues.forEach(aVenue => {
      console.log('Foursquare venue: ', aVenue);
      const mapBounds = new window.google.maps.LatLngBounds();
      const marker = MapsAPI.addMarkerToMap(map, aVenue.name, 
        aVenue.venue.location.lat, aVenue.venue.location.lng, mapBounds);
      MapsAPI.addInfoWindowToMarker(map,
        aVenue, marker, saveInfoWindow, showPlaceDetails);
    });
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