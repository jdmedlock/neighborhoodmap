import React from 'react';
import debounce from "lodash.debounce";
import PropTypes from 'prop-types';


// React Material Web Components
import { TextField, TextFieldIcon } from '@rmwc/textfield';


// Application Components
import '../css/App.css';

class SearchInput extends React.Component {

  static propTypes = {
    home: PropTypes.object.isRequired,
    searchRadius: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired,
    setSearchResults: PropTypes.func.isRequired
  }

  /**
   * @description Establish the state for this component and define the
   * `emitChangeDebounce` function on the class.
   * @param {*} props
   */
  constructor(props) {
    super(props);

    // SearchPage state
    this.state = {
      searchText: "",
      placesService: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.emitChangeDebounce = debounce(this.queryLocation, 150);
  }

  /**
   * @description Link Google Maps Autocomplete to the search text fiels
   * @memberof SearchInput
   */
  componentDidMount() {
    /*
    const searchBox = new window.google.maps.places.SearchBox(
      document.getElementById('search-text'));
    searchBox.setBounds(this.props.map.getBounds());
    searchBox.addListener('places_changed', this.handlePlaceChange);
    */
    const searchBox = new window.google.maps.places.Autocomplete(
    document.getElementById('search-text'));
    searchBox.bindTo('bounds', this.props.map);
    searchBox.setFields( ['id', 'name', 'types', 'rating', 'icon', 'geometry'] );
    searchBox.addListener('place_changed', this.handlePlaceChange);
  }

  /**
   * @description Add input entered by the user to the searchText element in
   * our state. Keystrokes are debounced to prevend the queryLocation function
   * from being called too many times in succession to reduce overhead.
   * @param {Object} event onChange event
   */
  handleChange(event) {
    this.emitChangeDebounce(event.target.value);
  }

  /**
   * @description Conduct a nearby search using the user-specified search
   * keywords. Searches are constrained to be within a given radius of the
   * center position of our neighborhood.
   * @memberof SearchInput
   */
  handlePlaceChange = () => {
    const service = new window.google.maps.places.PlacesService(this.props.map);
    this.setState( { placesService: service });
    service.nearbySearch({
      location: this.props.home,
      radius: this.props.searchRadius,
      keyword: this.state.searchText
    }, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        console.log('results: ', results);
        this.props.setSearchResults(results);
        this.addPlacesToMap(results);
      }
    });
  }

  /**
   * @description Add a marker on the map for each place in the search
   * results list.
   * @memberof SearchInput
   */
  addPlacesToMap = (places)  => {
    const bounds = new window.google.maps.LatLngBounds();

    places.forEach((place) => {
      const marker = this.addMarkerToMap(place, bounds);
      this.addInfoWindowToMarker(place, marker);
    });

    this.props.map.fitBounds(bounds);
  };

  /**
   * @description Add a marker to the map for the specified place
   * @param {Object} place A place returned as the result of a search
   * @param {LatLngBounds} bounds Boundry of the neighborhood map
   * @memberof SearchInput
   */
  addMarkerToMap = (place, bounds) => {
    const image = {
      url: place.icon,
      size: new window.google.maps.Size(71, 71),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(17, 34),
      scaledSize: new window.google.maps.Size(25, 25)
    };

    const marker = new window.google.maps.Marker({
      map: this.props.map,
      icon: image,
      title: place.name,
      position: place.geometry.location
    });

    bounds.extend(place.geometry.location);
    return marker;
  }

  /**
   * @description Add an infowindow to the specified marker
   * @param {Object} place Place result
   * @param {Object} marker Marker the place is to be associated with
   * @memberof SearchInput
   */
  addInfoWindowToMarker = (place, marker) => {
    this.state.placesService.getDetails({
      placeId: place.place_id
    }, (placeDetails, status) => {
      const placeType = placeDetails.types[0].charAt(0).toUpperCase() + placeDetails.types[0].slice(1);
      const placeOpen = placeDetails.opening_hours.open_now ? 'Open' : 'Closed';
      const priceLevel = ['Free', 'Inexpensive', 'Moderate', 'Expensive', 'Very Expensive'];
      
      // Translate the numerical place rating to a graphical star rating
      const noWholeStars = Math.floor(placeDetails.rating);
      let starRating = '';
      const ICON_STAR = 'star ';  // Material Design Icon Font - star
      const ICON_STAR_HALF = 'star_half '; // Material Design Icon Font - star_half
      for (let i = 0; i < noWholeStars; i += 1) {
        starRating += ICON_STAR;
      }
      if (placeDetails.rating > noWholeStars) {
        starRating += ICON_STAR_HALF;
      }

      // Add place information to the infowindow
      const infowindow = new window.google.maps.InfoWindow({
        content: 
          `<div> 
            <div class="infowindow-place">${placeDetails.name}</div>
            <div>${placeDetails.adr_address}</div>
            <div>${placeDetails.formatted_phone_number}</div>
            <div/>
            <div class="infowindow-attrs">
              <span class="infowindow-chip">${placeType}</span>
              <span class="infowindow-chip">${priceLevel[placeDetails.price_level]}</span>
              <span class="infowindow-chip">
                <i class="material-icons infowindow-rating">${starRating}</i>
              </span>
              <span class="infowindow-chip">${placeOpen}</span>
          </div>`
      });

      marker.addListener('click', () => {
        infowindow.open(this.props.map, marker);
      });
    });
  }

  /**
   * @description Search Google Maps for matching locations within our
   * neighborhood
   * @param {String} enteredText Search terms entered by the user
   */
  queryLocation(enteredText) {
    this.setState({ searchText: enteredText });
  }

  /**
   * @description Capture search terms entered by the user to locate places
   * and locations on our neighborhood map
   * @returns {HTMLDivElement} Search text field
   * @memberof SearchInput
   */
  render() {
    return (
      <div>
        <TextField id="search-text" box
          withTrailingIcon={<TextFieldIcon icon='search' />}
          fullwidth type="text" onChange={this.handleChange} 
          label="Enter the place you want to find..."
          placeholder="" />
      </div>
    )
  }
}

export default SearchInput;
