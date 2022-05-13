import React, { Component } from "react";
import { Link } from "react-router-dom";

class UserProfile extends Component {
  state = {};
  render() {
    const {
      username,
      first_name,
      last_name,
      email,
      phone,
      birth_date,
      level,
      department,
      score,
      overall_level_rank,
    } = this.props;
    return (
      <div>
        <h1>Profile</h1>
        <h4>User Information</h4>
        <table>
          <tbody>
            <tr>
              <td>Username: {`${username}`}</td>
            </tr>
            <tr>
              <td>Full Name: {`${first_name + " " + last_name}`}</td>
            </tr>
            <tr>
              <td>Email: {`${email}`}</td>
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
              <td>Phone: {`${phone}`}</td>
            </tr>
            <tr>
              <td>Birth date: {`${birth_date}`}</td>
            </tr>
            <tr>
              <td>Level: {`${level["title"]}`}</td>
            </tr>
            <tr>
              <td>Department: {`${department["title"]}`}</td>
            </tr>
            <tr>
              <td>Score: {`${score}`}</td>
            </tr>
            <tr>
              <td>Overall Rank: {`${overall_level_rank}`}</td>
              <div style={{ margin: "right" }}>
                <Link
                  to="/edit-student-information"
                  className="btn btn-primary"
                >
                  Edit
                </Link>
              </div>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default UserProfile;
