import React, { Component } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import { getExamStatus } from "../services/examService";
import { Link } from "react-router-dom";
import auth from "../services/authService";

class StudentSubjectForm extends Component {
  state = {
    exams: { count: "", next: "", previous: "", results: [] },
    loading: true,
    errors: {},
  };
  async componentDidMount() {
    try {
      const { data: exams } = await getExamStatus();
      this.setState({ exams, loading: false });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        this.setState({ errors });
        toast.info(ex.response.data[0]);
        // console.log(ex.response.data[0]);
        // this.render(ex.response.data);
      } else if (ex.response.status === 401) {
        auth.refreshJwt();
      }
    }
  }
  render() {
    const result = this.state.exams.results;
    console.log(result);

    if (this.state.loading) {
      return <div>loading...</div>;
    }

    if (result.length === 0) {
      return <div>You have no exams</div>;
    }

    if (result) {
      return (
        <div>
          {result.map((exam) => (
            <div key={exam.id}>
              <Link to="/profile" key={exam.id}>
                {exam.title} {moment(Date(exam.starts_at)).format("llll")}{" "}
                {exam.subject["title"]}
              </Link>
            </div>
          ))}
        </div>
      );
    }
  }
}

export default StudentSubjectForm;
