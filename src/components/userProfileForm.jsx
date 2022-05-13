import React, { Component } from "react";
import { getUser, getStudent } from "../services/userService";
import UserProfile from "./common/userProfile";

class UserProfileForm extends Component {
  state = {
    user: {},
    student: { level: "", department: "" },
  };

  async componentDidMount() {
    const { data: user } = await getUser();
    const { data: student } = await getStudent();
    console.log(student);
    this.setState({ user, student });
  }

  render() {
    const { username, first_name, last_name, email } = this.state.user;
    const { phone, birth_date, level, department, score, overall_level_rank } =
      this.state.student;

    return (
      <UserProfile
        username={username}
        first_name={first_name}
        last_name={last_name}
        email={email}
        phone={phone}
        birth_date={birth_date}
        level={level}
        department={department}
        overall_level_rank={overall_level_rank}
        score={score}
      />
    );
  }
}

export default UserProfileForm;
