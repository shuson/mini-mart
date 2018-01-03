import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      opened: false
    }

    this.toggleCart = this.toggleCart.bind(this)
  }

  toggleCart() {
    const { opened } = this.state;
    this.setState({
      opened: !opened,
    });
  }

  render() {
    const { opened } = this.state;
    return (
        <div className="App">
          <div className="overlay" style={ opened? {display: 'block'} : {display: 'none'}}></div>
          <header>
              <span></span>
              <span>Mini Mart</span>
              <button className="button" onClick={this.toggleCart}>Cart</button>
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
