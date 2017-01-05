import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import HeaderModal from './HeaderModal';
import LoginForm from './LoginForm';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  loginForm(e) {
    e.preventDefault();
    const loginNode = ReactDOM.findDOMNode(this.refs.loginForm);
    loginNode.classList.toggle('login-form-appear');
  }

  signUpModalOpen(e) {
    this.props.signUpModalOpen(e);
  }

  render() {
    return (
      <header>
        <nav>
          <div className="container nav-bar">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/search">Search For Homes</Link></li>
              {this.props.loggedIn ?
                <li><a href="">Favorites</a></li> :
                <li><a href="" onClick={this.signUpModalOpen.bind(this)}>Sign Up</a></li>
              }
              <li><a href="mailto:RebeccaYu@remax.net" target="_blank">Contact</a></li>
              <li><a href="">About</a></li>
              {this.props.loggedIn ?
                <li id="login"><a href="" onClick={this.logout.bind(this)}>Log Out</a></li> :
                <li id="login"><a href="" onClick={this.loginForm.bind(this)}>Log In</a></li>
              }
            </ul>
          </div>
        </nav>
        <div className="container">
          <LoginForm
            ref="loginForm"
            handleChange={this.props.handleChange}
            login={this.props.login}
            email={this.props.email}
            pass={this.props.pass}
          />
        </div>
      </header>
    )
  }
}
