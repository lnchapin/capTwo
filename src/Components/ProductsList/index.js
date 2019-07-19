import React, { Component } from "react";
import ProductCard from "./ProductCard";
import styles from "./products-list.module.scss";

class Products extends Component {
  state={
    products:[],
    error: ""
  }

  componentDidMount(){
    fetch("http://localhost:8080/api/products")
      .then(res => res.json())
      .then(products =>{
        this.setState({ products: products.products });
      })
      .catch(error =>{
        this.setState({ error });
      });
  }

  render(){
    return(
      <div>
        <h2>This is the Products Page</h2>
        {this.state.error ? <p>Sorry we're having an error: {this.state.error}</p>: ""}
        <div className={styles.productsList}>
          {this.state.products.map(product => {
            return (
              <ProductCard name={product.name} image={product.img_url} price={product.price} className="productCard" key={product.id} id={product.id}/>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Products;
