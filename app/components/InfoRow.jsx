import React from 'react';

export default class InfoRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
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
    )
  }
}
