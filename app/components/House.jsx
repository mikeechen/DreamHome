import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

@observer export default class House extends React.Component {
  @observable photo = '';

  constructor(props) {
    super(props);
    this.checkImage = this.checkImage.bind(this);
    this.changeImage = this.changeImage.bind(this);
    this.replaceImage = this.replaceImage.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleMouseEvent() {
    const house = ReactDOM.findDOMNode(this.refs.infodiv);
    if (house.classList[1] === 'infodivhover') {
      this.props.markerClose(this.props.id);
    } else {
      this.props.markerClick(this.props.id);
    }
    house.classList.toggle('infodivhover');
  }

  handleClick() {
    this.props.houseSelect(this.props.id);
  }

  checkImage(photo, success, change) {
    const img = new Image();
    img.onload = success;
    img.onerror = change;
    img.src = photo;
  }

  changeImage() {
    return this.photo = './img/DefaultHouse.jpg';
  }

  replaceImage() {
    return this.photo = this.props.photo.replace('/0/60/45/', '/0/2048/1536/');
  }

  componentWillMount() {
    this.checkImage(this.props.photo, this.replaceImage, this.changeImage);
  }

  shouldComponentUpdate() {
    return !(this.photo === this.props.photo);
  }

  componentWillUpdate() {
    this.checkImage(this.props.photo, this.replaceImage, this.changeImage);
  }

  render() {
    return (
      <div onClick={this.handleClick} onMouseEnter={this.handleMouseEvent.bind(this)} onMouseLeave={this.handleMouseEvent.bind(this)} className="one-half column house">
        <img className="housephoto u-full-width" src={this.photo} />
        <div className="infodiv" ref='infodiv'>
          <div className="row">
            <div className="one column">
              <div className={this.props.status === 'ACT' ? 'active' : 'pending' }>✺</div>
            </div>
            <div className="sale-rent">&nbsp;{this.props.status === 'ACT' ? this.props.saleRent : 'Pending' }</div>
          </div>
          <h4 className="houseprice">{this.props.price}</h4>
          <div className="houseinfo">{this.props.sqFt}sqft | {this.props.beds} beds | {this.props.baths} baths</div>
        </div>
      </div>
    )
  }
}
