import React from "react";
//import {Link, Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import * as respassconfirmService from "../services/repassconfirmService";

class ResetpasswordconfirmForm extends Form {
  state = {
    data: {new_password:"", re_new_password:""},
    errors: {}
  };

  schema = {
    new_password: Joi.string()
      .required()
      .label("New Password")
      .min(6),
    re_new_password: Joi.string()
      .required()
      .label("Retype New Password")
      .min(6)
  };

  doSubmit = async () => {
    try {
        const uid = this.props.match.params.uid;
        const token = this.props.match.params.token;
      await respassconfirmService.reset_password_confirm(uid, token, this.state.data);

      // const { state } = this.props.location;
      // window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.new_password = ex.response.data.new_password;
        errors.re_new_password = ex.response.data.re_new_password;
        this.setState({ errors });
      }
    }
  };

  render() {
    

    return (
      <div>
        <h3>Reset Password</h3>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("new_password", "New Password","password")}
          {this.renderInput("re_new_password", "Retype New Password","password")}
          {this.renderButton("Reset")}
          
        </form>
      </div>
    );
  }
}

export default ResetpasswordconfirmForm;