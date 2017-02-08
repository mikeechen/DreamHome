import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import MainLanding from './MainLanding';
import SearchHomes from './SearchHomes';
import HousePage from './HousePage';

export default class Main extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Route exact path="/" render={() => (
          localStorage.lat && localStorage.lng ? (
            <Redirect to="/search" />
          ) : (
            <MainLanding
              loggedIn={this.props.loggedIn}
            />
          )
        )}/>
        <Route path="/search" render={() => (
          <SearchHomes
            loggedIn={this.props.loggedIn}
            houseSelected={this.props.houseSelected}
            firstName={this.props.firstName}
            lastName={this.props.lastName}
            deleteFavorite={this.props.deleteFavorite}
          />
        )} />
        <Route path="/house/:id" render={(props) => (
          <HousePage
            {...props}
            loggedIn={this.props.loggedIn}
            firstName={this.props.firstName}
            lastName={this.props.lastName}
          />
        )} />
      </div>
    )
  }
}
