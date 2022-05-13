import React from "react";
//import { Link, Redirect } from "react-router-dom";
import auth from "../services/authService";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userEditService from "../services/userEditService";


class UserEditForm extends Form {
  state = {
    data: { email: "", first_name: "", last_name: "" },
    errors: {},
    user: auth.getCurrentUser(),
  };

  schema = {
    email: Joi.string().email().required().label("Email"),
    first_name: Joi.string().required().label("First Name"),
    last_name: Joi.string().required().label("Last Name"),
  };


  doSubmit = async () => {
    try {
      const { data } = this.state;
      await userEditService.edit(data);

      const { state } = this.props.location;
      
       window.location = state ? state.from.pathname : "/profile";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data.email;
        errors.first_name = ex.response.data.first_name;
        errors.last_name = ex.response.data.last_name;
        this.setState({ errors });
      }
    }
  };

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { email, first_name, last_name } = this.state.user;
    return (
      <div>
        <h1>User Information</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderControlledInput("email", "Email", email)}
          {this.renderControlledInput("first_name", "First Name", first_name)}
          {this.renderControlledInput("last_name", "Last Name", last_name)}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default UserEditForm;
