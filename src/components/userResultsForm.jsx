import React, { Component } from "react";
import Pagination from "./common/pagination";
import auth from "../services/authService";
import ListGroup from "./common/listGroup";
import SearchBox from "./searchBox";
import { getUserResult, getUser } from "../services/userService";
import { getSubject } from "./../services/subjectService";
import { paginate } from "../utils/paginate";

class UserResultForm extends Component {
  state = {
    currentPage: 1,
    pageSize: 1,
    result: [],
    student: {},
    loading: true,
    errors: {},
    searchQuery: "",
    selectedSubject: null,
    subjects: [],
  };

  async componentDidMount() {
    try {
      const { data: result } = await getUserResult();
      const { data: student } = await getUser();
      const { data: subjects } = await getSubject();
      const allSubjects = [{ title: "All subjects" }, ...subjects];
      this.setState({ allSubjects, result, student });
    } catch (ex) {
      if (ex.response && ex.response.status === 401) {
        auth.refreshJwt();
      }
    }
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSearch = (query) => {
    this.setState({
      searchQuery: query,
      selectedSubject: null,
      currentPage: 1,
    });
  };

  handleSubjectSelect = (subject) => {
    this.setState({
      selectedSubject: subject,
      searchQuery: "",
      currentPage: 1,
    });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      // sortColumn,
      selectedSubject,
      searchQuery,
      result: allResults,
    } = this.state;

    let filtered = allResults;
    if (searchQuery)
      filtered = allResults.filter((r) =>
        r.exam.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedSubject && selectedSubject.id)
      filtered = allResults.filter(
        (s) => s.exam.subject.id === selectedSubject.id
      );

    // const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const results = paginate(filtered, currentPage, pageSize);

    return { totalCount: filtered.length, data: results };
  };

  render() {
    const {
      result,
      student,
      pageSize,
      currentPage,
      allSubjects,
      selectedSubject,
      searchQuery,
    } = this.state;

    const { totalCount, data: results } = this.getPagedData();

    if (result.length === 0) {
      return (
        <div>
          <h1>Results</h1>
          <h2>
            {student.first_name} {student.last_name}
          </h2>
          <div>You have no results yet!</div>
        </div>
      );
    }
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-2">
            <ListGroup
              items={allSubjects}
              selectedItem={selectedSubject}
              onItemSelect={this.handleSubjectSelect}
              textProperty="title"
              valueProperty="title"
            />
          </div>
          <div className="col">
            <h1>Results</h1>
            <h2>
              {student.first_name} {student.last_name}
            </h2>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <div className="row">
              {results.map((studentResults) => (
                <div className="col-sm-4" key={studentResults.exam.id}>
                  <table className="card enabled_hover">
                    <tbody className="card-body">
                      <tr>
                        <th>
                          <h3>{studentResults.exam["title"]}</h3>
                        </th>
                      </tr>
                      <tr>
                        <td>
                          <h5>
                            <b>Subject:</b>{" "}
                            {studentResults.exam.subject["title"]}
                          </h5>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div>Score: {studentResults.score}</div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div>Degree: {studentResults.degree}</div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div>Total : {studentResults.total}</div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div>Ranking: {studentResults.ranking}</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default UserResultForm;
