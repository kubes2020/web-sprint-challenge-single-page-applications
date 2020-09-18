import React from "react";

export default function Pizza() {
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
            // value={formData.name}
            // onChange={onChange}
          ></input>
        </label>
        {/* <button disabled={buttonDisabled}>Add To Order</button> */}
      </form>
    </>
  );
}
