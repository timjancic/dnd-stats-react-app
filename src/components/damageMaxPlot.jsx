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


    /*
    let data = [];
    let xText = new Array(this.props.pcNames.length);
    for (let i = 0; i < xText.length; i++) {
      xText[i] = this.props.pcNames[i] + `<br>` + `Total: ` + this.props.pcStats[i].meta.damageSum;
    }

    for (let i = 0; i < this.props.pcNames.length; i++) {
      for (let j = 0; j < this.props.pcStats[i].meta.damageArray.length; j++) {

        let temp = new Array(this.props.pcNames.length);
        let tempText = new Array(this.props.pcNames.length);
        temp.fill(0);
        tempText.fill("");
        temp[i] = this.props.pcStats[i].meta.damageArray[j][0];
        tempText[i] = this.props.pcStats[i].meta.damageArray[j][2] + ` (x` + this.props.pcStats[i].meta.damageArray[j][1] + `)` +
          `<br>` +
          this.props.pcStats[i].meta.damageArray[j][0];

        data.push({
          x: xText,
          y: temp,
          name: this.props.pcStats[i].meta.damageArray[j][2] + " (x" + this.props.pcStats[i].meta.damageArray[j][1] + ")",
          text: tempText,
          hoverinfo: 'text',
          textposition: 'none',
          type: "bar"
        });
      }

    }
    */

    return data;
  }
}

export default DamageMaxPlot;
