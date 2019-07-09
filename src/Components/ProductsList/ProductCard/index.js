import React from "react";
import Card from "../../Card";
import styles from "./product-card.module.scss"


const ProductCard = props => {
  return (
    <Card>
      <div className={`${props.className}`} id={props.id}>
        <h2>{props.name}</h2>
        <img src={props.image} alt={props.name} className={styles.image}/>
        <p>${(props.price/100).toFixed(2)}</p>
      </div>
    </Card>
  );
};

export default ProductCard;
