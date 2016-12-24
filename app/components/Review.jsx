import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Review extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="nine columns">
        <div className="row review-block">
          <h5 id="reviewer">Reviewer: {this.props.review.reviewer}</h5>
          <h6>Rating: {this.props.review.rating}/5</h6>
          <p>Date: {this.props.review.reviewDate}</p>
          <p>{this.props.review.description}</p>
        </div>
      </div>
    )
  }
}
