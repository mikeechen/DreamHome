import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import HeaderModal from './HeaderModal';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange(e) {
    this.props.handleChange(e);
  }

  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  loginSubmit(e) {
    e.preventDefault();
    const node = ReactDOM.findDOMNode(this.refs.loginForm)
    this.props.login(this.props.email, this.props.pass, node);
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
              <li><a href="">Contact</a></li>
              <li><a href="">About</a></li>
              {this.props.loggedIn ?
                <li id="login"><a href="" onClick={this.logout.bind(this)}>Log Out</a></li> :
                <li id="login"><a href="" onClick={this.loginForm.bind(this)}>Log In</a></li>
              }
            </ul>
          </div>
        </nav>
        <div className="container">
          <div className="login-form" ref="loginForm">
            <form onSubmit={this.loginSubmit.bind(this)}>
              <div className="row">
                <label className="labels" htmlFor="email">Your Email</label>
                <input
                  onChange={this.handleChange.bind(this)}
                  value={this.props.email}
                  id="email"
                  type="email"
                  name="email"
                  placeholder="blah@blah.com"
                />
              </div>
              <div className="row">
                <label className="labels" htmlFor="password">Your Email</label>
                <input
                  onChange={this.handleChange.bind(this)}
                  value={this.props.pass}
                  id="password"
                  type="password"
                  name="pass"
                  placeholder="password"
                />
              </div>
              <div className="row">
                <div className="one column offset-by-five columns">
                  <input className="button button-primary" type="submit" placeholder="Submit"/>
                </div>
              </div>
            </form>
          </div>
        </div>
      </header>
    )
  }
}
