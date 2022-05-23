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
    errorData: [],
  };

  async componentDidMount() {
    try {
      const id = this.props.match.params.id;

      const { data: exam } = await getExam(id);
      this.setState({ exam, loading: false });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        this.setState({
          errors,
          errorData: [ex.response.data.exam__id, ex.response.data],
        });
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
    const { errorData, loading } = this.state;
    if (loading) {
      if (errorData.length !== 0) {
        return errorData[0]? <div> {errorData[0]}</div>: <div> {errorData}</div>
      } else {
        return <div>loading...</div>;
      }
    }


    return (
      // <form onSubmit={this.handleSubmit}>
      // <table className="table-card" >
      //     <tbody>
      //     <tr>
      //         <td> <h4> Title: {subject["title"]} </h4></td>
      //       </tr>
      //       <tr>
      //         <td> <h4> Starts_at: {moment(starts_at).format("llll")} </h4></td>
      //       </tr>
      //       <tr>
      //         <td> <h4> Ends_at: {moment(ends_at).format("llll")} </h4> </td>
      //       </tr>
      //       <tr>
      //         <td><h4> Hours: {subject["hours"]} </h4></td>
      //       </tr>
      //       <tr>
      //         <td><h2> {this.renderButton("Take Exam")} </h2></td>
      //       </tr>
      //     </tbody>
      //   </table>
      //   </form>
      <div className="card text-center">
        <div className="card-header">
          <h2>{this.state.exam.title} </h2>
        </div>
        <div className="card-body-exam">
          <div>
            <h4> Starts_at: {moment(starts_at).format("llll")}</h4>
          </div>
          <div>
            <h4> Ends_at: {moment(ends_at).format("llll")}</h4>
          </div>
          <div>
            <h4>Title: {subject["title"]} </h4>
          </div>
          <div>
            <h4>Hours: {subject["hours"]}</h4>
          </div>
          <form onSubmit={this.handleSubmit}>
            {this.renderButton("Take Exam")}
          </form>
        </div>
      </div>
    );
  }
}

export default subjectExamForm;
