import React, {Component} from "react";
import "./App.css";
import Plot from "react-plotly.js";
import { showcaseData } from "./data/showcase.js";
import StatsProfile from "./components/StatsProfile.js";
import { makeProfiles } from "./components/makeProfiles.js";

console.log(makeProfiles(["Almorah","Akira","Leeania","Sevante","Sir Studly"],showcaseData));

var trace1 = {
  x: [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20"
  ],
  y: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0],
  name: "Akira",
  type: "bar"
};

var trace2 = {
  x: [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20"
  ],
  y: [1, 1, 1, 1, 0, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  name: "Almorah",
  type: "bar"
};

var trace3 = {
  x: [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20"
  ],
  y: [1, 2, 0, 1, 0, 0, 3, 0, 2, 1, 1, 0, 0, 0, 0, 3, 1, 0, 0, 0],
  name: "Leeania",
  type: "bar"
};

var trace4 = {
  x: [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20"
  ],
  y: [1, 0, 0, 0, 1, 0, 0, 1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 1, 2, 0],
  name: "Sevante",
  type: "bar"
};

var trace5 = {
  x: [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20"
  ],
  y: [0, 0, 2, 0, 0, 1, 2, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 1, 1, 0],
  name: "Sir Studly",
  type: "bar"
};

class App extends Component {
  state = {
    currentData: showcaseData,
    pcNames: ["Almorah","Akira","Leeania","Sevante","Sir Studly"],
    pcStats: [ ],
    dmStats: {}
  };

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
              <input type="text" className="form-control" id="pc1" placeholder="Character Name" defaultValue="Almorah" />
            </div>
            <div className="col-auto">
              <input type="text" className="form-control" id="pc2" placeholder="Character Name" defaultValue="Akira"/>
            </div>
            <div className="col-auto">
              <input type="text" className="form-control" id="pc3" placeholder="Character Name" defaultValue="Leeania"/>
            </div>
            <div className="col-auto">
              <input type="text" className="form-control" id="pc4" placeholder="Character Name" defaultValue="Sevante"/>
            </div>
          </form>
        </div>
        <div className="d-flex justify-content-center">
          <form className="row g-3">
            <div className="col-auto">
              <input type="text" className="form-control" id="pc5" placeholder="Character Name" defaultValue="Sir Studly"/>
            </div>
            <div className="col-auto">
              <input type="text" className="form-control" id="pc6" placeholder="Character Name" />
            </div>
            <div className="col-auto">
              <input type="text" className="form-control" id="pc7" placeholder="Character Name" />
            </div>
            <div className="col-auto">
              <input type="text" className="form-control" id="pc8" placeholder="Character Name" />
            </div>
          </form>
        </div>
        <div className="col-lg-6 mx-auto text-center mt-2">
          <button type="submit" className="btn btn-primary mb-3">Submit</button>
        </div>
        <hr />
        <div className="col-lg-6 mx-auto text-center">
          <Plot
            data={[trace1, trace2, trace3, trace4, trace5]}
            layout={{
              width: 800,
              height: 400,
              title: "All PC d20 rolls",
              barmode: "stack",
              yaxis: {
                title: {
                  text: "sum of times value was rolled"
                }
              },
              xaxis: {
                title: {
                  text: "value of roll"
                },
                tickvals: [
                  1,
                  2,
                  3,
                  4,
                  5,
                  6,
                  7,
                  8,
                  9,
                  10,
                  11,
                  12,
                  13,
                  14,
                  15,
                  16,
                  17,
                  18,
                  19,
                  20
                ]
              }
            }}
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
