import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import * as usercreateService from "../services/usercreateService";



class RegisterForm extends Form {
  state = {
    data: { username: "", password: "",email:"", first_name: "", last_name:"", profile_type:"" },
    profiles: [
                {title:"Student",id:"STD"},
                {title:"Professor",id:"PRF"}
              ],
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    first_name: Joi.string()
      .required()
      .label("First Name"),
    last_name: Joi.string()
      .required()
      .label("Last Name"),
    profile_type: Joi.string()
      .required()
      .label("Profile Type")
  };

  doSubmit = async () => {
    try {
      const response = await usercreateService.register(this.state.data);
      if (response){
        const user = this.state.data.username;
        const pass = this.state.data.password;
        await auth.login(user, pass);
        
        window.location = "/edit-student-information";

        
      }
      
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data.username;
        errors.email = ex.response.data.email;
        errors.password = ex.response.data.password;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("email","Email")}
          {this.renderInput("first_name", "First Name")}
          {this.renderInput("last_name", "Last Name")}
          {this.renderSelect("profile_type", "Profile Type",this.state.profiles)}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
