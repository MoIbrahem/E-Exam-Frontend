import React from "react";
import moment from "moment";
import { toast } from "react-toastify";
import { getExam } from "../services/examService";
import auth from "../services/authService";
import Form from "./common/form";

class subjectExamForm extends Form {
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

      const { data: exam } = await getExam(id);
      this.setState({ exam, loading: false });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        this.setState({ errors });
        toast.info(ex.response.data[0]);
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
      const { data: exam } = await getExam(id);

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
    const { starts_at, ends_at, subject } = this.state.exam;
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <table className="Table-exam">
          <tbody>
            <tr>
              <td>Title: {subject["title"]}</td>
            </tr>
            <tr>
              <td>starts_at: {moment(starts_at).format("llll")}</td>
            </tr>
            <tr>
              <td>ends_at: {moment(ends_at).format("llll")}</td>
            </tr>
            <tr>
              <td>Hours:{subject["hours"]}</td>
            </tr>
            <tr>
              <td>{this.renderButton("Take Exam")}</td>
            </tr>
          </tbody>
        </table>
      </form>
    );
  }
}
// }

export default subjectExamForm;
