import React from "react";
import { Route, Link } from "react-router-dom";
import Pizza from "./Pizza";

export default function Form() {
  return (
    <>
      <h1>this is form</h1>
      <Link to="/order/pizza">Order Pizza Here!</Link>
    </>
  );
}
