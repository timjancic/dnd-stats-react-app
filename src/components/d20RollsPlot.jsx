import React, { Component } from 'react';
import Plot from "react-plotly.js";

class D20RollsPlot extends Component {
  shouldComponentUpdate(nextProps) {
     // Rendering the component only if
     // passed props value is changed
     if (nextProps.pcNames !== this.props.pcNames) {
       console.log("D20RollsPlot Rendered");
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
              tickvals: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
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
        x: ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"],
        y: this.props.pcStats[i].meta.nd20Array,
        name: this.props.pcNames[i] + " (" + this.props.pcStats[i].meta.avgd20.toFixed(2) + ")",
        type: "bar"
      });
    }

    return data;
  }
}

export default D20RollsPlot;
