import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userEditService from "../services/userEditService";
import auth from "../services/authService";
import {
  getStudent,
  getStudentDep,
  getStudentLevel,
} from "../services/userService";

class ChangeStudentInformationForm extends Form {
  state = {
    data: { phone: "", birth_date: "", level: "", department: "" },
    errors: [],
    level: [],
    department:[],
    student: {data:{}}
  };

  schema = {
    phone: Joi.number().required().label("Phone"),
    birth_date: Joi.string().required().label("Birthdate"),
    level: Joi.string().required().label("Level"),
    department: Joi.string().required().label("Department"),
  };

  

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await userEditService.editStudent(data);
      window.location = "/profile";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.phone = ex.response.data.phone;
        errors.birthdate = ex.response.data.birthdate;
        errors.level = ex.response.data.level;
        errors.department = ex.response.data.department;
        this.setState({ errors });
      }
    }
  };

  async componentDidMount() {
    try {
      const student = await getStudent();
      const { data: level } = await getStudentLevel();
      const { data: department } = await getStudentDep();
      this.setState({ student, level, department });
      
    } catch (ex) {
      if(ex.response.status === 401){
        auth.refreshJwt();
      }
    }
    
  }

  render() {
    const date = this.state.student.data.birth_date

    return (
      <div>
        <h1>Student Information</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderControlledInput("phone", "Phone Number",this.state.student.data.phone)}
          {this.renderControlledInput("birth_date", "Birthdate",date,"date")}
          {this.renderSelect("level", "Level", this.state.level)}
          {this.renderSelect("department", "Department", this.state.department)}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default ChangeStudentInformationForm;
