import React, { Component } from "react";
import hema from "../images/hema.jpeg";
import hazem from "../images/hazem.jpeg";
import hassan from "../images/hassan.jpeg";
import adel from "../images/adel.jpeg";

class About extends Component {
  state = {};
  render() {
    return (
      <div className="card">
        <div className="card-header">
          <center>
            <h4>Team members</h4>
          </center>
        </div>

        <div className="card extra-padding">
          <div className="card-deck">
            <div className="card enabled_hover">
              <img src={hema} className="card-img-top" alt="..."></img>
              <div className="card-body">
                <h5 className="card-title">Mohamed Ibrahem</h5>
                <p className="card-text">Backend and Dtabase.</p>
                <p className="card-text">
                  <small className="text-muted">Team Leader</small>
                </p>
              </div>
            </div>
            <div className="card enabled_hover">
              <img src={adel} className="card-img-top" alt="..."></img>
              <div className="card-body">
                <h5 className="card-title">Mohammed Adel</h5>
                <p className="card-text">Backend and Dtabase.</p>
                <p className="card-text">
                  <small className="text-muted">Team member</small>
                </p>
              </div>
            </div>
            <div className="card enabled_hover">
              <img src={hassan} className="card-img-top" alt="..."></img>
              <div className="card-body">
                <h5 className="card-title">Hassan Elsayed</h5>
                <p className="card-text">Frontend and Styling.</p>
                <p className="card-text">
                  <small className="text-muted">Team member</small>
                </p>
              </div>
            </div>
            <div className="card enabled_hover">
              <img src={hazem} className="card-img-top" alt="..."></img>
              <div className="card-body">
                <h5 className="card-title">Hazem Seif</h5>
                <p className="card-text">Frontend and Styling.</p>

                <p className="card-text">
                  <small className="text-muted">Team member</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
