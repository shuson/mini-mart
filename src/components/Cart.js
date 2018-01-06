import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Cart.css'
import data from '../data/products.json'

class Cart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            total: 0
        }

        this.findProductById = this.findProductById.bind(this)
        this.reduce = this.reduce.bind(this)
        this.add = this.add.bind(this)
        this.remove = this.remove.bind(this)
        this.updateState = this.updateState.bind(this)
    }

    reduce(e) {
        let productId = e.target.name;
        let goods = JSON.parse(localStorage.getItem('miniCart'));

        goods[productId] = goods[productId] - 1

        if(goods[productId] == 0) {
            this.remove(e)
            return
        }

        //update stocking

        localStorage.setItem('miniCart', JSON.stringify(goods))
        this.updateState()
    }

    add(e) {
        let productId = e.target.name;
        let goods = JSON.parse(localStorage.getItem('miniCart'));

        //stock checking

        goods[productId] = goods[productId] + 1

        //update stocking

        localStorage.setItem('miniCart', JSON.stringify(goods))
        this.updateState()
    }

    remove(e) {
        let productId = e.target.name;
        let goods = JSON.parse(localStorage.getItem('miniCart'));

        delete goods[productId]

        localStorage.setItem('miniCart', JSON.stringify(goods))

        this.updateState()
    }

    updateState() {
        let total = 0;
        let goods = JSON.parse(localStorage.getItem('miniCart'));

        for(let productId in goods) {
            let product = this.findProductById(productId);
            total += Number(product.price) * goods[productId];
        }

        this.setState({
            total: total
        })
    }

    handleCheckout() {
        alert("TO DO checkout");
    }

    render() {
        let goods = JSON.parse(localStorage.getItem('miniCart'));
        if(!goods) return <main><article /></main>

        let total = 0;

        let productList = []
        for(let productId in goods) {
            let product = this.findProductById(productId);
            total += Number(product.price) * goods[productId];
            
            productList.push(<section key={productId}>
                <br />
                <Link to={"/minimart/products/" + productId} >
                    <img src={'/minimart/assets/' + product.image} />
                </Link>
                <p className='productName'>{product.name}</p>
                <p className='productPrice'>${product.price}</p>
                <div><button name={productId} className='smallButton' onClick={this.reduce}>-</button> <span className="thinBorder">{goods[productId]}</span> <button name={productId} className='smallButton' onClick={this.add}>+</button></div>
                <button name={productId} className='removeItem' onClick={this.remove}>Remove</button>
            </section>
            )
        }

        return <main className='cart'>
                <div className='cart'>
                    {productList}
                </div>
                <div className="summary">
                    <span></span>
                    <span></span>
                    <p>Total: ${total} SGD</p>
                    <button className="checkout" onClick={this.handleCheckout}>checkout</button>
                </div>
        </main>
    }

    findProductById(id) {
        let products = data.products;

        for(let i = 0; i < products.length; i++) {
            let onlyImgName = products[i].image.substr(0, products[i].image.lastIndexOf("."));
            if(onlyImgName === id) {
                return products[i]
            }
        }

        return null;
    }
}

export default Cart;