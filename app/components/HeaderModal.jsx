import React from 'react';
import ReactDOM from 'react-dom';

export default class HeaderModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.handleChange(e);
  }

  handleClose() {
    this.props.signUpModalClose();
  }

  submit(e) {
    const node = ReactDOM.findDOMNode(this.refs.headerModal);
    this.props.signUp(e, node);
  }

  render() {
    return (
      <div ref="headerModal" className="modal header-modal">
        <div className="modal-content container">
          <span onClick={this.handleClose.bind(this)} className="closebtn">&times;</span>
          <div className="container">
            <center>
              <h2>Sign Up</h2>
              <h4>Sign Up to Favorite Houses and Join Our Email List!</h4>
            </center>
            <br/>
            <form onSubmit={this.submit.bind(this)}>
              <div className="row">
                <div className="five columns offset-by-one column">
                  <label htmlFor="firstName" className="labels">First Name</label>
                  <input value={this.props.firstName} onChange={this.handleChange} name="firstName" className="u-full-width" type="text" id="firstName" placeholder="John"/>
                </div>
                <div className="five columns offset-by-one column">
                  <label htmlFor="lastName" className="labels">Last Name</label>
                  <input value={this.props.lastName} onChange={this.handleChange} name="lastName" className="u-full-width" type="text" id="lastName" placeholder="Doe"/>
                </div>
              </div>
              <div className="row">
                <div className="four columns offset-by-one column">
                  <label htmlFor="phoneNumber" className="labels">Phone Number</label>
                  <input value={this.props.phoneNumber} onChange={this.handleChange} name="phoneNumber" className="u-full-width" type="text" id="phoneNumber" placeholder="xxxxxxxxxx"/>
                </div>
              </div>
              <div className="row">
                <div className="five columns offset-by-one column">
                  <label htmlFor="email" className="labels">Email</label>
                  <input value={this.props.email} onChange={this.handleChange} name="email" className="u-full-width" type="email" id="email" placeholder="john.doe@mail.com"/>
                </div>
                <div className="five columns offset-by-one column">
                  <label htmlFor="password" className="labels">Password</label>
                  <input value={this.props.pass} onChange={this.handleChange} name="pass" className="u-full-width" type="password" id="password"/>
                </div>
              </div>
              <div className="row">
                <div className="one column offset-by-nine columns">
                  <input className="button button-primary" type="submit"/>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
