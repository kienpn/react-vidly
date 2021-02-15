import React, { Component } from "react";

const Input = ({ label, name, onChange, value }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        name={name}
        id={name}
        type="text"
        className="form-control"
      />
    </div>
  );
};

export default Input;
