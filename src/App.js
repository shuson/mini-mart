import React, { Component } from 'react';

import './App.css';

class App extends Component {
  constructor() {
    super()
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
          <aside className={opened ? "slideOn" : "slideOff"}>
            <span onClick={this.toggleCart} style={{position:'absolute', left: '0px', top: '50%', cursor: 'pointer'}}>{opened ? '>>' : '<<'}</span>
          </aside>
          <header>
              <button onClick={this.toggleCart}>Shopping Cart</button>
          </header>
          <main>
            <nav>nav</nav>
            <article>article</article>
          </main>
          <footer>footer</footer>
        </div>
    );
  }
}

export default App;
