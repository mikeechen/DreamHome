import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import Map from './Map';

export default class SearchHomes extends React.Component {
  constructor() {
    super()
  }

  render() {

    return (
      <div className="row">
        <div className="seven columns">
          <div className="row">
            <form>
              <div className="six columns offset-by-one mapsearch">
                <input className="u-full-width" type="text" placeholder="search here" />
              </div>
              <div className="two columns">
                <label className="labels distance-label" for="distance">Radius</label>
                <select className="u-full-width" id="distance">
                  <option value="10">10mi</option>
                  <option value="20">20mi</option>
                  <option value="30">30mi</option>
                </select>
              </div>
              <div className="two columns mapsearch">
                <input className="button button-primary" type="submit" placeholder="Submit" />
              </div>
            </form>
          </div>
          <Map />
        </div>
      </div>
    )
  }
}
