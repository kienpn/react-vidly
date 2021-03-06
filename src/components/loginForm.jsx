import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as authService from "../services/authService";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    password: Joi.string().min(5).required().label("Password"),
    email: Joi.string().email().required().label("Email"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const { data: jwt } = await authService.login(data.email, data.password);
      localStorage.setItem("token", jwt);
      this.props.history.push("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("Email user1@domain.com", "email", "email")}
          {this.renderInput("Password 123456", "password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
