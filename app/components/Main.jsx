import React from 'react';
import { Match, Redirect } from 'react-router';
import MainLanding from './MainLanding';
import SearchHomes from './SearchHomes';

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
            <MainLanding />
          )
        )}/>
        <Match pattern="/search" component={SearchHomes} />
      </div>
    )
  }
}
