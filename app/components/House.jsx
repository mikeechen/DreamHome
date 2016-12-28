import React from 'react';
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
      <div className="one-half column house">
        <img className="housephoto u-full-width" src={this.photo} />
      </div>
    )
  }
}
