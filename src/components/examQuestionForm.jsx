import React from "react";
import moment from "moment";
import { toast } from "react-toastify";
import { getExam } from "../services/examService";
import auth from "../services/authService";
import Form from "./common/form";
import { getExamQuestion } from "./../services/examService";

class ExamQuestionForm extends Form {
  state = {
    exam: {
      id: "",
      title: "",
      starts_at: "",
      ends_at: "",
      subject: { title: "", hours: "", id: "" },
    },
    loading: true,
    errors: {},
  };

  async componentDidMount() {
    try {
      const id = this.props.match.params.id;
      console.log(id);
      const { data: exam } = await getExam(id);
      const response = await getExamQuestion(id);
      console.log(response);
      this.setState({ response, exam, loading: false });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        this.setState({ errors });
        toast.info(ex.response.data);
      } else if (ex.response && ex.response.status === 401) {
        auth.refreshJwt();
      }
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.doSubmit();
  };

  doSubmit = async () => {
    try {
      const id = this.props.match.params.id;
      const response = await getExamQuestion(id);
      const { data: exam } = await getExam(id);

      console.log(response);
      const { state } = this.props.location;

      window.location = state
        ? state.from.pathname
        : `/exams/exam/${exam.id}/examquestions`;
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        this.setState({ errors });
        toast.info(ex.response.data);
      }
    }
  };

  render() {
    const { title, starts_at, ends_at, subject } = this.state.exam;
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    return (
      <div>
        <div>{title}</div>
        <div>{moment(starts_at).format("llll")}</div>{" "}
        <div>{moment(ends_at).format("llll")}</div>
        <div>{subject["title"]}</div>
        <div>{subject["hours"]}</div>
        <form onSubmit={this.handleSubmit}>
          {this.renderButton("Take Exam")}
        </form>
      </div>
    );
  }
}
// }

export default ExamQuestionForm;
