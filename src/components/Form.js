import React from "react";
import { Route, Link } from "react-router-dom";
import Pizza from "./Pizza";

export default function Form() {
  return (
    <>
      <h1>What would you like to eat?</h1>
      <h3>...please say pizza ...please say pizza</h3>
      <Link to="/order/pizza">Order Pizza Here!</Link>
    </>
  );
}
