
import InfoWindow from '../components/InfoWindow';

class MapsAPI {

  /**
   * @description Add a <script> tag to the DOM
   * @param {String} url URL of the script source location
   * @param {function} callback Optional `onload` callback function
   */
  static addScriptToDOM(url, callback) {
    let script = document.createElement("script");
    script.type = "text/javascript";
    if ( callback ) {
      script.onload = callback;
    }
    document.getElementsByTagName("head")[0].appendChild(script);
    script.src = url;
  }

  /**
   * @description Create a new map
   * @param {Object} home LatLng of our neighborhood
   * @returns {Map} Google Map
   * @memberof MapsAPI
   */
  static createMap(home) {
    return new Promise((resolve,reject) => {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: home.lat, lng: home.lng },
        zoom: 12,
        mapTypeId: 'roadmap'
      });
      resolve(map);
    });
  }

  /**
   * @description Enable autocomplete for the place search imput element
   * @param {Object} map Map
   * @param {String} elementId DOM element id of the search input field
   * @param {Function} changeHandler Listener to be invoked when the place changes
   * @returns {Object} Google Maps Search Box
   * @memberof MapsAPI
   */
  static createSearchBox(map, elementId, changeHandler) {
    const searchBox = new window.google.maps.places.Autocomplete(
      document.getElementById(elementId)
    );
    searchBox.bindTo('bounds', map);
    searchBox.setFields( ['id', 'name', 'types', 'rating', 'icon', 'geometry'] );
    searchBox.addListener('place_changed', changeHandler);
    return searchBox;
  }

  /**
   * @description Add a marker to the map for the specified place
   * @param {Object} map Map
   * @param {Object} place A place returned as the result of a search
   * @param {LatLngBounds} bounds Boundry of the neighborhood map
   * @memberof SearchInput
   */
  static addMarkerToMap(map, placeName, latitude, longitude, bounds) {
    const placeLatLng = new window.google.maps.LatLng({ lat: latitude, lng: longitude }); 
    const marker = new window.google.maps.Marker({
      map: map,
      title: placeName,
      position: placeLatLng,
    });

    bounds.extend(marker.position);
    return marker;
  }

  /**
   * @description Add an infowindow to the specified marker
   * @param {Object} map Map
   * @param {String} venue Venue object from Foursquare
   * @param {Object} marker Marker the place is to be associated with
   * @param {Function} saveInfoWindow Callback to save the reference to the
   * InfoWindow
   * @param {Function} showPlaceDetails Callback to open details drawer
   * @memberof SearchInput
   */
  static addInfoWindowToMarker(map, venue, marker, saveInfoWindow, showPlaceDetails) {
    marker.addListener('click', () => {
      this.openInfoWindow(map, venue, marker, saveInfoWindow, showPlaceDetails);
    });
    map.fitBounds(map.getBounds());
    map.setZoom(12);
}

  /**
   * @description Open an InfoWindow
   * @static
   * @param {Object} map Map
   * @param {String} venue Venue object from Foursquare
   * @param {Object} marker Marker the place is to be associated with
   * @param {Function} saveInfoWindow Callback to save the open InfoWindow
   * @param {Function} showPlaceDetails Callback to open details drawer
   * when resolved.
   * @memberof MapsAPI
   */
  static openInfoWindow(map, venue, marker, saveInfoWindow, showPlaceDetails) {
    map.panTo(marker.getPosition());
    this.bounceMarker(marker);
    const infoWindow = new window.google.maps.InfoWindow({
      content: InfoWindow.create(venue)
    });
    saveInfoWindow(infoWindow);
    infoWindow.open(map, marker);
    // Add a listener for the infowindow 'Details...' button only after
    // the info window is open and ready
    window.google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
      const detailsButtons = [...document.getElementsByClassName('iw-details-btn')];
      if (detailsButtons !== null) {
        detailsButtons.forEach((button) => {
          button.addEventListener('click', function() {
            showPlaceDetails(venue);
          });
        });
      }
    });
  }

  /**
   * @description Animate a marker by bouncing it in place
   * @static
   * @param {Object} marker Google Maps place marker
   * @memberof MapsAPI
   */
  static bounceMarker(marker) {
    marker.setAnimation(window.google.maps.Animation.BOUNCE);
    setTimeout(() => {
      marker.setAnimation(null);
    }, 1000);
  }
}

export default MapsAPI;