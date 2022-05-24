import React, { Component } from "react";
import moment from "moment";
import auth from "../services/authService";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getExamStatus } from "../services/examService";
import { paginate } from "../utils/paginate";
import { apiUrl } from "../config.json";
import { getSubject } from "./../services/subjectService";

class StudentExamForm extends Component {
  state = {
    currentPage: 1,
    pageSize: 2,
    exams: {},
    loading: true,
    errors: {},
    ex: {},
    errorData: [],
    selectedSubject: null,
    subjects: [],
  };

  async componentDidMount() {
    try {
      const { data: exams } = await getExamStatus();
      const { data: subjects } = await getSubject();
      const allSubjects = [{ title: "All subjects" }, ...subjects];
      this.setState({ allSubjects, exams, loading: false });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        this.setState({ errors, errorData: ex.response.data[0] });
      } else if (ex.response && ex.response.status === 401) {
        auth.refreshJwt();
      }
    }
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSubjectSelect = (subject) => {
    this.setState({
      selectedSubject: subject,
      searchQuery: "",
      currentPage: 1,
    });
  };

  render() {
    const result = this.state.exams;
    const {
      pageSize,
      currentPage,
      exams: allExams,
      selectedSubject,
      allSubjects,
      loading,
      errorData,
    } = this.state;

    const filtered =
      selectedSubject && selectedSubject.id
        ? allExams.filter((s) => s.subject.id === selectedSubject.id)
        : allExams;
    const exams = paginate(filtered, currentPage, pageSize);

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

    if (loading) {
      if (errorData.length !== 0) {
        return <div>{errorData}</div>;
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
            <div className="col-2">
              <ListGroup
                items={allSubjects}
                selectedItem={selectedSubject}
                onItemSelect={this.handleSubjectSelect}
                textProperty="title"
                valueProperty="id"
              />
            </div>
            <div className="col">
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
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default StudentExamForm;
