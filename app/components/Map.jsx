import React from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

const HomeMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={13}
    center={{ lat: props.lat, lng: props.lng }}
    onDragEnd={props.onCenterChanged}
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
  >
    {props.markers.map((marker, index) => (
      <Marker
        {...marker}
        onClick={() => props.onMarkerClick(marker)}
        >
          {marker.showInfo && (
            <InfoWindow onCloseClick={() => props.onMarkerClose(marker)}>
              <div>{marker.infoContent}</div>
            </InfoWindow>
          )}
        </Marker>
      ))}
      <Marker
        icon='https://www.daftlogic.com/images/cross-hairs.gif'
        shape={{ coords:[0,0,0,0], type:'rect'}}
        position={{ lat: props.lat, lng: props.lng }}
      />
  </GoogleMap>
));

export default class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <HomeMap
        containerElement={
          <div style={{ height: `90vh` }} />
        }
        mapElement={
          <div style={{ height: `90vh` }} />
        }
        lat={this.props.lat}
        lng={this.props.lng}
        markers={this.props.markers}
        onMapLoad={this.props.onMapLoad}
        onCenterChanged={this.props.onCenterChanged}
        onMarkerClick={this.props.onMarkerClick}
        onMarkerClose={this.props.onMarkerClose}
        onSearchBoxMount={this.props.onSearchBoxMount}
      />
    )
  }
}
