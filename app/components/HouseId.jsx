import React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import MiniMap from './MiniMap';

@observer export default class HouseId extends React.Component {
  @observable photo = '';

  constructor(props) {
    super(props);
    this.checkImage = this.checkImage.bind(this);
  }

  checkImage(photo) {
    const img = new Image();
    img.onload = () => this.photo = this.props.house.photo.replace('/0/60/45/', '/0/2048/1536/');
    img.onerror = () => this.photo = './img/DefaultHouse.jpg';
    img.src = photo;
  }

  handleFavoriteClick() {
    this.props.handleFavorite(this.props.house.id);
  }

  handleDeleteClick() {
    this.props.deleteFavorite(this.props.house.id);
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
    const listDate = new Date(this.props.house.listDate);
    const date = listDate.getFullYear() + '/' + (listDate.getMonth() + 1) + '/' + listDate.getDate();

    const favoriteButt = (
      <div className="row">
        <div className="one column" id="favoritebutton">
          {
            this.props.favorite ? (
              <img onClick={this.handleDeleteClick.bind(this)} className="icons" src="./img/Hearts Filled-50.png" />
            ) : (
              <img onClick={this.handleFavoriteClick.bind(this)} className="icons" src="./img/Hearts-50.png" />
            )
          }
        </div>
      </div>
    )

    return (
      <div className="container">
        <div className="row housepicrow houseidpic">
          <div className="eight columns">
            <img className="u-full-width houseinfopic" src={this.photo}/>
          </div>
          <div className="four columns minimap">
            <MiniMap
              lat={this.props.house.lat}
              lng={this.props.house.long}
              marker={this.props.marker}
            />
          </div>
        </div>
        {this.props.loggedIn ? favoriteButt : null}
        <div className="row" id="houseinforow">
          <div className="five columns">
            <h4 id="addressheader">{this.props.house.address}</h4>
            <p>{this.props.house.city}, {this.props.house.state} {this.props.house.zip}</p>
          </div>
          <div className="two columns">
            <h4 className="infoheader">{this.props.house.price}</h4>
            <p className="infotag">Price</p>
          </div>
          <div className="one column">
            <h4 className="infoheader">{this.props.house.beds}</h4>
            <p className="infotag">Beds</p>
          </div>
          <div className="one column">
            <h4 className="infoheader">{this.props.house.baths}</h4>
            <p className="infotag">Baths</p>
          </div>
          <div className="two columns">
            <h4 className="infoheader">{this.props.house.sqFt} <span id="unit">Sq. Ft.</span></h4>
            <p className="infotag">{this.props.house.pricePerSqFt}/Sq. Ft.</p>
          </div>
        </div>
        <div className="row" id="statusrow">
          <h4>
            <span className={this.props.house.status === 'ACT' ? 'active' : 'pending'}>✺ </span>
            Status: {this.props.house.status === 'ACT' ? 'Active' : 'Pending' }</h4>
        </div>
        <div className="row" id="remarks">
          <p>{this.props.house.remarks}</p>
        </div>
        <div className="row offset-by-one column" id="detailrows">
          <div className="row">
            <div className="five columns">
              <div className="row detailrow">
                <p className="five columns infotitle">Elementary School:</p>
                <p className="five columns info">{this.props.house.elementarySchool.length &&
                  this.props.house.elementarySchool !== '509J' ?
                  this.props.house.elementarySchool : 'N/A' }</p>
              </div>
            </div>
            <div className="five columns">
              <div className="row detailrow">
                <p className="five columns infotitle">List Date:</p>
                <p className="five columns info">{date}</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="five columns">
              <div className="row detailrow">
                <p className="five columns infotitle">Middle School:</p>
                <p className="five columns info">{this.props.house.middleSchool.length &&
                  this.props.house.middleSchool !== '509J' ?
                  this.props.house.middleSchool : 'N/A'}</p>
              </div>
            </div>
            <div className="five columns">
              <div className="row detailrow">
                <p className="five columns infotitle">Lot Size:</p>
                <p className="five columns info">{this.props.house.lotSqFt} Sq. Ft.</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="five columns">
              <div className="row detailrow">
                <p className="five columns infotitle">High School:</p>
                <p className="five columns info">{this.props.house.highSchool.length &&
                  this.props.house.highSchool !== '509J' ?
                  this.props.house.highSchool : 'N/A'}</p>
              </div>
            </div>
            <div className="five columns">
              <div className="row detailrow">
                <p className="five columns infotitle">Built:</p>
                <p className="five columns info">{this.props.house.yearBuilt}</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="five columns">
              <div className="row detailrow">
                <p className="five columns infotitle">List Date:</p>
                <p className="five columns info">{date}</p>
              </div>
            </div>
            <div className="five columns">
              <div className="row detailrow">
                <p className="five columns infotitle">MLS #:</p>
                <p className="five columns info">{this.props.house.mlsNumber}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <a
            id="bigbutton"
            className="six columns offset-by-three columns"
            href={`mailto:RebeccaYu@remax.net?subject=${subject}&body=${encodeURIComponent(body)}`}
            target="_blank"
            >
            <div className="row" id="imagerow">
              <img id="buttonimage" className="three columns" src="./img/Rebecca_Circle_Favicon.png"/>
              <h3 id="contactbutton" className="nine columns">CONTACT REBECCA!</h3>
            </div>
          </a>
        </div>
      </div>
    )
  }
}
