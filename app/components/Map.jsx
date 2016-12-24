import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

export default class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const Map = withGoogleMap(props => (
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: 44.5535686, lng: -123.3381089 }}
        defaultOptions={{
          styles: [
            {
              "featureType": "administrative",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "landscape",
              "stylers": [
                {
                  "hue": "#0066ff"
                },
                {
                  "saturation": 74
                },
                {
                  "lightness": 100
                },
                {
                  "visibility": "simplified"
                }
              ]
            },
            {
              "featureType": "poi",
              "stylers": [
                {
                  "visibility": "simplified"
                }
              ]
            },
            {
              "featureType": "road",
              "stylers": [
                {
                  "visibility": "simplified"
                }
              ]
            },
            {
              "featureType": "road.arterial",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "stylers": [
                {
                  "saturation": -85
                },
                {
                  "lightness": 61
                },
                {
                  "visibility": "off"
                },
                {
                  "weight": 0.6
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry",
              "stylers": [
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "road.local",
              "stylers": [
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "transit",
              "stylers": [
                {
                  "visibility": "simplified"
                }
              ]
            },
            {
              "featureType": "water",
              "stylers": [
                {
                  "color": "#5f94ff"
                },
                {
                  "lightness": 26
                },
                {
                  "gamma": 5.86
                },
                {
                  "visibility": "simplified"
                }
              ]
            }
          ]
        }}
      />
    ));

    return (
      <Map
        containerElement={
          <div style={{ height: `90vh` }} />
        }
        mapElement={
          <div style={{ height: `90vh` }} />
        }
      />
    )
  }
}
