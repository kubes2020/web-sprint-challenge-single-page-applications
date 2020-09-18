import React, { useState, useEffect } from "react";

export default function Pizza() {
  const [formData, setFormData] = useState({
    name: "",
  });

  const onChange = (e) => {
    e.persist();
    //destructure event key/values
    const { name, value, type, checked } = e.target;
    const newFormData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };
    // validateChange(e)
    setFormData(newFormData);
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
