class FourSquareAPI {

  static async search(latitude, longitude, radius, query) {
    const url = `https://api.foursquare.com/v2/venues/explore` +
      `?v=20180323` +
      `&client_id=${process.env.REACT_APP_FS_CLIENT_ID}` +
      `&client_secret=${process.env.REACT_APP_FS_CLIENT_SECRET}` +
      `&ll=${latitude},${longitude}` +
      `&intent=match` +
      `&radius=${radius}` +
      `&limit=10` +
      `&query=${query}`;
    console.log('Foursquare url: ', url);
    let response = await fetch(url)
    let payload = await response.json();
    return payload;
  }

  static getDetails() {

  }
}

export default FourSquareAPI;