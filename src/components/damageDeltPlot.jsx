import React, { Component } from 'react';
import Plot from "react-plotly.js";

class DamageDeltPlot extends Component {
  shouldComponentUpdate(nextProps) {
     // Rendering the component only if
     // passed props value is changed
     if (nextProps.pcNames !== this.props.pcNames) {
       console.log("DamageDeltPlot Rendered");
       return true;
     } else {
       return false;
     }
  }

  render() {
    return (
      <React.Fragment>
        <Plot
          data={this.createTraces()}
          layout={{
            width: 800,
            height: 400,
            title: "Damage Delt by PCs",
            barmode: "stack",
            showlegend: false,
            yaxis: {
              title: {
                text: "Sum of damage delt"
              },
              gridcolor: "black"
            },
          }}
        />
      </React.Fragment>
    );
  }

  createTraces() {
    /*
    let data = [{
      x: this.props.pcNames,
      y: this.props.pcStats.map((pc) => {return pc.meta.damageSum}),
      type: "bar"
    }];
    */
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

    return data;
  }
}

export default DamageDeltPlot;
