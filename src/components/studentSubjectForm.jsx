import React, { Component } from "react";
import { getExamStatus } from "../services/examService";
import { Link } from "react-router-dom";

class StudentSubjectForm extends Component {
  state = {
    exams: { count: "", next: "", previous: "", results: "" },
    result: [],
    id: "",
    loading: true,
  };
  async componentDidMount() {
    const { data: exams } = await getExamStatus();
    this.setState({ exams, loading: false });
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
            <div key= {exam.id}>
              <Link to="/profile" key={exam.id}>
                {exam.title} {exam.starts_at}
              </Link>
            </div>
          ))}
        </div>
      );
    }
  }
}

export default StudentSubjectForm;
