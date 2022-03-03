import React, { Component } from 'react';
import Plot from "react-plotly.js";

class AdvantagePlot extends Component {

  render() {
    return (
      <React.Fragment>
        <Plot
          data={this.createTraces()}
          layout={{
            width: 400,
            height: 400,
            title: "How often there was dis/advantage",
            barmode: "stack",
            paper_bgcolor: "rgba(248, 249, 250, 1)",
            plot_bgcolor: "rgba(248, 249, 250, 1)",
            yaxis: {
              title: {
                text: "How many times"
              },
              gridcolor: "black",
            },
          }}
        />
      </React.Fragment>
    );
  }

  createTraces() {
    let data = [];

    for (let i = 0; i < this.props.pcNames.length; i++) {
      data.push({
        x: ["disadvantage","normal","advantage"],
        y: [this.props.pcStats[i].meta.nDis,this.props.pcStats[i].meta.nNorm,this.props.pcStats[i].meta.nAdv],
        name: this.props.pcNames[i],
        type: "bar"
      });
    }

    return data;
  }
}

export default AdvantagePlot;
