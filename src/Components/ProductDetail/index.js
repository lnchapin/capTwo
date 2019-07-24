import React, { Component } from "react";
import styles from "./products-detail.module.scss";
import { Link } from "react-router-dom";


class ProductDetails extends Component{
  state={
    product:{},
    qtyError: ""
  }

  componentDidMount(){
    fetch(`http://localhost:8080/api/products/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(products =>{
        this.setState({ product: products.products });
      })
      .catch(error =>{
        this.setState({ error });
      });
  }

  initiateStripeCheckout = async () => {
    let qtyToBuy = document.getElementById("quantityToBuy").value;
    const stripe = window.Stripe("pk_test_bmnseCGKKEDF0xxIEbnoW82R00iVYgMxQE");
    const {product} = this.state;
    const lineItem = {
      name: product.name,
      description: product.ProductDetail.description,
      images: [product.img_url],
      amount: product.price,
      currency: "usd",
      quantity: qtyToBuy,
      productDetailId: product.ProductDetail.id
    };
    console.log("lineItem: ", lineItem);
    if (qtyToBuy <= this.state.product.ProductDetail.quantity) {
      try {
        // Initiate checkout session to get session id
        const response = await fetch("http://localhost:8080/api/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(lineItem)
        });
        const data = await response.json();
        const sessionId = data.session.id;
        console.log(sessionId);

        // Redirect to checkout
        const result = await stripe.redirectToCheckout({ sessionId });

      } catch (error) {
        console.log("STRIPE ERROR", error);
      }
    } else {
      this.setState({qtyError: "Sorry that quantity is more than we have in stock"})
    }


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
            <span>Qty: </span><input type="number" id="quantityToBuy" name="quantityToBuy" min="1" max={this.state.product.ProductDetail.quantity} required/>
            <br />
            {this.state.qtyError ? <p className="qtyError">{this.state.qtyError}</p>:""}
            {this.state.product.ProductDetail.quantity > 0 ? <button onClick={this.initiateStripeCheckout}>Purchase</button> : <button disabled>Out of Stock</button>}
          </div>
        </div>
      );
    }
  }
}

export default ProductDetails;
