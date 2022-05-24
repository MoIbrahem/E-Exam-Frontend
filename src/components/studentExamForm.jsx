import React, { Component } from "react";
import moment from "moment";
import auth from "../services/authService";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import SearchBox from "./searchBox";
// import _, { filter } from "lodash";
import { getExamStatus } from "../services/examService";
import { paginate } from "../utils/paginate";
import { apiUrl } from "../config.json";
import { getSubject } from "./../services/subjectService";

class StudentExamForm extends Component {
  state = {
    currentPage: 1,
    pageSize: 3,
    exams: {},
    loading: true,
    errors: {},
    ex: {},
    errorData: [],
    selectedSubject: null,
    searchQuery:"",
    subjects: [],
  };

  async componentDidMount() {
    try {
      const { data: exams } = await getExamStatus();
      const { data: subjects } = await getSubject();
      const allSubjects = [{ title: "All subjects" }, ...subjects];
      this.setState({ allSubjects, exams, loading: false });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        this.setState({ errors, errorData: ex.response.data[0] });
      } else if (ex.response && ex.response.status === 401) {
        auth.refreshJwt();
      }
    }
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedSubject: null, currentPage: 1 });
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
      exams: allExams,
      
    } = this.state;

    let filtered = allExams;
    if (searchQuery)
      filtered = allExams.filter(e =>
        e.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedSubject && selectedSubject.id)
      filtered = allExams.filter(s => s.subject.id === selectedSubject.id);

    // const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const exams = paginate(filtered, currentPage, pageSize);

    return { totalCount: filtered.length, data: exams };
  };

  render() {
    const result = this.state.exams;
    const {
      pageSize,
      currentPage,
      selectedSubject,
      allSubjects,
      loading,
      errorData,
      searchQuery,
    } = this.state;

    const { totalCount, data: exams } = this.getPagedData();


    if (auth.getCurrentUser()) {
      const user = auth.getCurrentUser();
      if (user.profile_type === "PRF") {
        if (user.is_staff) {
          window.location = apiUrl + "/admin/";
        } else {
          window.location = "/wait-For-Approval";
        }
      }
    }

    if (loading) {
      if (errorData.length !== 0) {
        return <div>{errorData}</div>;
      } else {
        return <div>loading...</div>;
      }
    }

    if (result.length === 0) {
      return <div>You have no exams</div>;
    }

    if (result) {
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
          <SearchBox value={searchQuery} onChange={this.handleSearch} />

              <div className="row">
                {exams.map((exam) => (
                  <div className="col-sm-4" key={exam.id}>
                    <div className="card enabled_hover">
                      <div
                        onClick={() => {
                          this.props.history.push(`/exams/exam/${exam.id}`);
                        }}
                        className="card-body"
                        style={{ cursor: "pointer" }}
                      >
                        <h2 className="card-title">{exam.title}</h2>
                        <b>Subject: </b>
                        {exam.subject["title"]}
                        <br />
                        <b>Starts at: </b>
                        {moment(exam.starts_at).format("llll")}
                        <br />
                        <b>Ends at: </b>
                        {moment(exam.ends_at).format("llll")}
                      </div>
                    </div>
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
          <Pagination 
            itemsCount={result.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </React.Fragment>
      );
    }
  }
}

export default StudentExamForm;
