import React, { useState, useEffect } from "react";
import * as yup from "yup";

export default function Pizza() {
  //state for order form
  const [formData, setFormData] = useState({
    name: "",
  });

  //state for errors
  const [errors, setErrors] = useState([]);

  //state for submit button
  const [disabled, setDisabled] = useState(true);

  const onChange = (e) => {
    e.persist();
    //destructure event key/values
    const { name, value, type, checked } = e.target;
    const newFormData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };
    validateChange(name, value);
    setFormData(newFormData);
  };

  const formSchema = yup.object().shape({
    name: yup
      .string()
      .min(2, "must have at least 2 characters")
      .required("name is required"),
  });

  const validateChange = ({ name, value }) => {
    yup
      .reach(formSchema, name)
      .validate(value)
      .then((valid) => {
        setErrors({ ...errors, [name]: "" });
      })
      .catch((err) => {
        setErrors({ ...errors, [name]: err.errors[0] });
      });
  };

  return (
    <>
      <h2>Pizza Order Form</h2>
      <form>
        <label htmlFor="name">
          Name:
          <input
            name="name"
            type="text"
            id="name"
            value={formData.name}
            onChange={onChange}
          ></input>
        </label>
        <button>Add To Order</button>
      </form>
    </>
  );
}
