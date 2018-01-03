import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './ProductList.css'
import data from '../data/products.json'

class ProductList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filters: []
        }

        this.onFilterChange = this.onFilterChange.bind(this)
    }

    onFilterChange(e) {
        let existintFilters = this.state.filters;
        let val = e.target.value;
        let existedIndex = this.state.filters.indexOf(val);
        if(existedIndex > -1) {
            existintFilters.splice(existedIndex, 1)
        } else {
            existintFilters.push(val)
        }

        this.setState({
            filters: existintFilters
        })

        console.log(this.state)
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
                    let lastDotIndex = product.image.lastIndexOf(".");
                    let productId = product.image.substr(0, lastDotIndex);
                    return <section key={index}>
                        <br />
                        <Link to={"/product/" + productId} >
                            <img src={'./assets/' + product.image} />
                        </Link>
                        <div>{product.name}</div>
                        <div>{product.price}</div>
                        <button className='addToCart'>Add To Cart</button>
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