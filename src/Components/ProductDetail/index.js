import React, { Component } from "react";
import styles from "./products-detail.module.scss";
import { Link } from "react-router-dom";


class ProductDetails extends Component{
  state={
    product:{}
  }

  componentDidMount(){
    console.log(this.props.match.params.id);
    fetch(`http://localhost:8080/api/products/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(products =>{
        this.setState({ product: products.products });
      })
      .catch(error =>{
        this.setState({ error });
      });
  }


  render(){
    if (!this.state.product.id) {
      return <h2>Loading...</h2>
    } else {
      return(
        <div className={styles.product}>
          <img src={this.state.product.img_url} alt={this.state.product.name}/>
          <div>
            <h2>{this.state.product.name}</h2>
            <p>{this.state.product.ProductDetail.description}</p>
            <h2>${(this.state.product.price/100).toFixed(2)}</h2>
            <p>Category: <Link to={`/category/${this.state.product.Category.name}`}>{this.state.product.Category.name}</Link> > {this.state.product.description}</p>
          </div>
          <div>
            <h3>Purchase info</h3>
            <p>{this.state.product.ProductDetail.quantity} in Stock</p>
            {this.state.product.ProductDetail.quantity > 0 ? <button>Purchase</button> : <button disabled>Out of Stock</button>}
          </div>
        </div>
      );
    }
  }
};

// http://localhost:3000/category/Clothing

export default ProductDetails;
