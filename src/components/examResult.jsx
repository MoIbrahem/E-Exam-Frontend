import React, { Component } from "react";

class ExamResult extends Component {
  state = {
    ansResponse: [{ data: [] }],
  };

    componentDidMount() {
    //   if (ex.response && ex.response.status === 401) {
    //     auth.refreshJwt();
    //   }

    }

  render() {
    const { ansResponse } = this.props;
    console.log(ansResponse);
    return (
      <div>
      {ansResponse}

        {/* <h1>Results</h1>
        <h4>{this.state.student.first_name} {this.state.student.last_name}</h4>
        {this.state.result.map((studentResults) => (
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
        ))} */}
      </div>
    );
  }
}

export default ExamResult;
