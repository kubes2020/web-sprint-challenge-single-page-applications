import React from "react";
import { Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Form from "./components/Form";
import Pizza from "./components/Pizza";

const App = () => {
  return (
    <>
      <h1>Lambda Eats</h1>
      <Link to="/">Home</Link>
      <Link to="/order">Order</Link>

      <p>You can remove this code and create your own header</p>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/order">
        <Form />
      </Route>
      <Route path="/order/pizza">
        <Pizza />
      </Route>
    </>
  );
};
export default App;
