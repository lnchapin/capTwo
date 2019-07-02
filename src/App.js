import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Components/Home";
import Products from "./Components/Products";
import Header from "./Components/Header";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" component={Header}/>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/products" component={Products}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
