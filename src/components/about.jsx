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
          <div class="card-deck">
            <div class="card enabled_hover">
              <img src={hema} class="card-img-top" alt="..."></img>
              <div class="card-body">
                <h5 class="card-title">Mohamed Ibrahem</h5>
                <p class="card-text">Backend and Dtabase.</p>
                <p class="card-text">
                  <small class="text-muted">Team Leader</small>
                </p>
              </div>
            </div>
            <div class="card enabled_hover">
              <img src={adel} class="card-img-top" alt="..."></img>
              <div class="card-body">
                <h5 class="card-title">Mohammed Adel</h5>
                <p class="card-text">Backend and Dtabase.</p>
                <p class="card-text">
                  <small class="text-muted">Team member</small>
                </p>
              </div>
            </div>
            <div class="card enabled_hover">
              <img src={hassan} class="card-img-top" alt="..."></img>
              <div class="card-body">
                <h5 class="card-title">Hassan Elsayed</h5>
                <p class="card-text">Frontend and Styling.</p>
                <p class="card-text">
                  <small class="text-muted">Team member</small>
                </p>
              </div>
            </div>
            <div class="card enabled_hover">
              <img src={hazem} class="card-img-top" alt="..."></img>
              <div class="card-body">
                <h5 class="card-title">Hazem Seif</h5>
                <p class="card-text">Frontend and Styling.</p>

                <p class="card-text">
                  <small class="text-muted">Team member</small>
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
