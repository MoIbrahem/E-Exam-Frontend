import React, { Component } from "react";
import moment from "moment";
import { getExamStatus } from "../services/examService";
import auth from "../services/authService";
import { apiUrl } from "../config.json";

class StudentExamForm extends Component {
  state = {
    exams: {},
    loading: true,
    errors: {},
    ex: {},
    errorData: [],
  };
  async componentDidMount() {
    try {
      const { data: exams } = await getExamStatus();
      this.setState({ exams, loading: false });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        this.setState({ errors, errorData: ex.response.data[0] });
      } else if (ex.response && ex.response.status === 401) {
        auth.refreshJwt();
      }
    }
  }
  render() {
    if (auth.getCurrentUser()) {
      const user = auth.getCurrentUser();
      if (user.profile_type === "PRF") {
        if (user.is_staff) {
          window.location = apiUrl + "/admin/";
        } else {
          window.location = "/wait-For-Approval";
        }
      }
    }

    const result = this.state.exams;

    if (this.state.loading) {
      if (this.state.errorData.length !== 0) {
        return <div>{this.state.errorData}</div>;
      } else {
        return <div>loading...</div>;
      }
    }

    if (result.length === 0) {
      return <div>You have no exams</div>;
    }

    if (result) {
      return (
        <div className="row">
          {result.map((exam) => (
            <div className="col-sm-4" key={exam.id}>
              <div className="card enabled_hover">
                <div
                  onClick={() => {
                    this.props.history.push(`/exams/exam/${exam.id}`);
                  }}
                  className="card-body"
                  style={{ cursor: "pointer" }}
                >
                  <h2 className="card-title">{exam.title}</h2>
                  <b>Subject: </b>
                  {exam.subject["title"]}
                  <br />
                  <b>Starts at: </b>
                  {moment(exam.starts_at).format("llll")}
                  <br />
                  <b>Ends at: </b>
                  {moment(exam.ends_at).format("llll")}
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  }
}

export default StudentExamForm;
