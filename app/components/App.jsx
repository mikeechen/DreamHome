import React from 'react';
import ReactDOM from 'react-dom';
import Notifications, { notify } from 'react-notify-toast';
import axios from 'axios';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { BrowserRouter, Match, Redirect } from 'react-router';
import Admin from './Admin';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import HeaderModal from './HeaderModal';

@observer export default class App extends React.Component {
  @observable admin = false;
  @observable loggedIn = false;
  @observable firstName = '';
  @observable lastName = '';
  @observable age = 0;
  @observable phoneNumber = '';
  @observable email = '';
  @observable pass = '';

  constructor() {
    super();
    this.login = this.login.bind(this);
    this.checkLoggedInStatus = this.checkLoggedInStatus.bind(this);
    this.logout = this.logout.bind(this);
    this.signUp = this.signUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signUpModalOpen = this.signUpModalOpen.bind(this);
    this.signUpModalClose = this.signUpModalClose.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    this[name] = e.target.value;
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
      this.email = '';
      this.pass = '';
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

  signUp(e) {
    e.preventDefault();
    const modal = ReactDOM.findDOMNode(this.refs.headerModal);

    axios({
      method: 'post',
      url: 'api/users',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        firstName: this.firstName,
        lastName: this.lastName,
        age: this.age,
        phoneNumber: this.phoneNumber,
        email: this.email,
        password: this.pass
      }
    })
    .then(res => {
      this.firstName = '';
      this.lastName = '';
      this.age = 0;
      this.phoneNumber = '';
      this.email = '';
      this.pass = '';
      this.checkLoggedInStatus();
      modal.style.display = 'none';
      notify.show('Signed Up!', 'success', 3000);
    })
    .catch(err => {
      notify.show(err.response.data, 'error', 3000);
    });
  }

  signUpModalOpen(e) {
    e.preventDefault();
    const modal = ReactDOM.findDOMNode(this.refs.headerModal);
    modal.style.display = 'block';
  }

  signUpModalClose() {
    const modal = ReactDOM.findDOMNode(this.refs.headerModal);
    modal.style.display = 'none';
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
            signUpModalOpen={this.signUpModalOpen}
            handleChange={this.handleChange}
            email={this.email}
            pass={this.pass}
          />
          <Notifications />
          <main className="main">
              { this.admin ?
                <Admin /> :
                <Main
                  loggedIn={this.loggedIn}
                />
              }
          </main>
          <Footer
            signUpModalOpen={this.signUpModalOpen}
            loggedIn={this.loggedIn}
          />
          <HeaderModal
            ref="headerModal"
            signUp={this.signUp}
            signUpModalClose={this.signUpModalClose}
            handleChange={this.handleChange}
            firstName={this.firstName}
            lastName={this.lastName}
            age={this.age}
            phoneNumber={this.phoneNumber}
            email={this.email}
            pass={this.pass}
          />
        </div>
      </BrowserRouter>
    );
  }
}
