import React, { Component } from 'react';
import Cart from './Cart'
import './ProductDetail.css'

import data from '../data/products.json'

class ProductDetail extends Component {
    constructor(props) {
        super(props)

        this.findProductById = this.findProductById.bind(this)
        this.handleAddToCart = this.handleAddToCart.bind(this)
    }
    
    handleAddToCart(e) {
        let id = e.target.name;
        let goods = JSON.parse(localStorage.getItem('miniCart')) || {};

        if(goods && goods[id]) {
            goods[id] += 1;
        } else {
            goods[id] = 1;
        }

        localStorage.setItem('miniCart', JSON.stringify(goods));
    }

    render() {
        const {id} = this.props.match.params
        let product = this.findProductById(id);
        return <main>
                <div className='product-detail'>
                    <div className='grid-cell'>
                        <p>{product.name}</p>
                        <img className='pdp-image' src={'/minimart/assets/' + product.image} />
                    </div>
                    <div className='grid-cell'>
                        <p><b>{product.measurement}</b></p>
                        <p><b>${product.price}</b></p>
                        <p className="desc">{product.desc}</p>
                        <button name={id} className='addToCart' onClick={this.handleAddToCart}>Add To Cart</button>
                    </div>
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

export default ProductDetail;