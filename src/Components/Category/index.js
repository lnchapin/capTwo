import React, { Component } from "react";
import ProductCard from "../ProductsList/ProductCard";
import styles from "../ProductsList/products-list.module.scss";

class Category extends Component {
  state={
    category:[],
    error: ""
  }
// /api/category/:category
  componentDidMount(){
    fetch(`http://localhost:8080/api/categories/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(category =>{
        this.setState({ category: category.products[0].Products });
      })
      .catch(error =>{
        this.setState({ error });
      });
  }

  handleClick = id =>{
    console.log(id);
  }

  render(){
    console.log(this.state.category);
    if (this.state.category.length === 0 ) {
      return <h2>No Products Found</h2>
    } else {
      return(
        <div>
          <h2>{this.props.match.params.id}</h2>
          {this.state.error ? <p>Sorry we're having an error: {this.state.error}</p>: ""}
          <div className={styles.productsList}>
            {this.state.category.map(product => {
              return (
                <ProductCard name={product.name} image={product.img_url} price={product.price} className="productCard" key={product.id} id={product.id}/>
              );
            })}
          </div>
        </div>
      );
    }
  }
}


export default Category;
