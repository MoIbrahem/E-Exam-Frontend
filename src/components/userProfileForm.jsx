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
      <div className="card">
         <div className="card-header ">
         <h1>Profile</h1>
            </div>
        <div className="card Detail-card">
        <div className="card-header">
        <h4>User Information</h4>
            </div>
            <div className="row extra-padding">   
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
        </div>

        
        <div className="card less-margin">
          
            <Link
            className=" extra-padding btn btn-primary"
            to="/change-password">
            Change Password
            </Link>
          </div>

          
          
          
            <Link
            className=" extra-padding btn btn-primary"
             to="/edit-user"
            >
              Update user information
            </Link>
          </div>
        
          
          <div className="card Detail-card" >   
          <div className="card-header ">
          <h4>Student Information</h4>
            </div>
            <div className="row extra-padding">   
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
                <div className="card less-margin">
                <Link
                className=" extra-padding btn btn-primary"
                  to="/edit-student-information">
                    Update student information
                </Link>
                </div>
                <Link
                className="extra-padding btn btn-primary"
                  to="/profile/results">
                    Show Exam Result
                </Link>
        
      </div>
      </div>

    );
  }
}

export default UserProfile;
