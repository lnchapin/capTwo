import React, { Component } from "react";
import Card from "./Card";

class Home extends Component {
  state={
    categories:[],
    error: ""
  }

  componentDidMount(){
    fetch("http://localhost:8080/api/categories")
      .then(res => res.json())
      .then(categories =>{
        this.setState({ categories: categories.categories });
      })
      .catch(error =>{
        this.setState({ error });
      });
  }



  render(){
    return(
      <div>
        <h2>Shop a category!</h2>
        <div className="container">
          {this.state.categories.map(category => {
            return (
              <Card key={category.id}>{category.name}</Card>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Home;
