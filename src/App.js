import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./components/movies";
import MovieForm from "./components/movieForm";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import changePasswordForm from "./components/changePasswordForm";
import UserEditForm from "./components/userEditForm";
import ResetpasswordForm from "./components/ResetpasswordForm";
import ResetpasswordconfirmForm from "./components/ResetpasswordconfirmForm";
import ChangeStudentInformationForm from "./components/changeUserInformationForm";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoute";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import UserProfileForm from './components/userProfileForm';

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
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
            <Route path="/profile" component={UserProfileForm} />
            <Route path="/edit-user" component={UserEditForm} />
            <Route
              path="/edit-student-information"
              component={ChangeStudentInformationForm}
            />
            <Route path="/login" component={LoginForm} />
            <Route path="/reset-password" component={ResetpasswordForm} />
            <Route path="/change-password" component={changePasswordForm} />
            <Route
              path="/password/reset/confirm/:uid/:token"
              component={ResetpasswordconfirmForm}
            />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={this.state.user} />}
            />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
