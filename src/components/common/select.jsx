import React from "react";

const Select = ({ error, label, name, options, value, onChange }) => {
  // console.log({ value });
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        // {...rest}
        name={name}
        id={name}
        className="form-control custom-select"
        onChange={onChange}
        value={value}
      >
        <option value="" />
        {options.map((o) => (
          <option key={o._id} value={o._id}>
            {o.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>

    // <div className="form-group">
    //   <label htmlFor={name}>{label}</label>
    //   <input
    //     // value={value}
    //     // onChange={onChange}
    //     // type={type}
    //     {...rest}
    //     name={name}
    //     id={name}
    //     className="form-control"
    //   />
    //   {error && <div className="alert alert-danger">{error}</div>}
    // </div>
  );
};

export default Select;
