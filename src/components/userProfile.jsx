import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getUser, getStusent } from "../services/userService";

class UserProfile extends Component {
  state = {
    user: {},
    student:{level:"", department:""},

  };

  async componentDidMount() {
    const {data : user } = await getUser();
    const {data : student } = await getStusent();
    console.log(user, student);
    console.log(student.department["title"]);
    this.setState({user , student});
  }

  render() {
    return (
      <div>
        <h1>Profile</h1>
        <h4>User Information</h4>
        <table>
          <tbody>
            <tr>
              <td>Username: {`${this.state.user.username}`}</td>
            </tr>
            <tr>
              <td>Full Name: {`${this.state.user.first_name +" "+ this.state.user.last_name }`}</td>
            </tr>
            <tr>
              <td>Email: {`${this.state.user.email}`}</td>
            </tr>
          </tbody>
        </table>
          <p className="mt-3">
            <Link to="/change-password">Change Password</Link>
          </p>
          <p className="mt-3">
            <Link to="/edit-user">Update user information</Link>
          </p>
        <h4>Student Information</h4>
        <table>
          <tbody>
            <tr>
              <td>Phone: {`${this.state.student.phone}`}</td>
            </tr>
            <tr>
              <td>Birth date: {`${this.state.student.birth_date}`}</td>
            </tr>
            <tr>
              <td>Level: {`${this.state.student.level["title"]}`}</td>
            </tr>
            <tr>
              <td>Department: {`${this.state.student.department["title"]}`}</td>
            </tr>
            <tr>
              <td>Score: {`${this.state.student.score}`}</td>
            </tr>
            <tr>
              <td>Overall Rank: {`${this.state.student.overall_level_rank}`}</td>
            </tr>
          </tbody>
        </table>
        
      </div>
    );
  }
}

export default UserProfile;
