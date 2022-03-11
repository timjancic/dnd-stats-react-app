import React, { Component } from 'react';
import Plot from "react-plotly.js";

const avgNames = ["d20 (no modifiers)","attack rolls","ability and skill rolls"];

class GeneralAveragesPlot extends Component {
  shouldComponentUpdate(nextProps) {
     // Rendering the component only if
     // passed props value is changed
     if (nextProps.pcNames !== this.props.pcNames) {
       console.log("GeneralAveragesPlot Rendered");
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
            title: "Average D20 Rolls",
            barmode: "group",
            yaxis: {
              title: {
                text: "average"
              }
            },
            xaxis: {
              tickvals: avgNames
            }
          }}
        />
      </React.Fragment>
    );
  }

  createTraces() {
    let data = [];

    for (let i = 0; i < this.props.pcNames.length; i++) {
      data.push({
        x: avgNames,
        y: [this.props.pcStats[i].meta.avgd20.toFixed(2) , this.props.pcStats[i].meta.avgAttack.toFixed(2) , this.props.pcStats[i].meta.avgAbility.toFixed(2) ], //combine abilities and saves into one array
        name: this.props.pcNames[i],
        text: [
          this.props.pcNames[i] + `<br>` + this.props.pcStats[i].meta.avgd20.toFixed(2),
          this.props.pcNames[i] + `<br>` + this.props.pcStats[i].meta.avgAttack.toFixed(2),
          this.props.pcNames[i] + `<br>` + this.props.pcStats[i].meta.avgAbility.toFixed(2)
        ],
        hoverinfo: 'text',
        textposition: 'none',
        type: "bar"
      });
    }

    return data;
  }
}

export default GeneralAveragesPlot;
