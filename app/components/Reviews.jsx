import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Review from './Review';

export default class Reviews extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const starArr = [];
    if (!isNaN(parseInt(this.props.rating))) {
      for (var i = 0; i < parseInt(this.props.rating); i++) {
        starArr.push((<span key={i}>★</span>));
      }
    }

    const reviews = this.props.reviews.map((elm) => {
      return (
        <Review review={elm} />
      )
    });

    return (
      <div className="section review-background">
        <div className="container">
          <div className="row">
            <div className="three columns">
              <img src="./img/Rebecca_Circle_Favicon.png"/>
              <div className="ratings">
                {starArr}
              </div>
            </div>
            <ReactCSSTransitionGroup
              transitionName="review"
              transitionAppear={true}
              transitionAppearTimeout={500}
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}
            >
              {reviews[this.props.counter]}
            </ReactCSSTransitionGroup>
          </div>
        </div>
      </div>
    )
  }
}
