import React, {Component} from "react";
import "./App.css";
import Plot from "react-plotly.js";
import ReactModal from 'react-modal';
import { showcaseData } from "./data/showcase.js";
import StatsProfile from "./components/StatsProfile.js";
import { makeProfiles } from "./components/makeProfiles.js";
import D20RollsPlot from "./components/d20RollsPlot.jsx";
import AdvantagePlot from "./components/advantagePlot.jsx";
import DamageDeltPlot from './components/damageDeltPlot.jsx';
import DamageMaxPlot from './components/damageMaxPlot.jsx';
import SkillsUsedPlot from './components/skillsUsedPlot.jsx';
import AbilitiesUsedPlot from './components/abilitiesUsedPlot.jsx';
import GeneralAveragesPlot from './components/generalAveragesPlot.jsx';
import ModalAbout from './components/modalAbout.jsx';
import ModalData from './components/modalData.jsx';

let showcaseStats = makeProfiles(["Almorah","Akira","Leeania","Sevante","Sir Studly"],showcaseData);

class App extends Component {

  state = {
    currentData: showcaseData,
    pcInput: ["Almorah","Akira","Leeania","Sevante","Sir Studly","","",""],
    pcNames: ["Almorah","Akira","Leeania","Sevante","Sir Studly"],
    pcStats: showcaseStats[0],
    dmStats: showcaseStats[1],
    fileName: "Showcase Data",
    showModalAbout: false,
    showModalData: false
  };

  handleSubmitNames = () => {

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

  handleOpenModalAbout = () => {
    this.setState({showModalAbout: true});
  }
  handleCloseModalAbout = () => {
    this.setState({showModalAbout: false});
  }

  handleOpenModalData = () => {
    this.setState({showModalData: true});
  }
  handleCloseModalData = () => {
    this.setState({showModalData: false});
  }

  handleFileNameChange = (value) => {
    this.setState({fileName: value})
  }

  handleDataUpload = (data) => {
    this.setState({
      currentData: data
    })

    this.handleSubmitNames();
  }

  render() {
    return (
      <div className="px-4 py-2 my-5">
        <h1 className="display-5 fw-bold text-center">Dungeons & Dragons Stats</h1>
        <div className="col-lg-6 mx-auto text-center">
          <p className="lead mb-1">
            Quickly figure out who sucks at rolling dice in your Foundry VTT D&D
            campaign.
          </p>
          <button type="button" className="btn btn-link btn-small mb-4" onClick={this.handleOpenModalAbout}>
            What is this?
          </button>
          <ModalAbout
            isOpen={this.state.showModalAbout}
            onClose={this.handleCloseModalAbout}
          />
          <p className="lead mb-1 text-decoration-underline">
            Names of Player Characters
          </p>
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
        <div className="col-lg-6 mx-auto text-center mt-2 mb-4">
          <button type="submit" className="btn btn-primary mb-3" onClick={() => this.handleSubmitNames()}>Submit</button>
        </div>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-2">
          <button type="button" className="btn btn-primary btn-lg px-4 gap-3" onClick={this.handleOpenModalData}>
            Use your own data
          </button>
        </div>
        <ModalData
          isOpen={this.state.showModalData}
          onClose={this.handleCloseModalData}
          onUpload={this.handleDataUpload}
          onFileNameChange={this.handleFileNameChange}
        />
        <div className="col-lg-6 mx-auto text-center">
          <p className="lead mb-1">
            Viewing results from: {this.state.fileName}
          </p>
        </div>
        <hr />
        <div className="row">
          <div className="col">
            <D20RollsPlot
              pcNames={this.state.pcNames}
              pcStats={this.state.pcStats}
            />
          </div>
          <div className="col">
            <GeneralAveragesPlot
              pcNames={this.state.pcNames}
              pcStats={this.state.pcStats}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <DamageDeltPlot
              pcNames={this.state.pcNames}
              pcStats={this.state.pcStats}
            />
          </div>
          <div className="col">
            <DamageMaxPlot
              pcNames={this.state.pcNames}
              pcStats={this.state.pcStats}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <SkillsUsedPlot
              pcNames={this.state.pcNames}
              pcStats={this.state.pcStats}
            />
          </div>
          <div className="col">
            <AbilitiesUsedPlot
              pcNames={this.state.pcNames}
              pcStats={this.state.pcStats}
            />
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
