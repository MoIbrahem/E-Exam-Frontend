import React from "react";
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
      student_answer: []
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
      console.log(this.state.submit);
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
    var qtype = e.target.type;


    var { value} = e.target;
    var qid = e.target.getAttribute('qid');
    var qindex = e.target.getAttribute('qindex');
    this.state.submit.student_answer[qindex].answers = [value];
    console.log(qid);
    console.log(qindex);
    console.log(qtype);
    
    console.log(this.state.submit);
  };

  render() {
    const { response } = this.state;

    
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    return (
      <div>
        <div>
          {response.map((examQuestion) => (
            // eslint-disable-next-line
            this.state.submit.student_answer.push({questions: examQuestion.id, answers: []}),
            <div key={response.indexOf(examQuestion)}>
              {examQuestion.title}
              
              <ul>
                {examQuestion.answer.map((answers) => (
                  <ul key={answers.id}>
                    <input
                      type= {examQuestion.type["inputType"]}
                      className={examQuestion.type["inputType"]}
                      id={answers.id}
                      value={answers.id}
                      name={examQuestion.title}
                      qindex={response.indexOf(examQuestion)}
                      qid ={examQuestion.id}
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
