import React from 'react';
import Notifications, { notify } from 'react-notify-toast';
import axios from 'axios';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { BrowserRouter, Match, Redirect } from 'react-router';
import Admin from './Admin';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';

@observer export default class App extends React.Component {
  @observable admin = false;
  @observable loggedIn = false;

  constructor() {
    super();
    this.login = this.login.bind(this);
    this.checkLoggedInStatus = this.checkLoggedInStatus.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(email, password, node) {
    axios({
      method: 'post',
      url: '/api/token',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        email: email,
        password: password
      }
    })
    .then((res) => {
      this.checkLoggedInStatus();
      node.classList.toggle('login-form-appear');
      notify.show('Logged In!', 'success', 3000);
    })
    .catch((err) => {
      notify.show(err.response.data, 'error', 3000);
    });
  }

  logout() {
    axios({
          method: 'delete',
          url: '/api/token',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((res) => {
          this.checkLoggedInStatus();
          notify.show('Logged Out!', 'success', 3000);
        })
        .catch(err => {
          notify.show(err.response.data, 'error', 3000);
        });
  }

  checkLoggedInStatus() {
    axios.get('/api/token')
      .then((res) => {
        this.admin = res.data.admin;
        this.loggedIn = res.data.loggedIn;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  componentWillMount() {
    this.checkLoggedInStatus();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="body">
          <Header
            login={this.login}
            logout={this.logout}
            loggedIn={this.loggedIn}
          />
          <Notifications />
          <main className="main">
              { this.admin ?
                <Admin /> :
                <Main />
              }
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}
