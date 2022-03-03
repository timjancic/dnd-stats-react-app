import React, {Component} from "react";
import "./App.css";
import Plot from "react-plotly.js";
import { showcaseData } from "./data/showcase.js";
import StatsProfile from "./components/StatsProfile.js";
import { makeProfiles } from "./components/makeProfiles.js";
import D20RollsPlot from "./components/d20RollsPlot.jsx";

let showcaseStats = makeProfiles(["Almorah","Akira","Leeania","Sevante","Sir Studly"],showcaseData);

class App extends Component {

  state = {
    currentData: showcaseData,
    pcInput: ["Almorah","Akira","Leeania","Sevante","Sir Studly","","",""],
    pcNames: ["Almorah","Akira","Leeania","Sevante","Sir Studly"],
    pcStats: showcaseStats[0],
    dmStats: showcaseStats[1]
  };

  handleSubmitNames = () => {
    console.log("submit buttons was pressed");

    let temp;
    let newNamesShort;

    let p = new Promise((resolve,reject) => {
      temp = makeProfiles(this.state.pcInput,this.state.currentData);
      newNamesShort = this.state.pcInput.filter(n => n != "");
      if (temp) {resolve()} else {reject()}
    });

    p.then(() => {
      this.setState({
        pcNames: newNamesShort,
        pcStats: temp[0],
        dmStats: temp[1]
      });
    })

  }

  handleNameChange = (index,value) => {
    let newNames = [...this.state.pcInput];
    newNames[index] = value;
    this.setState({
      pcInput: newNames,
    });
  }

  render() {
    return (
      <div className="px-4 py-2 my-5">
        <h1 className="display-5 fw-bold text-center">Dungeons & Dragons Stats</h1>
        <div className="col-lg-6 mx-auto text-center">
          <p className="lead mb-4">
            Quickly figure out who sucks at rolling dice in your Foundry VTT D&D
            campaign.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-2">
            <button type="button" className="btn btn-primary btn-lg px-4 gap-3">
              Use your own data
            </button>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <form className="row g-3 mb-2">
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                id="pc0"
                placeholder="Character Name"
                value={this.state.pcInput[0]}
                onChange={(e) => this.handleNameChange(0,e.target.value)} />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                id="pc1"
                placeholder="Character Name"
                value={this.state.pcInput[1]}
                onChange={(e) => this.handleNameChange(1,e.target.value)} />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                id="pc2"
                placeholder="Character Name"
                value={this.state.pcInput[2]}
                onChange={(e) => this.handleNameChange(2,e.target.value)} />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                id="pc3"
                placeholder="Character Name"
                value={this.state.pcInput[3]}
                onChange={(e) => this.handleNameChange(3,e.target.value)} />
            </div>
          </form>
        </div>
        <div className="d-flex justify-content-center">
          <form className="row g-3">
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                id="pc4"
                placeholder="Character Name"
                value={this.state.pcInput[4]}
                onChange={(e) => this.handleNameChange(4,e.target.value)} />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                id="pc5"
                placeholder="Character Name"
                value={this.state.pcInput[5]}
                onChange={(e) => this.handleNameChange(5,e.target.value)} />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                id="pc6"
                placeholder="Character Name"
                value={this.state.pcInput[6]}
                onChange={(e) => this.handleNameChange(6,e.target.value)} />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                id="pc7"
                placeholder="Character Name"
                value={this.state.pcInput[7]}
                onChange={(e) => this.handleNameChange(7,e.target.value)} />
            </div>
          </form>
        </div>
        <div className="col-lg-6 mx-auto text-center mt-2">
          <button type="submit" className="btn btn-primary mb-3" onClick={() => this.handleSubmitNames()}>Submit</button>
        </div>
        <hr />
        <div className="col-lg-6 mx-auto text-center">
          <D20RollsPlot
            pcNames={this.state.pcNames}
            pcStats={this.state.pcStats}
          />
        </div>
        <div className="row align-items-md-stretch">
          <div className="col-md-6">
            <div className="h-100 p-5 text-white bg-dark rounded-3">
              <h2>Change the background</h2>
              <p>
                Swap the background-color utility and add a `.text-*` color
                utility to mix up the jumbotron look. Then, mix and match with
                additional component themes and more.
              </p>
              <button className="btn btn-outline-light" type="button">
                Example button
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="h-100 p-5 bg-light border rounded-3">
              <h2>Add borders</h2>
              <p>
                Or, keep it light and add a border for some added definition to
                the boundaries of your content. Be sure to look under the hood
                at the source HTML here as we've adjusted the alignment and
                sizing of both column's content for equal-height.
              </p>
              <button className="btn btn-outline-secondary" type="button">
                Example button
              </button>
            </div>
          </div>
        </div>
        <footer className="pt-2 mt-4 text-muted border-top text-left">
          Web App created by Timothy Jancic
        </footer>
      </div>
    );
  }
}

export default App;
