import React from 'react';
import { Match, Redirect } from 'react-router';
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
        <Match exactly pattern="/" render={() => (
          localStorage.lat && localStorage.lng ? (
            <Redirect to="/search" />
          ) : (
            <MainLanding
              loggedIn={this.props.loggedIn}
            />
          )
        )}/>
        <Match pattern="/search" render={() => (
          <SearchHomes
            loggedIn={this.props.loggedIn}
            houseSelected={this.props.houseSelected}
            firstName={this.props.firstName}
            lastName={this.props.lastName}
          />
        )} />
        <Match pattern="/house" render={(props) => (
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
