
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
    return new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: home.lat, lng: home.lng },
      zoom: 12,
      mapTypeId: 'roadmap'
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
   * @description Conduct a nearby search
   * @param {Object} map Map
   * @param {Object} placesService Reference to the places service
   * @param {Function} setSearchResults Callback to receive the search results
   * @param {Object} options Google Places SearchNearby options. Must included
   * at lease the `location` and `radius` attributes.
   * @memberof MapsAPI
   */
  static searchNearby(map, placesService, saveSearchResults, saveInfoWindow, options) {
    placesService.nearbySearch(options, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        // Sort the results in descending rating sequence and limit the
        // number of entries displayed
        let sortedResultsByRating = results.sort(this.sortByRating);
        // Add the places to the map
        this.addPlacesToMap(map, placesService, sortedResultsByRating, saveInfoWindow);
        saveSearchResults(sortedResultsByRating);
      }
    });
  }

  /**
   * @description Sort comparater to sort the array in descending sequence
   * @static
   * @param {PlaceResult} a object to compare
   * @param {PlaceResult} b object to compare
   * @returns {Number} Less than, equal to, or greater than zero to denote
   * whether b.ranking is greater than a.ranking
   * @memberof MapsAPI
   */
  static sortByRating(a, b) {
    return b.rating - a.rating;
  }

  /**
   * @description Add a marker on the map for each place in the search
   * results list.
   * @param {Object} map Map
   * @param {Object} placesService Reference to the places service
   * @param {PlaceResults} places Array of places returned from a search
   * @memberof SearchInput
   */
  static addPlacesToMap(map, placesService, places, saveInfoWindow) {
    const bounds = new window.google.maps.LatLngBounds();
    places.forEach((place) => {
      const marker = this.addMarkerToMap(map, place, bounds);
      // Add the marker to the place in the places object array reference
      // passed from the caller
      place["marker"] = marker;
      this.addInfoWindowToMarker(map, placesService, place.place_id, marker, saveInfoWindow);
    });
    map.fitBounds(bounds);
  }

  /**
   * @description Add a marker to the map for the specified place
   * @param {Object} map Map
   * @param {Object} place A place returned as the result of a search
   * @param {LatLngBounds} bounds Boundry of the neighborhood map
   * @memberof SearchInput
   */
  static addMarkerToMap(map, place, bounds) {
    const image = {
      url: place.icon,
      size: new window.google.maps.Size(71, 71),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(17, 34),
      scaledSize: new window.google.maps.Size(25, 25)
    };

    const marker = new window.google.maps.Marker({
      map: map,
      icon: image,
      title: place.name,
      position: place.geometry.location,
    });

    bounds.extend(place.geometry.location);
    return marker;
  }

  /**
   * @description Add an infowindow to the specified marker
   * @param {Object} map Map
   * @param {Object} placesService Reference to the places service
   * @param {Object} place_id Place identifier
   * @param {Object} marker Marker the place is to be associated with
   * @memberof SearchInput
   */
  static addInfoWindowToMarker(map, placesService, place_id, marker, saveInfoWindow) {
    marker.addListener('click', () => {
      this.openInfoWindow(map, placesService, place_id, marker, saveInfoWindow);
    });
  }

  /**
   * @description Open an InfoWindow
   * @static
   * @param {Object} map Map
   * @param {Object} placesService Reference to the places service
   * @param {String} placeId Place identification
   * @param {Object} marker Marker the place is to be associated with
   * @memberof MapsAPI
   */
  static openInfoWindow(map, placesService, place_id, marker, saveInfoWindow) {
    this.bounceMarker(marker);
    // Retrieve all details about the place and open the infowindow
    placesService.getDetails({
      placeId: place_id
    }, (placeDetail, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const infowindow = new window.google.maps.InfoWindow({
          content: InfoWindow.create(placeDetail)
        });
        infowindow.open(map, marker);
        saveInfoWindow(infowindow);
      } else {
        // Remove the marker from the map if an error occurred
        marker.setMap(null);
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