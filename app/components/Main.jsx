import React from 'react';
import { Match } from 'react-router';
import MainLanding from './MainLanding';
import SearchHomes from './SearchHomes';

export default class Main extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Match exactly pattern="/" component={MainLanding}/>
        <Match pattern="/search" component={SearchHomes} />
      </div>
    )
  }
}
