import React, { Component } from "react";
import { getCurrentUser } from "./../services/authService";

class ExamResult extends Component {
  state = {
    ansResponseData: {},
  };

  // async componentDidMount(){
  //   const user = await getCurrentUser();
  //   this.setState({user});
  // }

  render() {
    const user = getCurrentUser();
    const { ansResponseData } = this.props;
    console.log(ansResponseData.data[0]);
    return (
      <div>
        <h2>{user.first_name + " " + user.last_name}
         </h2>
         <h5>This is your result for this exam!</h5>
        <table className="card">
          <tbody className="card-body">
            <tr>
              <th>
                <h3>{ansResponseData.data[0].exam["title"]}</h3>
              </th>
            </tr>
            <tr>
              <td>
                <h5>
                  <b>Subject:</b>{" "}
                  {ansResponseData.data[0].exam.subject["title"]}
                </h5>
              </td>
            </tr>
            <tr>
              <td>
                <div>Score: {ansResponseData.data[0].score}</div>
              </td>
            </tr>
            <tr>
              <td>
                <div>Degree: {ansResponseData.data[0].degree}</div>
              </td>
            </tr>
            <tr>
              <td>
                <div>Total : {ansResponseData.data[0].total}</div>
              </td>
            </tr>
            <tr>
              <td>
                <div>Ranking: {ansResponseData.data[0].ranking}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default ExamResult;
