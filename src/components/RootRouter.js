import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import App from './App'
import ProductList from './ProductList'
import ProductDetail from './ProductDetail'
import Cart from './Cart'

const RootRouter = (props) => {
    return (
        <Router>
            <App>
                <Switch>
                    <Route exact path="/" component={ProductList} />
                    <Route path="/product/:id" component={ProductDetail} />
                    <Route path="/cart" component={Cart} />
                    <Route path="*" component={ProductList} />
                </Switch>
            </App>
        </Router>
    )
}

export default RootRouter;