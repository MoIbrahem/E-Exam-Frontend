import React, { Component } from "react";
import moment from "moment";
import auth from "../services/authService";
import Pagination from "./common/pagination";
import { getExamStatus } from "../services/examService";
import { paginate } from "../utils/paginate";
import { apiUrl } from "../config.json";

class StudentExamForm extends Component {
  state = {
    currentPage: 1,
    pageSize: 3,
    exams: {},
    loading: true,
    errors: {},
    ex: {},
    errorData: [],
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
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
    const result = this.state.exams;
    const { pageSize, currentPage } = this.state;
    const exams = paginate(result, currentPage, pageSize);


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
        <React.Fragment>
          <div className="row">
            {exams.map((exam) => (
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
          <Pagination 
            itemsCount={result.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </React.Fragment>
      );
    }
  }
}

export default StudentExamForm;
