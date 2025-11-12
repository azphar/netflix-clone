import React, { Component } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase'; // match your Login.jsx import

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navDark: false,
    };

    this.handleScroll = this.handleScroll.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (window.scrollY > 80) {
      this.setState({ navDark: true });
    } else {
      this.setState({ navDark: false });
    }
  }

  handleSignOut() {
    console.log('Sign out clicked');
    signOut(auth)
      .then(() => {
        console.log('Signed out');
        window.location.href = '/login'; // simple redirect
      })
      .catch((error) => {
        console.error('Sign out error:', error);
      });
  }

  render() {
    return (
      <div className={`navbar ${this.state.navDark ? 'nav-dark' : ''}`}>
        <div className="navbar-left">
          <Link to="/">
            <img src={logo} alt="Netflix Logo" />
          </Link>
          <ul>
            <li>Home</li>
            <li>TV Shows</li>
            <li>Movies</li>
            <li>New & Popular</li>
            <li>My List</li>
          </ul>
        </div>

        <div className="navbar-right">
          <div className="navbar-profile">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              alt="Profile"
              className="profile"
            />
            <div className="dropdown">
              <button
                type="button"
                className="dropdown__signout"
                onClick={this.handleSignOut}
              >
                Sign Out of Netflix
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;

