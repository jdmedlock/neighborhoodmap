# Neighborhood Map Project

[![restaurantreviews last commit](https://img.shields.io/github/last-commit/google/skia.svg)](https://github.com/jdmedlock/neighborhoodmap)
<br/>
[![Packagist](https://img.shields.io/packagist/l/doctrine/orm.svg)](https://github.com/jdmedlock/neighborhoodmap/)

![Screenshot](https://github.com/jdmedlock/neighborhoodmap/blob/development/docs/nm_screenshot.png)

## Table of Contents

* [Overview](#overview)
* [Usage](#usage)
* [Dependencies](#dependencies)
* [Application Structure](#application-structure)
* [FAQ](#frequently-asked-questions)
* [Change Log](#change-log)
* [Contributing](#contributing)
* [Authors](#authors)
* [License](#license)

## Overview

The neighborhoodmap project was created as part of the Web Programming with
Javascript section of the [Udacity Front-End Web Developer Nanodegree Program](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001). The
purpose of this assignment is to demonstrate and solidify a basic
understanding of React from the course lessons.

## Usage

### UI Features

The requirements for this project are defined by he [Udacity Rubric](https://review.udacity.com/#!/rubrics/1351/view). However, the main requirements
for the main page are:

- Provide the user with a list of popular attractions within 10 miles of
the Kennedy Space Flight Center in Cape Canaveral, Florida.
- Allow the users to search for other places in this area.
- Provide a 'Top Attractions' button to allow the original list of popular
attractions to be redisplayed following a custom search.
- Markers are placed on the map for both top attractions as well as places
identified in a custom search.
- More information about a location, from [Foursquare](http://www.foursquare.com)
will be display by clicking on either a place name in the search results list or
on a marker.
- Up and down arrows at the bottom of the search results list allow the user
to scroll through the results if there are more than will fit on a single page.

### Style Guide

| Style Component | Part                                                    |
|:----------------|:--------------------------------------------------------|
| Color           | Primary: #0288d1 - Light: #5eb8ff - Dark: #005b9f       |
|                 | Secondary: #f9a825 - Light: #ffd95a - Dark: #c17900     |
|                 | Text on primary: #ffffff - secondary: #000000           |
| Typography      | Title: Roboto                                           |
|                 | Subtitle: Open Sans                                     |
|                 | Body: Roboto Slab                                       |
|                 | Caption: Roboto Slab                                    |
|                 | Button: Roboto                                          |
| Motion          | Selection: Markers animate using the Google Maps `BOUNCE`
setting |

### Starting & Building the App

To start the application in development mode simply run `npm run start` or
`yarn start` from the command line. The application will automatically open a
new tab in your browser with the url `localhost:3000`.

To start the application in production mode run `npm run serve` or `yarn serve`
from the command line. In production mode the app will automatically create a
new browser tab with the url `localhost:5000`. The main difference between
production and development modes is a Service Worker runs in productin mode to
support offline execution.

The production version of the app is build by running `npm run publish`.

### Environment Variables

Environment variables that control the operation of the app are defined in the
`.env` file in the application root. These variables and their usage are shown
in the following table. It's important to keep in mind that when these settings
in the `.env` file are changed `npm run build` must be run before they will
take effect.

Environment variables maintained in the `.env` file are made available to the
application code via `process.env.<variable-name>`. For example, the
neighborhood's latitude is accessed in the code by referencing
`process.env.REACT_APP_LAT`.

Remember that even though this keeps secure tokens like client id's and secrets
out of application code it does not make them secure.

| Environment Variable    | Description | Example Setting |
|:------------------------|:------------|:----------------|
| REACT_APP_LAT           | Latitude of the neighborhood | REACT_APP_LAT=28.4812299 |
| REACT_APP_LNG           | Longitude of the neighborhood | REACT_APP_LNG=-80.8883962 |
| REACT_APP_MAPS_URL      | Google Maps URL with API key | REACT_APP_MAPS_URL="https://maps.googleapis.com/maps/api/js?libraries=places&key=\<YOUR-API-KEY\>" |
| REACT_APP_SEARCH_RADIUS | Radius, in meters, searches are constrained to | REACT_APP_SEARCH_RADIUS=16000 |
| REACT_APP_FS_CLIENT_ID  | Foursquare API client id | REACT_APP_FS_CLIENT_ID=ADADEAFDF4ADFADFAA5ADADFAFAD |
| REACT_APP_FS_CLIENT_SECRET | Foursquaer API client secret | REACT_APP_FS_CLIENT_SECRET=ADADEAFDF4ADFADFAA5ADADFAFAD |

## Dependencies

### Libraries

This app has the following dependencies

| Module/Library | Environment | Description | Related Files |
|:---------------|:------------|:------------|:--------------|
| autoprefixer   | Development | Parses CSS and adds vendor prefixes to CSS rules | N/a |
| css-loader     | Development | Resolves CSS @import and url() paths | N/a |
| extract-loader | Development | Extracts the CSS into a .css file | N/a |
| file-loader    | Development | Serves the .css file as a public URL | N/a |
| lodash.debounce | Runtime    | _debounce text input | N/a  |
| node-sass-chokidar | Development | CSS complier | N/a |
| NPM            | Development | Package manager | package.json |
| npm-run-all    | Runtime     | Run multiple scripts | N/a |
| postcss-loader | Deveopment  | Loader for Webpack used in conjunction with autoprefixer | N/a |
| prop-types     | Runtime     | Type checking for props | N/a |
| react          | Runtime     | UI Library  | N/a           |
| react-dom      | Runtime     | DOM renderer for React | N/a |
| react-router   | Runtime     | Declarative routing for React | N/a |
| react-scripts  | Runtime     | scripts and configuration used by Create React App | N/a |
| rmwc           | Runtime     | [React Material Web Components](https://jamesmfriedman.github.io/rmwc//) | N/a |
| sass-loader    | Development | Loads a Sass file and compiles it to CSS | N/a |

In addition to these libraries, which the app explicitly depends on,
Create React App includes other libraries such as Babel and Webpack. For more
information about Create React App and it's dependencies consult its
[documentation](https://github.com/facebook/create-react-app).

### External Dependencies

In addition to libraries Neighborhood Maps also depends on webservices to
provide with details about places. The [Google Maps Javascript API](https://developers.google.com/maps/documentation/javascript/tutorial)
used for basic
searching and to populate information windows on the map with basic information.

Detailed information about a place, displayed when the user clicks the `Details...`
button in an information window on the map, is obtained from [FourSquare](https://developer.foursquare.com/docs/api).

## Application Structure

The component structure of the neighborhoodmap application is shown in the following
diagram.

![neighborhoodmap Component Structure](https://github.com/jdmedlock/neighborhoodmap/blob/development/docs/neighborhoodmap%20Component%20Structure.png)

## Frequently Asked Questions

1. Why is a native Google Maps API used instead of a library like [react-google-maps](https://github.com/tomchentw/react-google-maps)?

First of all, `react-google-maps` is a well done library and this project
could have been developed more quickly had it been used. However, since one
goal of this project is to be a learning tool it was felt that a great amount
of value could be derived from pursuing an "old school" approach.

A secondary reason is that there are already a large number of dependencies
in the app on various libraries. So, a native approach was chosen to help
reduce the number of dependencies.

2. Why is Material Design used in the applications UI?

This application's UI could have been implemented using any number of scheme's
as long as it satisfies the need to deliver information to the user in a
logical and consistent manner. However, Material Design is one of those
UI/UX schemes, it is widely used, and since it has been proven effective
in numerous other applications (like all of Google's apps) it was a good fit
for Neighborhood Maps.

A secondary reason for using it, but one that is just as important, is that
since one of the goals of this app is to extend our knowledge and
experience it was chosen as a "stretch" goal.

3. Why are the API's implemented as `static` functions rather than as an
instantiated class?

The simple reason is they don't have to be. This was implemented in this
manner to eliminate the need to maintain yet another state. The map and other
data elements could have been carried in a stateful API, but it was felt that
the additional level of insulation this would have provided wasn't necessary.

4. Why is the UI is implementated with a minimal color scheme and few adornments?

There are two reasons for this. First, using a white background increases the
contrast of other elements making it easier for those with impared vision to
distinguish between the various visual elements of the app.

Secondly, since the map contains a variety of colors and elements using a
minimalistic approach minimizes "clashes" between map elements and the
surrounding visual elements.

5. Aren't you just showing off by using both Google Maps and Foursquare as
sources for information about places?

Yes, but since this is a "learning" app the benefit has been to expand our
experience using different data sources and to improve the user experience by
using the best source for a particular context. For example, the purpose of
the info window is to provide a general description of the place while the
place details drawer is intended to provide more indepth information.

## Change Log

For more information see [Change Log](https://github.com/jdmedlock/neighborhoodmap/blob/development/CHANGELOG.md)

## Contributing

See [Contributing](https://github.com/jdmedlock/neighborhoodmap/blob/development/CONTRIBUTING.md)
and our [Collaborator Guide](https://github.com/jdmedlock/neighborhoodmap/blob/development/COLLABORATOR_GUIDE.md).

## Authors

Developers on this project can be found on the [Contributors](https://github.com/jdmedlock/neighborhoodmap/graphs/contributors) page of this repo.

## License

[MIT](https://tldrlegal.com/license/mit-license)
