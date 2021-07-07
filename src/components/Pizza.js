import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

export default function Pizza() {
  //state for order form
  const [formData, setFormData] = useState({
    name: "",
    size: "",
    olives: "",
    sausage: "",
    peppers: "",
    chicken: "",
    specialInstructions: "",
  });

  //state for errors
  const [errors, setErrors] = useState({
    name: "",
    size: "",
    olives: "",
    sausage: "",
    peppers: "",
    chicken: "",
    specialInstructions: "",
  });

  //state for submit button
  const [disabled, setDisabled] = useState(true);

  const [post, setPost] = useState([]);

  const onChange = (e) => {
    e.persist();
    console.log(e.target.value);
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
    size: yup.string().oneOf(["12 inch", "24 inch"], "Size is required"),

    olives: yup.string().notRequired("choose something"),
    sausage: yup.string().notRequired("choose something"),
    peppers: yup.string().notRequired("choose something"),
    chicken: yup.string().notRequired("choose something"),

    specialInstructions: yup.string().notRequired(),
  });

  const validateChange = (name, value) => {
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

  useEffect(() => {
    formSchema.isValid(formData).then((valid) => {
      setDisabled(!valid);
    });
  }, [formData]);

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post("https://reqres.in/api/users", formData)
      .then((res) => {
        setPost(res.data); // get just the form data from the REST api
        console.log("success", post);
        // reset form if successful
        setFormData({
          name: "",
          size: "",
          olives: "",
          sausage: "",
          peppers: "",
          chicken: "",
          specialInstructions: "",
        });
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <>
      <h2>Pizza Order Form</h2>
      <form onSubmit={submitForm}>
        <label htmlFor="name">
          Name:
          <input
            name="name"
            type="text"
            id="name"
            value={formData.name}
            onChange={onChange}
          ></input>
          {errors.name.length > 0 ? <p>{errors.name}</p> : null}
        </label>
        <label htmlFor="size">
          Pizza Size
          <select name="size" id="size" onChange={onChange}>
            <option value="">Choose One</option>
            <option value="12 inch">12 inch</option>
            <option value="24 inch">24 inch</option>
          </select>
          {errors.size.length > 0 ? <p>{errors.size}</p> : null}
        </label>
        <h2>Toppings</h2>
        <label htmlFor="olives">
          Olives
          <input
            name="olives"
            id="olives"
            type="checkbox"
            value={formData.olives}
            onChange={onChange}
          ></input>
        </label>
        <label htmlFor="sausage">
          Sausage
          <input
            name="sausage"
            id="sausage"
            type="checkbox"
            value={formData.sausage}
            onChange={onChange}
          ></input>
        </label>
        <label htmlFor="peppers">
          Green Peppers
          <input
            name="peppers"
            id="peppers"
            type="checkbox"
            value={formData.peppers}
            onChange={onChange}
          ></input>
        </label>
        <label htmlFor="chicken">
          Chicken
          <input
            name="chicken"
            id="chicken"
            type="checkbox"
            value={formData.chicken}
            onChange={onChange}
          ></input>
        </label>
        <label htmlFor="specialInstructions">
          Special Instructions
          <textarea
            name="specialInstructions"
            id="specialInstructions"
            type="textarea"
            value={formData.specialInstructions}
            onChange={onChange}
          ></textarea>
        </label>
        <button disabled={disabled}>Add To Order</button>
      </form>
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </>
  );
}
