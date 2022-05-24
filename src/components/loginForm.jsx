import React from "react";
import { Link, Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import auth, { getCurrentUser } from "../services/authService";
import { apiUrl } from "../config.json";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);

      const user = await getCurrentUser();
      if (user.profile_type === "PRF") {
        if (user.is_staff) {
          auth.logout();
          window.location = apiUrl + "/admin/";
        } else {
          window.location = "/wait-For-Approval";
        }
      } else {
        const { state } = this.props.location;
        window.location = state ? state.from.pathname : "/";
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 401) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data.detail;
        errors.password = ex.response.data["detail"];
        this.setState({ errors });
      }
    }
  };

  render() {
    if (getCurrentUser()) {
      const user = getCurrentUser();
      if (user.profile_type === "PRF") {
        if (user.is_staff) {
          window.location = apiUrl + "/admin/";
        } else {
          window.location = "/wait-For-Approval";
        }
      } else {
        return <Redirect to="/" />;
      }
    }

    // if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
          <p className="mt-3">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
          <p className="mt-3">
            Forgot your Password?{" "}
            <Link to="/reset-password">Reset Password</Link>
          </p>
        </form>
      </div>
    );
  }
}

export default LoginForm;
