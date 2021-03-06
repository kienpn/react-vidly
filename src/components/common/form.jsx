import Joi from "joi-browser";
import React, { Component } from "react";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {},
    // cbbOptions: {
    //   genreId: [],
    // },
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    // console.log(errors);
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderInput(label, name, type = "text", placeholder = "") {
    const { data, errors } = this.state;

    return (
      <Input
        error={errors[name]}
        label={label}
        name={name}
        onChange={this.handleChange}
        placeholder={placeholder}
        type={type}
        value={data[name]}
      />
    );
  }

  renderSelect(label, name, options) {
    const { data, errors } = this.state;

    return (
      <Select
        error={errors[name]}
        label={label}
        name={name}
        options={options}
        onChange={this.handleChange}
        value={data[name]}
      />
    );
  }
}

export default Form;
