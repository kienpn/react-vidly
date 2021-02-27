import React from "react";

const Input = ({ error, label, name, placeholder, ...rest }) => {
  return (
    <div className="form-group">
      {/* {!showPlaceholder && <label htmlFor={name}>{label}</label>} */}
      <label htmlFor={name}>{label !== "" && label}</label>
      <input
        // value={value}
        // onChange={onChange}
        // type={type}
        {...rest}
        name={name}
        id={name}
        className="form-control"
        placeholder={placeholder !== "" && placeholder}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
