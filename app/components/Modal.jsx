import React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

@observer export default class Modal extends React.Component {
  @observable photo = '';

  constructor(props) {
    super(props);
    this.checkImage = this.checkImage.bind(this);
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

  render() {
    if (this.props.house.photo) {
      this.checkImage(this.props.house.photo);
    }

    return (
      <div className="modal">
        <div className="modal-content container">
          <span onClick={this.handleClick.bind(this)} className="closebtn">&times;</span>
          <div className="row inforow">
            <div className="three columns infocolumn">
              <p className="infotag">Price: </p>
              <h3>{this.props.house.price}</h3>
            </div>
            <div className="two columns infocolumn">
              <p className="infotag">Square Feet: </p>
              <h3>{this.props.house.sqFt}</h3>
            </div>
            <div className="two columns infocolumn">
              <p className="infotag">Beds: </p>
              <h3>{this.props.house.beds}</h3>
            </div>
            <div className="two columns infocolumn">
              <p className="infotag">Baths: </p>
              <h3>{this.props.house.baths}</h3>
            </div>
            <div className="two columns lastinfocolumn">
              <p className="infotag">Yr Built: </p>
              <h3>{this.props.house.yearBuilt}</h3>
            </div>
          </div>
          <div className="row">
            <div className="housepicrow">
              <img className="u-full-width ousepic" src={this.photo}/>
            </div>
          </div>
          <div className="row houseaddr">
            <h3>{this.props.house.address}</h3>
            {/* <p>{this.props.house.remarks}</p> */}
          </div>
        </div>
      </div>
    )
  }
}
