import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Components/Home";
import ProductsList from "./Components/ProductsList";
import Header from "./Components/Header";
import NotFound from "./Components/NotFound";
import ProductDetail from "./Components/ProductDetail";
import Category from "./Components/Category";
import Success from "./Components/Success";
import Failure from "./Components/Failure";
import Profile from "./Components/Profile"

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" component={Header}/>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/products" exact component={ProductsList}/>
          <Route path="/products/:id" component={ProductDetail}/>
          <Route path="/category/:id" component={Category}/>
          <Route path="/success" component={Success} />
          <Route path="/failure" component={Failure} />
          <Route path="/profile" component={Profile} />
          <Route path="*" component={NotFound}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
