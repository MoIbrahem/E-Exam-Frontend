import React from "react";
import { toast } from "react-toastify";
import { getExam, answerSubmit } from "../services/examService";
import auth from "../services/authService";
import Form from "./common/form";
import { apiUrl } from "../config.json";
import { getExamQuestion } from "./../services/examService";
import ExamResult from "./examResult";

class ExamQuestionForm extends Form {
  state = {
    submit: {
      exam__id: this.props.match.params.id,
      student_answer: [],
    },
    loading: true,
    submitted: false,
    errors: {},
    ansResponseData: {},
    errorData: [],
  };

  async componentDidMount() {
    try {
      const id = this.props.match.params.id;
      const { data: exam } = await getExam(id);
      const { data: response } = await getExamQuestion(id);
      this.setState({ response, exam, loading: false });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        this.setState({
          errors,
          errorData: [ex.response.data.exam__id, ex.response.data],
        });
      } else if (ex.response && ex.response.status === 401) {
        auth.refreshJwt();
      }
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.doSubmit();
  };
////////////////////////////////////////////////////////////
  autoSubmit = ()=>{
    const currentTimeInSec = Math.floor(Date.now()/1000);
    const durationInSec   = this.state.exam.endTimeStamp -currentTimeInSec - 60;
    if (durationInSec > 1){
      console.log(currentTimeInSec,durationInSec);
      setTimeout(() => {
        this.doSubmit();
      },durationInSec*1000);
    }
  }

  ///////////////////////////////////////////////////////////////

  autoSubmit = () => {
    const currentTimeInSec = Math.floor(Date.now() / 1000);
    const durationInSec = this.state.exam.endTimeStamp - currentTimeInSec - 60;
    if (durationInSec > 1) {
      setTimeout(() => {
        this.doSubmit();
      }, durationInSec * 1000);
    }
  };

  doSubmit = async () => {
    try {
      const ansResponse = await answerSubmit(this.state.submit);
      this.state.submitted = true;
      this.setState({ ansResponseData: ansResponse });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        this.setState({ errors, errorData: ex.response.data.exam__id });
        toast.info(this.state.errorData[0]);
      }
    }
  };

  handleChoice = (e) => {
    var qtype = e.target.type;

    var qindex = e.target.getAttribute("qindex");
    if (qtype === "radio") {
      var { value } = e.target;
      this.state.submit.student_answer[qindex].answers = [Number(value)];
    } else if (qtype === "checkbox") {
      var listArray = [];
      var checkBoxes = document.getElementsByName(e.target.name);
      for (var checkBox of checkBoxes) {
        if (checkBox.checked === true) {
          listArray.push(Number(checkBox.value));
        } else {
          listArray = listArray.filter((e) => e !== this.value);
        }
      }
      this.state.submit.student_answer[qindex].answers = listArray;
    }
  };

  render() {
    const { response, submit, loading, submitted, errorData } = this.state;

    if (loading) {
      if (errorData.length !== 0) {
        return errorData[0] ? (
          <div> {errorData[0]}</div>
        ) : (
          <div> {errorData}</div>
        );
      } else {
        return <div>loading...</div>;
      }
    }

    if (submitted === false) {
      return (
        <form onSubmit={this.handleSubmit}>
          <div className="card">
            <div className="card-header">
              <h2>{this.state.exam.title} </h2>
              {this.autoSubmit()}
            </div>
            {response.map(
              (examQuestion) => (
                submit.student_answer.push({
                  questions: examQuestion.id,
                  answers: [],
                }),
                (
                  <div
                    className="card card-exam"
                    key={response.indexOf(examQuestion)}
                  >
                    <div className="card-header">
                      <h6>
                        {response.indexOf(examQuestion) + 1} :{" "}
                        {examQuestion.title}
                      </h6>
                    </div>
                    <div className="row extra-padding">
                      <div className="column">
                        <div className="row">
                          <ul>
                            {examQuestion.answer.map((answers) => (
                              <li key={answers.id} type="A">
                                <div className="inputGroup">
                                  <input
                                    type={examQuestion.type["inputType"]}
                                    className={examQuestion.type["inputType"]}
                                    id={answers.id}
                                    value={answers.id}
                                    name={response.indexOf(examQuestion)}
                                    qindex={response.indexOf(examQuestion)}
                                    qid={examQuestion.id}
                                    onChange={this.handleChoice}
                                    onClick={this.handleChoice}
                                  />
                                  {answers.title}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="column-image">
                          {examQuestion.images
                            ? examQuestion.images.map((image) => (
                                <img
                                  key={image.id}
                                  alt=""
                                  src={apiUrl + image.image}
                                  width={400}
                                />
                              ))
                            : null}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )
            )}
          </div>
          <center>{this.renderButton("submit")}</center>
        </form>
      );
    } else {
      return <ExamResult ansResponseData={this.state.ansResponseData} />;
    }
  }
}

export default ExamQuestionForm;
