import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./components/movies";
import MovieForm from "./components/movieForm";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import waitForApproval from "./components/waitForApproval";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import changePasswordForm from "./components/changePasswordForm";
import UserEditForm from "./components/userEditForm";
import ResetpasswordForm from "./components/ResetpasswordForm";
import ResetpasswordconfirmForm from "./components/ResetpasswordconfirmForm";
import UserProfileForm from "./components/userProfileForm";
import StudentExamForm from "./components/studentExamForm";
import SubjectExamForm from "./components/subjectExamForm";
import UserResultForm from "./components/userResultsForm";
import ExamQuestionForm from './components/examQuestionForm';
import ChangeStudentInformationForm from "./components/ChangeStudentInformationForm";
import Logout from "./components/logout";
import needToLogout from "./components/needToLogout";
import emailSent from "./components/emailSent";
import passwordChanged from "./components/passwordChanged";
import ExamResult from "./components/examResult";
import ProtectedRoute from "./components/common/protectedRoute";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    try {
      const user = auth.getCurrentUser();
      this.setState({ user });
    } catch (error) {
      // auth.refreshJwt();
    }
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route exact path="/profile" component={UserProfileForm} />
            <Route path="/edit-user" component={UserEditForm} />
            <Route
              path="/edit-student-information"
              component={ChangeStudentInformationForm}
            />
            <Route exact path="/exams" component={StudentExamForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/reset-password" component={ResetpasswordForm} />
            <Route path="/change-password" component={changePasswordForm} />
            <Route
              path="/password/reset/confirm/:uid/:token"
              component={ResetpasswordconfirmForm}
            />
            <Route exact path="/exams/exam/:id" component={SubjectExamForm} />
            <Route path="/exams/exam/:id/examquestions" component={ExamQuestionForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/exam-result" component={ExamResult} />
            <Route path="/profile/results" component={UserResultForm} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={this.state.user} />}
            />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/wait-For-Approval" component={waitForApproval} />
            <Route path="/need-to-logout" component={needToLogout} />
            <Route path="/email-sent" component={emailSent} />
            <Route path="/password-changed" component={passwordChanged} />
            <Redirect from="/" exact to="/exams" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
