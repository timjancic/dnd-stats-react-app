import React, { Component } from 'react';
import Plot from "react-plotly.js";

class DamageMaxPlot extends Component {

  render() {
    return (
      <React.Fragment>
        <Plot
          data={this.createTraces()}
          layout={{
            width: 800,
            height: 400,
            title: "Max damage rolled in one attack",
            barmode: "stack",
            showlegend: false,
            yaxis: {
              title: {
                text: "Amount of Damage"
              }
            },
          }}
        />
        </React.Fragment>
    );
  }

  createTraces() {

    let text = new Array(this.props.pcNames.length);
    for (let i = 0; i < text.length; i++) {
      text[i] = this.props.pcStats[i].meta.damageMax[0] + `<br>` + this.props.pcStats[i].meta.damageMax[1];
    }

    let data = [{
      x: this.props.pcNames,
      y: this.props.pcStats.map((pc) => {return pc.meta.damageMax[0]}),
      text: text,
      hoverinfo: 'text',
      type: "bar"
    }];

    return data;
  }
}

export default DamageMaxPlot;
