import React from 'react';
import Notifications from 'react-notify-toast';
import Admin from './Admin';

export default class App extends React.Component {
  render() {
    return (
      <div className="body">
        <main className="main">
          <Notifications />
          <Admin />
        </main>
      </div>
    );
  }
}
