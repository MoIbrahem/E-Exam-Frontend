import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getUser, getStudent } from "../services/userService";
import auth from "../services/authService";

class UserProfile extends Component {
  state = {
    user: {},
    student:{level:"", department:""},

  };

  async componentDidMount() {
    try {
      const {data : user } = await getUser();
      const {data : student } = await getStudent();
      console.log(user, student);
      console.log(student.department["title"]);
      this.setState({user , student});
    } catch (ex) {
        if(ex.response && ex.response.status === 401){
          auth.refreshJwt();
        }
    }
    
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
            <Link to="/change-password"
            className="btn btn-primary"
            >Change Password</Link>
            
          </p>
          <p className="mt-3">
            <Link to="/edit-user"
            className="btn btn-primary"
            >Update user information</Link>
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
        <p className="mt-3">
                <Link
                  to="/edit-student-information"
                  className="btn btn-primary"
                >
                  Update student information
                </Link>
        </p>
      </div>
    );
  }
}

export default UserProfile;
