import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cart from './Cart'
import './ProductList.css'
import data from '../data/products.json'

class ProductList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filters: {}
        }

        this.onFilterChange = this.onFilterChange.bind(this)
        this.filterValidate = this.filterValidate.bind(this)
        this.handleAddToCart = this.handleAddToCart.bind(this)
    }

    onFilterChange(e) {
        let existintFilters = this.state.filters;

        let filterName = e.target.name;
        let filterVal = e.target.value;

        let filterVals = existintFilters[filterName] || [];
        if(filterVals.length > 0) {
            let existedIndex = existintFilters[filterName].indexOf(filterVal);
            if(existedIndex > -1) {
                filterVals.splice(existedIndex, 1);
            } else {
                filterVals.push(filterVal)
            }
        } else {
            filterVals.push(filterVal)
            existintFilters[filterName] = filterVals
        }

        this.setState({
            filters: existintFilters
        })
    }

    filterValidate(product) {
        let filters = this.state.filters;
        let filterKeys = Object.keys(filters);
        if(filterKeys.length === 0) return true;
        
        let brands = filters.brand || [];
        let prices = filters.price || [];

        let brandFlag = true;
        let priceFlag = prices.length == 0;

        if(brands.length > 0 && brands.indexOf(product.brand) < 0) {
            brandFlag = false
        }
        
        for(let j = 0; j < prices.length; j++) {
            let priceRange = prices[j].split("-")
            if(product.price > Number(priceRange[0]) && product.price < Number(priceRange[1])) {
                priceFlag = true;
            }
        }

        return brandFlag && priceFlag
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
        return <main>
            <nav>
                {data.filters.map((filter, index) => {
                    return <FilterGroup key={'filter' + index} filter={filter} changeFilter={this.onFilterChange} />
                })}
            </nav>
            <article>
                {data.products.map((product, index) => {
                    if(!this.filterValidate(product)) return;

                    let lastDotIndex = product.image.lastIndexOf(".");
                    let productId = product.image.substr(0, lastDotIndex);
                    return <section key={index}>
                        <br />
                        <Link to={"/minimart/products/" + productId} >
                            <img src={'/minimart/assets/' + product.image} />
                        </Link>
                        <p className='productName'>{product.name}</p>
                        <p className='productPrice'>${product.price}</p>
                        <button className='addToCart' name={productId} onClick={this.handleAddToCart}>Add To Cart</button>
                    </section>
                })}
            </article>
        </main>
    }
}

const FilterGroup = (props) => {
    return <div>
            <p>{props.filter.name}</p>
            {props.filter.values.map((filterValue, index)=>{
                return <div key={index}>
                    <input name={props.filter.name} type="checkbox" value={filterValue} onClick={props.changeFilter} /> <label className="filterLabel">{filterValue}</label>
                </div>
            })}
        </div>
}

export default ProductList;