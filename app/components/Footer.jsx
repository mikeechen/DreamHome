import React from 'react';
import { Link } from 'react-router';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  signUpModalOpen(e) {
    this.props.signUpModalOpen(e);
  }

  render() {
    return (
      <footer>
        <div className="row nav-row">
          <div className="container">
            <ul>
              <li className="three columns"><Link to="/">Home</Link></li>
              {this.props.loggedIn ?
                <li className="three columns"><a href="">Favorites</a></li> :
                <li className="three columns"><a href="" onClick={this.signUpModalOpen.bind(this)}>Sign Up</a></li>
              }
              <li className="three columns"><a href="mailto:RebeccaYu@remax.net">Contact</a></li>
              <li className="three columns"><a href="">About</a></li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="container">
              <div id="copyright" className="nine columns">
              <p>© Dream Homes By Rebecca Yu 2016</p>
              <p>Powered By © Zillow, Inc., 2006-2016. Use is subject to Terms of Use</p>
              </div>
              <a href="https://www.zillow.com">
                <img id="zillow" className="three columns" src="https://www.zillow.com/widgets/GetVersionedResource.htm?path=/static/logos/Zillowlogo_200x50.gif" width="200" height="50" alt="Zillow Real Estate Search" />
              </a>
          </div>
        </div>
      </footer>
    )
  }
}
