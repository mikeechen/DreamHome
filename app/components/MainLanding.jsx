import React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import axios from 'axios';
import Reviews from './Reviews';

@observer export default class MainLanding extends React.Component {
  @observable rating = '';
  @observable reviews = [];
  @observable counter = 0;

  constructor() {
    super();
    this.getReviews = this.getReviews.bind(this);
  }

  getReviews() {
    axios.get('https://www.zillow.com/webservice/ProReviews.htm', {
      params: {
        'zws-id': 'X1-ZWz1fk5afkdzij_aj9j5',
        screenname: 'Rebecca Yu CRS',
        count: 10,
        output: 'json'
      }
    })
    .then((response) => {
      const res = response.data.response.results;
      this.rating = res.proInfo.avgRating;
      this.reviews = res.proReviews.review;
    })
    .catch((err) => {
      console.log(err);
    })
  }

  timer() {
    setInterval(() => {
      if (this.counter < 10) {
        this.counter++;
      } else {
        this.counter = 0;
      }
    }, 20000);
  }

  componentWillMount() {
    this.getReviews();
    this.timer();
  }

  render() {
    return (
      <div>
        <div className="with-background">
          <img className="main-pic" src="./img/RebeccaYU_March_4_2015_Trim_IMG_8197-Edit_CMYK_May_26_Edit_ALPHA.png"/>
          <div className="search-section">
            <div className="container">
              <h1 id="title">Welcome to Dream Home!</h1>
              <h5 id="subtitle">Next Step: Your Dream.</h5>
              <form className="search-form">
                <h4 id="start-header">Start Your Search Here:</h4>
                <input id="inputbox" type="text" placeholder="Enter the address you want to search around"/>
                <input className="button button-primary" type="submit" placeholder="submit"/>
              </form>
            </div>
          </div>
        </div>
        <Reviews
          rating={this.rating}
          reviews={this.reviews[this.counter]}
          getReviews={this.getReviews}
        />
      </div>
    )
  }
}
