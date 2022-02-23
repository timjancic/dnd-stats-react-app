import React, { Component } from 'react';
import './App.css';
import Plot from 'react-plotly.js';

class App extends Component {
  render() {
    return (
      <div className="App px-4 py-2 my-5 text-center">
        <h1 className="display-5 fw-bold">
          Foundry D&D 5e Stats
        </h1>
        <div className="col-lg-6 mx-auto">
      <p className="lead mb-4">Quickly figure out who sucks at rolling in your D&D campaign</p>
      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <button type="button" className="btn btn-primary btn-lg px-4 gap-3">Use your own data</button>
      </div>
    </div>
      </div>
    );
  }
}

export default App;
