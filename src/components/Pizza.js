import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

export default function Pizza() {
  //state for order form
  const [formData, setFormData] = useState({
    name: "",
  });

  //state for errors
  const [errors, setErrors] = useState({
    name: "",
  });

  //state for submit button
  const [disabled, setDisabled] = useState(true);

  const [post, setPost] = useState([]);

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
        <button disabled={disabled}>Add To Order</button>
      </form>
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </>
  );
}
