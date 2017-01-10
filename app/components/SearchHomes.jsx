import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import { observable, computed } from 'mobx';
import { Match } from 'react-router';
import { notify } from 'react-notify-toast';
import Autocomplete from 'react-google-autocomplete';
import axios from 'axios';
import Map from './Map';
import Houses from './Houses';
import Modal from './Modal';

@observer export default class SearchHomes extends React.Component {
  @observable lat = 0;
  @observable lng = 0;
  @observable distanceMi = 1;
  @observable markers = [];
  @observable listings = [];
  @observable address = '';
  @observable _mapComponent;
  @observable house = {};
  @observable minPrice = 0;
  @observable maxPrice = 0;

  constructor() {
    super();
    this.searchAround = this.searchAround.bind(this);
    this.handleMapLoad = this.handleMapLoad.bind(this);
    this.handleCenterChange = this.handleCenterChange.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleMarkerClose = this.handleMarkerClose.bind(this);
    this.houseSelect = this.houseSelect.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);
    this.lat = parseFloat(localStorage.lat) || 44.5535686;
    this.lng = parseFloat(localStorage.lng) || -123.3381089;
    if (localStorage.lat) {
      localStorage.removeItem('lat');
    }
    if (localStorage.lng) {
      localStorage.removeItem('lng');
    }
  }

  @computed get distanceM() {
    return this.distanceMi * 1609;
  }

  selectChange(e) {
    this.distanceMi = parseInt(e.target.value);
    this.searchAround();
  }

  minPriceChange(e) {
    this.minPrice = parseInt(e.target.value);
    this.searchAround();
  }

  maxPriceChange(e) {
    this.maxPrice = parseInt(e.target.value);
    this.searchAround();
  }

  searchAround() {
    axios({
      method: 'post',
      url:'api/listings/get',
      data: {
        lat: this.lat,
        long: this.lng,
        dist: this.distanceM
      }
    })
    .then((res) => {
      const newMarkers = res.data.filter((elm) => {
        const price = parseInt(elm.price.replace('$', '').replace(',', ''));
        if (this.maxPrice > 0) {
          if (this.maxPrice > this.minPrice) {
            return price > this.minPrice && price < this.maxPrice;
          } else if (this.maxPrice < this.minPrice) {
            return price > maxPrice && price < this.minPrice;
          } else {
            return price > minPrice || price > maxPrice;
          }
        } else {
          return price > this.minPrice;
        }
      }).map((elm, ind) => {
        const { lat, long, address, state, zip, status, photo } = elm;

        return {
          position: {
            lat: lat,
            lng: long
          },
          key: ind,
          id: elm.id,
          animation: 2,
          showInfo: false,
          infoContent: (
            <div className="row">
              <div className="three columns">
                <img src={photo}/>
              </div>
              <div className="nine columns">
                <p>Address: {address}, {state} {zip}</p>
                <p>Status: {status === 'ACT' ? 'ACTIVE' : 'PENDING' }</p>
              </div>
            </div>
          )
        };
      });
      this.markers = newMarkers;
      this.listings = res.data.filter((elm) => {
        const price = parseInt(elm.price.replace('$', '').replace(',', ''));
        if (this.maxPrice > 0) {
          if (this.maxPrice > this.minPrice) {
            return price > this.minPrice && price < this.maxPrice;
          } else if (this.maxPrice < this.minPrice) {
            return price > maxPrice && price < this.minPrice;
          } else {
            return price > minPrice || price > maxPrice;
          }
        } else {
          return price > this.minPrice;
        }
      });
    })
    .catch((err) => {
      console.log(err);
    })
  }

  houseSelect(id) {
    axios.get(`api/listings/${id}`)
      .then(res => {
        this.house = res.data;
        this.openModal();
      })
      .catch(err => {
        console.log(err);
      });
  }

  openModal() {
    const modal = ReactDOM.findDOMNode(this.refs.modal);
    modal.style.display = 'block';
  }

  closeModal() {
    const modal = ReactDOM.findDOMNode(this.refs.modal);

    modal.style.display = 'none';
  }

  handleAddressSelect(place) {
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    this.lat = lat;
    this.lng = lng;
    this.address = place.formatted_address;
    this.searchAround();
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        key: 'AIzaSyATgzqn8BcKW5zFR4Lm6hOMnIpBVVyutko',
        address: this.address
      }
    })
    .then((res) => {
      const result = res.data.results[0].geometry.location;
      const lat = result.lat;
      const lng = result.lng;
      this.lat = lat;
      this.lng = lng;
    })
    .catch(err => {
      console.log(err);
    });
  }

  handleChange(e) {
    this.address = e.target.value;
  }

  handleMapLoad(map) {
    this._mapComponent = map;
  }

  handleCenterChange() {
    const lat = this._mapComponent.getCenter().lat();
    const lng = this._mapComponent.getCenter().lng();

    this.lat = lat;
    this.lng = lng;

    this.searchAround();
  }

  handleMarkerClick(mark) {
    const markOpen = this.markers.map((elm) => {
      if (elm === mark || elm.id === mark) {
        return {
          ...elm,
          showInfo: true
        };
      } else {
        return elm;
      }
    });
    this.markers = markOpen;
  }

  handleMarkerClose(mark) {
    const markClose = this.markers.map((elm) => {
      if (elm === mark || elm.id === mark) {
        return {
          ...elm,
          showInfo: false
        };
      } else {
        return elm;
      }
    });
    this.markers = markClose;
  }

  handleFavorite(id) {
    axios({
      method: 'post',
      url: 'api/favorites',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        listingId: id
      }
    })
    .then(res => {
      notify.show('Added to favorites', 'success', 3000);
    })
    .catch(err => {
      console.error(err);
    });
  }

  componentDidMount() {
    this.searchAround(this.lat, this.lng);
  }

  render() {
    return (
      <div className="row">
        <div className="twelve columns mapform">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="four columns offset-by-one mapsearch">
              <Autocomplete
                type="text"
                className="u-full-width"
                onPlaceSelected={this.handleAddressSelect.bind(this)}
                placeholder="Enter an address"
                types={['address']}
                componentRestrictions={{country: 'us'}}
                onChange={this.handleChange.bind(this)}
              />
            </div>
            <div className="one column filters">
              <label className="labels distance-label" htmlFor="distance">Radius</label>
              <select onChange={this.selectChange.bind(this)} className="u-full-width" id="distance">
                <option value="1">1mi</option>
                <option value="3">3mi</option>
                <option value="5">5mi</option>
                <option value="10">10mi</option>
              </select>
            </div>
            <div className="two columns filters">
              <label className="labels distance-label" htmlFor="distance">Min Price</label>
              <select onChange={this.minPriceChange.bind(this)} className="u-full-width" id="distance">
                <option value="0">0</option>
                <option value="100000">$100,000+</option>
                <option value="200000">$200,000+</option>
                <option value="300000">$300,000+</option>
                <option value="400000">$400,000+</option>
                <option value="500000">$500,000+</option>
              </select>
            </div>
            <div className="two columns filters">
              <label className="labels distance-label" htmlFor="distance">Max Price</label>
              <select onChange={this.maxPriceChange.bind(this)} className="u-full-width" id="distance">
                <option value="0">0</option>
                <option value="100000">$100,000</option>
                <option value="200000">$200,000</option>
                <option value="300000">$300,000</option>
                <option value="400000">$400,000</option>
                <option value="500000">$500,000</option>
                <option value="600000">$600,000</option>
                <option value="700000">$700,000</option>
                <option value="800000">$800,000</option>
                <option value="900000">$900,000</option>
                <option value="1000000">$1,000,000</option>
              </select>
            </div>
            <div className="two columns mapsearch">
              <input className="button button-primary" type="submit" placeholder="Submit" />
            </div>
          </form>
        </div>
        <div className="row maprelative">
          <div className="seven columns">
              <Map
                lat={this.lat}
                lng={this.lng}
                markers={this.markers}
                onMapLoad={this.handleMapLoad}
                onCenterChanged={this.handleCenterChange}
                onMarkerClick={this.handleMarkerClick}
                onMarkerClose={this.handleMarkerClose}
                onSearchBoxMount={this.handleSearchBoxMount}
              />
          </div>
          <div className="row">
            <div className="houses">
              <Houses
                listings={this.listings}
                markerClick={this.handleMarkerClick}
                markerClose={this.handleMarkerClose}
                houseSelect={this.houseSelect}
                minPrice={this.minPrice}
                maxPrice={this.maxPrice}
              />
            </div>
          </div>
        </div>
        <Modal
          ref="modal"
          closeModal={this.closeModal}
          house={this.house}
          loggedIn={this.props.loggedIn}
          favorite={this.handleFavorite}
          deleteFavorite={this.deleteFavorite}
          firstName={this.props.firstName}
          lastName={this.props.lastName}
          deleteFavorite={this.props.deleteFavorite}
        />
      </div>
    )
  }
}
