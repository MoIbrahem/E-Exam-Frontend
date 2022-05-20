import React from "react";
import { toast } from "react-toastify";
import { getExam } from "../services/examService";
import auth from "../services/authService";
import Form from "./common/form";
import { getExamQuestion } from "./../services/examService";
import { number } from "prop-types";

class ExamQuestionForm extends Form {
  state = {
    exam: {
      id: "",
      title: "",
      starts_at: "",
      ends_at: "",
      subject: { title: "", hours: "", id: "" },
    },
    response: {
      index: "",
      id: "",
      title: "",
      type: "",
      images: [],
      answer: [{ id: "", title: "" }],
    },
    submit: {
      exam__id: this.props.match.params.id,
      student_answer: [{ questions: number, answers: [] }],
    },
    loading: true,
    errors: {},
  };

  async componentDidMount() {
    try {
      const id = this.props.match.params.id;
      console.log(id);
      const { data: exam } = await getExam(id);
      const { data: response } = await getExamQuestion(id);
      
      
      console.log(exam.subject);
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

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   this.doSubmit();
  // };

  // doSubmit = async () => {
  //   try {
  //     const id = this.props.match.params.id;
  //     const response = await getExamQuestion(id);
  //     const { data: exam } = await getExam(id);

  //     console.log(response);
  //     // const { state } = this.props.location;

  //     // window.location = state
  //     //   ? state.from.pathname
  //     //   : `/exams/exam/${exam.id}/examquestions`;
  //   } catch (ex) {
  //     if (ex.response && ex.response.status === 400) {
  //       const errors = { ...this.state.errors };
  //       this.setState({ errors });
  //       toast.info(ex.response.data);
  //     }
  //   }
  // };

  handleChoice = (e) => {
    const { value, id } = e.target;
    // answers = value
    this.state.submit.student_answer[0].answers = [value];
    this.state.submit.student_answer[0].questions = id;
    this.setState({
      value,
    });
    console.log(this.state.submit.student_answer[0].answers);
    console.log(this.state.submit);
  };

  render() {
    const { response } = this.state;
    let index;
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    return (
      <div>
        <div>
          {response.map((examQuestion) => (
            index = response.findIndex(x => x.title ===examQuestion.title),
            console.log(index),
            <div key={examQuestion.id}>
              {examQuestion.title}
              <ul>
                {examQuestion.answer.map((answers) => (
                  <ul key={answers.id}>
                    <input
                      type="radio"
                      className="radio"
                      id={answers.id}
                      value={answers.id}
                      name={examQuestion.title}
                      onChange={this.handleChoice}
                      // onClick={this.checkOnlyOne(this.value)}
                    />
                    {answers.title}
                  </ul>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* <form onSubmit={this.handleSubmit}>
          {this.renderButton("Take Exam")}
        </form> */}
      </div>
    );
  }
}
// }

export default ExamQuestionForm;
