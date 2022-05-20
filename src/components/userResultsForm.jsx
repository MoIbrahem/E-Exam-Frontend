import React, { Component } from "react";
import { getUserResult, getUser } from "../services/userService";
import auth from "../services/authService";

class UserResultForm extends Component {
  state = {
    result: { count: "", next: "", previous: "", results: [] }, 
    student: {},
    loading: true,
    errors: {},
  };

  async componentDidMount() {
    try {
      const { data: result } = await getUserResult();
      const { data: student } = await getUser();

      console.log(result.results);
      this.setState({ result , student});
    } catch (ex) {
      if (ex.response && ex.response.status === 401) {
        auth.refreshJwt();
      }
    }
  }

  render() {
    return (
      <div>
        <h1>Results</h1>
        <h4>{this.state.student.first_name} {this.state.student.last_name}</h4>
        {this.state.result.results.map((studentResults) => (
          <table key={studentResults.exam.id}>
            <tbody>
              <tr>
                <th>
                {studentResults.exam["title"]}
                </th>
              </tr>
              <tr>
                <td>
                Subject: {studentResults.exam.subject["title"]}
                </td>
              </tr>
              <tr>
                <td>
                  <div>Score: {studentResults.score}</div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>Degree: {studentResults.degree}</div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>Total : {studentResults.total}</div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>Ranking: {studentResults.ranking}</div>
                </td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>
    );
  }
}

export default UserResultForm;
