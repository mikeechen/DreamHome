import React from 'react';
import ReactDOM from 'react-dom';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange(e) {
    this.props.handleChange(e);
  }

  loginSubmit(e) {
    e.preventDefault();
    const node = ReactDOM.findDOMNode(this.refs.loginForm);
    this.props.login(this.props.email, this.props.pass, node);
  }

  render() {
    return (
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
    )
  }
}
