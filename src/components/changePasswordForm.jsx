import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../services/userService";
//import auth from "../services/authService";

class changePsswordForm extends Form {
  state = {
    data: { new_password: "", re_new_password: "", current_password: "" },
    errors: {}
  };

  schema = {
    new_password: Joi.string()
      .required()
      .min(8)
      .label("New Password"),
    re_new_password: Joi.string()
      .required()
      .min(8)
      .label("Re Password"),
    current_password: Joi.string()
      .required()
      .min(8)
      .label("Current Password"),
  };

  doSubmit = async () => {
    try {
      await userService.setpassword(this.state.data);
      window.location = "/profile";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.current_password = ex.response.data.current_password;
        errors.new_password = ex.response.data.new_password;
        errors.re_new_password = ex.response.data.re_new_password + ex.response.data.non_field_data ;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Change Password</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("new_password", "New password", "password")}
          {this.renderInput("re_new_password", "Retype new password", "password")}
          {this.renderInput("current_password", "Current password", "password")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default changePsswordForm;
