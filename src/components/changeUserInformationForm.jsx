import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import {
  getStudent,
  getStudentDep,
  getStudentLevel,
} from "../services/userService";

class ChangeStudentInformationForm extends Form {
  state = {
    data: { phone: "", birthdate: "", level: "", department: "" },
    errors: [],
    level: { id: "", title:"" },
    department: [],
  };

  schema = {
    phone: Joi.number().required().label("Phone"),
    birthdate: Joi.string().required().label("Birthdate"),
    level: Joi.string().required().label("Level"),
    department: Joi.string().required().label("Department"),
  };

  doSubmit = async () => {
    try {
      const { state } = this.props.location;
      window.location = "/edit-student-information";
      //   window.location = state ? state.from.pathname : "/";
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
    const { data: student } = await getStudent();
    const { data: levels } = await getStudentLevel();
    const { data: departments } = await getStudentDep();
    this.setState({ student, levels, departments });
    console.log(levels);
  }

  render() {
    const { name: id, value: title } = this.state.level;
    const { department } = this.state;
    return (
      <div>
        <h1>Student Information</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderControlledInput("phone", "Phone Number")}
          {this.renderControlledInput("birthdate", "Birthdate")}
          {this.renderSelect("level", "Level", [id, title])}
          {/* {this.renderSelect("department", "Department", department["title"])} */}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default ChangeStudentInformationForm;
