import React, { Component } from 'react';
import Plot from "react-plotly.js";

const skills = ["Acrobatics","Animal Handling","Arcana","Athletics","Deception","History","Insight","Intimidation","Investigation","Medicine","Nature","Perception","Performance","Persuasion","Religion","Sleight of Hand","Stealth","Survival"];

class SkillsUsedPlot extends Component {
  shouldComponentUpdate(nextProps) {
     // Rendering the component only if
     // passed props value is changed
     if (nextProps.pcNames !== this.props.pcNames) {
       console.log("SkillsUsedPlot Rendered");
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
            title: "Skills used",
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
              tickvals: skills
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
        x: skills,
        y: this.props.pcStats[i].meta.nSkillArray,
        name: this.props.pcNames[i],
        type: "bar"
      });
    }

    return data;
  }
}

export default SkillsUsedPlot;
