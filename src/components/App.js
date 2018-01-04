import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      opened: false
    }

  }


  render() {
    const { opened } = this.state;
    return (
        <div className="App">
          <header>
              <span></span>
              <span>Mini Mart</span>
              <span>
                <Link to="/">
                <button className="button">Browse</button>
                </Link>
                <Link to="/cart">
                  <button className="button">Cart</button>
                </Link>
              </span>
          </header>
          {this.props.children}
        </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node
}

export default App;
