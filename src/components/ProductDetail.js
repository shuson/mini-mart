import React, { Component } from 'react';

class ProductDetail extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {id} = this.props.match.params
        return <div>
                {id}
            </div>
    }
}

export default ProductDetail;