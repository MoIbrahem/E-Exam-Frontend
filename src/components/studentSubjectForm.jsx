import React, { Component } from "react";
import { getExamStatus } from "../services/examService";
import { Link } from "react-router-dom";
import auth from "../services/authService";

class StudentSubjectForm extends Component {
  state = {
    exams: { count: "", next: "", previous: "", results: [] },
    result: [],
    id: "",
    loading: true,
    erros:{}
  };
  async componentDidMount() {
    try {
      const { data: exams } = await getExamStatus();
      this.setState({ exams, loading: false });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        this.setState({ errors });
      }
      else if(ex.response.status === 401){
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
            <div key= {exam.id}>
              <Link to="/profile" key={exam.id}>
                {exam.title} {Date(exam.starts_at)}
              </Link>
            </div>
          ))}
        </div>
      );
    }
  }
}

export default StudentSubjectForm;
