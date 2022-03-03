import React, { Component } from 'react';
import Plot from "react-plotly.js";

const skills = ["Acrobatics","Animal Handling","Arcana","Athletics","Deception","History","Insight","Intimidation","Investigation","Medicine","Nature","Perception","Performance","Persuasion","Religion","Sleight of Hand","Stealth","Survival"];

class SkillsUsedPlot extends Component {

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
