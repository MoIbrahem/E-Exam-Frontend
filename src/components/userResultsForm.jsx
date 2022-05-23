import React, { Component } from "react";
import { getUserResult, getUser } from "../services/userService";
import auth from "../services/authService";

class UserResultForm extends Component {
  state = {
    result: [],
    student: {},
    loading: true,
    errors: {},
  };

  async componentDidMount() {
    try {
      const { data: result } = await getUserResult();
      const { data: student } = await getUser();
      this.setState({ result, student });
    } catch (ex) {
      if (ex.response && ex.response.status === 401) {
        auth.refreshJwt();
      }
    }
  }

  render() {
    if (this.state.result.length === 0) {
      return (
        <div>
          <h1>Results</h1>
          <h2>
            {this.state.student.first_name} {this.state.student.last_name}
          </h2>
          <div>You have no results yet!</div>
        </div>
      );
    }
    return (
      <div>
        <h1>Results</h1>
        <h2>
          {this.state.student.first_name} {this.state.student.last_name}
        </h2>
        <div className="row">
          {this.state.result.map((studentResults) => (
            <div className="col-sm-4" key={studentResults.exam.id}>
              <table className="card enabled_hover">
                <tbody className="card-body">
                  <tr>
                    <th>
                      <h3>{studentResults.exam["title"]}</h3>
                    </th>
                  </tr>
                  <tr>
                    <td>
                      <h5>
                        <b>Subject:</b> {studentResults.exam.subject["title"]}
                      </h5>
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
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default UserResultForm;
