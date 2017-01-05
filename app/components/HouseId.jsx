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

  render() {
    if (this.props.house.photo) {
      this.checkImage(this.props.house.photo);
    }

    const favoriteButt = (
      <div className="row">
        <div className="one column" id="favoritebutton">
          {
            this.props.favorite ? (
              <img className="icons" src="./img/Hearts Filled-50.png" />
            ) : (
              <img className="icons" src="./img/Hearts-50.png" />
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
        <div className="row">
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
        <div className="row" id="remarks">
          <h4 id="notes">Notes:</h4>
          <p>{this.props.house.remarks}</p>
        </div>
      </div>
    )
  }
}
