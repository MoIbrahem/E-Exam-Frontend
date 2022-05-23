import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { getExam, answerSubmit } from "../services/examService";
import auth from "../services/authService";
import Form from "./common/form";
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
  };

  async componentDidMount() {
    try {
      const id = this.props.match.params.id;
      console.log(id);
      const { data: exam } = await getExam(id);
      const { data: response } = await getExamQuestion(id);

      console.log(exam.subject);
      console.log(response);
      console.log(this.state.submit);
      this.setState({ response, exam, loading: false });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        this.setState({ errors });
        // toast.info(ex.response.data);
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
      const ansResponse = await answerSubmit(this.state.submit);
      this.state.submitted = true;
      console.log(ansResponse.data[0].ranking);
      console.log(ansResponse);
      console.log(this.state.submitted);
      this.setState({ ansResponseData: ansResponse });
      console.log(this.state.ansResponseData);
      // window.location = "/exam-result";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        alert(ex.response.data);
        this.setState({ errors });
      }
    }

    console.log(this.state.ansResponse);
  };

  handleChoice = (e) => {
    var qtype = e.target.type;

    // var qid = e.target.getAttribute('qid');
    var qindex = e.target.getAttribute("qindex");
    if (qtype === "radio") {
      var { value } = e.target;
      this.state.submit.student_answer[qindex].answers = [Number(value)];
      // console.log(qid);
      // console.log(qindex);
      // console.log(qtype);
    } else if (qtype === "checkbox") {
      var listArray = [];
      var checkBoxes = document.getElementsByName(e.target.name);
      console.log(checkBoxes);
      for (var checkBox of checkBoxes) {
        if (checkBox.checked === true) {
          listArray.push(Number(checkBox.value));
        } else {
          listArray = listArray.filter((e) => e !== this.value);
        }
      }
      console.log(listArray);
      this.state.submit.student_answer[qindex].answers = listArray;
    }
    console.log(this.state.submit);
  };

  render() {
    const { response, submit, loading, submitted } = this.state;

    if (loading) {
      return <div>loading...</div>;
    }

    if (submitted === false) {
      return (
        <form onSubmit={this.handleSubmit}>
          <div className="card">
          <div class="card-header"><h2>{this.state.exam.title} </h2></div>
            {response.map(
              (examQuestion) => (
                // eslint-disable-next-line
                submit.student_answer.push({
                  questions: examQuestion.id,
                  answers: [],
                }),
                (
                  <li className="card" key={response.indexOf(examQuestion)} type = "1">
                      {response.indexOf(examQuestion) + 1} : {examQuestion.title}
                      <ul>
                        {examQuestion.answer.map((answers) => (
                          
                          <li key={answers.id} type="A">
                            <div class="inputGroup">
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
                            <label for={answers.id} >{answers.title}</label>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </li>
                )
              )
            )}
          </div>
          <center>{this.renderButton("submit")}</center>
        </form>
      );
    } else {
      return <ExamResult ansResponseData={this.state.ansResponseData}/>;
    }
  }
}

// }

export default ExamQuestionForm;
