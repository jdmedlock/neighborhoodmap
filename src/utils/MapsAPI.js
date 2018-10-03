
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
      zoom: 10,
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
  static searchNearby(map, placesService, setSearchResults, options) {
    placesService.nearbySearch(options, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setSearchResults(results);
        this.addPlacesToMap(map, placesService, results);
      }
    });
  }

  /**
   * @description Add a marker on the map for each place in the search
   * results list.
   * @param {Object} map Map
   * @param {Object} placesService Reference to the places service
   * @param {PlaceResults} places Array of places returned from a search
   * @memberof SearchInput
   */
  static addPlacesToMap(map, placesService, places) {
    const bounds = new window.google.maps.LatLngBounds();
    places.forEach((place) => {
      const marker = this.addMarkerToMap(map, place, bounds);
      this.addInfoWindowToMarker(map, placesService, place, marker);
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
      position: place.geometry.location
    });

    bounds.extend(place.geometry.location);
    return marker;
  }

  /**
   * @description Add an infowindow to the specified marker
   * @param {Object} map Map
   * @param {Object} placesService Reference to the places service
   * @param {Object} place Place result
   * @param {Object} marker Marker the place is to be associated with
   * @memberof SearchInput
   */
  static addInfoWindowToMarker(map, placesService, place, marker) {
    placesService.getDetails({
      placeId: place.place_id
    }, (placeDetail, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const infowindow = new window.google.maps.InfoWindow({
          content: InfoWindow.create(placeDetail)
        });
        marker.addListener('click', () => {
          infowindow.open(map, marker);
        });
      }
    });
  }
}

export default MapsAPI;