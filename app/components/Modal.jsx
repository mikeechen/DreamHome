import React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Link } from 'react-router';
import axios from 'axios';
import HousePage from './HousePage';
import InfoRow from './InfoRow';

@observer export default class Modal extends React.Component {
  @observable photo = '';
  @observable favorite = false;

  constructor(props) {
    super(props);
    this.checkImage = this.checkImage.bind(this);
    this.checkFavorite = this.checkFavorite.bind(this);
  }

  handleClick() {
    this.props.closeModal();
  }

  checkImage(photo) {
    const img = new Image();
    img.onload = () => this.photo = this.props.house.photo.replace('/0/60/45/', '/0/2048/1536/');
    img.onerror = () => this.photo = './img/DefaultHouse.jpg';
    img.src = photo;
  }

  checkFavorite() {
    if (this.props.house.id && this.props.loggedIn) {
      axios({
        method: 'get',
        url: `api/favorites/check?listingId=${this.props.house.id}`,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        this.favorite = res.data;
      })
      .catch(err => {
        console.error(err);
      });
    }
  }

  handleFavoriteClick() {
    this.props.favorite(this.props.house.id);
    this.favorite = !this.favorite;
  }

  handleDeleteClick() {
    this.props.deleteFavorite(this.props.house.id);
    this.favorite = !this.favorite;
  }

  shouldComponentUpdate() {
    return !(this.photo === this.props.photo);
  }

  componentWillUpdate() {
    this.checkFavorite();
  }

  componentWillMount() {
    this.checkFavorite();
  }

  render() {
    if (this.props.house.photo) {
      this.checkImage(this.props.house.photo);
    }

    const subject = `Listing at ${this.props.house.address}, `
                  + `${this.props.house.city}, ${this.props.house.state}`;
    const body = `Hi Rebecca, \n\nI'm interested in the listing at `
                + `${this.props.house.address}, and would love to schedule a tour `
                + `with you! \n\nSincerely, \n\n${this.props.firstName || 'Your Name'} ${this.props.lastName || 'Here'}`;
    const favoriteButt = (
      <div className="one column">
        {
          this.favorite ? (
            <i onClick={this.handleDeleteClick.bind(this)} className="material-icons icons">favorite</i>
          ) : (
            <i onClick={this.handleFavoriteClick.bind(this)} className="material-icons icons">favorite_border</i>
          )
        }
      </div>
    )

    return (
      <div className="modal">
        <div className="modal-content container">
          <span onClick={this.handleClick.bind(this)} className="closebtn">&times;</span>
          <InfoRow
            house={this.props.house}
          />
          <div className="row">
            <div className="housepicrow">
              <img className="u-full-width housepic" src={this.photo}/>
            </div>
          </div>
          <div className="row houseaddr">
            <h3>{this.props.house.address}</h3>
          </div>
          <div className="row">
            {this.props.loggedIn ? favoriteButt : null }
            <div className="two columns">
              <Link
                className="button"
                to={{ pathname: '/house', query: { id: this.props.house.id } }}
                target="_blank"
                >
                Learn More
              </Link>
            </div>
            <div className="three columns">
              <a
                className="button"
                href={`mailto:RebeccaYu@remax.net?subject=${subject}&body=${encodeURIComponent(body)}`}
                target="_blank">Contact Rebecca</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
