import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import Home from "./components/Home";
import Form from "./components/Form";
import Pizza from "./components/Pizza";

const App = () => {
  return (
    <>
      <h1>Lambda Eats</h1>
      <Link to="/">Home</Link>
      <Link to="/order">Order</Link>

      <Switch>
        <Route path="/order/pizza">
          <Pizza />
        </Route>
        <Route path="/order">
          <Form />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </>
  );
};
export default App;
