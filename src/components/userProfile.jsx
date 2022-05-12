import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { getUser } from "../services/userService";

class UserProfile extends Component {
  state = {
    user: [],
  };

  async componentDidMount() {
    const user = await getUser();
    this.setState({user});
  }

  render() {
    return (
      <div>
        <h1>Profile</h1>
        <h2>User Information</h2>
        <table>
          <tbody>
            <tr>
              <td>Username: {`${this.state.user.username}`}</td>
            </tr>
            <tr>
              <td>First Name: {`${this.state.user.first_name}`}</td>
            </tr>
            <tr>
              <td>Last Name: {`${this.state.user.last_name}`}</td>
            </tr>
            <tr>
              <td>Email: {`${this.state.user.email}`}</td>
            </tr>
          </tbody>
        </table>
        
      </div>
    );
  }
}

export default UserProfile;
