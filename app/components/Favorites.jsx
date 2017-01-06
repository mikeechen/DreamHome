import React from 'react';
import ReactDOM from 'react-dom';
import Favorite from './Favorite';

export default class Favorites extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
    this.props.favoriteClose();
  }

  render() {
    const favorites = this.props.favorites.map((elm, ind) => {
      return (
        <Favorite
          key={ind}
          {...elm}
          favoriteClose={this.props.favoriteClose}
          deleteFavorite={this.props.deleteFavorite}
          favoriteFind={this.props.favoriteFind}
        />
      )
    });

    return (
      <div className="modal favorite-modal">
        <div className="modal-content favorite-modal-content container">
          <span onClick={this.handleClick.bind(this)} className="closebtn">&times;</span>
          <div className="container">
            <h2>{this.props.firstName}'s Favorites</h2>
            {favorites}
          </div>
        </div>
      </div>
    )
  }
}
