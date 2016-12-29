import React from 'react';
import House from './House';

export default class Houses extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const listingsArr = this.props.listings.map((elm, ind) => {
      return (
        <House
          key={ind}
          id={elm.id}
          photo={elm.photo}
          price={elm.price}
          status={elm.status}
          saleRent={elm.saleRent}
          baths={elm.baths}
          beds={elm.beds}
          sqFt={elm.sqFt}
          markerClick={this.props.markerClick}
          markerClose={this.props.markerClose}
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
