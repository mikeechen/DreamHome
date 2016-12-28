import React from 'react';
import House from './House';

export default class Houses extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const listingsArr = this.props.listings.map((elm, idx) => {
      return (
        <House
          key={idx}
          photo={elm.photo}
        />
      )
    });

    return (
      <div className="twelve columns">
        {listingsArr}
      </div>
    )
  }
}
