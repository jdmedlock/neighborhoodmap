# Neighborhood Map Project

[![restaurantreviews last commit](https://img.shields.io/github/last-commit/google/skia.svg)](https://github.com/jdmedlock/neighborhoodmap)
<br/>
[![Packagist](https://img.shields.io/packagist/l/doctrine/orm.svg)](https://github.com/jdmedlock/neighborhoodmap/)

## Table of Contents

* [Overview](#overview)
* [Usage](#usage)
* [Dependencies](#dependencies)
* [Application Structure](#application-structure)
* [Change Log](#change-log)
* [Contributing](#contributing)
* [Authors](#authors)
* [License](#license)

## Overview

The neighborhoodmap project was created as part of the Web Programming with
Javascript section of the [Udacity Front-End Web Developer Nanodegree Program](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001). The
purpose of this assignment is to demonstrate and solidify a basic
understanding of React from the course lessons.

You can find the project instructions here -->[Project Specification](https://jdmedlock.github.io/neighborhoodmap/PROJECT_STARTER.md).

## Usage

### UI Features

The requirements for this project are defined by he [Udacity Rubric](https://review.udacity.com/#!/rubrics/1351/view). However, the main requirements
for the main page are:

<TBD>

### Style Guide

| Style Component | Part                                                    |
|:----------------|:--------------------------------------------------------|
| Color           | Primary: #0288d1 - Light: #5eb8ff - Dark: #005b9f       |
|                 | Secondary: #f9a825 - Light: #ffd95a - Dark: #c17900     |
|                 | Text on primary: #000000 - secondary: #000000           |
| Typography      | Title: Roboto                                           |
|                 | Subtitle: Open Sans                                     |
|                 | Body: Roboto Slab                                       |
|                 | Caption: Roboto Slab                                    |
|                 | Button: Roboto                                          |
| Motion          | Selection: Increase dimension then return to normal size |

### Starting the App

To start the application simply run `npm run start` or `yarn start` from the
command line to
start the application environment. The application will automatically open a
new tab in your browser with the url `localhost:3000`.

## Dependencies

This app has the following dependencies

| Module/Library | Environment | Description | Related Files |
|:---------------|:------------|:------------|:--------------|
| @material      | Runtime     | [Material Design UI Web Components](https://material.io/develop/web/docs/getting-started/) | N/a |
| autoprefixer   | Development | Parses CSS and adds vendor prefixes to CSS rules | N/a |
| babel-core     | Development | Babel compiler core | N/a |
| babel-loader   | Development | Compiles JavaScript files using babel | N/a |
| babel-preset-es2015 | Development | Preset for compiling es2015 | N/a |
| css-loader     | Development | Resolves CSS @import and url() paths | N/a |
| dotenv         | Runtime     | Load environment variables | `.env` |
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
| sass-loader    | Development | Loads a Sass file and compiles it to CSS | N/a |
| webpack        | Development | Module bundler | `webpack.config.js` |
| webpack-dev-server | Development | Development server | N/a |

## Application Structure

The component structure of the neighborhoodmap application is shown in the following
diagram.

![neighborhoodmap Component Structure](https://github.com/jdmedlock/neighborhoodmap/blob/development/docs/neighborhoodmap%20Component%20Structure.png)

## Change Log

For more information see [Change Log](https://github.com/jdmedlock/neighborhoodmap/blob/development/CHANGELOG.md)

## Contributing

See [Contributing](https://github.com/jdmedlock/neighborhoodmap/blob/development/CONTRIBUTING.md)
and our [Collaborator Guide](https://github.com/jdmedlock/neighborhoodmap/blob/development/COLLABORATOR_GUIDE.md).

## Authors

Developers on this project can be found on the [Contributors](https://github.com/jdmedlock/neighborhoodmap/graphs/contributors) page of this repo.

## License

[MIT](https://tldrlegal.com/license/mit-license)
