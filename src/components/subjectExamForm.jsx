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
    const { title, starts_at, ends_at, subject } = this.state.exam;
    if (this.state.loading) {
      return <div>loading...</div>;
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
          <div class="card-header"><h2>{title} </h2></div>
        <div class="card-body-exam">
        <div><h4> Starts_at: {moment(starts_at).format("llll")}</h4></div>
        <div><h4> Ends_at: {moment(ends_at).format("llll")}</h4></div>
        <div><h4>Title: {subject["title"]} </h4></div>
        <div><h4>Hours: {subject["hours"]}</h4></div>        
        <form onSubmit={this.handleSubmit}>
          {this.renderButton("Take Exam")}
        </form>
        </div>
      </div>
      
    );
  }
}

export default subjectExamForm;
