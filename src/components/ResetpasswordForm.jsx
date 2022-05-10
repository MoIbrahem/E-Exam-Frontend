import React from "react";
import {Link, Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import * as resetpasswordService from "../services/resetpasswordService";

class ResetpasswordForm extends Form {
  state = {
    data: {email:""},
    errors: {}
  };

  schema = {
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
  };

  doSubmit = async () => {
    try {
      
      await resetpasswordService.reset_password(this.state.data);

      // const { state } = this.props.location;
      // window.location = state ? state.from.pathname : "/";
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
        <h3>Reset Password</h3>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderButton("Send")}
          
        </form>
      </div>
    );
  }
}

export default ResetpasswordForm;