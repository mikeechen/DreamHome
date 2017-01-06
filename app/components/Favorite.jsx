import React from 'react';
import { Link } from 'react-router';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

@observer export default class Favorite extends React.Component {
  @observable photo = '';

  constructor(props) {
    super(props);
    this.checkImage = this.checkImage.bind(this);
  }

  checkImage(photo) {
    const img = new Image();
    img.onload = () => this.photo = this.props.photo.replace('/0/60/45/', '/0/2048/1536/');
    img.onerror = () => this.photo = './img/DefaultHouse.jpg';
    img.src = photo;
  }

  houseClick() {
    this.props.favoriteClose();
  }

  handleUnfavorite() {
    this.props.deleteFavorite(this.props.id);
  }

  render() {
    if (this.props.photo) {
      this.checkImage(this.props.photo)
    }

    return (
      <div className="row">
        <div className="row favoriterow">
          <span className={this.props.status === 'ACT' ?
            'favoriteicon active' :
            'favoriteicon pending' }>✺</span>
          <div className="u-full-width">
            <Link className="favoriteanchor" onClick={this.houseClick.bind(this)} to={{ pathname: '/house', query: { id: this.props.id } }}>
              <div className="row favoritebuttonrow">
                <img className="thumbnailimg three columns" src={this.photo}/>
                <div className="row nine columns favoriteheaderrow">
                  <h4 className="eight columns favoriteheader">{this.props.address}</h4>
                  <h4 className="two columns favoriteheader">{this.props.beds}</h4>
                  <h4 className="two columns favoriteheader favoriteheader-last">{this.props.baths}</h4>
                </div>
                <div className="row nine columns">
                  <p className="eight columns favoriteheader favoriteheadertext">{this.props.city}, {this.props.state} {this.props.zip}</p>
                  <p className="two columns favoriteheader favoriteheadertext no-padding">Beds</p>
                  <p className="two columns favoriteheader favoriteheadertext favoriteheader-last no-padding">Baths</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <span onClick={this.handleUnfavorite.bind(this)} title="Unfavorite" className="unfavoritebutton">&times;</span>
      </div>
    )
  }
}
