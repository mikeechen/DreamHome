import React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { notify } from 'react-notify-toast';
import axios from 'axios';
import Error from './Error';
import HouseId from './HouseId';

@observer export default class HousePage extends React.Component {
  @observable houseId = 0;
  @observable favorite = false;
  @observable house = {};
  @observable marker = {};

  constructor(props) {
    super(props);
    if (this.props.location.query) {
      this.houseId = this.props.location.query.id;
    }
    this.checkFavorite = this.checkFavorite.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);
    this.deleteFavorite = this.deleteFavorite.bind(this);
  }

  checkFavorite(id) {
    axios.get(`api/favorites/check?listingId=${id}`)
      .then(res => {
        this.favorite = res.data;
      })
      .catch(err => {
        console.error(err);
      })
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
      this.checkFavorite(id);
      notify.show('Added to favorites!', 'success', 3000);
    })
    .catch(err => {
      console.error(err);
    });
  }

  deleteFavorite(id) {
    axios({
      method: 'delete',
      url: 'api/favorites',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        listingId: id
      }
    })
    .then(res => {
      this.checkFavorite(id);
      notify.show('Deleted from favorites!', 'success', 3000);
    })
    .catch(err => {
      console.error(err);
    });
  }

  componentDidMount() {
    if (this.houseId === 0) {
      return false;
    }

    axios({
      method: 'get',
      url: `api/listings/${this.houseId}`,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      this.house = res.data;
      this.marker = {
        position: {
          lat: res.data.lat,
          lng: res.data.long
        }
      };
      if (this.props.loggedIn) {
        this.checkFavorite(res.data.id);
      }
    })
    .catch(err => {
      console.error(err);
    });
  }

  render() {
    return (
      <div>
        {Object.keys(this.house).length ? (
          <HouseId
            house={this.house}
            marker={this.marker}
            favorite={this.favorite}
            loggedIn={this.props.loggedIn}
            firstName={this.props.firstName}
            lastName={this.props.lastName}
            handleFavorite={this.handleFavorite}
            deleteFavorite={this.deleteFavorite}
          />
        ) : (
          <Error />
        )}
      </div>
    )
  }
}
