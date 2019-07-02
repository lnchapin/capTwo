import React, { Component } from "react";


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
        {this.state.products.map(product => {
          return <h2 key={product.id}>{product.name}</h2>
        })}
      </div>
    );
  }
}

export default Products;
