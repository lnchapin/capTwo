import React, { Component } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";

class Header extends Component {

  render(){
    return (
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
      </nav>
    );
  }
}

export default Header;
